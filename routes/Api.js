const router = require('express').Router();
const { getDiscordStats } = require('../services/discordInvite');

router.get('/discord-stats', async (req, res) => {
	try {
		const stats = await getDiscordStats();
		res.set('Cache-Control', 'public, max-age=60');
		res.json({ success: true, status: 200, message: 'OK', data: stats });
	} catch {
		res.status(502).json({ success: false, status: 502, message: 'Discord API unavailable' });
	}
});

module.exports = router;
