// import { redirect } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';

/**  @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	let { supabase } = await parent();
	let username = params['username'];
	const { data, error: err } = await supabase
		.from('profiles')
		.select('*')
		.eq('username', username.toLowerCase());

	if (err) throw err;
	if (data.length > 0) {
		data[0].socials = JSON.parse(data[0].socials);
	} else {
		throw error(404, 'Not Found');
	}
	let details = data.length > 0 ? data[0] : data;
	return { details, isFound: data.length > 0 };
}
