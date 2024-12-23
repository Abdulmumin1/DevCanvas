import { redirect } from '@sveltejs/kit';

async function signUpNewUser(supabase, email, password, redirectTo) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: redirectTo
		}
	});

	return { data, error };
}

/** @type {import('./$types').Actions} */
export const actions = {
	signup: async ({ url, request, locals: { supabase } }) => {
		let body = Object.fromEntries(await request.formData());
		let email = body.email;
		let password = body?.password;
		let redirectTo;
		console.log('body', body);
		if (body.redirectTo) {
			redirectTo = `${url.origin}${body.redirectTo}`;
		} else {
			redirectTo = body?.password ? `${url.origin}${'/profile'}` : `${url.origin}${'/'}`;
		}
		console.log(redirectTo);
		if (!email) return 'no mail';
		if (!password) {
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: { emailRedirectTo: redirectTo }
			});

			if (error) throw error;
		} else {
			let { dt, error } = await signUpNewUser(supabase, email, password, redirectTo);

			if (error) throw error;
			throw redirect(307, redirectTo);
		}
		// await sleep(2000);
		// alert('Check your inbox for the magik link');
	},
	github: async ({ url, locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${url.origin}/dashboard`
			}
		});
	}
};

// async function sleep(ms) {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }
