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
    explanation_text = driver.execute_script("return document.getElementById('transition-phase-explanation').textContent;")
    indicator_grid_child_count = driver.execute_script("return document.getElementById('transition-indicator-grid').children.length;")
    
    # Retrieve Market Feedback State via JS
    feedback_state = driver.execute_script("""
        const monthKey = timeMachineMonths[63].value;
        const usMonthData = getIndicatorsForMonth("US", 63);
        const krMonthData = getIndicatorsForMonth("KR", 63);
        
        const usFlow = getFlowScoreForMonth("US", 63);
        const krFlow = getFlowScoreForMonth("KR", 63);

        const usMacroM = calculateMacroMetrics("US", monthKey, usMonthData.cli, usMonthData.pmi, usMonthData.gdp, usMonthData.m2, usMonthData.rate, usMonthData.spread);
        const usSeasonM = calculateStockSeasonMetrics("US", monthKey, usMonthData.eps, usMonthData.m2, usMonthData.rate, usMonthData.spread, usFlow);
        const usPort = calculateBlendedPortfolio(usMacroM.x, usMacroM.y, usSeasonM.angle, usMonthData.m2, usFlow);

        const krMacroM = calculateMacroMetrics("KR", monthKey, krMonthData.cli, krMonthData.pmi, krMonthData.gdp, krMonthData.m2, krMonthData.rate, krMonthData.spread);
        const krSeasonM = calculateStockSeasonMetrics("KR", monthKey, krMonthData.eps, krMonthData.m2, krMonthData.rate, krMonthData.spread, krFlow);
        const krPort = calculateBlendedPortfolio(krMacroM.x, krMacroM.y, krSeasonM.angle, krMonthData.m2, krFlow);
        return {
            krLoaded: (typeof krFGData !== 'undefined' && krFGData && krFGData.length > 0),
            usLoaded: (typeof usFGData !== 'undefined' && usFGData && usFGData.length > 0),
            feedbackText: document.getElementById('market-feedback-val') ? document.getElementById('market-feedback-val').textContent : '',
            usX: usMacroM.x,
            usY: usMacroM.y,
            usSeason: usSeasonM.seasonKor,
            usFlow: usFlow,
            usPortEq: usPort.eq,
            usPortBo: usPort.bo,
            usPortUsEq: usPort.usEq,
            usPortKrEq: usPort.krEq,
            
            krX: krMacroM.x,
            krY: krMacroM.y,
            krSeason: krSeasonM.seasonKor,
            krFlow: krFlow,
            krPortEq: krPort.eq,
            krPortBo: krPort.bo,
            krPortUsEq: krPort.usEq,
            krPortKrEq: krPort.krEq
        };
    """)
    
    print(f"\nDashboard State:")
    print(f"  activeTimeIndex: {active_index_val} (expected 63)")
    print(f"  timeMachineMonths length: {timeline_len} (expected 64)")
    print(f"  Real Interest Rate cell value: {realrate_val}")
    print(f"  Equity Risk Premium (ERP) cell value: {erp_val}")
    print(f"  KOSPI / G&F Data Loaded: {feedback_state['krLoaded']}")
    print(f"  S&P500 / G&F Data Loaded: {feedback_state['usLoaded']}")
    print(f"  Sidebar Feedback Status Widget text: '{feedback_state['feedbackText']}'")
    print(f"  US August 2026 Macro Coordinates: X={feedback_state['usX']:.4f}, Y={feedback_state['usY']:.4f}")
    print(f"  US August 2026 Stock Season: {feedback_state['usSeason']}")
    print(f"  US Flow Score: {feedback_state['usFlow']:.4f}")
    print(f"  US Port Eq: {feedback_state['usPortEq']}%, Bonds: {feedback_state['usPortBo']}%")
    print(f"  US US-EQ Weight: {feedback_state['usPortUsEq']}%, KR-EQ Weight: {feedback_state['usPortKrEq']}%")
    print(f"  KR August 2026 Macro Coordinates: X={feedback_state['krX']:.4f}, Y={feedback_state['krY']:.4f}")
    print(f"  KR August 2026 Stock Season: {feedback_state['krSeason']}")
    print(f"  KR Flow Score: {feedback_state['krFlow']:.4f}")
    print(f"  KR Port Eq: {feedback_state['krPortEq']}%, Bonds: {feedback_state['krPortBo']}%")
    print(f"  KR US-EQ Weight: {feedback_state['krPortUsEq']}%, KR-EQ Weight: {feedback_state['krPortKrEq']}%")
    
    print(f"  MoM Transition Narrative: '{explanation_text.strip()}'")
    print(f"  MoM Comparison Grid Child Count: {indicator_grid_child_count} (expected 9)")
    
    conditions_met = (
        active_index_val == 63 and 
        timeline_len == 64 and 
        realrate_val and 
        erp_val and 
        feedback_state['krLoaded'] and 
        feedback_state['usLoaded'] and 
        "활성" in feedback_state['feedbackText'] and
        len(explanation_text.strip()) > 0 and
        indicator_grid_child_count == 9
    )
    
    if conditions_met:
        print("[SUCCESS] Timeline extended, RealRate/ERP indicators, Dynamic Market Feedback, and MoM Transition Narrative explanations are active and fully working!")
    else:
        print("[FAIL] Dashboard state parameters or Market Feedback/Narrative parameters do not match expected values!")

finally:
    if driver:
        driver.quit()
    print("Stopping Python HTTP server...")
    server_proc.terminate()
    server_proc.wait()
    print("Verification script finished.")
