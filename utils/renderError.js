const siteUrl = process.env.DOMAIN.replace(/\/+$/, '');

const MESSAGES = {
	404: 'Nie znaleziono strony. Wróć na stronę główną.',
	429: 'Ups. Zbyt wiele żądań. Spróbuj ponownie za chwilę.',
	500: 'Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie za chwilę.',
	503: 'Serwer jest chwilowo niedostępny. Spróbuj ponownie za chwilę.',
};

module.exports = (res, status, err) => {
	if (err) console.error(err);

	res.status(status).render('error.ejs', {
		siteUrl,
		canonicalUrl: `${siteUrl}${res.req.originalUrl}`,
		title: `Błąd ${status}: MeshCore Polska`,
		description: 'Wystąpił błąd podczas ładowania strony MeshCore Polska.',
		status,
		message: MESSAGES[status] || 'Wystąpił błąd.',
	});
};
