import fs from 'fs';

export async function POST({ request }) {
	const jsonData = await request.formData();
	// const filePath = resolve('../../../../data.json'); // Replace with the actual path to your JSON file
	// console.log(jsonData);
	// console.log(request);
	// Convert the JSON data to a string
	try {
		await updateJson(jsonData);
		// console.log('ojfds');
		return new Response(
			JSON.stringify({ message: 'Data written successfully', lang: jsonData.get('lang') }),
			{
				status: 200
			}
		);
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

const updateJson = (jsonData) => {
	// writeFile function with filename, content and callback function
	let jsonString = {
		code: jsonData.get('code'),
		lang: jsonData.get('lang')
	};
	// console.log(jsonString);
	fs.promises.writeFile(
		`./src/lib/${jsonData.get('key')}.json`,
		JSON.stringify(jsonString),
		'utf-8'
	);
	return true;
};
