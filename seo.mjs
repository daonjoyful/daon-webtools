import fs from 'node:fs';
import {calculators} from './calculators.mjs';
import {utilityConfig} from './utility-config.mjs';
const reference=JSON.parse(fs.readFileSync(new URL('./reference-tools.json',import.meta.url),'utf8'));
const examples=JSON.parse(fs.readFileSync(new URL('./seo-examples.json',import.meta.url),'utf8'));
export const origin='https://tools.daonjoyful.com';
// Dates change only when the corresponding content changes, never on every build.
export const contentUpdated='2026-10-25';
export const categories=[
 ['calculators','일반 계산 도구','세금·급여·대출부터 운동·날짜·수학까지 필요한 계산식을 골라 입력 조건에 따른 결과를 비교하세요. 금액·기간·비율의 단위와 각 계산기의 적용 범위를 함께 확인할 수 있습니다.'],
 ['text','텍스트·개발 도구','글자 수 분석, 인코딩, 해시, JSON과 텍스트 비교 작업을 처리하세요. 원문을 입력하거나 지원 파일을 선택하고 결과를 복사해 사용할 수 있습니다.'],
 ['daily','생활 도구','주소·영문 이름·단위 변환과 QR·무작위 값 생성 도구를 모았습니다. 주소 검색은 별도 동의와 네트워크 연결이 필요하며 나머지 계산과 생성은 브라우저에서 처리합니다.'],
 ['viewers','파일 뷰어','PDF·Office·한글·이미지·전자책·CAD의 지원되는 본문과 미리보기를 확인하세요. 파일 형식별로 배치·암호·개체 지원 범위가 다르므로 각 도구의 안내를 확인하세요.'],
 ['from-pdf','PDF에서 변환하기','PDF의 페이지를 이미지·텍스트·Office 파일로 변환하세요. 이미지 출력과 텍스트 추출의 차이, 스캔 문서의 OCR 필요 여부를 확인한 뒤 출력 형식을 선택하세요.'],
 ['to-pdf','PDF로 변환하기','이미지와 문서의 지원되는 내용을 PDF로 만드세요. 이미지 파일은 페이지로 배치하고, Office·한글·전자책 등은 본문 텍스트 중심으로 PDF를 재구성합니다.'],
 ['converters','이미지 및 기타 변환','이미지 포맷, CSV·Markdown과 압축 파일을 변환하세요. 투명 배경·애니메이션·압축 형식에 따라 보존되는 내용이 다르므로 출력 결과를 확인하세요.'],
 ['image-editing','이미지 편집 도구','이미지 크기·회전·색상·밝기를 조절하고 여러 이미지를 이어 붙이거나 워터마크를 넣으세요. 입력 파일은 기기에서 처리하며 결과를 이미지 파일로 저장합니다.'],
 ['pdf-layout','PDF 인쇄·레이아웃','PDF의 여백·용지·빈 페이지를 조절하고 모아찍기·소책자 인쇄용 배치를 만드세요. 원본 페이지와 결과 페이지 수를 비교하고 인쇄 전에 미리보기를 확인하세요.'],
 ['pdf-editing','PDF 편집 및 서명','PDF 병합·분할·페이지 정리·번호·서명·OCR·요약 도구를 모았습니다. 원본을 보관하고 시각적 서명, 텍스트 인식, 요약 등 기능별 처리 범위를 확인하세요.']
];
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const categoryFor=name=>categories.find(x=>x[1]===name);
export const categoryPath=name=>'/categories/'+categoryFor(name)[0]+'/';
const valueText=(field,value)=>field.type==='checkbox'?(value?'선택':'선택 안 함'):field.options?.find(([v])=>String(v)===String(value))?.[1]??(field.type==='number'&&Number.isFinite(Number(value))?Number(value).toLocaleString('ko-KR',{maximumFractionDigits:10}):String(value??''));
export function toolDescription(id,name){
 const config=calculators[id]||utilityConfig[id];
 const fields=config.fields.filter(f=>f.type!=='file').slice(0,3).map(f=>f.label.replace(/\s*\([^)]*\)/g,''));
 const task=calculators[id]?'입력 조건에 따른 계산 결과를 확인하세요.':config.optionalFile?'텍스트 또는 지원 파일을 브라우저에서 처리하세요.':config.accept?'지원 파일을 선택해 브라우저에서 처리하고 결과를 확인하세요.':'입력한 내용을 브라우저에서 처리하고 결과를 복사하세요.';
 const detail=calculators[id]?.formula||config.note||'';
 return `${name}. ${task} ${fields.length?'설정: '+fields.join('·')+'. ':''}${detail}`.slice(0,185);
}
export function toolHead(id,name,category,url='/tools/'+id+'/'){
 const description=toolDescription(id,name),absolute=origin+url;
 return {description,schema:[{'@type':'WebApplication','@id':absolute+'#tool',name,url:absolute,description,applicationCategory:'UtilitiesApplication',applicationSubCategory:category,operatingSystem:'Web browser',inLanguage:'ko',isAccessibleForFree:true,browserRequirements:'JavaScript 지원 브라우저. 파일·GPU 기능은 도구별 지원 범위 참조.',offers:{'@type':'Offer',price:'0',priceCurrency:'KRW'},publisher:{'@id':origin+'/#organization'}},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'홈',item:origin+'/'},{'@type':'ListItem',position:2,name:category,item:origin+categoryPath(category)},{'@type':'ListItem',position:3,name,item:absolute}]}]};
}
export function structuredData(nodes){return '<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':nodes}).replaceAll('<','\\u003c')+'</script>';}
export function toolGuide(id,name,category){
 const config=calculators[id]||utilityConfig[id],calc=calculators[id],example=examples[id];
 const inputs=config.fields.filter(f=>!['file','checkbox'].includes(f.type));
 const steps=calc?[`입력란에 ${inputs.slice(0,4).map(f=>f.label).join(', ')} 등의 조건을 입력합니다.`,'필요한 계산 방식과 단위를 선택한 뒤 실행하기를 누릅니다.','아래 계산 기준·예시와 결과를 비교하고, 조건을 바꿔 다시 계산합니다.']:config.accept&&!config.optionalFile?[`지원 형식 ${config.accept.replaceAll(',',' · ')}의 파일을 선택합니다.`,`${config.multiple?'여러 파일은 선택 순서를 확인하고 필요하면 위로·아래로 버튼으로 정렬합니다.':'파일 이름과 형식을 확인합니다.'}${inputs.length?' '+inputs.slice(0,3).map(f=>f.label).join(', ')+' 등 필요한 옵션을 설정합니다.':''}`,'실행하기를 누른 뒤 결과를 확인하고 다운로드합니다. 변환 결과는 원본과 비교하세요.']:[`${inputs.slice(0,3).map(f=>f.label).join(', ')||'변환할 내용'}을 입력합니다.`,'필요한 처리 방식을 선택하고 실행하기를 누릅니다.','결과를 확인한 뒤 결과 복사 또는 다운로드 버튼을 사용합니다.'];
 let content=`<section class="guide tool-guide" aria-label="${esc(name)} 사용 안내"><h2>${esc(name)} 사용 방법</h2><ol>${steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`;
 if(calc&&example){const used=config.fields.filter(f=>Object.hasOwn(example.input,f.id));content+=`<h2>계산 예시</h2><p>아래는 기능 확인을 위한 예제 입력입니다. 실제 적용할 조건으로 바꿔 계산하세요.</p><div class="table-scroll" role="region" aria-label="예제 입력값" tabindex="0"><table><thead><tr><th scope="col">입력 항목</th><th scope="col">예제 값</th></tr></thead><tbody>${used.map(f=>`<tr><th scope="row">${esc(f.label)}</th><td>${esc(valueText(f,example.input[f.id]))||'(비워 둠)'}</td></tr>`).join('')}</tbody></table></div><h3>예제 결과</h3><pre>${esc(example.result)}</pre>`;}
 else {const choices=config.fields.filter(f=>f.type==='select');content+=`<h2>${esc(name)} 입력·출력 안내</h2>${config.accept?`<p>파일 선택기에 표시되는 지원 확장자: <code>${esc(config.accept)}</code>. 파일당 30MB, 선택 파일 합계 60MB까지이며 도구에 따라 페이지·이미지 크기 등의 추가 제한이 적용됩니다.</p>`:''}${choices.length?`<dl>${choices.map(f=>`<dt>${esc(f.label)}</dt><dd>${f.options.map(([,n])=>esc(n)).join(' / ')}</dd>`).join('')}</dl>`:`<p>${esc(config.note||'입력 내용을 처리해 화면에 결과를 표시합니다. 결과를 확인한 뒤 복사하거나 파일로 저장하세요.')}</p>`}<p>처리되지 않으면 입력 형식과 옵션을 확인하세요.${config.accept?' 암호화·손상된 파일과 지원되지 않는 내부 형식은 처리할 수 없습니다.':''} ${esc(config.note||'')}</p>`;}
 const same=reference.filter(t=>t.category===category&&t.slug!==id),index=reference.filter(t=>t.category===category).findIndex(t=>t.slug===id);
 const related=Array.from({length:Math.min(6,same.length)},(_,i)=>same[(Math.max(0,index)+i)%same.length]);
 content+=`<p class="muted">도구·안내 확인일: <time datetime="${contentUpdated}">${contentUpdated}</time> · 운영: <a href="/about/">툴마루</a> · <a href="https://github.com/daonjoyful/daon-webtools/issues">오류 제보</a></p><h2>함께 사용할 ${esc(category)}</h2><ul class="related-tools">${related.map(t=>`<li><a href="/tools/${t.slug}/">${esc(t.name)}</a></li>`).join('')}</ul><p><a href="${categoryPath(category)}">${esc(category)} 전체 보기 →</a></p></section>`;
 return content;
}
