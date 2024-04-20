import { error } from '@sveltejs/kit';

// async function getFile(file) {
// 	const fileResponse = await fetch(file.download_url);
// 	if (!fileResponse.ok) {
// 		throw new Error(`Failed to fetch file: ${file.name}`);
// 	}
// 	// const fileContent = await fileResponse.text();
// }

export async function load({ params }) {
	try {
		//const post = await import(`../posts/${params.slug}.md`);
		//console.log(import.meta.env.VITE_PUBLIC_DEVS_BLOG)
		let test = 'http://localhost:5174';
		let prod = 'https://devcanvas-blog-posts.pages.dev';
		let test_key = 'demo_key';
		let prod_key = import.meta.env.VITE_PUBLIC_DEVS_BLOG;
		const response = await fetch(`${prod}/api/posts/${params.slug}`, {
			method: 'GET',
			headers: {
				'x-api-key': prod_key,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			const post = await response.json();
			//console.log(post)
			return {
				content: post.content.html,
				meta: post.meta
			};
		}

		// console.log(params);
		// return {
		// 	content: params.content,
		// 	meta: params.meta
		// };
	} catch (e) {
		console.log(e);
		throw error('404', `could not find the page you're lokking for!`);
	}
}
