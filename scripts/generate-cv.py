"""Create the two public CVs from the site's content. Requires Python + reportlab.
Usage (Node >= 22.18): node scripts/export-cv-data.mjs | python3 scripts/generate-cv.py
"""
import json,sys,pathlib,html
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,KeepTogether,PageBreak
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import re
D=json.load(sys.stdin);root=pathlib.Path(__file__).resolve().parents[1]
fontdir=pathlib.Path('/usr/share/fonts/truetype/dejavu')
if fontdir.exists():
 for n,f in [('Body','DejaVuSans.ttf'),('BodyBold','DejaVuSans-Bold.ttf'),('Heading','DejaVuSerif.ttf')]:pdfmetrics.registerFont(TTFont(n,str(fontdir/f)))
 pdfmetrics.registerFontFamily('Body',normal='Body',bold='BodyBold',italic='Body',boldItalic='BodyBold')
else:
 print('DejaVu fonts required: install fonts-dejavu-core.',file=sys.stderr);sys.exit(1)
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='CVTitle',fontName='Heading',fontSize=25,leading=31,textColor=HexColor('#162a40'),spaceAfter=12))
styles.add(ParagraphStyle(name='CVBody',fontName='Body',fontSize=9,leading=14,textColor=HexColor('#283b4b'),spaceAfter=7))
styles.add(ParagraphStyle(name='CVHeading',fontName='Heading',fontSize=15,leading=21,spaceBefore=15,spaceAfter=9,textColor=HexColor('#162a40'),keepWithNext=True))
styles.add(ParagraphStyle(name='CVSmall',fontName='Body',fontSize=8,leading=12,textColor=HexColor('#586775'),spaceAfter=7))
def esc(s):return html.escape(str(s))
def pdf_title(item,lang):
 # Optional alternate titles must be nonempty AND supported by the embedded font.
 title=str(item.get('pdfTitle',{}).get(lang) or item[lang]).strip()
 title=re.sub(r'\s*\(\s*\)', '', title).strip()
 alternate=str(item.get('pdfAlternateTitle') or '').strip()
 glyphs=pdfmetrics.getFont('BodyBold').face.charToGlyph
 if alternate and all(ord(char) in glyphs for char in alternate):
  title+=f' ({alternate})'
 return esc(title)
for lang in ['en','pt']:
 pt=lang=='pt';out=root/'public/documents'/f'Gabriel-Luz-Almeida-CV-{lang}.pdf';out.parent.mkdir(parents=True,exist_ok=True)
 story=[]
 def p(t,style='CVBody'):return Paragraph(t,styles[style])
 def heading(en,ptt):story.append(p(ptt if pt else en,'CVHeading'))
 story.extend([p(D['site']['name'],'CVTitle'),p(esc(D['bios'][lang]['role'])),p(esc(D['site']['center'])+' · '+esc(D['site']['institution'])+'<br/>'+esc(D['bios'][lang]['location'])),p(f'<link href="mailto:{esc(D["site"]["email"])}" color="#205c85">{esc(D["site"]["email"])}</link>')])
 story.append(p(' · '.join(f'<link href="{esc(x["url"])}" color="#205c85">{esc(x.get("namePt",x["name"]) if pt else x["name"])}</link>' for x in D['site']['profiles'])))
 story.append(p(('Atualizado em ' if pt else 'Updated ')+D['site']['updated'],'CVSmall'))
 heading('Research interests','Interesses de pesquisa');story.append(p(esc(D['bios'][lang]['short'])))
 heading('Appointments & education','Posições acadêmicas e formação')
 for t in D['timeline']:
  details=('<br/>'+('Orientação / supervisão: ' if pt else 'Advisor / supervisor: ')+esc(t['detail'])) if t['detail'] else ''
  story.append(p(f'<b>{esc(t.get("displayDate",{}).get(lang,t["date"]))}</b> · {esc(t["place"])}<br/>{esc(t[lang])}{details}'))
 heading('Grants & fellowships','Financiamentos e bolsas')
 for a in D['grantsAndFellowships']:
  category=('Bolsa' if pt else 'Fellowship') if a['category']=='fellowship' else ('Financiamento de pesquisa' if pt else 'Research grant')
  text=f'<b>{a["year"]} · {pdf_title(a,lang)}</b><br/>{category} · {esc(a["institution"][lang])}<br/>{esc(a["description"][lang])}'
  if a.get('project'):text+='<br/>'+('Projeto: ' if pt else 'Project: ')+esc(a['project'])
  text+='<br/>'+esc(a['period'][lang])+'.'
  if a.get('url'):text+=f' · <link href="{esc(a["url"])}" color="#205c85">'+('Comunicado oficial' if pt else 'Official announcement')+'</link>'
  story.append(KeepTogether([p(text)]))
 heading('Awards','Prêmios')
 for a in D['awards']:
  if a.get('category')!='fellowship':story.append(p(f'<b>{a["year"]}</b> · {esc(a[lang])}'))
 heading('Journal articles & preprints','Artigos publicados e pré-publicações')
 for i,a in enumerate(D['publications'],1):
  journal=a.get('journal',('Pré-publicação' if pt else 'Preprint'))
  text=f'<b>{i}. {esc(a["title"])}</b><br/>{esc(", ".join(a["authors"]))}<br/>{esc(journal)} ({a["year"]}). '
  text+=f'<link href="https://arxiv.org/abs/{a["arxiv"]}" color="#205c85">arXiv:{a["arxiv"]}</link>'
  if a.get('doi'):text+=f' · <link href="https://doi.org/{a["doi"]}" color="#205c85">DOI</link>'
  if a.get('erratum'):text+='<br/>'+('Errata: ' if pt else 'Erratum: ')+(f'<link href="https://doi.org/{esc(a["erratumDoi"])}" color="#205c85">{esc(a["erratum"])}</link>' if a.get('erratumDoi') else esc(a['erratum']))
  story.append(KeepTogether([p(text),Spacer(1,5)]))
 heading('Theses & book','Teses e livro')
 story.append(p('<b>Classical amplitudes in gravitational-wave physics.</b> '+('Tese de doutorado' if pt else 'PhD thesis')+' · UFRN, 2023. <link href="https://arxiv.org/abs/2309.00772" color="#205c85">arXiv:2309.00772</link>'))
 story.append(p('<b>On symmetries of exact solutions of Einstein field equations.</b> '+('Dissertação de mestrado' if pt else 'MSc thesis')+' · UFPE, 2019.'))
 story.append(p('<b>Symmetries and exact solutions in general relativity.</b> LAMBERT Academic Publishing, 2019. ISBN 978-6-200-48020-0.'))
 heading('Teaching','Ensino')
 for t in D['teaching']:story.append(KeepTogether([p(f'<b>{esc(t["title"])}</b> · {esc(t["displayDate"][lang])}<br/>{esc(t["place"])}<br/>{esc(t[lang])}')]))
 for t in D['assistantTeaching']:story.append(p(f'<b>{esc(t[lang])}</b> · {t["place"]}, {t["year"]}. {esc(t["rolePt" if pt else "roleEn"])}'))
 story.append(PageBreak());heading('Selected talks','Palestras selecionadas')
 for t in D['talks']:story.append(KeepTogether([p(f'<b>{esc(t["title"])}</b><br/>{esc(t["place"])} · {esc(t["displayDate"][lang])}')]))
 heading('Research visits','Visitas de pesquisa')
 for t in D['visits']:story.append(p(f'<b>{esc(t["place"])}</b> · {esc(t.get("displayDate",{}).get(lang,t["date"]))}<br/>{esc(t[lang])}'))
 heading('Academic service','Atividades acadêmicas')
 story.append(p('Parecerista de Physical Review D e Physical Review Letters.' if pt else 'Referee for Physical Review D and Physical Review Letters.'))
 def footer(c,doc):
  c.setStrokeColor(HexColor('#cbd4da'));c.line(48,43,547,43);c.setFont('Body',7);c.setFillColor(HexColor('#586775'));c.drawString(48,30,'Gabriel Luz Almeida · Curriculum vitae');c.drawRightString(547,30,str(doc.page))
 doc=SimpleDocTemplate(str(out),pagesize=(595.28,841.89),rightMargin=48,leftMargin=48,topMargin=44,bottomMargin=58,title='Gabriel Luz Almeida - Academic CV',author='Gabriel Luz Almeida')
 doc.build(story,onFirstPage=footer,onLaterPages=footer);print(out,file=sys.stderr)
