export const currentPosition = {
 institution: 'Southeast University', center: 'Shing-Tung Yau Center',
 since: '2025', supervisor: 'Zhengwen Liu',
 en: {role: 'Postdoctoral researcher in theoretical physics', location: 'Nanjing, China'},
 pt: {role: 'Pesquisador de pós-doutorado em física teórica', location: 'Nanquim, China'},
};
export const site = {
 name: 'Gabriel Luz Almeida', email: 'galmeida@seu.edu.cn',
 institution: currentPosition.institution, center: currentPosition.center,
 updated: '2026-09-29',
 profiles: [
  {name:'INSPIRE-HEP',url:'https://inspirehep.net/authors/1845938',mark:'iH'},
  {name:'ORCID',url:'https://orcid.org/0000-0003-0390-0605',mark:'iD'},
  {name:'Google Scholar',url:'https://scholar.google.com/citations?hl=en&user=H__PE8EAAAAJ',mark:'GS'},
 ],
};
export type Lang = 'en' | 'pt';
export const languages: Lang[] = ['en','pt'];
export const pages = ['research','publications','teaching','digest','about','cv','photos','contact'];
export const nav: Record<Lang, Record<string,string>> = {
 en:{home:'Home',research:'Research',publications:'Publications',teaching:'Teaching',digest:'Weekly Digest',about:'About',cv:'CV',photos:'Photos',contact:'Contact'},
 pt:{home:'Início',research:'Pesquisa',publications:'Publicações',teaching:'Ensino',digest:'Boletim semanal',about:'Sobre',cv:'Currículo',photos:'Fotos',contact:'Contato'}
};
export const path = (lang: Lang, page = '') => `${import.meta.env.BASE_URL.replace(/\/$/,'')}/${lang}/${page ? page.replace(/^\/|\/$/g,'')+'/' : ''}`;
export const asset = (name: string) => `${import.meta.env.BASE_URL.replace(/\/$/,'')}/${name.replace(/^\//,'')}`;
export function formatAcademicDate(value: string, lang: Lang): string {
 const locale=lang==='pt'?'pt-BR':'en-GB';
 if(value.includes(' – '))return value.split(' – ').map(v=>formatAcademicDate(v,lang)).join(' – ');
 if(value.includes('/')) {
  const [first,...days]=value.split('/');
  const formatter=new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
  const start=new Date(first+'T12:00:00Z');
  if(days.length===1&&Number(days[0])===Number(first.slice(8))+1)return formatter.formatRange(start,new Date(first.slice(0,8)+days[0]+'T12:00:00Z'));
  const list=new Intl.ListFormat(locale,{style:'long',type:'conjunction'}).format([first.slice(8),...days].map(day=>String(Number(day))));
  return formatter.formatToParts(start).map(part=>part.type==='day'?list:part.value).join('');
 }
 if(!/^\d{4}-\d{2}(-\d{2})?$/.test(value))return value;
 return new Intl.DateTimeFormat(locale,{...(value.length===10?{day:'numeric' as const}:{}),month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value.length===7?value+'-01T12:00:00Z':value+'T12:00:00Z'));
}
export const bios = {
 en: {
  ...currentPosition.en,
  short:'I study the relativistic two-body problem and gravitational waves using effective field theory, post-Newtonian and post-Minkowskian methods, and multiloop techniques.',
  medium:`I am a Brazilian theoretical physicist at the ${site.center}, ${site.institution}. My research connects classical gravitation with quantum field theory and scattering-amplitude methods to describe the dynamics and radiation of compact binaries.`,
  narrative:'My interest in physics began with observing the night sky in Arcoverde, in the interior of Pernambuco. At UFPE, I studied the geometric foundations of general relativity, exact solutions and hidden symmetries. During my doctorate at UFRN and the International Institute of Physics, this background led me to gravitational-wave theory and effective field theory. Research visits in Europe and Brazil, followed by postdoctoral work at USTC and Southeast University, broadened that program to modified gravity and post-Minkowskian scattering.'
 },
 pt: {
  ...currentPosition.pt,
  short:'Estudo o problema relativístico de dois corpos e as ondas gravitacionais por meio de teorias de campos efetivas, métodos pós-newtonianos e pós-minkowskianos e técnicas de integração multiloop.',
  medium:`Sou físico teórico brasileiro e pesquisador no ${site.center} da ${site.institution}. Minha pesquisa conecta a gravitação clássica à teoria quântica de campos e aos métodos de amplitudes de espalhamento para descrever a dinâmica e a radiação de sistemas binários compactos.`,
  narrative:'Meu interesse pela física começou com a observação do céu noturno de Arcoverde, no interior de Pernambuco. Na UFPE, estudei os fundamentos geométricos da relatividade geral, soluções exatas e simetrias escondidas. Durante o doutorado na UFRN e no Instituto Internacional de Física, essa formação me levou à teoria de ondas gravitacionais e às teorias de campos efetivas. Visitas de pesquisa na Europa e no Brasil, seguidas pelos pós-doutorados na USTC e na Southeast University, ampliaram esse programa para a gravidade modificada e o espalhamento pós-minkowskiano.'
 }
};
