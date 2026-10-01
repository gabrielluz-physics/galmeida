export const currentPosition = {
 institution: 'Southeast University', center: 'Shing-Tung Yau Center',
 since: '2025', supervisor: 'Zhengwen Liu',
 en: {role: 'Postdoctoral researcher in theoretical physics', location: 'Nanjing, China'},
 pt: {role: 'Pesquisador de pós-doutorado em física teórica', location: 'Nanquim, China'},
};
export const site = {
 name: 'Gabriel Luz Almeida', email: 'galmeida@seu.edu.cn',
 institution: currentPosition.institution, center: currentPosition.center,
 updated: '2026-10-01',
 profiles: [
  {name:'INSPIRE-HEP',url:'https://inspirehep.net/authors/1845938',mark:'iH'},
  {name:'ORCID',url:'https://orcid.org/0000-0003-0390-0605',mark:'iD'},
  {name:'Lattes CV',namePt:'Currículo Lattes',url:'http://lattes.cnpq.br/4974855586479672'},
  {name:'Shing-Tung Yau Center Profile',namePt:'Perfil no Shing-Tung Yau Center',url:'https://yauc.seu.edu.cn/Gabriel%20Luz%20Almeida_en/list.psp'},
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

export const homeIntroduction = {
  "en": "How can we describe the relativistic motion of compact objects precisely enough to interpret the gravitational waves they emit? I approach this question by connecting classical gravity with quantum-field-theory ideas, using effective field theory, post-Newtonian and post-Minkowskian expansions, scattering amplitudes and multiloop methods. My aim is to understand binary dynamics and gravitational radiation while developing precise predictions for current and future observations.",
  "pt": "Como descrever o movimento relativístico de objetos compactos com a precisão necessária para interpretar as ondas gravitacionais que eles emitem? Investigo essa questão conectando a gravitação clássica a ideias da teoria quântica de campos, com o uso de teorias de campos efetivas, expansões pós-newtonianas e pós-minkowskianas, amplitudes de espalhamento e métodos multiloop. Busco compreender a dinâmica de sistemas binários e a radiação gravitacional, desenvolvendo previsões precisas para observações atuais e futuras."
};
export const aboutNarrative = {
  "en": [
    "I am a Brazilian theoretical physicist and a postdoctoral researcher at the Shing-Tung Yau Center, Southeast University, in Nanjing, China. My interest in physics began with observing the night sky in Arcoverde, in the interior of Pernambuco. Astronomy gave me an initial set of questions about how physical systems behave, and studying physics at the Universidade Federal de Pernambuco (UFPE) gave me a mathematical language for approaching them. There, my work focused on the geometric foundations of general relativity, exact solutions of Einstein’s equations and hidden symmetries. This training continues to shape how I think about gravity: understanding its structure is closely connected to finding useful ways of calculating physical quantities.",
    "During my doctorate at UFRN and the International Institute of Physics, my attention turned to gravitational-wave theory and the relativistic two-body problem. What draws me to this problem is the meeting of several areas of theoretical physics in a concrete setting: two compact objects interacting through gravity and emitting radiation. General relativity and classical field theory provide the physical description, while effective field theory, scattering amplitudes and multiloop Feynman integrals offer complementary ways to organize and perform the calculations. Methods developed for quantum field theory can reveal structures in a classical problem, and the two-body problem provides a setting in which to explore those connections in detail.",
    "Gravitational waves also give this formal work an observational purpose. The motion of compact binaries and the radiation they produce carry information about strongly gravitating systems, including black holes. Extracting that information requires precise theoretical predictions and an understanding of the approximations behind them. I am interested in how post-Newtonian and post-Minkowskian descriptions complement one another, how nonlinear radiation affects binary dynamics, and how these calculations change when gravity includes additional fields. For me, the appeal lies in connecting the structure of the theory to quantities that can ultimately be tested against gravitational-wave signals.",
    "Research visits in Europe and Brazil, followed by postdoctoral work at USTC and Southeast University, broadened my research to modified gravity and post-Minkowskian scattering. My current work brings these interests together through field-theory methods for compact-binary dynamics and gravitational radiation. Alongside research, I serve as a referee for Physical Review D and Physical Review Letters. My teaching experience includes undergraduate physics in Brazil and courses on gravitational waves and effective field theory in China; explaining how the physical questions guide the calculations is an important part of that work."
  ],
  "pt": [
    "Sou físico teórico brasileiro e pesquisador de pós-doutorado no Shing-Tung Yau Center da Southeast University, em Nanquim, China. Meu interesse pela física começou com a observação do céu noturno de Arcoverde, no interior de Pernambuco. A astronomia trouxe as primeiras perguntas sobre o comportamento dos sistemas físicos, e a formação na Universidade Federal de Pernambuco (UFPE) me deu uma linguagem matemática para investigá-las. Ali, estudei os fundamentos geométricos da relatividade geral, soluções exatas das equações de Einstein e simetrias escondidas. Essa formação continua presente na maneira como penso a gravitação: compreender a estrutura da teoria está intimamente ligado a encontrar formas úteis de calcular grandezas físicas.",
    "Durante o doutorado na UFRN e no Instituto Internacional de Física, passei a me dedicar à teoria de ondas gravitacionais e ao problema relativístico de dois corpos. Um dos aspectos que mais me interessam nesse problema é o encontro de diferentes áreas da física teórica em uma situação concreta: dois objetos compactos que interagem gravitacionalmente e emitem radiação. A relatividade geral e a teoria clássica de campos fornecem a descrição física, enquanto as teorias de campos efetivas, as amplitudes de espalhamento e as integrais de Feynman multiloop oferecem maneiras complementares de organizar e realizar os cálculos. Métodos desenvolvidos na teoria quântica de campos podem revelar estruturas de um problema clássico, tornando possível explorar essas conexões em detalhe.",
    "As ondas gravitacionais também dão a esse trabalho formal uma finalidade observacional. O movimento de sistemas binários compactos e a radiação que eles produzem carregam informações sobre sistemas de gravitação intensa, incluindo buracos negros. Extrair essas informações exige previsões teóricas precisas e uma compreensão das aproximações utilizadas. Interessa-me entender como as descrições pós-newtoniana e pós-minkowskiana se complementam, como a radiação não linear afeta a dinâmica orbital e como esses cálculos se modificam quando a gravitação inclui campos adicionais. Para mim, parte do interesse está justamente em conectar a estrutura da teoria a grandezas que possam ser confrontadas com sinais de ondas gravitacionais.",
    "Visitas de pesquisa na Europa e no Brasil, seguidas pelos pós-doutorados na USTC e na Southeast University, ampliaram esse programa para a gravidade modificada e o espalhamento pós-minkowskiano. Hoje, reúno essas linhas de investigação por meio de métodos de teoria de campos aplicados à dinâmica de binárias compactas e à radiação gravitacional. Também atuo como parecerista de Physical Review D e Physical Review Letters. Minha experiência de ensino inclui atividades em disciplinas de graduação no Brasil e cursos de ondas gravitacionais e teoria de campos efetiva na China. Nesse trabalho, procuro explicitar como as perguntas físicas orientam os cálculos."
  ]
};
