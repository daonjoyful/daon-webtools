export function enhanceUtilities(u){
for(const config of Object.values(u))config.fields=config.fields.map(field=>({...field,options:field.options?.map(option=>[...option])}));
const f=(id,label,value='',type='text')=>({id,label,value,type}),n=(id,label,value=0)=>f(id,label,value,'number'),b=(id,label,value=false)=>f(id,label,value,'checkbox'),s=(id,label,options,value)=>({...f(id,label,value??options[0][0],'select'),options}),text=(id,label,value='')=>f(id,label,value,'textarea'),append=(id,fields)=>u[id].fields.push(...fields);
append('base64-tool',[b('urlSafe','URL-safe Base64 (패딩 생략)')]);
append('char-counter',[s('clean','텍스트 편집',[['none','원문 유지'],['trim','양끝 공백 정리'],['spaces','모든 공백 제거'],['newlines','줄바꿈 제거'],['upper','대문자'],['lower','소문자']])]);
u['char-counter'].fields.find(f=>f.id==='text').optional=true;
append('hash-generator',[s('source','입력 종류',[['text','텍스트'],['file','파일']])]);u['hash-generator'].accept='*';u['hash-generator'].optionalFile=true;u['hash-generator'].fields.find(f=>f.id==='text').optional=true;
append('text-cleaner',[b('trim','줄 앞뒤 공백 제거',true),b('empty','빈 줄 제거'),b('unique','중복 줄 제거'),s('sort','정렬',[['none','입력 순서'],['asc','오름차순'],['desc','내림차순']])]);
append('text-line-sort',[s('sort','비교 기준',[['alpha','가나다순'],['natural','자연순 (항목2, 항목10)'],['numeric','숫자순'],['none','입력 순서']]),b('reverse','결과 순서 뒤집기'),b('unique','동일 줄 중복 제거'),b('trim','줄 앞뒤 공백 제거'),b('empty','빈 줄 제거')]);
append('text-diff',[s('unit','비교 단위',[['line','줄'],['word','단어·공백'],['char','문자']]),f('leftFile','원본 텍스트 파일 (선택)','','file'),f('rightFile','수정 텍스트 파일 (선택)','','file')]);
for(const field of u['text-diff'].fields)if(field.type==='textarea')field.optional=true;
append('url-encoder',[s('scope','변환 범위',[['component','검색어·매개변수 값'],['url','전체 URL']])]);
append('uuid-generator',[s('format','ID 형식',[['uuid','UUID v4'],['hex','임의32자리 HEX']])]);
append('english-name-converter',[s('surname','성 분리',[['auto','자동 (복성 감지)'],['one','한 글자 성'],['two','두 글자 성']]),s('order','표시 순서',[['family','성+이름'],['given','이름+성']]),s('spacing','이름 표기',[['joined','붙여쓰기'],['space','음절 띄어쓰기'],['hyphen','하이픈']])]);
append('generator-tool',[s('task','생성 종류',[['password','비밀번호'],['draw','항목 무작위 추첨']]),b('upper','대문자 포함',true),b('lower','소문자 포함',true),b('digits','숫자 포함',true),b('symbols','특수문자 포함',true),text('items','추첨 목록 (한 줄 하나, 선택)','다온\n가온\n나온'),n('drawCount','추첨 개수',1)]);
u['generator-tool'].fields.find(f=>f.id==='items').optional=true;
append('qr-generator',[f('foreground','코드 색상','#285a49','color'),f('background','배경 색상','#ffffff','color'),s('correction','오류 복원 수준',[['M','M (15%)'],['L','L (7%)'],['Q','Q (25%)'],['H','H (30%)']])]);
for(const id of ['address-converter','road-address-converter'])append(id,[f('building','동 (선택)'),f('floor','층 (선택)'),f('room','호 (선택)')]);
for(const id of ['img-converter','jpeg-to-jpg','avif-to-jpg','gif-to-jpg','gif-to-png','heic-to-jpg','jpg-to-gif','jpg-to-png','jpg-to-webp','png-to-gif','png-to-jpg','png-to-webp','webp-to-jpg','webp-to-png']){if(!u[id].fields.some(f=>f.id==='quality'))append(id,[n('quality','JPEG·WebP 품질 (10~100)',85)]);}
u['img-compressor'].fields.find(f=>f.id==='format').value='image/jpeg';
append('img-join',[n('fit','맞출 크기 (세로: 너비 / 가로: 높이, 0은 원본)',0),n('padding','바깥 여백 (px)',0),b('transparent','투명 배경')]);
append('img-resizer',[b('lock','원본 가로세로 비율 유지',true),n('scale','원본 대비 비율 (%, 0은 가로·세로 입력)',0)]);
u['img-rotate-flip'].fields=u['img-rotate-flip'].fields.map(f=>f.id==='angle'?n('angle','회전 각도 (°, -360~360)',0):f);
append('img-watermark',[s('kind','워터마크 종류',[['text','글자'],['logo','로고 이미지']]),f('color','글자 색상','#ffffff','color'),f('logo','로고 PNG·JPEG·WebP (선택)','','file'),n('logoWidth','로고 너비 (원본 대비 %)',20),n('margin','가장자리 여백 (px)',20)]);
for(const id of ['pdf-add-blank','pdf-nup','pdf-booklet','pdf-resize']){if(!u[id].fields.some(f=>f.id==='size'))append(id,[s('size','결과 용지',[['A4','A4'],['A3','A3'],['Letter','Letter'],...(id==='pdf-add-blank'?[['same','기준 페이지 크기']]:[])],id==='pdf-add-blank'?'same':'A4')]);append(id,[s('orientation','용지 방향',[['landscape','가로'],['portrait','세로']],id==='pdf-add-blank'||id==='pdf-resize'?'portrait':'landscape')]);}
for(const id of ['pdf-nup','pdf-booklet','pdf-resize'])append(id,[n('outer','바깥 여백 (mm)',10),...(id==='pdf-resize'?[]:[n('gap','페이지 사이 간격 (mm)',5)]),b('enlarge','작은 페이지도 영역에 맞게 확대',true)]);
u['pdf-add-margin'].fields=['left','right','top','bottom'].map((id,i)=>n(id,['왼쪽 여백 (mm)','오른쪽 여백 (mm)','위쪽 여백 (mm)','아래쪽 여백 (mm)'][i],10));
append('pdf-page-num',[s('style','번호 표시 형식',[['number','1'],['fraction','1 / 총면수'],['page','Page 1'],['of','Page 1 of 총면수']]),s('position','위치',[['bottom-center','하단 중앙'],['bottom-right','하단 오른쪽'],['top-center','상단 중앙'],['top-right','상단 오른쪽']]),n('fontSize','글자 크기 (pt)',10),n('margin','가장자리 여백 (pt)',30)]);
append('pdf-watermark',[f('color','색상','#285a49','color'),n('angle','회전 (°)',30),n('opacity','불투명도 (%)',30)]);
append('pdf-watermark',[s('position','텍스트 기준 위치',[['center','가운데'],['custom','입력한 X·Y 위치']])]);
append('pdf-sign',[s('kind','서명 입력',[['text','텍스트'],['image','이미지 파일'],['draw','직접 그리기']])]);
append('pdf-sign',[s('unit','위치 기준',[['pt','PDF포인트 (왼쪽·아래에서)'],['percent','백분율 (왼쪽·위에서)']]),n('percentWidth','백분율 모드의 문서 폭 대비 너비 (%)',30)]);
append('pdf-summary-ai',[s('summaryMode','요약 방식',[['extract','원문 핵심문장 추출 (모델 없음)'],['ai','기기 내 생성형AI (WebGPU 필요)']])]);
append('pdf-split',[s('mode','분할 방식',[['both','범위 추출본+각 페이지 ZIP'],['extract','범위 추출본만'],['each','각 페이지 ZIP만']])]);
for(const id of ['pdf-to-jpg','pdf-to-webp'])append(id,[n('quality','이미지 품질 (10~100)',85)]);
u['pdf-converter'].accept='.pdf,image/*,.txt,.docx,.xlsx,.csv,.hwp,.hwpx';u['pdf-converter'].fields.find(f=>f.id==='output').options.push(['image-pdf','이미지→PDF'],['text-pdf','TXT→PDF'],['word-pdf','Word→본문PDF'],['sheet-pdf','Excel/CSV→본문PDF'],['hwp-pdf','HWP/HWPX→본문PDF']);
u['markdown-viewer'].fields=[text('text','Markdown 직접 입력 (파일 대신 사용 가능)','# 툴마루\n\n**굵은 글자**를 확인하세요.')];u['markdown-viewer'].fields[0].optional=true;u['markdown-viewer'].optionalFile=true;
for(const id of ['img-watermark','pdf-sign','text-diff'])for(const f of u[id].fields)if(f.type==='file')f.optional=true;
for(const id of ['address-converter','road-address-converter'])for(const f of u[id].fields)if(['building','floor','room'].includes(f.id))f.optional=true;
u['pdf-summary-ai'].note='원문 핵심문장 추출은 모델 없이 이용합니다. 생성형AI를 선택하면 WebGPU·모델 다운로드가 필요하며 잘못된 내용을 생성할 수 있습니다. 원문과 대조하세요.';
for(const[id,accept]of Object.entries({'ai-viewer':'.ai','csv-viewer':'.csv','dwg-viewer':'.dwg','epub-viewer':'.epub','excel-viewer':'.xls,.xlsx','hwp-viewer':'.hwp,.hwpx','markdown-viewer':'.md,.markdown,.txt','pdf-viewer':'.pdf','ppt-viewer':'.ppt,.pptx','psd-viewer':'.psd','svg-viewer':'.svg','tiff-viewer':'.tif,.tiff','word-viewer':'.doc,.docx','word-to-pdf':'.doc,.docx','excel-to-pdf':'.xls,.xlsx,.csv','xps-to-pdf':'.xps,.oxps','hwp-to-pdf':'.hwp,.hwpx','epub-to-pdf':'.epub','html-to-pdf':'.html,.htm','txt-to-pdf':'.txt'}))u[id].accept=accept;
u['word-viewer'].note='DOCX 본문·표·이미지와 Word97이상 DOC 본문 텍스트를 읽습니다. 암호·난독화·매크로 실행과 정확한 인쇄 배치는 지원하지 않습니다.';
u['excel-viewer'].note='XLSX·XLS 셀 내용을 읽습니다. 저장된 수식 결과를 사용하며 수식을 새로 실행하지 않습니다. 구형XLS는 시트당 앞1만행·50만셀 제한입니다.';
u['ppt-viewer'].note='PPTX 본문·내장 이미지와 PPT의 현재 슬라이드 본문을 읽습니다. 구형PPT의 배치·그림·애니메이션과 암호 파일은 지원하지 않습니다.';
u['document-to-markdown'].accept+=',.doc,.xls,.ppt';u['pdf-converter'].accept+=',.doc,.xls';
u['tiff-viewer'].note='다중 페이지 TIFF를 최대30프레임까지 미리 봅니다. 파일 정보와 프레임별 PNG를 저장할 수 있습니다.';
}
