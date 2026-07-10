(() => {
	const canvas = document.getElementById('mesh-map');
	if (!canvas || !canvas.getContext) return;

	const ctx = canvas.getContext('2d');
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const BORDER = [
		[14.22, 53.92], [14.28, 53.66], [14.32, 53.50], [14.30, 53.27], [14.14, 52.84],
		[14.64, 52.57], [14.54, 52.35], [14.72, 52.06], [14.70, 51.90], [14.60, 51.74],
		[14.73, 51.52], [14.98, 51.14], [14.82, 50.87], [15.00, 50.69], [15.28, 50.89],
		[15.74, 50.73], [16.02, 50.60], [16.22, 50.42], [16.35, 50.64], [16.56, 50.21],
		[16.70, 50.09], [16.88, 50.20], [16.98, 50.42], [17.43, 50.36], [17.72, 50.30],
		[17.88, 50.13], [18.05, 49.98], [18.35, 49.93], [18.63, 49.75], [18.85, 49.52],
		[19.18, 49.40], [19.53, 49.57], [19.76, 49.41], [20.09, 49.18], [20.42, 49.42],
		[20.92, 49.28], [21.40, 49.42], [21.70, 49.42], [22.04, 49.22], [22.56, 49.09],
		[22.86, 49.00], [22.67, 49.47], [22.94, 49.80], [23.25, 50.10], [23.55, 50.26],
		[23.97, 50.41], [24.14, 50.86], [23.80, 51.09], [23.55, 51.55], [23.68, 52.07],
		[23.05, 52.33], [23.55, 52.55], [23.92, 52.72], [23.91, 53.16], [23.90, 53.50],
		[23.51, 53.94], [23.24, 54.14], [22.79, 54.36], [22.00, 54.35], [20.80, 54.40],
		[19.80, 54.44], [19.63, 54.46], [18.95, 54.35], [18.65, 54.37], [18.55, 54.50],
		[18.41, 54.72], [18.81, 54.61], [18.41, 54.79], [18.31, 54.83], [17.56, 54.76],
		[16.86, 54.59], [16.40, 54.44], [15.58, 54.18], [15.10, 54.08], [14.45, 53.93],
	];

	const CITIES = [
		['WAW', 21.01, 52.23], ['KRK', 19.94, 50.06], ['GDA', 18.65, 54.35],
		['WRO', 17.03, 51.11], ['POZ', 16.93, 52.41], ['LDZ', 19.46, 51.76],
		['SZZ', 14.55, 53.43], ['LUB', 22.57, 51.25], ['BIA', 23.16, 53.13],
		['KAT', 19.02, 50.26], ['BYD', 18.00, 53.12], ['RZE', 22.00, 50.04],
		['OLS', 20.48, 53.78], ['KIE', 20.63, 50.87], ['ZGA', 15.51, 51.94],
		['PIL', 16.74, 53.15, true], ['WAL', 16.47, 53.27], ['TOR', 18.60, 53.01, true],
	];

	const mulberry32 = (a) => () => {
		a |= 0; a = a + 0x6D2B79F5 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};

	const pointInPolygon = (lon, lat, poly) => {
		let inside = false;
		for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
			const [xi, yi] = poly[i];
			const [xj, yj] = poly[j];
			if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
		}
		return inside;
	};

	const COS_LAT = Math.cos(52.1 * Math.PI / 180);
	const project = (lon, lat) => [lon * COS_LAT, -lat];

	const projectedBorder = BORDER.map(([lon, lat]) => project(lon, lat));
	const xs = projectedBorder.map((p) => p[0]);
	const ys = projectedBorder.map((p) => p[1]);
	const minX = Math.min(...xs), maxX = Math.max(...xs);
	const minY = Math.min(...ys), maxY = Math.max(...ys);
	const spanX = maxX - minX, spanY = maxY - minY;
	const span = Math.max(spanX, spanY);
	const normalize = ([x, y]) => [(x - minX) / span + (1 - spanX / span) / 2, (y - minY) / span + (1 - spanY / span) / 2];

	const borderPath = projectedBorder.map(normalize);

	const nodes = CITIES.map(([code, lon, lat, below]) => {
		const [x, y] = normalize(project(lon, lat));
		return { x, y, code, city: true, below: !!below };
	});

	const rand = mulberry32(869525);
	let attempts = 0;
	while (nodes.length < 44 && attempts < 5000) {
		attempts++;
		const lon = 14.1 + rand() * 10.1;
		const lat = 49.0 + rand() * 5.9;
		if (!pointInPolygon(lon, lat, BORDER)) continue;
		const [x, y] = normalize(project(lon, lat));
		if (nodes.some((n) => Math.hypot(n.x - x, n.y - y) < 0.075)) continue;
		nodes.push({ x, y, city: false });
	}

	const edges = [];
	const edgeIndex = new Map();
	const adjacency = nodes.map(() => []);
	nodes.forEach((node, i) => {
		nodes
			.map((other, j) => ({ j, d: Math.hypot(other.x - node.x, other.y - node.y) }))
			.filter(({ j, d }) => j !== i && d < 0.24)
			.sort((a, b) => a.d - b.d)
			.slice(0, 3)
			.forEach(({ j }) => {
				const key = i < j ? `${i}-${j}` : `${j}-${i}`;
				if (edgeIndex.has(key)) return;
				edgeIndex.set(key, edges.length);
				edges.push([i < j ? i : j, i < j ? j : i]);
				adjacency[i].push(j);
				adjacency[j].push(i);
			});
	});

	const edgeHeat = new Float32Array(edges.length);
	const packets = [];
	const rings = [];
	let width = 0, height = 0, scale = 1, offsetX = 0, offsetY = 0;

	const toPx = (n) => [offsetX + n.x * scale, offsetY + n.y * scale];

	const resize = () => {
		const rect = canvas.getBoundingClientRect();
		if (!rect.width || !rect.height) return false;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		width = rect.width;
		height = rect.height;
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		scale = Math.min(width, height) * 0.94;
		offsetX = (width - scale) / 2;
		offsetY = (height - scale) / 2;
		return true;
	};

	const spawnPacket = () => {
		const start = Math.floor(Math.random() * nodes.length);
		const path = [start];
		let current = start, previous = -1;
		const hops = 3 + Math.floor(Math.random() * 4);
		for (let h = 0; h < hops; h++) {
			const options = adjacency[current].filter((n) => n !== previous);
			if (!options.length) break;
			const next = options[Math.floor(Math.random() * options.length)];
			path.push(next);
			previous = current;
			current = next;
		}
		if (path.length > 1) packets.push({ path, seg: 0, t: 0 });
	};

	const heatUp = (a, b) => {
		const key = a < b ? `${a}-${b}` : `${b}-${a}`;
		const idx = edgeIndex.get(key);
		if (idx !== undefined) edgeHeat[idx] = 1;
	};

	const draw = (time) => {
		ctx.clearRect(0, 0, width, height);

		ctx.beginPath();
		borderPath.forEach(([nx, ny], i) => {
			const x = offsetX + nx * scale, y = offsetY + ny * scale;
			i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
		});
		ctx.closePath();
		ctx.setLineDash([3, 6]);
		ctx.strokeStyle = 'rgba(154, 171, 209, 0.22)';
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.setLineDash([]);

		edges.forEach(([a, b], i) => {
			const [ax, ay] = toPx(nodes[a]);
			const [bx, by] = toPx(nodes[b]);
			const heat = edgeHeat[i];
			ctx.beginPath();
			ctx.moveTo(ax, ay);
			ctx.lineTo(bx, by);
			ctx.strokeStyle = heat > 0.02
				? `rgba(255, 51, 82, ${0.10 + heat * 0.45})`
				: 'rgba(154, 171, 209, 0.10)';
			ctx.lineWidth = 1;
			ctx.stroke();
		});

		rings.forEach((ring) => {
			ctx.beginPath();
			ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
			ctx.strokeStyle = `rgba(61, 220, 132, ${0.5 * (1 - ring.p)})`;
			ctx.lineWidth = 1.5;
			ctx.stroke();
		});

		nodes.forEach((node, i) => {
			const [x, y] = toPx(node);
			const pulse = node.city ? 0.75 + 0.25 * Math.sin(time * 0.0012 + i * 1.7) : 1;
			ctx.beginPath();
			ctx.arc(x, y, node.city ? 3 : 1.8, 0, Math.PI * 2);
			ctx.fillStyle = node.city
				? `rgba(238, 241, 248, ${0.9 * pulse})`
				: 'rgba(200, 210, 232, 0.45)';
			ctx.fill();
		});

		if (width >= 330) {
			ctx.font = '600 10px "IBM Plex Mono", monospace';
			ctx.fillStyle = 'rgba(153, 161, 181, 0.72)';
			nodes.forEach((node) => {
				if (!node.city) return;
				const [x, y] = toPx(node);
				const alignRight = node.x > 0.78;
				ctx.textAlign = alignRight ? 'right' : 'left';
				ctx.fillText(node.code, x + (alignRight ? -7 : 7), y + (node.below ? 14 : -6));
			});
		}

		packets.forEach((packet) => {
			const from = nodes[packet.path[packet.seg]];
			const to = nodes[packet.path[packet.seg + 1]];
			const [ax, ay] = toPx(from);
			const [bx, by] = toPx(to);
			const x = ax + (bx - ax) * packet.t;
			const y = ay + (by - ay) * packet.t;

			const trail = ctx.createLinearGradient(ax, ay, x, y);
			trail.addColorStop(0, 'rgba(255, 51, 82, 0)');
			trail.addColorStop(1, 'rgba(255, 51, 82, 0.55)');
			ctx.beginPath();
			ctx.moveTo(ax, ay);
			ctx.lineTo(x, y);
			ctx.strokeStyle = trail;
			ctx.lineWidth = 1.5;
			ctx.stroke();

			ctx.save();
			ctx.shadowColor = 'rgba(255, 51, 82, 0.9)';
			ctx.shadowBlur = 10;
			ctx.beginPath();
			ctx.arc(x, y, 2.4, 0, Math.PI * 2);
			ctx.fillStyle = '#ff3352';
			ctx.fill();
			ctx.restore();
		});
	};

	if (reducedMotion) {
		const render = () => resize() && draw(0);
		if (!render()) requestAnimationFrame(render);
		new ResizeObserver(render).observe(canvas);
		return;
	}

	let lastTime = 0;
	let spawnTimer = 400;

	const tick = (time) => {
		const dt = Math.min(time - lastTime || 16, 50);
		lastTime = time;

		spawnTimer -= dt;
		if (spawnTimer <= 0 && packets.length < 4) {
			spawnPacket();
			spawnTimer = 1100 + Math.random() * 1200;
		}

		for (let i = packets.length - 1; i >= 0; i--) {
			const packet = packets[i];
			const from = nodes[packet.path[packet.seg]];
			const to = nodes[packet.path[packet.seg + 1]];
			const segLen = Math.max(Math.hypot(to.x - from.x, to.y - from.y) * scale, 1);
			packet.t += (dt * 0.13) / segLen;
			if (packet.t >= 1) {
				heatUp(packet.path[packet.seg], packet.path[packet.seg + 1]);
				packet.seg++;
				packet.t = 0;
				if (packet.seg >= packet.path.length - 1) {
					const [x, y] = toPx(nodes[packet.path[packet.path.length - 1]]);
					rings.push({ x, y, r: 3, p: 0 });
					packets.splice(i, 1);
				}
			}
		}

		for (let i = rings.length - 1; i >= 0; i--) {
			rings[i].p += dt / 900;
			rings[i].r += dt * 0.022;
			if (rings[i].p >= 1) rings.splice(i, 1);
		}

		for (let i = 0; i < edgeHeat.length; i++) {
			if (edgeHeat[i] > 0) edgeHeat[i] = Math.max(0, edgeHeat[i] - dt / 2600);
		}

		draw(time);
		requestAnimationFrame(tick);
	};

	const start = () => {
		if (!resize()) {
			requestAnimationFrame(start);
			return;
		}
		requestAnimationFrame(tick);
	};

	new ResizeObserver(() => resize()).observe(canvas);
	start();
})();
