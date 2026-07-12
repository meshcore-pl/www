import { definePage } from './lib/page.js';
import { highlightCodeBlocks } from 'https://cdn.sefinek.net/js/codeBlocks.js';

let scrollEl = null;
let onScroll = null;
let onAnchorClick = null;

const destroy = () => {
	if (scrollEl && onScroll) scrollEl.removeEventListener('scroll', onScroll);
	scrollEl = null;
	onScroll = null;

	if (onAnchorClick) document.removeEventListener('click', onAnchorClick);
	onAnchorClick = null;
};

const init = () => {
	destroy();

	const content = document.getElementById('docs-content');
	if (!content) return;

	highlightCodeBlocks(content);

	const targetFor = href => (href && href[0] === '#' && href.length > 1)
		? content.querySelector(`#${CSS.escape(decodeURIComponent(href.slice(1)))}`)
		: null;

	const headings = [...content.querySelectorAll('h2[id], h3[id]')];
	const tocLinks = [...document.querySelectorAll('.docs-toc a')];

	const setActive = id => {
		const sel = `#${id}`;
		tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === sel));
	};

	const update = () => {
		if (!headings.length) return;

		let activeId = headings[0].id;
		if (content.scrollTop + content.clientHeight >= content.scrollHeight - 4) {
			activeId = headings[headings.length - 1].id;
		} else {
			const top = content.getBoundingClientRect().top;
			for (const heading of headings) {
				if (heading.getBoundingClientRect().top - top <= 120) activeId = heading.id;
				else break;
			}
		}
		setActive(activeId);
	};

	let ticking = false;
	onScroll = () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			update();
			ticking = false;
		});
	};
	scrollEl = content;
	content.addEventListener('scroll', onScroll, { passive: true });

	onAnchorClick = e => {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		const a = e.target.closest('a[href]');
		if (!a) return;
		const target = targetFor(a.getAttribute('href'));
		if (!target) return;
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		history.replaceState(history.state, '', a.getAttribute('href'));
		setActive(target.id);
	};
	document.addEventListener('click', onAnchorClick);

	const initial = targetFor(location.hash);
	if (initial) requestAnimationFrame(() => initial.scrollIntoView({ block: 'start' }));
	update();
};

definePage(import.meta.url, { init, destroy });
