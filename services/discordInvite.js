const CACHE_TTL_MS = 60 * 1000;
const INVITE_API_URL = `https://discord.com/api/v10/invites/${process.env.DISCORD_INVITE_CODE}?with_counts=true`;

let cache = null;
let cacheExpiresAt = 0;

async function getDiscordStats() {
	const now = Date.now();

	if (cache && now < cacheExpiresAt) {
		return cache;
	}

	const res = await fetch(INVITE_API_URL, {
		headers: { Accept: 'application/json' },
	});

	if (!res.ok) {
		throw new Error(`Discord API responded with ${res.status}`);
	}

	const data = await res.json();

	cache = {
		guildName: data.guild?.name ?? null,
		memberCount: data.approximate_member_count ?? null,
		onlineCount: data.approximate_presence_count ?? null,
	};
	cacheExpiresAt = now + CACHE_TTL_MS;

	return cache;
}

module.exports = { getDiscordStats };
