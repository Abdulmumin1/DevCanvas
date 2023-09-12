import { generateRandomKey } from '$lib/index.js';
import { fail, redirect } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase, getSession }, request }) {
	let session = await getSession();
	const body = Object.fromEntries(await request.formData());
	let key = generateRandomKey();
	let html = '<!-- -->';
	let description = body.description;
	let user_id = session ? session.user.id : null;
	const { data, error: err } = await supabase
		.from('htmlPlayground')
		.insert([{ html, project_key: key, user_id, description }]);

	if (err) {
		console.log(data);
		fail(400, { error: ' unable to complete action' });
	}

	throw redirect(303, `/html-playground/${key}`);
}
