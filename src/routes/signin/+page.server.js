/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ url, request, locals: { supabase } }) => {
		let body = Object.fromEntries(await request.formData());
		let email = body.email;
		let redirectTo;
		console.log('body', body.redirectTo);
		if (body.redirectTo) {
			redirectTo = `${url.origin}${body.redirectTo}`;
		} else {
			redirectTo = `${url.origin}${'/'}`;
		}
		console.log(redirectTo);
		if (!email) return 'no mail';
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: { emailRedirectTo: redirectTo }
		});

		if (error) throw error;
		// await sleep(2000);
		// alert('Check your inbox for the magik link');
	}
};

// async function sleep(ms) {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }
