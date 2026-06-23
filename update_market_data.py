import re
import yfinance as yf
import os
import datetime

app_js_path = 'app.js'
index_html_path = 'index.html'

us_tickers = [
    {"name": "Microsoft Corp.", "ticker": "MSFT", "betaX": 4.0, "betaY": 2.0, "baseOffset": 10.0},
    {"name": "Apple Inc.", "ticker": "AAPL", "betaX": 3.5, "betaY": 1.8, "baseOffset": 9.0},
    {"name": "NVIDIA Corp.", "ticker": "NVDA", "betaX": 8.0, "betaY": 6.0, "baseOffset": 22.0},
    {"name": "Alphabet Inc.", "ticker": "GOOGL", "betaX": 3.8, "betaY": 1.9, "baseOffset": 8.0},
    {"name": "Amazon.com Inc.", "ticker": "AMZN", "betaX": 4.5, "betaY": 2.2, "baseOffset": 11.0},
    {"name": "Meta Platforms", "ticker": "META", "betaX": 5.2, "betaY": 3.0, "baseOffset": 12.0},
    {"name": "Berkshire Hathaway", "ticker": "BRK-B", "betaX": 1.5, "betaY": 0.5, "baseOffset": 6.0},
    {"name": "Eli Lilly & Co.", "ticker": "LLY", "betaX": 2.0, "betaY": 1.0, "baseOffset": 18.0},
    {"name": "Broadcom Inc.", "ticker": "AVGO", "betaX": 4.8, "betaY": 2.5, "baseOffset": 13.0},
    {"name": "Tesla Inc.", "ticker": "TSLA", "betaX": 7.0, "betaY": 5.0, "baseOffset": 15.0},
    {"name": "JPMorgan Chase", "ticker": "JPM", "betaX": 1.5, "betaY": 2.5, "baseOffset": 8.0},
    {"name": "UnitedHealth Group", "ticker": "UNH", "betaX": 1.2, "betaY": 0.8, "baseOffset": 6.0},
    {"name": "Visa Inc.", "ticker": "V", "betaX": 2.2, "betaY": 1.4, "baseOffset": 9.0},
    {"name": "Exxon Mobil Corp.", "ticker": "XOM", "betaX": 1.5, "betaY": 3.0, "baseOffset": 5.0},
    {"name": "Johnson & Johnson", "ticker": "JNJ", "betaX": 1.0, "betaY": 0.5, "baseOffset": 4.0}
]

kr_tickers = [
    {"name": "삼성전자", "ticker": "005930.KS", "betaX": 5.5, "betaY": 3.0, "baseOffset": 8.0},
    {"name": "SK하이닉스", "ticker": "000660.KS", "betaX": 8.5, "betaY": 5.0, "baseOffset": 24.0},
    {"name": "LG에너지솔루션", "ticker": "373220.KS", "betaX": 6.0, "betaY": 3.5, "baseOffset": 5.0},
    {"name": "삼성바이오로직스", "ticker": "207940.KS", "betaX": 1.8, "betaY": 0.8, "baseOffset": 7.0},
    {"name": "현대차", "ticker": "005380.KS", "betaX": 3.5, "betaY": 1.5, "baseOffset": 14.0},
    {"name": "기아", "ticker": "000270.KS", "betaX": 3.8, "betaY": 1.6, "baseOffset": 15.0},
    {"name": "셀트리온", "ticker": "068270.KS", "betaX": 2.0, "betaY": 1.0, "baseOffset": 9.0},
    {"name": "KB금융", "ticker": "105560.KS", "betaX": 2.5, "betaY": 1.2, "baseOffset": 18.0},
    {"name": "신한지주", "ticker": "055550.KS", "betaX": 2.2, "betaY": 1.1, "baseOffset": 14.0},
    {"name": "POSCO홀딩스", "ticker": "005490.KS", "betaX": 5.0, "betaY": 2.8, "baseOffset": 6.0},
    {"name": "NAVER", "ticker": "035420.KS", "betaX": 4.5, "betaY": 2.5, "baseOffset": 10.0},
    {"name": "포스코퓨처엠", "ticker": "003670.KS", "betaX": 6.5, "betaY": 3.0, "baseOffset": 12.0},
    {"name": "LG화학", "ticker": "051910.KS", "betaX": 4.0, "betaY": 2.0, "baseOffset": 8.0},
    {"name": "삼성물산", "ticker": "028260.KS", "betaX": 2.0, "betaY": 1.5, "baseOffset": 5.0},
    {"name": "현대모비스", "ticker": "012330.KS", "betaX": 2.5, "betaY": 1.2, "baseOffset": 6.0}
]

def fetch_top_10(ticker_list, divisor, is_kr=False):
    data_list = []
    for item in ticker_list:
        ticker = item["ticker"]
        try:
            t = yf.Ticker(ticker)
            info = t.info
            mcap = info.get('marketCap', 0)
            if mcap == 0:
                continue
                
            mcap_trillions = mcap / divisor
            price = info.get('currentPrice') or info.get('regularMarketPrice') or 0
            fwd_pe = info.get('forwardPE')
            if not fwd_pe or fwd_pe <= 0:
                fwd_pe = info.get('trailingPE') or 15.0
            
            eps_trail = info.get('trailingEps') or 0
            
            eps_0q, eps_1q, eps_0y, eps_1y = 0.0, 0.0, 0.0, 0.0
            try:
                estimates = t.earnings_estimate
                if estimates is not None and not estimates.empty:
                    if '0q' in estimates.index: eps_0q = estimates.loc['0q', 'avg'] or 0.0
                    if '+1q' in estimates.index: eps_1q = estimates.loc['+1q', 'avg'] or 0.0
                    if '0y' in estimates.index: eps_0y = estimates.loc['0y', 'avg'] or 0.0
                    if '+1y' in estimates.index: eps_1y = estimates.loc['+1y', 'avg'] or 0.0
            except Exception:
                pass
                
            if eps_1y == 0 and info.get('forwardEps'):
                eps_1y = info.get('forwardEps')
            
            app_ticker = ticker.replace("-", ".") if not is_kr else ticker.split(".")[0]
            
            data_list.append({
                "name": item["name"],
                "ticker": app_ticker,
                "baseMcap": round(mcap_trillions, 2),
                "betaX": item["betaX"],
                "betaY": item["betaY"],
                "baseOffset": item["baseOffset"],
                "price": round(price, 2),
                "fwdPE": round(fwd_pe, 2),
                "eps_trail": round(eps_trail, 2),
                "eps_0q": round(eps_0q, 2),
                "eps_1q": round(eps_1q, 2),
                "eps_0y": round(eps_0y, 2),
                "eps_1y": round(eps_1y, 2)
            })
            print(f"{app_ticker}: Mcap {mcap_trillions:.2f}T, Price {price}, PE {fwd_pe:.1f}, EPS_1Y {eps_1y:.2f}")
        except Exception as e:
            print(f"Error fetching {ticker}: {e}")
            
    # Sort by mcap descending and take top 10
    data_list.sort(key=lambda x: x["baseMcap"], reverse=True)
    return data_list[:10]

print("Fetching US market data...")
us_top_10 = fetch_top_10(us_tickers, 1_000_000_000_000, False)

print("Fetching KR market data...")
kr_top_10 = fetch_top_10(kr_tickers, 1_000_000_000_000, True)

def generate_js_array(var_name, data_list):
    lines = [f"    const {var_name} = ["]
    for i, d in enumerate(data_list):
        comma = "," if i < len(data_list) - 1 else ""
        s = f'        {{ name: "{d["name"]}", ticker: "{d["ticker"]}", baseMcap: {d["baseMcap"]}, betaX: {d["betaX"]}, betaY: {d["betaY"]}, baseOffset: {d["baseOffset"]}, price: {d["price"]}, fwdPE: {d["fwdPE"]}, eps_trail: {d["eps_trail"]}, eps_0q: {d["eps_0q"]}, eps_1q: {d["eps_1q"]}, eps_0y: {d["eps_0y"]}, eps_1y: {d["eps_1y"]} }}{comma}'
        lines.append(s)
    lines.append("    ];")
    return "\n".join(lines)

us_js = generate_js_array("usTop10Defs", us_top_10)
kr_js = generate_js_array("krTop10Defs", kr_top_10)

if not os.path.exists(app_js_path):
    print("app.js not found.")
    exit(1)

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace usTop10Defs
content = re.sub(r'(?s)const usTop10Defs = \[.*?\];', us_js, content)
# Replace krTop10Defs
content = re.sub(r'(?s)const krTop10Defs = \[.*?\];', kr_js, content)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Market data updated successfully.")

if os.path.exists(index_html_path):
    with open(index_html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    today_str = datetime.datetime.now().strftime("%Y년 %m월 %d일 기준")
    html_content = re.sub(r'\([0-9]{4}년\s*[0-9]{1,2}월\s*[0-9]{1,2}일\s*기준\)', f'({today_str})', html_content)
    with open(index_html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print("Updated date in index.html")
