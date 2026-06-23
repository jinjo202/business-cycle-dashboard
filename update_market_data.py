import re
import yfinance as yf
import os

app_js_path = 'app.js'

us_tickers = ["MSFT", "AAPL", "NVDA", "GOOGL", "AMZN", "META", "BRK-B", "LLY", "AVGO", "TSLA"]
kr_tickers = ["005930.KS", "000660.KS", "373220.KS", "207940.KS", "005380.KS", "000270.KS", "068270.KS", "105560.KS", "055550.KS", "005490.KS"]

mcap_data = {}

def fetch_data(ticker_list, divisor, is_kr=False):
    for ticker in ticker_list:
        try:
            info = yf.Ticker(ticker).info
            mcap = info.get('marketCap', 0)
            mcap_trillions = mcap / divisor
            
            price = info.get('currentPrice') or info.get('regularMarketPrice') or 0
            fwd_pe = info.get('forwardPE')
            if not fwd_pe or fwd_pe <= 0:
                fwd_pe = info.get('trailingPE') or 15.0
                
            fwd_eps = info.get('forwardEps')
            if not fwd_eps and price > 0:
                fwd_eps = price / fwd_pe
            elif not fwd_eps:
                fwd_eps = 0

            app_ticker = ticker.replace("-", ".") if not is_kr else ticker.split(".")[0]
            
            mcap_data[app_ticker] = {
                'mcap': round(mcap_trillions, 2),
                'price': round(price, 2),
                'fwdPE': round(fwd_pe, 2),
                'fwdEps': round(fwd_eps, 2)
            }
            print(f"{app_ticker}: Mcap {mcap_trillions:.2f}T, Price {price}, PE {fwd_pe:.1f}, EPS {fwd_eps:.2f}")
        except Exception as e:
            print(f"Error fetching {ticker}: {e}")

print("Fetching US market data...")
fetch_data(us_tickers, 1_000_000_000_000, False)

print("Fetching KR market data...")
fetch_data(kr_tickers, 1_000_000_000_000, True)

if not os.path.exists(app_js_path):
    print("app.js not found.")
    exit(1)

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("Updating app.js...")
updated_count = 0
for ticker, data in mcap_data.items():
    if data['mcap'] > 0:
        # Update baseMcap
        mcap_pat = r'(ticker:\s*"{0}",\s*baseMcap:\s*)[0-9\.]+(,)'.format(re.escape(ticker))
        if re.search(mcap_pat, content):
            content = re.sub(mcap_pat, r'\g<1>{0}\g<2>'.format(data['mcap']), content)
            
            # Now we need to append price, fwdPE, fwdEps if they don't exist, or update them
            # Let's match the end of the object for this ticker. 
            # E.g. baseOffset: 10.0 } or baseOffset: 10.0, price: 100 }
            # Since we might run this multiple times, let's strip out existing price/fwdPE/fwdEps first for this line
            line_pat = r'(ticker:\s*"{0}".*?baseOffset:\s*[\-0-9\.]+)(.*?)(}})'.format(re.escape(ticker))
            # replace with baseOffset..., price: X, fwdPE: Y, fwdEps: Z }
            repl = r'\g<1>, price: {0}, fwdPE: {1}, fwdEps: {2} \g<3>'.format(data['price'], data['fwdPE'], data['fwdEps'])
            content = re.sub(line_pat, repl, content)
            updated_count += 1
        else:
            print(f"Could not find ticker pattern in app.js for {ticker}")

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Market data updated successfully. ({updated_count}/20 tickers updated)")
