# 다온 웹도구

[운영 사이트](https://tools.daonjoyful.com/) · [190개 전수 실행 기록](tool-audit-2026-10-25.md)

레퍼런스 목록190개 항목에 독립 페이지와 실제 처리 기능을 제공합니다. 계산기94개, 텍스트·이미지·문서·PDF·압축·OCR·CAD·요약 도구96개입니다. 기존 이미지 자르기 주소도 유지합니다.

## 개발·배포

Node.js22 이상에서 npm install → npm run build → npm test → npm run dev. 개발 주소는 http://127.0.0.1:4173 입니다. 빌드에는 공개 Google Fonts 다운로드가 필요합니다. main 브랜치 변경 시 Cloudflare Pages가 npm run build로 검사까지 실행한 후 dist를 배포합니다. 유료 API나 키는 사용하지 않습니다.

## 검사

2026-10-25에190개 도구를 제어 브라우저에서 각각 실행하고54개 추가 옵션·조작을 검사했습니다. 생성PDF 재열기,다중 페이지 보존,실제 복사·서명·취소·순서 변경을 포함합니다. 자동 테스트14개 그룹이 계산 예시·경계값·페이지/엔진 배포·PDF 페이지 보존·공통 설정 분리를 검증합니다. 구체적인 입력과 결과는 전수 실행 기록과 tool-audit-results.json에 있습니다.

## 지원 범위·개인정보

파일과 계산은 기기에서 처리합니다. DOC·DOCX,XLS·XLSX,PPT·PPTX,HWP5/HWPX 본문을 읽습니다. 복잡한 원본 배치·매크로·애니메이션·암호 파일과 일부CAD 객체는 제한됩니다. PDF 변환·OCR·AI·세금 계산 등 도구별 제한은 화면과 [확장 안내](release-notes.md)에 표시합니다.

주소 검색은 별도 동의한 검색어를 Postcodify에 전송합니다. 일별 참고환율은 Frankfurter에 통화 코드만 보내 조회하며 금액은 전송하지 않습니다. OCR 언어 데이터·AI 모델은 공개 저장소에서 다운로드하고 문서는 기기에서 처리합니다. 생성형AI는 WebGPU가 필요하며 사실 오류나 영문 출력이 발생할 수 있습니다. 모델 없는 핵심문장 추출도 제공합니다.

기존 AdSense·Search Console 메타태그·ads.txt·정책 페이지·기존URL 리디렉션을 유지합니다. Google Analytics는 설치하지 않았습니다. 유럽 동의 메시지는 AdSense에서 daonjoyful.com 단위로 관리합니다.

## 공개 엔진

라이선스와 통합 소스는 배포의 /third-party-licenses.txt,/licenses/,/source/에 포함합니다. LibreDWG0.8.2 엔진은 원본 모듈을 별도worker에서 사용하며 GPL-3.0 사본과 [정확한 원본 소스](https://github.com/mlightcad/libredwg-web/tree/v0.8.2)를 제공합니다. SheetJS는 공식0.20.3 배포본을 사용합니다. 각 의존성은 원저작자의 라이선스를 따릅니다.
