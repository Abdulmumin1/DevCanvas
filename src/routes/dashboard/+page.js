// import { error } from '@sveltejs/kit';
// import { current_data } from '$lib/index.js';
// export async function load({ parent }) {
// 	// let session = await getSession();
// 	const { supabase, session } = await parent();
// 	// if (!session) {
// 	// 	throw redirect(303, '/signin');
// 	// }
// 	let { data, error } = await supabase
// 		.from('snips')
// 		.select('*')
// 		.eq('user_id', session.user.id)
// 		.order('created_at', { ascending: false })

// 		.limit(6);

// 	if (error) {
// 		console.error(error);
// 	}
// 	return { data, isFound: data.length > 0 };
// }
