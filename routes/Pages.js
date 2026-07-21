const router = require('express').Router();
const { version } = require('../package.json');

router.get('/', (req, res) => res.render('index.ejs', { version }));
router.get('/discord', (req, res) => res.redirect(req.app.locals.discordInvite));

module.exports = router;
