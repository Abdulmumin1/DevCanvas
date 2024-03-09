import { error } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const { supabase } = await parent();
	let slug = params['slug'];
	// console.log(slug);
	let { data, error: err } = await supabase
		.from('htmlPlayground')
		.select('*')

		.eq('project_key', slug);

	if (err) throw err;
	if (data.length <= 0) {
		// console.error(error);
		// console.log('erejrejlreo rea fljsa fdoaf dsaf ');
		throw error(404, 'Enhance your calm');
	}
	data = data[0];
	return { details: data };
}
