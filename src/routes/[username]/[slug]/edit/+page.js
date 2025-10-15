import { error, redirect } from '@sveltejs/kit';
// import { current_data } from '$lib/stores/index.js';

export async function load({ url, params, parent }) {
	const { supabase, session } = await parent();
	let slug = params['slug'];
	// console.log(url);
	if (!session) {
		// redirect unauthenticated users back to the preview if they try to edit
		throw redirect(302, `${url.pathname.replace('/edit', '')}`);
	}
	// console.log(slug);
	let { data, error: err } = await supabase.from('snips').select('*').eq('project_key', slug);
	if (err) throw err;
	if (data.length <= 0) {
		// console.error(error);
		// console.log('erejrejlreo rea fljsa fdoaf dsaf ');
		throw error(404, 'Enhance your calm');
	} else {
		if (session.user.id != data[0].user_id) {
			// redirect authenticated users back to the preview if they are not the one that created the snippet
			throw redirect(302, `${url.pathname.replace('/edit', '')}`);
		}
	}

	return { ...data, isFound: data.length > 0 };
}
