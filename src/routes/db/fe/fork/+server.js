import { generateRandomKey } from '$lib/index.js';
import { fail, redirect } from '@sveltejs/kit';
import { handleRedirectURL } from '$lib/utils';
/** @type {import('./$types').RequestHandler} */
export async function POST({ url, locals: { supabase, getSession }, request }) {
	let session = await getSession();
	if (!session) {
		throw redirect(303, handleRedirectURL(url));
	}
	const body = Object.fromEntries(await request.formData());
	let key = generateRandomKey();
	let html = body.html;
	let css = body.css;
	let js = body.js;
	let description = body.description;
	let user_id = session.user.id;
	// console.log(session.user);
	const { data, error: err } = await supabase
		.from('htmlPlayground')
		.insert([{ html, css, js, project_key: key, user_id, description }]);

	if (err) {
		console.log(data);
		fail(400, { error: ' unable to complete action' });
	}

	throw redirect(303, `/html-playground/${key}`);
}
