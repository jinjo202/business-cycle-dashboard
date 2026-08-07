import os
import sys
import re
import urllib.request
import json
from datetime import datetime
import subprocess
import traceback

# Ensure the standard user site-packages are in the path for this split Python installation
user_site_packages = r"C:\Users\infomax\AppData\Local\Programs\Python\Python314\Lib\site-packages"
if user_site_packages not in sys.path:
    sys.path.append(user_site_packages)

# Monkey-patch requests to prevent indefinite hangs
try:
    import requests
    original_request = requests.Session.request
    def patched_request(self, method, url, *args, **kwargs):
        if 'timeout' not in kwargs or kwargs['timeout'] is None:
            kwargs['timeout'] = 10
        return original_request(self, method, url, *args, **kwargs)
    requests.Session.request = patched_request
    print("Successfully monkey-patched requests.Session.request with a default 10s timeout.")
except Exception as e:
    print(f"Failed to monkey-patch requests: {e}")

# Ensure yfinance is installed
try:
    import yfinance as yf
except ImportError:
    print("yfinance not found. Installing yfinance...")
    subprocess.run([sys.executable, "-m", "pip", "install", "yfinance"], check=True)
    import yfinance as yf

# Configuration
WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_JS_PATH = os.path.join(WORKSPACE_DIR, "app.js")
INDEX_HTML_PATH = os.path.join(WORKSPACE_DIR, "index.html")

# Headers for scraping
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

def get_exchange_rate():
    print("Fetching USD/KRW exchange rate...")
    try:
        url = "https://open.er-api.com/v6/latest/USD"
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            rate = float(data['rates']['KRW'])
            print(f"Exchange Rate API: 1 USD = {rate:.2f} KRW")
            return rate
    except Exception as e:
        print(f"Error fetching from Exchange Rate API: {e}. Falling back to yfinance.")
        try:
            ticker = yf.Ticker("USDKRW=X")
            df = ticker.history(period="1d")
            if not df.empty:
                rate = float(df['Close'].iloc[-1])
                print(f"yfinance USDKRW=X: 1 USD = {rate:.2f} KRW")
                return rate
        except Exception as ex:
            print(f"yfinance fallback failed: {ex}")
    return 1518.88  # Last verified fallback

def get_bok_base_rate():
    print("Scraping Bank of Korea base interest rate...")
    try:
        req = urllib.request.Request(
            "https://www.bok.or.kr/portal/main/main.do",
            headers=HEADERS
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
            # Look for BOK rate pattern (e.g. 기준금리 2.50%)
            match = re.search(r'기준금리\s*(?:[^\d]*\()?([0-9.]+)\s*%?', html)
            if match:
                rate = float(match.group(1))
                print(f"BOK Base Rate scraped: {rate:.2f}%")
                return rate
    except Exception as e:
        print(f"Failed to scrape BOK base rate: {e}")
    return None

def scrape_tradingeconomics_korea(indicator_path, search_pattern):
    url = f"https://tradingeconomics.com/south-korea/{indicator_path}"
    print(f"Scraping TradingEconomics: south-korea/{indicator_path}...")
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as r:
            html = r.read().decode('utf-8')
            # Search for value in meta description or main text
            match = re.search(search_pattern, html, re.DOTALL)
            if match:
                val = next(g for g in match.groups() if g is not None)
                value = float(val)
                print(f"TE Scraped {indicator_path}: {value:.2f}")
                return value
    except Exception as e:
        print(f"Failed to scrape TE {indicator_path}: {e}")
    return None

def fetch_fred_series(series_id, calc_yoy=False):
    print(f"Fetching FRED Series: {series_id}...")
    try:
        url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}"
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as response:
            lines = response.read().decode().strip().split("\n")
            data_lines = [l.split(",") for l in lines[1:] if not l.startswith("DATE") and not l.endswith(".")]
            
            if not data_lines:
                return None
                
            if calc_yoy:
                if len(data_lines) < 13:
                    return None
                last_val = float(data_lines[-1][1])
                prev_val = float(data_lines[-13][1])
                yoy = (last_val - prev_val) / prev_val * 100
                print(f"FRED {series_id} calculated YoY: {yoy:.2f}%")
                return yoy
            else:
                last_val = float(data_lines[-1][1])
                print(f"FRED {series_id} value: {last_val:.2f}")
                return last_val
    except Exception as e:
        print(f"Failed to fetch FRED series {series_id}: {e}")
    return None

def parse_app_js():
    with open(APP_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Parse baselinePrices tickers
    # Format: "TICKER": { name: "...", ticker: "TICKER", base: 123.45, ... }
    us_baseline_tickers = {}
    kr_baseline_tickers = {}
    
    # Locate US and KR blocks inside baselinePrices
    bp_match = re.search(r'const baselinePrices\s*=\s*\{(.*?)\};', content, re.DOTALL)
    if bp_match:
        bp_block = bp_match.group(1)
        us_match = re.search(r'"US"\s*:\s*\{(.*?)\}\s*,\s*"KR"', bp_block, re.DOTALL)
        if us_match:
            us_block = us_match.group(1)
            for m in re.finditer(r'"([^"]+)":\s*\{\s*name:\s*"([^"]+)",\s*ticker:\s*"([^"]+)"', us_block):
                us_baseline_tickers[m.group(1)] = m.group(3)
        
        kr_match = re.search(r'"KR"\s*:\s*\{(.*?)\s*\}', bp_block, re.DOTALL)
        if kr_match:
            kr_block = kr_match.group(1)
            for m in re.finditer(r'"([^"]+)":\s*\{\s*name:\s*"([^"]+)",\s*ticker:\s*"([^"]+)"', kr_block):
                kr_baseline_tickers[m.group(1)] = m.group(3)
                
    # 2. Parse top 10 tickers
    us_top10_tickers = []
    kr_top10_tickers = []
    
    us_top_match = re.search(r'const usTop10Defs\s*=\s*\[(.*?)\]\s*;', content, re.DOTALL)
    if us_top_match:
        for m in re.finditer(r'ticker:\s*"([^"]+)"', us_top_match.group(1)):
            us_top10_tickers.append(m.group(1))
            
    kr_top_match = re.search(r'const krTop10Defs\s*=\s*\[(.*?)\]\s*;', content, re.DOTALL)
    if kr_top_match:
        for m in re.finditer(r'ticker:\s*"([^"]+)"', kr_top_match.group(1)):
            kr_top10_tickers.append(m.group(1))
            
    return us_baseline_tickers, kr_baseline_tickers, us_top10_tickers, kr_top10_tickers

def format_ticker_for_yf(ticker, region):
    if region == "US":
        if ticker == "BRK.B":
            return "BRK-B"
        if ticker == "VIX":
            return "^VIX"
        return ticker
    else: # KR
        if ticker == "041510": # SM Entertainment
            return "041510.KQ"
        if ticker.isdigit():
            return f"{ticker}.KS"
        return ticker

def get_yfinance_data(tickers):
    print(f"Fetching market data for {len(tickers)} tickers via yfinance...")
    prices = {}
    mcaps = {}
    
    # Download close prices for all in one batch (faster)
    try:
        df = yf.download(list(tickers.values()), period="5d", progress=False, threads=False)
        for key, yf_ticker in tickers.items():
            try:
                # Get the last non-null closing price
                if yf_ticker in df['Close']:
                    series = df['Close'][yf_ticker].dropna()
                    if not series.empty:
                        prices[key] = float(series.iloc[-1])
                elif len(tickers) == 1: # Single ticker returns Series, not DataFrame
                    prices[key] = float(df['Close'].dropna().iloc[-1])
            except Exception as e:
                pass
    except Exception as e:
        print("Batch download failed, falling back to individual queries:", e)

    # Individual queries for market cap (or missing prices)
    for key, yf_ticker in tickers.items():
        try:
            ticker_obj = yf.Ticker(yf_ticker)
            fast = ticker_obj.fast_info
            
            if 'marketCap' in fast and fast['marketCap'] > 0:
                mcaps[key] = float(fast['marketCap'])
            elif 'market_cap' in fast and fast['market_cap'] > 0:
                mcaps[key] = float(fast['market_cap'])
                
            if key not in prices:
                if 'lastPrice' in fast:
                    prices[key] = float(fast['lastPrice'])
                elif 'last_price' in fast:
                    prices[key] = float(fast['last_price'])
        except Exception as e:
            print(f"Failed to fetch detailed info for {yf_ticker}: {e}")
            
    return prices, mcaps

def main():
    print("==================================================")
    print("             DAILY MACROCYCLE UPDATER             ")
    print("==================================================")
    
    # 1. Fetch Exchange Rate
    exchange_rate = get_exchange_rate()
    
    # 2. Parse Tickers from app.js
    us_base_ticks, kr_base_ticks, us_top_ticks, kr_top_ticks = parse_app_js()
    print(f"Parsed baseline US tickers: {len(us_base_ticks)}, KR: {len(kr_base_ticks)}")
    print(f"Parsed Top 10 US tickers: {len(us_top_ticks)}, KR: {len(kr_top_ticks)}")
    
    # Map all tickers to yfinance format
    us_yf_map = {k: format_ticker_for_yf(v, "US") for k, v in us_base_ticks.items()}
    kr_yf_map = {k: format_ticker_for_yf(v, "KR") for k, v in kr_base_ticks.items()}
    
    # Add top 10 tickers to fetch mapping if they are not in baseline
    for t in us_top_ticks:
        if t not in us_yf_map:
            us_yf_map[t] = format_ticker_for_yf(t, "US")
    for t in kr_top_ticks:
        if t not in kr_yf_map:
            kr_yf_map[t] = format_ticker_for_yf(t, "KR")
            
    # 3. Fetch Market Data
    us_prices, us_mcaps = get_yfinance_data(us_yf_map)
    kr_prices, kr_mcaps = get_yfinance_data(kr_yf_map)
    
    # 4. Fetch US Macro Indicators from FRED
    us_rate = fetch_fred_series("FEDFUNDS")
    us_spread = fetch_fred_series("T10Y2Y")
    us_cli = fetch_fred_series("USALOLITOAASTSAM")
    us_gdp = fetch_fred_series("A191RL1Q225SBEA") # Quarterly YoY
    us_cpi = fetch_fred_series("CPIAUCSNS", calc_yoy=True)
    us_m2 = fetch_fred_series("M2SL", calc_yoy=True)
    
    # 5. Fetch KR Macro Indicators
    kr_cli = fetch_fred_series("KORLOLITOAASTSAM")
    kr_rate = get_bok_base_rate()
    
    # Scrape KR Inflation and GDP from TradingEconomics
    kr_cpi = scrape_tradingeconomics_korea(
        "inflation-cpi", 
        r'<meta name="description" content="[^"]*? decreased to ([0-9.]+)|increased to ([0-9.]+)|unchanged at ([0-9.]+)'
    )
    kr_gdp = scrape_tradingeconomics_korea(
        "gdp-growth-annual", 
        r'GDP Annual Growth Rate in South Korea.*?([0-9.-]+)\s*percent'
    )
    kr_m2 = scrape_tradingeconomics_korea(
        "money-supply-m2",
        r'Money Supply M2 in South Korea.*?([0-9.-]+)\s*percent|increased to ([0-9,]+)|decreased to ([0-9,]+)'
    ) # M2 rate is usually reported in YoY or raw values. If raw value is scraped, we will ignore and fallback.
    if kr_m2 is not None and kr_m2 > 100:  # TE might return raw trillion value
        kr_m2 = None

    # Fetch index prices for scaling total market caps
    index_prices = {}
    for name, ticker in [("S&P500", "^GSPC"), ("KOSPI", "^KS11"), ("KOSDAQ", "^KQ11")]:
        try:
            hist = yf.Ticker(ticker).history(period="1d")
            if not hist.empty:
                index_prices[name] = float(hist['Close'].iloc[-1])
        except Exception as e:
            print(f"Failed to fetch index {name}: {e}")

    # Read current app.js
    with open(APP_JS_PATH, "r", encoding="utf-8") as f:
        app_js = f.read()

    # Apply Updates to app.js
    
    # A. Inject EXCHANGE_RATE constant at the top if missing
    if "const EXCHANGE_RATE" not in app_js:
        # Insert at line 3
        lines = app_js.split("\n")
        lines.insert(2, f"const EXCHANGE_RATE = {exchange_rate:.2f};")
        app_js = "\n".join(lines)
        print("Injected EXCHANGE_RATE constant into app.js")
    else:
        # Update existing EXCHANGE_RATE
        app_js = re.sub(r'const EXCHANGE_RATE\s*=\s*[0-9.]+;', f"const EXCHANGE_RATE = {exchange_rate:.2f};", app_js)
        print(f"Updated EXCHANGE_RATE in app.js: {exchange_rate:.2f}")

    # B. Update mcapSp500Total dynamic formula in app.js if needed
    # We want it to show KRW dynamically in updateUI or when returning values
    # Look for mcapSp500Total in app.js mapping:
    # mcapSp500Total: `$${mcapSp500Total.toFixed(2)}T`,
    target_sp500_mcap_mapping = "mcapSp500Total: `$${mcapSp500Total.toFixed(2)}T`,"
    replacement_sp500_mcap_mapping = "mcapSp500Total: `$${mcapSp500Total.toFixed(2)}T (약 ${Math.round(mcapSp500Total * EXCHANGE_RATE).toLocaleString()}조원)`,"
    if target_sp500_mcap_mapping in app_js:
        app_js = app_js.replace(target_sp500_mcap_mapping, replacement_sp500_mcap_mapping)
        print("Modified S&P 500 total market cap format to include dynamic KRW conversion.")

    # C. Update baselinePrices in app.js
    print("Updating baseline prices in app.js...")
    bp_count = 0
    # Regex: ("KEY": { name: "...", ticker: "TICKER", base: )([0-9.]+)(, format: ...)
    def bp_replacer(match):
        nonlocal bp_count
        prefix = match.group(1)
        key = match.group(2)
        ticker = match.group(3)
        suffix = match.group(5)
        
        # Check if we have fetched a new price
        new_price = None
        if key in us_prices:
            new_price = us_prices[key]
        elif key in kr_prices:
            new_price = kr_prices[key]
            
        if new_price is not None:
            bp_count += 1
            # Check formatting: KR stocks should remain integer-like or float
            if key in kr_prices:
                return f"{prefix}{int(new_price)}{suffix}"
            else:
                return f"{prefix}{new_price:.2f}{suffix}"
        return match.group(0)

    bp_pattern = r'("([^"]+)":\s*\{\s*name:\s*"[^"]+",\s*ticker:\s*"([^"]+)",\s*base:\s*)([0-9.]+)(,\s*format:\s*.*)'
    app_js = re.sub(bp_pattern, bp_replacer, app_js)
    print(f"Successfully updated {bp_count} baseline stock prices.")

    # D. Update usTop10Defs and krTop10Defs market caps in app.js
    print("Updating Top 10 company base market caps in app.js...")
    top10_count = 0
    # Regex: ({ name: "...", ticker: "TICKER", baseMcap: )([0-9.]+)(, betaX: ...)
    def top_replacer(match):
        nonlocal top10_count
        prefix = match.group(1)
        ticker = match.group(2)
        suffix = match.group(4)
        
        new_mcap = None
        if ticker in us_mcaps:
            new_mcap = us_mcaps[ticker] / 1e12 # Trillion USD
        elif ticker in kr_mcaps:
            new_mcap = kr_mcaps[ticker] / 1e12 # Trillion KRW
            
        if new_mcap is not None:
            top10_count += 1
            return f"{prefix}{new_mcap:.2f}{suffix}"
        return match.group(0)

    top_pattern = r'(\{\s*name:\s*"[^"]+",\s*ticker:\s*"([^"]+)",\s*baseMcap:\s*)([0-9.]+)(,\s*betaX:\s*.*)'
    app_js = re.sub(top_pattern, top_replacer, app_js)
    print(f"Successfully updated {top10_count} Top 10 company market caps.")

    # E. Update baseline Index Total Market Caps (using index ratio scaling)
    # Target lines:
    # const mcapSp500Total = 44.80 * (1 + ytdSp500 / 100);
    # const mcapKospiTotal = 2185.0 * (1 + ytdKospi / 100);
    # const mcapKosdaqTotal = 412.0 * (1 + ytdKosdaq / 100);
    print("Updating index total market cap baselines in app.js...")
    
    # Scale KOSPI and KOSDAQ totals based on index current vs today's baseline index
    # (Since KOSPI index closed at 9063.84 and total is 7413T)
    if "S&P500" in index_prices:
        sp500_latest = index_prices["S&P500"]
        sp500_cap = 58.50 * (sp500_latest / 5500.0) # Assume 5500 baseline index
        app_js = re.sub(r'(const mcapSp500Total = )([0-9.]+)', r"\g<1>" + f"{sp500_cap:.2f}", app_js)
        print(f"S&P 500 total base cap updated to: ${sp500_cap:.2f}T (Index: {sp500_latest:.2f})")
        
    if "KOSPI" in index_prices:
        kospi_latest = index_prices["KOSPI"]
        kospi_cap = 7413.0 * (kospi_latest / 9063.84)
        app_js = re.sub(r'(const mcapKospiTotal = )([0-9.]+)', r"\g<1>" + f"{kospi_cap:.2f}", app_js)
        print(f"KOSPI total base cap updated to: {kospi_cap:.2f}조원 (Index: {kospi_latest:.2f})")
        
    if "KOSDAQ" in index_prices:
        kosdaq_latest = index_prices["KOSDAQ"]
        kosdaq_cap = 560.0 * (kosdaq_latest / 850.0)
        app_js = re.sub(r'(const mcapKosdaqTotal = )([0-9.]+)', r"\g<1>" + f"{kosdaq_cap:.2f}", app_js)
        print(f"KOSDAQ total base cap updated to: {kosdaq_cap:.2f}조원 (Index: {kosdaq_latest:.2f})")

    # F. Update 2026_current Macro Indicators in historicalPresets
    print("Updating 2026_current macro indicators in app.js...")
    
    # Locate historicalPresets block
    presets_match = re.search(r'const historicalPresets\s*=\s*\{(.*?)\};', app_js, re.DOTALL)
    if presets_match:
        presets_block = presets_match.group(0)
        
        # 1. Update US 2026_current
        us_current_match = re.search(r'"2026_current"\s*:\s*\{(.*?)\}', presets_block, re.DOTALL)
        if us_current_match:
            us_current_block = us_current_match.group(1)
            original_us_block = us_current_block
            
            # Replace US variables in preset
            if us_cli is not None:
                us_current_block = re.sub(r'cli:\s*[0-9.]+', f"cli: {us_cli:.2f}", us_current_block)
            if us_rate is not None:
                us_current_block = re.sub(r'rate:\s*[0-9.]+', f"rate: {us_rate:.2f}", us_current_block)
            if us_spread is not None:
                us_current_block = re.sub(r'spread:\s*[-0-9.]+', f"spread: {us_spread:.2f}", us_current_block)
            if us_gdp is not None:
                us_current_block = re.sub(r'gdp:\s*[-0-9.]+', f"gdp: {us_gdp:.2f}", us_current_block)
            if us_cpi is not None:
                us_current_block = re.sub(r'cpi:\s*[-0-9.]+', f"cpi: {us_cpi:.2f}", us_current_block)
            if us_m2 is not None:
                us_current_block = re.sub(r'm2:\s*[-0-9.]+', f"m2: {us_m2:.2f}", us_current_block)
                
            # Replace inside app_js
            us_presets_part = re.search(r'"US"\s*:\s*\{(.*?)\s*\}\s*,\s*"KR"', app_js, re.DOTALL).group(0)
            new_us_presets_part = us_presets_part.replace(original_us_block, us_current_block)
            app_js = app_js.replace(us_presets_part, new_us_presets_part)
            print("Successfully updated US 2026_current preset values.")
            
        # 2. Update KR 2026_current
        kr_presets_part_match = re.search(r'"KR"\s*:\s*\{(.*?)\s*\}\s*\}', app_js, re.DOTALL)
        if kr_presets_part_match:
            kr_presets_part = kr_presets_part_match.group(0)
            kr_current_match = re.search(r'"2026_current"\s*:\s*\{(.*?)\}', kr_presets_part, re.DOTALL)
            if kr_current_match:
                kr_current_block = kr_current_match.group(1)
                original_kr_block = kr_current_block
                
                # Replace KR variables in preset
                if kr_cli is not None:
                    kr_current_block = re.sub(r'cli:\s*[0-9.]+', f"cli: {kr_cli:.2f}", kr_current_block)
                if kr_rate is not None:
                    kr_current_block = re.sub(r'rate:\s*[0-9.]+', f"rate: {kr_rate:.2f}", kr_current_block)
                if kr_cpi is not None:
                    kr_current_block = re.sub(r'cpi:\s*[-0-9.]+', f"cpi: {kr_cpi:.2f}", kr_current_block)
                if kr_gdp is not None:
                    kr_current_block = re.sub(r'gdp:\s*[-0-9.]+', f"gdp: {kr_gdp:.2f}", kr_current_block)
                if kr_m2 is not None:
                    kr_current_block = re.sub(r'm2:\s*[-0-9.]+', f"m2: {kr_m2:.2f}", kr_current_block)
                    
                new_kr_presets_part = kr_presets_part.replace(original_kr_block, kr_current_block)
                app_js = app_js.replace(kr_presets_part, new_kr_presets_part)
                print("Successfully updated KR 2026_current preset values.")

    # Save changes to app.js
    with open(APP_JS_PATH, "w", encoding="utf-8") as f:
        f.write(app_js)
    print("Saved updated app.js successfully.")
    
    # 6. Apply Updates to index.html
    print("Updating default values in index.html...")

    with open(INDEX_HTML_PATH, "r", encoding="utf-8") as f:
        index_html = f.read()

    # Inject final update date
    current_time_str = datetime.now().strftime('%Y-%m-%d %H:%M')
    date_span = f'<div id="data-updated-at" style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">최종 업데이트: {current_time_str}</div>'
    if 'id="data-updated-at"' in index_html:
        index_html = re.sub(r'<div id="data-updated-at".*?</div>', date_span, index_html)

    # Update timestamp in index.html
    current_time_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    index_html = re.sub(
        r'<span id="data-updated-at"([^>]*)>(.*?)</span>',
        f'<span id="data-updated-at"\\1>\\n                    데이터 기준일: {current_time_str}\\n                </span>',
        index_html,
        flags=re.DOTALL
    )
    print(f"Updated index.html timestamp to {current_time_str}")
    # Update default S&P 500 total cap text in HTML
    if "S&P500" in index_prices:
        sp500_latest = index_prices["S&P500"]
        sp500_cap = 58.50 * (sp500_latest / 5500.0)
        sp500_cap_krw = sp500_cap * exchange_rate
        html_pattern = r'(<span id="mcap-sp500-total"[^>]*>)([^<]+)(</span>)'
        index_html = re.sub(
            html_pattern, 
            r"\g<1>" + f"${sp500_cap:.2f}T (약 {int(sp500_cap_krw):,}조원)" + r"\g<3>", 
            index_html
        )
        print(f"Updated index.html S&P 500 total display: ${sp500_cap:.2f}T (약 {int(sp500_cap_krw):,}조원)")
        
    # Update KOSPI and KOSDAQ totals in HTML
    if "KOSPI" in index_prices:
        kospi_latest = index_prices["KOSPI"]
        kospi_cap = 7413.0 * (kospi_latest / 9063.84)
        index_html = re.sub(
            r'(<span id="mcap-kospi-total"[^>]*>)([^<]+)(</span>)',
            r"\g<1>" + f"{int(kospi_cap):,}조원" + r"\g<3>",
            index_html
        )
        print(f"Updated index.html KOSPI total display: {int(kospi_cap):,}조원")
        
    if "KOSDAQ" in index_prices:
        kosdaq_latest = index_prices["KOSDAQ"]
        kosdaq_cap = 560.0 * (kosdaq_latest / 850.0)
        index_html = re.sub(
            r'(<span id="mcap-kosdaq-total"[^>]*>)([^<]+)(</span>)',
            r"\g<1>" + f"{int(kosdaq_cap):,}조원" + r"\g<3>",
            index_html
        )
        print(f"Updated index.html KOSDAQ total display: {int(kosdaq_cap):,}조원")

    # Add Exchange Rate UI element if missing in sidebar
    if 'id="ui-exchange-rate"' not in index_html:
        target_footer = '<p>Created for <span class="highlight">jinjo202</span></p>'
        replacement_footer = f'{target_footer}\n                <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.2rem; margin-bottom: 0;">적용 환율: 1 USD = <span id="ui-exchange-rate" style="font-weight:600; color:var(--primary-color);">{exchange_rate:.2f}</span>원</p>'
        index_html = index_html.replace(target_footer, replacement_footer)
        print("Injected exchange rate display element into index.html sidebar footer.")
    else:
        index_html = re.sub(
            r'(<span id="ui-exchange-rate"[^>]*>)([^<]+)(</span>)',
            r"\g<1>" + f"{exchange_rate:.2f}" + r"\g<3>",
            index_html
        )
        print(f"Updated exchange rate display in index.html: {exchange_rate:.2f}원")

    with open(INDEX_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(index_html)
    print("Saved updated index.html successfully.")
    
    # 6B. Update & Copy KOREA Greed & Fear Index data
    print("\nUpdating KOREA Greed & Fear Index data...")
    try:
        python_exe = "C:\\Python314\\python.exe"
        gf_script = "c:\\Users\\infomax\\OneDrive\\dev\\GREED-FREAR INDEX\\Scripts\\update_data.py"
        gf_env = os.environ.copy()
        gf_env["PYTHONPATH"] = "c:\\Users\\infomax\\OneDrive\\dev\\GREED-FREAR INDEX\\Lib\\site-packages"
        
        # Run the update_data.py script
        subprocess.run([python_exe, gf_script], env=gf_env, check=True)
        print("[SUCCESS] Greed & Fear Index data updated successfully.")
        
        # Copy files
        import shutil
        src_data_dir = "c:\\Users\\infomax\\OneDrive\\dev\\GREED-FREAR INDEX\\data"
        dest_data_dir = os.path.join(WORKSPACE_DIR, "data")
        os.makedirs(dest_data_dir, exist_ok=True)
        
        shutil.copy(os.path.join(src_data_dir, "historical_index.json"), os.path.join(dest_data_dir, "historical_index.json"))
        shutil.copy(os.path.join(src_data_dir, "analytics.json"), os.path.join(dest_data_dir, "analytics.json"))
        shutil.copy(os.path.join(src_data_dir, "us_historical_index.json"), os.path.join(dest_data_dir, "us_historical_index.json"))
        shutil.copy(os.path.join(src_data_dir, "us_analytics.json"), os.path.join(dest_data_dir, "us_analytics.json"))
        print("[SUCCESS] Greed & Fear Index (KR & US) data copied to business-cycle-dashboard/data/")
    except Exception as e:
        print(f"[ERROR] Failed to update/copy Greed & Fear Index data: {e}")
        
    # 7. Run Verification Script
    print("\nRunning verification script to check for runtime errors...")
    try:
        res = subprocess.run([sys.executable, "verify_local_dashboard.py"], capture_output=True, text=True)
        print("verify_local_dashboard.py output:")
        print(res.stdout)
        if res.returncode == 0:
            print("[SUCCESS] Local dashboard verification passed completely!")
        else:
            print("[FAIL] Verification script failed:")
            print(res.stderr)
    except Exception as ev:
        print(f"Verification process encountered error: {ev}")

    # 8. Auto Deploy to GitHub
    if os.getenv("GITHUB_ACTIONS") == "true":
        print("\nRunning inside GitHub Actions. Skipping manual deploy_to_github.py execution.")
        return

    print("\nDeploying updated dashboard to GitHub Pages...")
    try:
        res = subprocess.run([sys.executable, "deploy_to_github.py"], input="\n", capture_output=True, text=True)
        print(res.stdout)
        if "★ 대시보드 배포 프로세스 완료 ★" in res.stdout:
            print("[SUCCESS] Auto-deployed successfully to GitHub Pages!")
        else:
            print("[FAIL] Deployment failed. Errors:")
            print(res.stderr)
    except Exception as ed:
        print(f"Deployment process encountered error: {ed}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("\n[CRITICAL ERROR] Daily update failed:")
        traceback.print_exc()
