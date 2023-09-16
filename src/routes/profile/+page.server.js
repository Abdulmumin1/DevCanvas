import { fail } from '@sveltejs/kit';

function validateForm(body) {
	// gather errors
	let username = String(body.username);
	let name = String(body.fullname);
	console.log(username);
	const errors = {};

	if (!username || typeof username !== 'string') {
		errors.username = 'required';
	}

	if (!name || typeof name !== 'string') {
		errors.fullname = 'required';
	}

	if (Object.keys(errors).length > 0) {
		const data = {
			data: body,
			errors
		};
		console.log(data);
		return ['failed', data];
	}
	return ['success'];
}
/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request, locals: { getSession, supabase } }) => {
		let session = await getSession();
		let user_id = session.user.id;
		let body = Object.fromEntries(await request.formData());
		let username = body.username;
		let name = body.fullname;
		let socials = JSON.stringify({
			github: body.github,
			twitter: body.twitter,
			instagram: body.instagram
		});
		let validate = validateForm(body);
		if (validate[0] == 'success') {
			const { data: profile, error: err } = await supabase
				.from('profiles')
				.insert([{ username, name, socials, user_id }]);

			if (err) {
				console.log(err);
				fail(400, { message: err });
			} else {
				console.log('sucess');
				return body;
			}
		} else {
			return fail(400, validate[1]);
		}

		// console.log(socials);
		// await sleep(2000);
		// alert('Check your inbox for the magik link');
	},

	update: async ({ request, locals: { getSession, supabase } }) => {
		let session = await getSession();
		let user_id = session.user.id;
		let body = Object.fromEntries(await request.formData());
		let username = body.username;
		let name = body.fullname;
		let socials = JSON.stringify({
			github: body.github,
			twitter: body.twitter,
			instagram: body.instagram
		});
		let validate = validateForm(body);
		if (validate[0] == 'success') {
			const { data: profile, error: err } = await supabase
				.from('profiles')
				.update([{ username, name, socials }])
				.eq('user_id', user_id);

			// console.log(body, profile);
			console.log(profile);
			if (err) {
				let message = 'Error updating your info';
				if (err.code == 23505) {
					message = 'username already taken';
				}
				console.log(message);
				return fail(400, { message });
			} else {
				return body;
			}
		} else {
			return fail(400, validate[1]);
		}
	}
};

// async function sleep(ms) {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }
