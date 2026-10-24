import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {tools} from './catalog.mjs';
import {categories,origin} from './seo.mjs';
import {calculators} from './calculators.mjs';
const read=url=>fs.readFileSync('dist'+(url.endsWith('/')?url+'index.html':url),'utf8');
const structured=html=>[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>JSON.parse(m[1])['@graph']);
test('94개 정적 계산 예시가 실제 입력·결과와 일치',()=>{
 const examples=JSON.parse(fs.readFileSync('seo-examples.json','utf8'));assert.equal(Object.keys(examples).length,94);
 for(const[id,config]of Object.entries(calculators)){const example=examples[id];assert.ok(example,id);assert.equal(config.run({...Object.fromEntries(config.fields.map(f=>[f.id,f.value])),...example.input}),example.result,id);}
});
test('190개 도구 고유 메타·H1·표준 URL과 정적 사용 안내',()=>{
 const descriptions=new Set,titles=new Set;
 for(const[id,name]of tools){const url='/tools/'+id+'/',html=read(url),title=html.match(/<title>(.*?)<\/title>/)[1],description=html.match(/name="description" content="([^"]+)"/)[1];assert.ok(!descriptions.has(description),id+' 중복 설명');descriptions.add(description);assert.ok(!titles.has(title),id+' 중복 제목');titles.add(title);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,id);assert.ok(html.includes(`rel="canonical" href="${origin}${url}"`),id);assert.ok(!/noindex/.test(html),id);assert.ok(html.includes('tool-guide')&&html.includes('related-tools'),id);assert.ok(html.includes('사용 방법')&&html.includes(name),id);}
});
test('구조화 데이터의 실제 URL·도구명·탐색경로가 본문 링크와 일치',()=>{
 for(const[id,name]of tools){const url='/tools/'+id+'/',html=read(url),graph=structured(html),app=graph.find(x=>x['@type']==='WebApplication'),crumb=graph.find(x=>x['@type']==='BreadcrumbList');assert.equal(app.name,name);assert.equal(app.url,origin+url);assert.equal(app.isAccessibleForFree,true);assert.ok(!app.aggregateRating&&!app.review);assert.equal(crumb.itemListElement.at(-1).item,origin+url);for(const c of crumb.itemListElement.slice(0,-1)){assert.ok(html.includes(`href="${c.item.replace(origin,'')}"`),id);assert.ok(fs.existsSync('dist'+c.item.replace(origin,'')+'index.html'));}}
});
test('사이트맵·카테고리·내부 링크가 실제 배포 페이지와 일치',()=>{
 const xml=fs.readFileSync('dist/sitemap.xml','utf8'),urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);assert.equal(urls.length,tools.length+categories.length+5);assert.equal(new Set(urls).size,urls.length);assert.ok(urls.includes(origin+'/tools/crop/'));
 for(const absolute of urls){const path=absolute.replace(origin,''),html=read(path);assert.ok(html.includes(`rel="canonical" href="${absolute}"`),path);for(const match of html.matchAll(/href="(\/[^"#?]*\/?)(?:#[^"]*)?"/g)){const target=match[1];if(target.endsWith('/'))assert.ok(fs.existsSync('dist'+target+'index.html'),path+' → '+target);}}
 for(const[slug,name]of categories){const html=read('/categories/'+slug+'/');for(const[id,,cat]of tools.filter(t=>t[2]===name))assert.ok(html.includes(`href="/tools/${id}/"`),id);assert.ok(structured(html).some(x=>x['@type']==='CollectionPage'));}
 assert.ok(read('/404.html').includes('name="robots" content="noindex,follow"'));assert.ok(!read('/404.html').includes('rel="canonical"'));assert.ok(fs.readFileSync('dist/_headers','utf8').includes('/source/*\n  X-Robots-Tag: noindex'));
});
