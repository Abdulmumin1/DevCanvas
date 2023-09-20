import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	const { supabase } = await parent();
	let slug = params['slug'];
	console.log(slug);
	console.log(slug);
	let { data, error: err } = await supabase
		.from('htmlPlayground')
		.select('*')
		.eq('project_key', slug);
	console.log(err);
	if (data.length <= 0) {
		// console.error(error);
		// console.log('erejrejlreo rea fljsa fdoaf dsaf ');
		throw error(404, 'Enhance your calm');
	}

	return { ...data, isFound: data.length > 0 };
}
