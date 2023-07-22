import { error } from '@sveltejs/kit';
import { loadJson } from '$lib/index.js';
// import myData from '$lib/data.json';
// async function getFile(file) {
// 	const fileResponse = await fetch(file.download_url);
// 	if (!fileResponse.ok) {
// 		throw new Error(`Failed to fetch file: ${file.name}`);
// 	}
// 	// const fileContent = await fileResponse.text();
// }

export async function load({ params }) {
	try {
		// console.log('fetch started');
		// const response = await fetch('$lib/data.json');
		// myData = await response.json();
		// console.log(myData);
		let slug = params['slug'];
		let myData = await import(`../../lib/${slug}.json`);
		console.log(myData);
		myData = myData.default;
		// console.log('Loaded JSON data:', data);

		return myData;
	} catch (e) {
		throw error('404', `could not find the page you're looking for!`);
		// return e;/
	}
}
