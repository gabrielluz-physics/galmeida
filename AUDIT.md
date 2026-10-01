# Minor maintenance: PDF title and profile links

Both CVs regenerated and visually reviewed; no empty parentheses anywhere. CJK omitted from PDF titles for embedded-font compatibility, retained on the website. Both requested profiles added with localized labels in the shared collection. Root and `/galmeida` builds and audits pass (22 pages; 437/436 local references; zero errors). External profile pages could not be retrieved; exact supplied hrefs verified in compiled HTML and PDFs. See `MAINTENANCE-2026-10-01.md` for cause, scope and checks. The reports below describe earlier passes.

---

# Atualização de 1º de outubro de 2026

Esta seção registra os testes da atualização atual; o relatório anterior foi preservado abaixo como histórico.

- Arquitetura Astro, dependências, fotografias, publicações, boletins, ensino, navegação, temas e workflow do GitHub Pages preservados.
- Build na raiz: 22 páginas; auditoria existente: 437 referências locais, zero erros.
- Build de produção com `SITE_URL=https://gabrielluz-physics.github.io` e `BASE_PATH=/galmeida`: 22 páginas e 436 referências locais, zero erros; canônicos e hreflang verificados pela auditoria.
- Textos EN/PT de Início, Sobre e CV inspecionados no HTML compilado. Sobre contém 401 palavras em inglês e 424 em português, em quatro parágrafos.
- Notícias orientadas por dados, com duas entradas; bolsa compartilhada entre Sobre, CVs e notícias. Nos CVs, aparece uma única vez. Financiamento separado dos prêmios.
- PDFs EN/PT regenerados a partir dos dados; quatro páginas cada. Todas as páginas foram renderizadas e revistas visualmente, sem cortes, sobreposição ou páginas extras. Nome chinês verificado na extração e na renderização; comunicado oficial é um link de rótulo curto.
- Fonte oficial NSFC consultada; aprovação, categoria e título confirmados. Período 2027–2028 e bolsa Zhishan provêm do titular.
- Geometria do retrato examinada no CSS a 1920, 1440, 1280, 1024, 768, 390 e 360 px. A imagem e a moldura têm dimensões iguais e deslocamento reservado de 20 px, independente da legenda. Em <=600 px, foto de 145 × 145 px e moldura oculta.
- Limitação atual: a prévia no navegador disponível foi bloqueada pela política de acesso do ambiente. Portanto, as larguras indicadas acima são uma verificação geométrica do CSS, não medições de navegador. A revisão visual responsiva e dos temas desta atualização não pôde ser concluída; os testes de navegador descritos no relatório histórico não devem ser atribuídos a esta versão.
- Cores das novas regras usam as variáveis existentes dos temas claro e escuro; nenhum JavaScript de navegação, tema ou filtros foi alterado.
- Aviso não bloqueante do ambiente: npm informa uma configuração `http-proxy` desconhecida; build e auditoria concluem normalmente.
- Nenhuma publicação externa ou envio ao GitHub foi executado nesta atualização.

---

# Auditoria histórica da entrega

Versão: 29 de setembro de 2026 — segunda revisão implementada.

## Resultado

O projeto foi implementado em Astro 5.18.2, compilado e revisado. Foram geradas **22 páginas HTML**: nove seções em cada idioma, uma edição completa do boletim em cada idioma, redirecionamento da raiz e página 404. Sitemap e robots são gerados adicionalmente.

Não houve criação de repositório, execução do workflow no GitHub ou publicação externa. A entrega está preparada para GitHub Pages e contém fontes e build estático.

## Verificações técnicas realizadas

| Verificação | Resultado |
| --- | --- |
| Build estático na raiz | Passou |
| Build com `BASE_PATH=/academic-site` | Passou |
| Auditoria de links na raiz | 437 referências locais, zero erros |
| Auditoria de links no subdiretório | 436 referências locais, zero erros |
| Caminhos de imagens e PDFs | Resolvidos no build |
| Rotas EN/PT e âncoras de pesquisa/publicações/boletim | Resolvidas |
| Identificadores únicos | Verificados |
| H1, hierarquia de títulos, idioma e descrição por página | Verificados, exceto redirecionamento conforme esperado |
| Sitemap em build com domínio | 20 URLs de conteúdo |
| Canônicos e hreflang em subdiretório | Prefixo correto verificado |
| Página mais recente do boletim | Seleção automática pela data final |
| Registro de artigos | 13 entradas, arXiv sem duplicações |
| Dados pessoais no HTML | Apenas email institucional |
| Dados pessoais nos PDFs e links | Apenas email institucional |
| EXIF/GPS das imagens | Fotografias recodificadas sem esses metadados |
| PDFs | 4 páginas por idioma; páginas renderizadas e revisadas |

Os dois totais de referências diferem devido ao link do redirecionamento estático gerado por Astro com `site` configurado. Nenhum caminho interno escapou do subdiretório.

## Revisão em navegador

- Página inicial em inglês e português: texto, retrato, navegação e composição revisados.
- Tema claro/escuro: alternância, persistência e `aria-pressed` verificados em página completa. O botão anuncia seu estado. Fórmulas foram inspecionadas nos dois temas.
- Filtro PM: exibiu os dois artigos esperados no arquivo completo.
- Troca de idioma: a edição PT levou à mesma edição EN. A auditoria verifica o link equivalente de cada página. O link de pular conteúdo foi ativado pelo teclado e moveu o foco para `main`.
- Segunda revisão: 42 combinações de rota/largura verificadas a 360, 768 e 1024 px (página inicial, pesquisa, publicações, ensino, arquivo e edição de boletim, galeria, em EN/PT), todas sem overflow horizontal. Sobre, currículo e contato também foram medidos a 360 px nos dois idiomas. Desktop foi inspecionado a 1364 px; celular/tablet/laptop foram representados por iframes. Com a barra de rolagem, os 360 px correspondem a 345 px úteis nas páginas longas.
- Menu móvel: abertura testada; `aria-expanded` alterna; Escape fecha e devolve o foco ao botão.
- Arquivo de boletins: navegação até a edição completa, com os 12 destaques. Uma edição temporária de 2025 validou agrupamento por ano, ordem cronológica, links anterior/seguinte e renderização KaTeX/MathML. O build rejeitou corretamente a edição sem tradução PT. O par temporário foi removido antes da entrega.
- Página 404: examinada durante a revisão.
- A página temporária de QA foi removida antes dos builds finais.

A verificação responsiva usa viewports em iframes, não dispositivos físicos. Não foi executada uma certificação WCAG, teste com leitor de tela ou auditoria Lighthouse. Não se atribui uma pontuação de desempenho ou acessibilidade sem medição.

## Acessibilidade e apresentação

- HTML semântico, título H1 único, hierarquia de seções, `lang`, descrições alternativas e rótulos acessíveis.
- Link para pular ao conteúdo e foco visível.
- Navegação funciona sem JavaScript; nesse caso o menu permanece expandido e todos os artigos são exibidos.
- Movimento reduzido e regras de impressão.
- Contraste calculado das cores de texto sobre o fundo: mínimo **5,06:1** no tema claro e **8,54:1** no escuro; texto principal **11,13:1** e **12,97:1**, respectivamente.
- Tipografia de sistema e Georgia; nenhuma fonte externa.
- Fotografias fornecidas pelo titular, sem imagens genéricas de espaço.
- Sem animações decorativas, gradientes, cartões repetitivos ou métricas promocionais. A hierarquia usa tipografia, linhas e espaço em branco.
- O esquema de espalhamento é explicitamente identificado como ilustrativo, sem alegação de representar dados ou trajetórias numericamente calculadas.

## Mudanças principais da segunda revisão

- Pesquisa: radiação não linear ganhou seção própria; o texto explica NRGR, o overlap PN/PM e a contribuição em integrandos, IBP e integrais mestras sem linguagem promocional. O trabalho em soluções exatas permanece como etapa anterior.
- Bibliografia: adicionada a errata PRD 113, 089903 (2026) e seu DOI ao artigo de emissão de cauda e aos PDFs. A ordem da lista agora é calculada a partir do ano e do arXiv, sem exigir inserção manual na posição correta.
- Usabilidade: hierarquia h2/h3/h4 corrigida nas publicações, idioma dos títulos indicado, foco da publicação de destino realçado, metadados móveis um pouco maiores, datas de ensino/palestras/visitas localizadas, títulos dos cursos com a mesma tipografia editorial.
- Manutenção: posição atual centralizada em `currentPosition`; os PDFs usam a mesma instituição, contato e data editorial. README atualizado. Pares EN/PT dos boletins são validados no build.
- Preservados: arquitetura Astro, rotas, base de 13 artigos, cinco seleções, organização editorial do digest, fotografias, esquema de espalhamento, paleta e workflow do GitHub Pages. Não havia razão concreta para substituí-los.

## Peso e dependências

Nenhuma dependência foi acrescentada na segunda revisão. O build final não gera arquivos JavaScript externos: os controles usam no máximo **1.759 bytes de JavaScript inline por página**, sem contar JSON-LD. A maior foto otimizada tem **220.534 bytes**. Dimensões explícitas continuam reservando espaço para as imagens. KaTeX e suas fontes são locais e carregados nas páginas de boletim. Esses dados são pesos de arquivos, não uma medição de Core Web Vitals.

## Revisão científica/editorial

Ver `SOURCES.md` para diferenças entre fontes, correções de metadados e escolhas de privacidade. Não se publicou conteúdo de pareceres, planos específicos de concurso nem resultados inéditos fora dos documentos autorizados.

Os títulos de artigos, nomes oficiais e identificadores permanecem em sua forma bibliográfica. As páginas e o conteúdo editorial têm versões próprias EN/PT. A versão portuguesa do boletim preserva as ressalvas do texto fornecido.

## Limites e itens não fornecidos

- URLs de GitHub, Lattes e perfil institucional pessoal não foram fornecidos; foram omitidos.
- Sem nome de usuário/repositório GitHub ou domínio final, a configuração de produção é preenchida pelo workflow. A execução externa desse workflow ainda não foi testada.
- Google Scholar não pôde ser lido pela ferramenta de consulta. ORCID e INSPIRE apresentaram páginas dependentes de JavaScript; os links são os fornecidos pelo titular.
- Alguns links externos do boletim retornaram erro de acesso. A auditoria não garante disponibilidade permanente de serviços externos nem constitui revisão científica independente de todos os resumos.
- Fotos sem contexto documental têm legendas genéricas. Novas legendas específicas podem ser acrescentadas pelo titular.

## Reproduzir

```bash
npm ci
npm run build
npm run audit
SITE_URL=https://audit.example BASE_PATH=/academic-site npm run build
SITE_URL=https://audit.example BASE_PATH=/academic-site npm run audit
```

Depois, execute `npm run build` sem variáveis de ambiente para voltar ao preview local. Para produção, o workflow obtém a origem e o caminho reais do GitHub Pages.
