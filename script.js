// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Move to bottom of file after all function definitions

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');

        // Optional: Close others
        // document.querySelectorAll('.faq-item').forEach(item => {
        //     if (item !== faqItem) item.classList.remove('active');
        // });
    });
});

// ROI Calculator
const staffSlider = document.getElementById('staffCount');
const staffValue = document.getElementById('staffValue');
const salaryInput = document.getElementById('salary');
const monthlySavingDisplay = document.getElementById('monthlySaving');
const yearlySavingDisplay = document.getElementById('yearlySaving');
// const industrySelect = document.getElementById('industryType'); // Can be used for multipliers later

function calculateROI() {
    const staffCount = parseInt(staffSlider.value);
    const avgSalary = parseInt(salaryInput.value);

    // Logic: 40% efficiency gain
    // Savings = Staff * Salary * 40% * Adoption(0.8 conservative)
    // Let's simplified to: Staff * Salary * 0.4 (Maximum potential)
    // Or more conservative: Staff * Salary * 0.3 (Realistic)

    // User Prompt says: "Average work time 40% reduced"
    const efficiencyRate = 0.40;

    const monthlySaving = Math.round(staffCount * avgSalary * efficiencyRate);
    const yearlySaving = monthlySaving * 12;

    if (staffValue) staffValue.textContent = `${staffCount}명`;
    if (monthlySavingDisplay) monthlySavingDisplay.textContent = `약 ${monthlySaving.toLocaleString()}만원`;
    if (yearlySavingDisplay) yearlySavingDisplay.textContent = `약 ${yearlySaving.toLocaleString()}만원`;
}

if (staffSlider && salaryInput) {
    staffSlider.addEventListener('input', calculateROI);
    salaryInput.addEventListener('input', calculateROI);
    // Initialize
    calculateROI();
}


// Case Study Tabs
const caseTabs = document.querySelectorAll('.case-tab');
const caseData = {
    precision: {
        name: "(주) OO정밀",
        domain: "산업용 금속 부품 제조 (B2B 주문제작)",
        size: "22명",
        org: "영업팀 (4) / 생산관리팀 (6) / 품질관리팀 (4) / 구매·자재팀 (3) / 경영지원팀 (5)",
        metrics: {
            before_m: "620시간",
            after_m: "245시간",
            improvement: "60%",

            savings: "940만원",
            roi: "1074%",
            bep: "1.1개월"
        },
        rows: [
            ["영업팀 (4)", "신규 견적 요청(RFQ) 대응", "고객사로부터 도면·사양서를 받아 견적 산출 및 회신하는 핵심 매출 업무", "고객 이메일로 RFQ 수신 -> 도면(PDF/STEP) 다운로드 -> 파일명 규칙에 맞게 정리 -> 생산관리팀에 제조 가능 여부 문의 -> 구매·자재팀에 원자재 단가 요청 -> 과거 유사 견적 엑셀 검색 -> 신규 견적 엑셀 작성 -> PDF 변환 -> 이메일 회신 -> CRM 반영 업데이트", "120시간 / 300만원", "RFQ 메일 자동 감지 -> AI Agent가 견적 맥락 파악 및 도면/사양 자동 분류 -> 내부 단가 정책 및 견적 정책 조회/반영 -> 견적 초안서 및 개인화 답변 자동 생성 -> 담당자 검토 승인 -> 컨펌된 최종 견적서 및 메일 자동 발송 -> CRM 자동 업데이트", "20시간 / 50만원", "85% 절감 / 월 250만원 절감"],
            ["생산관리팀 (6)", "생산 일정 수립 및 조정 관리", "수주 물량에 맞춰 설비, 인력, 납기를 고려해 생산 일정을 수립·관리하는 업무", "영업팀 수주 정보 수신 -> 현재 생산 계획 확인 -> 현장 설비 가동률 확인 -> 기존 일정 및 현장 상황과 충돌 여부 확인 후 영업팀께 요청 납품일 및 수량 조정 -> 영업팀 조정 컨펌 후 생산 계획 및 가동률 최신 업데이트 -> 변경 내용 현장 공유", "200시간 / 500만원", "영업팀 문의 맥락 Ai agent 자동 파악 (일정/수량 등) -> agent 내부 자료 파악 (생산계획/납품일정/생산케파/가동률 등) -> ai agent 주요 체크 포인트 정리 및 상황 브리핑 보고 -> 담당자 체크 후 영업팀께 조정 요청 -> 컨펌 후 내부 자료 최신 업데이트 -> ai agent 생산 계획 및 출하 일정, 가동률 등 생산 관련 변경 내용 유관 부서 (현장/품질관리 등) 공유 메일 자동 작성 및 발신", "120시간 / 300만원", "40% 절감 / 월 200만원 절감"],
            ["품질관리팀 (4)", "불량 분석 및 품질 리포트 작성", "생산 중 발생한 불량을 분석하고 일/주/월간 품질 리포트 작성", "현장 불량 생산품 데이터 수집 -> 해당 데이터 엑셀 정리 -> 불량 유형 분류 -> 원인 분석 -> 일/주/월간 리포트 작성 및 배포", "60시간 / 150만원", "현장 불량 생산품 데이터 수집 -> 해당 데이터 엑셀 정리 -> 원인 분석 -> ai agent의 일/주/월간 리포트 자동 작성 및 배포", "25시간 / 62만원", "60% 절감 / 월 90만원 절감"],
            ["구매·자재팀 (3)", "원자재 발주 및 재고 관리", "필요 자재를 현장/영업 상황 등에 따라 적시에 발주하고 재고를 관리", "생산 계획 확인 -> 재고 엑셀 확인 -> 재고 소진 추이 파악 -> 자재 부족 시기 추론 -> 거래처 이메일 발주 -> 거래처의 납기 일정 및 물량 확인 -> 입고 후 재고 데이터 업데이트", "160시간 / 400만원", "ai agent 생산 계획 자료 / 현장 자료 (가동률 등) 실시간 업데이트 확인 -> 필요 자재 자동 계산 후 재고 소진 흐름 자동 파악 및 발주 메일 초안 자동 생성 -> 담당자 검토 승인 -> 거래처 이메일 자동 발송", "60시간 / 150만원", "60% 절감 / 월 250만원 절감"],
            ["경영지원팀 (5)", "증빙 서류 관리 및 지출 결의 업무", "전 부서에서 발생하는 영수증 및 세금계산서를 수거하여 ERP에 입력하고 지출 내역을 정리 및 집행", "종이 영수증 / 메일 영수증 수거 -> 카테고리 분류 -> ERP 시스템 수동 입력 -> 지출 결의서 작성 -> 대표자 결재 요청 -> 집행", "80시간 / 200만원", "모바일 촬영 또는 메일 수신 시 AI OCR이 항목/금액 자동 추출 -> ERP 데이터 자동 등록 및 임시 저장 -> 담당자 검토 승인 -> 자동 지출결의서 작성 -> 대표자 결재 요청 -> 집행", "20시간 / 50만원", "75% 절감 / 월 150만원 절감"]
        ]
    },
    note: {
        name: "(주) OOO노트",
        domain: "B2B SaaS (업무 협업·문서 관리 툴)",
        size: "16명",
        org: "개발팀 (6) / 기획·운영팀 (4) / 세일즈팀 (3) / 경영지원팀 (2)",
        metrics: {
            before_m: "410시간",
            after_m: "200시간",
            improvement: "51%",

            savings: "525만원",
            roi: "787%",
            bep: "1.5개월"
        },
        rows: [
            ["개발팀 (6)", "릴리즈 노트 및 기술/형상 관리 문서화", "신규 기능 및 수정 사항을 고객과 내부에 공유하기 위한 릴리즈 노트 작성 및 자산화", "기능 목록 취합 -> 커밋 로그 및 PR 확인 -> 변경 사항 요약 정리 -> 문서화 -> 게시", "60시간 / 150만원", "Git 로그 자동 수집 -> AI가 변경 사항 파악 및 요약 -> 릴리즈 노트 초안 자동 생성 -> 담당자 검토 후 자동 게시", "20시간 / 50만원", "65% 개선 / 월 100만원 절감"],
            ["기획·운영팀 (4)", "VOC 관리", "고객 문의 정리 및 적절한 부서 전달 및 리포트 작성", "채널별 문의 접수 -> 유형 분류 및 기록 -> 우선순위 판단 -> 관계 부서 전달 -> VOC 업데이트 -> 리포트 배포", "150시간 / 375만원", "RAG 기반 AI agent 1차 대응 -> VOC 케이스 자동 등록 및 요약 -> 관계 부서 자동 전달 -> 리포트 자동 작성", "60시간 / 150만원", "60% 개선 / 월 220만원 절감"],
            ["세일즈팀 (3)", "데모/견적 상담 대응 및 CRM 관리", "잠재 고객 문의 처리 및 서비스 설명/상담 진행 등 리드 관리", "데모&견적 요청 접수 -> CRM 등록 -> 고객 배경 지식 파악 -> 1차 상담 및 미팅 조율 -> 후속 관리", "200시간 / 500만원", "rag 기반 AI agent 맥락 파악 -> CRM 자동 등록 -> 업체 배경 조사 및 요약 -> 1차 답변 생성 (견적서 등)", "120시간 / 300만원", "40% 개선 / 월 200만원 절감"]
        ]
    },
    flow: {
        name: "(주) OO플로우",
        domain: "B2C 종합 셀러 커머스사",
        size: "22명",
        org: "상품MD팀 (4) / CS운영팀 (5) / 물류·발주관리팀 (4) 등",
        metrics: {
            before_m: "360시간",
            after_m: "140시간",
            improvement: "61%",

            savings: "550만원",
            roi: "733%",
            bep: "1.6개월"
        },
        rows: [
            ["상품MD팀 (4)", "신규 상품 기획 및 기존 상품 시장 대응", "신상품 소싱 및 시장 가격 모니터링", "경쟁/대체 상품 시장 조사 -> 판매 전략 수정 -> 변경 이력 기록 -> 사내 공유", "200시간 / 500만원", "AI agent 시장 조사 및 인사이트 리포트 자동 제작 -> 담당자 검토 -> 판매 전략 수정 -> 사내 공유", "80시간 / 200만원", "60% 개선 / 월 300만원 절감"],
            ["CS운영팀 (5)", "클레임/리뷰 관리", "악성 리뷰 및 클레임 대응 관리", "리뷰 모니터링 -> 클레임 분류 -> 대응 문구 작성 -> 개선 사항 공유", "60시간 / 150만원", "각 채널 리뷰 자동 수집 -> 감정 분석 -> AI 초안 답변 제시 -> 시장 반응 리포트 자동 작성", "20시간 / 50만원", "65% 개선 / 월 100만원 절감"],
            ["물류·발주관리팀 (4)", "발주 및 재고 관리", "판매량 기반 발주 및 재고 관리", "플랫폼별 판매 데이터 확인 -> 재고 자료 관리 -> 재고 소진 추이 파악 -> 공급사 발주 계획 수립", "100시간 / 250만원", "판매 데이터 자동 집계 -> RAG 기반 AI 수요 예측 -> 발주 시기 및 수량 추천 -> 발주서/메일 자동 발송", "40시간 / 100만원", "60% 개선 / 월 150만원 절감"]
        ]
    },
    wave: {
        name: "(주) OOO웨이브",
        domain: "퍼포먼스 중심 마케팅 에이전시",
        size: "23명",
        org: "AE/영업팀 (4) / 마케팅 운영팀 (7) / 콘텐츠팀 (4) / 데이터/리포트팀 (3) 등",
        metrics: {
            before_m: "485시간",
            after_m: "174시간",
            improvement: "64%",

            savings: "850만원",
            roi: "850%",
            bep: "1.4개월"
        },
        rows: [
            ["AE/영업팀 (4)", "고객 미팅 정리 및 니즈 구조화", "고객 요구사항 구조화 및 마케팅 전략 기초 설계", "미팅 진행 -> 메모/녹취 -> 니즈 정리 -> 내부 문서 작성 -> 유관팀 전달", "100시간 / 250만원", "미팅 녹취 자동 수집 -> AI agent 핵심 목표 요약 -> 표준 브리프 문서 자동 생성 -> 관련 팀 자동 공유", "40시간 / 100만원", "60% 개선 / 월 150만원 절감"],
            ["마케팅 운영팀 (7)", "고객 주간 리포트 작성", "캠페인 지표 데이터 취합 및 리포트 작성", "지표 데이터 취합 -> 엑셀 가공 -> PPT 작성 -> 문구 수동 작성", "160시간 / 400만원", "데이터 자동 집계 -> AI 요약·해석 -> 리포트 초안 자동 생성 -> 담당자 검토", "60시간 / 150만원", "60% 개선 / 월 250만원 절감"],
            ["콘텐츠팀 (4)", "콘텐츠 레퍼런스 수집 및 아이디어 자산화", "SNS/광고 레퍼런스 탐색 및 분류", "광고 직접 탐색 -> 캡처/스크랩 -> 유형 태깅 및 분류", "80시간 / 200만원", "키워드 기반 자동 수집 -> 유형별 태깅 및 분류 -> 인사이트 브리프 초안 자동 작성", "10시간 / 25만원", "88% 개선 / 월 175만원 절감"],
            ["데이터/리포트팀 (3)", "캠페인 성과 패턴 분석 & 자산화", "캠페인 성과 데이터 분석 및 인사이트 축적", "데이터 수집 -> 엑셀 정리 -> 경험 기반 분석 및 인사이트 도출 -> 자산화", "120시간 / 300만원", "AI Agent 성과 분석 및 자동 분류 -> 성공/실패 요인 요약 -> 인사이트 브리프 자동 생성 -> 유관팀 자산화", "40시간 / 100만원", "65% 개선 / 월 200만원 절감"],
            ["경영지원팀 (4)", "업무 경비 정산 처리", "임직원 영수증 수집, 검증 및 정산 처리", "증명 자료 제출 -> 수작업 검증 -> 문서 정리 및 등록 -> 승인", "25시간 / 62.5만원", "자료 제출 -> AI OCR 자동 검증 및 정보 추출 -> 자동 분류 및 시스템 입력", "4시간 / 10만원", "85% 개선 / 월 50만원 절감"]
        ]
    }
};

// Continue with rest of script.js...
// (케이스 탭 등 나머지 코드는 기존과 동일)

function updateCaseContent(caseKey) {
    const data = caseData[caseKey];
    if (!data) return;

    const contentDiv = document.getElementById('caseContent');
    let rowsHtml = '';
    data.rows.forEach(row => {
        rowsHtml += `
            <tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td>${row[4]}</td>
                <td>${row[5]}</td>
                <td>${row[6]}</td>
                <td class="highlight-red">${row[7]}</td>
            </tr>
        `;
    });

    contentDiv.innerHTML = `
        <div class="case-detail-view active">
            <div class="case-summary-grid">
                <div class="info-row"><span class="info-label">기업명</span><span class="info-value">${data.name}</span></div>
                <div class="info-row"><span class="info-label">사업 영역</span><span class="info-value">${data.domain}</span></div>
                <div class="info-row"><span class="info-label">회사 규모</span><span class="info-value">${data.size}</span></div>
                <div class="info-row"><span class="info-label">조직 구성</span><span class="info-value">${data.org}</span></div>
            </div>
            
            <div class="metrics-container">
                <div class="comparison-grid">
                    <div class="comparison-card before">
                        <span class="c-label">AS-IS (도입 전 월 업무 비용)</span>
                        <span class="c-value">${data.metrics.before_m}</span>
                    </div>
                    <div class="comparison-card after">
                        <span class="c-label">TO-BE (도입 후 예상 월 업무 비용)</span>
                        <span class="c-value">${data.metrics.after_m}</span>
                    </div>
                </div>
                
                <div class="metrics-summary-bar">
                    <div class="metric-stat">
                        <span class="ms-label">총 생산성 개선율</span>
                        <span class="ms-value highlight">${data.metrics.improvement}</span>
                    </div>

                    <div class="metric-stat">
                        <span class="ms-label">월 절감 비용</span>
                        <span class="ms-value">${data.metrics.savings}</span>
                    </div>
                    <div class="metric-stat">
                        <span class="ms-label">ROI (연)</span>
                        <span class="ms-value highlight">${data.metrics.roi}</span>
                    </div>
                    <div class="metric-stat">
                        <span class="ms-label">BEP</span>
                        <span class="ms-value">${data.metrics.bep}</span>
                    </div>
                </div>
            </div>

            <div class="table-responsive">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>부서명</th><th>부서 핵심 업무</th><th>업무 설명</th><th>업무 흐름 구성</th><th>월 업무 소요 시간</th><th>도입 후 워크플로우</th><th>도입 후 월 업무 시간</th><th>생산성 개선 지수</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
        </div>
    `;
}

caseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        caseTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateCaseContent(tab.dataset.case);
    });
});

// Service Detail Tabs
const serviceTabs = document.querySelectorAll('.service-tab');
const serviceViewData = {
    consulting: {
        title: "컨설팅형 Service",
        intro: "컨설팅형 서비스는",
        desc: "조직별 전반적인 업무, 자산, 협업, 리소스 현황을 파악하여 조직 벡터·자산화·협업·업무 자동화 등 각 영역에 대한 생산성 분석을 합니다. 이를 바탕으로 숨겨진 생산성 개선 기회를 포착하고 AI 업무 자동화 도입이 적절한 영역에 대한 제안을 합니다.<br>제안을 통해 실제 생산성 개선 기대 수치 및 효과 (업무 리소스 감소 / 인건비 절감 기대치)를 숫자로 명확히 제시합니다.",
        processTitle: "컨설팅형 프로세스",
        processType: "v3", // 7-step Title+Detail layout
        processStepsV3: [
            { title: "상담 및 계약", details: ["의뢰 회사의 니즈 & 요구사항 & 상황 등을 파악합니다.", "컨설팅 범위 및 방향에 대해 조율 후 견적 & 계약합니다."] },
            { title: "파악 및 진단", details: ["회사의 협업 도구 & 사용 방식 & 개별 업무 흐름 등을 상세히 파악 및 분석합니다."] },
            { title: "분석 결과 &<br>개선 제안 리포트", details: ["분석한 내용을 바탕으로 영역별 개선안을 제안합니다."] },
            { title: "개선 도입 계약", details: ["협업 생산성 영역 / 업무 자동화 영역, 각 영역에 대한 개선 도입 여부를 결정하고 계약합니다."] },
            { title: "구축 & 개발", details: ["영역별 시스템 구축을 시작합니다.", "<strong>협업 생산성 영역</strong>: 산업 및 업무 방식, 사내 환경에 적합한 협업 도구 조합 설정 / 도구 규칙 및 프로세스 매뉴얼 구축", "<strong>AI agent 업무 자동화 영역</strong>: 개별 업무 흐름 파악 및 AI 자동화 워크플로우 개발 / 워크플로우 사용 매뉴얼 구축"] },
            { title: "도입", details: ["회사에 적용 및 도입합니다."] },
            { title: "체화 헬프<br>(워크숍)", details: ["새로 도입된 협업 도구 및 규칙, AI 워크플로우가 회사에 원활히 정착될 수 있도록 교육 및 주기적 워크숍을 진행합니다."] }
        ],
        deliverables: {
            show: true,
            description: "컨설팅형 서비스는 조직의 전반적인 업무 / 자산화 / 협업 방식의 현황과 생산성에 대해 파악하고 비효율 요인을 분석합니다. 분석/진단한 내용을 바탕으로 최적의 업무 체계 (협업 도구 조합 및 협업 체계 & AI 업무 자동화 도입이 적절한 업무 영역) 도입을 제안을 합니다.",
            buttonText: "실제 리포트 보기",
            buttonUrl: "https://drive.google.com/file/d/1H1wDURA8ulfivrgc4PTyYwtHs6izK48d/view?usp=sharing"
        },
        pricing: [
            ["5인 미만", "300만원 ~"],
            ["15인 미만", "500만원 ~"],
            ["25인 미만", "700만원 ~"],
            ["25인 이상", "Let's Talk"]
        ]
    },
    development: {
        title: "개발의뢰형 Service",
        intro: "개발의뢰형 서비스는",
        desc: "고객의 구체적인 요구 사항이 있는 업무 영역에 대한 순수 자동화 인프라 세팅 및 개발을 해드리는 서비스 입니다.",
        processTitle: "개발의뢰형 프로세스",
        processType: "v3",
        processStepsV3: [
            { title: "기초 상담 및 계약", details: ["NDA 포함 용역 계약 체결"] },
            { title: "상세 요구 분석 및<br>업무 협약", details: ["상세 요구사항을 파악하고 개발 범위를 확정합니다."] },
            { title: "개발 및 POC", details: ["자동화 프로세스 개발 및 성능을 확인합니다.", "납품 확인 및 온보딩 문서 준비"] },
            { title: "납품", details: ["최종 워크플로우를 납품하고 온보딩을 진행합니다."] }
        ],
        deliverables: {
            show: true,
            description: "요구사항에 맞는 자동화 워크플로우를 제공하며 해당 워크플로우 납품에 대한 납품 확인 및 온보딩 서류를 결과물로 제공드립니다.",
            buttonText: "예시 양식 확인하기",
            buttonUrl: "https://unmarred-quark-f2a.notion.site/OOOO-AI-2cc9000843828006a11ef97849999c83?source=copy_link"
        },
        pricing: [
            ["Custom", "Let's Talk"]
        ]
    },
    training: {
        title: "기업 역량 교육 / 강의 Service",
        intro: "기업 역량 교육 / 강의 서비스는",
        desc: "이론이 아닌 실제 업무 개선 사례를 기준으로 구성원이 직접 자동화와 AI 활용 역량을 내재화 하도록 돕는 실전 중심 교육을 제공합니다. <br>또한 AI 업무 자동화를 넘어 조직 문화, 협업 방식, 자산화 도구 활용 등 조직 생산성 전반에 대한 강의를 제공합니다.<br><br>이러한 분야에 대한 전문적 강의가 필요한 곳은 편하게 연락 부탁드립니다.",
        deliverables: {
            show: false  // No deliverables section
        },
        pricing: [
            ["Custom", "Let's Talk"]
        ]
    },
    maintenance: {
        title: "유지 보수 및 생산성 자문 Service",
        intro: "유지 보수 및 생산성 자문 서비스는",
        desc: "컨설팅 또는 개발 의뢰를 진행했던 고객님을 대상으로 자동화 인프라 & 에셋 관리, 워크플로우 유지 보수, 정기 자동화 상담 및 자문, 조직화/협업 방식 및 도구/자산화 관련 자문을 제공하는 서비스입니다. ",
        features: [
            "납품 자동화 인프라 및 에셋 관리",
            "납품 워크플로우 안정적 실행 책임 관리",
            "납품 워크플로우 사용에 대한 개선 성과 리포팅 (주 1회)",
            "회사내 AI 자동화 업무에 대한 정기적 상담 및 자문 (주 1회)",
            "타 생산성 영역 (조직화/협업 방식 및 도구/자산화 등)에 대한 자문 (주 1회)"
        ],
        deliverables: {
            show: true,
            description: null,  // No description, just button
            buttonText: "예시 양식 확인하기",
            buttonUrl: "https://drive.google.com/file/d/19qSX_g0YEWevPoHP3Afzoyy-zrgDEM9T/view?usp=sharing"
        },
        pricing: [
            ["월", "200만원(vat 별도)", ["* 6개월 선입시 20% 할인", "* 포트폴리오 활용 & 레퍼런스 체크 동의시 20% 할인"]]
        ]
    }
};

function updateServiceView(key) {
    const data = serviceViewData[key];
    const view = document.getElementById('view-consulting'); //Reusing the same container structure
    if (!data || !view) return;

    view.querySelector('h1').textContent = data.title;
    view.querySelector('.service-intro-section h3').textContent = data.intro;

    // Description with optional features list
    let descriptionHtml = `<p>${data.desc}</p>`;
    if (data.features) {
        descriptionHtml += '<ul class="feature-list" style="margin-top: 1.5rem; text-align: left; display: inline-block; list-style-type: none; padding: 0;">';
        data.features.forEach(f => {
            descriptionHtml += `<li style="margin-bottom: 0.8rem; font-size: 1.1rem; color: #555;">• ${f}</li>`;
        });
        descriptionHtml += '</ul>';
    }
    view.querySelector('.service-intro-section p').innerHTML = descriptionHtml;

    // Process Section - Handle v1 and v2 layouts
    const processSection = view.querySelector('.process-section');
    if (data.steps || data.processSteps || data.processStepsV3) {
        processSection.style.display = 'block';
        view.querySelector('.process-container h3').textContent = data.processTitle;
        const processContainer = view.querySelector('.process-container');

        let processHtml = '';

        // V3 Layout (7-step Title+Detail layout)
        if (data.processType === 'v3' && data.processStepsV3) {
            processHtml = '<div class="process-grid-new">';
            data.processStepsV3.forEach((step, i) => {
                const stepHtml = `
                    <div class="${step.isNext ? 'process-column-next' : 'process-column'}">
                        ${step.isNext ? '<div class="next-arrow-down">↓</div>' : ''}
                        <div class="${step.isNext ? 'process-column' : ''}">
                            <div class="step-title-box">${step.title}</div>
                            <div class="step-detail-box">
                                <ul>
                                    ${step.details.map(d => `<li>${d}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                processHtml += stepHtml;
                if (!step.isNext && i < data.processStepsV3.length - 1 && !data.processStepsV3[i + 1].isNext) {
                    processHtml += '<div class="process-arrow-new">→</div>';
                }
            });
            processHtml += '</div>';
        }
        // V2 Layout (new two-row layout)
        else if (data.processType === 'v2' && data.processSteps) {
            processHtml = '<div class="process-map-v2">';

            // Row 1: Process Flow
            processHtml += '<div class="process-flow-row">';
            data.processSteps.forEach((step, i) => {
                processHtml += `
                    <div class="process-step-v2 ${step.highlight ? 'highlight' : ''}">
                        <div class="step-box">${step.box}</div>
                    </div>
                `;
                if (i < data.processSteps.length - 1) {
                    processHtml += '<div class="step-arrow-v2">→</div>';
                }
            });
            processHtml += '</div>'; // Close process-flow-row

            // Row 2: Details and Deliverables
            if (data.processDetails) {
                processHtml += '<div class="process-details-row">';
                data.processDetails.forEach((detail, i) => {
                    // Detail column
                    processHtml += '<div class="detail-column">';
                    if (detail) {
                        if (detail.type === 'detail') {
                            processHtml += `
                                <div class="detail-box">
                                    <div class="detail-label">세부 내용</div>
                                    <div class="detail-content">${detail.content}</div>
                                </div>
                            `;
                        } else if (detail.type === 'deliverable') {
                            processHtml += `
                                <div class="deliverable-box">
                                    <div class="detail-label">결과물</div>
                                    <div class="detail-content">${detail.content}</div>
                                </div>
                            `;
                        } else if (detail.type === 'both') {
                            processHtml += `
                                <div class="detail-box">
                                    <div class="detail-label">세부 내용</div>
                                    <div class="detail-content">${detail.detail}</div>
                                </div>
                                <div class="deliverable-box">
                                    <div class="detail-label">결과물</div>
                                    <div class="detail-content">${detail.deliverable}</div>
                                </div>
                            `;
                        }
                    }
                    processHtml += '</div>'; // Close detail-column

                    // Add arrow spacer between columns (except after last one)
                    if (i < data.processDetails.length - 1) {
                        processHtml += '<div class="arrow-spacer"></div>';
                    }
                });
                processHtml += '</div>'; // Close process-details-row
            }

            processHtml += '</div>'; // Close process-map-v2
        }
        // V1 Layout (old single-row layout for training)
        else if (data.steps) {
            processHtml = '<div class="process-map">';
            data.steps.forEach((s, i) => {
                processHtml += `
                    <div class="process-step ${s.highlight ? 'highlight' : ''}">
                        <div class="step-box">${s.box}</div>
                        ${s.desc ? `<div class="step-desc">${s.desc}</div>` : ''}
                    </div>
                    ${i < data.steps.length - 1 ? '<div class="step-arrow">→</div>' : ''}
                `;
            });
            processHtml += '</div>';
        }

        // Find or create the process map container
        let processMapContainer = processContainer.querySelector('.process-map, .process-map-v2, .process-grid-new');
        if (processMapContainer) {
            processMapContainer.outerHTML = processHtml;
        } else {
            const h3 = processContainer.querySelector('h3');
            h3.insertAdjacentHTML('afterend', processHtml);
        }
    } else {
        processSection.style.display = 'none';
    }

    // Deliverables Section
    const deliverablesSection = view.querySelector('.deliverables-section');
    if (data.deliverables && data.deliverables.show) {
        deliverablesSection.style.display = 'block';

        // Update description if exists
        const descPara = deliverablesSection.querySelector('p');
        if (data.deliverables.description) {
            descPara.textContent = data.deliverables.description;
            descPara.style.display = 'block';
        } else {
            descPara.style.display = 'none';
        }

        // Update button
        const ctaCenter = deliverablesSection.querySelector('.cta-center');
        ctaCenter.innerHTML = `
            <a href="${data.deliverables.buttonUrl}" target="_blank" class="btn btn-dark">${data.deliverables.buttonText}</a>
        `;
    } else {
        deliverablesSection.style.display = 'none';
    }

    // Pricing Section
    const pricingGrid = view.querySelector('.pricing-grid');
    const separatorHtml = '<div class="price-separator"></div>';
    let pricingHtml = '';

    data.pricing.forEach((p, i) => {
        let noteHtml = '';
        if (p[2]) { // If notes exist
            noteHtml = `<div class="price-tier-notes">
                 ${p[2].map(n => `<p>${n}</p>`).join('')}
             </div>`;
        }

        pricingHtml += `
            <div class="price-card">
                <span class="p-tier">${p[0]}</span>
                <span class="p-value">${p[1]}${p[1].includes('Talk') || p[1].includes('무료') || p[1].includes('vat') ? '' : '<br><small>(vat 별도)</small>'}</span>
                ${noteHtml}
            </div>
        `;
        if (i < data.pricing.length - 1) {
            pricingHtml += separatorHtml;
        }
    });

    const ctaHtml = `
        <div class="price-cta">
            <a href="contact.html" class="btn btn-dark">문의하기</a>
        </div>
    `;

    pricingGrid.innerHTML = pricingHtml + ctaHtml;
}

serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        serviceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateServiceView(tab.dataset.service);
    });
});

// Case Study Auto-scroll
const scrollWrapper = document.querySelector('.case-scroll-wrapper');
const cards = document.querySelectorAll('.case-summary-card');

if (scrollWrapper && cards.length > 0) {
    let currentIndex = 0;
    let isPaused = false;
    let autoScrollInterval;

    const scrollToIndex = (index) => {
        const card = cards[index];
        if (!card) return;

        // Calculate center position for scroll-snap center
        const wrapperRect = scrollWrapper.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const scrollLeft = card.offsetLeft - (wrapperRect.width / 2) + (cardRect.width / 2);

        scrollWrapper.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    };

    const startAutoScroll = () => {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            if (!isPaused) {
                currentIndex = (currentIndex + 1) % cards.length;
                scrollToIndex(currentIndex);
            }
        }, 4000);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    scrollWrapper.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    scrollWrapper.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Optional: Reset interval on manual scroll
    scrollWrapper.addEventListener('scroll', () => {
        // Simplified detection of manual involvement
        // We don't want to reset purely on auto-scroll, but hard to distinguish without flags
    }, { passive: true });

    startAutoScroll();

    // Navigation Buttons
    const prevBtn = document.querySelector('.scroll-nav-btn.prev');
    const nextBtn = document.querySelector('.scroll-nav-btn.next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            scrollToIndex(currentIndex);
            stopAutoScroll();
            startAutoScroll(); // Reset timer
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            scrollToIndex(currentIndex);
            stopAutoScroll();
            startAutoScroll(); // Reset timer
        });
    }
}

// Team Tabs
const teamTabs = document.querySelectorAll('.team-tab');
const teamViews = document.querySelectorAll('.team-view');

if (teamTabs.length > 0) {
    teamTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTeam = tab.dataset.team;

            // Update buttons
            teamTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update views
            teamViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === `view-${targetTeam}`) {
                    view.classList.add('active');
                }
            });
        });
    });
}

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// AI Comparison Tabs
function openTab(evt, tabName) {
    // Hide all tab panels
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Deactivate all tab buttons
    const tabButtons = document.querySelectorAll('.tab-item');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const targetPanel = document.getElementById(tabName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }

    // Activate clicked button
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

// Handle URL Parameters and Initial Content State
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const caseType = urlParams.get('case');
    const serviceType = urlParams.get('service');

    // Handle Cases Page Tabs
    if (caseType && window.location.pathname.includes('cases.html')) {
        const targetTab = document.querySelector(`.case-tab[data-case="${caseType}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }

    // Handle Service Page Tabs
    if (window.location.pathname.includes('service.html')) {
        if (serviceType) {
            const targetTab = document.querySelector(`.service-tab[data-service="${serviceType}"]`);
            if (targetTab) {
                targetTab.click();
            } else {
                // Fallback to default if param exists but tab not found
                updateServiceView('consulting');
            }
        } else {
            // No param or default landing: update view for currently active tab
            const activeTab = document.querySelector('.service-tab.active') || document.querySelector('.service-tab');
            if (activeTab) {
                updateServiceView(activeTab.dataset.service);
            }
        }
    }
});
