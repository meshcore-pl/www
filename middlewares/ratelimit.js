const rateLimit = require('express-rate-limit');
const RenderError = require('../utils/renderError.js');

module.exports = rateLimit({
	windowMs: 40 * 1000,
	limit: 52,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	skip: () => process.env.NODE_ENV === 'development',
	handler: (req, res) => RenderError(res, 429),
});