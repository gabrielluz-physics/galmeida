import fs from 'node:fs';
import path from 'node:path';
import {parse} from 'parse5';
import {research} from '../src/data/research.ts';

const root=path.resolve('dist');
const basePrefix='/'+(process.env.BASE_PATH||'').split('/').filter(Boolean).join('/');
const base=basePrefix==='/'?'':basePrefix;
const errors=[];let links=0,images=0;
const files=[];
function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,f.name);f.isDirectory()?walk(p):files.push(p)}}
walk(root);
const htmlFiles=files.filter(f=>f.endsWith('.html'));const cache=new Map();
function nodes(doc){const out=[];function rec(n){if(n.tagName)out.push(n);for(const c of n.childNodes||[])rec(c)}rec(doc);return out}
function load(f){if(!cache.has(f)){const source=fs.readFileSync(f,'utf8');const ns=nodes(parse(source));cache.set(f,{source,ns,ids:ns.flatMap(n=>n.attrs.filter(a=>a.name==='id').map(a=>a.value))})}return cache.get(f)}
const attr=(n,k)=>n.attrs.find(a=>a.name===k)?.value;
for(const f of htmlFiles){
 const {source,ns,ids}=load(f);const label=path.relative(root,f);const isRedirect=/http-equiv="refresh"/i.test(source);
 if(!isRedirect){
  if(ns.filter(n=>n.tagName==='h1').length!==1)errors.push(label+': needs exactly one h1');
  if(!ns.some(n=>n.tagName==='meta'&&attr(n,'name')==='description'&&attr(n,'content')))errors.push(label+': missing description');
  if(ns.filter(n=>n.tagName==='main').length!==1)errors.push(label+': needs one main landmark');
  let last=0;for(const n of ns.filter(n=>/^h[1-6]$/.test(n.tagName))){const level=Number(n.tagName[1]);if(level>last+1)errors.push(label+': skipped heading level '+n.tagName);last=level;}
 }
 if(new Set(ids).size!==ids.length)errors.push(label+': duplicate ids');
 if(/lorem ipsum|YOUR_USERNAME|placeholder text/i.test(source)||/\bTODO\b/.test(source))errors.push(label+': unexpected placeholder');
 for(const e of source.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)||[])if(e!=='galmeida@seu.edu.cn')errors.push(label+': noninstitutional email');
 const lang=label.startsWith('pt/')?'pt':label.startsWith('en/')?'en':undefined;
 if(lang){
  const expectedLang=lang==='pt'?'pt-BR':'en';
  if(attr(ns.find(n=>n.tagName==='html'),'lang')!==expectedLang)errors.push(label+': incorrect document language');
  const other=lang==='pt'?'en':'pt';const counterpart=base+'/'+label.replace(new RegExp('^'+lang+'/'),other+'/').replace(/index\.html$/,'');
  if(!ns.some(n=>n.tagName==='a'&&attr(n,'href')===counterpart&&attr(n,'lang')===(other==='pt'?'pt-BR':'en')))errors.push(label+': missing equivalent language switch');
 }
 for(const n of ns){
  if(n.tagName==='img'){images++;if(!attr(n,'alt'))errors.push(label+': missing image alt');if(!attr(n,'width')||!attr(n,'height'))errors.push(label+': missing image dimensions');}
  for(const key of ['href','src']){
   const val=attr(n,key);if(!val||/^(https?:|mailto:|data:|tel:)/.test(val))continue;
   if(/^javascript:/i.test(val)){errors.push(label+': javascript URL');continue;}
   links++;
   const current=base+'/'+label.replace(/index\.html$/,'');const u=new URL(val,'https://audit.invalid'+current);
   if(!u.pathname.startsWith(base+'/')&&u.pathname!==base){errors.push(label+': base path escaped '+val);continue}
   let target=path.join(root,decodeURIComponent(u.pathname.slice(base.length)));
   if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
   if(!fs.existsSync(target)){errors.push(label+': broken link '+val);continue}
   if(u.hash&&target.endsWith('.html')&&!load(target).ids.includes(decodeURIComponent(u.hash.slice(1))))errors.push(label+': missing anchor '+val);
  }
 }
 if(process.env.SITE_URL&&lang){
  const expected=new URL(base+'/'+label.replace(/index\.html$/,''),process.env.SITE_URL).href;
  if(!ns.some(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'&&attr(n,'href')===expected))errors.push(label+': wrong production canonical');
  for(const hl of ['en','pt-BR','x-default'])if(!ns.some(n=>n.tagName==='link'&&attr(n,'hreflang')===hl&&attr(n,'href')?.startsWith(new URL(base+'/',process.env.SITE_URL).href)))errors.push(label+': missing production hreflang '+hl);
 }
}
for(const lang of ['en','pt'])for(const route of ['','research','publications','teaching','digest','about','cv','photos','contact'])if(!fs.existsSync(path.join(root,lang,route,'index.html')))errors.push('missing route '+lang+'/'+route);
const publications=JSON.parse(fs.readFileSync('src/data/publications.json','utf8'));
for(const key of ['id','arxiv'])if(new Set(publications.map(p=>p[key])).size!==publications.length)errors.push('duplicate publication '+key);
const topics=new Set(['PM','PN','EFT','Radiation','Modified gravity','Exact solutions']);
for(const p of publications){
 if(!p.title||!Array.isArray(p.authors)||!p.authors.length||!/^\d{4}\.\d{4,5}$/.test(p.arxiv)||!Number.isInteger(p.year)||!['preprint','published'].includes(p.status)||typeof p.selected!=='boolean')errors.push('invalid publication '+p.id);
 if(p.status==='published'&&!p.journal)errors.push('missing journal '+p.id);
 if([p.doi,p.erratumDoi].some(doi=>doi&&!/^10\.\d{4,9}\/.+/.test(doi)))errors.push('invalid DOI '+p.id);
 if(!p.topics?.length||p.topics.some(t=>!topics.has(t)))errors.push('invalid topic '+p.id);
}
for(const r of research)for(const id of r.papers)if(!publications.some(p=>p.id===id))errors.push('unknown research publication '+id);
const digestRoutes=htmlFiles.filter(f=>/\/(en|pt)\/digest\/[^/]+\/index\.html$/.test(f));
for(const f of digestRoutes){const other=f.includes('/en/')?f.replace('/en/','/pt/'):f.replace('/pt/','/en/');if(!fs.existsSync(other))errors.push('missing digest translation '+f);}
const assets=files.filter(f=>/\.(webp|css|js)$/.test(f)).map(f=>({file:path.relative(root,f),bytes:fs.statSync(f).size}));
const report={pages:htmlFiles.length,digestPages:digestRoutes.length,localReferences:links,images,publications:publications.length,base:base||'/',externalJsBytes:assets.filter(a=>a.file.endsWith('.js')).reduce((s,a)=>s+a.bytes,0),maxInlineJsBytes:Math.max(...htmlFiles.map(f=>load(f).ns.filter(n=>n.tagName==='script'&&attr(n,'type')!=='application/ld+json').reduce((sum,n)=>sum+(n.childNodes||[]).reduce((v,c)=>v+Buffer.byteLength(c.value||''),0),0))),largestImageBytes:Math.max(...assets.filter(a=>a.file.endsWith('.webp')).map(a=>a.bytes)),errors};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exit(1);
