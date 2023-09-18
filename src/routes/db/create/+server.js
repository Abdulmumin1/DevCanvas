import { generateRandomKey } from '$lib/index.js';
import { fail, redirect } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase, getSession }, request }) {
	let session = await getSession();
	const body = Object.fromEntries(await request.formData());
	let key = generateRandomKey();
	let code = '// code here';
	let lang = body.lang;
	let username = body.username;
	let description = body.description;
	let user_id = session.user.id;

	const { data, error: err } = await supabase
		.from('snips')
		.insert([{ code, lang, project_key: key, user_id, description }]);

	if (err) {
		console.log(data);
		fail(400, { error: ' unable to complete action' });
	}

	throw redirect(303, `/${username}/${key}/edit`);
}
