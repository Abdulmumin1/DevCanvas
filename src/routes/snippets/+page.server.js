import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	search: async ({ request }) => {
		let body = Object.fromEntries(await request.formData());
		throw redirect(303, `/snippets/search?query=${body.query}&w=s`);
	}
};
