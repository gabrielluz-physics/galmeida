# Gabriel Luz Almeida — site acadêmico

Site completo e estático em **Astro 5**, inglês e português. Não usa banco de dados, CMS, serviços pagos, fontes externas ou rastreamento. JavaScript no navegador é usado apenas no menu móvel, tema e filtros de publicações.

## Começar

Instale Node.js 22.18 ou superior (recomendado: versão LTS 22). Abra o terminal na pasta que contém `package.json`:

```bash
npm ci
npm run dev
```

Abra o endereço mostrado no terminal. A página raiz encaminha para `/en/`; o português está em `/pt/`. Para encerrar, pressione Ctrl+C.

```bash
npm run build
npm run audit
npm run preview
```

O build gera `dist/`, pronto para hospedagem estática. O ZIP também inclui uma cópia compilada. Para vê-la sem instalar Node, use `python3 -m http.server 8080 --directory dist` e abra `http://localhost:8080/`. Não abra os arquivos de `dist/` diretamente com `file://`: os caminhos são relativos à raiz do servidor.

## Estrutura

| Caminho | Função |
| --- | --- |
| `src/data/site.ts` | Nome, afiliação, email, perfis, navegação, biografias EN/PT e funções de caminhos |
| `src/data/publications.json` | Artigos, autores em ordem, arXiv, DOI, seleção e temas |
| `src/data/research.ts` | Texto bilíngue dos seis eixos de pesquisa e artigos relacionados |
| `src/data/academic.ts` | Formação, posições, prêmios, ensino, palestras e visitas |
| `src/data/photos.ts` | Fotos, dimensões, legendas e descrições alternativas |
| `src/content/digests/` | Uma página Markdown por edição e idioma |
| `src/content.config.ts` | Validação dos metadados dos boletins |
| `src/components/views/` | Conteúdo e estrutura de cada seção |
| `src/components/Publication.astro` | Componente compartilhado dos artigos |
| `src/layouts/Base.astro` | Cabeçalho, navegação, rodapé, SEO e tema |
| `src/styles/global.css` | Cores, tipografia, disposição e adaptações responsivas |
| `src/pages/` | Rotas bilíngues, boletins, 404, sitemap e robots |
| `public/images/` | Fotografias otimizadas, sem metadados EXIF |
| `public/documents/` | CVs públicos em inglês e português |
| `scripts/` | Auditoria e regeneração opcional dos PDFs |
| `.github/workflows/deploy.yml` | Build e publicação automática no GitHub Pages |
| `AUDIT.md` | Verificações realizadas e limites da auditoria |
| `SOURCES.md` | Fontes e decisões editoriais |

## Editar o conteúdo em inglês ou português

Os arquivos de dados usam chaves `en` e `pt`. Edite a chave correspondente. Biografias estão em `site.ts`; pesquisa em `research.ts`; atividades acadêmicas em `academic.ts`. Títulos de artigos e nomes oficiais de cursos/instituições preservam o idioma original.

Textos curtos próprios das páginas estão nos componentes de `src/components/views/`, em expressões `pt ? 'Português' : 'English'`. Os títulos e as descrições SEO por página estão em `src/pages/[lang]/[...page].astro`.

A troca EN/PT preserva a seção e a edição do boletim. Ela não depende de tradução automática. Ao acrescentar conteúdo, mantenha as duas versões.

## Atualizar sua posição atual

Edite `currentPosition` em `src/data/site.ts`: instituição, centro, ano inicial, supervisor, cargo e cidade EN/PT. A página inicial, Contato, rodapé, biografia curta institucional, metadados e primeira entrada da trajetória passam a usar esses dados. A narrativa histórica e os cursos anteriores continuam sendo registros históricos; revise-os quando houver mudança de posição. Regenere os PDFs pela seção abaixo.

## Acrescentar uma publicação

Edite `src/data/publications.json`. Copie um registro e substitua os campos. A ordem é automática: ano de publicação decrescente, com o identificador arXiv como desempate no mesmo ano. Exemplo de estrutura (não é um artigo real):

```json
{
  "id": "identificador-curto-unico",
  "title": "Título original do artigo",
  "authors": ["Autor 1", "Autor 2"],
  "year": 2026,
  "journal": "Periódico, volume, número do artigo",
  "arxiv": "0000.00000",
  "doi": "10.xxxx/identificador",
  "status": "published",
  "selected": false,
  "topics": ["PN", "EFT"]
}
```

Use valores reais. Omita `journal` e `doi` se ainda não existirem. `status` aceita `preprint` ou `published`. Para uma correção publicada, use `erratum` com a referência bibliográfica e, quando confirmado, `erratumDoi` com o DOI da errata. Os temas atuais são `PM`, `PN`, `EFT`, `Radiation`, `Modified gravity`, `Exact solutions`. Os links INSPIRE usam uma busca pelo identificador arXiv, evitando inventar números de registros.

Para destacar um artigo, altere `selected` para `true`. A página de publicações mostra todos os selecionados; a página inicial mostra os três primeiros em ordem cronológica. A seleção atual cobre PM/gravidade modificada, radiação e dinâmica PN; a lista ampliada inclui renormalização de multipolos e o trabalho anterior em soluções exatas. Para ligá-lo a um eixo de pesquisa, acrescente o `id` ao campo `papers` em `research.ts`. Se mudar ou remover um `id`, ajuste essas referências.

## Acrescentar um boletim semanal

Copie o par de arquivos existente e altere os nomes, por exemplo `2026-09-28-10-04.en.md` e `2026-09-28-10-04.pt.md`. Cada idioma usa um único arquivo com metadados no topo:

```yaml
---
lang: en
issue: 2026-09-28-10-04
title: 28 September–4 October 2026
start: '2026-09-28'
end: '2026-10-04'
description: 'Descrição curta e específica desta edição.'
highlights: 8
categories: [Gravitation, PN/PM, EFT]
---
```

Depois de `---`, escreva em Markdown ou HTML sem estilos embutidos. O arquivo em português usa `lang: pt`, o **mesmo `issue`**, datas iguais e título, resumo, categorias e corpo traduzidos. Não é necessário editar o arquivo de listagem, a navegação ou a página inicial: a lista é automática e a data `end` determina a edição mais recente. O arquivo agrupa edições por ano; links para a edição anterior/seguinte são gerados automaticamente. Adicione sempre as duas versões: o build recusa idiomas ausentes ou duplicados, datas inválidas/invertidas e diferenças nas datas ou no número de destaques do par EN/PT.

Sugestão de organização: resumo da semana, categorias temáticas, resultado de cada artigo, por que importa, fonte, prioridades de leitura e itens a acompanhar. Preserve as ressalvas científicas e confira a janela temporal dos artigos. O boletim fornecido foi adaptado como conteúdo editorial; a criação do site não substitui uma revisão científica completa de cada resumo.

### Matemática

Boletins aceitam `$x^2$` no texto e `$$ ... $$` em blocos. KaTeX é executado durante o build e não requer JavaScript matemático no navegador. Use Markdown para a equação, fora de blocos HTML. As fontes e o CSS necessários são servidos localmente.

## Fotos e retrato

1. Converta a foto para WebP, com dimensão máxima aproximada de 1400 px e qualidade 80–88.
2. Remova EXIF/GPS e salve em `public/images/`.
3. Adicione o registro em `src/data/photos.ts`, incluindo dimensões reais, legenda EN/PT e `altEn`/`altPt` que descrevam a imagem.
4. Use apenas nomes, eventos e datas confirmados. A grade é automática; clicar abre a imagem maior.

O retrato usa `portrait-small.webp` na página inicial (700 px) e `portrait.webp` em Sobre. Substitua ambos mantendo os nomes; ajuste o enquadramento em `.portrait img` no CSS se necessário. Não sobrescreva os originais de arquivo pessoal.

## Atualizar o CV

O site inclui **versões públicas sintetizadas**, não cópias dos PDFs privados enviados. Os PDFs não contêm telefone, email pessoal, dados de referências, data de nascimento ou detalhes de pareceres.

Opção simples: exporte novos PDFs públicos com os nomes `Gabriel-Luz-Almeida-CV-en.pdf` e `Gabriel-Luz-Almeida-CV-pt.pdf` para `public/documents/`. Revise também metadados e links internos dos PDFs.

Opção reproduzível: atualize os dados do site e regenere os PDFs. Requer Python 3, `reportlab` e fontes DejaVu (no Ubuntu, pacote `fonts-dejavu-core`; em outros sistemas, ajuste `fontdir` no script).

```bash
python3 -m pip install reportlab
node scripts/export-cv-data.mjs | python3 scripts/generate-cv.py
```

Atualize a data editorial em `site.updated`, em `src/data/site.ts`. Os PDFs não são regenerados automaticamente no GitHub Actions; devem ser revisados e incluídos no commit. O currículo web é atualizado automaticamente a partir dos dados.

## Alterar navegação, perfis e estilo

Os rótulos estão em `nav` de `src/data/site.ts`; a ordem principal está em `mainNav` de `Base.astro`. Contato aparece no cabeçalho e o email no rodapé. Uma nova seção exige também adicionar a rota em `pages`, o componente correspondente e a descrição SEO.

Os perfis públicos ficam em `site.profiles`. Foram incluídos INSPIRE-HEP, ORCID e Google Scholar fornecidos por você. GitHub, Lattes e um perfil institucional pessoal só devem ser acrescentados quando você fornecer os URLs corretos.

As cores são variáveis CSS no início de `global.css`. O tema segue o sistema até o visitante escolher claro/escuro. A preferência é local ao dispositivo. Não há cookies nem rastreamento. Fontes principais: Georgia e fontes de sistema, sem chamadas externas.

## Publicar no GitHub Pages

Não foi criado um repositório nem efetuada uma publicação externa. A configuração está pronta.

1. Crie um repositório no GitHub. Para um site na raiz, use `SEU_USUARIO.github.io`. Para um site de projeto, use qualquer outro nome.
2. Envie **o conteúdo da pasta do projeto** ao ramo `main`, de modo que `package.json` e `.github/` fiquem na raiz do repositório. Inclua o `package-lock.json`, os fontes e `public/`. Não envie `node_modules/`; `dist/` é recriado pelo workflow.
3. Em **Settings → Pages → Build and deployment**, escolha **GitHub Actions**.
4. Faça um push para `main` ou execute o workflow manualmente na aba Actions.
5. A ação configura a URL, compila, executa a auditoria de referências locais e publica `dist/`. O endereço aparece no ambiente `github-pages` do job de publicação.

O workflow usa `actions/configure-pages` para obter `origin` e `base_path`. Assim, o site funciona tanto na raiz quanto em `/nome-do-repositorio/` sem editar links. Use Node 22 e `npm ci` para reproduzir o lockfile.

Para testar manualmente um caminho de projeto (macOS/Linux):

```bash
SITE_URL=https://seu-usuario.github.io BASE_PATH=/meu-site npm run build
BASE_PATH=/meu-site npm run audit
```

Para desenvolvimento normal, rode novamente `npm run build` sem essas variáveis. Sem `SITE_URL`, o preview não inventa um domínio canônico, o sitemap fica vazio e `robots.txt` pede não indexação. No build de produção, os URLs canônicos, hreflang, OpenGraph e sitemap usam o endereço real fornecido pelo workflow.

## Domínio personalizado

1. Configure o domínio em **Settings → Pages → Custom domain**.
2. Siga as instruções DNS do GitHub para esse domínio e ative HTTPS quando disponível.
3. Opcionalmente registre o nome em `public/CNAME`.
4. Execute novamente o workflow. `configure-pages` fornece a origem e o caminho apropriados ao domínio; não mantenha um `BASE_PATH` de repositório no domínio raiz.

Documentação oficial: [Astro no GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) e [GitHub Pages](https://docs.github.com/en/pages).

## Auditoria e manutenção

`npm run audit` verifica páginas esperadas, links locais, âncoras, imagens, hierarquia dos títulos, idiomas, links EN/PT equivalentes, metadados, identificadores duplicados, dimensões de imagens, vazamentos de emails, referências de pesquisa e campos das publicações. Com `SITE_URL`, verifica também os canônicos e hreflang. Não faz requisições externas durante o build: bloqueios temporários de arXiv ou Google não impedem publicar o site.

Antes de cada publicação relevante, confira menu móvel, teclado, temas e links externos no navegador. Use o relatório `AUDIT.md` como registro do que foi efetivamente verificado nesta versão. Preserve o consentimento e os direitos de uso das fotos ao acrescentar novos arquivos.

## English quick start

Run `npm ci`, then `npm run dev`. Build with `npm run build` and check local links with `npm run audit`. Content lives in the bilingual data files and Markdown digest entries listed above. Commit this folder's contents to the root of a GitHub repository, enable GitHub Actions under Settings → Pages, and push to `main`. The workflow automatically handles root sites, repository subpaths and configured custom domains. The supplied PDFs are public CVs; the original private source documents are deliberately excluded from this project.
