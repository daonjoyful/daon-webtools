import fs from 'node:fs';
import{calculators}from'./calculators.mjs';import{utilityConfig}from'./utility-config.mjs';
export const tools=JSON.parse(fs.readFileSync(new URL('./reference-tools.json',import.meta.url),'utf8')).map(t=>[t.slug,t.name,t.category,calculators[t.slug]?.formula||utilityConfig[t.slug]?.note||t.name,'입력 조건과 지원 범위를 확인하세요.']);
