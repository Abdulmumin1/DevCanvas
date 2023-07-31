import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';
// import { current_data } from '$lib/index.js';

export async function load({ params }) {
	let slug = params['slug'];
	console.log(slug);
	let { data, error } = await supabase.from('snips').select('*');

	if (error) {
		console.error(error);
	}

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
