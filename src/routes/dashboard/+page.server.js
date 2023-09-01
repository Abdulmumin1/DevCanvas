// import { error } from '@sveltejs/kit';
// import { current_data } from '$lib/index.js';

import { redirect } from '@sveltejs/kit';

export async function load({ locals: { supabase } }) {
	// let session = await getSession();

	// if (!session) {
	// 	throw redirect(303, '/signin');
	// }
	let { data, error } = await supabase
		.from('snips')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(6);

	if (error) {
		console.error(error);
	}
	return { data, isFound: data.length > 0 };
}
