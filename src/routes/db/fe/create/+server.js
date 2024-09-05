import { generateRandomKey } from '$lib/index.js';
import { fail, redirect } from '@sveltejs/kit';
import { handleRedirectURL } from '$lib/utils';
/** @type {import('./$types').RequestHandler} */
export async function POST({ url, locals: { supabase, getSession }, request }) {
	let session = await getSession();
	if (!session) {
		throw redirect(303, handleRedirectURL(url, '/play'));
	}
	// const body = Object.fromEntries(await request.formData());
	let key = generateRandomKey();
	const body = Object.fromEntries(await request.formData());
	console.log(body);
	let description = body?.project_name ?? 'Untitled Project';

	let user_id = session.user?.id ? session.user.id : null;
	// console.log(session.user);
	const { data, error: err } = await supabase
		.from('htmlPlayground')
		.insert([{ project_key: key, user_id, description }]);

	const { data: dt, error: er } = await supabase
		.from('view')
		.insert([{ project_key: key, views: 0 }]);
	console.log(dt, er);
	if (err) {
		console.log(data);
		fail(400, { error: ' unable to complete action' });
	}
	if (er) throw er;

	throw redirect(303, `/play/${key}`);
}
