import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';
// import { current_data } from '$lib/index.js';

export async function load({ params }) {
	let slug = params['slug'];
	console.log(slug);

	let data = [
		{
			id: 5,
			created_at: '2023-07-31T09:38:52.997053+00:00',
			code:
				'function selectOption(event) {\n' +
				'\tconst _selectedOption = event.target.value;\n' +
				"\tconsole.log('Selected Option:', _selectedOption);\n" +
				'\tlang = _selectedOption;\n' +
				'\tcurrent_data.update((cur) => {\n' +
				'\t\treturn { ...cur, lang: _selectedOption };\n' +
				'\t});\n' +
				'\tconsole.log($current_data);\n' +
				'\t// You can do further processing with the selected option here\n' +
				'}\n' +
				'\n' +
				'ok greate here',
			description: null,
			lang: 'ruby',
			user_id: null,
			project_key: 'i3B7EO'
		},
		{
			id: 8,
			created_at: '2023-07-31T17:32:51.378752+00:00',
			code:
				'\tasync function getUser() {\n' +
				"\t\t\tconsole.log('Getting USer[')\n" +
				'\t\ttry {\t\n' +
				'\t\t\treturn await supabase.auth.getUser();\n' +
				'\t\t} catch (error) {\n' +
				"\t\t\tconsole.log('error')\n" +
				'\t\t\treturn false\n' +
				'\t\t}\n' +
				'\t}',
			description: null,
			lang: 'typescript',
			user_id: '1c3624cd-ae3b-4b60-946f-65ea8f296ff7',
			project_key: '94EuRM'
		},
		{
			id: 12,
			created_at: '2023-07-31T20:08:15.580308+00:00',
			code: 'print("Hello World") ',
			description: null,
			lang: 'matlab',
			user_id: 'a4694268-f7b0-4038-8741-b7a3586975e0',
			project_key: 't51CVE'
		},
		{
			id: 11,
			created_at: '2023-07-31T19:15:38.596707+00:00',
			code:
				'<!DOCTYPE html>\n' +
				'<html lang="en">\n' +
				'\t<head>\n' +
				'\t\t<meta charset="utf-8" />\n' +
				'\t\t<link rel="icon" href="%sveltekit.assets%/favicon.png" />\n' +
				'\t\t<meta name="viewport" content="width=device-width" />\n' +
				'\t\t%sveltekit.head%\n' +
				'\t</head>\n' +
				'\t<body data-sveltekit-preload-data="hover">\n' +
				'\t\t<div style="display: contents">%sveltekit.body%</div>\n' +
				'\t</body>\n' +
				'</html>\n',
			description: null,
			lang: 'html',
			user_id: '1c3624cd-ae3b-4b60-946f-65ea8f296ff7',
			project_key: 'xIJa6X'
		}
	];
	// let { data, error } = await supabase.from('snips').select('*');

	// if (error) {
	// 	console.error(error);
	// }

	// if (data) {
	// 	return { ...data }['0'];
	// } else {
	// 	return {};
	// }
	// console.log(...data);
	// let d = { ...data };
	// console.log(d['0']);
	for (let i = 0; i < data.length; i++) {
		console.log(data[i]);
	}
	return { data, isFound: data.length > 0 };
}
