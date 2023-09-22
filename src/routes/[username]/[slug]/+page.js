import { error, redirect } from '@sveltejs/kit';
// import { current_data } from '$lib/index.js';

export async function load({ url, params, parent }) {
	const { supabase } = await parent();
	let slug = params['slug'];
	console.log(slug);
	let { data, error: err } = await supabase.from('snips').select('*').eq('project_key', slug);
	if (err) throw err;

	if (data.length <= 0) {
		// console.error(error);
		// console.log('erejrejlreo rea fljsa fdoaf dsaf ');
		throw error(404, 'Enhance your calm');
	}

	let { data: username, error: er } = await supabase
		.from('profiles')
		.select('username')
		.eq('user_id', data[0].user_id);

	if (er) throw er;
	// console.log(username, data[0].user_id);
	if (new Object(username).length > 0) {
		// let fullurl = `${url.origin}/xi1w/${slug}`;
		let fullurl = `${url.origin}/${username[0].username}/${slug}`;
		if (url.origin + url.pathname != fullurl) {
			console.log('invalide url');
			throw redirect(307, `/${username[0].username}/${slug}`);
		} else {
			console.log('valide url');
		}
	}
	return { ...data, isFound: data.length > 0, username };
}
