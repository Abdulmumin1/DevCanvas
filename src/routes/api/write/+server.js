// server.js
import fs from 'fs';
// import { resolve } from 'path';
import { generateRandomKey } from '$lib/index.js';
// import { resolve } from 'path';
export async function POST({ request }) {
	const jsonData = request.body;

	// const filePath = resolve('../../../../data.json'); // Replace with the actual path to your JSON file
	// console.log(jsonData);
	// Convert the JSON data to a string
	const jsonString = JSON.stringify(jsonData);
	console.log(jsonString);
	try {
		let key = generateRandomKey();
		await createCodeJson(key);

		// console.log();
		return new Response(JSON.stringify({ message: 'Data written successfully', key: key }), {
			status: 200
		});
	} catch (error) {
		console.error('Error writing to JSON file:', error);
		return new Response(
			{ error: 'Failed to write to JSON file' },
			{
				status: 500
			}
		);
	}
}

const createCodeJson = (key) => {
	// writeFile function with filename, content and callback function
	const jsonString = JSON.stringify(
		{ code: '//your code goes here and there', lang: 'js' },
		null,
		2
	);
	fs.promises.writeFile(`./src/lib/${key}.json`, jsonString, 'utf-8');
	return true;
};
