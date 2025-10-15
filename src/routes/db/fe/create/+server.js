import { generateRandomKey } from '$lib/stores/index.js';
import { fail, redirect } from '@sveltejs/kit';
import { handleRedirectURL } from '$lib/utils';
import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ url, locals: { supabase, getSession }, request }) {
	let session = await getSession();
	if (!session) {
		redirect(303, handleRedirectURL(url, '/play'));
	}
	// const body = Object.fromEntries(await request.formData());
	let key = generateRandomKey();
	const body = Object.fromEntries(await request.formData());
	// console.log(body);
	let description = body?.project_name ?? 'Untitled Project';
	let returnKey = body?.returnKey ?? false;

	let user_id = session.user?.id ? session.user.id : null;
	// console.log(session.user);
	const { data, error: err } = await supabase
		.from('htmlPlayground')
		.insert([{ project_key: key, public: false, user_id, description }]);

	const { data: dt, error: er } = await supabase
		.from('view')
		.insert([{ project_key: key, views: 0 }]);
	// console.log(dt, er);
	if (err) {
		// console.log(data);
		return fail(400, { error: 'unable to complete action' });
	}
	if (er) throw er;
	if (returnKey) {
		return json({ key });
	}

	redirect(303, `/play/${key}`);
}
