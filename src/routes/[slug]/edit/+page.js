import { error, redirect } from '@sveltejs/kit';
// import { current_data } from '$lib/index.js';

export async function load({ params, parent }) {
	const { supabase, session } = await parent();
	let slug = params['slug'];
	if (!session) {
		throw redirect(302, `/${slug}`);
	}
	console.log(slug);
	let { data, error: err } = await supabase.from('snips').select('*').eq('project_key', slug);
	if (data.length <= 0) {
		// console.error(error);
		// console.log('erejrejlreo rea fljsa fdoaf dsaf ');
		throw error(404, 'Enhance your calm');
	} else {
		if (session.user.id != data[0].user_id) {
			throw redirect(302, `/${slug}`);
		}
	}

	return { ...data, isFound: data.length > 0 };
}
