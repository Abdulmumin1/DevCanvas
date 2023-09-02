// // import { error } from '@sveltejs/kit';
// // import { current_data } from '$lib/index.js';

// export async function load({ parent }) {
// 	const { supabase } = await parent();
// 	let { data, error } = await supabase
// 		.from('snips')
// 		.select('*')
// 		.order('created_at', { ascending: false })
// 		.limit(6);

// 	if (error) {
// 		console.error(error);
// 	}
// 	return { data, isFound: data.length > 0 };
// }
