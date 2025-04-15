import { generateRandomKey } from '$lib/index.js';
import { fail, redirect } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase, getSession }, request }) {
	let session = await getSession();
	const body = Object.fromEntries(await request.formData());
	let key = generateRandomKey();
	let code = '// code here';
	let lang = body.lang;
	// let username = body.username;
	let description = body.description;
	let user_id = session.user.id;

	const { data, error: err } = await supabase
		.from('snips')
		.insert([{ code, lang, project_key: key, user_id, description }]);

	if (err) {
		// console.log(data);
		fail(400, { error: ' unable to complete action' });
	}

	let { data: username, error: er } = await supabase
		.from('profiles')
		.select('username')
		.eq('user_id', user_id);

	if (er) throw er;
	if (new Object(username).length > 0) {
		// let fullurl = `${url.origin}/xi1w/${slug}`;
		// console.log(username);

		throw redirect(303, `/${username[0].username}/${key}/edit`);
	} else {
		throw redirect(303, `/anon/${key}/edit`);
	}

	// throw redirect(303, `/anything/${key}/edit`);
}
