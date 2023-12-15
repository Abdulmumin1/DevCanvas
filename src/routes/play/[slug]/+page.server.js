import { error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ locals: { supabase }, request }) => {
		let body = Object.fromEntries(await request.formData());
		let id = body.id;
		if (body.plugins) {
			body.plugins = [JSON.parse(body.plugins)];
		}
		const { data, error: err } = await supabase.from('htmlPlayground').update([body]).eq('id', id);
		if (err) {
			console.log(err);
			throw error(500, 'Opssie, error from our side');
		} else {
			console.log(data);
		}
	},

	updateVisibility: async ({ locals: { supabase }, request }) => {
		let body = Object.fromEntries(await request.formData());
		let id = body.id;
		let value = body.value;
		console.log(body);
		const { data, error: err } = await supabase
			.from('htmlPlayground')
			.update({ public: value })
			.eq('id', id);
		if (err) {
			console.log(err);
			throw error(500, 'Opssie, error from our side');
		} else {
			console.log(data);
		}
	}
};
