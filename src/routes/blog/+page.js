import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	//const response = await fetch('blog/api/posts');
	let test = 'http://localhost:5174';
	let prod = 'https://devcanvas-blog-posts.pages.dev';
	let test_key = 'demo_key';
	let prod_key = import.meta.env.VITE_PUBLIC_DEVS_BLOG;
	const response = await fetch(`${prod}/api/posts`, {
		method: 'GET',
		headers: {
			'x-api-key': prod_key,
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	console.log(response);
	if (response.ok) {
		const posts = await response.json();
		//console.log(posts)
		return { posts };
	}
	return error(500, 'internal error');
}
