import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	signin: async ({ url, request, locals: { supabase } }) => {
		let body = Object.fromEntries(await request.formData());
		let email = body.email;
		let password = body?.password;
		let redirectTo;
		// console.log('body', body.redirectTo);
		if (!email) return fail(400, { message: 'Invalid Credentials' });

		if (body.redirectTo) {
			redirectTo = `${url.origin}${body.redirectTo}`;
			if (password) {
				let inputString = body.redirectTo;
				let searchString = '/gEtHAndShAkE?whereto=';
				let resultString = inputString.replace(searchString, '');
				redirectTo = `${url.origin}${resultString}`;
			}
		} else {
			redirectTo = `${url.origin}${'/'}`;
		}
		// console.log(redirectTo);
		if (!password) {
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: { emailRedirectTo: redirectTo }
			});

			if (error) throw error;
		} else {
			let { dt, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) return fail(400, { message: 'Invalid Credentials' });
			else {
				redirect(307, redirectTo);
			}
		}

		// ehre
		// await sleep(2000);
		// alert('Check your inbox for the magik link');
	},
	github: async ({ url, locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${url.origin}/code/exchange/callback`
			}
		});

		if (data.url) {
			// console.log(data.url)
			return { url: data.url };
		}
	},
	google: async ({ url, locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${url.origin}/code/exchange/google/callback`
			}
		});

		if (data.url) {
			// console.log(data.url)
			return { url: data.url };
		}
	}
};

// async function sleep(ms) {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }
