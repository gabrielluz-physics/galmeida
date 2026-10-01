# Minor maintenance — 1 October 2026

Only the PDF fellowship title and the two requested academic-profile links were changed.

## PDF correction

The previous generator referenced STSong-Light for the Chinese characters, but did not embed it (`pdffonts`: emb=no). The text was present in the PDF and rendered in this environment, so literal empty parentheses were not reproduced here; the unembedded CJK dependency explains why rendering could differ in the user's reader. Parentheses were part of the full shared title and remained visible if the CJK glyphs failed.

The fellowship now has localized `pdfTitle` values without the Chinese suffix. The website retains its existing Chinese title. The PDF generator uses embedded DejaVu fonts for the title and no longer registers STSong-Light. Optional `pdfAlternateTitle` text is appended with parentheses only if nonblank and fully supported by the embedded title font. Legacy empty parentheses in a title are removed. Checks covered missing, blank, whitespace-only, supported and unsupported alternate titles.

Both English and Portuguese PDFs were regenerated, rendered and visually reviewed: four pages each, no empty parentheses anywhere, no overflowing text, and both new profile links present in the PDF annotations.

## Profile links

`site.profiles` is the single source of the new URLs. English and Portuguese labels are selected by the existing Profiles component, which now receives the page language. Lattes and the Yau Center profile appear in the existing homepage and Contact collections and the site-wide footer, including About's footer. They also appear in the PDF profile row. Existing links remain, and the new entries use text labels without new icons or libraries. Existing same-tab external-link behavior is unchanged.

Exact hrefs and accessible labels were verified in compiled English and Portuguese pages. External retrieval of both supplied profile URLs failed in the web lookup tool; their live availability/content could not be independently confirmed. No substitute URLs were invented.

## Validation

- Root: 22 pages, 437 local references, zero audit errors.
- GitHub Pages `/galmeida`: 22 pages, 436 local references, zero audit errors.
- No changes to CSS, dependencies, routes or deployment workflow.
- No publication or push performed.
- npm's existing environment warning about `http-proxy` is nonblocking.

## Files changed in this maintenance pass

- src/data/academic.ts
- src/data/site.ts
- src/components/Profiles.astro
- src/components/views/Home.astro (language prop only)
- src/components/views/Contact.astro (language prop only)
- src/layouts/Base.astro (language prop only)
- scripts/generate-cv.py
- public/documents/Gabriel-Luz-Almeida-CV-en.pdf
- public/documents/Gabriel-Luz-Almeida-CV-pt.pdf
- README.md, SOURCES.md, AUDIT.md and this maintenance report
- dist/ regenerated

The existing export-cv-data.mjs pipeline already exports the shared records, including the added fields, so it required no change.
