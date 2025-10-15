import { error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ locals: { supabase }, request }) => {
		let body = Object.fromEntries(await request.formData());
		let id = body.id;

		if (body.plugins && body.plugins !== undefined && body.plugins !== '') {
			// console.log("plugins", body.plugins)
			body.plugins = JSON.parse(body.plugins);
		} else {
			body.plugins = [];
		}

		if (body.config && body.config !== undefined && body.config !== '') {
			// console.log("config", body.config)
			body.config = JSON.parse(body.config);
		}

		if (body.tags && body.tags !== undefined && body.tags !== '') {
			// console.log("tags", body.tags)

			body.tags = JSON.parse(body.tags);
		}

		// if (body.messages && body.messages !== undefined && body.messages !== '') {
		// console.log("messages", body.messages)

		// body.messages = JSON.parse(body.messages);
		// }
		// console.log(body);

		const { data, error: err } = await supabase.from('htmlPlayground').update([body]).eq('id', id);
		if (err) {
			console.log(err);
			error(500, 'Opssie, error from our side');
		} else {
			// console.log(data);
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
			error(500, 'Opssie, error from our side');
		} else {
			// console.log(data);
		}
	}
};
