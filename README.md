# 다온 웹도구

설치 없이 사용하는 25개 계산·텍스트·이미지·PDF 도구. 사용자 입력과 파일은 브라우저에서 처리합니다.

## 개발

Node.js 22 이상에서 `npm install`, `npm run build`, `npm test`, `npm run dev` 순서로 실행합니다. 개발 주소는 http://127.0.0.1:4173 입니다.

## Cloudflare Pages

- 저장소: daonjoyful/daon-webtools
- 운영 브랜치: main
- 빌드 명령: npm run build
- 출력 디렉터리: dist
- 도메인: tools.daonjoyful.com

각 도구에 별도 HTML 주소, 설명과 canonical을 제공합니다. 광고·분석 스크립트는 포함하지 않았습니다. PDF 처리는 MIT 라이선스의 pdf-lib 1.17.1을 사용하며 빌드 시 로컬 배포 파일에 포함합니다.

PDF 처리 시 전자서명·양식·책갈피 보존을 보장하지 않습니다. 파일별 크기·합계·페이지 수 제한을 적용합니다. 이미지 변환은 PNG/JPEG/WebP 정지 이미지를 지원합니다.
