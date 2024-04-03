/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('blog/api/posts');
	const posts = await response.json();
	return { posts };
}
