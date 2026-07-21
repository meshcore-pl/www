const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('marked');
const parseFrontmatter = require('frontmatter-md');
const groups = require('../data/docs.js');

const DOCS_DIR = path.join(__dirname, '../content/docs');

const DIACRITICS = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
const slugify = text => text.toLowerCase()
	.replace(/[ąćęłńóśźż]/g, c => DIACRITICS[c] || c)
	.replace(/[^\w\s-]/g, '')
	.replace(/[\s_]+/g, '-')
	.replace(/(^-|-$)/g, '');

const renderer = new marked.Renderer();
renderer.heading = ({ text, depth }) => `<h${depth} id="${slugify(text)}">${text}</h${depth}>\n`;

const baseTable = renderer.table.bind(renderer);
renderer.table = token => `<div class="docs-table">\n${baseTable(token)}</div>\n`;

const pages = new Map();
for (const group of groups) {
	for (const p of group.pages) {
		const raw = fs.readFileSync(path.join(DOCS_DIR, group.slug, `${p.slug}.md`), 'utf8');
		const { data, content } = parseFrontmatter(raw);
		const tokens = marked.lexer(content);
		const toc = tokens
			.filter(t => t.type === 'heading' && (t.depth === 2 || t.depth === 3))
			.map(t => ({ id: slugify(t.text), text: t.text, level: t.depth }));

		pages.set(`${group.slug}/${p.slug}`, {
			slug: p.slug,
			title: data.title || p.title,
			description: data.description || '',
			createdAt: data.createdAt || null,
			updatedAt: data.updatedAt || null,
			html: marked.parser(tokens, { renderer }),
			toc,
			group,
		});
	}
}

const groupMap = new Map(groups.map(g => [g.slug, g]));

exports.groups = groups;
exports.getGroup = slug => groupMap.get(slug);
exports.getPage = (groupSlug, pageSlug) => pages.get(`${groupSlug}/${pageSlug}`);
