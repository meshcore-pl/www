const router = require('express').Router();
const { version } = require('../package.json');

const siteUrl = process.env.DOMAIN.replace(/\/+$/, '');
const discordInviteUrl = `https://discord.com/invite/${process.env.DISCORD_INVITE_CODE}`; // Specjalnie discord.com/invite zamiast discord.gg żeby uniknąć wielu przekierowań

router.get('/', (req, res) => res.render('index.ejs', { siteUrl, canonicalUrl: `${siteUrl}/`, version }));
router.get('/discord', (req, res) => res.redirect(discordInviteUrl));

module.exports = router;
