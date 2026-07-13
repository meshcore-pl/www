const router = require('express').Router();
const RenderError = require('../utils/renderError.js');
const docs = require('../services/docs.js');

const siteUrl = process.env.DOMAIN.replace(/\/+$/, '');

router.get('/dokumentacja', (req, res) => res.render('docs/index.ejs', {
	siteUrl,
	canonicalUrl: `${siteUrl}/dokumentacja`,
	title: 'Dokumentacja - MeshCore Polska',
	description: 'Dokumentacja MeshCore Polska: regulamin i informacje o serwerze Discord oraz poradniki związane z siecią MeshCore.',
	groups: docs.groups,
}));

router.get('/dokumentacja/:group', (req, res) => {
	const group = docs.getGroup(req.params.group);
	if (!group) return RenderError(res, 404);

	res.render('docs/group.ejs', {
		siteUrl,
		canonicalUrl: `${siteUrl}/dokumentacja/${group.slug}`,
		title: `${group.title} - Dokumentacja MeshCore Polska`,
		description: group.description,
		groups: docs.groups,
		group,
	});
});

router.get('/dokumentacja/:group/:slug', (req, res) => {
	const group = docs.getGroup(req.params.group);
	if (!group) return RenderError(res, 404);

	const page = docs.getPage(req.params.group, req.params.slug);
	if (!page) return RenderError(res, 404);

	const locals = {
		siteUrl,
		canonicalUrl: `${siteUrl}/dokumentacja/${group.slug}/${page.slug}`,
		title: `${page.title} - ${group.title} - MeshCore Polska`,
		description: page.description || `${page.title} - dokumentacja MeshCore Polska.`,
		groups: docs.groups,
		group,
		page,
	};

	if (req.get('X-Docs-Fetch') !== '1') return res.render('docs/page.ejs', locals);

	res.render('docs/_page-content.ejs', locals, (err, html) => {
		if (err) return res.status(500).end();
		res.json({ title: locals.title, description: locals.description, canonicalUrl: locals.canonicalUrl, html });
	});
});

module.exports = router;
