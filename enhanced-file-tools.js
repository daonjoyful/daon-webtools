const $=id=>document.getElementById(id);
const bounded=(x,min,max,label)=>{if(!Number.isFinite(x)||x<min||x>max)throw Error(`${label} 범위는 ${min}~${max}입니다.`);return x;};
const rgbHex=h=>{if(!/^#[\da-f]{6}$/i.test(h))throw Error('#RRGGBB 색상을 입력하세요.');return[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255)};
export async function enhancedFileTool(id,v,files,a){
if(id.startsWith('img-')&&id!=='img-crop'||/^(jpeg|avif|gif|heic|jpg|png|webp)-to-(jpg|png|webp|gif)$/.test(id))return imageTool(id,v,files,a);
if(['pdf-add-blank','pdf-add-margin','pdf-nup','pdf-booklet','pdf-resize','pdf-page-num','pdf-watermark','pdf-sign','pdf-split','pdf-compress'].includes(id))return pdfTool(id,v,files,a);
if(/^pdf-to-(jpg|png|webp|tiff)$/.test(id)){
 const doc=await a.readPdf(files[0]),indices=a.range(v.pages||'',doc.numPages);if(indices.length>100)throw Error('최대100페이지입니다.');const output=id.replace('pdf-to-',''),out=[];for(const i of indices){a.checkpoint?.();const c=await a.renderPage(doc,i+1,v.scale);if(output==='tiff'){const{default:UTIF}=await import('utif');out.push([`page-${i+1}.tiff`,UTIF.encodeImage(c.getContext('2d').getImageData(0,0,c.width,c.height).data,c.width,c.height)]);}else{const type=output==='jpg'?'image/jpeg':output==='webp'?'image/webp':'image/png';out.push([`page-${i+1}.${output}`,await a.canvasBlob(c,type,bounded(v.quality??90,10,100,'품질')/100)]);}}await a.zip(out);a.show(`${indices.length}페이지 ${output.toUpperCase()} 변환 완료`);return true;
}
if(id==='pdf-summary-ai'&&v.summaryMode==='extract'){
 const doc=await a.readPdf(files[0]),indices=a.range(v.pages||'',doc.numPages).slice(0,bounded(v.maxPages,1,30,'최대 페이지')),pages=await a.extractPdf(doc,indices),sentences=pages.flatMap(p=>p.text.split(/(?<=[.!?。])\s+|\n+/).map(s=>({text:s.trim(),page:p.index+1}))).filter(s=>s.text.length>15),unique=[...new Map(sentences.map(s=>[s.text,s])).values()];if(!unique.length)throw Error('추출할 본문이 없습니다. OCR을 먼저 사용하세요.');const frequency=new Map;for(const s of unique)for(const w of s.text.toLowerCase().match(/[\p{L}\p{N}]{2,}/gu)||[])frequency.set(w,(frequency.get(w)||0)+1);const selected=unique.map((s,i)=>({...s,i,score:(s.text.toLowerCase().match(/[\p{L}\p{N}]{2,}/gu)||[]).reduce((sum,w)=>sum+(frequency.get(w)||0),0)/Math.sqrt(s.text.length)})).sort((a,b)=>b.score-a.score).slice(0,5).sort((a,b)=>a.i-b.i);a.show('원문 핵심문장 추출 (생성형 AI 사용 안 함)\n\n'+selected.map(s=>`[${s.page}쪽] ${s.text}`).join('\n\n'));return true;
}
return false;
}
async function imageTool(id,v,files,a){
 const images=[];try{
 for(const f of files)images.push(await a.decodeImage(f));const im=images[0];let w=im.width,h=im.height,plan=[];
 if(id==='img-resizer'){if(v.scale>0){bounded(v.scale,.1,1000,'배율');w=Math.round(im.width*v.scale/100);h=Math.round(im.height*v.scale/100);}else{w=v.width;h=v.lock||!v.height?Math.round(im.height*w/im.width):v.height;}}
 if(id==='img-compressor'&&w>v.maxWidth){w=bounded(v.maxWidth,1,16000,'최대 너비');h=Math.round(im.height*w/im.width);}
 if(id==='img-rotate-flip'){bounded(v.angle,-360,360,'회전각');const angle=v.angle*Math.PI/180;w=Math.ceil(Math.abs(im.width*Math.cos(angle))+Math.abs(im.height*Math.sin(angle))-1e-8);h=Math.ceil(Math.abs(im.width*Math.sin(angle))+Math.abs(im.height*Math.cos(angle))-1e-8);}
 if(id==='img-join'){
 if(images.length<2)throw Error('이미지2개 이상을 선택하세요.');bounded(v.gap,0,2000,'간격');bounded(v.padding,0,2000,'여백');bounded(v.fit,0,16000,'맞출 크기');plan=images.map(image=>{const scale=v.fit?(v.direction==='vertical'?v.fit/image.width:v.fit/image.height):1;return{image,w:Math.round(image.width*scale),h:Math.round(image.height*scale)}});
 w=(v.direction==='vertical'?Math.max(...plan.map(i=>i.w)):plan.reduce((s,i)=>s+i.w,0)+v.gap*(plan.length-1))+2*v.padding;h=(v.direction==='vertical'?plan.reduce((s,i)=>s+i.h,0)+v.gap*(plan.length-1):Math.max(...plan.map(i=>i.h)))+2*v.padding;
 }
 if(!Number.isInteger(w)||!Number.isInteger(h)||w<1||h<1||w>16000||h>16000||w*h>40000000)throw Error('결과 크기는 각1~16000px, 총4천만 픽셀 이하여야 합니다.');
 const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');const gif=/-to-gif$/.test(id);let type=v.format||(/-to-(jpg|jpeg)$/.test(id)?'image/jpeg':id.endsWith('-to-webp')?'image/webp':'image/png');
 if(type==='image/jpeg'||id==='img-join'&&!v.transparent){ctx.fillStyle=v.background||'#ffffff';ctx.fillRect(0,0,w,h);}
 if(id==='img-join'){let p=v.padding;for(const item of plan){ctx.drawImage(item.image,v.direction==='vertical'?v.padding:p,v.direction==='vertical'?p:v.padding,item.w,item.h);p+=(v.direction==='vertical'?item.h:item.w)+v.gap;}}
 else if(id==='img-rotate-flip'){ctx.translate(w/2,h/2);ctx.scale(v.flip==='horizontal'?-1:1,v.flip==='vertical'?-1:1);ctx.rotate(v.angle*Math.PI/180);ctx.drawImage(im,-im.width/2,-im.height/2);ctx.setTransform(1,0,0,1,0,0);}
 else{if(id==='img-adjust')ctx.filter=`brightness(${bounded(v.brightness,0,200,'밝기')}%) contrast(${bounded(v.contrast,0,200,'대비')}%) grayscale(${bounded(v.grayscale,0,100,'흑백')}%)`;ctx.drawImage(im,0,0,w,h);ctx.filter='none';}
 if(id==='img-color-picker'){
 const preview=a.previewImage(await a.canvasBlob(c));const pick=(x,y)=>{if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||y<0||x>=w||y>=h)throw Error('이미지 범위 안의 정수 좌표를 입력하세요.');const[r,g,b,alpha]=ctx.getImageData(x,y,1,1).data,max=Math.max(r,g,b)/255,min=Math.min(r,g,b)/255,delta=max-min,l=(max+min)/2,s=delta?delta/(1-Math.abs(2*l-1)):0;let hue=delta?(max===r/255?((g-b)/255/delta)%6:max===g/255?(b-r)/255/delta+2:(r-g)/255/delta+4)*60:0;hue=(hue+360)%360;a.show(`좌표: ${x}, ${y}\nHEX #${[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}\nRGB ${r}, ${g}, ${b}\nHSL ${a.numfmt(hue)}°, ${a.numfmt(s*100)}%, ${a.numfmt(l*100)}%\n불투명도 ${a.numfmt(alpha/255*100)}%`);};pick(v.x,v.y);preview.addEventListener('click',e=>{const r=preview.getBoundingClientRect();pick(Math.min(w-1,Math.floor((e.clientX-r.left)*w/r.width)),Math.min(h-1,Math.floor((e.clientY-r.top)*h/r.height)));a.exportText?.(id)});return true;
 }
 if(id==='img-watermark'){
 const margin=bounded(v.margin,0,Math.min(w,h)/2-1,'가장자리 여백');ctx.globalAlpha=bounded(v.opacity,0,100,'불투명도')/100;
 if(v.kind==='logo'){const logo=$('ext-logo')?.files[0];if(!logo)throw Error('로고 이미지를 선택하세요.');if(logo.size>10*1024**2)throw Error('로고는10MB이하입니다.');const image=await a.decodeImage(logo);try{const width=Math.min(w-2*margin,w*bounded(v.logoWidth,1,100,'로고비율')/100),height=width*image.height/image.width;if(height>h-2*margin)throw Error('로고가 너무 큽니다. 너비를 줄이세요.');const x=v.position.includes('right')?w-margin-width:v.position==='center'?(w-width)/2:margin,y=v.position.includes('bottom')?h-margin-height:v.position==='center'?(h-height)/2:margin;ctx.drawImage(image,x,y,width,height);}finally{image.close()}}
 else{if(!v.mark.trim()||v.mark.length>200)throw Error('워터마크 문구1~200자를 입력하세요.');ctx.font=`600 ${bounded(v.fontSize,1,1000,'글자크기')}px sans-serif`;ctx.textAlign=v.position.includes('right')?'right':v.position==='center'?'center':'left';ctx.textBaseline=v.position.includes('top')?'top':v.position==='center'?'middle':'bottom';ctx.fillStyle=v.color;ctx.fillText(v.mark,v.position.includes('right')?w-margin:v.position==='center'?w/2:margin,v.position.includes('top')?margin:v.position==='center'?h/2:h-margin,w-2*margin);}ctx.globalAlpha=1;
 }
 let blob;if(gif){const{default:gifenc}=await import('gifenc'),rgba=ctx.getImageData(0,0,w,h).data,palette=gifenc.quantize(rgba,256),encoder=gifenc.GIFEncoder();encoder.writeFrame(gifenc.applyPalette(rgba,palette),w,h,{palette});encoder.finish();blob=new Blob([encoder.bytes()],{type:'image/gif'});}else blob=await a.canvasBlob(c,type,bounded(v.quality??85,10,100,'품질')/100);
 a.file(blob,`daon-${id}.${blob.type.split('/')[1]}`,blob.type);a.previewImage(blob);a.show(`${w}×${h}px\n${a.numfmt(blob.size/1024)}KB${id==='img-compressor'?`\n원본 대비 ${a.numfmt(blob.size/files[0].size*100)}%${blob.size>=files[0].size?' (더 작아지지 않았습니다. 형식·크기·품질을 조정하세요.)':''}`:''}`);return true;
 }finally{images.forEach(image=>image.close())}
}
async function pdfTool(id,v,files,a){
 const{PDFDocument,degrees,rgb}=await import('pdf-lib');const bytes=await files[0].arrayBuffer(),doc=await PDFDocument.load(bytes),total=doc.getPageCount();if(total>500)throw Error('최대500페이지입니다.');const indices=a.range(v.pages||'',total);const out=await PDFDocument.create();
 const finish=async(d,name='daon-result.pdf')=>a.pdfOutput(await d.save({useObjectStreams:true}),name);
 const sizes={A4:[595.28,841.89],A3:[841.89,1190.55],Letter:[612,792]};
 if(id==='pdf-split'){
 if(v.mode!=='each'){for(const p of await out.copyPages(doc,indices))out.addPage(p);await finish(out,'daon-extracted.pdf');}
 if(v.mode!=='extract'){const results=[];for(const[i,n]of indices.entries()){a.checkpoint?.();const single=await PDFDocument.create();single.addPage((await single.copyPages(doc,[n]))[0]);results.push([`${i+1}-page-${n+1}.pdf`,await single.save()]);}await a.zip(results,'daon-split.zip');}a.show(`${indices.length}페이지 분할·추출 완료`);return true;
 }
 if(id==='pdf-add-blank'){
 if(!Number.isInteger(v.after)||v.after<0||v.after>total||!Number.isInteger(v.count)||v.count<1||total+v.count>500)throw Error('추가 위치와 빈 페이지 수(결과500페이지 이하)를 확인하세요.');const basePage=doc.getPage(Math.max(0,v.after-1));let size=v.size==='same'?[basePage.getWidth(),basePage.getHeight()]:[...sizes[v.size]];if(v.size!=='same'&&(v.orientation==='landscape'&&size[0]<size[1]||v.orientation==='portrait'&&size[0]>size[1]))size.reverse();const pages=await out.copyPages(doc,doc.getPageIndices());for(let i=0;i<=total;i++){if(i===v.after)for(let n=0;n<v.count;n++)out.addPage(size);if(i<total)out.addPage(pages[i]);}await finish(out);a.show(`${v.after}페이지 뒤 빈 페이지${v.count}장 추가 · 총${out.getPageCount()}페이지`);return true;
 }
 if(['pdf-add-margin','pdf-nup','pdf-booklet','pdf-resize'].includes(id)){
 const embeds=await out.embedPdf(bytes,doc.getPageIndices()),visual=embeds.map((e,i)=>{const rotation=((doc.getPage(i).getRotation().angle%360)+360)%360;return{e,rotation,w:rotation%180?e.height:e.width,h:rotation%180?e.width:e.height}});
 const draw=(page,item,x,y,scale)=>{const{e,rotation:r}=item,rawW=e.width*scale,rawH=e.height*scale;page.drawPage(e,{x:x+(r===180?rawW:r===270?rawH:0),y:y+(r===90?rawW:r===180?rawH:0),width:rawW,height:rawH,rotate:degrees(-r)});};
 if(id==='pdf-add-margin'){const[left,right,top,bottom]=['left','right','top','bottom'].map(k=>bounded(v[k],0,100,'여백')*72/25.4);for(const item of visual){const page=out.addPage([item.w+left+right,item.h+top+bottom]);draw(page,item,left,bottom,1);}}
 else{let size=[...sizes[v.size]];if(v.orientation==='landscape'&&size[0]<size[1]||v.orientation==='portrait'&&size[0]>size[1])size.reverse();const per=id==='pdf-resize'?1:id==='pdf-booklet'?2:Number(v.nup),cols=per===1?1:per===2?2:per===4?2:3,rows=Math.ceil(per/cols),margin=bounded(v.outer,0,100,'바깥여백')*72/25.4,gap=bounded(v.gap??0,0,100,'간격')*72/25.4,cw=(size[0]-margin*2-gap*(cols-1))/cols,ch=(size[1]-margin*2-gap*(rows-1))/rows;if(cw<=0||ch<=0)throw Error('여백·간격이 용지보다 큽니다.');let order=visual.map((_,i)=>i);if(id==='pdf-booklet'){order=[];const padded=Math.ceil(total/4)*4;for(let lo=0,hi=padded-1;lo<hi;lo+=2,hi-=2)order.push(hi,lo,lo+1,hi-1);}for(let i=0;i<order.length;i+=per){a.checkpoint?.();const page=out.addPage(size);for(let j=0;j<per;j++){const item=visual[order[i+j]];if(!item)continue;let scale=Math.min(cw/item.w,ch/item.h);if(!v.enlarge)scale=Math.min(1,scale);draw(page,item,margin+j%cols*(cw+gap)+(cw-item.w*scale)/2,size[1]-margin-(Math.floor(j/cols)+1)*ch-Math.floor(j/cols)*gap+(ch-item.h*scale)/2,scale);}}}
 await finish(out);a.show(`${total}페이지 → ${out.getPageCount()}페이지 레이아웃 변환 완료${id==='pdf-booklet'?'\n양면 인쇄 방향과 접지 순서를 미리보기로 확인하세요.':''}`);return true;
 }
 if(id==='pdf-compress'){
 let result;if(v.mode==='raster'){const source=await a.readPdf(files[0]);for(let i=1;i<=total;i++){a.checkpoint?.();const c=await a.renderPage(source,i,v.scale),jpeg=await a.canvasBlob(c,'image/jpeg',bounded(v.quality,10,100,'품질')/100),image=await out.embedJpg(await jpeg.arrayBuffer()),p=out.addPage([c.width/v.scale,c.height/v.scale]);p.drawImage(image,{x:0,y:0,width:p.getWidth(),height:p.getHeight()});}result=await out.save();}else result=await doc.save({useObjectStreams:true,addDefaultPage:false});await a.pdfOutput(result);a.show(`원본 ${a.numfmt(bytes.byteLength/1024)}KB → 결과 ${a.numfmt(result.length/1024)}KB\n${result.length<bytes.byteLength?'용량 감소':'원본보다 작아지지 않았습니다. 원본 유지 또는 이미지 재구성 옵션을 검토하세요.'}${v.mode==='raster'?'\n이미지 재구성으로 텍스트·양식·기존 서명이 소실됩니다.':''}`);return true;
 }
 const font=await a.koreanFont(doc);
 if(id==='pdf-page-num'){
 if(!Number.isInteger(v.start))throw Error('시작 번호는 정수입니다.');bounded(v.fontSize,6,100,'글자크기');for(const[i,page]of doc.getPages().entries()){const current=v.start+i,text=v.style==='fraction'?`${current} / ${total}`:v.style==='page'?`Page ${current}`:v.style==='of'?`Page ${current} of ${total}`:String(current),width=font.widthOfTextAtSize(text,v.fontSize),margin=bounded(v.margin,0,Math.min(page.getWidth(),page.getHeight())/2,'여백'),x=v.position.endsWith('right')?page.getWidth()-margin-width:(page.getWidth()-width)/2,y=v.position.startsWith('top')?page.getHeight()-margin-v.fontSize:margin;page.drawText(text,{x,y,size:v.fontSize,font});}
 }else if(id==='pdf-watermark'){
 if(!v.mark.trim()||v.mark.length>200)throw Error('워터마크 문구1~200자를 입력하세요.');const color=rgb(...rgbHex(v.color)),size=bounded(v.fontSize,1,500,'글자크기'),angle=bounded(v.angle,-360,360,'회전각'),opacity=bounded(v.opacity,0,100,'불투명도')/100;for(const i of indices){const p=doc.getPage(i),width=font.widthOfTextAtSize(v.mark,size),r=angle*Math.PI/180;p.drawText(v.mark,{x:v.position==='custom'?v.x:p.getWidth()/2-(width*Math.cos(r)-size*Math.sin(r))/2,y:v.position==='custom'?v.y:p.getHeight()/2-(width*Math.sin(r)+size*Math.cos(r))/2,size,font,color,opacity,rotate:degrees(angle)});}
 }else if(id==='pdf-sign'){
 if(!Number.isInteger(v.page)||v.page<1||v.page>total)throw Error('서명 페이지를 확인하세요.');const p=doc.getPage(v.page-1);let image;
 if(v.kind==='draw'){const c=$('ext-signature');if(c.dataset.empty!=='false')throw Error('서명 영역에 직접 그려주세요.');image=await doc.embedPng(await(await a.canvasBlob(c)).arrayBuffer());}
 else if(v.kind==='image'){const f=$('ext-sign')?.files[0];if(!f)throw Error('서명 PNG/JPEG 이미지를 선택하세요.');if(f.size>10*1024**2)throw Error('서명 이미지는10MB이하입니다.');const bytes=await f.arrayBuffer();image=/\.png$/i.test(f.name)?await doc.embedPng(bytes):await doc.embedJpg(bytes);}
 const width=v.unit==='percent'?p.getWidth()*bounded(v.percentWidth,1,100,'서명너비')/100:bounded(v.width,1,p.getWidth(),'서명너비'),height=image?width*image.height/image.width:28,x=v.unit==='percent'?p.getWidth()*bounded(v.x,0,100,'가로위치')/100:v.x,y=v.unit==='percent'?p.getHeight()*(1-bounded(v.y,0,100,'세로위치')/100)-height:v.y;if(x<0||y<0||x+width>p.getWidth()||y+height>p.getHeight())throw Error('서명이 페이지를 벗어납니다. 위치·크기를 조정하세요.');if(image)p.drawImage(image,{x,y,width,height});else{if(!v.mark.trim())throw Error('서명 문구를 입력하세요.');p.drawText(v.mark,{x,y,size:24,font,maxWidth:width});}
 }
 await finish(doc);a.show('PDF 작업 완료. 시각적 합성 결과를 확인하세요.');return true;
}
