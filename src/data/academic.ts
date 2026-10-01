import {currentPosition} from './site.ts';
export const timeline = [
 {date:`${currentPosition.since}–`,place:`${currentPosition.institution} · ${currentPosition.center}`,en:`${currentPosition.en.role} · ${currentPosition.en.location}`,pt:`${currentPosition.pt.role} · ${currentPosition.pt.location}`,detail:currentPosition.supervisor},
 {date:'2023–2025',place:'USTC · PCFT / ICTS',en:'Postdoctoral researcher · Hefei, China',pt:'Pesquisador de pós-doutorado · Hefei, China',detail:'Shuang-Yong Zhou'},
 {date:'2019–2023',place:'UFRN · International Institute of Physics',en:'PhD in Physics · Natal, Brazil',pt:'Doutorado em Física · Natal, Brasil',detail:'Riccardo Sturani'},
 {date:'2017–2019',place:'Universidade Federal de Pernambuco',en:'MSc in Physics · Recife, Brazil',pt:'Mestrado em Física · Recife, Brasil',detail:'Carlos Batista'},
 {date:'2012–2017',place:'Universidade Federal de Pernambuco',en:'BSc in Physics · Recife, Brazil',pt:'Bacharelado em Física · Recife, Brasil',detail:''},
 {date:'2015–2016',place:'Montana State University',en:'Undergraduate exchange · Bozeman, USA',pt:'Intercâmbio de graduação · Bozeman, EUA',detail:''}
];
export const zhishanFellowship = {
 id:'zhishan-2026', category:'fellowship', year:2026, date:'2026-09',
 en:'Zhishan Postdoctoral Fellowship (至善博士后)',
 pt:'Bolsa de Pós-Doutorado Zhishan (至善博士后)',
 // PDF titles use only characters supported by the embedded DejaVu fonts.
 pdfTitle:{en:'Zhishan Postdoctoral Fellowship',pt:'Bolsa de Pós-Doutorado Zhishan'},
 institution:{en:'Southeast University, China',pt:'Southeast University, China'},
 description:{
  en:'Competitive university-level fellowship recognizing outstanding postdoctoral researchers for academic achievement, research capability, and future potential.',
  pt:'Bolsa competitiva da universidade que reconhece pesquisadores de pós-doutorado de destaque por suas realizações acadêmicas, capacidade de pesquisa e potencial futuro.'
 },
 period:{en:'2026 academic year, beginning in September 2026',pt:'Ano letivo de 2026, com início em setembro de 2026'}
};
export const nsfcGrant = {
 id:'nsfc-2026', category:'research-grant', year:2026, date:'2026-08-27',
 en:'NSFC Research Fund for International Young Scientists',
 pt:'NSFC — Fundo de Pesquisa para Jovens Pesquisadores Internacionais',
 institution:{en:'National Natural Science Foundation of China (NSFC)',pt:'Fundação Nacional de Ciências Naturais da China (NSFC)'},
 project:'Automated High-Precision Modeling for Next-Generation Gravitational-Wave Observations',
 projectChinese:'面向下一代引力波观测的自动化高精度建模',
 description:{en:'Research grant approved in 2026.',pt:'Financiamento de pesquisa aprovado em 2026.'},
 period:{en:'Funding period: 2027–2028',pt:'Período de financiamento: 2027–2028'},
 url:'https://yauc.seu.edu.cn/2026/0827/c27551a580594/page.htm'
};
export const grantsAndFellowships = [zhishanFellowship, nsfcGrant];
export const awards = [
 zhishanFellowship,
 {year:2024,en:'ICTP-SAIFR PhD Prize in Classical Gravity and Applications',pt:'Prêmio ICTP-SAIFR de Melhor Tese em Gravitação Clássica e Aplicações',url:'https://www.ictp-saifr.org/gravityprize/'},
 {year:2017,en:'Academic Laurel · Universidade Federal de Pernambuco',pt:'Láurea Acadêmica · Universidade Federal de Pernambuco'}
];
export const talks = [
 {date:'2026-05-22',title:'Pushing the Precision Frontier: Recent Developments in the EFT of Compact Binaries',place:'Chengdu University of Technology, China'},
 {date:'2025-12-18',title:'Tails of tails and the UV/IR pole splitting',place:'QCD meets Gravity XI · ICTP-SAIFR, Brazil',url:'https://www.ictp-saifr.org/qcdmg2025conference/'},
 {date:'2025-05-27',title:'EFT Techniques for Precision GW Predictions from Compact Binaries',place:'Frontier Forum on Gravitational Waves · ICTP-AP / SEU, China'},
 {date:'2025-04-28',title:'The Two-Body Problem in Beyond-General Relativity: Precision Modeling in Scalar-Tensor and ESGB Gravity',place:'Effective Field Theories, Gravity and Cosmology · HIAS-UCAS, China'},
 {date:'2023-08-21',title:'Conservative Binary Dynamics from Gravitational Tail Emission Processes',place:'Gravitational Waves meet Amplitudes in the Southern Hemisphere · ICTP-SAIFR, Brazil',url:'https://www.ictp-saifr.org/gwa2023/'},
 {date:'2022-09-07',title:'Gravitational Waves and the Relativistic Two-Body Problem from an Effective Field Theory Perspective',place:'SISSA · Trieste, Italy'}
];
export const visits = [
 {date:'2024-12',place:'Shing-Tung Yau Center · Southeast University',en:'Nanjing, China · research visit',pt:'Nanquim, China · visita de pesquisa'},
 {date:'2022-10 – 2023-06',place:'ICTP-SAIFR / IFT-UNESP',en:'São Paulo, Brazil · long-term research visit',pt:'São Paulo, Brasil · visita de pesquisa de longa duração'},
 {date:'2022-09',place:'ICTP · HECAP',en:'Trieste, Italy · one-month visit',pt:'Trieste, Itália · visita de um mês'},
 {date:'2022-08',place:'Université de Genève',en:'Geneva, Switzerland · ten-day visit',pt:'Genebra, Suíça · visita de dez dias'},
 {date:'2022-07',place:'INFN · Padova',en:'Padua, Italy · one-week visit',pt:'Pádua, Itália · visita de uma semana'}
];
export const teaching = [
 {id:'gw',year:'2025–2026',title:'Introduction to Gravitational Wave Science',place:'Southeast University · Shing-Tung Yau Center',type:'course',en:'Co-initiator and instructor of a voluntary, non-credit course. I taught the first phase: twelve 90-minute lectures in English (18 hours), covering linearized gravity, gravitational-wave generation, compact-binary sources and an introduction to detection. The course uses Michele Maggiore’s Gravitational Waves, Vol. 1.',pt:'Coidealizador e instrutor de um curso voluntário de extensão, sem créditos acadêmicos. Ministrei a primeira etapa: doze aulas de 90 minutos em inglês (18 horas), sobre gravitação linearizada, geração de ondas gravitacionais, fontes binárias compactas e introdução à detecção. O curso adota Gravitational Waves, vol. 1, de Michele Maggiore.',links:[{label:'Course / Curso',url:'https://indico.global/event/15622/'},{label:'2026',url:'https://yauc.seu.edu.cn/2026/0312/c27831a557889/page.htm'}]},
 {id:'nrgr',year:'2026-01-27/28',title:'NRGR — The PN-EFT for Compact Binaries',place:'Advanced Lectures on Quantum Field Theory · Southeast University',type:'mini',en:'Four 50-minute lectures on gravitational waves and Wilsonian EFT, scale separation and the method of regions, the radiation zone and matching, and nonlinear tails and multipole renormalization. The course connects self-energy diagrams to radiated flux through the optical theorem.',pt:'Quatro aulas de 50 minutos sobre ondas gravitacionais e EFT wilsoniana, separação de escalas e método de regiões, zona de radiação e matching, além de caudas não lineares e renormalização de multipolos. O curso conecta diagramas de autoenergia ao fluxo radiado por meio do teorema óptico.',links:[{label:'Programme / Programa',url:'https://yauc.seu.edu.cn/2026/0127/c27831a554416/page.htm'},{label:'Materials / Materiais',url:'https://indico.global/event/16799/'}]},
 {id:'ustc',year:'2023-09-19/21/22',title:'An EFT approach to GW physics',place:'PCFT / ICTS · University of Science and Technology of China',type:'mini',en:'Three 90-minute lectures introducing NRGR and effective-field-theory methods for gravitational radiation and compact-binary observables.',pt:'Três aulas de 90 minutos de introdução à NRGR e aos métodos de teoria de campos efetiva para radiação gravitacional e observáveis de binárias compactas.',links:[]}
];
export const assistantTeaching = [
 {year:'2022',place:'UFRN',en:'Introduction to General Relativity',pt:'Introdução à Relatividade Geral',roleEn:'Graduate teaching assistant; problem sessions and occasional regular lectures.',rolePt:'Estágio de docência; aulas de exercícios e substituições pontuais em aulas regulares.'},
 {year:'2021',place:'UFRN',en:'General Physics I',pt:'Física Geral I',roleEn:'Graduate teaching assistant; problem-solving classes.',rolePt:'Estágio de docência; aulas de resolução de problemas.'},
 {year:'2017',place:'UFPE',en:'Quantum Mechanics I',pt:'Mecânica Quântica I',roleEn:'Undergraduate teaching assistant; tutorials and problem sets.',rolePt:'Monitoria; aulas de exercícios, correção de listas e atendimento a dúvidas.'},
 {year:'2016',place:'UFPE',en:'Classical Mechanics I',pt:'Mecânica Clássica I',roleEn:'Undergraduate teaching assistant; tutorials.',rolePt:'Monitoria; aulas de exercícios e atendimento a dúvidas.'},
 {year:'2014',place:'UFPE',en:'General Physics IV',pt:'Física Geral IV',roleEn:'Undergraduate teaching assistant; optics and introductory modern physics.',rolePt:'Monitoria; óptica e introdução à física moderna.'}
];
