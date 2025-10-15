import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			redirect(303, `/${next.slice(1)}`);
		}
	}

	// return the user to an error page with instructions
	redirect(303, '/signin');
};
