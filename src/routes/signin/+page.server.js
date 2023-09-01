/** @type {import('./$types').Actions} */
export const actions = {
	signin: async ({ request, locals: { supabase } }) => {
		let body = Object.fromEntries(await request.formData());
		let email = body.email;
		console.log(body);
		if (!email) return 'no mail';

		const { error } = await supabase.auth.signInWithOtp({ email });

		if (error) throw error;
		// alert('Check your inbox for the magik link');
	}
};
