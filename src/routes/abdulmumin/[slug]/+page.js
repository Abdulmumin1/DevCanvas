import { error } from '@sveltejs/kit';
// import { current_data } from '$lib/index.js';

export async function load({ params, parent }) {
	const { supabase } = await parent();
	let slug = params['slug'];
	console.log(slug);
	let { data, error: err } = await supabase.from('snips').select('*').eq('project_key', slug);

	if (data.length <= 0) {
		// console.error(error);
		// console.log('erejrejlreo rea fljsa fdoaf dsaf ');
		throw error(404, 'Enhance your calm');
	}
	return { ...data, isFound: data.length > 0 };
}
