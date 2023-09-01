// import { error } from '@sveltejs/kit';
// import { current_data } from '$lib/index.js';

export async function load({ params, parent }) {
	const { supabase } = await parent();
	let slug = params['slug'];
	console.log(slug);
	let { data, error } = await supabase.from('snips').select('*').eq('project_key', slug);

	if (error) {
		console.error(error);
	}
	return { ...data, isFound: data.length > 0 };
}
