/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const targetUrl = `/output/compile/${params.slug}`;
	const screenshotApiUrl = `https://browser-worker.abdulmuminyqn.workers.dev?path=${targetUrl}`;

	const res = await fetch(screenshotApiUrl);

	if (!res.ok) {
		return new Response('Failed to fetch screenshot', { status: 500 });
	}

	const imageBuffer = await res.arrayBuffer();

	return new Response(imageBuffer, {
		headers: {
			'content-type': 'image/jpeg',
			'cache-control': 'public, max-age=604800' // cache for 1 week
		}
	});
}
