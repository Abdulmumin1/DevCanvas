// import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';
// import { current_data } from '$lib/index.js';

export async function load({ params }) {
	let slug = params['slug'];
	console.log(slug);
	let { data, error } = await supabase.from('snips').select('*').eq('project_key', slug);

	if (error) {
		console.error(error);
	}
	console.log(...data);
	// let d = { ...data };
	// console.log(d['0']);
	// current_data.set(...data);
	return { ...data }['0'];
}
