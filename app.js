// MACROECONOMIC ENGINE & STOCK SEASONS INTERACTION WITH M2 LIQUIDITY

const EXCHANGE_RATE = 1474.52;
// --- GLOBAL INTERACTIVE DATABASE CONFIGURATION ---

const historicalPresets = {
    "US": {
        "2000_dotcom": {
            title: "2000년 IT 버블 붕괴 및 침체기",
            cli: 98.2, pmi: 43.5, gdp: 0.5, eps: -12.0, m2: 6.2, cpi: 3.4, rate: 6.5, spread: -0.4, citi: 20.0, gdpnow: 2.5,
            phase: "contraction", season: "winter",
            summary: "닷컴 버블 붕괴와 9/11 테러 여파로 실물 경제와 기업 이익이 급격히 위축되었습니다. 연준은 기준금리를 6.5%에서 인하하기 시작했으나 장단기 금리차가 역전된 후 주식시장 역실적장세(겨울)가 본격화되었습니다.",
            lessons: "버블 붕괴 국면에서는 고평가된 기술주를 피하고 장기 국채 및 현금 비중을 높이는 극단적인 방어 포지션이 유효했습니다. 연준의 급격한 금리 인하가 시작되더라도 실물 지표와 어닝 전망이 바닥을 잡기 전까지 주식 매수는 보수적으로 제한해야 합니다.",
            trail: [{ x: 1.5, y: -0.2 }, { x: 0.8, y: -1.2 }, { x: -0.2, y: -2.1 }, { x: -1.2, y: -2.6 }, { x: -2.2, y: -2.5 }, { x: -2.4, y: -1.8 }]
        },
        "2004_expansion": {
            title: "2004년 글로벌 동반 성장기",
            cli: 101.8, pmi: 58.5, gdp: 4.2, eps: 18.0, m2: 5.0, cpi: 2.7, rate: 1.5, spread: 1.8, citi: 20.0, gdpnow: 2.5,
            phase: "expansion", season: "summer",
            summary: "IT 버블을 완벽히 극복하고 저금리 기조 속에서 부동산 및 글로벌 제조업 활성화로 경제가 동반 확장(Expansion)에 진입, 전형적인 주식시장 실적장세(여름)를 보였습니다.",
            lessons: "금리 인상 초기 단계이자 강력한 실물 수요와 주당순이익(Fwd EPS) 성장이 확인되는 시기에는 주식과 경기민감 원자재 투자가 최고의 성과를 냅니다. 고배당보다 성장형 기술주와 산업재에 집중하는 적극적인 투자 배치가 승률을 높입니다.",
            trail: [{ x: -1.0, y: 0.5 }, { x: -0.2, y: 1.4 }, { x: 0.8, y: 2.1 }, { x: 1.6, y: 2.4 }, { x: 2.1, y: 2.6 }, { x: 2.4, y: 2.1 }]
        },
        "2008_crisis": {
            title: "2008년 글로벌 금융위기 (리먼 사태)",
            cli: 96.2, pmi: 34.0, gdp: -3.5, eps: -24.5, m2: 8.5, cpi: 1.1, rate: 1.5, spread: 0.8, citi: 20.0, gdpnow: 2.5,
            phase: "contraction", season: "winter",
            summary: "서브프라임 모기지 사태와 리먼 브라더스 파산으로 신용 자금줄이 마비되었습니다. 기업 실적 전망이 급격한 역성장으로 곤두박질치며 가혹한 역실적장세(겨울)가 몰아쳤습니다. 연준은 긴급 유동성 수혈을 시작하여 M2 증가율은 상승세였습니다.",
            lessons: "대공황 이래 최대 금융 마비로 모든 위험자산이 동반 낙하했으며, 포트폴리오 차원에서 주식 비중을 최소화하고 미국 국채와 달러 현금을 지키는 대피소형 전략만이 유일하게 성공적인 방어를 제공했습니다.",
            trail: [{ x: 0.8, y: -0.8 }, { x: -0.1, y: -1.8 }, { x: -1.2, y: -2.8 }, { x: -2.4, y: -3.5 }, { x: -3.2, y: -3.7 }, { x: -3.8, y: -2.9 }]
        },
        "2010_recovery": {
            title: "2010년 위기 극복 및 조기 회복기",
            cli: 100.8, pmi: 55.2, gdp: 2.8, eps: 15.0, m2: 3.5, cpi: 1.6, rate: 0.25, spread: 2.5, citi: 20.0, gdpnow: 2.5,
            phase: "recovery", season: "spring",
            summary: "미 연준의 역사적인 제로금리 및 양적완화(QE) 도입과 함께 실물 경기는 바닥이나 제조업 서베이가 먼저 반등하며 강한 유동성 효과에 기반한 금융장세(봄)를 촉진했습니다.",
            lessons: "불황의 끝자락에서 강력한 통화 완화와 함께 선행 지표가 살아날 때는 '돈의 힘'으로 실적 부진을 덮고 주가가 먼저 도약합니다. 금리 민감 금융주와 낙폭과대 대형주를 선제적으로 편입해야 하는 구간입니다.",
            trail: [{ x: -3.2, y: -1.5 }, { x: -2.3, y: -0.2 }, { x: -1.4, y: 0.9 }, { x: -0.6, y: 1.7 }, { x: 0.3, y: 2.3 }, { x: 0.8, y: 2.0 }]
        },
        "2018_late": {
            title: "2018년 연준 긴축 & 미·중 무역 분쟁기",
            cli: 99.5, pmi: 49.8, gdp: 1.9, eps: 5.0, m2: 3.8, cpi: 2.2, rate: 2.25, spread: 0.15, citi: 20.0, gdpnow: 2.5,
            phase: "slowdown", season: "autumn",
            summary: "누적된 연준의 금리 인상 및 대차대조표 축소(QT)와 무역전쟁 격화로 투자 심리가 급격히 냉각되었습니다. 실적 성장이 피크아웃하고 유동성이 극도로 축소되며 전형적인 역금융장세(가을) 성격을 보였습니다.",
            lessons: "장단기 금리차가 제로 부근에 도달하고 연준의 매파적 스탠스가 유지될 때는 위험 자산 비중을 정밀 조율하고 가치주, 필수재 및 고배당 현금 흐름 우량주 중심으로 포트폴리오를 다변화해야 이탈률을 방어할 수 있습니다.",
            trail: [{ x: 1.4, y: 0.6 }, { x: 1.0, y: -0.2 }, { x: 0.6, y: -0.8 }, { x: 0.2, y: -1.3 }, { x: -0.2, y: -1.5 }, { x: -0.6, y: -0.9 }]
        },
        "2021_boom": {
            title: "2021년 초과 유동성 & 보복 소비 붐",
            cli: 102.5, pmi: 62.1, gdp: 5.7, eps: 29.5, m2: 18.5, cpi: 6.8, rate: 0.25, spread: 1.2, citi: 20.0, gdpnow: 2.5,
            phase: "expansion", season: "summer",
            summary: "전 세계적인 유동성 살포(M2 증가율 역사상 최고 18.5%)와 보복 소비로 실물 성장과 기업의 Forward EPS가 폭발적으로 증가했습니다. 저금리 하에서 이익 탄력이 극대화된 최고조의 실적장세(여름)가 연출되었습니다.",
            lessons: "수요가 가파르고 실적 성장이 보장되는 구간에서는 고밸류 빅테크 성장주와 원자재 자산이 압도적 아웃퍼폼을 제공합니다. 다만 높은 인플레이션율(${cpi}%)이 후행적으로 중앙은행의 매파 전환 압력을 높이게 됨을 인지해야 합니다.",
            trail: [{ x: -1.5, y: 1.5 }, { x: 0.0, y: 2.8 }, { x: 1.5, y: 3.4 }, { x: 2.4, y: 3.4 }, { x: 2.9, y: 2.9 }, { x: 3.2, y: 1.8 }]
        },
        "2026_current": {
            title: "2026년 미국 연착륙 성공 & AI 확장기",
            cli: 100.2, pmi: 51.5, gdp: 2.2, eps: 10.5, m2: 4.5, cpi: 2.3, rate: 4.0, spread: 0.2, citi: 20.0, gdpnow: 2.5,
            phase: "expansion", season: "summer",
            summary: "안정적인 인플레이션 통제와 함께 중앙은행이 중립 금리 수준으로 질서 있게 인하하는 구간입니다. 시중 유동성이 정상 궤도를 회복(M2 증가율 4.5%)하며 AI 생산성 혁신이 실적(Forward EPS)을 주도하는 골디락스 실적장세(여름)입니다.",
            lessons: "실적이 지속 성장하고 물가와 금리가 하향 안정을 보이는 골디락스 단계에서는 AI 빅테크 및 우량 성장 기업 주식 중심의 공격적 포지션 배치가 가장 높은 자본 효율성을 안겨다 줍니다.",
            trail: [{ x: -0.8, y: -0.5 }, { x: -0.2, y: 0.3 }, { x: 0.3, y: 0.9 }, { x: 0.7, y: 1.2 }, { x: 1.0, y: 1.2 }, { x: 1.1, y: 0.9 }]
        }
    },
    "KR": {
        "2000_dotcom": {
            title: "2000년 코스닥 닷컴 버블 붕괴",
            cli: 97.8, pmi: 42.0, gdp: -1.0, eps: -25.0, m2: 15.0, cpi: 2.8, rate: 5.25, spread: -0.2, citi: 20.0, gdpnow: 2.5,
            phase: "contraction", season: "winter",
            summary: "코스닥 중심의 극단적 투기 붐 붕괴와 대기업 구조조정이 겹쳤습니다. 외환위기 복구 유동성 살포(M2: 15%)에도 불구하고 이익 전망이 참혹하게 무너지며 지수가 수직 급락하는 혹독한 역실적장세(겨울)를 보였습니다.",
            lessons: "한국 시장은 대외 변동성에 심해, 닷컴 붕괴기에는 현금 확보 및 신용 위험이 적은 초우량 대형 국채로 피신하는 정밀한 방어 체계 구축만이 살길이었습니다.",
            trail: [{ x: 1.2, y: -0.5 }, { x: 0.6, y: -1.4 }, { x: -0.3, y: -2.3 }, { x: -1.3, y: -2.8 }, { x: -2.1, y: -2.7 }, { x: -2.3, y: -2.0 }]
        },
        "2004_expansion": {
            title: "2004년 중국 특수 & 코스피 대도약기",
            cli: 101.5, pmi: 56.0, gdp: 4.0, eps: 22.0, m2: 6.5, cpi: 3.6, rate: 3.75, spread: 1.2, citi: 20.0, gdpnow: 2.5,
            phase: "expansion", season: "summer",
            summary: "중국의 고속 성장에 따른 원자재/조선/해운 특수(브릭스 붐)로 한국 수출 기업들의 Forward EPS가 폭발하며 코스피가 역사적 상승세를 탄 실적장세(여름)입니다. 시중 유동성 공급도 안정적이었습니다.",
            lessons: "한국의 제조업 기반 순환 특성상, 중국 및 글로벌 성장 사이클과 맞물리는 실적장세에는 무조건 중화학공업, 철강, 소재, 해운 등 경기민감 대형주에 레버리지를 실어 초과이익을 도모해야 합니다.",
            trail: [{ x: -1.2, y: 0.3 }, { x: -0.4, y: 1.2 }, { x: 0.5, y: 1.9 }, { x: 1.3, y: 2.2 }, { x: 1.9, y: 2.3 }, { x: 2.2, y: 1.8 }]
        },
        "2008_crisis": {
            title: "2008년 금융위기 & 고환율·신용 경색",
            cli: 95.5, pmi: 32.5, gdp: -4.5, eps: -35.0, m2: 12.0, cpi: 4.7, rate: 3.0, spread: 0.4, citi: 20.0, gdpnow: 2.5,
            phase: "contraction", season: "winter",
            summary: "글로벌 불황과 원·달러 환율 폭등, 자본 이탈이 겹쳐 코스피가 900선 이하로 밀렸습니다. 한은의 긴급 금융 수혈로 M2 유동성은 12% 늘었으나, 실물 제조업 가동률이 붕괴된 최악의 역실적장세(겨울)였습니다.",
            lessons: "대외 의존도가 높은 KOSPI는 글로벌 위기 시 외국인 자금 이탈로 지수가 반토막 납니다. 환율 방어가 되는 외화 현금 자산과 우량 장기 국채 중심의 초보수 포지션 전환이 강제되는 구간입니다.",
            trail: [{ x: 1.0, y: -0.9 }, { x: 0.1, y: -1.9 }, { x: -1.0, y: -2.9 }, { x: -2.1, y: -3.5 }, { x: -2.8, y: -3.6 }, { x: -3.2, y: -2.8 }]
        },
        "2011_chawajung": {
            title: "2011년 코스피 '차·화·정' 주도 강세장",
            cli: 102.2, pmi: 57.5, gdp: 3.7, eps: 26.0, m2: 7.5, cpi: 4.0, rate: 3.25, spread: 1.0, citi: 20.0, gdpnow: 2.5,
            phase: "expansion", season: "summer",
            summary: "위기 후 글로벌 경기 회복 속에 자동차, 화학, 정유(차화정) 업종의 실적이 압도적으로 아웃퍼폼하며 코스피 지수를 사상 최초로 2,200선 위로 견인했던 실적장세(여름)입니다. 시중 유동성도 양호했습니다.",
            lessons: "KOSPI의 전형적인 압축 주도주 장세였습니다. 이 시기에는 지수 분산보다 실적(Forward EPS) 가속도가 독보적으로 높은 주도 섹터(차·화·정)에 포트폴리오를 과감하게 집중 편입시키는 압축 전략이 정답이었습니다.",
            trail: [{ x: -2.2, y: 0.5 }, { x: -1.0, y: 1.6 }, { x: 0.2, y: 2.3 }, { x: 1.2, y: 2.5 }, { x: 1.9, y: 2.4 }, { x: 2.2, y: 1.9 }]
        },
        "2018_semicon": {
            title: "2018년 반도체 슈퍼사이클 & 미·중 무역 쇼크",
            cli: 99.0, pmi: 48.5, gdp: 2.4, eps: 12.0, m2: 6.2, cpi: 1.5, rate: 1.75, spread: 0.3, citi: 20.0, gdpnow: 2.5,
            phase: "slowdown", season: "autumn",
            summary: "삼성전자/하이닉스의 사상 최대 이익에도 불구하고 글로벌 유동성 축소(M2 둔화)와 미중 무역 갈등으로 코스피 주가는 선행하여 하락한 역금융장세(가을) 국면입니다.",
            lessons: "KOSPI는 이익이 최고치일 때가 종종 매도 정점이 됩니다. 선행 주당순이익 성장률이 고점을 찍고 둔화 조짐을 보이며 거시 유동성 공급 속도가 하락할 때는 적극적인 리스크 관리가 필요합니다.",
            trail: [{ x: 1.5, y: 0.5 }, { x: 1.1, y: -0.1 }, { x: 0.7, y: -0.7 }, { x: 0.3, y: -1.2 }, { x: -0.1, y: -1.4 }, { x: -0.4, y: -0.9 }]
        },
        "2020_donghak": {
            title: "2020년 팬데믹 급락 후 '동학개미' 유동성 붐",
            cli: 100.8, pmi: 54.0, gdp: -1.0, eps: 8.0, m2: 9.8, cpi: 0.5, rate: 0.50, spread: 1.1, citi: 20.0, gdpnow: 2.5,
            phase: "recovery", season: "spring",
            summary: "코로나 충격 후 사상 초유의 기준금리 인하(0.5%)와 개인 투자자들의 유동성 유입(M2 증가율 9.8%)이 맞물리며 코스피가 폭발적으로 선행 반등했던 금융장세(봄)입니다.",
            lessons: "실물 지표(GDP 성장률 마이너스)는 최악이었으나, 개인 중심의 압도적 머니무브와 초저금리가 시너지를 내며 IT 대형주가 폭등했습니다. 지표 부진의 공포를 이겨내고 레버리지를 늘려 주식 비중을 채웠어야 하는 국면입니다.",
            trail: [{ x: -3.0, y: -1.5 }, { x: -2.0, y: -0.5 }, { x: -1.0, y: 0.5 }, { x: -0.2, y: 1.2 }, { x: 0.4, y: 1.6 }, { x: 0.7, y: 1.4 }]
        },
        "2022_winter": {
            title: "2022년 금리 급상승 & 메모리 반도체 빙하기",
            cli: 98.2, pmi: 46.0, gdp: 1.5, eps: -18.0, m2: 5.4, cpi: 5.1, rate: 3.25, spread: -0.5, citi: 20.0, gdpnow: 2.5,
            phase: "contraction", season: "winter",
            summary: "글로벌 긴축 속 반도체 재고 과잉으로 삼성전자 등 수출 대기업들의 실적 전망이 처참히 박살났습니다. 시중 통화량(M2) 증가세가 5.4%로 위축된 가운데 역실적장세(겨울)가 찾아왔습니다.",
            lessons: "반도체 다운사이클과 긴축 폭풍이 정통으로 만나는 역실적장세에는 무조건 안전자산(예금, 달러 채권) 비중을 60% 이상으로 유지하고 반도체 적자 폭이 극에 달할 때까지 대형주 신규 매수를 극단적으로 아껴야 합니다.",
            trail: [{ x: 1.5, y: 0.8 }, { x: 1.0, y: 0.1 }, { x: 0.4, y: -0.6 }, { x: -0.2, y: -1.3 }, { x: -0.7, y: -1.8 }, { x: -1.0, y: -1.3 }]
        },
        "2026_current": {
            title: "2026년 반도체 HBM 부활 & 주주환원 성장기",
            cli: 100.5, pmi: 52.0, gdp: 6.77, eps: 200.0, m2: 6.0, cpi: 3.20, rate: 0.00, spread: 0.4, citi: 20.0, gdpnow: 2.5,
            phase: "expansion", season: "summer",
            summary: "AI 고대역폭메모리(HBM) 수출 호조와 기업 밸류업 프로그램 가동으로 선행 이익 성장이 두드러집니다. 통화량 공급도 정상 궤도(M2 6.0%)에 복귀한 안정적 실적장세(여름)입니다.",
            lessons: "실물 선행 지수가 안정적이고 이익 성장 모멘텀이 강한 확장 국면에서는 반도체, AI 장비주, 그리고 기업 밸류업 프로그램 수혜 우량 지주사/금융주 중심의 강한 포커싱 투자 전략이 최상의 성과를 제공합니다.",
            trail: [{ x: -0.6, y: -0.4 }, { x: -0.1, y: 0.2 }, { x: 0.3, y: 0.7 }, { x: 0.6, y: 1.0 }, { x: 0.8, y: 1.0 }, { x: 0.9, y: 0.8 }]
        }
    }
};


const exportData = {
    "US": {
        "2026-07": {
            growthVal: "+3.4%",
            growthTrend: "▲ AI 관련 기술 라이선스 호조",
            balanceVal: "-618억 달러 적자",
            balanceTrend: "▲ 셰일 오일 및 가스 수출 강세",
            ebsiVal: "103.5",
            ebsiTrend: "▲ 완만한 유동성 유입에 따른 심리 개선",
            items: [
                {
                    name: "IT 기술, IP 및 SW 로열티", pct: 32, change: "+8.8%", barClass: "summer",
                    subItems: [
                        { name: "클라우드 서비스 (AWS/Azure)", yoy: "+13.1%", mom: "+1.5%" },
                        { name: "AI 알고리즘 및 API 라이선싱", yoy: "+19.2%", mom: "+2.8%" },
                        { name: "기업용 SaaS 솔루션", yoy: "+6.8%", mom: "+1.0%" }
                    ]
                },
                {
                    name: "민간 항공기 및 우주 장비", pct: 12, change: "+4.5%", barClass: "spring",
                    subItems: [
                        { name: "민간 여객기 완제품 인도", yoy: "+3.5%", mom: "+0.8%" },
                        { name: "방산 항공 부품 및 정비", yoy: "+8.5%", mom: "+1.0%" },
                        { name: "민간 통신 위성 및 발사체", yoy: "+3.0%", mom: "+0.4%" }
                    ]
                },
                {
                    name: "셰일 오일 및 LNG 에너지 자원", pct: 10, change: "+6.5%", barClass: "autumn",
                    subItems: [
                        { name: "원유 (WTI 기준 수출)", yoy: "+5.1%", mom: "+1.2%" },
                        { name: "천연가스 (LNG) 글로벌 운송", yoy: "+9.2%", mom: "+1.8%" },
                        { name: "정제 석유화학 완제품 및 윤활유", yoy: "+5.5%", mom: "+0.5%" }
                    ]
                },
                {
                    name: "비메모리 반도체 및 디바이스 하드웨어", pct: 6, change: "-1.0%", barClass: "winter",
                    subItems: [
                        { name: "AI 가속기 및 차량용 GPU 칩", yoy: "+30.1%", mom: "+3.8%" },
                        { name: "모바일 AP 및 이미지센서 파운드리", yoy: "-4.8%", mom: "-0.5%" },
                        { name: "통신 인프라 및 네트워크 하드웨어", yoy: "-7.5%", mom: "-1.0%" }
                    ]
                }
            ]
        },
        "2026-07": {
            growthVal: "+3.2%",
            growthTrend: "▲ AI 서비스 및 에너지 견인",
            balanceVal: "-625억 달러 적자",
            balanceTrend: "▼ 소비재 수입 지속 우위",
            ebsiVal: "102.8",
            ebsiTrend: "▲ 글로벌 테크 수요 안착",
            items: [
                {
                    name: "IT 서비스, IP 및 SW 로열티", pct: 32, change: "+8.5%", barClass: "summer",
                    subItems: [
                        { name: "클라우드 인프라 (AWS/Azure)", yoy: "+12.4%", mom: "+1.8%" },
                        { name: "AI 알고리즘 및 API 라이선싱", yoy: "+18.5%", mom: "+3.2%" },
                        { name: "엔터프라이즈 SaaS 솔루션", yoy: "+6.2%", mom: "+0.8%" }
                    ]
                },
                {
                    name: "민간 항공기 및 방산 우주 장비", pct: 12, change: "+4.2%", barClass: "spring",
                    subItems: [
                        { name: "민간 여객기 및 제트 엔진 인도", yoy: "+3.0%", mom: "+0.5%" },
                        { name: "첨단 정밀 유도 방산 무기 체계", yoy: "+8.2%", mom: "+1.4%" },
                        { name: "인공위성 및 우주항공 통신 장비", yoy: "+2.8%", mom: "+0.2%" }
                    ]
                },
                {
                    name: "셰일 오일 및 정제 액화 에너지 자원", pct: 10, change: "+6.0%", barClass: "autumn",
                    subItems: [
                        { name: "셰일 원유 (WTI 선적)", yoy: "+4.5%", mom: "+0.9%" },
                        { name: "액화천연가스 (LNG) 글로벌 수출", yoy: "+8.8%", mom: "+1.5%" },
                        { name: "휘발유 및 항공유 등 석유 정제제품", yoy: "+5.2%", mom: "+0.7%" }
                    ]
                },
                {
                    name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 6, change: "-1.5%", barClass: "winter",
                    subItems: [
                        { name: "AI 가속기 및 고성능 GPU 설계", yoy: "+28.5%", mom: "+4.1%" },
                        { name: "실리콘 웨이퍼 및 첨단 노광장비", yoy: "-5.2%", mom: "-0.8%" },
                        { name: "디바이스 모뎀 및 네트워크 라우터", yoy: "-8.0%", mom: "-1.2%" }
                    ]
                }
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
                {
                    name: "IT 서비스, IP 및 SW 로열티", pct: 31, change: "+9.0%", barClass: "summer",
                    subItems: [
                        { name: "클라우드 인프라 (AWS/Azure)", yoy: "+13.0%", mom: "+2.0%" },
                        { name: "AI 알고리즘 및 API 라이선싱", yoy: "+19.2%", mom: "+3.5%" },
                        { name: "엔터프라이즈 SaaS 솔루션", yoy: "+6.5%", mom: "+1.0%" }
                    ]
                },
                {
                    name: "민간 항공기 및 방산 우주 장비", pct: 12, change: "+4.5%", barClass: "spring",
                    subItems: [
                        { name: "민간 여객기 및 제트 엔진 인도", yoy: "+3.2%", mom: "+0.6%" },
                        { name: "첨단 정밀 유도 방산 무기 체계", yoy: "+8.5%", mom: "+1.5%" },
                        { name: "인공위성 및 우주항공 통신 장비", yoy: "+3.0%", mom: "+0.3%" }
                    ]
                },
                {
                    name: "셰일 오일 및 정제 액화 에너지 자원", pct: 10, change: "+5.8%", barClass: "autumn",
                    subItems: [
                        { name: "셰일 원유 (WTI 선적)", yoy: "+4.2%", mom: "+0.8%" },
                        { name: "액화천연가스 (LNG) 글로벌 수출", yoy: "+8.5%", mom: "+1.3%" },
                        { name: "휘발유 및 항공유 등 석유 정제제품", yoy: "+5.0%", mom: "+0.6%" }
                    ]
                },
                {
                    name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 6, change: "-1.2%", barClass: "winter",
                    subItems: [
                        { name: "AI 가속기 및 고성능 GPU 설계", yoy: "+30.0%", mom: "+4.5%" },
                        { name: "실리콘 웨이퍼 및 첨단 노광장비", yoy: "-4.8%", mom: "-0.6%" },
                        { name: "디바이스 모뎀 및 네트워크 라우터", yoy: "-7.5%", mom: "-1.0%" }
                    ]
                }
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
                {
                    name: "IT 서비스, IP 및 SW 로열티", pct: 32, change: "+8.0%", barClass: "summer",
                    subItems: [
                        { name: "클라우드 인프라 (AWS/Azure)", yoy: "+11.8%", mom: "+1.5%" },
                        { name: "AI 알고리즘 및 API 라이선싱", yoy: "+17.8%", mom: "+2.8%" },
                        { name: "엔터프라이즈 SaaS 솔루션", yoy: "+5.8%", mom: "+0.7%" }
                    ]
                },
                {
                    name: "민간 항공기 및 방산 우주 장비", pct: 11, change: "+3.8%", barClass: "spring",
                    subItems: [
                        { name: "민간 여객기 및 제트 엔진 인도", yoy: "+2.6%", mom: "+0.4%" },
                        { name: "첨단 정밀 유도 방산 무기 체계", yoy: "+7.8%", mom: "+1.2%" },
                        { name: "인공위성 및 우주항공 통신 장비", yoy: "+2.5%", mom: "+0.1%" }
                    ]
                },
                {
                    name: "셰일 오일 및 정제 액화 에너지 자원", pct: 9, change: "+5.2%", barClass: "autumn",
                    subItems: [
                        { name: "셰일 원유 (WTI 선적)", yoy: "+3.8%", mom: "+0.7%" },
                        { name: "액화천연가스 (LNG) 글로벌 수출", yoy: "+7.8%", mom: "+1.1%" },
                        { name: "휘발유 및 항공유 등 석유 정제제품", yoy: "+4.5%", mom: "+0.5%" }
                    ]
                },
                {
                    name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 5, change: "-2.0%", barClass: "winter",
                    subItems: [
                        { name: "AI 가속기 및 고성능 GPU 설계", yoy: "+25.5%", mom: "+3.8%" },
                        { name: "실리콘 웨이퍼 및 첨단 노광장비", yoy: "-5.8%", mom: "-1.0%" },
                        { name: "디바이스 모뎀 및 네트워크 라우터", yoy: "-8.5%", mom: "-1.5%" }
                    ]
                }
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
                {
                    name: "IT 서비스, IP 및 SW 로열티", pct: 30, change: "+5.2%", barClass: "summer",
                    subItems: [
                        { name: "클라우드 인프라 (AWS/Azure)", yoy: "+8.2%", mom: "+1.0%" },
                        { name: "AI 알고리즘 및 API 라이선싱", yoy: "+12.4%", mom: "+1.8%" },
                        { name: "엔터프라이즈 SaaS 솔루션", yoy: "+3.8%", mom: "+0.4%" }
                    ]
                },
                {
                    name: "민간 항공기 및 방산 우주 장비", pct: 12, change: "+2.8%", barClass: "spring",
                    subItems: [
                        { name: "민간 여객기 및 제트 엔진 인도", yoy: "+1.8%", mom: "+0.2%" },
                        { name: "첨단 정밀 유도 방산 무기 체계", yoy: "+5.5%", mom: "+0.9%" },
                        { name: "인공위성 및 우주항공 통신 장비", yoy: "+1.5%", mom: "+0.1%" }
                    ]
                },
                {
                    name: "셰일 오일 및 정제 액화 에너지 자원", pct: 11, change: "+3.0%", barClass: "autumn",
                    subItems: [
                        { name: "셰일 원유 (WTI 선적)", yoy: "+2.2%", mom: "+0.4%" },
                        { name: "액화천연가스 (LNG) 글로벌 수출", yoy: "+4.5%", mom: "+0.7%" },
                        { name: "휘발유 및 항공유 등 석유 정제제품", yoy: "+2.8%", mom: "+0.3%" }
                    ]
                },
                {
                    name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 5, change: "-4.5%", barClass: "winter",
                    subItems: [
                        { name: "AI 가속기 및 고성능 GPU 설계", yoy: "+15.0%", mom: "+2.2%" },
                        { name: "실리콘 웨이퍼 및 첨단 노광장비", yoy: "-8.5%", mom: "-1.5%" },
                        { name: "디바이스 모뎀 및 네트워크 라우터", yoy: "-11.2%", mom: "-2.0%" }
                    ]
                }
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
                {
                    name: "IT 서비스, IP 및 SW 로열티", pct: 29, change: "+4.5%", barClass: "summer",
                    subItems: [
                        { name: "클라우드 인프라 (AWS/Azure)", yoy: "+7.5%", mom: "+0.8%" },
                        { name: "AI 알고리즘 및 API 라이선싱", yoy: "+11.0%", mom: "+1.5%" },
                        { name: "엔터프라이즈 SaaS 솔루션", yoy: "+3.2%", mom: "+0.3%" }
                    ]
                },
                {
                    name: "민간 항공기 및 방산 우주 장비", pct: 12, change: "+2.2%", barClass: "spring",
                    subItems: [
                        { name: "민간 여객기 및 제트 엔진 인도", yoy: "+1.5%", mom: "+0.1%" },
                        { name: "첨단 정밀 유도 방산 무기 체계", yoy: "+4.8%", mom: "+0.7%" },
                        { name: "인공위성 및 우주항공 통신 장비", yoy: "+1.2%", mom: "+0.1%" }
                    ]
                },
                {
                    name: "셰일 오일 및 정제 액화 에너지 자원", pct: 11, change: "+2.5%", barClass: "autumn",
                    subItems: [
                        { name: "셰일 원유 (WTI 선적)", yoy: "+1.8%", mom: "+0.3%" },
                        { name: "액화천연가스 (LNG) 글로벌 수출", yoy: "+3.8%", mom: "+0.6%" },
                        { name: "휘발유 및 항공유 등 석유 정제제품", yoy: "+2.2%", mom: "+0.2%" }
                    ]
                },
                {
                    name: "대외 첨단 반도체 및 디바이스 하드웨어", pct: 5, change: "-5.0%", barClass: "winter",
                    subItems: [
                        { name: "AI 가속기 및 고성능 GPU 설계", yoy: "+12.5%", mom: "+1.8%" },
                        { name: "실리콘 웨이퍼 및 첨단 노광장비", yoy: "-9.2%", mom: "-1.8%" },
                        { name: "디바이스 모뎀 및 네트워크 라우터", yoy: "-12.0%", mom: "-2.2%" }
                    ]
                }
            ]
        }
    },
    "KR": {
        "2026-07": {
            growthVal: "+60.4%",
            growthTrend: "▲ HBM 및 메모리 반도체 슈퍼사이클 지속",
            balanceVal: "+175.0억 달러 흑자 (1~20일 잠정)",
            balanceTrend: "▲ 1~20일 반도체·선박 수출 급증에 따른 흑자",
            ebsiVal: "114.5",
            ebsiTrend: "▲ 글로벌 AI 수요 가속에 따른 업황 확장",
            items: [
                {
                    name: "반도체 (DRAM / HBM 메모리 반도체)", pct: 18, change: "+190.0%", barClass: "summer",
                    subItems: [
                        { name: "HBM (고대역폭 메모리)", yoy: "+290.0%", mom: "+15.2%" },
                        { name: "DRAM (대용량 메모리 반도체)", yoy: "+54.5%", mom: "+4.1%" },
                        { name: "기업용 SSD (Solid State Drive)", yoy: "+293.3%", mom: "+3.0%" }
                    ]
                },
                {
                    name: "자동차, 친환경차 및 완성차 부품", pct: 13, change: "+2.3%", barClass: "spring",
                    subItems: [
                        { name: "친환경 완성차 (EV 포함)", yoy: "+19.2%", mom: "+2.2%" },
                        { name: "하이브리드 완성차 (HEV)", yoy: "+24.5%", mom: "+2.8%" },
                        { name: "완성차 기계식 전장 부품 및 제어", yoy: "+6.8%", mom: "+1.2%" }
                    ]
                },
                {
                    name: "석유제품 및 석유화학 제품", pct: 8, change: "+39.0%", barClass: "summer",
                    subItems: [
                        { name: "합성수지 (플라스틱 등)", yoy: "-1.0%", mom: "+0.5%" },
                        { name: "기초 유기 석유화학 제품", yoy: "-3.8%", mom: "-0.5%" },
                        { name: "윤활유 및 특수 아스팔트 제품", yoy: "-1.5%", mom: "-0.2%" }
                    ]
                },
                {
                    name: "선박, LNG 고부가가치 운반선", pct: 6, change: "+19.2%", barClass: "autumn",
                    subItems: [
                        { name: "고부가가치 LNG 운반선", yoy: "+31.5%", mom: "+4.8%" },
                        { name: "초대형 유조선 및 컨테이너선", yoy: "+14.2%", mom: "+1.5%" },
                        { name: "친환경 암모니아/메탄올 추진선", yoy: "+16.8%", mom: "+2.0%" }
                    ]
                }
            ]
        },
        "2026-07": {
            growthVal: "+11.7%",
            growthTrend: "▲ HBM/DRAM 반도체 대형 사이클 주도 (잠정치)",
            balanceVal: "+48.5억 달러 흑자",
            balanceTrend: "▲ 반도체 호조로 12개월 연속 흑자 안착",
            ebsiVal: "113.2",
            ebsiTrend: "▲ 수출 경기 회복 지수 안정적 확장",
            items: [
                {
                    name: "반도체 (DRAM / HBM 메모리 포함)", pct: 18, change: "+43.8%", barClass: "summer",
                    subItems: [
                        { name: "HBM (고대역폭 메모리)", yoy: "+262.0%", mom: "+18.5%" },
                        { name: "DRAM (고용량 서버 메모리)", yoy: "+51.2%", mom: "+4.8%" },
                        { name: "차세대 SSD (Solid State Drive)", yoy: "+35.6%", mom: "+3.5%" }
                    ]
                },
                {
                    name: "자동차, 친환경차 및 완성차 부품", pct: 13, change: "+12.5%", barClass: "spring",
                    subItems: [
                        { name: "친환경 전기차 (EV 선적)", yoy: "+18.5%", mom: "+2.6%" },
                        { name: "하이브리드 완성차 (HEV)", yoy: "+23.0%", mom: "+3.2%" },
                        { name: "샤시 모듈 및 조향 부품 수출", yoy: "+6.0%", mom: "+1.0%" }
                    ]
                },
                {
                    name: "석유화학 제품 및 합성수지", pct: 8, change: "-2.4%", barClass: "winter",
                    subItems: [
                        { name: "합성수지 (플라스틱 성형원료)", yoy: "-1.5%", mom: "+0.2%" },
                        { name: "에틸렌 및 기초 합성원료", yoy: "-4.2%", mom: "-0.8%" },
                        { name: "폴리에스터 가공 기능성 소재", yoy: "-2.0%", mom: "-0.3%" }
                    ]
                },
                {
                    name: "선박, LNG 고부가가치 운반선", pct: 6, change: "+18.5%", barClass: "autumn",
                    subItems: [
                        { name: "고부가가치 LNG 가스 운반선", yoy: "+29.0%", mom: "+5.5%" },
                        { name: "대형 컨테이너선 건조 인도", yoy: "+13.0%", mom: "+2.0%" },
                        { name: "친환경 이중연료 추진 선박", yoy: "+15.5%", mom: "+2.2%" }
                    ]
                }
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
                {
                    name: "반도체 (DRAM / HBM 메모리 포함)", pct: 19, change: "+45.0%", barClass: "summer",
                    subItems: [
                        { name: "HBM (고대역폭 메모리)", yoy: "+280.0%", mom: "+20.5%" },
                        { name: "DRAM (고용량 서버 메모리)", yoy: "+52.0%", mom: "+5.0%" },
                        { name: "차세대 SSD (Solid State Drive)", yoy: "+35.0%", mom: "+3.6%" }
                    ]
                },
                {
                    name: "자동차, 친환경차 및 완성차 부품", pct: 13, change: "+11.5%", barClass: "spring",
                    subItems: [
                        { name: "친환경 전기차 (EV 선적)", yoy: "+16.5%", mom: "+2.0%" },
                        { name: "하이브리드 완성차 (HEV)", yoy: "+20.8%", mom: "+2.8%" },
                        { name: "샤시 모듈 및 조향 부품 수출", yoy: "+5.2%", mom: "+0.7%" }
                    ]
                },
                {
                    name: "석유화학 제품 및 합성수지", pct: 8, change: "-1.8%", barClass: "winter",
                    subItems: [
                        { name: "합성수지 (플라스틱 성형원료)", yoy: "-1.0%", mom: "+0.3%" },
                        { name: "에틸렌 및 기초 합성원료", yoy: "-3.5%", mom: "-0.5%" },
                        { name: "폴리에스터 가공 기능성 소재", yoy: "-1.5%", mom: "-0.2%" }
                    ]
                },
                {
                    name: "선박, LNG 고부가가치 운반선", pct: 5, change: "+15.5%", barClass: "autumn",
                    subItems: [
                        { name: "고부가가치 LNG 가스 운반선", yoy: "+25.0%", mom: "+4.5%" },
                        { name: "대형 컨테이너선 건조 인도", yoy: "+10.8%", mom: "+1.5%" },
                        { name: "친환경 이중연료 추진 선박", yoy: "+12.8%", mom: "+1.6%" }
                    ]
                }
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
                {
                    name: "반도체 (DRAM / HBM 메모리 포함)", pct: 17, change: "+38.0%", barClass: "summer",
                    subItems: [
                        { name: "HBM (고대역폭 메모리)", yoy: "+240.0%", mom: "+15.8%" },
                        { name: "DRAM (고용량 서버 메모리)", yoy: "+44.0%", mom: "+3.8%" },
                        { name: "차세대 SSD (Solid State Drive)", yoy: "+28.5%", mom: "+2.8%" }
                    ]
                },
                {
                    name: "자동차, 친환경차 및 완성차 부품", pct: 13, change: "+9.8%", barClass: "spring",
                    subItems: [
                        { name: "친환경 전기차 (EV 선적)", yoy: "+14.8%", mom: "+1.8%" },
                        { name: "하이브리드 완성차 (HEV)", yoy: "+18.0%", mom: "+2.2%" },
                        { name: "샤시 모듈 및 조향 부품 수출", yoy: "+4.5%", mom: "+0.5%" }
                    ]
                },
                {
                    name: "석유화학 제품 및 합성수지", pct: 8, change: "-3.0%", barClass: "winter",
                    subItems: [
                        { name: "합성수지 (플라스틱 성형원료)", yoy: "-2.2%", mom: "+0.1%" },
                        { name: "에틸렌 및 기초 합성원료", yoy: "-5.0%", mom: "-1.0%" },
                        { name: "폴리에스터 가공 기능성 소재", yoy: "-2.8%", mom: "-0.5%" }
                    ]
                },
                {
                    name: "선박, LNG 고부가가치 운반선", pct: 6, change: "+12.4%", barClass: "autumn",
                    subItems: [
                        { name: "고부가가치 LNG 가스 운반선", yoy: "+20.0%", mom: "+3.8%" },
                        { name: "대형 컨테이너선 건조 인도", yoy: "+8.5%", mom: "+1.2%" },
                        { name: "친환경 이중연료 추진 선박", yoy: "+10.0%", mom: "+1.2%" }
                    ]
                }
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
                {
                    name: "반도체 (DRAM / HBM 메모리 포함)", pct: 15, change: "+12.5%", barClass: "summer",
                    subItems: [
                        { name: "HBM (고대역폭 메모리)", yoy: "+85.0%", mom: "+5.2%" },
                        { name: "DRAM (고용량 서버 메모리)", yoy: "+15.0%", mom: "+1.5%" },
                        { name: "차세대 SSD (Solid State Drive)", yoy: "+8.8%", mom: "+0.8%" }
                    ]
                },
                {
                    name: "자동차, 친환경차 및 완성차 부품", pct: 14, change: "+8.2%", barClass: "spring",
                    subItems: [
                        { name: "친환경 전기차 (EV 선적)", yoy: "+10.5%", mom: "+1.0%" },
                        { name: "하이브리드 완성차 (HEV)", yoy: "+14.0%", mom: "+1.5%" },
                        { name: "샤시 모듈 및 조향 부품 수출", yoy: "+3.2%", mom: "+0.3%" }
                    ]
                },
                {
                    name: "석유화학 제품 및 합성수지", pct: 9, change: "-6.5%", barClass: "winter",
                    subItems: [
                        { name: "합성수지 (플라스틱 성형원료)", yoy: "-5.0%", mom: "-0.8%" },
                        { name: "에틸렌 및 기초 합성원료", yoy: "-8.5%", mom: "-1.5%" },
                        { name: "폴리에스터 가공 기능성 소재", yoy: "-5.8%", mom: "-1.0%" }
                    ]
                },
                {
                    name: "선박, LNG 고부가가치 운반선", pct: 5, change: "+8.0%", barClass: "autumn",
                    subItems: [
                        { name: "고부가가치 LNG 가스 운반선", yoy: "+12.0%", mom: "+2.0%" },
                        { name: "대형 컨테이너선 건조 인도", yoy: "+5.8%", mom: "+0.6%" },
                        { name: "친환경 이중연료 추진 선박", yoy: "+7.2%", mom: "+0.8%" }
                    ]
                }
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
                {
                    name: "반도체 (DRAM / HBM 메모리 포함)", pct: 14, change: "+9.0%", barClass: "summer",
                    subItems: [
                        { name: "HBM (고대역폭 메모리)", yoy: "+72.0%", mom: "+4.1%" },
                        { name: "DRAM (고용량 서버 메모리)", yoy: "+11.2%", mom: "+1.0%" },
                        { name: "차세대 SSD (Solid State Drive)", yoy: "+6.5%", mom: "+0.5%" }
                    ]
                },
                {
                    name: "자동차, 친환경차 및 완성차 부품", pct: 14, change: "+6.8%", barClass: "spring",
                    subItems: [
                        { name: "친환경 전기차 (EV 선적)", yoy: "+8.8%", mom: "+0.8%" },
                        { name: "하이브리드 완성차 (HEV)", yoy: "+11.5%", mom: "+1.2%" },
                        { name: "샤시 모듈 및 조향 부품 수출", yoy: "+2.5%", mom: "+0.2%" }
                    ]
                },
                {
                    name: "석유화학 제품 및 합성수지", pct: 9, change: "-8.2%", barClass: "winter",
                    subItems: [
                        { name: "합성수지 (플라스틱 성형원료)", yoy: "-6.8%", mom: "-1.2%" },
                        { name: "에틸렌 및 기초 합성원료", yoy: "-10.5%", mom: "-2.0%" },
                        { name: "폴리에스터 가공 기능성 소재", yoy: "-7.8%", mom: "-1.4%" }
                    ]
                },
                {
                    name: "선박, LNG 고부가가치 운반선", pct: 5, change: "+5.5%", barClass: "autumn",
                    subItems: [
                        { name: "고부가가치 LNG 가스 운반선", yoy: "+8.2%", mom: "+1.1%" },
                        { name: "대형 컨테이너선 건조 인도", yoy: "+3.5%", mom: "+0.4%" },
                        { name: "친환경 이중연료 추진 선박", yoy: "+5.0%", mom: "+0.5%" }
                    ]
                }
            ]
        }
    }
};

function updateExportCard() {
    const monthSelect = document.getElementById("export-month-select");
    const activeMonth = monthSelect ? monthSelect.value : "2026-07";

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





    // Update Export Card Source Link
    const sourceLinkEl = document.getElementById("export-card-source-link");
    if (sourceLinkEl) {
        if (activeRegion === "KR") {
            sourceLinkEl.href = "https://stat.kita.net/";
            sourceLinkEl.textContent = "KITA 무역통계 바로가기 ↗";
        } else {
            sourceLinkEl.href = "https://www.census.gov/foreign-trade/index.html";
            sourceLinkEl.textContent = "Census Bureau 바로가기 ↗";
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
        if (activeRegion === "KR" || !data.balanceVal.includes("적자")) {
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
            
            // Generate sub-items HTML if available
            let subItemsHtml = "";
            if (item.subItems && item.subItems.length > 0) {
                subItemsHtml = `
                    <div class="export-subitems-container">
                        <div class="export-subitems-list">
                `;
                item.subItems.forEach(sub => {
                    const yoyClass = sub.yoy.startsWith("-") ? "down" : "up";
                    const momClass = sub.mom.startsWith("-") ? "down" : "up";
                    const yoyIcon = sub.yoy.startsWith("-") ? "▼" : "▲";
                    const momIcon = sub.mom.startsWith("-") ? "▼" : "▲";
                    
                    subItemsHtml += `
                        <div class="export-subitem-row">
                            <span class="export-subitem-name">• ${sub.name}</span>
                            <div class="export-subitem-changes">
                                <span class="sub-badge ${yoyClass}" title="전년동기대비 (YoY)">YoY ${yoyIcon} ${sub.yoy.replace("-", "")}</span>
                                <span class="sub-badge ${momClass}" title="전월대비 (MoM)">MoM ${momIcon} ${sub.mom.replace("-", "")}</span>
                            </div>
                        </div>
                    `;
                });
                subItemsHtml += `
                        </div>
                    </div>
                `;
            }
            
            itemRow.innerHTML = `
                <div class="export-item-header-row">
                    <div class="export-item-info" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <span class="export-item-name" style="font-size: 0.85rem; font-weight: 700; color: var(--text-color);">${item.name}</span>
                        <span class="export-item-values" style="display: flex; gap: 0.75rem; align-items: center; font-size: 0.75rem;">
                            <span class="export-item-pct" style="color: var(--text-muted);">비중: ${item.pct}%</span>
                            <span class="export-item-change" style="color: ${changeColor}; font-weight: 700;">${item.change}</span>
                        </span>
                    </div>
                    <div class="export-item-track" style="width: 100%; height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden; margin-top: 0.4rem; position: relative;">
                        <div class="export-item-bar ${item.barClass}" style="width: ${item.pct * 2.5}%; height: 100%; border-radius: 3px;"></div>
                    </div>
                    <div class="export-item-click-tip">
                        <span>💡 클릭 시 세부품목별 YoY/MoM 변화율 펼치기 ▽</span>
                    </div>
                </div>
                ${subItemsHtml}
            `;
            
            // Toggle accordion on click
            itemRow.addEventListener("click", (e) => {
                // Avoid triggering when clicking links or badges inside subitems
                if (e.target.closest(".export-subitems-container")) return;
                
                const isExpanded = itemRow.classList.contains("expanded");
                
                // Collapse all others first for clean accordion UI
                document.querySelectorAll(".export-item-row").forEach(row => {
                    row.classList.remove("expanded");
                    const tip = row.querySelector(".export-item-click-tip span");
                    if (tip) tip.textContent = "💡 클릭 시 세부품목별 YoY/MoM 변화율 펼치기 ▽";
                });
                
                if (!isExpanded) {
                    itemRow.classList.add("expanded");
                    const tip = itemRow.querySelector(".export-item-click-tip span");
                    if (tip) tip.textContent = "💡 클릭 시 세부품목별 YoY/MoM 변화율 접기 △";
                }
            });
            
            itemsList.appendChild(itemRow);
        });
    }
}


    const baselinePrices = {
        "US": {
            "NVDA": { name: "NVIDIA Corp.", ticker: "NVDA", base: 208.76, format: (p) => `$${p.toFixed(2)}` },
            "AAPL": { name: "Apple Inc.", ticker: "AAPL", base: 321.66, format: (p) => `$${p.toFixed(2)}` },
            "MSFT": { name: "Microsoft Corp.", ticker: "MSFT", base: 381.58, format: (p) => `$${p.toFixed(2)}` },
            "AMZN": { name: "Amazon.com Inc.", ticker: "AMZN", base: 233.66, format: (p) => `$${p.toFixed(2)}` },
            "TSLA": { name: "Tesla Inc.", ticker: "TSLA", base: 319.69, format: (p) => `$${p.toFixed(2)}` },
            "COST": { name: "Costco Wholesale", ticker: "COST", base: 926.06, format: (p) => `$${p.toFixed(2)}` },
            "KO": { name: "Coca-Cola Co.", ticker: "KO", base: 81.17, format: (p) => `$${p.toFixed(2)}` },
            "PG": { name: "Procter & Gamble Co.", ticker: "PG", base: 146.97, format: (p) => `$${p.toFixed(2)}` },
            "MCD": { name: "McDonald's Corp.", ticker: "MCD", base: 262.80, format: (p) => `$${p.toFixed(2)}` },
            "WBA": { name: "Walgreens Boots Alliance", ticker: "WBA", base: 15.40, format: (p) => `$${p.toFixed(2)}` },
            "PARA": { name: "Paramount Global", ticker: "PARA", base: 11.20, format: (p) => `$${p.toFixed(2)}` },
            "INTC": { name: "Intel Corp.", ticker: "INTC", base: 100.23, format: (p) => `$${p.toFixed(2)}` },
            "LMT": { name: "Lockheed Martin Corp.", ticker: "LMT", base: 568.59, format: (p) => `$${p.toFixed(2)}` },
            "GLD": { name: "SPDR Gold Shares", ticker: "GLD", base: 371.52, format: (p) => `$${p.toFixed(2)}` },
            "WMT": { name: "Walmart Inc.", ticker: "WMT", base: 108.40, format: (p) => `$${p.toFixed(2)}` },
            "JPM": { name: "JPMorgan Chase & Co.", ticker: "JPM", base: 349.90, format: (p) => `$${p.toFixed(2)}` },
            "CAT": { name: "Caterpillar Inc.", ticker: "CAT", base: 894.54, format: (p) => `$${p.toFixed(2)}` },
            "XOM": { name: "Exxon Mobil Corp.", ticker: "XOM", base: 156.89, format: (p) => `$${p.toFixed(2)}` },
            "GE": { name: "General Electric Co.", ticker: "GE", base: 349.00, format: (p) => `$${p.toFixed(2)}` },
            "PYPL": { name: "PayPal Holdings Inc.", ticker: "PYPL", base: 56.00, format: (p) => `$${p.toFixed(2)}` },
            "BA": { name: "Boeing Co.", ticker: "BA", base: 209.23, format: (p) => `$${p.toFixed(2)}` },
            "PFE": { name: "Pfizer Inc.", ticker: "PFE", base: 25.01, format: (p) => `$${p.toFixed(2)}` },
            "SQQQ": { name: "ProShares UltraPro Short QQQ", ticker: "SQQQ", base: 43.27, format: (p) => `$${p.toFixed(2)}` },
            "VIX": { name: "iPath Volatility VIX ETN", ticker: "VIX", base: 18.82, format: (p) => `$${p.toFixed(2)}` },
            "XLU": { name: "Utilities Select Sector SPDR", ticker: "XLU", base: 46.19, format: (p) => `$${p.toFixed(2)}` },
            "AMD": { name: "Advanced Micro Devices", ticker: "AMD", base: 539.69, format: (p) => `$${p.toFixed(2)}` },
            "SMCI": { name: "Super Micro Computer", ticker: "SMCI", base: 31.20, format: (p) => `$${p.toFixed(2)}` },
            "TLT": { name: "iShares 20+ Yr Treasury Bond", ticker: "TLT", base: 83.17, format: (p) => `$${p.toFixed(2)}` },
            "BAC": { name: "Bank of America Corp.", ticker: "BAC", base: 61.28, format: (p) => `$${p.toFixed(2)}` },
            "FCX": { name: "Freeport-McMoRan Inc.", ticker: "FCX", base: 63.50, format: (p) => `$${p.toFixed(2)}` }
        },
        "KR": {
            "SK하이닉스": { name: "SK하이닉스", ticker: "000660", base: 1759000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "한미반도체": { name: "한미반도체", ticker: "042700", base: 309500, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "현대차": { name: "현대자동차", ticker: "005380", base: 680000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "기아": { name: "기아", ticker: "000270", base: 167800, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "삼성전자": { name: "삼성전자", ticker: "005930", base: 299500, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "LG화학": { name: "LG화학", ticker: "051910", base: 385000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "카카오페이": { name: "카카오페이", ticker: "377300", base: 28400, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "롯데케미칼": { name: "롯데케미칼", ticker: "011170", base: 115000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "삼성바이오로직스": { name: "삼성바이오로직스", ticker: "207940", base: 845000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "셀트리온": { name: "셀트리온", ticker: "068270", base: 185200, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "메리츠금융지주": { name: "메리츠금융지주", ticker: "138040", base: 82400, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "KT&G": { name: "KT&G", ticker: "033780", base: 95400, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "대한항공": { name: "대한항공", ticker: "003490", base: 20100, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "한국전력": { name: "한국전력공사", ticker: "015760", base: 22400, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "KODEX인버스": { name: "KODEX 200선물인버스2X", ticker: "252670", base: 2850, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "신한지주": { name: "신한지주", ticker: "055550", base: 48500, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "LG에너지솔루션": { name: "LG에너지솔루션", ticker: "373220", base: 320000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "카카오": { name: "카카오", ticker: "035720", base: 38500, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "KB금융": { name: "KB금융지주", ticker: "105560", base: 76500, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "POSCO홀딩스": { name: "POSCO홀딩스", ticker: "005490", base: 395000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "삼성물산": { name: "삼성물산", ticker: "028260", base: 158000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "두산에너빌리티": { name: "두산에너빌리티", ticker: "034020", base: 19850, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "넷마블": { name: "넷마블", ticker: "251270", base: 52400, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "에스엠": { name: "에스엠", ticker: "041510", base: 72400, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "현대제철": { name: "현대제철", ticker: "004020", base: 25000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "KODEX국고채": { name: "KODEX 국고채3년", ticker: "114260", base: 52400, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "KT": { name: "KT", ticker: "030200", base: 38500, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "KODEX레버리지": { name: "KODEX 레버리지", ticker: "122630", base: 16800, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "한화에어로스페이스": { name: "한화에어로스페이스", ticker: "012450", base: 320000, format: (p) => `${Math.round(p).toLocaleString()}원` },
            "알테오젠": { name: "알테오젠", ticker: "196170", base: 285000, format: (p) => `${Math.round(p).toLocaleString()}원` }
        }
    };


const fiveYearMilestones = {
        "US": {
            cli: [101.5, 102.5, 98.8, 99.8, 100.2, 100.2, 105.0],
            pmi: [60.0, 62.1, 47.2, 49.5, 51.5, 51.5, 63.5],
            gdp: [5.0, 5.7, 2.5, 2.4, 2.2, 2.2, 5.8],
            eps: [20.0, 29.5, 2.0, 7.5, 10.5, 10.5, 148.5],
            m2: [15.0, 18.5, -1.0, 3.8, 4.5, 4.5, 23.7],
            cpi: [2.5, 6.8, 4.1, 2.8, 2.3, 2.3, -1.3],
            rate: [0.25, 0.25, 5.25, 5.0, 4.0, 4.0, -5.0],
            spread: [1.5, 1.2, -0.8, -0.2, 0.2, 0.2, 2.6],
              citi: [50.0, -10.0, 15.0, -5.0, 20.0, 25.0, 29.2],
              gdpnow: [6.5, 2.1, 1.8, 2.5, 3.2, 2.8, 3.1]
        },
        "KR": {
            cli: [100.5, 102.2, 98.2, 99.8, 100.5, 100.5, 101.7],
            pmi: [54.0, 57.5, 46.0, 50.5, 52.0, 52.0, 58.0],
            gdp: [2.0, 3.7, 1.5, 2.2, 2.5, 2.5, 2.5],
            eps: [12.0, 26.0, -18.0, 8.0, 200.0, 200.0, 440.0],
            m2: [8.0, 9.8, 5.4, 6.0, 6.0, 6.0, 7.2],
            cpi: [1.5, 4.0, 5.1, 2.8, 2.1, 2.1, 0.9],
            rate: [0.5, 0.75, 3.25, 3.50, 3.25, 3.25, 3.25],
            spread: [1.1, 1.0, -0.5, 0.0, 0.4, 0.4, 0.4],
              citi: [45.0, -15.0, 10.0, -2.0, 15.0, 20.0, 25.4],
              gdpnow: [4.0, 2.5, 1.4, 2.1, 2.4, 2.2, 2.3]
        }
    };

// 1. DUAL-MARKET REGIONAL HISTORICAL PRESETS (US vs KR) WITH M2
// 1B. DUAL-MARKET REGIONAL EXPORT DATA FROM KITA & CENSUS BUREAU
// 2. STATE VARIABLES
let activeRegion = "US"; // "US" or "KR"
let activeMode = "sim"; // "sim" or "hist" or "time"
let activePreset = "2026_current";
let activeTimeIndex = 62; // month index from 0 (May 2021) to 62 (July 2026)
const timeMachineMonths = [];
const startYear = 2021;
const startMonth = 5; // May
for (let i = 0; i <= 62; i++) {
    let curMonth = startMonth + i;
    let curYear = startYear + Math.floor((curMonth - 1) / 12);
    curMonth = ((curMonth - 1) % 12) + 1;
    timeMachineMonths.push({
        index: i,
        year: curYear,
        month: curMonth,
        label: `${curYear}년 ${curMonth}월`,
        value: `${curYear}-${curMonth.toString().padStart(2, '0')}`
    });
}
let cycleClockChartInstance = null;
let portfolioChartInstance = null;

// 3. CORE ANALYTICAL MATHEMATICAL MODELS

// Helper to interpolate indicator values for a specific month index (0 to 60)
function getIndicatorsForMonth(region, monthIndex) {
    const ms = fiveYearMilestones[region];
    const indicators = {};
    const keys = ["cli", "pmi", "gdp", "eps", "m2", "cpi", "rate", "spread", "citi", "gdpnow"];
    
    const intervalIndex = Math.min(5, Math.floor(monthIndex / 12));
    const fraction = (monthIndex % 12) / 12.0;

    keys.forEach(k => {
        const valStart = ms[k][intervalIndex];
        const valEnd = ms[k][intervalIndex + 1];
        let val = valStart + (valEnd - valStart) * fraction;

        // Deterministic macro wobble using Math.sin with phase offsets
        let noiseScale = 0.05;
        if (k === "pmi") noiseScale = 0.35;
        else if (k === "gdp" || k === "cpi" || k === "rate" || k === "spread") noiseScale = 0.08;
        else if (k === "eps") noiseScale = 0.8;
        else if (k === "m2") noiseScale = 0.2;
        else if (k === "citi") noiseScale = 2.5;
        else if (k === "gdpnow") noiseScale = 0.15;

        if (monthIndex !== 0 && monthIndex !== 61 && monthIndex % 12 !== 0) {
            val += Math.sin(monthIndex * 1.5 + (k.charCodeAt(0) % 5)) * 0.5 * noiseScale;
        }

        // Clip rates and spreads to realistic values
        if (k === "rate") val = Math.max(0.0, val);
        
        indicators[k] = parseFloat(val.toFixed(2));
    });
    return indicators;
}

// Convert Year-Month string (e.g., '2026-05') to timeline index (0 to 60)
function getMonthIndex(yearMonthStr) {
    const parts = yearMonthStr.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    return (year - 2021) * 12 + (month - 5);
}

// Update MoM Transition Panel in the DOM
function updateTransitionPanel(prevMacro, currMacro, prevSeason, currSeason, prevIndex) {
    let prevDateLabel = "직전 상태";
    if (activeMode === "time") {
        prevDateLabel = timeMachineMonths[prevIndex].label;
    } else if (activeMode === "sim") {
        const monthSelectEl = document.getElementById("export-month-select");
        const selectVal = monthSelectEl ? monthSelectEl.value : "2026-07";
        const idx = getMonthIndex(selectVal);
        const prevIdx = Math.max(0, idx - 1);
        if (prevIdx >= 0 && prevIdx < timeMachineMonths.length) {
            prevDateLabel = `직전월 (${timeMachineMonths[prevIdx].label})`;
        }
    } else if (activeMode === "hist") {
        prevDateLabel = "에포크 진입기 (초기)";
    }
    
    let currDateLabel = "현재 설정";
    if (activeMode === "time") {
        currDateLabel = timeMachineMonths[activeTimeIndex].label;
    } else if (activeMode === "sim") {
        currDateLabel = "시뮬레이션 설정";
    } else if (activeMode === "hist") {
        const presetData = historicalPresets[activeRegion][activePreset];
        currDateLabel = presetData ? presetData.title.split(" (")[0] : "역사적 국면";
    }
    
    const transitionDateLabelEl = document.getElementById("transition-date-label");
    if (transitionDateLabelEl) {
        transitionDateLabelEl.textContent = `${prevDateLabel} ➔ ${currDateLabel} 기준`;
    }
    
    // Update Macro Badges
    const transMacroPrev = document.getElementById("trans-macro-prev");
    const transMacroCurr = document.getElementById("trans-macro-curr");
    
    if (transMacroPrev && transMacroCurr) {
        transMacroPrev.className = `cycle-badge-mini ${prevMacro.phase}`;
        transMacroPrev.textContent = prevMacro.phaseKor.split(" (")[0];
        
        transMacroCurr.className = `cycle-badge-mini active ${currMacro.phase}`;
        transMacroCurr.textContent = currMacro.phaseKor.split(" (")[0];
    }
    
    // Update Season Badges
    const transSeasonPrev = document.getElementById("trans-season-prev");
    const transSeasonCurr = document.getElementById("trans-season-curr");
    
    if (transSeasonPrev && transSeasonCurr) {
        transSeasonPrev.className = `season-badge-mini ${prevSeason.season}`;
        transSeasonPrev.textContent = prevSeason.seasonKor.split(" (")[0];
        
        transSeasonCurr.className = `season-badge-mini active ${currSeason.season}`;
        transSeasonCurr.textContent = currSeason.seasonKor.split(" (")[0];
    }
}

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

// 3B-2. Calculate Secondary Indicators (Valuation, 52W Range, Technicals, Funds Flow)
function calculateSecondaryIndicators(macro, season, activeRegion, rate, eps, m2) {
    // macro is { x: growthScore, y: momentumScore, phase: phase, phaseKor: phaseKor }
    // season is stock season object returned by calculateStockSeasonMetrics: { season: 'summer', seasonKor: '...', angle: ..., sectors: ... }
    const x = macro.x; // -4.5 to 4.5
    const y = macro.y; // -4.5 to 4.5
    const seasonType = season.season; // 'spring', 'summer', 'autumn', 'winter'

    // Real-market baseline stock prices database for May 28, 2026!
    // Calculate dynamic scaled price based on current cycle coordinates
    // scale factor is around 0.85 to 1.15 based on coordinates x/y
    const stockScale = 1.0 + (x * 0.035) + (y * 0.015);
    const stockDefScale = 1.0 - (x * 0.02) - (y * 0.008);

    function getDynamicPrice(key, isDefensive = false) {
        const item = baselinePrices[activeRegion][key];
        if (!item) return "";
        const s = isDefensive ? stockDefScale : stockScale;
        const currentPrice = item.base * s;
        return item.format(currentPrice);
    }

    let per, pbr, dy;
    let perGrade, pbrGrade, dyGrade;
    let indexLow, indexHigh, indexVal;
    let indexMdd, indexRun, indexPos;
    let indexBadge;
    let maAlign, rsi, macd, macdGrade;
    let foreignFlow, instFlow, retailWeight;

    // A. Valuation Multiples & Grades
    if (activeRegion === "US") {
        // PER baseline 18.5x, range 13.5x to 24.5x
        per = 18.5 + 0.8 * x + 0.5 * y + (eps - 5.0) * 0.1;
        per = Math.max(13.5, Math.min(24.5, per));
        
        if (per > 20.5) {
            perGrade = "고평가";
        } else if (per < 16.5) {
            perGrade = "저평가";
        } else {
            perGrade = "적정";
        }

        // PBR baseline 3.75x, range 3.0x to 4.5x
        pbr = 3.75 + 0.12 * x + 0.05 * y;
        pbr = Math.max(3.0, Math.min(4.5, pbr));

        if (pbr > 4.15) {
            pbrGrade = "고평가";
        } else if (pbr < 3.35) {
            pbrGrade = "저평가";
        } else {
            pbrGrade = "적정";
        }

        // DY baseline 1.8%, range 1.2% to 2.4%
        dy = 1.8 - 0.1 * x - 0.05 * y + (rate - 3.5) * 0.08;
        dy = Math.max(1.2, Math.min(2.4, dy));

        if (dy > 2.1) {
            dyGrade = "배당 매리트";
        } else if (dy < 1.4) {
            dyGrade = "낮은 매리트";
        } else {
            dyGrade = "안정";
        }

        // 52W range: S&P 500
        indexLow = 3800;
        indexHigh = 5600;
        // Position on 52W scale (0% to 100%)
        indexPos = 50 + (x * 8.5) + (y * 4.5);
        indexPos = Math.max(2, Math.min(98, indexPos));
        
        indexVal = indexLow + (indexHigh - indexLow) * (indexPos / 100);
        
        // MDD & Run-up
        indexMdd = ((indexVal - indexHigh) / indexHigh) * 100;
        indexRun = ((indexVal - indexLow) / indexLow) * 100;

    } else {
        // KR KOSPI
        // PER baseline 10.5x, range 7.8x to 13.5x
        per = 10.5 + 0.45 * x + 0.25 * y + (eps - 3.0) * 0.05;
        per = Math.max(7.8, Math.min(13.5, per));

        if (per > 12.0) {
            perGrade = "고평가";
        } else if (per < 9.0) {
            perGrade = "저평가";
        } else {
            perGrade = "적정";
        }

        // PBR baseline 0.95x, range 0.8x to 1.15x
        pbr = 0.95 + 0.035 * x + 0.015 * y;
        pbr = Math.max(0.8, Math.min(1.15, pbr));

        if (pbr > 1.05) {
            pbrGrade = "고평가";
        } else if (pbr < 0.88) {
            pbrGrade = "저평가";
        } else {
            pbrGrade = "적정";
        }

        // DY baseline 2.4%, range 1.6% to 3.5%
        dy = 2.4 - 0.15 * x - 0.08 * y + (rate - 3.0) * 0.12;
        dy = Math.max(1.6, Math.min(3.5, dy));

        if (dy > 2.8) {
            dyGrade = "배당 매리트";
        } else if (dy < 1.9) {
            dyGrade = "낮은 매리트";
        } else {
            dyGrade = "안정";
        }

        // 52W range: KOSPI
        indexLow = 2200;
        indexHigh = 3100;
        indexPos = 50 + (x * 8.5) + (y * 4.5);
        indexPos = Math.max(2, Math.min(98, indexPos));
        
        indexVal = indexLow + (indexHigh - indexLow) * (indexPos / 100);

        // MDD & Run-up
        indexMdd = ((indexVal - indexHigh) / indexHigh) * 100;
        indexRun = ((indexVal - indexLow) / indexLow) * 100;
    }

    // 52W Badge
    if (indexPos >= 90) {
        indexBadge = "신고가 경신 중!";
    } else if (indexPos <= 15) {
        indexBadge = "신저가 붕괴 위험!";
    } else {
        indexBadge = "정상 궤도";
    }

    // B. Technical Indicators
    // MA Alignment based on Uragami Season
    if (seasonType === "summer") {
        maAlign = "강력 정배열 (Bullish)";
    } else if (seasonType === "autumn") {
        maAlign = "정배열 붕괴 / 혼조세";
    } else if (seasonType === "winter") {
        maAlign = "강력 역배열 (Bearish)";
    } else {
        maAlign = "골든크로스 발생 (Transition)";
    }

    // RSI 14
    rsi = 50 + 4.5 * x + 2.5 * y;
    rsi = Math.max(18, Math.min(88, rsi));
    let rsiGrade = "";
    if (rsi >= 70) {
        rsiGrade = "과매수 (Overbought)";
    } else if (rsi <= 30) {
        rsiGrade = "과매도 (Oversold)";
    } else {
        rsiGrade = "중립";
    }

    // MACD
    if (y >= 1.5) {
        macd = "강력 매수 신호 (Strong Buy)";
        macdGrade = "Bullish Divergence";
    } else if (y >= 0.5) {
        macd = "매수 시그널 (Buy Signal)";
        macdGrade = "Bullish";
    } else if (y >= -0.5) {
        macd = "시그널 교차 / 관망";
        macdGrade = "Neutral";
    } else if (y >= -1.5) {
        macd = "매도 시그널 (Sell Signal)";
        macdGrade = "Bearish";
    } else {
        macd = "강력 매도 신호 (Strong Sell)";
        macdGrade = "Bearish Divergence";
    }

    // C. Supply & Demand (Flow of Funds)
    if (activeRegion === "US") {
        // Foreign Capital Inflow (Billion USD)
        const netFor = 3.5 * (x + y) + 1.5; // range: -23.7B to +33.0B
        foreignFlow = {
            value: netFor,
            text: netFor >= 0 ? `+$${netFor.toFixed(1)}B 순매입` : `-$${Math.abs(netFor).toFixed(1)}B 순매도`,
            percentage: Math.max(5, Math.min(95, 50 + (netFor / 35) * 45)),
            positive: netFor >= 0
        };

        // Institutional Net Inflow (Billion USD)
        const netInst = 2.8 * (x + y) - 0.8;
        instFlow = {
            value: netInst,
            text: netInst >= 0 ? `+$${netInst.toFixed(1)}B 순매입` : `-$${Math.abs(netInst).toFixed(1)}B 순매도`,
            percentage: Math.max(5, Math.min(95, 50 + (netInst / 30) * 45)),
            positive: netInst >= 0
        };

        // Retail Trading Weight (Percentage)
        const retWeight = 42 + 2.5 * x + 1.5 * y;
        retailWeight = {
            value: retWeight,
            text: `전체 거래의 ${retWeight.toFixed(0)}%`,
            percentage: Math.max(10, Math.min(90, retWeight))
        };
    } else {
        // KR KOSPI (100 Million KRW - 억 원)
        const netFor = 2200 * (x + 0.4 * y) + 300; // range: -12900 억 to +14100 억
        foreignFlow = {
            value: netFor,
            text: netFor >= 0 ? `+${netFor.toFixed(0)} 억 순매수` : `-${Math.abs(netFor).toFixed(0)} 억 순매도`,
            percentage: Math.max(5, Math.min(95, 50 + (netFor / 15000) * 45)),
            positive: netFor >= 0
        };

        const netInst = 1400 * (0.4 * x + y) - 100;
        instFlow = {
            value: netInst,
            text: netInst >= 0 ? `+${netInst.toFixed(0)} 억 순매수` : `-${Math.abs(netInst).toFixed(0)} 억 순매도`,
            percentage: Math.max(5, Math.min(95, 50 + (netInst / 12000) * 45)),
            positive: netInst >= 0
        };

        const retWeight = 58 + 3.5 * x + 2.0 * y;
        retailWeight = {
            value: retWeight,
            text: `전체 거래의 ${retWeight.toFixed(0)}%`,
            percentage: Math.max(10, Math.min(90, retWeight))
        };
    }

    // D. Dynamic Stocks Lists (52W High, 52W Low, Volume Spikes)
    let highStocks = [];
    let lowStocks = [];
    let volumeStocks = [];

    if (activeRegion === "US") {
        if (seasonType === "summer") {
            highStocks = [
                { name: "NVIDIA Corp.", ticker: "NVDA", price: getDynamicPrice("NVDA"), change: "▲ +4.8%", isUp: true },
                { name: "Microsoft Corp.", ticker: "MSFT", price: getDynamicPrice("MSFT"), change: "▲ +1.9%", isUp: true },
                { name: "Apple Inc.", ticker: "AAPL", price: getDynamicPrice("AAPL"), change: "▲ +1.2%", isUp: true },
                { name: "Amazon.com Inc.", ticker: "AMZN", price: getDynamicPrice("AMZN"), change: "▲ +2.1%", isUp: true }
            ];
            lowStocks = [
                { name: "Walgreens Boots Alliance", ticker: "WBA", price: getDynamicPrice("WBA"), change: "▼ -1.8%", isUp: false },
                { name: "Paramount Global", ticker: "PARA", price: getDynamicPrice("PARA"), change: "▼ -2.5%", isUp: false },
                { name: "Intel Corp.", ticker: "INTC", price: getDynamicPrice("INTC"), change: "▼ -0.5%", isUp: false }
            ];
            volumeStocks = [
                { name: "Tesla Inc.", ticker: "TSLA", price: "4.2배 급증", changeText: "평균 대비 420%" },
                { name: "Super Micro Computer", ticker: "SMCI", price: "3.5배 급증", changeText: "평균 대비 350%" },
                { name: "Advanced Micro Devices", ticker: "AMD", price: "2.8배 급증", changeText: "평균 대비 280%" }
            ];
        } else if (seasonType === "autumn") {
            highStocks = [
                { name: "Costco Wholesale", ticker: "COST", price: getDynamicPrice("COST"), change: "▲ +1.4%", isUp: true },
                { name: "Coca-Cola Co.", ticker: "KO", price: getDynamicPrice("KO"), change: "▲ +0.8%", isUp: true },
                { name: "Procter & Gamble Co.", ticker: "PG", price: getDynamicPrice("PG"), change: "▲ +0.5%", isUp: true },
                { name: "McDonald's Corp.", ticker: "MCD", price: getDynamicPrice("MCD"), change: "▲ +1.1%", isUp: true }
            ];
            lowStocks = [
                { name: "NVIDIA Corp.", ticker: "NVDA", price: getDynamicPrice("NVDA"), change: "▼ -4.2%", isUp: false },
                { name: "Super Micro Computer", ticker: "SMCI", price: getDynamicPrice("SMCI"), change: "▼ -6.5%", isUp: false },
                { name: "Advanced Micro Devices", ticker: "AMD", price: getDynamicPrice("AMD"), change: "▼ -3.8%", isUp: false }
            ];
            volumeStocks = [
                { name: "SPDR Gold Shares", ticker: "GLD", price: "3.1배 급증", changeText: "평균 대비 310%" },
                { name: "iShares 20+ Yr Treasury Bond", ticker: "TLT", price: "2.9배 급증", changeText: "평균 대비 290%" },
                { name: "Walmart Inc.", ticker: "WMT", price: getDynamicPrice("WMT"), change: "2.2배 급증", changeText: "평균 대비 220%" }
            ];
        } else if (seasonType === "winter") {
            highStocks = [
                { name: "Lockheed Martin Corp.", ticker: "LMT", price: getDynamicPrice("LMT", true), change: "▲ +2.1%", isUp: true },
                { name: "SPDR Gold Shares", ticker: "GLD", price: getDynamicPrice("GLD", true), change: "▲ +1.5%", isUp: true },
                { name: "Procter & Gamble Co.", ticker: "PG", price: getDynamicPrice("PG", true), change: "▲ +0.9%", isUp: true },
                { name: "Walmart Inc.", ticker: "WMT", price: getDynamicPrice("WMT", true), change: "▲ +1.2%", isUp: true }
            ];
            lowStocks = [
                { name: "Tesla Inc.", ticker: "TSLA", price: getDynamicPrice("TSLA"), change: "▼ -5.8%", isUp: false },
                { name: "NVIDIA Corp.", ticker: "NVDA", price: getDynamicPrice("NVDA"), change: "▼ -7.4%", isUp: false },
                { name: "Intel Corp.", ticker: "INTC", price: getDynamicPrice("INTC"), change: "▼ -4.1%", isUp: false },
                { name: "Apple Inc.", ticker: "AAPL", price: getDynamicPrice("AAPL"), change: "▼ -2.8%", isUp: false }
            ];
            volumeStocks = [
                { name: "ProShares UltraPro Short QQQ", ticker: "SQQQ", price: "5.8배 폭증", changeText: "평균 대비 580%" },
                { name: "iPath Volatility VIX ETN", ticker: "VIX", price: "4.6배 급증", changeText: "평균 대비 460%" },
                { name: "Utilities Select Sector SPDR", ticker: "XLU", price: "2.5배 급증", changeText: "평균 대비 250%" }
            ];
        } else {
            highStocks = [
                { name: "JPMorgan Chase & Co.", ticker: "JPM", price: getDynamicPrice("JPM"), change: "▲ +2.8%", isUp: true },
                { name: "Caterpillar Inc.", ticker: "CAT", price: getDynamicPrice("CAT"), change: "▲ +3.1%", isUp: true },
                { name: "Exxon Mobil Corp.", ticker: "XOM", price: getDynamicPrice("XOM"), change: "▲ +1.8%", isUp: true },
                { name: "General Electric Co.", ticker: "GE", price: getDynamicPrice("GE"), change: "▲ +2.4%", isUp: true }
            ];
            lowStocks = [
                { name: "PayPal Holdings Inc.", ticker: "PYPL", price: getDynamicPrice("PYPL"), change: "▼ -1.5%", isUp: false },
                { name: "Boeing Co.", ticker: "BA", price: getDynamicPrice("BA"), change: "▼ -2.1%", isUp: false },
                { name: "Pfizer Inc.", ticker: "PFE", price: getDynamicPrice("PFE"), change: "▼ -0.8%", isUp: false }
            ];
            volumeStocks = [
                { name: "Bank of America Corp.", ticker: "BAC", price: "3.2배 급증", changeText: "평균 대비 320%" },
                { name: "Freeport-McMoRan Inc.", ticker: "FCX", price: "3.0배 급증", changeText: "평균 대비 300%" },
                { name: "JPMorgan Chase & Co.", ticker: "JPM", price: "2.4배 급증", changeText: "평균 대비 240%" }
            ];
        }
    } else {
        if (seasonType === "summer") {
            highStocks = [
                { name: "SK하이닉스", ticker: "000660", price: getDynamicPrice("SK하이닉스"), change: "▲ +5.2%", isUp: true },
                { name: "한미반도체", ticker: "042700", price: getDynamicPrice("한미반도체"), change: "▲ +6.8%", isUp: true },
                { name: "현대자동차", ticker: "005380", price: getDynamicPrice("현대차"), change: "▲ +2.3%", isUp: true },
                { name: "기아", ticker: "000270", price: getDynamicPrice("기아"), change: "▲ +1.9%", isUp: true }
            ];
            lowStocks = [
                { name: "LG화학", ticker: "051910", price: getDynamicPrice("LG화학"), change: "▼ -1.5%", isUp: false },
                { name: "카카오페이", ticker: "377300", price: getDynamicPrice("카카오페이"), change: "▼ -2.8%", isUp: false },
                { name: "롯데케미칼", ticker: "011170", price: getDynamicPrice("롯데케미칼"), change: "▼ -1.2%", isUp: false }
            ];
            volumeStocks = [
                { name: "한화에어로스페이스", ticker: "012450", price: "3.8배 급증", changeText: "평균 대비 380%" },
                { name: "SK하이닉스", ticker: "000660", price: "3.2배 급증", changeText: "평균 대비 320%" },
                { name: "알테오젠", ticker: "196170", price: "2.9배 급증", changeText: "평균 대비 290%" }
            ];
        } else if (seasonType === "autumn") {
            highStocks = [
                { name: "삼성바이오로직스", ticker: "207940", price: getDynamicPrice("삼성바이오로직스"), change: "▲ +1.2%", isUp: true },
                { name: "셀트리온", ticker: "068270", price: getDynamicPrice("셀트리온"), change: "▲ +0.8%", isUp: true },
                { name: "메리츠금융지주", ticker: "138040", price: getDynamicPrice("메리츠금융지주"), change: "▲ +2.1%", isUp: true },
                { name: "KT&G", ticker: "033780", price: getDynamicPrice("KT&G"), change: "▲ +0.5%", isUp: true }
            ];
            lowStocks = [
                { name: "SK하이닉스", ticker: "000660", price: getDynamicPrice("SK하이닉스"), change: "▼ -3.8%", isUp: false },
                { name: "LG화학", ticker: "051910", price: getDynamicPrice("LG화학"), change: "▼ -2.4%", isUp: false },
                { name: "대한항공", ticker: "003490", price: getDynamicPrice("대한항공"), change: "▼ -1.8%", isUp: false }
            ];
            volumeStocks = [
                { name: "KODEX 국고채3년", ticker: "114260", price: "2.8배 급증", changeText: "평균 대비 280%" },
                { name: "삼성바이오로직스", ticker: "207940", price: "2.4배 급증", changeText: "평균 대비 240%" },
                { name: "KT", ticker: "030200", price: "2.1배 급증", changeText: "평균 대비 210%" }
            ];
        } else if (seasonType === "winter") {
            highStocks = [
                { name: "한국전력공사", ticker: "015760", price: getDynamicPrice("한국전력", true), change: "▲ +1.8%", isUp: true },
                { name: "KT&G", ticker: "033780", price: getDynamicPrice("KT&G", true), change: "▲ +1.2%", isUp: true },
                { name: "KODEX 200선물인버스2X", ticker: "252670", price: getDynamicPrice("KODEX인버스", true), change: "▲ +4.5%", isUp: true },
                { name: "신한지주", ticker: "055550", price: getDynamicPrice("신한지주", true), change: "▲ +0.9%", isUp: true }
            ];
            lowStocks = [
                { name: "삼성전자", ticker: "005930", price: getDynamicPrice("삼성전자"), change: "▼ -3.4%", isUp: false },
                { name: "SK하이닉스", ticker: "000660", price: getDynamicPrice("SK하이닉스"), change: "▼ -6.2%", isUp: false },
                { name: "LG에너지솔루션", ticker: "373220", price: getDynamicPrice("LG에너지솔루션"), change: "▼ -4.5%", isUp: false },
                { name: "카카오", ticker: "035720", price: getDynamicPrice("카카오"), change: "▼ -2.9%", isUp: false }
            ];
            volumeStocks = [
                { name: "KODEX 200선물인버스2X", ticker: "252670", price: "6.2배 폭증", changeText: "평균 대비 620%" },
                { name: "KODEX 레버리지", ticker: "122630", price: "4.8배 폭증", changeText: "평균 대비 480%" },
                { name: "한국전력공사", ticker: "015760", price: "2.5배 급증", changeText: "평균 대비 250%" }
            ];
        } else {
            highStocks = [
                { name: "KB금융지주", ticker: "105560", price: getDynamicPrice("KB금융"), change: "▲ +3.2%", isUp: true },
                { name: "POSCO홀딩스", ticker: "005490", price: getDynamicPrice("POSCO홀딩스"), change: "▲ +2.8%", isUp: true },
                { name: "삼성물산", ticker: "028260", price: getDynamicPrice("삼성물산"), change: "▲ +1.9%", isUp: true },
                { name: "두산에너빌리티", ticker: "034020", price: getDynamicPrice("두산에너빌리티"), change: "▲ +2.4%", isUp: true }
            ];
            lowStocks = [
                { name: "넷마블", ticker: "251270", price: getDynamicPrice("넷마블"), change: "▼ -0.8%", isUp: false },
                { name: "카카오페이", ticker: "377300", price: getDynamicPrice("카카오페이"), change: "▼ -1.5%", isUp: false },
                { name: "에스엠", ticker: "041510", price: getDynamicPrice("에스엠"), change: "▼ -2.1%", isUp: false }
            ];
            volumeStocks = [
                { name: "삼성전자", ticker: "005930", price: "3.4배 급증", changeText: "평균 대비 340%" },
                { name: "KB금융지주", ticker: "105560", price: "3.1배 급증", changeText: "평균 대비 310%" },
                { name: "현대제철", ticker: "004020", price: "2.5배 급증", changeText: "평균 대비 250%" }
            ];
        }
    }

    // E. Dynamic Sector Period Returns (YTD, 1M, 3M)
    // Cohesively derived based on growth coordinates (x) and momentum coordinates (y)
    const sectorsDef = [
        {
            key: "spring",
            name: "소비재/금융주 (봄 업종)",
            color: "#3b82f6",
            base1: 1.8, base3: 5.2, baseYtd: 12.4,
            coefX: 0.6, coefY: 0.3
        },
        {
            key: "summer",
            name: "IT 기술주/경기민감주 (여름 업종)",
            color: "#10b981",
            base1: activeRegion === "US" ? 2.5 : 1.8,
            base3: activeRegion === "US" ? 7.2 : 5.0,
            baseYtd: activeRegion === "US" ? 19.8 : 12.5,
            coefX: activeRegion === "US" ? 1.5 : 1.2,
            coefY: activeRegion === "US" ? 0.8 : 0.6
        },
        {
            key: "autumn",
            name: "에너지/소재/가치주 (가을 업종)",
            color: "#f59e0b",
            base1: 1.5, base3: 4.5, baseYtd: 10.5,
            coefX: 0.4, coefY: 0.1
        },
        {
            key: "winter",
            name: "유틸리티/헬스케어/방어주 (겨울 업종)",
            color: "#ef4444",
            base1: 1.0, base3: 3.0, baseYtd: 8.5,
            coefX: -0.5, coefY: -0.2
        }
    ];

    const sectorReturns = sectorsDef.map(sec => {
        const r1 = sec.base1 + sec.coefX * x + sec.coefY * y;
        const r3 = sec.base3 + 3.0 * sec.coefX * x + 3.0 * sec.coefY * y;
        const rYtd = sec.baseYtd + 8.0 * sec.coefX * x + 8.0 * sec.coefY * y;

        return {
            name: sec.name,
            color: sec.color,
            m1: (r1 >= 0 ? "+" : "") + r1.toFixed(1) + "%",
            m3: (r3 >= 0 ? "+" : "") + r3.toFixed(1) + "%",
            ytd: (rYtd >= 0 ? "+" : "") + rYtd.toFixed(1) + "%",
            m1Pos: r1 >= 0,
            m3Pos: r3 >= 0,
            ytdPos: rYtd >= 0
        };
    });

    // ----------------------------------------------------
    // Dynamic Index and Company Market Cap & YTD returns
    // ----------------------------------------------------
    const ytdSp500 = 8.5 + 4.5 * x + 2.5 * y;
    const ytdKospi = 5.2 + 6.0 * x + 3.0 * y;
    const ytdKosdaq = 6.8 + 8.2 * x + 4.5 * y;

    const mcapSp500Total = 78.80 * (1 + ytdSp500 / 100);
    const mcapKospiTotal = 5472.03 * (1 + ytdKospi / 100);
    const mcapKosdaqTotal = 492.94 * (1 + ytdKosdaq / 100);

    // US S&P 500 Top 10 Companies
            const usTop10Defs = [
        { name: "NVIDIA Corp.", ticker: "NVDA", baseMcap: 5.06, betaX: 8.0, betaY: 6.0, baseOffset: 22.0, price: 201.07, fwdPE: 15.8, eps_trail: 6.53, eps_0q: 2.08, eps_1q: 2.35, eps_0y: 8.96, eps_1y: 12.73, ret_1d: -3.62, ret_1w: -5.34, ret_1m: -6.29, last_updated: "2026-06-24 00:16" },
        { name: "Apple Inc.", ticker: "AAPL", baseMcap: 4.72, betaX: 3.5, betaY: 1.8, baseOffset: 9.0, price: 299.09, fwdPE: 31.15, eps_trail: 8.26, eps_0q: 1.89, eps_1q: 2.01, eps_0y: 8.76, eps_1y: 9.67, ret_1d: 0.7, ret_1w: 0.9, ret_1m: -3.0, last_updated: "2026-06-24 00:16" },
        { name: "Alphabet Inc.", ticker: "GOOGL", baseMcap: 3.89, betaX: 3.8, betaY: 1.9, baseOffset: 8.0, price: 346.5, fwdPE: 23.81, eps_trail: 13.11, eps_0q: 2.87, eps_1q: 3.0, eps_0y: 14.22, eps_1y: 14.51, ret_1d: -0.89, ret_1w: -6.17, ret_1m: -10.83, last_updated: "2026-06-24 00:16" },
        { name: "Microsoft Corp.", ticker: "MSFT", baseMcap: 2.83, betaX: 4.0, betaY: 2.0, baseOffset: 10.0, price: 374.87, fwdPE: 19.38, eps_trail: 16.79, eps_0q: 4.24, eps_1q: 4.62, eps_0y: 16.84, eps_1y: 19.35, ret_1d: 2.05, ret_1w: -6.23, ret_1m: -9.89, last_updated: "2026-06-24 00:16" },
        { name: "Amazon.com Inc.", ticker: "AMZN", baseMcap: 2.51, betaX: 4.5, betaY: 2.2, baseOffset: 11.0, price: 234.39, fwdPE: 23.72, eps_trail: 7.36, eps_0q: 1.81, eps_1q: 1.91, eps_0y: 8.66, eps_1y: 9.88, ret_1d: 0.69, ret_1w: -4.73, ret_1m: -11.65, last_updated: "2026-06-24 00:16" },
        { name: "Broadcom Inc.", ticker: "AVGO", baseMcap: 1.87, betaX: 4.8, betaY: 2.5, baseOffset: 13.0, price: 380.28, fwdPE: 19.62, eps_trail: 6.0, eps_0q: 3.24, eps_1q: 3.87, eps_0y: 11.62, eps_1y: 19.39, ret_1d: -3.02, ret_1w: -3.31, ret_1m: -9.75, last_updated: "2026-06-24 00:16" },
        { name: "Tesla Inc.", ticker: "TSLA", baseMcap: 1.26, betaX: 7.0, betaY: 5.0, baseOffset: 15.0, price: 385.24, fwdPE: 154.1, eps_trail: 1.09, eps_0q: 0.46, eps_1q: 0.54, eps_0y: 2.06, eps_1y: 2.5, ret_1d: -4.9, ret_1w: -6.31, ret_1m: -11.16, last_updated: "2026-06-24 00:16" },
        { name: "Meta Platforms", ticker: "META", baseMcap: 1.54, betaX: 5.2, betaY: 3.0, baseOffset: 12.0, price: 565.12, fwdPE: 15.59, eps_trail: 27.52, eps_0q: 7.2, eps_1q: 7.04, eps_0y: 32.83, eps_1y: 34.92, ret_1d: 0.24, ret_1w: -4.76, ret_1m: -7.61, last_updated: "2026-06-24 00:16" },
        { name: "Berkshire Hathaway", ticker: "BRK.B", baseMcap: 1.06, betaX: 1.5, betaY: 0.5, baseOffset: 6.0, price: 493.8, fwdPE: 23.0, eps_trail: 33.57, eps_0q: 5.01, eps_1q: 5.3, eps_0y: 20.75, eps_1y: 21.47, ret_1d: 1.04, ret_1w: -0.35, ret_1m: 2.1, last_updated: "2026-06-24 00:16" },
        { name: "Eli Lilly & Co.", ticker: "LLY", baseMcap: 1.06, betaX: 2.0, betaY: 1.0, baseOffset: 18.0, price: 1101.72, fwdPE: 24.78, eps_trail: 28.1, eps_0q: 8.81, eps_1q: 9.4, eps_0y: 36.21, eps_1y: 44.46, ret_1d: -0.03, ret_1w: -2.45, ret_1m: 3.47, last_updated: "2026-06-24 00:16" }
    ];

    // KOSPI Top 10 Companies
            const krTop10Defs = [
        { name: "삼성전자", ticker: "005930", baseMcap: 1638.36, betaX: 5.5, betaY: 3.0, baseOffset: 8.0, price: 310000.0, fwdPE: 5.34, eps_trail: 0, eps_0q: 11061.49, eps_1q: 13483.35, eps_0y: 45425.67, eps_1y: 58035.6, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "SK하이닉스", ticker: "000660", baseMcap: 1248.63, betaX: 8.5, betaY: 5.0, baseOffset: 24.0, price: 2555000.0, fwdPE: 6.18, eps_trail: 0, eps_0q: 71064.06, eps_1q: 88259.91, eps_0y: 305490.4, eps_1y: 413579.4, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "현대차", ticker: "005380", baseMcap: 105.00, betaX: 3.5, betaY: 1.5, baseOffset: 14.0, price: 511000.0, fwdPE: 10.36, eps_trail: 0, eps_0q: 12370.13, eps_1q: 12614.77, eps_0y: 44708.26, eps_1y: 49327.39, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "LG에너지솔루션", ticker: "373220", baseMcap: 77.10, betaX: 6.0, betaY: 3.5, baseOffset: 5.0, price: 362000.0, fwdPE: 42.11, eps_trail: 0, eps_0q: 878.92, eps_1q: 2508.59, eps_0y: 1979.04, eps_1y: 8596.31, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "삼성물산", ticker: "028260", baseMcap: 55.96, betaX: 2.0, betaY: 1.5, baseOffset: 5.0, price: 455000.0, fwdPE: 25.83, eps_trail: 0, eps_0q: 3136.25, eps_1q: 3472.02, eps_0y: 15864.73, eps_1y: 17613.21, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "삼성바이오로직스", ticker: "207940", baseMcap: 70.27, betaX: 1.8, betaY: 0.8, baseOffset: 7.0, price: 1273000.0, fwdPE: 26.41, eps_trail: 0, eps_0q: 8865.59, eps_1q: 9676.67, eps_0y: 42404.33, eps_1y: 48198.96, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "KB금융", ticker: "105560", baseMcap: 60.21, betaX: 2.5, betaY: 1.2, baseOffset: 18.0, price: 153700.0, fwdPE: 8.13, eps_trail: 0, eps_0q: 4578.9, eps_1q: 4985.44, eps_0y: 17648.36, eps_1y: 18906.17, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "기아", ticker: "000270", baseMcap: 50.72, betaX: 3.8, betaY: 1.6, baseOffset: 15.0, price: 137400.0, fwdPE: 5.82, eps_trail: 0, eps_0q: 6129.74, eps_1q: 5699.84, eps_0y: 21668.62, eps_1y: 23614.46, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "신한지주", ticker: "055550", baseMcap: 49.01, betaX: 2.2, betaY: 1.1, baseOffset: 14.0, price: 97700.0, fwdPE: 7.58, eps_trail: 0, eps_0q: 3301.84, eps_1q: 3203.13, eps_0y: 11800.98, eps_1y: 12897.58, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" },
        { name: "현대모비스", ticker: "012330", baseMcap: 42.99, betaX: 2.5, betaY: 1.2, baseOffset: 6.0, price: 510000.0, fwdPE: 9.61, eps_trail: 0, eps_0q: 13246.62, eps_1q: 13516.65, eps_0y: 47320.18, eps_1y: 53062.31, ret_1d: 0.0, ret_1w: 0.0, ret_1m: 0.0, last_updated: "2026-06-23 15:30" }
    ];

    const usTop10 = usTop10Defs.map((item, idx) => {
        const stockYtd = item.baseOffset + item.betaX * x + item.betaY * y;
        const currentMcap = item.baseMcap * (1 + stockYtd / 100);
        return {
            rank: idx + 1,
            name: item.name,
            ticker: item.ticker,
            mcapText: currentMcap >= 1.0 ? `$${currentMcap.toFixed(2)}T` : `$${(currentMcap * 1000).toFixed(0)}B`,
            ytdText: (stockYtd >= 0 ? "+" : "") + stockYtd.toFixed(1) + "%",
            ytdPos: stockYtd >= 0,
            rawMcap: currentMcap,
            rawYtd: stockYtd,
            price: item.price || 0,
            fwdPE: item.fwdPE || 15.0,
            eps_trail: item.eps_trail || 0,
            eps_0q: item.eps_0q || 0,
            eps_1q: item.eps_1q || 0,
            eps_0y: item.eps_0y || 0,
            eps_1y: item.eps_1y || 0,
            ret_1d: item.ret_1d || 0,
            ret_1w: item.ret_1w || 0,
            ret_1m: item.ret_1m || 0,
            last_updated: item.last_updated || '',
            currency: 'USD'
        };
    });

    const krTop10 = krTop10Defs.map((item, idx) => {
        const stockYtd = item.baseOffset + item.betaX * x + item.betaY * y;
        const currentMcap = item.baseMcap * (1 + stockYtd / 100);
        return {
            rank: idx + 1,
            name: item.name,
            ticker: item.ticker,
            mcapText: `${Math.round(currentMcap).toLocaleString()}조원`,
            ytdText: (stockYtd >= 0 ? "+" : "") + stockYtd.toFixed(1) + "%",
            ytdPos: stockYtd >= 0,
            rawMcap: currentMcap,
            rawYtd: stockYtd,
            price: item.price || 0,
            fwdPE: item.fwdPE || 15.0,
            eps_trail: item.eps_trail || 0,
            eps_0q: item.eps_0q || 0,
            eps_1q: item.eps_1q || 0,
            eps_0y: item.eps_0y || 0,
            eps_1y: item.eps_1y || 0,
            ret_1d: item.ret_1d || 0,
            ret_1w: item.ret_1w || 0,
            ret_1m: item.ret_1m || 0,
            last_updated: item.last_updated || '',
            currency: 'KRW'
        };
    });

    return {
        per: per.toFixed(1),
        perGrade: perGrade,
        pbr: pbr.toFixed(2),
        pbrGrade: pbrGrade,
        dy: dy.toFixed(2),
        dyGrade: dyGrade,
        indexLow: indexLow.toLocaleString(),
        indexHigh: indexHigh.toLocaleString(),
        indexVal: indexVal.toFixed(0),
        indexMdd: indexMdd.toFixed(1),
        indexRun: indexRun.toFixed(1),
        indexPos: indexPos.toFixed(0),
        indexBadge: indexBadge,
        maAlign: maAlign,
        rsi: rsi.toFixed(1),
        rsiGrade: rsiGrade,
        macd: macd,
        macdGrade: macdGrade,
        foreignFlow: foreignFlow,
        instFlow: instFlow,
        retailWeight: retailWeight,
        highStocks: highStocks,
        lowStocks: lowStocks,
        volumeStocks: volumeStocks,
        sectorReturns: sectorReturns,
        mcapSp500Total: `$${mcapSp500Total.toFixed(2)}T (약 ${Math.round(mcapSp500Total * EXCHANGE_RATE).toLocaleString()}조원)`,
        mcapKospiTotal: `${Math.round(mcapKospiTotal).toLocaleString()}조원`,
        mcapKosdaqTotal: `${Math.round(mcapKosdaqTotal).toLocaleString()}조원`,
        usTop10: usTop10,
        krTop10: krTop10
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
function updateUI(macro, season, portfolio, cli, pmi, gdp, eps, m2, cpi, rate, spread, citi, gdpnow) {
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

    const needlePrev = document.getElementById("compass-needle-prev");
    if (needlePrev) {
        needlePrev.style.transform = `rotate(${season.prevAngle !== undefined ? season.prevAngle : season.angle}deg)`;
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



    // 7B. Update Secondary Stock Market Indicators
    const sec = calculateSecondaryIndicators(macro, season, activeRegion, rate, eps, m2);

    const elPer = document.getElementById("val-market-per");
    const elPerGrade = document.getElementById("val-market-per-grade");
    const elPbr = document.getElementById("val-market-pbr");
    const elPbrGrade = document.getElementById("val-market-pbr-grade");
    const elDy = document.getElementById("val-market-dy");
    const elDyGrade = document.getElementById("val-market-dy-grade");

    if (elPer) elPer.textContent = `${sec.per}배`;
    if (elPerGrade) {
        elPerGrade.textContent = sec.perGrade;
        elPerGrade.className = "metric-grade " + (sec.perGrade === "저평가" ? "bullish" : sec.perGrade === "고평가" ? "bearish" : "neutral");
    }
    if (elPbr) elPbr.textContent = `${sec.pbr}배`;
    if (elPbrGrade) {
        elPbrGrade.textContent = sec.pbrGrade;
        elPbrGrade.className = "metric-grade " + (sec.pbrGrade === "저평가" ? "bullish" : sec.pbrGrade === "고평가" ? "bearish" : "neutral");
    }
    if (elDy) elDy.textContent = `${sec.dy}%`;
    if (elDyGrade) {
        elDyGrade.textContent = sec.dyGrade;
        elDyGrade.className = "metric-grade " + (sec.dyGrade === "배당 매리트" ? "bullish" : sec.dyGrade === "낮은 매리트" ? "warn" : "neutral");
    }

    const el52wBadge = document.getElementById("val-market-52w-badge");
    const el52wLow = document.getElementById("val-market-52w-low");
    const el52wHigh = document.getElementById("val-market-52w-high");
    const el52wMdd = document.getElementById("val-market-52w-mdd");
    const el52wRun = document.getElementById("val-market-52w-run");
    const el52wPos = document.getElementById("val-market-52w-pos");
    const el52wPointer = document.getElementById("val-market-52w-pointer");

    const regionUnit = activeRegion === "US" ? " pt" : " pt";
    if (el52wBadge) {
        el52wBadge.textContent = sec.indexBadge;
        el52wBadge.className = "status-badge " + (sec.indexBadge === "신고가 경신 중!" ? "bullish" : sec.indexBadge === "신저가 붕괴 위험!" ? "bearish" : "neutral");
    }
    if (el52wLow) el52wLow.textContent = `52주 최저: ${sec.indexLow}${regionUnit}`;
    if (el52wHigh) el52wHigh.textContent = `52주 최고: ${sec.indexHigh}${regionUnit}`;
    if (el52wMdd) el52wMdd.textContent = `신고가 대비 괴리율: ${sec.indexMdd}%`;
    if (el52wRun) el52wRun.textContent = `최저가 대비 상승률: +${sec.indexRun}%`;
    if (el52wPos) el52wPos.textContent = `현재 가격 위치: ${sec.indexPos}% (${Number(sec.indexVal).toLocaleString()}${regionUnit})`;
    if (el52wPointer) el52wPointer.style.left = `${sec.indexPos}%`;

    const elMa = document.getElementById("tech-market-ma");
    const elRsi = document.getElementById("tech-market-rsi");
    const elRsiGrade = document.getElementById("tech-market-rsi-grade");
    const elMacd = document.getElementById("tech-market-macd");
    const elMacdGrade = document.getElementById("tech-market-macd-grade");

    if (elMa) {
        elMa.textContent = sec.maAlign;
        elMa.className = "status-badge " + (sec.maAlign.includes("정배열") ? "bullish" : sec.maAlign.includes("역배열") ? "bearish" : "neutral");
    }
    if (elRsi) elRsi.textContent = sec.rsi;
    if (elRsiGrade) {
        elRsiGrade.textContent = sec.rsiGrade;
        elRsiGrade.className = "metric-grade " + (sec.rsiGrade === "과매수 (Overbought)" ? "bearish" : sec.rsiGrade === "과매도 (Oversold)" ? "bullish" : "neutral");
    }
    if (elMacd) elMacd.textContent = sec.macd;
    if (elMacdGrade) {
        elMacdGrade.textContent = sec.macdGrade;
        elMacdGrade.className = "metric-grade " + (sec.macdGrade.includes("Bullish") ? "bullish" : sec.macdGrade.includes("Bearish") ? "bearish" : "neutral");
    }

    const elForVal = document.getElementById("tech-market-foreign-val");
    const elForBar = document.getElementById("tech-market-foreign-bar");
    const elInstVal = document.getElementById("tech-market-inst-val");
    const elInstBar = document.getElementById("tech-market-inst-bar");
    const elRetailVal = document.getElementById("tech-market-retail-val");
    const elRetailBar = document.getElementById("tech-market-retail-bar");

    if (elForVal) {
        elForVal.textContent = sec.foreignFlow.text;
        elForVal.style.color = sec.foreignFlow.positive ? "#10b981" : "#ef4444";
    }
    if (elForBar) {
        elForBar.style.width = `${sec.foreignFlow.percentage}%`;
        elForBar.style.background = sec.foreignFlow.positive ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #ef4444, #f87171)";
    }

    if (elInstVal) {
        elInstVal.textContent = sec.instFlow.text;
        elInstVal.style.color = sec.instFlow.positive ? "#3b82f6" : "#ef4444";
    }
    if (elInstBar) {
        elInstBar.style.width = `${sec.instFlow.percentage}%`;
        elInstBar.style.background = sec.instFlow.positive ? "linear-gradient(90deg, #3b82f6, #60a5fa)" : "linear-gradient(90deg, #ef4444, #f87171)";
    }

    if (elRetailVal) elRetailVal.textContent = sec.retailWeight.text;
    if (elRetailBar) elRetailBar.style.width = `${sec.retailWeight.percentage}%`;

    // Render 52W High Stocks
    const elHighList = document.getElementById("stocks-52w-high-list");
    if (elHighList && sec.highStocks) {
        elHighList.innerHTML = sec.highStocks.map(s => `
            <div class="stock-item-row">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #ffffff;">${s.name}</span>
                    <span style="font-size: 0.65rem; color: var(--text-muted);">${s.ticker}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #ffffff;">${s.price}</span>
                    <span style="font-size: 0.65rem; color: #10b981; font-weight: 700;">${s.change}</span>
                </div>
            </div>
        `).join("");
    }

    // Render 52W Low Stocks
    const elLowList = document.getElementById("stocks-52w-low-list");
    if (elLowList && sec.lowStocks) {
        elLowList.innerHTML = sec.lowStocks.map(s => `
            <div class="stock-item-row">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #ffffff;">${s.name}</span>
                    <span style="font-size: 0.65rem; color: var(--text-muted);">${s.ticker}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #ffffff;">${s.price}</span>
                    <span style="font-size: 0.65rem; color: #ef4444; font-weight: 700;">${s.change}</span>
                </div>
            </div>
        `).join("");
    }

    // Render Volume Spikes Stocks
    const elVolList = document.getElementById("stocks-volume-spike-list");
    if (elVolList && sec.volumeStocks) {
        elVolList.innerHTML = sec.volumeStocks.map(s => `
            <div class="stock-item-row">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #ffffff;">${s.name}</span>
                    <span style="font-size: 0.65rem; color: var(--text-muted);">${s.ticker}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #3b82f6;">${s.price}</span>
                    <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 500;">${s.changeText}</span>
                </div>
            </div>
        `).join("");
    }

    // Render Market Cap totals
    const elSp500McapTotal = document.getElementById("mcap-sp500-total");
    const elKospiMcapTotal = document.getElementById("mcap-kospi-total");
    const elKosdaqMcapTotal = document.getElementById("mcap-kosdaq-total");

    if (elSp500McapTotal) elSp500McapTotal.textContent = sec.mcapSp500Total;
    if (elKospiMcapTotal) elKospiMcapTotal.textContent = sec.mcapKospiTotal;
    if (elKosdaqMcapTotal) elKosdaqMcapTotal.textContent = sec.mcapKosdaqTotal;

    // Render S&P 500 Top 10 Table
    const elSp500McapTbody = document.getElementById("mcap-sp500-tbody");
    if (elSp500McapTbody && sec.usTop10) {
        elSp500McapTbody.innerHTML = sec.usTop10.map(s => {
            const ytdColor = s.ytdPos ? "#10b981" : "#ef4444";
            const ret1dColor = s.ret_1d >= 0 ? "#10b981" : "#ef4444";
            const ret1wColor = s.ret_1w >= 0 ? "#10b981" : "#ef4444";
            const ret1mColor = s.ret_1m >= 0 ? "#10b981" : "#ef4444";
            
            return `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.04); transition: background-color 0.2s ease; cursor: pointer;" onclick="openStockModel('${s.ticker}', '${s.name}', ${s.rawMcap}, ${s.rawYtd}, ${s.rank}, '${s.currency}', ${s.price}, ${s.fwdPE}, ${s.eps_trail}, ${s.eps_0q}, ${s.eps_1q}, ${s.eps_0y}, ${s.eps_1y}, '${s.last_updated}')" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.05)'" onmouseout="this.style.backgroundColor='transparent'">
                    <td style="text-align: left; padding: 0.5rem 0.2rem; color: var(--text-muted); font-weight: 600;">${s.rank}</td>
                    <td style="text-align: left; padding: 0.5rem 0.2rem; font-weight: 700; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 110px;" title="${s.name} (${s.ticker})">
                        ${s.name} <span style="font-size: 0.6rem; color: var(--text-muted); font-weight: 500;">${s.ticker}</span>
                    </td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 600;">${s.mcapText}</td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 600; color: ${ret1dColor};">${s.ret_1d > 0 ? '+' : ''}${s.ret_1d.toFixed(1)}%</td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 600; color: ${ret1wColor};">${s.ret_1w > 0 ? '+' : ''}${s.ret_1w.toFixed(1)}%</td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 600; color: ${ret1mColor};">${s.ret_1m > 0 ? '+' : ''}${s.ret_1m.toFixed(1)}%</td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 700; color: ${ytdColor};">${s.ytdText}</td>
                </tr>
            `;
        }).join("");
    }

    // Render KOSPI Top 10 Table
    const elKospiMcapTbody = document.getElementById("mcap-kospi-tbody");
    if (elKospiMcapTbody && sec.krTop10) {
        elKospiMcapTbody.innerHTML = sec.krTop10.map(s => {
            const ytdColor = s.ytdPos ? "#10b981" : "#ef4444";
            const ret1dColor = s.ret_1d >= 0 ? "#10b981" : "#ef4444";
            const ret1wColor = s.ret_1w >= 0 ? "#10b981" : "#ef4444";
            const ret1mColor = s.ret_1m >= 0 ? "#10b981" : "#ef4444";
            
            return `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.04); transition: background-color 0.2s ease; cursor: pointer;" onclick="openStockModel('${s.ticker}', '${s.name}', ${s.rawMcap}, ${s.rawYtd}, ${s.rank}, '${s.currency}', ${s.price}, ${s.fwdPE}, ${s.eps_trail}, ${s.eps_0q}, ${s.eps_1q}, ${s.eps_0y}, ${s.eps_1y}, '${s.last_updated}')" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.05)'" onmouseout="this.style.backgroundColor='transparent'">
                    <td style="text-align: left; padding: 0.5rem 0.2rem; color: var(--text-muted); font-weight: 600;">${s.rank}</td>
                    <td style="text-align: left; padding: 0.5rem 0.2rem; font-weight: 700; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 110px;" title="${s.name} (${s.ticker})">
                        ${s.name} <span style="font-size: 0.6rem; color: var(--text-muted); font-weight: 500;">${s.ticker}</span>
                    </td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 600;">${s.mcapText}</td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 600; color: ${ret1dColor};">${s.ret_1d > 0 ? '+' : ''}${s.ret_1d.toFixed(1)}%</td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 600; color: ${ret1wColor};">${s.ret_1w > 0 ? '+' : ''}${s.ret_1w.toFixed(1)}%</td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 600; color: ${ret1mColor};">${s.ret_1m > 0 ? '+' : ''}${s.ret_1m.toFixed(1)}%</td>
                    <td style="text-align: right; padding: 0.5rem 0.2rem; font-weight: 700; color: ${ytdColor};">${s.ytdText}</td>
                </tr>
            `;
        }).join("");
    }

    // Render Sector Period Returns Table
    const elSectorReturnsTbody = document.getElementById("sector-returns-tbody");
    if (elSectorReturnsTbody && sec.sectorReturns) {
        elSectorReturnsTbody.innerHTML = sec.sectorReturns.map(s => {
            const m1Color = s.m1Pos ? "#10b981" : "#ef4444";
            const m3Color = s.m3Pos ? "#10b981" : "#ef4444";
            const ytdColor = s.ytdPos ? "#10b981" : "#ef4444";
            
            return `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.04); transition: background-color 0.2s ease;">
                    <td style="text-align: left; padding: 0.65rem 0.25rem; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 0.4rem;">
                        <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${s.color}; flex-shrink: 0;"></span>
                        <span>${s.name}</span>
                    </td>
                    <td style="color: ${m1Color}; font-weight: 700; padding: 0.65rem 0.25rem;">${s.m1}</td>
                    <td style="color: ${m3Color}; font-weight: 700; padding: 0.65rem 0.25rem;">${s.m3}</td>
                    <td style="color: ${ytdColor}; font-weight: 700; padding: 0.65rem 0.25rem;">${s.ytd}</td>
                </tr>
            `;
        }).join("");
    }

    // 7B. Dynamic Table Source Links
    const sourceCli = document.getElementById("source-link-cli");
    const sourcePmi = document.getElementById("source-link-pmi");
    const sourceGdp = document.getElementById("source-link-gdp");
    const sourceEps = document.getElementById("source-link-eps");
    const sourceM2 = document.getElementById("source-link-m2");
    const sourceCpi = document.getElementById("source-link-cpi");
    const sourceRate = document.getElementById("source-link-rate");
    const sourceSpread = document.getElementById("source-link-spread");

    if (activeRegion === "US") {
        if (sourceCli) { sourceCli.href = "https://data.oecd.org/"; sourceCli.textContent = "OECD Data ↗"; }
        if (sourcePmi) { sourcePmi.href = "https://www.ismworld.org/"; sourcePmi.textContent = "ISM (미국) ↗"; }
        if (sourceGdp) { sourceGdp.href = "https://www.bea.gov/"; sourceGdp.textContent = "BEA (미국) ↗"; }
        if (sourceEps) { sourceEps.href = "https://www.factset.com/"; sourceEps.textContent = "FactSet ↗"; }
        if (sourceM2) { sourceM2.href = "https://fred.stlouisfed.org/series/M2SL"; sourceM2.textContent = "FRED M2 ↗"; }
        if (sourceCpi) { sourceCpi.href = "https://www.bls.gov/cpi/"; sourceCpi.textContent = "BLS CPI ↗"; }
        if (sourceRate) { sourceRate.href = "https://fred.stlouisfed.org/series/FEDFUNDS"; sourceRate.textContent = "FRED FedFunds ↗"; }
        if (sourceSpread) { sourceSpread.href = "https://fred.stlouisfed.org/series/T10Y2Y"; sourceSpread.textContent = "FRED Spread ↗"; }
    } else {
        if (sourceCli) { sourceCli.href = "https://data.oecd.org/"; sourceCli.textContent = "OECD Data ↗"; }
        if (sourcePmi) { sourcePmi.href = "https://www.spglobal.com/marketintelligence/en/mi/products/pmi.html"; sourcePmi.textContent = "S&P (한국) ↗"; }
        if (sourceGdp) { sourceGdp.href = "https://ecos.bok.or.kr/"; sourceGdp.textContent = "한은 ECOS ↗"; }
        if (sourceEps) { sourceEps.href = "https://www.fnguide.com/"; sourceEps.textContent = "FnGuide ↗"; }
        if (sourceM2) { sourceM2.href = "https://ecos.bok.or.kr/"; sourceM2.textContent = "한은 ECOS M2 ↗"; }
        if (sourceCpi) { sourceCpi.href = "https://kosis.kr/"; sourceCpi.textContent = "통계청 KOSIS ↗"; }
        if (sourceRate) { sourceRate.href = "https://www.bok.or.kr/portal/singl/baseRate/list.do?menuNo=200489"; sourceRate.textContent = "한국은행 ↗"; }
        if (sourceSpread) { sourceSpread.href = "https://ecos.bok.or.kr/"; sourceSpread.textContent = "한은 ECOS 국채 ↗"; }
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
    } else if (activeMode === "time") {
        const startIdx = Math.max(0, activeTimeIndex - 5);
        for (let i = startIdx; i <= activeTimeIndex; i++) {
            const ind = getIndicatorsForMonth(activeRegion, i);
            const macroM = calculateMacroMetrics(ind.cli, ind.pmi, ind.gdp, ind.m2, ind.rate, ind.spread);
            trailPoints.push({ x: macroM.x, y: macroM.y });
        }
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
    } else if (activeMode === "time") {
        const startIdx = Math.max(0, activeTimeIndex - 5);
        for (let i = startIdx; i <= activeTimeIndex; i++) {
            const ind = getIndicatorsForMonth(activeRegion, i);
            const macroM = calculateMacroMetrics(ind.cli, ind.pmi, ind.gdp, ind.m2, ind.rate, ind.spread);
            trailPoints.push({ x: macroM.x, y: macroM.y });
        }
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

// 6B. Switch Market Trends Tabs
function switchMarketTab(tabName) {
    const valBtn = document.getElementById("market-tab-val");
    const techBtn = document.getElementById("market-tab-tech");
    const stocksBtn = document.getElementById("market-tab-stocks");
    const mcapBtn = document.getElementById("market-tab-mcap");
    const feargreedBtn = document.getElementById("market-tab-feargreed");
    const valContent = document.getElementById("market-content-val");
    const techContent = document.getElementById("market-content-tech");
    const stocksContent = document.getElementById("market-content-stocks");
    const mcapContent = document.getElementById("market-content-mcap");
    const feargreedContent = document.getElementById("market-content-feargreed");

    if (!valBtn || !techBtn || !valContent || !techContent) return;

    valBtn.classList.remove("active");
    techBtn.classList.remove("active");
    if (stocksBtn) stocksBtn.classList.remove("active");
    if (mcapBtn) mcapBtn.classList.remove("active");
    if (feargreedBtn) feargreedBtn.classList.remove("active");

    valContent.classList.add("hidden");
    techContent.classList.add("hidden");
    if (stocksContent) stocksContent.classList.add("hidden");
    if (mcapContent) mcapContent.classList.add("hidden");
    if (feargreedContent) feargreedContent.classList.add("hidden");

    if (tabName === 'val') {
        valBtn.classList.add("active");
        valContent.classList.remove("hidden");
    } else if (tabName === 'tech') {
        techBtn.classList.add("active");
        techContent.classList.remove("hidden");
    } else if (tabName === 'stocks') {
        if (stocksBtn) stocksBtn.classList.add("active");
        if (stocksContent) stocksContent.classList.remove("hidden");
    } else if (tabName === 'mcap') {
        if (mcapBtn) mcapBtn.classList.add("active");
        if (mcapContent) mcapContent.classList.remove("hidden");
    } else if (tabName === 'feargreed') {
        if (feargreedBtn) feargreedBtn.classList.add("active");
        if (feargreedContent) feargreedContent.classList.remove("hidden");
        
        // Trigger data load and chart rendering/resizing
        if (typeof window.loadFearGreedData === 'function') {
            window.loadFearGreedData();
        }
    }
}

// 7. EVENT LISTENERS INITIALIZATION

// ==========================================
// Devil's Advocate: Investment Committee
// ==========================================
function calculateInvestmentCommittee(macro, portfolio, region, seedMoney) {
    const phase = macro.phase; // expansion, slowdown, contraction, recovery
    const phaseKor = macro.phaseKor;
    
    // 1) Position & Weight
    let weightAdvice = "";
    if (phase === "expansion") {
        weightAdvice = `<strong>포지션: 🟢 공격적 확대 (Risk-On)</strong><br><br>
        현재 국면은 <strong>${phaseKor}</strong>입니다. 경제 성장과 유동성이 뒷받침되고 있으므로 주식 비중을 최대치(70~80%)로 끌어올릴 것을 권고합니다. 채권 비중은 축소하고 인플레이션 헤지를 위한 원자재를 일부(5~10%) 편입하세요.`;
    } else if (phase === "slowdown") {
        weightAdvice = `<strong>포지션: 🟡 중립/부분 축소 (Defensive)</strong><br><br>
        현재 국면은 <strong>${phaseKor}</strong>입니다. 성장이 둔화되고 물가 압력이 나타납니다. 주식 비중을 40~50%로 축소하고 현금 비중을 20% 이상 확보하세요. 주식 내에서는 경기방어주 위주로 재편해야 합니다.`;
    } else if (phase === "contraction") {
        weightAdvice = `<strong>포지션: 🔴 강력 방어 (Risk-Off)</strong><br><br>
        현재 국면은 <strong>${phaseKor}</strong>입니다. 침체 리스크가 높으므로 주식 비중을 20~30%로 대폭 축소하세요. 대신 국채(Bonds) 비중을 50% 이상 늘리고, 현금성 자산을 최대로 확보해 변동성에 대비해야 합니다.`;
    } else if (phase === "recovery") {
        weightAdvice = `<strong>포지션: 🔵 점진적 확대 (Accumulate)</strong><br><br>
        현재 국면은 <strong>${phaseKor}</strong>입니다. 바닥을 다지고 반등하는 시기입니다. 유동성 장세가 기대되므로 주식 비중을 50~60%로 늘려나가세요. 성장주 위주의 매수가 유효합니다.`;
    }

    // 2) Country & Sector ideas with amounts
    let ideaAdvice = "";
    // Format number with commas
    const formatMoney = (amount) => new Intl.NumberFormat('ko-KR').format(Math.round(amount));
    
    // Suggest 3 ETFs to buy based on region and phase
    let etfIdeas = [];
    if (region === "US") {
        if (phase === "expansion") etfIdeas = [{ticker: "SPY", name: "S&P 500", alloc: 0.4}, {ticker: "QQQ", name: "Nasdaq 100", alloc: 0.4}, {ticker: "XLE", name: "Energy Sector", alloc: 0.2}];
        else if (phase === "slowdown") etfIdeas = [{ticker: "XLV", name: "Health Care", alloc: 0.4}, {ticker: "XLP", name: "Consumer Staples", alloc: 0.4}, {ticker: "BIL", name: "1-3 Month T-Bill", alloc: 0.2}];
        else if (phase === "contraction") etfIdeas = [{ticker: "TLT", name: "20+ Year Treasury", alloc: 0.6}, {ticker: "GLD", name: "Gold Trust", alloc: 0.2}, {ticker: "XLU", name: "Utilities", alloc: 0.2}];
        else if (phase === "recovery") etfIdeas = [{ticker: "QQQ", name: "Nasdaq 100", alloc: 0.5}, {ticker: "ARKK", name: "Innovation ETF", alloc: 0.2}, {ticker: "XLY", name: "Consumer Discretionary", alloc: 0.3}];
    } else {
        if (phase === "expansion") etfIdeas = [{ticker: "KODEX 200", name: "KOSPI 200", alloc: 0.4}, {ticker: "TIGER 반도체", name: "반도체 섹터", alloc: 0.4}, {ticker: "KODEX 은행", name: "금융 섹터", alloc: 0.2}];
        else if (phase === "slowdown") etfIdeas = [{ticker: "TIGER 필수소비재", name: "필수소비재", alloc: 0.4}, {ticker: "KODEX 헬스케어", name: "제약/바이오", alloc: 0.3}, {ticker: "KODEX 단기채권", name: "단기채", alloc: 0.3}];
        else if (phase === "contraction") etfIdeas = [{ticker: "KODEX 국고채10년", name: "장기국채", alloc: 0.5}, {ticker: "KODEX 골드선물", name: "금", alloc: 0.2}, {ticker: "TIGER 유틸리티", name: "유틸리티", alloc: 0.3}];
        else if (phase === "recovery") etfIdeas = [{ticker: "TIGER 2차전지", name: "2차전지", alloc: 0.3}, {ticker: "TIGER 네이버카카오", name: "소프트웨어", alloc: 0.3}, {ticker: "KODEX 200", name: "KOSPI 200", alloc: 0.4}];
    }

    let ideaList = etfIdeas.map(etf => {
        const allocMoney = seedMoney * etf.alloc;
        return `<li><strong>${etf.ticker} (${etf.name}):</strong> 비중 ${etf.alloc * 100}% <span style="color:var(--primary-color);">(${formatMoney(allocMoney)}원 매수)</span></li>`;
    }).join("");

    ideaAdvice = `<strong>추천 매매 전략 (총 투자금액: ${formatMoney(seedMoney)}원 기준)</strong><br><br>
    <ul>${ideaList}</ul>
    <br><span style="font-size:0.75rem; color:var(--text-muted);">* 투자 판단은 참고용이며, 월스트리트 CIO 챗을 통해 더 깊은 논의가 가능합니다.</span>`;

    return { weightAdvice, ideaAdvice };
}

document.addEventListener("DOMContentLoaded", () => {
    // A. DOM Elements
    const modeSimBtn = document.getElementById("mode-sim");
    const modeHistBtn = document.getElementById("mode-hist");
    const modeTimeBtn = document.getElementById("mode-time");
    const presetContainer = document.getElementById("preset-container");
    const slidersContainer = document.getElementById("sliders-container");
    const timeMachineContainer = document.getElementById("time-machine-container");
    const selectTimeMonth = document.getElementById("select-time-month");
    const inputTimeSlider = document.getElementById("input-time-slider");
    const valTimeMonth = document.getElementById("val-time-month");
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
        if (activeMode === "time") {
            // Get indicators for active time machine month
            const monthData = getIndicatorsForMonth(activeRegion, activeTimeIndex);
            
            // Sync slider inputs physically
            inputCli.value = monthData.cli;
            inputPmi.value = monthData.pmi;
            inputGdp.value = monthData.gdp;
            inputEps.value = monthData.eps;
            inputM2.value = monthData.m2;
            inputCpi.value = monthData.cpi;
            inputRate.value = monthData.rate;
            inputSpread.value = monthData.spread;
            
            // Set page title
            if (pageTitle) {
                pageTitle.textContent = `${timeMachineMonths[activeTimeIndex].label} 경기 사이클 분석`;
            }
        }

        const cliVal = parseFloat(inputCli.value);
        const pmiVal = parseFloat(inputPmi.value);
        const gdpVal = parseFloat(inputGdp.value);
        const epsVal = parseFloat(inputEps.value);
        const m2Val = parseFloat(inputM2.value);
        const cpiVal = parseFloat(inputCpi.value);
        const rateVal = parseFloat(inputRate.value);
        const spreadVal = parseFloat(inputSpread.value);
        let citiVal, gdpnowVal;
        if (activeMode === "hist") {
            const preset = historicalPresets[activeRegion][activePreset];
            citiVal = preset.citi !== undefined ? preset.citi : 0;
            gdpnowVal = preset.gdpnow !== undefined ? preset.gdpnow : 2.0;
        } else if (activeMode === "time") {
            const ind = getIndicatorsForMonth(activeRegion, activeTimeIndex);
            citiVal = ind.citi;
            gdpnowVal = ind.gdpnow;
        } else {
            const selectVal = document.getElementById("export-month-select") ? document.getElementById("export-month-select").value : "2026-07";
            const mIndex = getMonthIndex(selectVal);
            const ind = getIndicatorsForMonth(activeRegion, mIndex);
            citiVal = ind.citi;
            gdpnowVal = ind.gdpnow;
        }
        
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

        // Calculate Previous State for MoM Transitions
        let prevIndex = 61;
        let prevMacro, prevSeason;
        
        if (activeMode === "time") {
            prevIndex = Math.max(0, activeTimeIndex - 1);
            const prevInd = getIndicatorsForMonth(activeRegion, prevIndex);
            prevMacro = calculateMacroMetrics(prevInd.cli, prevInd.pmi, prevInd.gdp, prevInd.m2, prevInd.rate, prevInd.spread);
            prevSeason = calculateStockSeasonMetrics(prevInd.eps, prevInd.m2, prevInd.rate, prevInd.spread);
        } else if (activeMode === "hist") {
            // Historical Epoch Mode: Use the first point of the historical trail as previous state
            const presetData = historicalPresets[activeRegion][activePreset];
            if (presetData && presetData.trail && presetData.trail.length > 0) {
                const prevPt = presetData.trail[0];
                const prevPhase = (prevPt.x >= 0 && prevPt.y >= 0) ? "expansion" :
                                  (prevPt.x >= 0 && prevPt.y < 0) ? "slowdown" :
                                  (prevPt.x < 0 && prevPt.y < 0) ? "contraction" : "recovery";
                const prevPhaseKor = prevPhase === "expansion" ? "확장기 (Expansion)" :
                                     prevPhase === "slowdown" ? "둔화기 (Slowdown)" :
                                     prevPhase === "contraction" ? "수축기 (Contraction)" : "회복기 (Recovery)";
                
                const prevSeasonStr = prevPhase === "expansion" ? "summer" :
                                      prevPhase === "slowdown" ? "autumn" :
                                      prevPhase === "contraction" ? "winter" : "spring";
                const prevSeasonKor = prevSeasonStr === "summer" ? "실적장세 (여름)" :
                                      prevSeasonStr === "autumn" ? "역금융장세 (가을)" :
                                      prevSeasonStr === "winter" ? "역실적장세 (겨울)" : "금융장세 (봄)";
                
                prevMacro = { phase: prevPhase, phaseKor: prevPhaseKor };
                prevSeason = { season: prevSeasonStr, seasonKor: prevSeasonKor, angle: prevSeasonStr === "summer" ? 90 : prevSeasonStr === "autumn" ? 180 : prevSeasonStr === "winter" ? 270 : 0 };
            } else {
                prevIndex = 59;
                const prevInd = getIndicatorsForMonth(activeRegion, prevIndex);
                prevMacro = calculateMacroMetrics(prevInd.cli, prevInd.pmi, prevInd.gdp, prevInd.m2, prevInd.rate, prevInd.spread);
                prevSeason = calculateStockSeasonMetrics(prevInd.eps, prevInd.m2, prevInd.rate, prevInd.spread);
            }
        } else {
            // Simulation Mode: Compare against previous month of selected reference month
            const monthSelectEl = document.getElementById("export-month-select");
            const selectVal = monthSelectEl ? monthSelectEl.value : "2026-07";
            prevIndex = Math.max(0, getMonthIndex(selectVal) - 1);
            const prevInd = getIndicatorsForMonth(activeRegion, prevIndex);
            prevMacro = calculateMacroMetrics(prevInd.cli, prevInd.pmi, prevInd.gdp, prevInd.m2, prevInd.rate, prevInd.spread);
            prevSeason = calculateStockSeasonMetrics(prevInd.eps, prevInd.m2, prevInd.rate, prevInd.spread);
        }
        
        // Pass previous season angle to seasonMetrics for the ghost needle
        seasonMetrics.prevAngle = prevSeason.angle;

        // Update MoM Transition Panel
        updateTransitionPanel(prevMacro, macroMetrics, prevSeason, seasonMetrics, prevIndex);

        // Sync UI
        updateUI(macroMetrics, seasonMetrics, portfolioMetrics, cliVal, pmiVal, gdpVal, epsVal, m2Val, cpiVal, rateVal, spreadVal, citiVal, gdpnowVal);

        // Update Committee Panel
        const seedInput = document.getElementById("input-seed-money");
        const seedMoney = seedInput ? parseFloat(seedInput.value) || 0 : 100000000;
        const committee = calculateInvestmentCommittee(macroMetrics, portfolioMetrics, activeRegion, seedMoney);
        const elWeight = document.getElementById("committee-weight");
        const elIdeas = document.getElementById("committee-ideas");
        if (elWeight) elWeight.innerHTML = committee.weightAdvice;
        if (elIdeas) elIdeas.innerHTML = committee.ideaAdvice;

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
        if (modeTimeBtn) modeTimeBtn.classList.remove("active");
        
        presetContainer.classList.add("hidden");
        slidersContainer.classList.remove("hidden");
        if (timeMachineContainer) timeMachineContainer.classList.add("hidden");
        pageTitle.textContent = "실시간 경제 시뮬레이터";
        
        document.querySelectorAll(".preset-btn").forEach(btn => btn.classList.remove("active"));
        triggerModelUpdate();
    });

    modeHistBtn.addEventListener("click", () => {
        activeMode = "hist";
        modeHistBtn.classList.add("active");
        modeSimBtn.classList.remove("active");
        if (modeTimeBtn) modeTimeBtn.classList.remove("active");
        
        presetContainer.classList.remove("hidden");
        slidersContainer.classList.add("hidden");
        if (timeMachineContainer) timeMachineContainer.classList.add("hidden");
        
        loadPresetContainerItems();
        loadPreset(activePreset);
    });

    if (modeTimeBtn) {
        modeTimeBtn.addEventListener("click", () => {
            activeMode = "time";
            modeTimeBtn.classList.add("active");
            modeSimBtn.classList.remove("active");
            modeHistBtn.classList.remove("active");
            
            presetContainer.classList.add("hidden");
            slidersContainer.classList.add("hidden");
            if (timeMachineContainer) timeMachineContainer.classList.remove("hidden");
            
            if (pageTitle) {
                pageTitle.textContent = `${timeMachineMonths[activeTimeIndex].label} 경기 사이클 분석`;
            }
            
            triggerModelUpdate();
        });
    }

    if (modeTimeBtn) {
        modeTimeBtn.addEventListener("click", () => {
            activeMode = "time";
            modeTimeBtn.classList.add("active");
            modeSimBtn.classList.remove("active");
            modeHistBtn.classList.remove("active");
            
            presetContainer.classList.add("hidden");
            slidersContainer.classList.add("hidden");
            if (timeMachineContainer) timeMachineContainer.classList.remove("hidden");
            
            if (pageTitle) {
                pageTitle.textContent = `${timeMachineMonths[activeTimeIndex].label} 경기 사이클 분석`;
            }
            
            triggerModelUpdate();
        });
    }

    // Reset Sliders
    function resetSlidersToBaseline() {
        const monthSelectEl = document.getElementById("export-month-select");
        const selectVal = monthSelectEl ? monthSelectEl.value : "2026-07";
        const idx = getMonthIndex(selectVal);
        const ind = getIndicatorsForMonth(activeRegion, idx);
        
        inputCli.value = ind.cli;
        inputPmi.value = ind.pmi;
        inputGdp.value = ind.gdp;
        inputEps.value = ind.eps;
        inputM2.value = ind.m2;
        inputCpi.value = ind.cpi;
        inputRate.value = ind.rate;
        inputSpread.value = ind.spread;
        
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
            triggerModelUpdate(); // Sync MoM transition panel when reference month changes!
        });
    }

    // Populate Time Machine Month Dropdown Select Options
    if (selectTimeMonth) {
        for (let i = 61; i >= 0; i--) {
            const m = timeMachineMonths[i];
            const opt = document.createElement("option");
            opt.value = m.index;
            opt.textContent = m.label;
            if (m.index === activeTimeIndex) {
                opt.selected = true;
            }
            selectTimeMonth.appendChild(opt);
        }
    }

    // Timeline Slider & Dropdown Selection Event Binding
    if (inputTimeSlider && selectTimeMonth && valTimeMonth) {
        inputTimeSlider.addEventListener("input", (e) => {
            activeTimeIndex = parseInt(e.target.value);
            selectTimeMonth.value = activeTimeIndex;
            valTimeMonth.textContent = timeMachineMonths[activeTimeIndex].label;
            triggerModelUpdate();
        });

        selectTimeMonth.addEventListener("change", (e) => {
            activeTimeIndex = parseInt(e.target.value);
            inputTimeSlider.value = activeTimeIndex;
            valTimeMonth.textContent = timeMachineMonths[activeTimeIndex].label;
            triggerModelUpdate();
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
    const initData = getIndicatorsForMonth(activeRegion, activeTimeIndex);
    updateUI(initMacro, initSeason, initPortfolio, startCli, startPmi, startGdp, startEps, startM2, startCpi, startRate, startSpread, initData.citi, initData.gdpnow);

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

    

    document.querySelectorAll(".clickable-row").forEach(row => {
        row.addEventListener("click", (e) => {
            const indicatorKey = e.currentTarget.getAttribute("data-indicator");
            const meta = indicatorMeta[indicatorKey];
            if (!meta) return;

            // 1. Show Modal overlay
            if (modalOverlay) {
                modalOverlay.classList.remove("hidden");
            }

            // 2. Set title & description
            if (modalTitle) {
                modalTitle.textContent = `${meta.title.replace("역사적 트렌드", "")} 최근 5개년 월간 트렌드 (5-Year Monthly Trend)`;
            }
            if (modalDesc) {
                modalDesc.textContent = `${meta.desc} [차트 최종 지점은 현재 대시보드에 설정된 실시간 시뮬레이션 값이 유기적으로 연결됩니다]`;
            }

            // 2.5 Dynamic Source Link Injection inside Modal
            const rowSourceLink = row.querySelector("td a.source-link");
            const modalSourceLink = document.getElementById("modal-indicator-source-link");
            if (rowSourceLink && modalSourceLink) {
                modalSourceLink.href = rowSourceLink.href;
                modalSourceLink.textContent = rowSourceLink.textContent;
            }

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
            interpolatedMilestones[6] = activeCurrentValue; // Dynamic link!

            const labels = [];
            const dataValues = [];

            const startYear = 2021;
            const startMonth = 5; // May

            for (let i = 0; i <= 62; i++) {
                const intervalIndex = Math.min(5, Math.floor(i / 12));
                const fraction = (i % 12) / 12.0;

                const valStart = interpolatedMilestones[intervalIndex];
                const valEnd = interpolatedMilestones[intervalIndex + 1];

                let val = valStart + (valEnd - valStart) * fraction;
                if (i === 61) {
                    val = activeCurrentValue; // Guarantee exact slider value at the final simulated point!
                }

                // Add realistic macro wobble
                let noiseScale = 0.05;
                if (indicatorKey === "pmi") noiseScale = 0.35;
                else if (indicatorKey === "gdp" || indicatorKey === "cpi" || indicatorKey === "rate" || indicatorKey === "spread") noiseScale = 0.08;
                else if (indicatorKey === "eps") noiseScale = 0.8;
                else if (indicatorKey === "m2") noiseScale = 0.2;
                
                if (i !== 0 && i !== 61 && i % 12 !== 0) {
                    val += (Math.sin(i * 1.5) * 0.5 + (Math.random() - 0.5) * 0.5) * noiseScale;
                }

                dataValues.push(parseFloat(val.toFixed(2)));

                let curMonth = startMonth + i;
                let curYear = startYear + Math.floor((curMonth - 1) / 12);
                curMonth = ((curMonth - 1) % 12) + 1;
                
                if (i % 6 === 0 || i === 61) {
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
                            return index === 61 ? "#ffffff" : lineColor;
                        },
                        pointBorderColor: function(context) {
                            const index = context.dataIndex;
                            return index === 61 ? "#ef4444" : "#ffffff";
                        },
                        pointBorderWidth: function(context) {
                            const index = context.dataIndex;
                            return index === 61 ? 3 : 2;
                        },
                        pointRadius: function(context) {
                            const index = context.dataIndex;
                            return index === 61 ? 8 : 4;
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
                                autoSkip: false,
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

    // --- Modal Logic for Stock Model ---
    const stockModal = document.getElementById("stock-model-modal");
    const btnCloseStockModal = document.getElementById("btn-close-stock-modal");

    window.openStockModel = function(ticker, name, mcap, ytd, rank, currency, price, fwdPE, eps_trail, eps_0q, eps_1q, eps_0y, eps_1y, last_updated) {
        document.getElementById("modal-stock-title").innerText = `${name} (${ticker}) - 이익/목표주가 모델`;

        // Update timestamp display if element exists (or prepend it)
        let updateDisplay = last_updated ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.3rem;">최신 업데이트: ${last_updated}</div>` : "";
        document.getElementById("modal-stock-title").innerHTML = `${name} (${ticker}) - 이익/목표주가 모델${updateDisplay}`;

        // Adjust Forward P/E based on Macro environment
        // Base P/E from actual analyst consensus
        const basePE = parseFloat(fwdPE) || 15.0;
        let peAdjustment = 0;
        if (ytd > 10) peAdjustment = 2.0;
        else if (ytd > 0) peAdjustment = 1.0;
        else if (ytd < -10) peAdjustment = -2.0;
        else peAdjustment = -1.0;

        const targetPE = Math.max(5.0, basePE + peAdjustment).toFixed(1);
        let actualFwdEps = parseFloat(eps_1y) || 0;
        if (actualFwdEps <= 0) actualFwdEps = parseFloat(eps_0y) || 0;
        const currentPrice = parseFloat(price) || 0;
        
        let targetPrice = actualFwdEps * targetPE;
        
        // If eps is invalid or negative, fallback to simple momentum assumption
        if (actualFwdEps <= 0 || currentPrice <= 0) {
            const upsidePctFallback = (ytd > 0 ? (Math.random() * 15 + 5) : (Math.random() * 10 - 5));
            targetPrice = currentPrice * (1 + upsidePctFallback/100);
        }

        const upsidePct = currentPrice > 0 ? ((targetPrice / currentPrice) - 1) * 100 : 0;

        const formatCurrency = (val) => {
            if (val === 0 || isNaN(val)) return 'N/A';
            if (currency === 'USD') return '$' + val.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            else return '₩' + Math.round(val).toLocaleString();
        };

        const yearLabel = new Date().getFullYear(); 
        
        document.getElementById("stock-earnings-tbody").innerHTML = `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">${yearLabel-1} (Trailing) 실적 EPS</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600;">${formatCurrency(eps_trail)}</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">${yearLabel}(E) 연간 EPS 추정치</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600; color: #8b5cf6;">${formatCurrency(eps_0y)}</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">${yearLabel+1}(E) 연간 EPS 추정치</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600; color: #8b5cf6;">${formatCurrency(eps_1y)}</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">이번 분기 EPS 추정치</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600; color: #10b981;">${formatCurrency(eps_0q)}</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">다음 분기 EPS 추정치</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600; color: #10b981;">${formatCurrency(eps_1q)}</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">${yearLabel+1}(E) 증권사 컨센서스 Fwd P/E</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600;">${basePE.toFixed(1)}x</td></tr>
        `;

        document.getElementById("stock-target-tbody").innerHTML = `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">매크로 반영 Target P/E</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600;">${targetPE}x</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">현재가</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600;">${formatCurrency(currentPrice)}</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);"><td style="padding: 0.5rem 0; color: var(--text-muted);">적정 목표주가</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 600; color: #3b82f6;">${formatCurrency(targetPrice)}</td></tr>
            <tr><td style="padding: 0.5rem 0; color: var(--text-muted);">상승/하락 여력</td><td style="padding: 0.5rem 0; text-align: right; font-weight: 700; color: ${upsidePct >= 0 ? '#10b981' : '#ef4444'};">${upsidePct >= 0 ? '+' : ''}${upsidePct.toFixed(1)}%</td></tr>
        `;

        if (stockModal) {
            stockModal.classList.remove("hidden");
            stockModal.classList.add("fade-in");
        }
    };

    if (btnCloseStockModal) {
        btnCloseStockModal.addEventListener("click", () => {
            stockModal.classList.add("hidden");
        });
    }
    if (stockModal) {
        stockModal.addEventListener("click", (e) => {
            if (e.target === stockModal) {
                stockModal.classList.add("hidden");
            }
        });
    }

    // --- KOREA & US Greed & Fear Index Tab Logic ---
    let currentFGRegion = 'kr'; // 'kr' or 'us'
    let krFGData = null;
    let krFGAnalytics = null;
    let usFGData = null;
    let usFGAnalytics = null;

    let fgLineChartInstance = null;
    let fgCorrChartInstance = null;
    let fgReturnsChartInstance = null;

    window.switchFGRegion = function(region) {
        if (currentFGRegion === region) return;
        currentFGRegion = region;
        
        // Toggle active class on region buttons
        const btnKr = document.getElementById("fg-region-kr");
        const btnUs = document.getElementById("fg-region-us");
        if (btnKr && btnUs) {
            if (region === 'kr') {
                btnKr.classList.add("active");
                btnUs.classList.remove("active");
            } else {
                btnUs.classList.add("active");
                btnKr.classList.remove("active");
            }
        }
        
        // Redraw UI with the selected region's data
        updateFearGreedUI();
    };

    window.loadFearGreedData = async function() {
        if (krFGData && krFGAnalytics && usFGData && usFGAnalytics) {
            // Already loaded, just resize charts in case container dimensions changed
            setTimeout(() => {
                if (fgLineChartInstance) fgLineChartInstance.resize();
                if (fgCorrChartInstance) fgCorrChartInstance.resize();
                if (fgReturnsChartInstance) fgReturnsChartInstance.resize();
            }, 50);
            return;
        }

        try {
            console.log("Fetching KOREA & US Greed & Fear Index data...");
            const [resKrData, resKrAnalytics, resUsData, resUsAnalytics] = await Promise.all([
                fetch('./data/historical_index.json'),
                fetch('./data/analytics.json'),
                fetch('./data/us_historical_index.json'),
                fetch('./data/us_analytics.json')
            ]);
            
            if (!resKrData.ok || !resKrAnalytics.ok || !resUsData.ok || !resUsAnalytics.ok) {
                throw new Error("Failed to load Greed & Fear data files for KR or US.");
            }
            
            krFGData = await resKrData.json();
            krFGAnalytics = await resKrAnalytics.json();
            usFGData = await resUsData.json();
            usFGAnalytics = await resUsAnalytics.json();
            
            updateFearGreedUI();
            
            // Add change listener to period select if not already added
            const periodSelect = document.getElementById("fg-period-select");
            if (periodSelect) {
                periodSelect.addEventListener("change", function() {
                    drawFearGreedReturnsChart();
                });
            }
        } catch (err) {
            console.error("Error loading Greed & Fear data:", err);
            const compList = document.getElementById("fg-components-list");
            if (compList) {
                compList.innerHTML = `<div style="font-size: 0.75rem; color: #ef4444; text-align: center; padding: 2rem 0;">데이터 로드 실패: ${err.message}</div>`;
            }
        }
    };

    function updateFearGreedUI() {
        const data = currentFGRegion === 'kr' ? krFGData : usFGData;
        const analytics = currentFGRegion === 'kr' ? krFGAnalytics : usFGAnalytics;
        
        if (!data || data.length === 0) return;
        
        const currentRecord = data[data.length - 1];
        const indexVal = currentRecord.index;
        const state = currentRecord.state;
        
        // Update Title labels based on active region
        const gaugeTitle = document.getElementById("fg-gauge-title");
        if (gaugeTitle) {
            gaugeTitle.textContent = currentFGRegion === 'kr' ? "오늘의 한국 시장 심리 지표" : "오늘의 미국 시장 심리 지표";
        }
        
        const lineTitle = document.getElementById("fg-linechart-title");
        if (lineTitle) {
            lineTitle.textContent = currentFGRegion === 'kr' ? "KOSPI 지수 vs 공포 & 탐욕 지수 동향" : "S&P 500 지수 vs 공포 & 탐욕 지수 동향";
        }
        
        const legendPrice = document.getElementById("fg-legend-price");
        if (legendPrice) {
            legendPrice.textContent = currentFGRegion === 'kr' ? "KOSPI 지수" : "S&P 500 지수";
        }
        
        const corrTitle = document.getElementById("fg-corr-title");
        if (corrTitle) {
            corrTitle.textContent = currentFGRegion === 'kr' ? "지수의 선행성 검증 (시차 상관관계)" : "지수의 선행성 검증 (시차 상관관계)";
        }
        
        const corrDesc = document.getElementById("fg-corr-desc");
        if (corrDesc) {
            corrDesc.textContent = currentFGRegion === 'kr' 
                ? "지수(t)와 KOSPI 일일 수익률(t+Lag)의 상관계수 (R). Lag > 0 영역의 양의 상관계수는 지수의 미래 예측력(선행성)을 의미합니다."
                : "지수(t)와 S&P 500 일일 수익률(t+Lag)의 상관계수 (R). Lag > 0 영역의 양의 상관계수는 지수의 미래 예측력(선행성)을 의미합니다.";
        }
        
        const returnsTitle = document.getElementById("fg-returns-title");
        if (returnsTitle) {
            returnsTitle.textContent = currentFGRegion === 'kr' ? "지수 국면별 KOSPI 미래 평균 수익률 (백테스트)" : "지수 국면별 S&P 500 미래 평균 수익률 (백테스트)";
        }
        
        const returnsDesc = document.getElementById("fg-returns-desc");
        if (returnsDesc) {
            returnsDesc.textContent = currentFGRegion === 'kr'
                ? "지수 국면 진입 시점 이후 코스피 지수의 평균 수익률 비교 (10일 후 vs 20일 후)"
                : "지수 국면 진입 시점 이후 S&P 500 지수의 평균 수익률 비교 (10일 후 vs 20일 후)";
        }

        // Update index value text
        const valElem = document.getElementById("fg-index-val");
        if (valElem) valElem.textContent = indexVal.toFixed(1);
        
        // Korean state labels and colors
        const koreanStates = {
            "Extreme Fear": "극단적 공포",
            "Fear": "공포",
            "Neutral": "중립",
            "Greed": "탐욕",
            "Extreme Greed": "극단적 탐욕"
        };
        const stateColors = {
            "Extreme Fear": "#ef4444",
            "Fear": "#f97316",
            "Neutral": "#9ca3af",
            "Greed": "#84cc16",
            "Extreme Greed": "#10b981"
        };
        
        const stateLbl = document.getElementById("fg-state-lbl");
        if (stateLbl) {
            stateLbl.textContent = `${koreanStates[state] || state} (${state})`;
            stateLbl.style.color = stateColors[state] || "#9ca3af";
        }
        
        // Rotate gauge needle (-90deg for 0, 90deg for 100)
        const needle = document.getElementById("fg-needle");
        if (needle) {
            const angle = -90 + (indexVal / 100) * 180;
            needle.style.transform = `rotate(${angle}deg)`;
        }
        
        // Render 6 subcomponents
        const compList = document.getElementById("fg-components-list");
        if (compList) {
            compList.innerHTML = "";
            
            const krCompMeta = {
                momentum: { name: "시장 모멘텀", desc: "KOSPI vs 125일 이평선 비율", unit: "" },
                strength: { name: "주가 강도", desc: "KOSPI 52주 범위 위치 (%)", unit: "%" },
                breadth: { name: "주가 폭", desc: "OBV vs 125일 이평선 이격도", unit: "" },
                volatility: { name: "시장 변동성", desc: "20일 연율화 역사적 변동성 (%)", unit: "%" },
                safe_haven: { name: "안전자산 수요", desc: "주식 - 채권 20일 수익률차 (p.p)", unit: " p.p" },
                credit_spread: { name: "신용 스프레드", desc: "회사채(AA-) - 국고채 스프레드 (%)", unit: "%" }
            };
            
            const usCompMeta = {
                momentum: { name: "시장 모멘텀", desc: "S&P 500 vs 125일 이평선 비율", unit: "" },
                strength: { name: "주가 강도", desc: "S&P 500 52주 범위 위치 (%)", unit: "%" },
                breadth: { name: "주가 폭", desc: "OBV vs 125일 이평선 이격도", unit: "" },
                volatility: { name: "시장 변동성 (VIX)", desc: "VIX 지수 수준", unit: "" },
                safe_haven: { name: "안전자산 수요", desc: "S&P 500 - 10Y 국채 20일 수익률차", unit: " p.p" },
                credit_spread: { name: "정크본드 수요 (신용 스프레드)", desc: "HYG / IEF ETF 가격 비율", unit: "" }
            };
            
            const compMeta = currentFGRegion === 'kr' ? krCompMeta : usCompMeta;
            const components = currentRecord.components;
            
            Object.keys(compMeta).forEach(k => {
                if (!components[k]) return;
                const score = components[k].score;
                const raw = components[k].raw;
                const meta = compMeta[k];
                
                let barColor = "#9ca3af";
                if (score <= 25) barColor = "#ef4444";
                else if (score <= 45) barColor = "#f97316";
                else if (score <= 55) barColor = "#9ca3af";
                else if (score <= 75) barColor = "#84cc16";
                else barColor = "#10b981";
                
                const row = document.createElement("div");
                row.style.cssText = "display: flex; flex-direction: column; gap: 4px; padding-bottom: 0.35rem; border-bottom: 1px solid rgba(255,255,255,0.03);";
                row.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
                        <span style="font-weight: 700; color: var(--text-color);">${meta.name} <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 500;">(${meta.desc})</span></span>
                        <span style="font-weight: 700;">실측: ${raw.toLocaleString(undefined, {maximumFractionDigits: 2})}${meta.unit} | <span style="color: ${barColor};">점수: ${score.toFixed(0)}</span></span>
                    </div>
                    <div style="height: 5px; background: rgba(255,255,255,0.04); border-radius: 3px; overflow: hidden;">
                        <div style="width: ${score}%; height: 100%; background: ${barColor}; border-radius: 3px; transition: width 0.8s;"></div>
                    </div>
                `;
                compList.appendChild(row);
            });
        }
        
        // Draw the charts
        drawFearGreedCharts();
    }

    function drawFearGreedCharts() {
        const data = currentFGRegion === 'kr' ? krFGData : usFGData;
        const analytics = currentFGRegion === 'kr' ? krFGAnalytics : usFGAnalytics;
        if (!data || !analytics) return;
        
        const isDark = document.body.classList.contains("dark-theme") || !document.body.classList.contains("light-theme");
        const textColor = isDark ? '#94a3b8' : '#475569';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
        
        // 1. Line Chart: Price vs G&F Index
        const ctxLine = document.getElementById("fgLineChart").getContext("2d");
        const labels = data.map(d => d.date);
        const priceData = data.map(d => d.kospi);
        const indexData = data.map(d => d.index);
        
        const priceLabel = currentFGRegion === 'kr' ? 'KOSPI 지수 (좌축)' : 'S&P 500 지수 (좌축)';
        
        if (fgLineChartInstance) fgLineChartInstance.destroy();
        fgLineChartInstance = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: priceLabel,
                        data: priceData,
                        borderColor: '#f59e0b',
                        borderWidth: 1.5,
                        pointRadius: 0,
                        yAxisID: 'y-kospi',
                        tension: 0.1
                    },
                    {
                        label: '공포탐욕지수',
                        data: indexData,
                        borderColor: '#6366f1',
                        borderWidth: 2.2,
                        pointRadius: 0,
                        yAxisID: 'y-index',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: textColor, font: { family: 'Inter', size: 9 }, maxTicksLimit: 8 }
                    },
                    'y-kospi': {
                        type: 'linear',
                        position: 'left',
                        grid: { color: gridColor },
                        title: {
                            display: true,
                            text: priceLabel,
                            color: '#f59e0b',
                            font: { family: 'Inter', size: 9, weight: 'bold' }
                        },
                        ticks: { color: '#f59e0b', font: { family: 'Inter', size: 9 } }
                    },
                    'y-index': {
                        type: 'linear',
                        position: 'right',
                        min: 0,
                        max: 100,
                        grid: { drawOnChartArea: false },
                        title: {
                            display: true,
                            text: '공포 & 탐욕 지수 (우축)',
                            color: '#6366f1',
                            font: { family: 'Inter', size: 9, weight: 'bold' }
                        },
                        ticks: { color: '#6366f1', font: { family: 'Inter', size: 9 } }
                    }
                }
            }
        });
        
        // 2. Correlation Chart
        const ctxCorr = document.getElementById("fgCorrChart").getContext("2d");
        const corrLabels = analytics.cross_correlation.map(c => c.lag);
        const corrData = analytics.cross_correlation.map(c => c.r);
        
        const corrLabel = currentFGRegion === 'kr' ? 'KOSPI 상관계수 (R)' : 'S&P 500 상관계수 (R)';
        
        if (fgCorrChartInstance) fgCorrChartInstance.destroy();
        fgCorrChartInstance = new Chart(ctxCorr, {
            type: 'line',
            data: {
                labels: corrLabels,
                datasets: [{
                    label: corrLabel,
                    data: corrData,
                    borderColor: '#6366f1',
                    borderWidth: 2,
                    pointRadius: 1,
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: textColor, font: { family: 'Inter', size: 8 } }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { color: textColor, font: { family: 'Inter', size: 8 } }
                    }
                }
            }
        });
        
        // 3. Returns Bar Chart
        drawFearGreedReturnsChart();
    }

    function drawFearGreedReturnsChart() {
        const analytics = currentFGRegion === 'kr' ? krFGAnalytics : usFGAnalytics;
        if (!analytics || !analytics.subsequent_returns) return;
        
        const isDark = document.body.classList.contains("dark-theme") || !document.body.classList.contains("light-theme");
        const textColor = isDark ? '#94a3b8' : '#475569';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
        
        const periodSelect = document.getElementById("fg-period-select");
        const period = periodSelect ? periodSelect.value : "all";
        
        const returnData = analytics.subsequent_returns[period] || analytics.subsequent_returns["all"] || analytics.subsequent_returns;
        
        const ctxReturns = document.getElementById("fgReturnsChart").getContext("2d");
        const statesEng = ["Extreme Fear", "Fear", "Neutral", "Greed", "Extreme Greed"];
        const statesKo = ["극단적 공포", "공포", "중립", "탐욕", "극단적 탐욕"];
        
        const sub10Data = returnData.sub10 || analytics.subsequent_returns.sub10 || {};
        const sub20Data = returnData.sub20 || analytics.subsequent_returns.sub20 || {};
        
        const sub10 = statesEng.map(s => sub10Data[s] || 0);
        const sub20 = statesEng.map(s => sub20Data[s] || 0);
        
        if (fgReturnsChartInstance) fgReturnsChartInstance.destroy();
        fgReturnsChartInstance = new Chart(ctxReturns, {
            type: 'bar',
            data: {
                labels: statesKo,
                datasets: [
                    {
                        label: '10일 후',
                        data: sub10,
                        backgroundColor: '#818cf8',
                        borderRadius: 3
                    },
                    {
                        label: '20일 후',
                        data: sub20,
                        backgroundColor: '#6366f1',
                        borderRadius: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor, font: { family: 'Inter', size: 8 } }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { 
                            color: textColor, 
                            font: { family: 'Inter', size: 8 },
                            callback: function(value) { return value.toFixed(1) + '%'; }
                        }
                    }
                }
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // Event Listeners for Seed Money
    // ==========================================
    const inputSeedMoney = document.getElementById("input-seed-money");
    if (inputSeedMoney) {
        inputSeedMoney.addEventListener("input", triggerModelUpdate);
    }

    // ==========================================
    // API Settings Modal Logic
    // ==========================================
    const btnApiSettings = document.getElementById("btn-api-settings");
    const apiModal = document.getElementById("api-modal");
    const btnModalCancel = document.getElementById("btn-modal-cancel");
    const btnModalSave = document.getElementById("btn-modal-save");
    const inputApiKey = document.getElementById("input-api-key");
    
    // Load existing API key
    const savedKey = localStorage.getItem("macrocycle_gemini_api_key");
    if (savedKey && inputApiKey) {
        inputApiKey.value = savedKey;
    }

    if (btnApiSettings) {
        btnApiSettings.addEventListener("click", () => {
            if (apiModal) apiModal.classList.remove("hidden");
        });
    }
    if (btnModalCancel) {
        btnModalCancel.addEventListener("click", () => {
            if (apiModal) apiModal.classList.add("hidden");
        });
    }
    if (btnModalSave) {
        btnModalSave.addEventListener("click", () => {
            if (inputApiKey) localStorage.setItem("macrocycle_gemini_api_key", inputApiKey.value.trim());
            if (apiModal) apiModal.classList.add("hidden");
        });
    }

    // ==========================================
    // Chat Logic
    // ==========================================
    const btnToggleChat = document.getElementById("btn-toggle-chat");
    const chatWindow = document.getElementById("chat-window");
    const btnCloseChat = document.getElementById("btn-close-chat");
    const chatInput = document.getElementById("chat-input");
    const btnSendChat = document.getElementById("btn-send-chat");
    const chatMessages = document.getElementById("chat-messages");
    
    let chatHistory = [];

    if (btnToggleChat) {
        btnToggleChat.addEventListener("click", () => {
            if (chatWindow) chatWindow.classList.toggle("hidden");
        });
    }
    if (btnCloseChat) {
        btnCloseChat.addEventListener("click", () => {
            if (chatWindow) chatWindow.classList.add("hidden");
        });
    }

    function appendMessage(role, text) {
        if (!chatMessages) return;
        const msgDiv = document.createElement("div");
        if (role === "user") {
            msgDiv.className = "chat-message-user";
        } else {
            msgDiv.className = "chat-message-bot";
        }
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function appendTypingIndicator() {
        if (!chatMessages) return;
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing-indicator";
        typingDiv.id = "chat-typing-indicator";
        typingDiv.innerHTML = "<span></span><span></span><span></span>";
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingDiv = document.getElementById("chat-typing-indicator");
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    async function handleChatSend() {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;

        const apiKey = localStorage.getItem("macrocycle_gemini_api_key");
        if (!apiKey) {
            if (apiModal) apiModal.classList.remove("hidden");
            alert("Wall Street CIO와 대화하려면 먼저 Gemini API Key를 등록해주세요.");
            return;
        }

        appendMessage("user", text);
        chatInput.value = "";
        appendTypingIndicator();

        // Build Context
        const elTitle = document.getElementById("narrative-title");
        const currentPhase = elTitle ? elTitle.textContent : "Unknown";
        // fallback if activeRegion is not globally available in this scope, we can pull from UI
        let currentRegion = "한국 시장";
        const btnUs = document.getElementById("btn-region-us");
        if (btnUs && btnUs.classList.contains("active")) {
            currentRegion = "미국 시장";
        }
        
        const elCli = document.getElementById("val-cli");
        const elGdp = document.getElementById("val-gdp");
        const elRate = document.getElementById("val-rate");
        const cliVal = elCli ? elCli.textContent : "N/A";
        const gdpVal = elGdp ? elGdp.textContent : "N/A";
        const rateVal = elRate ? elRate.textContent : "N/A";
        const seedVal = inputSeedMoney ? inputSeedMoney.value : "100000000";

        const systemPrompt = `You are a legendary Wall Street Fund Manager and CIO. You act as a 'Devil's Advocate'. 
The user is viewing the MacroCycle dashboard.
Current context: 
- Target Market: ${currentRegion}
- Current Macro Phase: ${currentPhase}
- CLI: ${cliVal}, GDP Growth: ${gdpVal}, Policy Rate: ${rateVal}
- User's Seed Money: ${seedVal} KRW

You must:
1. Provide sharp, contrarian, and logical insights (Devil's advocate).
2. Answer in Korean.
3. Keep responses concise (under 150 words) but professional and highly actionable.
4. Recommend specific ticker ideas with exact investment amounts if appropriate.`;

        if (chatHistory.length === 0) {
            chatHistory.push({ role: "system", content: systemPrompt });
        }
        chatHistory.push({ role: "user", content: text });

        try {
            // Gemini Format conversion
            let geminiContents = [];
            let systemText = "";
            for (let i = 0; i < chatHistory.length; i++) {
                if (chatHistory[i].role === "system") {
                    systemText = chatHistory[i].content;
                } else {
                    geminiContents.push({
                        role: chatHistory[i].role === "assistant" ? "model" : "user",
                        parts: [{ text: chatHistory[i].content }]
                    });
                }
            }

            const modelsToTry = ["gemini-1.5-flash-latest", "gemini-1.5-pro-latest", "gemini-2.0-flash-exp"];
            let response = null;
            let lastErrData = null;
            
            for (const modelName of modelsToTry) {
                response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        systemInstruction: {
                            parts: [{ text: systemText }]
                        },
                        contents: geminiContents,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 400
                        }
                    })
                });
                
                if (response.ok) {
                    break;
                } else {
                    lastErrData = await response.clone().json();
                    if (lastErrData.error?.message?.includes("not found")) {
                        console.warn(`${modelName} not found, falling back...`);
                        continue;
                    } else {
                        break;
                    }
                }
            }

            removeTypingIndicator();

            if (!response.ok) {
                const errData = await response.json();
                console.error("Gemini Error:", errData);
                appendMessage("bot", `API Error: ${errData.error?.message || "Unknown error occurred"}`);
                chatHistory.pop(); // Remove failed user message
                return;
            }

            const data = await response.json();
            const botMessage = data.candidates[0].content.parts[0].text;
            
            appendMessage("bot", botMessage);
            chatHistory.push({ role: "assistant", content: botMessage });

        } catch (err) {
            removeTypingIndicator();
            appendMessage("bot", "Network Error: Failed to connect to Gemini API.");
            chatHistory.pop();
        }
    }

    if (btnSendChat) {
        btnSendChat.addEventListener("click", handleChatSend);
    }
    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleChatSend();
            }
        });
    }
});
