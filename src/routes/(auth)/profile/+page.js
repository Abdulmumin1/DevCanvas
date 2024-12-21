// import { redirect } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

/**  @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	let { supabase, session, user } = await parent();
	if (!session) {
		throw redirect(302, '/signin?redirectTo=/gEtHAndShAkE?whereto=/profile');
	}
	let socials = { github: user.user_metadata?.user_name ?? '', twitter: '', instagram: '' };
	let df = {
		username: user.user_metadata?.user_name ?? '',
		email: session.user.email,
		name: user.user_metadata?.name ?? '',
		socials
	};

	const { data, error: err } = await supabase
		.from('profiles')
		.select('*')
		.eq('user_id', session.user.id);

	// console.log(data, session.user.email);
	if (err) throw err;
	if (data.length > 0) {
		if (data[0].username == user.user_metadata?.name) {
			console.log(
				user,
				'hfd afd asfplaing dsajofds afdosafmed safdosahfdmsa fdsao9 fd ljsafjd safdso '
			);
		}
		data[0].socials = JSON.parse(data[0].socials);
	}
	let action = data.length > 0 ? '?/update' : '?/create';
	let details = data.length > 0 ? data[0] : df;
	// console.log(details)
	
	// console.log(action);
	return { details, action };
}
