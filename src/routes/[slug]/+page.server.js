// import { error } from '@sveltejs/kit';
// import { current_data } from '$lib/index.js';

import { error } from '@sveltejs/kit';

export async function load({ params, locals: { getSession, supabase } }) {
	console.log(await getSession());
	let slug = params['slug'];
	console.log(slug);
	let { data, error } = await supabase.from('snips').select('*').eq('project_key', slug);

	if (error) {
		console.error(error);
	}
	return { ...data, isFound: data.length > 0 };
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ locals: { supabase }, request }) => {
		let body = Object.fromEntries(await request.formData());
		console.log(body);
		const { data, error: err } = await supabase.from('snips').update([body]).eq('id', body.id);

		if (err) {
			throw error(500, 'Opsie, error from our side');
		}
	}
};
