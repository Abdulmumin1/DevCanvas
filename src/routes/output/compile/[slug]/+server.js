import { constructHtml } from '../../../../lib/feEditor/previewUtils';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, params, locals: { supabase } }) {
	let slug = params['slug'];

	let preview = url.searchParams.get('p') ?? false;
	// Fetch project data
	const { data, error } = await supabase
		.from('htmlPlayground')
		.select('*')
		.eq('project_key', slug)
		.single();

	if (error || !data) {
		return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Untitled Canvas</title>
</head>
<body>
    
</body>
</html>`, {
			headers: {
				'Content-Type': 'text/html'
			}
		});
	}
	// console.log(data)

	// Generate HTML from the fetched data

	try {
		const html = await constructHtml(data, preview);
		// Return the HTML as a response
		return new Response(html, {
			headers: {
				'Content-Type': 'text/html'
			}
		});
	} catch (error) {
		const html = '<>';
		console.log('Error Processing', data.description, data);

		// Return the HTML as a response
		return new Response(html, {
			headers: {
				'Content-Type': 'text/html'
			}
		});
	}
}
