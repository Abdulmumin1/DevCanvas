import { error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ locals: { supabase }, request }) => {
		let body = Object.fromEntries(await request.formData());
		let id = body.id;
		delete body['id'];
		const { data, error: err } = await supabase.from('snips').update([body]).eq('id', id);
		if (err) {
			throw error(500, 'Opsie, error from our side');
		} else {
			console.log(data);
		}
	}
};
