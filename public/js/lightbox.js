const initLightbox = () => {
	const links = document.querySelectorAll('a[data-lightbox]');
	if (!links.length) return;

	const overlay = document.createElement('div');
	overlay.className = 'lightbox';
	overlay.hidden = true;

	const image = document.createElement('img');
	overlay.appendChild(image);
	document.body.appendChild(overlay);

	const close = () => {
		overlay.hidden = true;
	};

	links.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault();
			const thumb = link.querySelector('img');
			image.src = link.href;
			image.alt = thumb ? thumb.alt : '';
			overlay.hidden = false;
		});
	});

	overlay.addEventListener('click', close);
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && !overlay.hidden) close();
	});
};

initLightbox();
