import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	search: async ({ request }) => {
		// const { supabase } = await parent();
		let body = Object.fromEntries(await request.formData());
		// console.log(body);
		redirect(303, `?query=${body.query}`);
	}
};
