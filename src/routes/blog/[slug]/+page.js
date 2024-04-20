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
		const post = await import(`../posts/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata
		};
		// console.log(params);
		// return {
		// 	content: params.content,
		// 	meta: params.meta
		// };
	} catch (e) {
		throw error('404', `could not find the page you're lokking for!`);
	}
}
