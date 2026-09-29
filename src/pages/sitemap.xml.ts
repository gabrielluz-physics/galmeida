import {getCollection} from 'astro:content';
import {languages,pages,path} from '../data/site';
import type {APIRoute} from 'astro';
export const GET:APIRoute=async({site})=>{
 const routes=languages.flatMap(lang=>['',...pages].map(p=>path(lang,p)));
 for(const e of await getCollection('digests'))routes.push(path(e.data.lang,`digest/${e.data.issue}`));
 const esc=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site?routes.map(p=>`<url><loc>${esc(new URL(p,site).href)}</loc></url>`).join(''):''}</urlset>`,{headers:{'Content-Type':'application/xml'}});
};
