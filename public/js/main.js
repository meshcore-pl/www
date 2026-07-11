const animateCount = (el, target) => {
	const duration = 900;
	const start = performance.now();

	const tick = (now) => {
		const progress = Math.min((now - start) / duration, 1);
		el.textContent = Math.round(target * progress).toLocaleString('pl-PL');
		if (progress < 1) requestAnimationFrame(tick);
	};

	requestAnimationFrame(tick);
};

const loadDiscordStats = async () => {
	const res = await fetch('/api/v1/discord-stats').catch(() => null);
	if (!res) return;

	const body = await res.json().catch(() => null);
	if (!body || !body.success || typeof body.data.memberCount !== 'number') return;

	const membersEl = document.getElementById('stat-members');
	const onlineEl = document.getElementById('stat-online');
	if (!membersEl || !onlineEl) return;

	animateCount(membersEl, body.data.memberCount);
	membersEl.closest('.stat').hidden = false;

	if (typeof body.data.onlineCount === 'number') {
		animateCount(onlineEl, body.data.onlineCount);
		onlineEl.closest('.stat').hidden = false;
	} else {
		onlineEl.closest('.stat').remove();
	}
};

void loadDiscordStats();

const nav = document.querySelector('.nav');
const updateNav = () => nav.classList.toggle('nav--scrolled', window.scrollY > 10);
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });
