# 다온 웹도구 전수 실행·보완 기록

검사일: 2026-10-25 (한국시간)

- 레퍼런스 목록190개: 브라우저에서 개별 입력·파일 선택·실행·결과 확인190/190 완료
- 추가 옵션·조작: 54/54 통과
- 자동 테스트:14개 테스트 그룹 통과 (계산기94개 예시, 경계값,190개 화면,PDF 페이지 보존 등)
- 파일은 합성 샘플과 공개 라이브러리 테스트 파일을 사용했습니다. 개인 파일·계정 비밀을 검사 데이터로 사용하지 않았습니다.

## 검사 방법

각 도구의 실제 화면에서 값을 입력하거나 파일을 선택하고 실행했습니다. 계산 결과·다운로드 파일명과 크기·미리보기를 확인했습니다. PDF 생성 경로는 생성한 바이트를 브라우저 PDF 엔진으로 다시 읽어 페이지 수와 크기를 확인했습니다. 추가 옵션 사례는 예상 문구·파일 형식·페이지 수와 비교했습니다. 표의 통과는 기재한 입력과 샘플 범위의 실행 결과이며, 형식별 제한은 아래와 각 도구 화면에 표시합니다.

## 수정한 오류

1. 다중 페이지 PDF 여백·용지변환·모아찍기·소책자에서 첫 페이지만 임베딩하던 문제를 수정했습니다.4페이지 원본 전체 포함 여부와 배치별 PDF 객체 수를 자동 검증합니다.
2. 압축 도구의 JPEG 기본값과 입력 옵션이 다른 도구에 전파되던 공통 객체 공유 문제를 수정했습니다. 도구별 설정 객체를 분리했습니다.
3. 문서 뷰어의 복사 내용이 완료 문구였던 동작을 본문 복사·저장으로 개선했습니다. 해시 복사는 알고리즘 설명 없이 순수 해시를 복사합니다.
4. 급여의 보험료 자동 산정,ROI 입력 의미,더치페이 올림·할인·정산 잔액,월말 퇴직의3개월 일수 등 계산 동작을 보완했습니다.
5. 삽입된 줄 때문에 이후 줄까지 모두 다른 것으로 처리하던 비교를 줄·단어·문자 단위 차이 알고리즘으로 교체했습니다.
6. 음수 체중·영양 비율·잘못된 날짜·범위 밖 크기·상하한 역전 등 의미 없는 결과를 방지했습니다.

## 추가·보완한 기능

- 계산: 만 나이·윤년·달력 기간,월 적립 복리·과세,차량 선수금·잔존가치·부분 무이자,신규 대출DSR·입력 한도LTV/DTI,중개보수 구간,월세 공제 구간,청약 기간별 점수,퇴직금 상여·연차 반영,보험료·사업주 부담,발표 원고·걸음수·근무일수 선택 등
- 텍스트: URL-safe Base64,파일SHA 해시,문자·단어 비교와 파일 입력,자연순·숫자순 정렬,중복·빈줄 동시 정리,전체URL 변환,HEX ID,복성·영문 이름 순서,문자 종류별 비밀번호·추첨,QR 색상·SVG,키워드 빈도
- 문서: DOC·XLS·PPT 본문 읽기,압축HWP5,HWPX,TIFF 다중 프레임,EPUB spine 순서·챕터 전환,DOCX 제목·목록·표 Markdown,본문·CSV/TSV 저장
- 이미지: 임의각 회전,비율 잠금·배율,맞춤 크기·간격·바깥 여백·투명 배경,로고 워터마크·색상·불투명도,RGB/HSL 픽셀 정보,압축 전후 크기 비교
- PDF: 방향·용지·확대·간격·비대칭 여백,번호 형식·위치·글꼴 크기,색상·각도·투명도 워터마크,직접 그린 서명,파일·썸네일 순서 변경,추출/각 페이지 분할 선택,이미지 재구성 압축,생성PDF 재열기,범용 변환 입력 확장,취소 요청,모델 없는 핵심문장 추출과 WebGPU 생성형AI

## 지원 범위

- DOC97이상·PPT의 현재 슬라이드·XLS 본문/셀을 추가했습니다. 암호·난독화·매크로 실행은 지원하지 않습니다. 구형 문서의 그림·인쇄 배치·애니메이션 보존은 제한됩니다.
- Office/HWP/XPS→PDF는 본문 재구성이며 원본 배치를 완전히 복원하지 않습니다. PDF→PPTX는 이미지 슬라이드,PDF→Excel은 텍스트 위치 기반 추정 셀입니다.
- DWG는 LibreDWG가 지원하는2D 객체 중심이며3D·외부 참조·일부 객체/글꼴은 제한됩니다. AI 뷰어는 PDF호환 Illustrator 파일을 지원합니다.
- OCR은 오인식할 수 있습니다. 생성형AI는 기기·GPU·모델 다운로드가 필요하며 영문 출력이나 사실 오류가 발생할 수 있습니다. 원문 대조가 필요합니다. 모델 없이 원문 문장을 추출하는 방식도 제공합니다.
- 세금·보험·급여·대출은 표시한 공식·입력 조건에 따른 참고 계산입니다. 개인 자격·감면·금융기관 규제·실제 청구를 모두 자동 판정하지 않습니다.
- 파일당30MB·합계60MB 및 각 도구의 페이지·픽셀·시트 제한이 적용됩니다.

## 190개 도구별 실행 기록

| 번호 | 도구 | 입력·파일 | 확인한 결과 (요약) | 상태 |
|---:|---|---|---|---|
| 1 | [1RM 계산기](https://tools.daonjoyful.com/tools/1rm-calc/) | weight=60, reps=5 | Epley 추정 1RM: 70kg | 통과 |
| 2 | [달성률 계산기](https://tools.daonjoyful.com/tools/achievement-rate-calc/) | actual=80, target=100 | 80% | 통과 |
| 3 | [취득세 계산기](https://tools.daonjoyful.com/tools/acquisition-tax-calc/) | price=100000000, rate=1, education=0.1, rural=0, extra=0 | 취득세: 1,000,000원 / 지방교육세: 100,000원 / 농어촌특별세: 0원 / 세금 합계: 1,100,000원 / 부대비용 포함: 1,100,000원 | 통과 |
| 4 | [연차수당 계산기](https://tools.daonjoyful.com/tools/annual-leave-allowance-calc/) | monthly=3000000, monthlyHours=209, hours=8, unused=5 | 통상 시급: 14,354.066986원 / 연차수당: 574,162.679426원 | 통과 |
| 5 | [공무원 연가보상비 계산기](https://tools.daonjoyful.com/tools/annual-leave-bonus-calc/) | salary=3000000, rate=86, unused=5 | 430,000원 | 통과 |
| 6 | [연차 유급휴가 계산기](https://tools.daonjoyful.com/tools/annual-leave-calc/) | start=2020-01-01, end=2026-10-25, attendance=100, fullMonths=0, monthsMode=auto | 해당 근속연도 기준 연차: 17일 / 근속: 6년 | 통과 |
| 7 | [체감온도 계산기](https://tools.daonjoyful.com/tools/apparent-temperature-calc/) | temp=0, wind=5, season=winter, humidity=60 | -4.935273℃ | 통과 |
| 8 | [APY 계산기](https://tools.daonjoyful.com/tools/apy-calc/) | rate=5, compound=12 | 5.11619% | 통과 |
| 9 | [평균 계산기](https://tools.daonjoyful.com/tools/average-calc/) | values=10, 20, 30 | 평균: 20 / 합계: 60 / 개수: 3 | 통과 |
| 10 | [비만도(BMI) 계산기](https://tools.daonjoyful.com/tools/bmi-calc/) | height=170, weight=65, age=30, sex=male, activity=1.2 | BMI: 22.491349kg/m² / 기초대사량(Mifflin-St Jeor): 1,567.5kcal/일 / 활동량 반영 추정: 1,881kcal/일 | 통과 |
| 11 | [BSA 체표면적 계산기](https://tools.daonjoyful.com/tools/bsa-calc/) | height=170, weight=65 | 1.751983m² | 통과 |
| 12 | [CAGR 계산기](https://tools.daonjoyful.com/tools/cagr-calc/) | start=100, end=150, years=3 | 14.471424% | 통과 |
| 13 | [양도소득세 계산기](https://tools.daonjoyful.com/tools/capital-gains-tax-calc/) | sell=500000000, buy=300000000, cost=10000000, longDeduction=0, basic=2500000 | 과세표준: 187,500,000원 / 국세 추정: 51,310,000원 / 지방소득세 포함 추정: 56,441,000원 | 통과 |
| 14 | [자동차 취등록세 계산기](https://tools.daonjoyful.com/tools/car-acquisition-tax-calc/) | price=30000000, vehicle=passenger, rate=7, relief=0, bond=0 | 적용 기본 세율: 7% / 감면 후 취득세: 2,100,000원 / 부대비용 포함: 2,100,000원 | 통과 |
| 15 | [자동차 할부 계산기](https://tools.daonjoyful.com/tools/car-installment-calc/) | price=30000000, down=5000000, subsidy=0, rate=5, months=36 | 할부 원금: 25,000,000원 / 월 납입액: 749,272.427617원 / 만기 유예금: 0원 / 총 이자: 1,973,807.394199원 / 총 차량 지출: 31,973,807.394199원 | 통과 |
| 16 | [자동차세 계산기](https://tools.daonjoyful.com/tools/car-tax-calc/) | cc=1600, age=1, discount=0, use=private, engine=cc | 자동차세: 224,000원 / 지방교육세: 67,200원 / 연 합계: 291,200원 | 통과 |
| 17 | [신용카드 할부 수수료 계산기](https://tools.daonjoyful.com/tools/card-installment-fee-calc/) | price=1000000, months=12, rate=15, free=0, prepaid=0 | 할부 원금: 1,000,000원 / 총 수수료 추정: 81,250원 / 총 납부: 1,081,250원 / 월 원금: 83,333.333333원 | 통과 |
| 18 | [증감율 계산기](https://tools.daonjoyful.com/tools/change-rate-calc/) | before=100, after=120 | 20% | 통과 |
| 19 | [콜레스테롤 계산기](https://tools.daonjoyful.com/tools/cholesterol-calc/) | total=200, hdl=50, tg=150 | 추정 LDL: 120mg/dL / 총/HDL 비율: 4 | 통과 |
| 20 | [판매 수수료 계산기](https://tools.daonjoyful.com/tools/commission-calc/) | sales=100000, rate=5, cost=0 | 수수료: 5,000원 / 수령액: 95,000원 | 통과 |
| 21 | [복리 계산기](https://tools.daonjoyful.com/tools/compound-return-calc/) | principal=1000000, rate=3, years=1, compound=12, monthly=100000 | 투입 원금: 2,200,000원 / 세전 최종액: 2,247,054.233454원 / 수익: 47,054.233454원 / 세후 최종액: 2,239,807.881502원 | 통과 |
| 22 | [환율 계산기](https://tools.daonjoyful.com/tools/currency-converter/) | amount=100, mode=manual, from=USD, to=KRW, rate=1350 | 135,000 KRW / 적용 환율: 1,350 KRW/USD | 통과 |
| 23 | [일일 카페인 섭취량 계산기](https://tools.daonjoyful.com/tools/daily-caffeine-intake-calc/) | per=100, cups=2, limit=400, weight=65, perKg=5.7 | 총 섭취량: 200mg / 입력 성인·체중 기준 중 작은 값: 370.5mg / 기준 대비: 53.981107% / 개인 상태에 따라 기준이 다릅니다. | 통과 |
| 24 | [일일 단백질 섭취량 계산기](https://tools.daonjoyful.com/tools/daily-protein-calc/) | weight=65, factor=0.8 | 52g/일 | 통과 |
| 25 | [일일 물 섭취량 계산기](https://tools.daonjoyful.com/tools/daily-water-calc/) | weight=65, factor=30, extra=0 | 1,950mL/일 | 통과 |
| 26 | [날짜 & 디데이 계산기](https://tools.daonjoyful.com/tools/date-calc/) | start=2020-01-01, end=2026-10-25, offset=30, birth=2026-10-01, year=2026 | 두 날짜 차이: 2,489일 / 시작일 포함: 2,490일 / 시작일 + 일수: 2020-01-31 / 기준일의 만 나이: 0세 / 2026년: 평년 (365일) | 통과 |
| 27 | [감가상각비 계산기](https://tools.daonjoyful.com/tools/depreciation-calc/) | price=10000000, residual=1000000, years=5 | 1,800,000원/년 | 통과 |
| 28 | [할인 계산기](https://tools.daonjoyful.com/tools/discount-calc/) | price=10000, rate=20 | 할인 후: 8,000원 / 할인액: 2,000원 | 통과 |
| 29 | [배당금 세후 계산기](https://tools.daonjoyful.com/tools/dividend-tax-calc/) | shares=100, perShare=1000, exchange=1, rate=15.4, other=0 | 세전 배당: 100,000원 / 원천징수: 15,400원 / 세후 예상: 84,600원 / 입력 금융소득 합계: 100,000원 / 해외 원천징수·외국납부세액·종합과세는 별도 확인하세요. | 통과 |
| 30 | [DSR 계산기](https://tools.daonjoyful.com/tools/dsr-calc/) | annual=50000000, debt=15000000, newPrincipal=100000000, rate=4, years=30 | 신규 연 상환액: 5,728,983.545585원 / 기존 DSR: 30% / 신규 포함 DSR: 41.457967% | 통과 |
| 31 | [전기요금 계산기](https://tools.daonjoyful.com/tools/electricity-bill-calc/) | kwh=250, basic=1600, rate=120, other=0, vat=10 | 기본요금: 1,600원 / 전력량요금: 30,000원 / 연료·기후 조정: 3,500원 / 부가세: 3,510원 / 기금: 0원 / 합계: 38,610원 | 통과 |
| 32 | [오차율 계산기](https://tools.daonjoyful.com/tools/error-rate-calc/) | actual=100, measured=98 | 2% | 통과 |
| 33 | [팩토리얼 계산기](https://tools.daonjoyful.com/tools/factorial-calc/) | n=10 | 3628800 | 통과 |
| 34 | [FFMI 계산기](https://tools.daonjoyful.com/tools/ffmi-calc/) | height=175, weight=75, fat=20 | FFMI: 19.591837 / 키 보정 FFMI: 19.896837 | 통과 |
| 35 | [내신 5등급제 비율 변환기](https://tools.daonjoyful.com/tools/five-grade-calc/) | mode=rank, rank=10, total=100, ties=1, percent=10 | 상위 비율: 10% / 5등급: 1등급 / 동석차는 중간석차로 계산합니다. 9등급 변환은 구간 중간값에 따른 참고값입니다. | 통과 |
| 36 | [유류비 계산기](https://tools.daonjoyful.com/tools/fuel-cost-calc/) | distance=300, efficiency=12, price=1700, people=1, toll=0 | 연료량: 25L / 유류비: 42,500원 / 전체 비용: 42,500원 / 1인 분담: 42,500원 | 통과 |
| 37 | [최대공약수 계산기](https://tools.daonjoyful.com/tools/gcd-calc/) | values=12, 18, 24 | 6 | 통과 |
| 38 | [학점 계산기](https://tools.daonjoyful.com/tools/gpa-calc/) | values=3,4.5 / 2,3.5, max=4.5 | 평균 평점: 4.1 / 4.5 / 취득 학점: 5 / 만점 대비: 91.111111% | 통과 |
| 39 | [심박수 계산기](https://tools.daonjoyful.com/tools/heart-rate-calc/) | age=30, rest=65, intensity=60 | 추정 최대심박: 187bpm / 심박예비율 기준 목표: 138.2bpm | 통과 |
| 40 | [키 성장 예측 계산기](https://tools.daonjoyful.com/tools/height-prediction-calc/) | father=175, mother=162, sex=male | 175cm | 통과 |
| 41 | [빗변 계산기](https://tools.daonjoyful.com/tools/hypotenuse-calc/) | a=3, b=4 | 5 | 통과 |
| 42 | [종합소득세 계산기](https://tools.daonjoyful.com/tools/income-tax-calc/) | income=70000000, expense=10000000, deductions=10000000, credits=0, paid=0 | 과세표준: 50,000,000원 / 소득세: 6,240,000원 / 지방세 포함: 6,864,000원 / 추가납부(음수는 환급): 6,864,000원 | 통과 |
| 43 | [전세보증보험료 계산기](https://tools.daonjoyful.com/tools/jeonse-guarantee-fee-calc/) | deposit=200000000, rate=0.12, days=730, discount=0 | 480,000원 | 통과 |
| 44 | [전세 vs 월세 계산기](https://tools.daonjoyful.com/tools/jeonse-vs-wolse-calc/) | jeonse=200000000, deposit=20000000, monthly=700000, rate=4, months=24 | 전세 월 자금비용: 666,666.666667원 / 월세 월 비용: 766,666.666667원 / 24개월 전세비용: 16,000,000원 / 월세비용: 18,400,000원 / 월세−전세 차이: 2,400,000원 | 통과 |
| 45 | [최소공배수 계산기](https://tools.daonjoyful.com/tools/lcm-calc/) | values=12, 18, 24 | 72 | 통과 |
| 46 | [제지방 체중 계산기](https://tools.daonjoyful.com/tools/lean-body-mass-calc/) | weight=70, fat=20, height=170, sex=male, method=fat | 제지방체중 추정: 56kg / 체지방량 추정: 14kg | 통과 |
| 47 | [대출 이자 계산기](https://tools.daonjoyful.com/tools/loan-calc/) | principal=10000000, rate=5, months=36, method=equal | 총 이자: 789,522.95768원 / 총 상환액: 10,789,522.95768원 /  / 회차 \| 원금 \| 이자 \| 상환액 \| 잔액 / 1 \| 258,042.30438 \| 41,666.666667 \| 299,708. | 통과 |
| 48 | [LTV/DTI 계산기](https://tools.daonjoyful.com/tools/ltv-dti-calc/) | home=500000000, loan=200000000, income=50000000, payment=15000000, ltvLimit=70 | 입력 대출 LTV: 40% / 기존 부담 DTI: 30% / 입력 LTV 기준 한도: 350,000,000원 / 입력 DTI 기준 추가 대출 추정: 87,275,516.855915원 / 두 조건 중 작은 금액: 87,275,516.8 | 통과 |
| 49 | [탄단지 비율 계산기](https://tools.daonjoyful.com/tools/macro-ratio-calc/) | kcal=2000, carb=50, protein=20, fat=30 | 탄수화물 250g / 단백질 100g / 지방 66.666667g | 통과 |
| 50 | [마진 계산기](https://tools.daonjoyful.com/tools/margin-calc/) | sell=20000, cost=12000 | 이익: 8,000원 / 판매가 기준 마진율: 40% / 원가 기준 이익률: 66.666667% | 통과 |
| 51 | [중앙값 계산기](https://tools.daonjoyful.com/tools/median-calc/) | values=1, 3, 5, 7 | 4 | 통과 |
| 52 | [최빈값 계산기](https://tools.daonjoyful.com/tools/mode-calc/) | values=1, 2, 2, 3 | 최빈값: 2 / 빈도: 2 | 통과 |
| 53 | [월평균 합산 소득 계산기](https://tools.daonjoyful.com/tools/monthly-average-combined-income-calc/) | salary=30000000, business=12000000, other=0, months=12 | 3,500,000원/월 | 통과 |
| 54 | [월세 세액공제 계산기](https://tools.daonjoyful.com/tools/monthly-rent-tax-credit-calc/) | annual=50000000, monthly=500000, months=12, eligible=yes, cap=10000000 | 참고 공제율: 17% / 계산 공제액: 1,020,000원 / 입력 결정세액 내 공제: 1,020,000원 | 통과 |
| 55 | [월급 시급 계산기](https://tools.daonjoyful.com/tools/monthly-to-hourly-calc/) | monthly=2156880, weekly=48, weeks=4.345 | 월 환산시간: 208.56시간 / 환산 시급: 10,341.772152원 | 통과 |
| 56 | [배란일 계산기](https://tools.daonjoyful.com/tools/ovulation-calc/) | start=2020-01-01, cycle=28 | 추정 배란일: 2020-01-15 / 추정 가임기: 2020-01-10 ~ 2020-01-16 | 통과 |
| 57 | [알바비 계산기](https://tools.daonjoyful.com/tools/part-time-wage-calc/) | hourly=10320, hours=8, days=5, weeks=4.345, extra=0 | 월 환산시간: 173.8시간 / 세전: 1,793,616원 / 공제 후: 1,793,616원 | 통과 |
| 58 | [PBR 계산기](https://tools.daonjoyful.com/tools/pbr-calc/) | price=10000, denom=1000 | 10배 | 통과 |
| 59 | [PER 계산기](https://tools.daonjoyful.com/tools/per-calc/) | price=10000, denom=1000 | 10배 | 통과 |
| 60 | [퍼센트 & 이자 계산기](https://tools.daonjoyful.com/tools/percent-calc/) | base=200, rate=15, years=1, mode=portion, other=1000000 | 비율에 해당하는 값: 30 / 단리 원리합계: 230 | 통과 |
| 61 | [성과급 세금 계산기](https://tools.daonjoyful.com/tools/performance-bonus-tax-calc/) | bonus=1000000, rate=0, localRate=10 | 소득세: 0원 / 지방소득세: 0원 / 세후: 1,000,000원 | 통과 |
| 62 | [출산예정일 계산기](https://tools.daonjoyful.com/tools/pregnancy-due-calc/) | start=2020-01-01, cycle=28 | 출산예정일 추정: 2020-10-07 | 통과 |
| 63 | [중도상환수수료 계산기](https://tools.daonjoyful.com/tools/prepayment-fee-calc/) | amount=10000000, rate=1, remaining=365, period=1095, basis=days | 33,333.333333원 | 통과 |
| 64 | [발표 시간 계산기](https://tools.daonjoyful.com/tools/presentation-time-calc/) | script=안녕하세요. 발표를 시작하겠습니다., speed=300, basis=text, count=1000, pause=0 | 원고: 17자 / 예상: 0분 3초 | 통과 |
| 65 | [부동산 복비 계산기](https://tools.daonjoyful.com/tools/real-estate-fee-calc/) | type=home, deal=sale, price=300000000, deposit=100000000, rent=500000 | 환산 거래금액: 300,000,000원 / 적용 참고 상한·협의율: 0.4% / 중개보수: 1,200,000원 / 입력 부가세 포함: 1,320,000원 / 실제 보수는 상한 이내 협의하고 지역 조례·물건 요건을 확인하세요. | 통과 |
| 66 | [등기비용 계산기](https://tools.daonjoyful.com/tools/registration-cost-calc/) | price=100000000, rate=1, education=0.1, rural=0, extra=0 | 취득세: 1,000,000원 / 지방교육세: 100,000원 / 농어촌특별세: 0원 / 세금 합계: 1,100,000원 / 부대비용 포함: 1,100,000원 | 통과 |
| 67 | [전월세 전환 계산기](https://tools.daonjoyful.com/tools/rent-conversion-calc/) | deposit=100000000, rate=4, currentDeposit=100000000, currentRent=500000, direction=decrease | 월세 증감 절댓값: 333,333.333333원 / 변경 보증금: 0원 / 변경 월세: 833,333.333333원 | 통과 |
| 68 | [은퇴자금 계산기](https://tools.daonjoyful.com/tools/retirement-fund-calc/) | monthly=2500000, pension=1000000, years=30, inflation=2, return=3 | 은퇴 시 예상 준비금: 346,226,498.594938원 / 은퇴 시 필요자금 추정: 699,048,412.031465원 / 예상 부족액: 352,821,913.436526원 | 통과 |
| 69 | [ROAS 계산기](https://tools.daonjoyful.com/tools/roas-calc/) | a=100, b=50 | 200% | 통과 |
| 70 | [ROE 계산기](https://tools.daonjoyful.com/tools/roe-calc/) | a=100, b=50 | 200% | 통과 |
| 71 | [ROI 계산기](https://tools.daonjoyful.com/tools/roi-calc/) | cost=1000000, return=1200000 | 순이익: 200,000원 / ROI: 20% | 통과 |
| 72 | [연봉 인상율 예측 계산기](https://tools.daonjoyful.com/tools/salary-forecast-calc/) | salary=40000000, rate=3, years=5 | 46,370,962.972원 | 통과 |
| 73 | [연봉 실수령액 계산기](https://tools.daonjoyful.com/tools/salary-net-calc/) | annual=36000000, nontax=200000, pensionRate=4.75, pensionMin=410000, pensionMax=6590000 | 월 세전: 3,000,000원 / 월 과세 대상: 2,800,000원 / 국민연금: 133,000원 / 건강보험: 100,660원 / 장기요양: 13,226.724원 / 고용보험: 25,200원 / 소득세·지방세: 55,000원 /  | 통과 |
| 74 | [연봉 인상율 계산기](https://tools.daonjoyful.com/tools/salary-raise-calc/) | before=40000000, after=44000000 | 10% | 통과 |
| 75 | [적금 이자 계산기](https://tools.daonjoyful.com/tools/savings-calc/) | monthly=500000, months=12, rate=3, tax=15.4 | 납입 원금: 6,000,000원 / 세전 이자: 97,500원 / 세후 만기액: 6,082,485원 | 통과 |
| 76 | [퇴직금 계산기](https://tools.daonjoyful.com/tools/severance-pay-calc/) | start=2020-01-01, end=2026-10-25, wages=9000000, bonus=0, leave=0 | 계속근로: 2489일 / 직전3개월: 92일 / 1일 평균임금: 97,826.086957원 / 퇴직금 추정: 20,012,805.241215원 | 통과 |
| 77 | [수면 시간 계산기](https://tools.daonjoyful.com/tools/sleep-cycle-calc/) | time=07:00, cycles=5, cycle=90, latency=15, mode=wake | 23:15 / 수면 시간 추정: 7.5시간 /  / 주기별 참고 시각 / 3주기: 02:15 / 4주기: 00:45 / 5주기: 23:15 / 6주기: 21:45 | 통과 |
| 78 | [4대보험 계산기](https://tools.daonjoyful.com/tools/social-insurance-calc/) | monthly=3000000, pensionRate=4.75, pensionMin=410000, pensionMax=6590000, healthRate=3.595 | 근로자 국민연금: 142,500원 / 건강보험: 107,850원 / 장기요양: 14,171.49원 / 고용보험: 27,000원 / 근로자 합계: 291,521.49원 / 사업주 합계 추정: 329,021.49원 / 사업주 산재보험:  | 통과 |
| 79 | [더치페이 계산기](https://tools.daonjoyful.com/tools/split-bill-calc/) | total=100000, people=3, unit=1, discount=0, extra=0 | 정산 총액: 100,000원 / 1인당 (단위 올림): 33,334원 / 총 수금액: 100,002원 / 초과 수금 (돌려줄 금액): 2원 | 통과 |
| 80 | [표준 체중 계산기](https://tools.daonjoyful.com/tools/standard-weight-calc/) | height=170, bmi=22, sex=male | 63.58kg / 적용 목표BMI: 22 | 통과 |
| 81 | [주식/코인 평단가 계산기](https://tools.daonjoyful.com/tools/stock-average-calc/) | values=10000,10 / 8000,5, target=11000, fee=0.015 | 평균 매수가 (매수수수료 포함): 9,334.733333 / 총 수량: 15 / 총 매수액: 140,021원 / 목표가 손익 (매도수수료 반영): 24,954.25원 / 목표가 수익률: 17.821791% | 통과 |
| 82 | [손절 복구율 계산기](https://tools.daonjoyful.com/tools/stop-loss-calc/) | loss=20 | 25% | 통과 |
| 83 | [청약가점 계산기](https://tools.daonjoyful.com/tools/subscription-score-calc/) | homeless=5, family=2, account=5 | 무주택기간: 12점 / 부양가족: 15점 / 통장기간: 7점 / 합계: 34 / 84점 / 무주택 기간 기산·배우자·소유 이력·미혼 연령 요건은 청약홈에서 별도 확인하세요. | 통과 |
| 84 | [토익점수 환산기](https://tools.daonjoyful.com/tools/toeic-score-converter/) | mode=correct, lc=80, rc=75, target=800 | 단순 비례 참고값: 약 770점 / 참고 범위: 710~830점 / 목표와 참고값 차이: -30점 / 공식 환산이 아닙니다. 시험별 난이도 보정으로 실제 점수는 달라집니다. | 통과 |
| 85 | [상위 퍼센트 계산기](https://tools.daonjoyful.com/tools/top-percentile-calc/) | rank=10, total=100 | 상위 10% | 통과 |
| 86 | [간이 실업급여 자격 계산기](https://tools.daonjoyful.com/tools/unemployment-eligibility-calc/) | days=180, reason=involuntary, ability=yes, daily=100000, age=40 | 입력 기본 조건 충족 (고용센터 심사 필요) / 연령·가입기간 기준 참고 지급일수: 210일 / 입력 상하한 기준1일액: 66,048원 / 참고 총액: 13,870,080원 | 통과 |
| 87 | [UPH 계산기](https://tools.daonjoyful.com/tools/uph-calc/) | quantity=100, hours=4, minutes=0, people=1 | 시간당 생산량: 25개 / 인시당 생산량: 25개 | 통과 |
| 88 | [부가세 계산기](https://tools.daonjoyful.com/tools/vat-calc/) | amount=110000, rate=10, mode=inclusive, business=general, valueRate=15 | 공급가액: 100,000원 / 부가세: 10,000원 / 합계: 110,000원 | 통과 |
| 89 | [걸음 수 칼로리 소모 계산기](https://tools.daonjoyful.com/tools/walking-calorie-calc/) | weight=65, minutes=30, met=3.5, mode=time, steps=6000 | 걷기 거리 추정: 4.2km / 적용 시간: 30분 / 소모량 추정: 119.4375kcal | 통과 |
| 90 | [주휴수당 계산기](https://tools.daonjoyful.com/tools/weekly-holiday-pay-calc/) | hourly=10320, hours=20, attendance=yes, actual=20, weeks=1 | 41,280원 | 통과 |
| 91 | [근무 년수/기간 계산기](https://tools.daonjoyful.com/tools/work-period-calc/) | start=2020-01-01, end=2026-10-25 | 달력 기준: 6년 9개월 24일 / 경과: 2,489일 / 시작일 포함: 2,490일 | 통과 |
| 92 | [근무일수 계산기](https://tools.daonjoyful.com/tools/workday-calc/) | start=2020-01-01, end=2026-10-25, holidays=, weekend=both, extra=0 | 1778일 | 통과 |
| 93 | [근무시간 계산기](https://tools.daonjoyful.com/tools/working-hours-calc/) | start=09:00, end=18:00, break=60, days=1 | 8시간 | 통과 |
| 94 | [연말정산 환급 계산기](https://tools.daonjoyful.com/tools/year-end-tax-calc/) | gross=50000000, paid=3000000, deduction=5000000, credit=500000, basic=1500000 | 근로소득공제: 12,250,000원 / 과세표준: 31,250,000원 / 결정세액 추정 (지방세 포함): 3,220,250원 / 추가납부 추정: 220,250원 | 통과 |
| 95 | [Base64 인코더·디코더](https://tools.daonjoyful.com/tools/base64-tool/) | text=다온 웹도구 audit 123, mode=encode, urlSafe=false | 64uk7JioIOybueuPhOq1rCBhdWRpdCAxMjM= | 통과 |
| 96 | [글자수 세기 & 분석기](https://tools.daonjoyful.com/tools/char-counter/) | text=다온 웹도구 audit 123, clean=none | 공백 포함: 16자 / 공백 제외: 13자 / 사용자 인식 문자: 16개 / 단어: 4개 / 줄: 1줄 / UTF-8: 26byte /  / 키워드 빈도 / 다온: 1 / 웹도구: 1 / audit: 1 / 123: 1 /  / 처리 | 통과 |
| 97 | [HEX RGB HSL 색상 변환기](https://tools.daonjoyful.com/tools/color-converter/) | color=#285a49 | HEX #285a49 / RGB 40, 90, 73 / HSL 159.6°, 38.461538%, 25.490196% / 불투명도 100% | 통과 |
| 98 | [SHA 해시 생성·검증](https://tools.daonjoyful.com/tools/hash-generator/) | text=abc, algorithm=SHA-256, expected=, source=text | SHA-256 / ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad | 통과 |
| 99 | [이미지 텍스트 추출](https://tools.daonjoyful.com/tools/image-text-extract/) | sample.png | DAON sample image /  | 통과 |
| 100 | [JSON 포맷터](https://tools.daonjoyful.com/tools/json-formatter/) | text={"name":"다온","n":123}, mode=pretty | { /   "name": "다온", /   "n": 123 / } | 통과 |
| 101 | [텍스트 정리 도구](https://tools.daonjoyful.com/tools/text-cleaner/) | text=  다온   도구   /  /  테스트 , mode=spaces, trim=true, empty=false, unique=false | 다온   도구 /  / 테스트 | 통과 |
| 102 | [텍스트 비교](https://tools.daonjoyful.com/tools/text-diff/) | text=가 / 나, other=가 / 다, unit=line | [같음] 가 /  / [삭제] 나 / [추가] 다 | 통과 |
| 103 | [텍스트 줄 정렬·중복 제거](https://tools.daonjoyful.com/tools/text-line-sort/) | text=항목10 / 항목2 / 항목2, mode=asc, sort=alpha, reverse=false, unique=false | 항목10 / 항목2 / 항목2 | 통과 |
| 104 | [URL 인코더·디코더](https://tools.daonjoyful.com/tools/url-encoder/) | text=다온 웹도구 audit 123, mode=encode, scope=component | %EB%8B%A4%EC%98%A8%20%EC%9B%B9%EB%8F%84%EA%B5%AC%20audit%20123 | 통과 |
| 105 | [UUID 생성기](https://tools.daonjoyful.com/tools/uuid-generator/) | count=5, format=uuid | d3a44257-2cd9-4770-9b3f-1f9a4ef15e70 / 99da51da-6241-4d05-bc76-a984493b46b9 / e343c7b8-aa9e-43e2-bcbf-623322725fa6 / 7064988d-5e44 | 통과 |
| 106 | [주소 일괄 변환](https://tools.daonjoyful.com/tools/address-converter/) | addresses=서울 중구 세종대로 110, remote=true, building=, floor=, room= | 서울 중구 세종대로 110 / 우편번호: 04524 / 도로명: 서울특별시 중구 세종대로 110 / 지번: 서울특별시 중구 태평로1가 31 / 영문: 110, Sejong-daero, Jung-gu, Seoul, 04524, Repu | 통과 |
| 107 | [영어이름 변환기](https://tools.daonjoyful.com/tools/english-name-converter/) | name=홍길동, surname=auto, order=family, spacing=joined | 규칙 기반 후보: Hong Gildong / 여권·공식 이름은 기존 등록 표기와 발급기관 기준을 따르세요. | 통과 |
| 108 | [비밀번호 & 무작위 생성기](https://tools.daonjoyful.com/tools/generator-tool/) | length=20, count=5, task=password, upper=true, lower=true | jR!Ri3xr)D=N8)M=sLaq / EhVZTu=&_0NayT73DJ$8 / %8HTd4dZonQBdP-+Dxb) / S!T6LwcKEakYhS^eh7W+ / WGsA!i@#xhZ7pP+zGoG0 | 통과 |
| 109 | [QR 코드 생성기](https://tools.daonjoyful.com/tools/qr-generator/) | text=다온 웹도구 audit 123, size=512, foreground=#285a49, background=#ffffff, correction=M | PNG·SVG QR 생성 완료. 실제 스캔 후 사용하세요. | 통과 |
| 110 | [도로명·지번 주소 변환](https://tools.daonjoyful.com/tools/road-address-converter/) | addresses=서울 중구 세종대로 110, remote=true, building=, floor=, room= | 서울 중구 세종대로 110 / 우편번호: 04524 / 도로명: 서울특별시 중구 세종대로 110 / 지번: 서울특별시 중구 태평로1가 31 / 영문: 110, Sejong-daero, Jung-gu, Seoul, 04524, Repu | 통과 |
| 111 | [스마트 단위 변환기](https://tools.daonjoyful.com/tools/unit-converter/) | dimension=length, value=1, from=m, to=cm | 100 cm | 통과 |
| 112 | [AI 뷰어](https://tools.daonjoyful.com/tools/ai-viewer/) | sample.ai | PDF호환 AI · 1페이지 / Daon sample 1 | 통과 |
| 113 | [CSV 뷰어](https://tools.daonjoyful.com/tools/csv-viewer/) | sample.csv | 이름,값 / 다온,123 / "쉼표, 포함",456 | 통과 |
| 114 | [DWG 뷰어](https://tools.daonjoyful.com/tools/dwg-viewer/) | sample.dwg | LibreDWG 2D 미리보기 | 통과 |
| 115 | [EPUB 뷰어](https://tools.daonjoyful.com/tools/epub-viewer/) | sample.epub | 다온 EPUB본문 테스트 | 통과 |
| 116 | [엑셀 뷰어](https://tools.daonjoyful.com/tools/excel-viewer/) | sample.xlsx | # 다온 / 이름	값 / 다온	123 | 통과 |
| 117 | [HWP 뷰어](https://tools.daonjoyful.com/tools/hwp-viewer/) | sample.hwp | 다온 HWP 5 테스트 /  | 통과 |
| 118 | [Markdown 뷰어](https://tools.daonjoyful.com/tools/markdown-viewer/) | sample.md | # 다온 테스트 /  / **굵은 글자**와 표준 문장 | 통과 |
| 119 | [PDF 뷰어](https://tools.daonjoyful.com/tools/pdf-viewer/) | audit-four.pdf | DAON audit page 1 /  / This document describes four local test pages. Page 1 contains public synthetic data only. / This document  | 통과 |
| 120 | [PPT 뷰어](https://tools.daonjoyful.com/tools/ppt-viewer/) | sample.pptx | 다온 PPTX 테스트 | 통과 |
| 121 | [PSD 뷰어](https://tools.daonjoyful.com/tools/psd-viewer/) | sample.psd | 32×24px / 레이어 1개 / (이름 없음) | 통과 |
| 122 | [SVG 뷰어](https://tools.daonjoyful.com/tools/svg-viewer/) | sample.svg | <svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="240" height="160" fill="#285a49"/><text x="20" y="80 | 통과 |
| 123 | [TIFF 뷰어](https://tools.daonjoyful.com/tools/tiff-viewer/) | sample.tiff | 1개 TIFF 프레임 / 1: 32×24px | 통과 |
| 124 | [워드 뷰어](https://tools.daonjoyful.com/tools/word-viewer/) | sample.docx | 다온 DOCX 테스트 /  / English 123 /  /  | 통과 |
| 125 | [PDF 변환기](https://tools.daonjoyful.com/tools/pdf-converter/) | audit-four.pdf | DAON audit page 1 /  / This document describes four local test pages. Page 1 contains public synthetic data only. / This document  | 통과 |
| 126 | [PDF를 Excel로](https://tools.daonjoyful.com/tools/pdf-to-excel/) | audit-four.pdf | 추정 행·열을 XLSX로 저장했습니다. 원본과 비교하세요. | 통과 |
| 127 | [PDF를 JPG로](https://tools.daonjoyful.com/tools/pdf-to-jpg/) | audit-four.pdf | 4페이지 JPG 변환 완료 | 통과 |
| 128 | [PDF를 PNG로](https://tools.daonjoyful.com/tools/pdf-to-png/) | audit-four.pdf | 4페이지 PNG 변환 완료 | 통과 |
| 129 | [PDF를 PPTX로](https://tools.daonjoyful.com/tools/pdf-to-pptx/) | audit-four.pdf | 4개 이미지 슬라이드 생성 | 통과 |
| 130 | [PDF를 TIFF로](https://tools.daonjoyful.com/tools/pdf-to-tiff/) | audit-four.pdf | 4페이지 TIFF 변환 완료 | 통과 |
| 131 | [PDF를 TXT로](https://tools.daonjoyful.com/tools/pdf-to-txt/) | audit-four.pdf | DAON audit page 1 /  / This document describes four local test pages. Page 1 contains public synthetic data only. / This document  | 통과 |
| 132 | [PDF WebP 변환](https://tools.daonjoyful.com/tools/pdf-to-webp/) | audit-four.pdf | 4페이지 WEBP 변환 완료 | 통과 |
| 133 | [PDF를 Word로](https://tools.daonjoyful.com/tools/pdf-to-word/) | audit-four.pdf | 텍스트 DOCX를 생성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 134 | [DWG를 PDF로](https://tools.daonjoyful.com/tools/dwg-to-pdf/) | sample.dwg | DWG 2D 미리보기 PDF 생성 | 통과 |
| 135 | [EPUB을 PDF로](https://tools.daonjoyful.com/tools/epub-to-pdf/) | sample.epub | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 136 | [Excel를 PDF로](https://tools.daonjoyful.com/tools/excel-to-pdf/) | sample.xlsx | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 137 | [HTML를 PDF로](https://tools.daonjoyful.com/tools/html-to-pdf/) | sample.html | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 138 | [HWP를 PDF로](https://tools.daonjoyful.com/tools/hwp-to-pdf/) | sample.hwp | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 139 | [이미지를 PDF로 (Image to PDF)](https://tools.daonjoyful.com/tools/image-to-pdf/) | sample.png, sample.jpg | 이미지 PDF 생성 | 통과 |
| 140 | [JPG를 PDF로](https://tools.daonjoyful.com/tools/jpg-to-pdf/) | sample.jpg | 이미지 PDF 생성 | 통과 |
| 141 | [PNG를 PDF로](https://tools.daonjoyful.com/tools/png-to-pdf/) | sample.png | 이미지 PDF 생성 | 통과 |
| 142 | [TIFF를 PDF로](https://tools.daonjoyful.com/tools/tiff-to-pdf/) | sample.tiff | 이미지 PDF 생성 | 통과 |
| 143 | [TXT를 PDF로](https://tools.daonjoyful.com/tools/txt-to-pdf/) | sample.txt | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 144 | [WebP PDF 변환](https://tools.daonjoyful.com/tools/webp-to-pdf/) | sample.webp | 이미지 PDF 생성 | 통과 |
| 145 | [Word를 PDF로](https://tools.daonjoyful.com/tools/word-to-pdf/) | sample.docx | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 146 | [XPS를 PDF로](https://tools.daonjoyful.com/tools/xps-to-pdf/) | sample.xps | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 147 | [7z ZIP 변환](https://tools.daonjoyful.com/tools/7z-to-zip/) | sample.7z | 4개 파일 ZIP 변환 | 통과 |
| 148 | [Avif를 JPG로](https://tools.daonjoyful.com/tools/avif-to-jpg/) | sample.avif | 640×400px / 2.84668KB | 통과 |
| 149 | [CSV를 Excel로](https://tools.daonjoyful.com/tools/csv-to-excel/) | sample.csv | 3행 XLSX 생성 | 통과 |
| 150 | [문서 Markdown 변환](https://tools.daonjoyful.com/tools/document-to-markdown/) | sample.docx | 다온 DOCX 테스트 /  / English 123 | 통과 |
| 151 | [GIF를 JPG로](https://tools.daonjoyful.com/tools/gif-to-jpg/) | sample.gif | 640×400px / 2.851563KB | 통과 |
| 152 | [GIF를 PNG로](https://tools.daonjoyful.com/tools/gif-to-png/) | sample.gif | 640×400px / 8.279297KB | 통과 |
| 153 | [HEIC를 JPG로](https://tools.daonjoyful.com/tools/heic-to-jpg/) | sample.heic | 1440×960px / 144.90625KB | 통과 |
| 154 | [이미지 포맷 변환 (Converter)](https://tools.daonjoyful.com/tools/img-converter/) | sample.png | 640×400px / 8.279297KB | 통과 |
| 155 | [JPEG를 JPG로](https://tools.daonjoyful.com/tools/jpeg-to-jpg/) | sample.jpg | 640×400px / 2.783203KB | 통과 |
| 156 | [JPG를 GIF로](https://tools.daonjoyful.com/tools/jpg-to-gif/) | sample.jpg | 640×400px / 2.333984KB | 통과 |
| 157 | [JPG를 PNG로](https://tools.daonjoyful.com/tools/jpg-to-png/) | sample.jpg | 640×400px / 11.40918KB | 통과 |
| 158 | [JPG를 WebP로](https://tools.daonjoyful.com/tools/jpg-to-webp/) | sample.jpg | 640×400px / 1.550781KB | 통과 |
| 159 | [PNG를 GIF로](https://tools.daonjoyful.com/tools/png-to-gif/) | sample.png | 640×400px / 1.555664KB | 통과 |
| 160 | [PNG를 JPG로](https://tools.daonjoyful.com/tools/png-to-jpg/) | sample.png | 640×400px / 2.851563KB | 통과 |
| 161 | [PNG를 WebP로](https://tools.daonjoyful.com/tools/png-to-webp/) | sample.png | 640×400px / 1.527344KB | 통과 |
| 162 | [RAR ZIP 변환](https://tools.daonjoyful.com/tools/rar-to-zip/) | sample.rar | 4개 파일 ZIP 변환 | 통과 |
| 163 | [WebP를 JPG로](https://tools.daonjoyful.com/tools/webp-to-jpg/) | sample.webp | 640×400px / 2.856445KB | 통과 |
| 164 | [WebP를 PNG로](https://tools.daonjoyful.com/tools/webp-to-png/) | sample.webp | 640×400px / 11.052734KB | 통과 |
| 165 | [이미지 밝기·대비·흑백 편집](https://tools.daonjoyful.com/tools/img-adjust/) | sample.png | 640×400px / 8.279297KB | 통과 |
| 166 | [이미지 색상 추출기 (Color Picker)](https://tools.daonjoyful.com/tools/img-color-picker/) | sample.png | 좌표: 0, 0 / HEX #e8eee1 / RGB 232, 238, 225 / HSL 87.692308°, 27.659574%, 90.784314% / 불투명도 100% | 통과 |
| 167 | [이미지 용량 압축 (Compressor)](https://tools.daonjoyful.com/tools/img-compressor/) | sample.png | 640×400px / 2.851563KB / 원본 대비 94.712942% | 통과 |
| 168 | [이미지 이어붙이기](https://tools.daonjoyful.com/tools/img-join/) | sample.png, sample.jpg | 640×800px / 19.569336KB | 통과 |
| 169 | [이미지 크기 조절 (Resizer)](https://tools.daonjoyful.com/tools/img-resizer/) | sample.png | 1200×750px / 27.335938KB | 통과 |
| 170 | [이미지 회전 및 반전 (Rotate & Flip)](https://tools.daonjoyful.com/tools/img-rotate-flip/) | sample.png | 640×400px / 8.279297KB | 통과 |
| 171 | [이미지 워터마크 넣기](https://tools.daonjoyful.com/tools/img-watermark/) | sample.png | 640×400px / 10.608398KB | 통과 |
| 172 | [PDF 빈 페이지 추가](https://tools.daonjoyful.com/tools/pdf-add-blank/) | audit-four.pdf | 0페이지 뒤 빈 페이지1장 추가 · 총5페이지 | 통과 |
| 173 | [PDF 여백 추가](https://tools.daonjoyful.com/tools/pdf-add-margin/) | audit-four.pdf | 4페이지 → 4페이지 레이아웃 변환 완료 | 통과 |
| 174 | [PDF 소책자 인쇄 배치](https://tools.daonjoyful.com/tools/pdf-booklet/) | audit-four.pdf | 4페이지 → 2페이지 레이아웃 변환 완료 / 양면 인쇄 방향과 접지 순서를 미리보기로 확인하세요. | 통과 |
| 175 | [PDF 모아찍기](https://tools.daonjoyful.com/tools/pdf-nup/) | audit-four.pdf | 4페이지 → 2페이지 레이아웃 변환 완료 | 통과 |
| 176 | [PDF 페이지 정보 확인](https://tools.daonjoyful.com/tools/pdf-page-info/) | audit-four.pdf | 1페이지: 595×842pt · 회전 0° / 2페이지: 595×842pt · 회전 0° / 3페이지: 595×842pt · 회전 0° / 4페이지: 595×842pt · 회전 0° | 통과 |
| 177 | [PDF 용지 크기 변경](https://tools.daonjoyful.com/tools/pdf-resize/) | audit-four.pdf | 4페이지 → 4페이지 레이아웃 변환 완료 | 통과 |
| 178 | [PDF에 주석 달기](https://tools.daonjoyful.com/tools/pdf-annotate/) | audit-four.pdf | PDF 작업 완료 | 통과 |
| 179 | [PDF 압축](https://tools.daonjoyful.com/tools/pdf-compress/) | audit-four.pdf | 원본 2.451172KB → 결과 2.454102KB / 원본보다 작아지지 않았습니다. 원본 유지 또는 이미지 재구성 옵션을 검토하세요. | 통과 |
| 180 | [PDF 생성](https://tools.daonjoyful.com/tools/pdf-create/) | text=제목 / 내용을 입력하세요. | 한글 텍스트 PDF 생성 | 통과 |
| 181 | [PDF 페이지 삭제 (Delete Pages)](https://tools.daonjoyful.com/tools/pdf-delete/) | audit-four.pdf | 3페이지 생성 | 통과 |
| 182 | [PDF 병합 (Merge)](https://tools.daonjoyful.com/tools/pdf-merge/) | sample-1.pdf, sample-2.pdf | 2페이지 병합 | 통과 |
| 183 | [PDF OCR](https://tools.daonjoyful.com/tools/pdf-ocr/) | audit-four.pdf | DAON audit page 1 /  / This document describes four local test pages. Page 1 contains public synthetic data only. / This document  | 통과 |
| 184 | [PDF 페이지 정리](https://tools.daonjoyful.com/tools/pdf-organize/) | audit-four.pdf | 4페이지 생성 | 통과 |
| 185 | [PDF 페이지 번호 추가 (Page Numbering)](https://tools.daonjoyful.com/tools/pdf-page-num/) | audit-four.pdf | PDF 작업 완료. 시각적 합성 결과를 확인하세요. | 통과 |
| 186 | [PDF 페이지 회전 (Rotate)](https://tools.daonjoyful.com/tools/pdf-rotate/) | audit-four.pdf | PDF 작업 완료 | 통과 |
| 187 | [PDF 서명](https://tools.daonjoyful.com/tools/pdf-sign/) | audit-four.pdf | PDF 작업 완료. 시각적 합성 결과를 확인하세요. | 통과 |
| 188 | [PDF 분할 (Split)](https://tools.daonjoyful.com/tools/pdf-split/) | audit-four.pdf | 3페이지 분할·추출 완료 | 통과 |
| 189 | [PDF 요약 AI](https://tools.daonjoyful.com/tools/pdf-summary-ai/) | audit-four.pdf | 원문 핵심문장 추출 (생성형 AI 사용 안 함) /  / [1쪽] DAON audit page 1 /  / [1쪽] Page 1 contains public synthetic data only. /  / [2쪽] Page 2 cont | 통과 |
| 190 | [PDF 워터마크 추가 (Watermark)](https://tools.daonjoyful.com/tools/pdf-watermark/) | audit-four.pdf | PDF 작업 완료. 시각적 합성 결과를 확인하세요. | 통과 |

## 추가 옵션·조작 기록

| 사례 | 도구 | 확인 결과 | 상태 |
|---|---|---|---|
| URL-safe Unicode 인코딩 | base64-tool | 8J-YgA | 통과 |
| URL-safe 패딩 없는 디코딩 | base64-tool | 😀 | 통과 |
| 파일 SHA-256 및 검증 | hash-generator | SHA-256 · hash-abc.txt / ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad / 비교: 일치 | 통과 |
| 삽입 줄 차이 비교 | text-diff | [같음] 가 /  / [추가] 추가 /  / [같음] 나 / 다 /  | 통과 |
| 문자 단위 비교 | text-diff | [같음] A / [삭제] B / [추가] D / [같음] C | 통과 |
| 비교 텍스트 파일 | text-diff | [같음] 가 /  / [추가] 추가 /  / [같음] 나 / 다 /  | 통과 |
| 자연순 정렬·중복 제거 | text-line-sort | 항목2 / 항목10 | 통과 |
| 숫자순 역순 | text-line-sort | 10 / 3 / -2 | 통과 |
| 공백·빈줄·중복 동시 정리 | text-cleaner | 가 / 나 | 통과 |
| 전체URL 인코딩 | url-encoder | https://example.com/%EB%8B%A4%EC%98%A8?q=%EA%B0%80 | 통과 |
| 임의HEX ID | uuid-generator | 302eaa42cda3d2377ae15377edec7799 / 68f3fd9de0a3c98704dfe86e48d48c74 / fc306972de085a4d0252d8a57a38ba53 | 통과 |
| 복성·이름순·하이픈 | english-name-converter | 규칙 기반 후보: Min-su Namgung / 여권·공식 이름은 기존 등록 표기와 발급기관 기준을 따르세요. | 통과 |
| 중복 없는 추첨 | generator-tool | 다 / 가 / 나 | 통과 |
| 숫자만 비밀번호 | generator-tool | 11522422 / 66289790 | 통과 |
| QR 색상·SVG | qr-generator | PNG·SVG QR 생성 완료. 실제 스캔 후 사용하세요. | 통과 |
| HSL 입력 미리보기 | color-converter | HEX #2e6b4d / RGB 46, 107, 77 / HSL 150.491803°, 39.869281%, 30% / 불투명도 100% | 통과 |
| 영문 상세주소 | road-address-converter | 서울 중구 세종대로 110 / 우편번호: 04524 / 도로명: 서울특별시 중구 세종대로 110 1동 2층 3호 / 지번: 서울특별시 중구 태평로1가 31 1동 2층 3호 / 영문: Unit 3, Floor 2, Building 1, 110, Sejong-daero, Jung-gu, S | 통과 |
| 일별 공개환율 조회 | currency-converter | 1,324.48 KRW / 환율: 1,324.48 KRW/USD / 기준일: 2026-10-25 / 출처: Frankfurter 일별 공개 참고환율. 거래 수수료는 별도입니다. | 통과 |
| Word97 DOC 본문 | word-viewer | I am a test document / This is page 1 / I am Calibri (Body) in font size 11 /  / This is page two / It’s Arial Black in 16 point / It’s also in blue | 통과 |
| Word97 DOC PDF | word-to-pdf | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 구형XLS 셀 | excel-viewer | # 다온 / 이름	값 / 다온	123 | 통과 |
| 구형XLS PDF | excel-to-pdf | 본문 텍스트를 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 구형PPT 현재 슬라이드 | ppt-viewer | 슬라이드 1 / This is a test title / This is a test subtitle / This is on page 1 /  / 슬라이드 2 / This is the title on page 2 / This is page two / It has several blocks | 통과 |
| 압축된 HWP5 | hwp-viewer | 압축 HWP 본문 테스트 /  | 통과 |
| 다중 TIFF 미리보기 | tiff-viewer | 2개 TIFF 프레임 / 1: 120×60px / 2: 80×120px | 통과 |
| EPUB spine 순서 | epub-viewer | B 챕터 / B 본문 | 통과 |
| DOCX 구조 Markdown | document-to-markdown | # 다온 문서 제목 /  / - 첫 번째 항목 /  / 본문 내용 /  / \| 이름 \| 값 \| / \| --- \| --- \| / \| 다온 \| 123 \| | 통과 |
| 임의45도 회전 | img-rotate-flip | 736×736px / 22.463867KB | 통과 |
| 90도 회전 | img-rotate-flip | 400×640px / 9.806641KB | 통과 |
| 비율 잠금 해제 | img-resizer | 100×50px / 0.508789KB | 통과 |
| 원본50% 리사이즈 | img-resizer | 320×200px / 2.905273KB | 통과 |
| 이미지 맞춤·여백·간격 | img-join | 220×250px / 2.646484KB | 통과 |
| 로고 워터마크 | img-watermark | 640×400px / 8.300781KB | 통과 |
| PDF 비대칭 여백4페이지 | pdf-add-margin | 4페이지 → 4페이지 레이아웃 변환 완료 | 통과 |
| 회전 원본 용지변환 | pdf-resize | 4페이지 → 4페이지 레이아웃 변환 완료 | 통과 |
| 모아찍기 여백·간격 | pdf-nup | 4페이지 → 2페이지 레이아웃 변환 완료 | 통과 |
| 소책자 모든 원본 | pdf-booklet | 4페이지 → 2페이지 레이아웃 변환 완료 / 양면 인쇄 방향과 접지 순서를 미리보기로 확인하세요. | 통과 |
| PDF 번호 형식·위치 | pdf-page-num | PDF 작업 완료. 시각적 합성 결과를 확인하세요. | 통과 |
| PDF 워터마크 색·회전·투명도 | pdf-watermark | PDF 작업 완료. 시각적 합성 결과를 확인하세요. | 통과 |
| PDF 이미지 서명 | pdf-sign | PDF 작업 완료. 시각적 합성 결과를 확인하세요. | 통과 |
| PDF 추출본만 저장 | pdf-split | 2페이지 분할·추출 완료 | 통과 |
| PDF 이미지 재구성 압축 | pdf-compress | 원본 2.451172KB → 결과 78.567383KB / 원본보다 작아지지 않았습니다. 원본 유지 또는 이미지 재구성 옵션을 검토하세요. / 이미지 재구성으로 텍스트·양식·기존 서명이 소실됩니다. | 통과 |
| 범용변환 이미지입력 | pdf-converter | 이미지PDF 생성 | 통과 |
| 범용변환 Word입력 | pdf-converter | 본문을 PDF로 재구성했습니다. 원본 배치는 보존되지 않습니다. | 통과 |
| 잘못된JSON 거부 | json-formatter | 처리 실패: Unexpected end of JSON input | 통과 |
| 범위 밖 이미지크기 거부 | img-resizer | 처리 실패: 결과 크기는 각1~16000px, 총4천만 픽셀 이하여야 합니다. | 통과 |
| 해시 복사는 순수 해시만 반환 | hash-generator | ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad | 통과 |
| EPUB 챕터 선택 변경 | epub-viewer | A 챕터 / A 본문 | 통과 |
| 캔버스 직접 서명 후 PDF 생성 | pdf-sign | 생성 결과: 4페이지 · 7KB /  / 1쪽: 595×842pt /  / 2쪽: 595×842pt /  / 3쪽: 595×842pt | 통과 |
| 병합 파일 순서 변경 | pdf-merge | 1. sample-2.pdf (1KB) / 2. sample-1.pdf (1KB) | 통과 |
| PDF 썸네일 이동·삭제 | pdf-organize | 1,4,3 / 생성 결과: 3페이지 · 2KB /  / 1쪽: 595×842pt /  / 2쪽: 595×842pt /  / 3쪽: 595×842pt | 통과 |
| 장시간 OCR 취소 | pdf-ocr | 취소했습니다. | 통과 |
| WebGPU 생성형AI 모델 실제 요약 | pdf-summary-ai | [구간 1] / This document outlines four local test pages, each containing public synthetic data. /  / 선택 페이지의 앞 최대12,000자를1,500자씩 나누어 요약했습니다. AI는 오류가 있을 수 있으므로 원문과 | 통과 |
| OCR 검색 가능한 PDF 생성 | pdf-ocr | Daon sample 1 /  | 통과 |

## 구현 기준 확인 자료

- [국세청 월세 공제 안내](https://ems.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=239025&mi=40613)
- [국민연금2026년 기준소득월액](https://www.npsonair.kr/advantages/detail.html?strIdx=3923)
- [국민건강보험2026년 요율](https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html)
- [도봉구 중개보수 안내](https://www.dobong.go.kr/Contents.asp?code=10009405)
- [Microsoft Office 파일 형식 명세](https://learn.microsoft.com/en-us/openspecs/office_file_formats/)
- [SheetJS 공식 배포 안내](https://docs.sheetjs.com/docs/getting-started/installation/nodejs/)
- [Mifflin–St Jeor 원 논문](https://pubmed.ncbi.nlm.nih.gov/2305711/)
- [NOAA 열지수식](https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml)
- [Frankfurter API](https://frankfurter.dev/)
