const router = require('express').Router();

const siteUrl = process.env.SITE_URL.replace(/\/+$/, '');
const discordInviteUrl = `https://discord.gg/${process.env.DISCORD_INVITE_CODE}`;

router.get('/', (req, res) => res.render('index.ejs', { siteUrl, discordInviteUrl, canonicalUrl: `${siteUrl}/` }));

module.exports = router;
