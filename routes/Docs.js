const router = require('express').Router();
const RenderError = require('../utils/renderError.js');
const docs = require('../services/docs.js');

router.get('/dokumentacja', (req, res) => res.render('docs/index.ejs', { groups: docs.groups }));

router.get('/dokumentacja/:group', (req, res) => {
	const group = docs.getGroup(req.params.group);
	if (!group) return RenderError(res, 404);

	res.render('docs/group.ejs', { groups: docs.groups, group });
});

router.get('/dokumentacja/:group/:slug', (req, res) => {
	const group = docs.getGroup(req.params.group);
	if (!group) return RenderError(res, 404);

	const page = docs.getPage(req.params.group, req.params.slug);
	if (!page) return RenderError(res, 404);

	const canonical = `/dokumentacja/${group.slug}/${page.slug}`;
	const locals = {
		title: `${page.title} - ${group.title} - MeshCore Polska`,
		description: page.description || `${page.title} - dokumentacja MeshCore Polska.`,
		canonical,
		groups: docs.groups,
		group,
		page,
	};

	if (req.get('X-Docs-Fetch') !== '1') return res.render('docs/page.ejs', locals);

	res.render('docs/_page-content.ejs', locals, (err, html) => {
		if (err) return res.status(500).end();
		res.json({ title: locals.title, description: locals.description, canonicalUrl: `${req.app.locals.domain}${canonical}`, html });
	});
});

module.exports = router;
