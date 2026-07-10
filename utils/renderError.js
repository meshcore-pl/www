const siteUrl = process.env.SITE_URL.replace(/\/+$/, '');
const discordInviteUrl = `https://discord.gg/${process.env.DISCORD_INVITE_CODE}`;

const MESSAGES = {
	404: 'Nie znaleziono strony. Wróć na stronę główną albo dołącz od razu na Discord.',
	429: 'Zbyt wiele żądań. Spróbuj ponownie za chwilę.',
	500: 'Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie za chwilę.',
	503: 'Serwer jest chwilowo niedostępny. Spróbuj ponownie za chwilę.',
};

module.exports = (res, status) => {
	res.status(status).render('error.ejs', {
		siteUrl,
		discordInviteUrl,
		canonicalUrl: `${siteUrl}${res.req.originalUrl}`,
		title: `Błąd ${status}: MeshCore Polska`,
		description: 'Wystąpił błąd podczas ładowania strony MeshCore Polska.',
		noindex: true,
		status,
		message: MESSAGES[status] || 'Wystąpił błąd.',
	});
};
