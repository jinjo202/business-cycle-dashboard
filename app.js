// MACROECONOMIC ENGINE & STOCK SEASONS INTERACTION WITH M2 LIQUIDITY

// 1. DUAL-MARKET REGIONAL HISTORICAL PRESETS (US vs KR) WITH M2
const historicalPresets = {
    "US": {
        "2000_dotcom": {
            title: "2000년 IT 버블 붕괴 및 침체기",
            cli: 98.2, pmi: 43.5, gdp: 0.5, eps: -12.0, m2: 6.2, cpi: 3.4, rate: 6.5, spread: -0.4,
            phase: "contraction", season: "winter",
            summary: "닷컴 버블 붕괴와 9/11 테러 여파로 실물 경제와 기업 이익이 급격히 위축되었습니다. 연준은 기준금리를 6.5%에서 인하하기 시작했으나 장단기 금리차가 역전된 후 주식시장 역실적장세(겨울)가 본격화되었습니다.",
            lessons: "버블 붕괴 국면에서는 고평가된 기술주를 피하고 장기 국채 및 현금 비중을 높이는 극단적인 방어 포지션이 유효했습니다. 연준의 급격한 금리 인하가 시작되더라도 실물 지표와 어닝 전망이 바닥을 잡기 전까지 주식 매수는 보수적으로 제한해야 합니다.",
            trail: [{ x: 1.5, y: -0.2 }, { x: 0.8, y: -1.2 }, { x: -0.2, y: -2.1 }, { x: -1.2, y: -2.6 }, { x: -2.2, y: -2.5 }, { x: -2.4, y: -1.8 }]
        },
        "2004_expansion": {
            title: "2004년 글로벌 동반 성장기",
            cli: 101.8, pmi: 58.5, gdp: 4.2, eps: 18.0, m2: 5.0, cpi: 2.7, rate: 1.5, spread: 1.8,
            phase: "expansion", season: "summer",
            summary: "IT 버블을 완벽히 극복하고 저금리 기조 속에서 부동산 및 글로벌 제조업 활성화로 경제가 동반 확장(Expansion)에 진입, 전형적인 주식시장 실적장세(여름)를 보였습니다.",
            lessons: "금리 인상 초기 단계이자 강력한 실물 수요와 주당순이익(Fwd EPS) 성장이 확인되는 시기에는 주식과 경기민감 원자재 투자가 최고의 성과를 냅니다. 고배당보다 성장형 기술주와 산업재에 집중하는 적극적인 투자 배치가 승률을 높입니다.",
            trail: [{ x: -1.0, y: 0.5 }, { x: -0.2, y: 1.4 }, { x: 0.8, y: 2.1 }, { x: 1.6, y: 2.4 }, { x: 2.1, y: 2.6 }, { x: 2.4, y: 2.1 }]
        },
        "2008_crisis": {
            title: "2008년 글로벌 금융위기 (리먼 사태)",
            cli: 96.2, pmi: 34.0, gdp: -3.5, eps: -24.5, m2: 8.5, cpi: 1.1, rate: 1.5, spread: 0.8,
            phase: "contraction", season: "winter",
            summary: "서브프라임 모기지 사태와 리먼 브라더스 파산으로 신용 자금줄이 마비되었습니다. 기업 실적 전망이 급격한 역성장으로 곤두박질치며 가혹한 역실적장세(겨울)가 몰아쳤습니다. 연준은 긴급 유동성 수혈을 시작하여 M2 증가율은 상승세였습니다.",
            lessons: "대공황 이래 최대 금융 마비로 모든 위험자산이 동반 낙하했으며, 포트폴리오 차원에서 주식 비중을 최소화하고 미국 국채와 달러 현금을 지키는 대피소형 전략만이 유일하게 성공적인 방어를 제공했습니다.",
            trail: [{ x: 0.8, y: -0.8 }, { x: -0.1, y: -1.8 }, { x: -1.2, y: -2.8 }, { x: -2.4, y: -3.5 }, { x: -3.2, y: -3.7 }, { x: -3.8, y: -2.9 }]
        },
        "2010_recovery": {
            title: "2010년 위기 극복 및 조기 회복기",
            cli: 100.8, pmi: 55.2, gdp: 2.8, eps: 15.0, m2: 3.5, cpi: 1.6, rate: 0.25, spread: 2.5,
            phase: "recovery", season: "spring",
            summary: "미 연준의 역사적인 제로금리 및 양적완화(QE) 도입과 함께 실물 경기는 바닥이나 제조업 서베이가 먼저 반등하며 강한 유동성 효과에 기반한 금융장세(봄)를 촉진했습니다.",
            lessons: "불황의 끝자락에서 강력한 통화 완화와 함께 선행 지표가 살아날 때는 '돈의 힘'으로 실적 부진을 덮고 주가가 먼저 도약합니다. 금리 민감 금융주와 낙폭과대 대형주를 선제적으로 편입해야 하는 구간입니다.",
            trail: [{ x: -3.2, y: -1.5 }, { x: -2.3, y: -0.2 }, { x: -1.4, y: 0.9 }, { x: -0.6, y: 1.7 }, { x: 0.3, y: 2.3 }, { x: 0.8, y: 2.0 }]
        },
        "2018_late": {
            title: "2018년 연준 긴축 & 미·중 무역 분쟁기",
            cli: 99.5, pmi: 49.8, gdp: 1.9, eps: 5.0, m2: 3.8, cpi: 2.2, rate: 2.25, spread: 0.15,
            phase: "slowdown", season: "autumn",
            summary: "누적된 연준의 금리 인상 및 대차대조표 축소(QT)와 무역전쟁 격화로 투자 심리가 급격히 냉각되었습니다. 실적 성장이 피크아웃하고 유동성이 극도로 축소되며 전형적인 역금융장세(가을) 성격을 보였습니다.",
            lessons: "장단기 금리차가 제로 부근에 도달하고 연준의 매파적 스탠스가 유지될 때는 위험 자산 비중을 정밀 조율하고 가치주, 필수재 및 고배당 현금 흐름 우량주 중심으로 포트폴리오를 다변화해야 이탈률을 방어할 수 있습니다.",
            trail: [{ x: 1.4, y: 0.6 }, { x: 1.0, y: -0.2 }, { x: 0.6, y: -0.8 }, { x: 0.2, y: -1.3 }, { x: -0.2, y: -1.5 }, { x: -0.6, y: -0.9 }]
        },
        "2021_boom": {
            title: "2021년 초과 유동성 & 보복 소비 붐",
            cli: 102.5, pmi: 62.1, gdp: 5.7, eps: 29.5, m2: 18.5, cpi: 6.8, rate: 0.25, spread: 1.2,
            phase: "expansion", season: "summer",
            summary: "전 세계적인 유동성 살포(M2 증가율 역사상 최고 18.5%)와 보복 소비로 실물 성장과 기업의 Forward EPS가 폭발적으로 증가했습니다. 저금리 하에서 이익 탄력이 극대화된 최고조의 실적장세(여름)가 연출되었습니다.",
            lessons: "수요가 가파르고 실적 성장이 보장되는 구간에서는 고밸류 빅테크 성장주와 원자재 자산이 압도적 아웃퍼폼을 제공합니다. 다만 높은 인플레이션율(${cpi}%)이 후행적으로 중앙은행의 매파 전환 압력을 높이게 됨을 인지해야 합니다.",
            trail: [{ x: -1.5, y: 1.5 }, { x: 0.0, y: 2.8 }, { x: 1.5, y: 3.4 }, { x: 2.4, y: 3.4 }, { x: 2.9, y: 2.9 }, { x: 3.2, y: 1.8 }]
        },
        "2026_current": {
            title: "2026년 미국 연착륙 성공 & AI 확장기",
            cli: 100.2, pmi: 51.5, gdp: 2.2, eps: 10.5, m2: 4.5, cpi: 2.3, rate: 4.0, spread: 0.2,
            phase: "expansion", season: "summer",
            summary: "안정적인 인플레이션 통제와 함께 중앙은행이 중립 금리 수준으로 질서 있게 인하하는 구간입니다. 시중 유동성이 정상 궤도를 회복(M2 증가율 4.5%)하며 AI 생산성 혁신이 실적(Forward EPS)을 주도하는 골디락스 실적장세(여름)입니다.",
            lessons: "실적이 지속 성장하고 물가와 금리가 하향 안정을 보이는 골디락스 단계에서는 AI 빅테크 및 우량 성장 기업 주식 중심의 공격적 포지션 배치가 가장 높은 자본 효율성을 안겨다 줍니다.",
            trail: [{ x: -0.8, y: -0.5 }, { x: -0.2, y: 0.3 }, { x: 0.3, y: 0.9 }, { x: 0.7, y: 1.2 }, { x: 1.0, y: 1.2 }, { x: 1.1, y: 0.9 }]
        }
    },
    "KR": {
        "2000_dotcom": {
            title: "2000년 코스닥 닷컴 버블 붕괴",
            cli: 97.8, pmi: 42.0, gdp: -1.0, eps: -25.0, m2: 15.0, cpi: 2.8, rate: 5.25, spread: -0.2,
            phase: "contraction", season: "winter",
            summary: "코스닥 중심의 극단적 투기 붐 붕괴와 대기업 구조조정이 겹쳤습니다. 외환위기 복구 유동성 살포(M2: 15%)에도 불구하고 이익 전망이 참혹하게 무너지며 지수가 수직 급락하는 혹독한 역실적장세(겨울)를 보였습니다.",
            lessons: "한국 시장은 대외 변동성에 심해, 닷컴 붕괴기에는 현금 확보 및 신용 위험이 적은 초우량 대형 국채로 피신하는 정밀한 방어 체계 구축만이 살길이었습니다.",
            trail: [{ x: 1.2, y: -0.5 }, { x: 0.6, y: -1.4 }, { x: -0.3, y: -2.3 }, { x: -1.3, y: -2.8 }, { x: -2.1, y: -2.7 }, { x: -2.3, y: -2.0 }]
        },
        "2004_expansion": {
            title: "2004년 중국 특수 & 코스피 대도약기",
            cli: 101.5, pmi: 56.0, gdp: 4.0, eps: 22.0, m2: 6.5, cpi: 3.6, rate: 3.75, spread: 1.2,
            phase: "expansion", season: "summer",
            summary: "중국의 고속 성장에 따른 원자재/조선/해운 특수(브릭스 붐)로 한국 수출 기업들의 Forward EPS가 폭발하며 코스피가 역사적 상승세를 탄 실적장세(여름)입니다. 시중 유동성 공급도 안정적이었습니다.",
            lessons: "한국의 제조업 기반 순환 특성상, 중국 및 글로벌 성장 사이클과 맞물리는 실적장세에는 무조건 중화학공업, 철강, 소재, 해운 등 경기민감 대형주에 레버리지를 실어 초과이익을 도모해야 합니다.",
            trail: [{ x: -1.2, y: 0.3 }, { x: -0.4, y: 1.2 }, { x: 0.5, y: 1.9 }, { x: 1.3, y: 2.2 }, { x: 1.9, y: 2.3 }, { x: 2.2, y: 1.8 }]
        },
        "2008_crisis": {
            title: "2008년 금융위기 & 고환율·신용 경색",
            cli: 95.5, pmi: 32.5, gdp: -4.5, eps: -35.0, m2: 12.0, cpi: 4.7, rate: 3.0, spread: 0.4,
            phase: "contraction", season: "winter",
            summary: "글로벌 불황과 원·달러 환율 폭등, 자본 이탈이 겹쳐 코스피가 900선 이하로 밀렸습니다. 한은의 긴급 금융 수혈로 M2 유동성은 12% 늘었으나, 실물 제조업 가동률이 붕괴된 최악의 역실적장세(겨울)였습니다.",
            lessons: "대외 의존도가 높은 KOSPI는 글로벌 위기 시 외국인 자금 이탈로 지수가 반토막 납니다. 환율 방어가 되는 외화 현금 자산과 우량 장기 국채 중심의 초보수 포지션 전환이 강제되는 구간입니다.",
            trail: [{ x: 1.0, y: -0.9 }, { x: 0.1, y: -1.9 }, { x: -1.0, y: -2.9 }, { x: -2.1, y: -3.5 }, { x: -2.8, y: -3.6 }, { x: -3.2, y: -2.8 }]
        },
        "2011_chawajung": {
            title: "2011년 코스피 '차·화·정' 주도 강세장",
            cli: 102.2, pmi: 57.5, gdp: 3.7, eps: 26.0, m2: 7.5, cpi: 4.0, rate: 3.25, spread: 1.0,
            phase: "expansion", season: "summer",
            summary: "위기 후 글로벌 경기 회복 속에 자동차, 화학, 정유(차화정) 업종의 실적이 압도적으로 아웃퍼폼하며 코스피 지수를 사상 최초로 2,200선 위로 견인했던 실적장세(여름)입니다. 시중 유동성도 양호했습니다.",
            lessons: "KOSPI의 전형적인 압축 주도주 장세였습니다. 이 시기에는 지수 분산보다 실적(Forward EPS) 가속도가 독보적으로 높은 주도 섹터(차·화·정)에 포트폴리오를 과감하게 집중 편입시키는 압축 전략이 정답이었습니다.",
            trail: [{ x: -2.2, y: 0.5 }, { x: -1.0, y: 1.6 }, { x: 0.2, y: 2.3 }, { x: 1.2, y: 2.5 }, { x: 1.9, y: 2.4 }, { x: 2.2, y: 1.9 }]
        },
        "2018_semicon": {
            title: "2018년 반도체 슈퍼사이클 & 미·중 무역 쇼크",
            cli: 99.0, pmi: 48.5, gdp: 2.4, eps: 12.0, m2: 6.2, cpi: 1.5, rate: 1.75, spread: 0.3,
            phase: "slowdown", season: "autumn",
            summary: "삼성전자/하이닉스의 사상 최대 이익에도 불구하고 글로벌 유동성 축소(M2 둔화)와 미중 무역 갈등으로 코스피 주가는 선행하여 하락한 역금융장세(가을) 국면입니다.",
            lessons: "KOSPI는 이익이 최고치일 때가 종종 매도 정점이 됩니다. 선행 주당순이익 성장률이 고점을 찍고 둔화 조짐을 보이며 거시 유동성 공급 속도가 하락할 때는 적극적인 리스크 관리가 필요합니다.",
            trail: [{ x: 1.5, y: 0.5 }, { x: 1.1, y: -0.1 }, { x: 0.7, y: -0.7 }, { x: 0.3, y: -1.2 }, { x: -0.1, y: -1.4 }, { x: -0.4, y: -0.9 }]
        },
        "2020_donghak": {
            title: "2020년 팬데믹 급락 후 '동학개미' 유동성 붐",
            cli: 100.8, pmi: 54.0, gdp: -1.0, eps: 8.0, m2: 9.8, cpi: 0.5, rate: 0.50, spread: 1.1,
            phase: "recovery", season: "spring",
            summary: "코로나 충격 후 사상 초유의 기준금리 인하(0.5%)와 개인 투자자들의 유동성 유입(M2 증가율 9.8%)이 맞물리며 코스피가 폭발적으로 선행 반등했던 금융장세(봄)입니다.",
            lessons: "실물 지표(GDP 성장률 마이너스)는 최악이었으나, 개인 중심의 압도적 머니무브와 초저금리가 시너지를 내며 IT 대형주가 폭등했습니다. 지표 부진의 공포를 이겨내고 레버리지를 늘려 주식 비중을 채웠어야 하는 국면입니다.",
            trail: [{ x: -3.0, y: -1.5 }, { x: -2.0, y: -0.5 }, { x: -1.0, y: 0.5 }, { x: -0.2, y: 1.2 }, { x: 0.4, y: 1.6 }, { x: 0.7, y: 1.4 }]
        },
        "2022_winter": {
            title: "2022년 금리 급상승 & 메모리 반도체 빙하기",
            cli: 98.2, pmi: 46.0, gdp: 1.5, eps: -18.0, m2: 5.4, cpi: 5.1, rate: 3.25, spread: -0.5,
            phase: "contraction", season: "winter",
            summary: "글로벌 긴축 속 반도체 재고 과잉으로 삼성전자 등 수출 대기업들의 실적 전망이 처참히 박살났습니다. 시중 통화량(M2) 증가세가 5.4%로 위축된 가운데 역실적장세(겨울)가 찾아왔습니다.",
            lessons: "반도체 다운사이클과 긴축 폭풍이 정통으로 만나는 역실적장세에는 무조건 안전자산(예금, 달러 채권) 비중을 60% 이상으로 유지하고 반도체 적자 폭이 극에 달할 때까지 대형주 신규 매수를 극단적으로 아껴야 합니다.",
            trail: [{ x: 1.5, y: 0.8 }, { x: 1.0, y: 0.1 }, { x: 0.4, y: -0.6 }, { x: -0.2, y: -1.3 }, { x: -0.7, y: -1.8 }, { x: -1.0, y: -1.3 }]
        },
        "2026_current": {
            title: "2026년 반도체 HBM 부활 & 주주환원 성장기",
            cli: 100.5, pmi: 52.0, gdp: 2.5, eps: 200.0, m2: 6.0, cpi: 2.1, rate: 3.25, spread: 0.4,
            phase: "expansion", season: "summer",
            summary: "AI 고대역폭메모리(HBM) 수출 호조와 기업 밸류업 프로그램 가동으로 선행 이익 성장이 두드러집니다. 통화량 공급도 정상 궤도(M2 6.0%)에 복귀한 안정적 실적장세(여름)입니다.",
            lessons: "실물 선행 지수가 안정적이고 이익 성장 모멘텀이 강한 확장 국면에서는 반도체, AI 장비주, 그리고 기업 밸류업 프로그램 수혜 우량 지주사/금융주 중심의 강한 포커싱 투자 전략이 최상의 성과를 제공합니다.",
            trail: [{ x: -0.6, y: -0.4 }, { x: -0.1, y: 0.2 }, { x: 0.3, y: 0.7 }, { x: 0.6, y: 1.0 }, { x: 0.8, y: 1.0 }, { x: 0.9, y: 0.8 }]
        }
    }
};

// 1B. DUAL-MARKET REGIONAL EXPORT DATA FROM KITA & CENSUS BUREAU
const exportData = {
    "US": {
        "2026-05": {
            growthVal: "+3.2%",
            growthTrend: "▲ AI 서비스 및 에너지 견인",
            balanceVal: "-625억 달러 적자",
            balanceTrend: "▼ 소비재 수입 지속 우위",
            ebsiVal: "102.8",
            ebsiTrend: "▲ 글로벌 테크 수요 안착",
            items: [
                { name: "IT 서비스, IP 및 SW 로열티", pct: 32, change: "+8.5%", barClass: "summer" },
                { name: "민간 항공기 및 방산 우주 장비", pct: 12, change: "+4.2%", barClass: "spring" },
                { name: "셰일 오일 및 정제 액화 에너지 자원", pct: 10, change: "+6.0%", barClass: "autumn" },
                { name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 6, change: "-1.5%", barClass: "winter" }
            ]
        },
        "2026-04": {
            growthVal: "+3.5%",
            growthTrend: "▲ 봄철 테크 결제 대행 팽창",
            balanceVal: "-612억 달러 적자",
            balanceTrend: "▼ 적자 폭 일시 축소",
            ebsiVal: "103.0",
            ebsiTrend: "▲ 금리 안정 조짐 반등",
            items: [
                { name: "IT 서비스, IP 및 SW 로열티", pct: 31, change: "+9.0%", barClass: "summer" },
                { name: "민간 항공기 및 방산 우주 장비", pct: 12, change: "+4.5%", barClass: "spring" },
                { name: "셰일 오일 및 정제 액화 에너지 자원", pct: 10, change: "+5.8%", barClass: "autumn" },
                { name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 6, change: "-1.2%", barClass: "winter" }
            ]
        },
        "2026-03": {
            growthVal: "+2.8%",
            growthTrend: "▲ 제조업 심리 회복에 따른 선적 증가",
            balanceVal: "-638억 달러 적자",
            balanceTrend: "▼ 수입 원자재 대규모 유입",
            ebsiVal: "102.0",
            ebsiTrend: "─ 공급망 완화 추세 부합",
            items: [
                { name: "IT 서비스, IP 및 SW 로열티", pct: 32, change: "+8.0%", barClass: "summer" },
                { name: "민간 항공기 및 방산 우주 장비", pct: 11, change: "+3.8%", barClass: "spring" },
                { name: "셰일 오일 및 정제 액화 에너지 자원", pct: 9, change: "+5.2%", barClass: "autumn" },
                { name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 5, change: "-2.0%", barClass: "winter" }
            ]
        },
        "2025-04": {
            growthVal: "+1.8%",
            growthTrend: "▼ 글로벌 경기 둔화 우려 여파",
            balanceVal: "-662억 달러 적자",
            balanceTrend: "▼ 고금리 속 소비재 수입 고착",
            ebsiVal: "99.5",
            ebsiTrend: "▼ 100선 일시 하회",
            items: [
                { name: "IT 서비스, IP 및 SW 로열티", pct: 30, change: "+5.2%", barClass: "summer" },
                { name: "민간 항공기 및 방산 우주 장비", pct: 12, change: "+2.8%", barClass: "spring" },
                { name: "셰일 오일 및 정제 액화 에너지 자원", pct: 11, change: "+3.0%", barClass: "autumn" },
                { name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 5, change: "-4.5%", barClass: "winter" }
            ]
        },
        "2025-03": {
            growthVal: "+1.2%",
            growthTrend: "▼ 인플레이션 충격으로 인한 수요 정체",
            balanceVal: "-675억 달러 적자",
            balanceTrend: "▼ 무역 수지 지속 약화",
            ebsiVal: "98.0",
            ebsiTrend: "▼ 제조업 생산량 감소세",
            items: [
                { name: "IT 서비스, IP 및 SW 로열티", pct: 29, change: "+4.5%", barClass: "summer" },
                { name: "민간 항공기 및 방산 우주 장비", pct: 12, change: "+2.2%", barClass: "spring" },
                { name: "셰일 오일 및 정제 액화 에너지 자원", pct: 11, change: "+2.5%", barClass: "autumn" },
                { name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 5, change: "-5.0%", barClass: "winter" }
            ]
        }
    },
    "KR": {
        "2026-05": {
            growthVal: "+11.5%",
            growthTrend: "▲ HBM/DRAM 반도체 대형 사이클 주도",
            balanceVal: "+45억 달러 흑자",
            balanceTrend: "▲ 반도체 호조로 흑자 폭 확대",
            ebsiVal: "112.5",
            ebsiTrend: "▲ 100 기준점 돌파 (수출 회복기)",
            items: [
                { name: "반도체 (DRAM / HBM 메모리 포함)", pct: 18, change: "+42.5%", barClass: "summer" },
                { name: "자동차, 친환경차 및 완성차 부품", pct: 13, change: "+12.2%", barClass: "spring" },
                { name: "석유화학 제품 및 합성수지", pct: 8, change: "-2.4%", barClass: "winter" },
                { name: "선박, LNG 고부가가치 운반선", pct: 6, change: "+18.0%", barClass: "autumn" }
            ]
        },
        "2026-04": {
            growthVal: "+13.8%",
            growthTrend: "▲ 대미 친환경 자동차 및 신형 칩셋 선적 폭발",
            balanceVal: "+51억 달러 흑자",
            balanceTrend: "▲ 무역 수지 11개월 연속 흑자 기조",
            ebsiVal: "110.0",
            ebsiTrend: "▲ 주요 수출 업종 동반 성장 국면",
            items: [
                { name: "반도체 (DRAM / HBM 메모리 포함)", pct: 19, change: "+45.0%", barClass: "summer" },
                { name: "자동차, 친환경차 및 완성차 부품", pct: 13, change: "+11.5%", barClass: "spring" },
                { name: "석유화학 제품 및 합성수지", pct: 8, change: "-1.8%", barClass: "winter" },
                { name: "선박, LNG 고부가가치 운반선", pct: 5, change: "+15.5%", barClass: "autumn" }
            ]
        },
        "2026-03": {
            growthVal: "+9.8%",
            growthTrend: "▲ AI 서버용 고용량 모듈 수출 호조",
            balanceVal: "+42억 달러 흑자",
            balanceTrend: "▲ 에너지 수입액 감소에 따른 반사이익",
            ebsiVal: "108.5",
            ebsiTrend: "▲ 대외 제조업 심리 개선 동행",
            items: [
                { name: "반도체 (DRAM / HBM 메모리 포함)", pct: 17, change: "+38.0%", barClass: "summer" },
                { name: "자동차, 친환경차 및 완성차 부품", pct: 13, change: "+9.8%", barClass: "spring" },
                { name: "석유화학 제품 및 합성수지", pct: 8, change: "-3.0%", barClass: "winter" },
                { name: "선박, LNG 고부가가치 운반선", pct: 6, change: "+12.4%", barClass: "autumn" }
            ]
        },
        "2025-04": {
            growthVal: "+4.5%",
            growthTrend: "▲ IT 기기 기저효과 턴어라운드 진입",
            balanceVal: "+22억 달러 흑자",
            balanceTrend: "▲ 무역 수지 불황형 흑자 탈피 조짐",
            ebsiVal: "98.0",
            ebsiTrend: "▼ 글로벌 금리 제약 완화 관망",
            items: [
                { name: "반도체 (DRAM / HBM 메모리 포함)", pct: 15, change: "+12.5%", barClass: "summer" },
                { name: "자동차, 친환경차 및 완성차 부품", pct: 14, change: "+8.2%", barClass: "spring" },
                { name: "석유화학 제품 및 합성수지", pct: 9, change: "-6.5%", barClass: "winter" },
                { name: "선박, LNG 고부가가치 운반선", pct: 5, change: "+8.0%", barClass: "autumn" }
            ]
        },
        "2025-03": {
            growthVal: "+3.1%",
            growthTrend: "▼ 반도체 재고 조정 막바지 속도 조절",
            balanceVal: "+18억 달러 흑자",
            balanceTrend: "▲ 무역 수지 소폭 흑자 안착",
            ebsiVal: "95.5",
            ebsiTrend: "▼ 원유 도입가 불안 헤지",
            items: [
                { name: "반도체 (DRAM / HBM 메모리 포함)", pct: 14, change: "+9.0%", barClass: "summer" },
                { name: "자동차, 친환경차 및 완성차 부품", pct: 14, change: "+6.8%", barClass: "spring" },
                { name: "석유화학 제품 및 합성수지", pct: 9, change: "-8.2%", barClass: "winter" },
                { name: "선박, LNG 고부가가치 운반선", pct: 5, change: "+5.5%", barClass: "autumn" }
            ]
        }
    }
};

function updateExportCard() {
    const monthSelect = document.getElementById("export-month-select");
    const activeMonth = monthSelect ? monthSelect.value : "2026-05";
    
    const data = exportData[activeRegion][activeMonth];
    if (!data) return;
    
    const cardIcon = document.getElementById("export-card-icon");
    if (cardIcon) {
        if (activeRegion === "KR") {
            cardIcon.style.color = "#10b981";
        } else {
            cardIcon.style.color = "#3b82f6";
        }
    }
    
    // Set regional title
    const regionTitle = activeRegion === "KR" 
        ? "KITA (한국무역협회) 통계 기반 수출 동향 분석" 
        : "Census Bureau (미국 인구조사국) 수출 및 무역 동향";
    document.getElementById("export-card-title").textContent = regionTitle;
    
    // Set labels & values
    const growthLabel = activeRegion === "KR" ? "대한민국 총 수출 성장률 (YoY)" : "총 수출 성장률 (YoY)";
    document.getElementById("export-growth-label").textContent = growthLabel;
    document.getElementById("export-growth-val").textContent = data.growthVal;
    
    const growthValEl = document.getElementById("export-growth-val");
    if (growthValEl) {
        if (activeRegion === "KR" || !data.growthVal.startsWith("-")) {
            growthValEl.className = "stat-value text-positive";
            growthValEl.style.color = "";
        } else {
            growthValEl.className = "stat-value";
            growthValEl.style.color = "#ef4444";
        }
    }
    
    document.getElementById("export-growth-trend").textContent = data.growthTrend;
    
    const balanceLabel = activeRegion === "KR" ? "KITA 통계 누적 무역수지" : "미국 무역 수지 (월간)";
    document.getElementById("export-balance-label").textContent = balanceLabel;
    document.getElementById("export-balance-val").textContent = data.balanceVal;
    
    const balanceValEl = document.getElementById("export-balance-val");
    if (balanceValEl) {
        if (activeRegion === "KR") {
            balanceValEl.className = "stat-value text-positive";
            balanceValEl.style.color = "";
        } else {
            balanceValEl.className = "stat-value";
            balanceValEl.style.color = "#ef4444"; // Red for US trade deficit
        }
    }
    
    document.getElementById("export-balance-trend").textContent = data.balanceTrend;
    
    const ebsiLabel = activeRegion === "KR" ? "KITA 수출경기전망지수 (EBSI)" : "수출경기 전망 지수 (Index)";
    document.getElementById("export-ebsi-label").textContent = ebsiLabel;
    document.getElementById("export-ebsi-val").textContent = data.ebsiVal;
    document.getElementById("export-ebsi-trend").textContent = data.ebsiTrend;
    
    const itemsTitle = activeRegion === "KR" 
        ? "KITA 제공 한국 핵심 품목별 수출 비중 및 성장률 (stat.kita.net)" 
        : "미국 주요 수출 품목 및 글로벌 비중 (Census Bureau 대변)";
    document.getElementById("export-items-title").textContent = itemsTitle;
    
    const itemsList = document.getElementById("export-items-list");
    if (itemsList) {
        itemsList.innerHTML = "";
        data.items.forEach(item => {
            const itemRow = document.createElement("div");
            itemRow.className = "export-item-row";
            
            const changeColor = item.change.startsWith("-") ? "#ef4444" : "#10b981";
            
            itemRow.innerHTML = `
                <div class="export-item-info">
                    <span class="export-item-name">${item.name}</span>
                    <span class="export-item-values">
                        <span class="export-item-pct">비중: ${item.pct}%</span>
                        <span class="export-item-change" style="color: ${changeColor}; font-weight: 700;">${item.change}</span>
                    </span>
                </div>
                <div class="export-item-track">
                    <div class="export-item-bar ${item.barClass}" style="width: ${item.pct * 2.5}%"></div>
                </div>
            `;
            itemsList.appendChild(itemRow);
        });
    }
}

// 2. STATE VARIABLES
let activeRegion = "US"; // "US" or "KR"
let activeMode = "sim"; // "sim" or "hist"
let activePreset = "2026_current";
let cycleClockChartInstance = null;
let portfolioChartInstance = null;

// 3. CORE ANALYTICAL MATHEMATICAL MODELS

// 3A. Business Cycle Model (Fidelity Framework - now with M2 Liquidity Impact)
function calculateMacroMetrics(cli, pmi, gdp, m2, rate, spread) {
    const cliCenter = 100.0;
    const pmiCenter = 50.0;
    const gdpCenter = activeRegion === "US" ? 2.0 : 2.2;
    
    const x_cli = (cli - cliCenter) * 1.5;
    const x_pmi = (pmi - pmiCenter) * 0.35;
    const x_gdp = (gdp - gdpCenter) * 0.45;
    
    // Growth Score (X-Axis)
    let growthScore = x_cli + x_pmi + x_gdp;
    growthScore = Math.max(-4.5, Math.min(4.5, growthScore));

    const spreadCenter = 0.2;
    const rateCenter = activeRegion === "US" ? 3.5 : 3.0;

    const y_spread = (spread - spreadCenter) * 1.2;
    const y_rate = - (rate - rateCenter) * 0.35;
    const y_pmi = (pmi - pmiCenter) * 0.1;
    // M2 Money Supply Growth (Neutral around 6.0%). Expanding M2 pushes momentum UP.
    const y_m2 = (m2 - 6.0) * 0.25;
    
    // Momentum Score (Y-Axis)
    let momentumScore = y_spread + y_rate + y_pmi + y_m2;
    momentumScore = Math.max(-4.5, Math.min(4.5, momentumScore));

    // Cartesian Classification
    let phase = "";
    let phaseKor = "";
    if (growthScore >= 0 && momentumScore >= 0) {
        phase = "expansion";
        phaseKor = "확장기 (Expansion)";
    } else if (growthScore >= 0 && momentumScore < 0) {
        phase = "slowdown";
        phaseKor = "둔화기 (Slowdown)";
    } else if (growthScore < 0 && momentumScore < 0) {
        phase = "contraction";
        phaseKor = "수축기 (Contraction)";
    } else {
        phase = "recovery";
        phaseKor = "회복기 (Recovery)";
    }

    return { x: growthScore, y: momentumScore, phase: phase, phaseKor: phaseKor };
}

// 3B. Uragami Kunio Stock Market 4 Seasons Model (utilizing Fwd EPS, M2 Liquidity, Rate & Spread)
function calculateStockSeasonMetrics(fwdEPS, m2, rate, spread) {
    const epsGrowthThreshold = activeRegion === "US" ? 5.0 : 3.0; 
    const policyRateNeutral = activeRegion === "US" ? 3.5 : 3.0;

    // 1. Earnings Direction Axis (Fwd EPS Growth Benchmark)
    const epsScore = (fwdEPS - epsGrowthThreshold) / 10.0; 
    
    // 2. Liquidity / Easing Environment Axis (Rate Stress cushioned by M2 money supply)
    // Rate stress is mitigated by rapid M2 expansion (liquidity buffer!)
    const rateStress = (rate - policyRateNeutral) / 4.0 - (spread - 0.2) / 2.0 - (m2 - 6.0) / 12.0;

    // Classification boundaries (Uragami's 4 Seasons)
    let season = "";
    let seasonKor = "";
    let needleAngle = 0; 

    if (epsScore >= 0 && rateStress < 0.0) {
        // High Earnings Growth + Favorable Liquidity -> Summer (실적장세)
        season = "summer";
        seasonKor = "실적장세 (여름)";
        const interpolation = Math.min(1.0, Math.max(0.0, Math.abs(epsScore) / (Math.abs(rateStress) + 0.1)));
        needleAngle = 15 + interpolation * 60; 
        
    } else if (epsScore >= 0 && rateStress >= 0.0) {
        // High Earnings Growth but Tight Liquidity -> Autumn (역금융장세)
        season = "autumn";
        seasonKor = "역금융장세 (가을)";
        const interpolation = Math.min(1.0, Math.max(0.0, rateStress / (Math.abs(epsScore) + 0.1)));
        needleAngle = 105 + interpolation * 60; 
        
    } else if (epsScore < 0 && rateStress >= 0.0) {
        // Plunging Earnings Growth + Tight Liquidity -> Winter (역실적장세)
        season = "winter";
        seasonKor = "역실적장세 (겨울)";
        const interpolation = Math.min(1.0, Math.max(0.0, Math.abs(epsScore) / (rateStress + 0.1)));
        needleAngle = 195 + interpolation * 60; 
        
    } else {
        // Plunging/Low Earnings Growth but Easing Liquidity -> Spring (금융장세)
        season = "spring";
        seasonKor = "금융장세 (봄)";
        const interpolation = Math.min(1.0, Math.max(0.0, Math.abs(rateStress) / (Math.abs(epsScore) + 0.1)));
        needleAngle = 285 + interpolation * 60; 
    }

    // Blend Sector Weights based on proximity calculations
    const baseSectors = {
        spring: { springWeight: 45, summerWeight: 25, autumnWeight: 15, winterWeight: 15 },
        summer: { springWeight: 20, summerWeight: 50, autumnWeight: 18, winterWeight: 12 },
        autumn: { springWeight: 15, summerWeight: 15, autumnWeight: 45, winterWeight: 25 },
        winter: { springWeight: 12, summerWeight: 8, autumnWeight: 25, winterWeight: 55 }
    };

    const dSum = Math.pow(Math.sin((needleAngle - 45) * Math.PI / 360), 2) + 0.02;
    const dAut = Math.pow(Math.sin((needleAngle - 135) * Math.PI / 360), 2) + 0.02;
    const dWin = Math.pow(Math.sin((needleAngle - 225) * Math.PI / 360), 2) + 0.02;
    const dSpr = Math.pow(Math.sin((needleAngle - 315) * Math.PI / 360), 2) + 0.02;

    const wSum = 1 / dSum;
    const wAut = 1 / dAut;
    const wWin = 1 / dWin;
    const wSpr = 1 / dSpr;
    const sumW = wSum + wAut + wWin + wSpr;

    let springBlended = (baseSectors.spring.springWeight * wSpr + baseSectors.summer.springWeight * wSum + baseSectors.autumn.springWeight * wAut + baseSectors.winter.springWeight * wWin) / sumW;
    let summerBlended = (baseSectors.spring.summerWeight * wSpr + baseSectors.summer.summerWeight * wSum + baseSectors.autumn.summerWeight * wAut + baseSectors.winter.summerWeight * wWin) / sumW;
    let autumnBlended = (baseSectors.spring.autumnWeight * wSpr + baseSectors.summer.autumnWeight * wSum + baseSectors.autumn.autumnWeight * wAut + baseSectors.winter.autumnWeight * wWin) / sumW;
    let winterBlended = (baseSectors.spring.winterWeight * wSpr + baseSectors.summer.winterWeight * wSum + baseSectors.autumn.winterWeight * wAut + baseSectors.winter.winterWeight * wWin) / sumW;

    const totalBlended = springBlended + summerBlended + autumnBlended + winterBlended;
    springBlended = Math.round((springBlended / totalBlended) * 100);
    summerBlended = Math.round((summerBlended / totalBlended) * 100);
    autumnBlended = Math.round((autumnBlended / totalBlended) * 100);
    winterBlended = 100 - (springBlended + summerBlended + autumnBlended);

    return {
        season: season,
        seasonKor: seasonKor,
        angle: needleAngle,
        sectors: {
            spring: springBlended,
            summer: summerBlended,
            autumn: autumnBlended,
            winter: winterBlended
        }
    };
}

// 3C. Dynamic Portfolio Blending with M2 Feedback
function calculateBlendedPortfolio(macroX, macroY, seasonAngle, m2) {
    const distToExpansion = Math.hypot(Math.max(0, 3 - macroX), Math.max(0, 3 - macroY));
    const distToSlowdown = Math.hypot(Math.max(0, 3 - macroX), Math.max(0, macroY + 3));
    const distToContraction = Math.hypot(Math.max(0, macroX + 3), Math.max(0, macroY + 3));
    const distToRecovery = Math.hypot(Math.max(0, macroX + 3), Math.max(0, 3 - macroY));

    const wExp = 1 / Math.pow(distToExpansion + 0.1, 2);
    const wSlow = 1 / Math.pow(distToSlowdown + 0.1, 2);
    const wCon = 1 / Math.pow(distToContraction + 0.1, 2);
    const wRec = 1 / Math.pow(distToRecovery + 0.1, 2);
    const sumW = wExp + wSlow + wCon + wRec;
    
    const allocBase = {
        expansion: { eq: 65, bo: 15, co: 15, ca: 5 },
        slowdown: { eq: 40, bo: 35, co: 10, ca: 15 },
        contraction: { eq: 15, bo: 55, co: 12, ca: 18 },
        recovery: { eq: 55, bo: 25, co: 10, ca: 10 }
    };

    let eqBlended = (allocBase.expansion.eq * wExp + allocBase.slowdown.eq * wSlow + allocBase.contraction.eq * wCon + allocBase.recovery.eq * wRec) / sumW;
    let boBlended = (allocBase.expansion.bo * wExp + allocBase.slowdown.bo * wSlow + allocBase.contraction.bo * wCon + allocBase.recovery.bo * wRec) / sumW;
    let coBlended = (allocBase.expansion.co * wExp + allocBase.slowdown.co * wSlow + allocBase.contraction.co * wCon + allocBase.recovery.co * wRec) / sumW;
    let caBlended = (allocBase.expansion.ca * wExp + allocBase.slowdown.ca * wSlow + allocBase.contraction.ca * wCon + allocBase.recovery.ca * wRec) / sumW;

    // Seasonal Premium Modifications
    if (seasonAngle >= 180 && seasonAngle < 270) { // Winter
        boBlended += 5;
        eqBlended -= 5;
    } else if (seasonAngle >= 0 && seasonAngle < 90) { // Summer
        eqBlended += 5;
        boBlended -= 5;
    }

    // High M2 Liquidity expansion adds an additional equity bid, while M2 contraction bids cash!
    if (m2 > 10.0) {
        eqBlended += 4;
        caBlended -= 4;
    } else if (m2 < 3.0) {
        caBlended += 5;
        eqBlended -= 5;
    }

    eqBlended = Math.max(10, Math.min(85, eqBlended));
    boBlended = Math.max(10, Math.min(75, boBlended));
    coBlended = Math.max(5, Math.min(25, coBlended));
    caBlended = Math.max(2, Math.min(30, caBlended));

    // Normalize
    const totalBlended = eqBlended + boBlended + coBlended + caBlended;
    eqBlended = Math.round((eqBlended / totalBlended) * 100);
    boBlended = Math.round((boBlended / totalBlended) * 100);
    coBlended = Math.round((coBlended / totalBlended) * 100);
    caBlended = 100 - (eqBlended + boBlended + coBlended);

    let riskText = "";
    if (eqBlended >= 60) riskText = activeRegion === "US" ? "적극 투자 선호" : "고수익 주식 집중";
    else if (eqBlended >= 48) riskText = "주식 온화 선호";
    else if (eqBlended >= 35) riskText = "자산 배분 균형";
    else riskText = activeRegion === "US" ? "보수적 방어" : "채권/안전 집중";

    return { eq: eqBlended, bo: boBlended, co: coBlended, ca: caBlended, risk: riskText };
}

// 4. SYNCHRONIZE DATA TO UI
function updateUI(macro, season, portfolio, cli, pmi, gdp, eps, m2, cpi, rate, spread) {
    // 1. Badge States
    const cycleBadge = document.getElementById("current-phase-badge");
    const cycleText = document.getElementById("current-phase-text");
    cycleBadge.className = `cycle-badge ${macro.phase}`;
    cycleText.textContent = macro.phaseKor;

    const seasonBadge = document.getElementById("current-season-badge");
    const seasonText = document.getElementById("current-season-text");
    seasonBadge.className = `season-badge ${season.season}`;
    seasonText.textContent = season.seasonKor;

    // 2. Risk Score & Portfolio Text
    document.getElementById("risk-score").textContent = portfolio.risk;

    const posTitle = document.getElementById("pos-title");
    const posDesc = document.getElementById("pos-description");

    if (season.season === "spring") {
        posTitle.textContent = `${activeRegion === "US" ? "미국" : "한국"} 금융장세 (봄) 주도 업종`;
        posDesc.textContent = `금리 하락 및 시중 통화공급(M2 유동성: ${m2}%) 급팽창기입니다. 실적이 부진해도 돈의 힘으로 주가가 폭발적으로 선행 반등합니다. 금융주(은행, 증권), 건설주, 내수 소비재 및 우량 낙폭 과대주가 주도합니다. ${activeRegion === "KR" ? "한국 시장은 개인 예치금 급증과 중소형주 수급 쏠림이 유독 격화되는 속성이 있습니다." : ""}`;
    } else if (season.season === "summer") {
        posTitle.textContent = `${activeRegion === "US" ? "미국" : "한국"} 실적장세 (여름) 주도 업종`;
        posDesc.textContent = `기업의 이익 성장이 증명되며 M2 유동성(${m2}%)이 안정적인 확장 궤도에 머무는 시기입니다. IT 빅테크, AI 솔루션, 반도체 및 핵심 수출 경기민감주(소재/산업재)가 맹렬히 이끕니다. ${activeRegion === "KR" ? "특히 반도체 사이클(HBM 등) 수출 호조가 지수 전체 실적을 주도하는 코스피 특유의 장세가 나타납니다." : ""}`;
    } else if (season.season === "autumn") {
        posTitle.textContent = `${activeRegion === "US" ? "미국" : "한국"} 역금융장세 (가을) 주도 업종`;
        posDesc.textContent = `인플레이션을 잡기 위한 고강도 긴축 시기입니다. 시중 통화량(M2 증가율: ${m2}%)이 눈에 띄게 수축되며 유동성 할인율 타격을 입습니다. 현금성 자산(MMF/예금), 에너지, 소재 및 유틸리티 가치주 위주 방어가 필수적입니다.`;
    } else if (season.season === "winter") {
        posTitle.textContent = `${activeRegion === "US" ? "미국" : "한국"} 역실적장세 (겨울) 주도 업종`;
        posDesc.textContent = `누적된 고금리 피로와 유동성 둔화로 기업들의 실적 붕괴가 현실화되며 주식시장은 혹한기를 보냅니다. 주식 비중을 강제로 최소화하고, 금리 인하로 자본이익이 보장되는 중장기 국채와 헬스케어, 통신 등 필수 방어재로 동면해야 합니다.`;
    }

    // 3. Compass Needle Rotation
    const needle = document.getElementById("compass-needle");
    if (needle) {
        needle.style.transform = `rotate(${season.angle}deg)`;
    }

    // Compass Text Narrative
    const compassTitle = document.getElementById("compass-season-title");
    const compassDesc = document.getElementById("compass-season-desc");
    compassTitle.textContent = season.seasonKor;
    
    if (season.season === "spring") {
        compassDesc.textContent = `실질 기업 이익(Fwd EPS: ${eps}%)은 낮으나, 정책 금리가 ${rate}% 수준으로 인하되고 시중 유동성(M2: ${m2}%)이 늘어나 풍부한 자금력이 증시를 이끕니다.`;
    } else if (season.season === "summer") {
        compassDesc.textContent = `기준금리(${rate}%)가 다소 완만히 인상되는 기조이나, 강력한 기업 선행 실적(Fwd EPS: ${eps}%)과 안정적인 M2 유동성(${m2}%)이 시장을 견인하는 건강한 장세입니다.`;
    } else if (season.season === "autumn") {
        compassDesc.textContent = `기준금리가 ${rate}%선으로 가열되고 통화량 공급(M2: ${m2}%)이 수축되는 단계로, 긴축 할인율 타격에 따른 멀티플 축소 단계입니다.`;
    } else if (season.season === "winter") {
        compassDesc.textContent = `기업의 Forward EPS(${eps}%)와 통화 유동성(M2: ${m2}%)이 동시에 무너지나, 중앙은행이 금리 인하로 소방수를 자처하기 시작하는 하강 단계입니다.`;
    }

    // 4. Asset Progress Bars
    document.getElementById("pct-equities").textContent = `${portfolio.eq}%`;
    document.getElementById("bar-equities").style.width = `${portfolio.eq}%`;
    
    document.getElementById("pct-bonds").textContent = `${portfolio.bo}%`;
    document.getElementById("bar-bonds").style.width = `${portfolio.bo}%`;
    
    document.getElementById("pct-commodities").textContent = `${portfolio.co}%`;
    document.getElementById("bar-commodities").style.width = `${portfolio.co}%`;
    
    document.getElementById("pct-cash").textContent = `${portfolio.ca}%`;
    document.getElementById("bar-cash").style.width = `${portfolio.ca}%`;

    // 5. Sector Dynamic Bars
    document.getElementById("pct-sec-spring").textContent = `${season.sectors.spring}%`;
    document.getElementById("bar-sec-spring").style.width = `${season.sectors.spring}%`;
    
    document.getElementById("pct-sec-summer").textContent = `${season.sectors.summer}%`;
    document.getElementById("bar-sec-summer").style.width = `${season.sectors.summer}%`;
    
    document.getElementById("pct-sec-autumn").textContent = `${season.sectors.autumn}%`;
    document.getElementById("bar-sec-autumn").style.width = `${season.sectors.autumn}%`;
    
    document.getElementById("pct-sec-winter").textContent = `${season.sectors.winter}%`;
    document.getElementById("bar-sec-winter").style.width = `${season.sectors.winter}%`;

    // 6. Dynamic Scenario Briefing
    const activeData = historicalPresets[activeRegion][activePreset];
    const summaryTextEl = document.getElementById("narrative-summary");
    const lessonsTextEl = document.getElementById("narrative-lessons");
    const labelTitleLeft = document.getElementById("narrative-title-left");
    const labelTitleRight = document.getElementById("narrative-title-right");

    if (activeMode === "hist" && activeData) {
        labelTitleLeft.textContent = `[에포크] 경제 요약`;
        labelTitleRight.textContent = `[역사적] 마켓 레슨`;
        summaryTextEl.textContent = activeData.summary;
        lessonsTextEl.textContent = activeData.lessons;
    } else {
        labelTitleLeft.textContent = `현재 경제 환경 시뮬레이션`;
        labelTitleRight.textContent = `주도 전략 포지셔닝 의견`;
        
        summaryTextEl.textContent = `${activeRegion === "US" ? "미국 S&P 500" : "한국 KOSPI"} 분석결과, 선행 경기지수(CLI: ${cli})와 제조업 심리(PMI: ${pmi}) 조합으로 도출된 경기 단계는 '${macro.phaseKor}'입니다. 기업들의 12M Forward EPS 성장 전망치 ${eps}%와 M2 유동성 공급율 ${m2}%는 자산 시장 내 핵심 유동성 땔감과 기초 체력의 조화를 선명히 드러내 줍니다.`;
        
        let dynamicLesson = "";
        if (season.season === "spring") {
            dynamicLesson = `실제 거시 성장 수준은 낮으나 중앙은행의 정책금리(${rate}%) 인하와 M2 통화 공급(${m2}%)의 팽창으로 인해 주식시장의 봄(금융장세)이 무르익고 있습니다. 이 시기에는 자산시장 내 풍부해진 유동성 혜택을 직접적으로 누리는 낙폭과대 우량 금융주, 증권, 건설 업종 중심의 비중 선취매 전략이 유리합니다.`;
        } else if (season.season === "summer") {
            dynamicLesson = `탄력성 있는 선행 EPS 성장전망(${eps}%)과 안정적인 M2 증가세(${m2}%)가 합쳐져 완만한 금리 인상 리스크를 압도하는 완벽한 여름(실적장세)입니다. 이 국면은 대시보드 역사상 주식 비중을 ${portfolio.eq}% 이상으로 가장 적극 편입시키는 시점이며, 실적 성장 가시성이 우수한 IT 빅테크와 반도체 섹터에 포커싱해야 합니다.`;
        } else if (season.season === "autumn") {
            dynamicLesson = `기준금리(${rate}%) 상승이 통화 유동성(M2: ${m2}%) 긴축을 유도하며 이익 피크아웃 우려를 낳는 가을(역금융장세)에 서있습니다. 주식 비중을 보수적으로 조절하고, 통화 가치 하락과 공급 불안을 헤지해 주는 원자재(${portfolio.co}%) 자산 및 현금 비중을 선제 배분하여 하강 압력에 대비하십시오.`;
        } else {
            dynamicLesson = `이익 역성장(Forward EPS: ${eps}%)과 유동성 고갈(M2: ${m2}%)이 지수 가치를 훼손하는 겨울(역실적장세) 국면입니다. 주식 보유 비중을 ${portfolio.eq}%로 최소화하여 동면을 준비하고, 금리 인하 사이클 도래에 따른 강력한 자본차익을 보장해 주는 장기 국채(${portfolio.bo}%)를 최우선으로 매집해야 합니다.`;
        }
        lessonsTextEl.textContent = dynamicLesson;
    }

    // 7. Status Table synchronization
    document.getElementById("table-cli-val").textContent = cli;
    const cliMom = document.getElementById("table-cli-mom");
    const cliGrade = document.getElementById("table-cli-grade");
    if (cli > 100.2) {
        cliMom.innerHTML = '<span class="trend-icon up">▲</span> 견조 상승';
        cliGrade.className = "status-badge positive";
        cliGrade.textContent = "확장 우세";
    } else if (cli >= 99.8) {
        cliMom.innerHTML = '<span class="trend-icon stable">─</span> 추세 보합';
        cliGrade.className = "status-badge neutral";
        cliGrade.textContent = "추세 부합";
    } else {
        cliMom.innerHTML = '<span class="trend-icon down">▼</span> 추세 하회';
        cliGrade.className = "status-badge danger";
        cliGrade.textContent = "둔화 우려";
    }

    document.getElementById("table-pmi-val").textContent = pmi;
    const pmiMom = document.getElementById("table-pmi-mom");
    const pmiGrade = document.getElementById("table-pmi-grade");
    if (pmi > 52) {
        pmiMom.innerHTML = '<span class="trend-icon up">▲</span> 가속 신호';
        pmiGrade.className = "status-badge positive";
        pmiGrade.textContent = "경기 확장";
    } else if (pmi >= 50) {
        pmiMom.innerHTML = '<span class="trend-icon stable">─</span> 추세선 안착';
        pmiGrade.className = "status-badge neutral";
        pmiGrade.textContent = "완만 확장";
    } else {
        pmiMom.innerHTML = '<span class="trend-icon down">▼</span> 수축 국면';
        pmiGrade.className = "status-badge danger";
        pmiGrade.textContent = "수축 신호";
    }

    document.getElementById("table-gdp-val").textContent = `${gdp.toFixed(1)}%`;
    const gdpMom = document.getElementById("table-gdp-mom");
    const gdpGrade = document.getElementById("table-gdp-grade");
    const gdpRef = activeRegion === "US" ? 2.0 : 2.2;
    if (gdp > gdpRef + 0.5) {
        gdpMom.innerHTML = '<span class="trend-icon up">▲</span> 고성장세';
        gdpGrade.className = "status-badge positive";
        gdpGrade.textContent = "성장 탄력";
    } else if (gdp >= gdpRef - 0.5) {
        gdpMom.innerHTML = '<span class="trend-icon stable">─</span> 잠재 부합';
        gdpGrade.className = "status-badge neutral";
        gdpGrade.textContent = "잠재 부합";
    } else {
        gdpMom.innerHTML = '<span class="trend-icon down">▼</span> 잠재 하회';
        gdpGrade.className = "status-badge danger";
        gdpGrade.textContent = "성장 정체";
    }

    // Forward EPS table
    document.getElementById("table-eps-val").textContent = `${eps.toFixed(1)}%`;
    const epsMom = document.getElementById("table-eps-mom");
    const epsGrade = document.getElementById("table-eps-grade");
    const epsRef = activeRegion === "US" ? 5.0 : 3.0;
    document.getElementById("table-eps-ref").textContent = `${epsRef.toFixed(1)}%`;
    if (eps > epsRef + 5.0) {
        epsMom.innerHTML = '<span class="trend-icon up">▲</span> 초강력 성장';
        epsGrade.className = "status-badge positive";
        epsGrade.textContent = "실적 서프";
    } else if (eps >= epsRef - 5.0) {
        epsMom.innerHTML = '<span class="trend-icon stable">─</span> 추세 성장';
        epsGrade.className = "status-badge neutral";
        epsGrade.textContent = "어닝 부합";
    } else {
        epsMom.innerHTML = '<span class="trend-icon down">▼</span> 이익 감익';
        epsGrade.className = "status-badge danger";
        epsGrade.textContent = "어닝 쇼크";
    }

    // M2 table
    document.getElementById("table-m2-val").textContent = `${m2.toFixed(1)}%`;
    const m2Mom = document.getElementById("table-m2-mom");
    const m2Grade = document.getElementById("table-m2-grade");
    if (m2 > 10.0) {
        m2Mom.innerHTML = '<span class="trend-icon up">▲</span> 유동성 과잉';
        m2Grade.className = "status-badge positive";
        m2Grade.textContent = "유동성 풍부";
    } else if (m2 >= 4.0) {
        m2Mom.innerHTML = '<span class="trend-icon stable">─</span> 안정 성장';
        m2Grade.className = "status-badge neutral";
        m2Grade.textContent = "유동성 보통";
    } else {
        m2Mom.innerHTML = '<span class="trend-icon down">▼</span> 유동성 고갈';
        m2Grade.className = "status-badge danger";
        m2Grade.textContent = "유동성 긴축";
    }

    document.getElementById("table-cpi-val").textContent = `${cpi.toFixed(1)}%`;
    const cpiMom = document.getElementById("table-cpi-mom");
    const cpiGrade = document.getElementById("table-cpi-grade");
    if (cpi > 3.8) {
        cpiMom.innerHTML = '<span class="trend-icon up">▲</span> 인플레 과열';
        cpiGrade.className = "status-badge danger";
        cpiGrade.textContent = "고물가 과열";
    } else if (cpi >= 2.0) {
        cpiMom.innerHTML = '<span class="trend-icon stable">─</span> 안정 범위';
        cpiGrade.className = "status-badge positive";
        cpiGrade.textContent = "목표 관리";
    } else {
        cpiMom.innerHTML = '<span class="trend-icon down">▼</span> 저물가/침체';
        cpiGrade.className = "status-badge neutral";
        cpiGrade.textContent = "디플레 압력";
    }

    document.getElementById("table-rate-val").textContent = `${rate.toFixed(2)}%`;
    const rateMom = document.getElementById("table-rate-mom");
    const rateGrade = document.getElementById("table-rate-grade");
    if (rate >= (activeRegion === "US" ? 4.5 : 3.5)) {
        rateMom.innerHTML = '<span class="trend-icon up">▲</span> 긴축적 유지';
        rateGrade.className = "status-badge danger";
        rateGrade.textContent = "고금리 제약";
    } else if (rate >= (activeRegion === "US" ? 2.5 : 2.0)) {
        rateMom.innerHTML = '<span class="trend-icon stable">─</span> 중립 기조';
        rateGrade.className = "status-badge neutral";
        rateGrade.textContent = "중립 금리";
    } else {
        rateMom.innerHTML = '<span class="trend-icon down">▼</span> 부양 완화';
        rateGrade.className = "status-badge positive";
        rateGrade.textContent = "통화 부양";
    }

    document.getElementById("table-spread-val").textContent = `${spread.toFixed(2)}%`;
    const spreadMom = document.getElementById("table-spread-mom");
    const spreadGrade = document.getElementById("table-spread-grade");
    if (spread > 1.0) {
        spreadMom.innerHTML = '<span class="trend-icon up">▲</span> 가파른 정상화';
        spreadGrade.className = "status-badge positive";
        spreadGrade.textContent = "건강 확장";
    } else if (spread >= 0) {
        spreadMom.innerHTML = '<span class="trend-icon stable">─</span> 평탄 평형';
        spreadGrade.className = "status-badge neutral";
        spreadGrade.textContent = "평탄 양평";
    } else {
        spreadMom.innerHTML = '<span class="trend-icon down">▼</span> 장단기 역전';
        spreadGrade.className = "status-badge danger";
        spreadGrade.textContent = "침체 위험";
    }

    // 8. Update Export statistics card
    updateExportCard();

    // 9. Update Graphs
    updateCharts(macro, portfolio);
}

// 5. INITIALIZE CHARTS
function initCharts(macro, portfolio) {
    const isDark = document.body.classList.contains("light-theme") ? false : true;
    const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
    const textColor = isDark ? "#94a3b8" : "#475569";

    // Scatter Chart (Cycle Clock)
    const ctxClock = document.getElementById("cycleClockChart").getContext("2d");
    let trailPoints = [];
    if (activeMode === "hist" && historicalPresets[activeRegion][activePreset]) {
        trailPoints = historicalPresets[activeRegion][activePreset].trail || [];
    } else {
        const currentPt = { x: macro.x, y: macro.y };
        trailPoints = [
            { x: currentPt.x - 1.2, y: currentPt.y - 0.8 },
            { x: currentPt.x - 0.9, y: currentPt.y - 0.5 },
            { x: currentPt.x - 0.6, y: currentPt.y - 0.2 },
            { x: currentPt.x - 0.3, y: currentPt.y + 0.1 },
            { x: currentPt.x, y: currentPt.y }
        ];
    }

    cycleClockChartInstance = new Chart(ctxClock, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '경기 순환 경로',
                    data: trailPoints.slice(0, -1),
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
                    borderWidth: 1.5,
                    showLine: true,
                    fill: false,
                    tension: 0.3,
                    pointBackgroundColor: 'rgba(255, 255, 255, 0.25)',
                    pointRadius: 3
                },
                {
                    label: '현재 simulated 상태',
                    data: [trailPoints[trailPoints.length - 1]],
                    pointBackgroundColor: getPhaseColor(macro.phase),
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 9,
                    pointHoverRadius: 10,
                    showLine: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 600 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `X(성장): ${context.raw.x.toFixed(2)}, Y(모멘텀): ${context.raw.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    min: -4.5,
                    max: 4.5,
                    grid: {
                        color: gridColor,
                        lineWidth: function(context) { return context.tick.value === 0 ? 2 : 1; }
                    },
                    ticks: { color: textColor, font: { family: 'Inter' } },
                    title: {
                        display: true,
                        text: '실물 성장 국면 (Growth ◀ 위축 | 확장 ▶)',
                        color: textColor,
                        font: { size: 10, weight: 600 }
                    }
                },
                y: {
                    min: -4.5,
                    max: 4.5,
                    grid: {
                        color: gridColor,
                        lineWidth: function(context) { return context.tick.value === 0 ? 2 : 1; }
                    },
                    ticks: { color: textColor, font: { family: 'Inter' } },
                    title: {
                        display: true,
                        text: '금융 및 정책 여건 (Momentum ◀ 긴축/둔화 | 부양/가속 ▶)',
                        color: textColor,
                        font: { size: 10, weight: 600 }
                    }
                }
            }
        },
        plugins: [{
            id: 'quadrantLabels',
            beforeDraw: function(chart) {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                const xAxis = chart.scales.x;
                const yAxis = chart.scales.y;
                const zeroX = xAxis.getPixelForValue(0);
                const zeroY = yAxis.getPixelForValue(0);
                
                ctx.save();
                ctx.font = "bold 12px 'Outfit', sans-serif";
                ctx.textAlign = 'center';
                
                const textOpacity = 0.35;
                ctx.fillStyle = `rgba(16, 185, 129, ${textOpacity})`; // Expansion (Top-Right)
                ctx.fillText("확장기 (Expansion)", (zeroX + chartArea.right) / 2, (chartArea.top + zeroY) / 2);
                
                ctx.fillStyle = `rgba(59, 130, 246, ${textOpacity})`; // Recovery (Top-Left)
                ctx.fillText("회복기 (Recovery)", (chartArea.left + zeroX) / 2, (chartArea.top + zeroY) / 2);
                
                ctx.fillStyle = `rgba(239, 68, 68, ${textOpacity})`; // Contraction (Bottom-Left)
                ctx.fillText("수축기 (Contraction)", (chartArea.left + zeroX) / 2, (zeroY + chartArea.bottom) / 2);
                
                ctx.fillStyle = `rgba(245, 158, 11, ${textOpacity})`; // Slowdown (Bottom-Right)
                ctx.fillText("둔화기 (Slowdown)", (zeroX + chartArea.right) / 2, (zeroY + chartArea.bottom) / 2);
                
                ctx.restore();
            }
        }]
    });

    // Portfolio Doughnut Chart
    const ctxPortfolio = document.getElementById("portfolioChart").getContext("2d");
    portfolioChartInstance = new Chart(ctxPortfolio, {
        type: 'doughnut',
        data: {
            labels: ['주식 (Equities)', '채권 (Bonds)', '대체/원자재 (Commodities)', '현금 (Cash)'],
            datasets: [{
                data: [portfolio.eq, portfolio.bo, portfolio.co, portfolio.ca],
                backgroundColor: ['#8b5cf6', '#06b6d4', '#f59e0b', '#64748b'],
                borderWidth: isDark ? 2 : 1,
                borderColor: isDark ? '#121c2f' : '#ffffff',
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) { return ` ${context.label}: ${context.raw}%`; }
                    }
                }
            }
        }
    });
}

function updateCharts(macro, portfolio) {
    if (!cycleClockChartInstance || !portfolioChartInstance) return;

    let trailPoints = [];
    if (activeMode === "hist" && historicalPresets[activeRegion][activePreset]) {
        trailPoints = historicalPresets[activeRegion][activePreset].trail || [];
    } else {
        const currentPt = { x: macro.x, y: macro.y };
        trailPoints = [
            { x: currentPt.x - 1.2, y: currentPt.y - 0.8 },
            { x: currentPt.x - 0.9, y: currentPt.y - 0.5 },
            { x: currentPt.x - 0.6, y: currentPt.y - 0.2 },
            { x: currentPt.x - 0.3, y: currentPt.y + 0.1 },
            { x: currentPt.x, y: currentPt.y }
        ];
    }

    cycleClockChartInstance.data.datasets[0].data = trailPoints.slice(0, -1);
    cycleClockChartInstance.data.datasets[1].data = [trailPoints[trailPoints.length - 1]];
    cycleClockChartInstance.data.datasets[1].pointBackgroundColor = getPhaseColor(macro.phase);
    cycleClockChartInstance.update('none');

    portfolioChartInstance.data.datasets[0].data = [portfolio.eq, portfolio.bo, portfolio.co, portfolio.ca];
    portfolioChartInstance.update();
}

function getPhaseColor(phase) {
    switch (phase) {
        case "expansion": return "#10b981";
        case "slowdown": return "#f59e0b";
        case "contraction": return "#ef4444";
        case "recovery": return "#3b82f6";
        default: return "#ffffff";
    }
}

function applyThemeSettingsToCharts() {
    if (!cycleClockChartInstance || !portfolioChartInstance) return;
    const isDark = !document.body.classList.contains("light-theme");
    const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
    const textColor = isDark ? "#94a3b8" : "#475569";
    
    cycleClockChartInstance.options.scales.x.grid.color = gridColor;
    cycleClockChartInstance.options.scales.x.ticks.color = textColor;
    cycleClockChartInstance.options.scales.x.title.color = textColor;
    cycleClockChartInstance.options.scales.y.grid.color = gridColor;
    cycleClockChartInstance.options.scales.y.ticks.color = textColor;
    cycleClockChartInstance.options.scales.y.title.color = textColor;
    
    portfolioChartInstance.data.datasets[0].borderColor = isDark ? '#121c2f' : '#ffffff';
    portfolioChartInstance.data.datasets[0].borderWidth = isDark ? 2 : 1;
    
    cycleClockChartInstance.update();
    portfolioChartInstance.update();
}

// 6. LOAD REGIONAL PRESETS
function loadPresetContainerItems() {
    const presetGrid = document.getElementById("preset-grid-items");
    presetGrid.innerHTML = ""; 

    const regionPresets = historicalPresets[activeRegion];
    Object.keys(regionPresets).forEach(key => {
        const item = regionPresets[key];
        const btn = document.createElement("button");
        btn.className = "preset-btn";
        btn.setAttribute("data-preset", key);
        btn.textContent = item.title;
        
        if (key === activePreset) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            activePreset = key;
            loadPreset(key);
        });

        presetGrid.appendChild(btn);
    });
}

function loadPreset(key) {
    const data = historicalPresets[activeRegion][key];
    if (!data) return;

    document.getElementById("selected-epoch-title").textContent = data.title;
    
    // Sync slider variables internally
    document.getElementById("input-cli").value = data.cli;
    document.getElementById("input-pmi").value = data.pmi;
    document.getElementById("input-gdp").value = data.gdp;
    document.getElementById("input-eps").value = data.eps;
    document.getElementById("input-m2").value = data.m2;
    document.getElementById("input-cpi").value = data.cpi;
    document.getElementById("input-rate").value = data.rate;
    document.getElementById("input-spread").value = data.spread;
    
    // Trigger update
    triggerModelUpdate();
}

// 7. EVENT LISTENERS INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    // A. DOM Elements
    const modeSimBtn = document.getElementById("mode-sim");
    const modeHistBtn = document.getElementById("mode-hist");
    const presetContainer = document.getElementById("preset-container");
    const slidersContainer = document.getElementById("sliders-container");
    const pageTitle = document.getElementById("selected-epoch-title");
    const marketBreadcrumb = document.getElementById("market-breadcrumb");
    
    const inputCli = document.getElementById("input-cli");
    const inputPmi = document.getElementById("input-pmi");
    const inputGdp = document.getElementById("input-gdp");
    const inputEps = document.getElementById("input-eps");
    const inputM2 = document.getElementById("input-m2");
    const inputCpi = document.getElementById("input-cpi");
    const inputRate = document.getElementById("input-rate");
    const inputSpread = document.getElementById("input-spread");
    
    const valCli = document.getElementById("val-cli");
    const valPmi = document.getElementById("val-pmi");
    const valGdp = document.getElementById("val-gdp");
    const valEps = document.getElementById("val-eps");
    const valM2 = document.getElementById("val-m2");
    const valCpi = document.getElementById("val-cpi");
    const valRate = document.getElementById("val-rate");
    const valSpread = document.getElementById("val-spread");

    const btnResetSliders = document.getElementById("btn-reset-sliders");
    const themeCheckbox = document.getElementById("theme-checkbox");
    
    const regionUsBtn = document.getElementById("region-us");
    const regionKrBtn = document.getElementById("region-kr");

    const epsMetaMin = document.getElementById("eps-meta-min");
    const epsMetaMid = document.getElementById("eps-meta-mid");
    const epsMetaMax = document.getElementById("eps-meta-max");

    function updateEpsSliderBounds() {
        if (activeRegion === "US") {
            inputEps.min = "-25";
            inputEps.max = "35";
            if (epsMetaMin) epsMetaMin.textContent = "-25% (역성장)";
            if (epsMetaMid) epsMetaMid.textContent = "5.0% (평균)";
            if (epsMetaMax) epsMetaMax.textContent = "35% (서프라이즈)";
        } else {
            inputEps.min = "-40";
            inputEps.max = "250";
            if (epsMetaMin) epsMetaMin.textContent = "-40% (역성장)";
            if (epsMetaMid) epsMetaMid.textContent = "15.0% (평균)";
            if (epsMetaMax) epsMetaMax.textContent = "250% (기저효과 턴어라운드)";
        }
    }

    // Unified model trigger update
    window.triggerModelUpdate = function() {
        const cliVal = parseFloat(inputCli.value);
        const pmiVal = parseFloat(inputPmi.value);
        const gdpVal = parseFloat(inputGdp.value);
        const epsVal = parseFloat(inputEps.value);
        const m2Val = parseFloat(inputM2.value);
        const cpiVal = parseFloat(inputCpi.value);
        const rateVal = parseFloat(inputRate.value);
        const spreadVal = parseFloat(inputSpread.value);
        
        // Sync sliding text labels
        valCli.textContent = cliVal.toFixed(1);
        valPmi.textContent = pmiVal.toFixed(1);
        valGdp.textContent = `${gdpVal.toFixed(1)}%`;
        valEps.textContent = `${epsVal.toFixed(1)}%`;
        valM2.textContent = `${m2Val.toFixed(1)}%`;
        valCpi.textContent = `${cpiVal.toFixed(1)}%`;
        valRate.textContent = `${rateVal.toFixed(2)}%`;
        valSpread.textContent = `${spreadVal.toFixed(1)}%`;

        // Calculate Models
        const macroMetrics = calculateMacroMetrics(cliVal, pmiVal, gdpVal, m2Val, rateVal, spreadVal);
        const seasonMetrics = calculateStockSeasonMetrics(epsVal, m2Val, rateVal, spreadVal);
        const portfolioMetrics = calculateBlendedPortfolio(macroMetrics.x, macroMetrics.y, seasonMetrics.angle, m2Val);

        // Custom override for coordinates if defined specifically in presets during history mode
        if (activeMode === "hist") {
            const data = historicalPresets[activeRegion][activePreset];
            if (data && data.trail) {
                const finalPt = data.trail[data.trail.length - 1];
                macroMetrics.x = finalPt.x;
                macroMetrics.y = finalPt.y;
            }
        }

        // Sync UI
        updateUI(macroMetrics, seasonMetrics, portfolioMetrics, cliVal, pmiVal, gdpVal, epsVal, m2Val, cpiVal, rateVal, spreadVal);
    };

    // B. Slider listeners
    const sliderInputs = [inputCli, inputPmi, inputGdp, inputEps, inputM2, inputCpi, inputRate, inputSpread];
    sliderInputs.forEach(input => {
        input.addEventListener("input", triggerModelUpdate);
    });

    // C. Region Toggles
    regionUsBtn.addEventListener("click", () => {
        activeRegion = "US";
        regionUsBtn.classList.add("active");
        regionKrBtn.classList.remove("active");
        marketBreadcrumb.textContent = "UNITED STATES STOCK MARKET ANALYSIS";
        
        updateEpsSliderBounds();
        
        // Ensure the active preset exists in US presets, otherwise fallback
        if (!historicalPresets["US"][activePreset]) {
            activePreset = "2026_current";
        }
        
        loadPresetContainerItems();
        if (activeMode === "hist") {
            loadPreset(activePreset);
        } else {
            resetSlidersToBaseline();
        }
    });

    // Region KR Toggle
    regionKrBtn.addEventListener("click", () => {
        activeRegion = "KR";
        regionKrBtn.classList.add("active");
        regionUsBtn.classList.remove("active");
        marketBreadcrumb.textContent = "SOUTH KOREA KOSPI MARKET ANALYSIS";
        
        updateEpsSliderBounds();
        
        // Ensure the active preset exists in KR presets, otherwise fallback
        if (!historicalPresets["KR"][activePreset]) {
            activePreset = "2026_current";
        }
        
        loadPresetContainerItems();
        if (activeMode === "hist") {
            loadPreset(activePreset);
        } else {
            resetSlidersToBaseline();
        }
    });

    // D. Mode switches
    modeSimBtn.addEventListener("click", () => {
        activeMode = "sim";
        modeSimBtn.classList.add("active");
        modeHistBtn.classList.remove("active");
        
        presetContainer.classList.add("hidden");
        slidersContainer.classList.remove("hidden");
        pageTitle.textContent = "실시간 경제 시뮬레이터";
        
        document.querySelectorAll(".preset-btn").forEach(btn => btn.classList.remove("active"));
        triggerModelUpdate();
    });

    modeHistBtn.addEventListener("click", () => {
        activeMode = "hist";
        modeHistBtn.classList.add("active");
        modeSimBtn.classList.remove("active");
        
        presetContainer.classList.remove("hidden");
        slidersContainer.classList.add("hidden");
        
        loadPresetContainerItems();
        loadPreset(activePreset);
    });

    // Reset Sliders
    function resetSlidersToBaseline() {
        if (activeRegion === "US") {
            inputCli.value = 100.2;
            inputPmi.value = 51.5;
            inputGdp.value = 2.2;
            inputEps.value = 10.5;
            inputM2.value = 4.5;
            inputCpi.value = 2.3;
            inputRate.value = 4.0;
            inputSpread.value = 0.2;
        } else {
            inputCli.value = 100.5;
            inputPmi.value = 52.0;
            inputGdp.value = 2.5;
            inputEps.value = 200.0;
            inputM2.value = 6.0;
            inputCpi.value = 2.1;
            inputRate.value = 3.25;
            inputSpread.value = 0.4;
        }
        triggerModelUpdate();
    }

    btnResetSliders.addEventListener("click", resetSlidersToBaseline);

    // E. Theme Toggle
    themeCheckbox.addEventListener("change", () => {
        if (themeCheckbox.checked) {
            document.body.classList.remove("light-theme");
        } else {
            document.body.classList.add("light-theme");
        }
        applyThemeSettingsToCharts();
    });

    // Month Selector change listener
    const exportMonthSelect = document.getElementById("export-month-select");
    if (exportMonthSelect) {
        exportMonthSelect.addEventListener("change", () => {
            updateExportCard();
        });
    }

    // F. Default Startup Initializations
    updateEpsSliderBounds();
    loadPresetContainerItems();
    
    // Establish initial baseline weights
    const startCli = parseFloat(inputCli.value);
    const startPmi = parseFloat(inputPmi.value);
    const startGdp = parseFloat(inputGdp.value);
    const startEps = parseFloat(inputEps.value);
    const startM2 = parseFloat(inputM2.value);
    const startCpi = parseFloat(inputCpi.value);
    const startRate = parseFloat(inputRate.value);
    const startSpread = parseFloat(inputSpread.value);

    const initMacro = calculateMacroMetrics(startCli, startPmi, startGdp, startM2, startRate, startSpread);
    const initSeason = calculateStockSeasonMetrics(startEps, startM2, startRate, startSpread);
    const initPortfolio = calculateBlendedPortfolio(initMacro.x, initMacro.y, initSeason.angle, startM2);

    // Render Charts
    initCharts(initMacro, initPortfolio);
    
    // First render update
    updateUI(initMacro, initSeason, initPortfolio, startCli, startPmi, startGdp, startEps, startM2, startCpi, startRate, startSpread);

    // ==========================================
    // PREMIUM MODAL HISTORICAL POPUP LOGIC
    // ==========================================
    const modalOverlay = document.getElementById("chart-modal");
    const modalTitle = document.getElementById("modal-indicator-title");
    const modalDesc = document.getElementById("modal-indicator-desc");
    const btnCloseModal = document.getElementById("btn-close-modal");
    let modalChartInstance = null;

    const indicatorMeta = {
        cli: {
            title: "OECD 경기선행지수 (CLI) 역사적 트렌드",
            desc: "OECD 경기선행지수 (Composite Leading Indicator)는 각 국가의 경기가 장기 추세(100)를 기준으로 확장하는지 수축하는지를 선행하여 보여주는 최적의 매크로 지표입니다. 100을 넘어 가속하면 확장, 100을 하회해 하락하면 수축을 시사합니다."
        },
        pmi: {
            title: "구매관리자지수 (PMI) 역사적 트렌드",
            desc: "PMI (Purchasing Managers' Index)는 제조업 분야의 신규 주문, 생산, 고용 등을 설문조사한 지표로, 50을 임계선으로 실물 제조업의 확장과 위축을 판단합니다. 경기 전환점을 가장 속보성 있게 반영하여 마켓 심리를 대변합니다."
        },
        gdp: {
            title: "실질 GDP 성장률 역사적 트렌드",
            desc: "실질 GDP 성장률(YoY)은 국가 경제의 실제 생산 체력이 전년 동기 대비 얼마나 성숙했는지를 확인해 주는 동행성 핵심 성적표입니다. 잠재성장률(미국 약 2.0%, 한국 약 2.2%) 대비 위아래 편차로 경기 건강도를 판단합니다."
        },
        eps: {
            title: "12M Forward EPS 성장률 역사적 트렌드",
            desc: "12M Forward EPS 성장률(YoY)은 기업들의 향후 12개월 주당순이익 전망치의 성장 속도를 뜻하며, 주식시장이 실적장세(여름)인지 역실적장세(겨울)인지 판정하는 핵심 펀더멘탈 척도입니다."
        },
        m2: {
            title: "M2 통화량 증가율 (YoY) 역사적 트렌드",
            desc: "M2 광의 통화량 증가율은 시중에 공급된 총 유동성의 팽창 속도를 대변합니다. M2의 강력한 팽창은 주식시장의 봄(금융장세)을 여는 땔감이 되며, 전체 자산 밸류에이션의 멀티플을 높이는 가장 결정적인 요인입니다."
        },
        cpi: {
            title: "인플레이션율 (CPI YoY) 역사적 트렌드",
            desc: "소비자물가지수(CPI) 전년 대비 상승률은 실물 경제의 인플레이션 압력을 뜻합니다. 과도한 물가 폭등은 중앙은행의 공격적인 금리 인상 긴축을 강제하여 금융 시장에 부담으로 작용하며, 전형적인 후행성 속성을 지닙니다."
        },
        rate: {
            title: "기준 금리 역사적 트렌드",
            desc: "기준 금리는 중앙은행이 시중 자금의 유동성 강도를 조율하기 위해 설정하는 초단기 정책 금리입니다. 전체 금융자산 밸류에이션의 기초 할인율(중력)로 작용하며, 금리의 급속한 인상은 주식시장의 가을(역금융)을 촉발합니다."
        },
        spread: {
            title: "장단기 금리차 (10Y-2Y) 역사적 트렌드",
            desc: "10Y-2Y 국채 장단기 금리차는 장기 성장 전망과 단기 통화 정책 긴장도의 차이를 뜻합니다. 스프레드가 음의 영역으로 역전(Inversion)되는 현상은 역사적으로 1년 뒤 경기 침체(Contraction)가 도래함을 알려주는 가장 완벽한 조기 경보입니다."
        }
    };

    // Bind Click events on table rows (5-Year High-Density Monthly Chart)
    const fiveYearMilestones = {
        "US": {
            cli: [101.5, 102.5, 98.8, 99.8, 100.2, 100.2],
            pmi: [60.0, 62.1, 47.2, 49.5, 51.5, 51.5],
            gdp: [5.0, 5.7, 2.5, 2.4, 2.2, 2.2],
            eps: [20.0, 29.5, 2.0, 7.5, 10.5, 10.5],
            m2: [15.0, 18.5, -1.0, 3.8, 4.5, 4.5],
            cpi: [2.5, 6.8, 4.1, 2.8, 2.3, 2.3],
            rate: [0.25, 0.25, 5.25, 5.0, 4.0, 4.0],
            spread: [1.5, 1.2, -0.8, -0.2, 0.2, 0.2]
        },
        "KR": {
            cli: [100.5, 102.2, 98.2, 99.8, 100.5, 100.5],
            pmi: [54.0, 57.5, 46.0, 50.5, 52.0, 52.0],
            gdp: [2.0, 3.7, 1.5, 2.2, 2.5, 2.5],
            eps: [12.0, 26.0, -18.0, 8.0, 200.0, 200.0],
            m2: [8.0, 9.8, 5.4, 6.0, 6.0, 6.0],
            cpi: [1.5, 4.0, 5.1, 2.8, 2.1, 2.1],
            rate: [0.5, 0.75, 3.25, 3.50, 3.25, 3.25],
            spread: [1.1, 1.0, -0.5, 0.0, 0.4, 0.4]
        }
    };

    document.querySelectorAll(".clickable-row").forEach(row => {
        row.addEventListener("click", (e) => {
            const indicatorKey = e.currentTarget.getAttribute("data-indicator");
            const meta = indicatorMeta[indicatorKey];
            if (!meta) return;

            // 1. Show Modal overlay
            modalOverlay.classList.remove("hidden");

            // 2. Set title & description
            modalTitle.textContent = `${meta.title.replace("역사적 트렌드", "")} 최근 5개년 월간 트렌드 (5-Year Monthly Trend)`;
            modalDesc.textContent = `${meta.desc} [차트 최종 지점은 현재 대시보드에 설정된 실시간 시뮬레이션 값이 유기적으로 연결됩니다]`;

            // 3. Generate 60-Month High-Density Chronological Series (May 2021 ~ May 2026)
            const ms = fiveYearMilestones[activeRegion][indicatorKey];
            
            // Extract current slider state to link dynamically as the final chart coordinate
            let activeCurrentValue = 0;
            if (indicatorKey === "cli") activeCurrentValue = parseFloat(document.getElementById("input-cli").value);
            else if (indicatorKey === "pmi") activeCurrentValue = parseFloat(document.getElementById("input-pmi").value);
            else if (indicatorKey === "gdp") activeCurrentValue = parseFloat(document.getElementById("input-gdp").value);
            else if (indicatorKey === "eps") activeCurrentValue = parseFloat(document.getElementById("input-eps").value);
            else if (indicatorKey === "m2") activeCurrentValue = parseFloat(document.getElementById("input-m2").value);
            else if (indicatorKey === "cpi") activeCurrentValue = parseFloat(document.getElementById("input-cpi").value);
            else if (indicatorKey === "rate") activeCurrentValue = parseFloat(document.getElementById("input-rate").value);
            else if (indicatorKey === "spread") activeCurrentValue = parseFloat(document.getElementById("input-spread").value);

            const interpolatedMilestones = [...ms];
            interpolatedMilestones[5] = activeCurrentValue; // Dynamic link!

            const labels = [];
            const dataValues = [];

            const startYear = 2021;
            const startMonth = 5; // May

            for (let i = 0; i <= 60; i++) {
                const intervalIndex = Math.min(4, Math.floor(i / 12));
                const fraction = (i % 12) / 12.0;

                const valStart = interpolatedMilestones[intervalIndex];
                const valEnd = interpolatedMilestones[intervalIndex + 1];

                let val = valStart + (valEnd - valStart) * fraction;

                // Add realistic macro wobble
                let noiseScale = 0.05;
                if (indicatorKey === "pmi") noiseScale = 0.35;
                else if (indicatorKey === "gdp" || indicatorKey === "cpi" || indicatorKey === "rate" || indicatorKey === "spread") noiseScale = 0.08;
                else if (indicatorKey === "eps") noiseScale = 0.8;
                else if (indicatorKey === "m2") noiseScale = 0.2;
                
                if (i !== 0 && i !== 60 && i % 12 !== 0) {
                    val += (Math.sin(i * 1.5) * 0.5 + (Math.random() - 0.5) * 0.5) * noiseScale;
                }

                dataValues.push(parseFloat(val.toFixed(2)));

                let curMonth = startMonth + i;
                let curYear = startYear + Math.floor((curMonth - 1) / 12);
                curMonth = ((curMonth - 1) % 12) + 1;
                
                if (i % 12 === 0 || i === 60) {
                    labels.push(`${curYear}년 ${curMonth}월`);
                } else {
                    labels.push(""); 
                }
            }

            // 4. Render/Update Chart.js Line Chart inside Modal
            const ctxModal = document.getElementById("modalHistoryChart").getContext("2d");
            const isDark = !document.body.classList.contains("light-theme");
            const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
            const textColor = isDark ? "#94a3b8" : "#475569";
            
            let lineColor = "#3b82f6"; 
            if (indicatorKey === "eps") lineColor = "#8b5cf6"; 
            else if (indicatorKey === "m2") lineColor = "#10b981"; 
            else if (indicatorKey === "rate" || indicatorKey === "cpi") lineColor = "#f59e0b"; 

            if (modalChartInstance) {
                modalChartInstance.destroy();
            }

            modalChartInstance = new Chart(ctxModal, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `${activeRegion === "US" ? "미국" : "한국"} 최근 5개년 추이`,
                        data: dataValues,
                        borderColor: lineColor,
                        borderWidth: 3,
                        pointBackgroundColor: function(context) {
                            // Highlights the last coordinate (currently simulated point) in bright white/gold glow!
                            const index = context.dataIndex;
                            return index === 60 ? "#ffffff" : lineColor;
                        },
                        pointBorderColor: function(context) {
                            const index = context.dataIndex;
                            return index === 60 ? "#ef4444" : "#ffffff";
                        },
                        pointBorderWidth: function(context) {
                            const index = context.dataIndex;
                            return index === 60 ? 3 : 2;
                        },
                        pointRadius: function(context) {
                            const index = context.dataIndex;
                            return index === 60 ? 8 : 4;
                        },
                        pointHoverRadius: 9,
                        fill: true,
                        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.06)' : 'rgba(59, 130, 246, 0.02)',
                        tension: 0.25
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: {
                            grid: { color: gridColor },
                            ticks: { 
                                color: textColor, 
                                maxRotation: 0,
                                font: { family: 'Inter', size: 9 } 
                            }
                        },
                        y: {
                            grid: { color: gridColor },
                            ticks: { color: textColor, font: { family: 'Inter', size: 10 } }
                        }
                    }
                }
            });
        });
    });

    // Close Modal Events
    function hideChartModal() {
        modalOverlay.classList.add("hidden");
        if (modalChartInstance) {
            modalChartInstance.destroy();
            modalChartInstance = null;
        }
    }

    btnCloseModal.addEventListener("click", hideChartModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            hideChartModal();
        }
    });
});
