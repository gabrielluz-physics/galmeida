import {timeline,awards,talks,visits,teaching,assistantTeaching} from '../src/data/academic.ts';
import {site,bios,formatAcademicDate} from '../src/data/site.ts';
import {readFileSync} from 'node:fs';
for(const item of [...teaching,...talks,...visits])item.displayDate=Object.fromEntries(['en','pt'].map(lang=>[lang,formatAcademicDate(item.date||item.year,lang)]));
console.log(JSON.stringify({site,bios,timeline,awards,talks,visits,teaching,assistantTeaching,publications:JSON.parse(readFileSync(new URL('../src/data/publications.json',import.meta.url),'utf8')).sort((a,b)=>b.year-a.year||b.arxiv.localeCompare(a.arxiv))}));
