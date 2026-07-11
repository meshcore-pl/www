const { geoCheck } = require('../services/tcpClient.js');

const siteUrl = process.env.DOMAIN.replace(/\/+$/, '');

const BLOCKED_COUNTRIES = new Set(['UA']);
const BLOCKED_LANGUAGES = new Set(['uk']);

const renderBlocked = res => res.status(403).render('blocked.ejs', {
	siteUrl,
	canonicalUrl: `${siteUrl}${res.req.originalUrl}`,
	title: 'Dostęp zablokowany: MeshCore Polska',
	description: 'Ta strona nie jest dostępna w Twoim regionie.',
});

const hasBlockedLanguage = header => {
	if (!header || typeof header !== 'string') return false;
	return header.split(',').some(entry => {
		const lang = entry.split(';')[0].trim().split('-')[0].toLowerCase();
		return BLOCKED_LANGUAGES.has(lang);
	});
};

module.exports = async (req, res, next) => {
	if (hasBlockedLanguage(req.headers['accept-language'])) return renderBlocked(res);

	const geo = await geoCheck(req.ip);
	if (geo?.success && BLOCKED_COUNTRIES.has(geo.country)) return renderBlocked(res);

	next();
};
