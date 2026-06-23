import re
import yfinance as yf
import os

app_js_path = 'app.js'

# Mapping of tickers to their yfinance symbols
us_tickers = ["MSFT", "AAPL", "NVDA", "GOOGL", "AMZN", "META", "BRK-B", "LLY", "AVGO", "TSLA"]
kr_tickers = ["005930.KS", "000660.KS", "373220.KS", "207940.KS", "005380.KS", "000270.KS", "068270.KS", "105560.KS", "055550.KS", "005490.KS"]

mcap_data = {}

print("Fetching US market caps...")
for ticker in us_tickers:
    try:
        info = yf.Ticker(ticker).info
        mcap = info.get('marketCap', 0)
        mcap_trillions = mcap / 1_000_000_000_000
        # Restore BRK-B to BRK.B for matching in app.js
        app_ticker = ticker.replace("-", ".")
        mcap_data[app_ticker] = round(mcap_trillions, 2)
        print(f"{app_ticker}: ${mcap_trillions:.2f}T")
    except Exception as e:
        print(f"Error fetching {ticker}: {e}")

print("Fetching KR market caps...")
for ticker in kr_tickers:
    try:
        info = yf.Ticker(ticker).info
        mcap = info.get('marketCap', 0)
        # Korean market cap from yfinance is in KRW
        mcap_trillions = mcap / 1_000_000_000_000
        app_ticker = ticker.split(".")[0]
        mcap_data[app_ticker] = round(mcap_trillions, 2)
        print(f"{app_ticker}: {mcap_trillions:.2f}T KRW")
    except Exception as e:
        print(f"Error fetching {ticker}: {e}")

# Read app.js
if not os.path.exists(app_js_path):
    print("app.js not found.")
    exit(1)

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update Top 10
print("Updating app.js...")
updated_count = 0
for ticker, mcap in mcap_data.items():
    if mcap > 0:
        pattern = r'(ticker:\s*"{0}",\s*baseMcap:\s*)[0-9\.]+(,)'.format(re.escape(ticker))
        # Check if match exists
        if re.search(pattern, content):
            content = re.sub(pattern, r'\g<1>{0}\g<2>'.format(mcap), content)
            updated_count += 1
        else:
            print(f"Could not find ticker pattern in app.js for {ticker}")

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Market data updated successfully. ({updated_count}/20 tickers updated)")
