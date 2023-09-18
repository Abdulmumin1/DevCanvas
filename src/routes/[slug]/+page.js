// import { redirect } from '@sveltejs/kit';

// import { redirect } from '@sveltejs/kit';

/**  @type {import('./$types').PageLoad} */
export async function load({ url, parent }) {
	let { supabase, session } = await parent();
	let username = url.pathname.replace('/', '');
	console.log(username);
	const { data, error: err } = await supabase.from('profiles').select('*').eq('username', username);

	// console.log(data, session.user.email);
	if (err) throw err;
	if (data.length > 0) {
		data[0].socials = JSON.parse(data[0].socials);
	}
	let details = data.length > 0 ? data[0] : data;
	console.log(details);
	return { details, isFound: data.length > 0 };
}
