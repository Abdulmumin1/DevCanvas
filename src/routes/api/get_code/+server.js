export async function POST(request) {
	const jsonData = request.body;
	// const filePath = resolve('../../../../data.json'); // Replace with the actual path to your JSON file
	// console.log(jsonData);
	// Convert the JSON data to a string
	const jsonString = JSON.stringify(jsonData, null, 2);
	console.log(jsonData);
	try {
		await createCodeJson('new');
		// console.log();
		return new Response(JSON.stringify({ message: 'Data written successfully' }), {
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
