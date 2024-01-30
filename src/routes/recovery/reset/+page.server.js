import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	reset: async ({ request, locals: { supabase } }) => {
		let body = Object.fromEntries(await request.formData());
		let password = body.password;
		if (password) {
			const { data, error } = await supabase.auth.updateUser({
				password
			});

			if (error) return fail(402, { message: 'Error Completing request' });
			return { success: true };
		}
	}
};
