import { error } from '@sveltejs/kit';

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
