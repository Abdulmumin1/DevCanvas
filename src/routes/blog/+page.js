// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('blog/api/posts');
	const posts = await response.json();
	return { posts };
	// throw error(404, 'Not found');
}
