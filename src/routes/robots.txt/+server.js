/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	return new Response(
		`User-agent: *
Allow: /

# Google adsbot ignores robots.txt unless specifically named!
User-agent: AdsBot-Google
Allow: /


User-agent: GPTBot
Disallow: /


Sitemap: ${url.origin}/sitemap.xml
    `.trim()
	);
}
