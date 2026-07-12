const CACHE_TTL_MS = 60 * 1000;
const ERROR_BACKOFF_MS = 15 * 1000;
const INVITE_API_URL = `https://discord.com/api/v10/invites/${process.env.DISCORD_INVITE_CODE}?with_counts=true`;

let cache = null, cacheExpiresAt = 0, nextAttemptAt = 0, pending = null;

const fetchStats = async () => {
	const res = await fetch(INVITE_API_URL, {
		headers: { Accept: 'application/json' },
	});

	if (!res.ok) {
		throw new Error(`Discord API responded with ${res.status}`);
	}

	const data = await res.json();

	return {
		guildName: data.guild?.name ?? null,
		memberCount: data.approximate_member_count ?? null,
		onlineCount: data.approximate_presence_count ?? null,
	};
};

module.exports = async () => {
	const now = Date.now();
	if (cache && now < cacheExpiresAt) return cache;
	if (pending) return pending;
	if (cache && now < nextAttemptAt) return cache;

	pending = fetchStats()
		.then(stats => {
			cache = stats;
			cacheExpiresAt = Date.now() + CACHE_TTL_MS;
			return stats;
		})
		.catch(err => {
			nextAttemptAt = Date.now() + ERROR_BACKOFF_MS;
			throw err;
		})
		.finally(() => {
			pending = null;
		});

	return pending;
};
