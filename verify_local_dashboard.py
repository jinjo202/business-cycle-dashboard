import sys

# Ensure the standard user site-packages are in the path for this split Python installation
user_site_packages = r"C:\Users\infomax\AppData\Local\Programs\Python\Python314\Lib\site-packages"
if user_site_packages not in sys.path:
    sys.path.append(user_site_packages)

import time
import subprocess
import socket
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

sys.stdout.reconfigure(encoding='utf-8')

def find_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('localhost', 0))
    port = s.getsockname()[1]
    s.close()
    return port

port = 8089
print(f"Starting Python HTTP server on port {port}...")

# Start Python simple HTTP server
server_proc = subprocess.Popen(
    [sys.executable, "-m", "http.server", str(port)],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

time.sleep(1.5) # Wait for server to boot up

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Enable logging of browser console
chrome_options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})

driver = None
try:
    driver = webdriver.Chrome(options=chrome_options)
    print("WebDriver initialized successfully.")
    
    url = f"http://localhost:{port}/index.html"
    print(f"Loading local URL: {url}")
    driver.get(url)
    
    # Wait for page load and execution
    time.sleep(3.0)
    
    print("\n=== Local Browser Console Logs ===")
    logs = driver.get_log('browser')
    has_error = False
    
    if not logs:
        print("No console logs found (this is great!).")
    else:
        for entry in logs:
            level = entry['level']
            message = entry['message']
            if 'favicon.ico' in message:
                continue
            print(f"[{level}] {message}")
            if level in ['SEVERE', 'ERROR'] or 'SyntaxError' in message or 'TypeError' in message:
                has_error = True
                
    if has_error:
        print("\n[FAIL] Found severe error(s) in console logs!")
    else:
        print("\n[SUCCESS] No severe errors found in console logs!")
        
    # Check if we can read index.html elements or timeline length
    active_index_val = driver.execute_script("return activeTimeIndex;")
    timeline_len = driver.execute_script("return timeMachineMonths.length;")
    realrate_val = driver.execute_script("return document.getElementById('table-realrate-val').textContent;")
    erp_val = driver.execute_script("return document.getElementById('table-erp-val').textContent;")
    
    print(f"\nDashboard State:")
    print(f"  activeTimeIndex: {active_index_val} (expected 63)")
    print(f"  timeMachineMonths length: {timeline_len} (expected 64)")
    print(f"  Real Interest Rate cell value: {realrate_val}")
    print(f"  Equity Risk Premium (ERP) cell value: {erp_val}")
    
    if active_index_val == 63 and timeline_len == 64 and realrate_val and erp_val:
        print("[SUCCESS] Timeline extended and RealRate/ERP indicators loaded successfully!")
    else:
        print("[FAIL] Dashboard state parameters do not match expected values!")

finally:
    if driver:
        driver.quit()
    print("Stopping Python HTTP server...")
    server_proc.terminate()
    server_proc.wait()
    print("Verification script finished.")
