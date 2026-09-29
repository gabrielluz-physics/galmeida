import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// GitHub Actions supplies these automatically. Local previews omit canonical URLs.
const site = process.env.SITE_URL || undefined;
const rawBase = process.env.BASE_PATH || '/';
const base = `/${rawBase.split('/').filter(Boolean).join('/')}${rawBase === '/' ? '' : '/'}`;
export default defineConfig({ site, base, output: 'static', devToolbar: { enabled: false }, server: { host: '0.0.0.0', port: 4173, allowedHosts: ['terminal.local'] }, trailingSlash: 'always', markdown: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] } });
