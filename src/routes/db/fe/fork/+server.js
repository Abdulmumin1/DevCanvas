import { generateRandomKey } from '$lib/stores/index.js';
import { error } from '@sveltejs/kit';
// import { handleRedirectURL } from '$lib/utils';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase, getSession }, request }) {
	let session = await getSession();
	const body = Object.fromEntries(await request.formData());
	if (!session) {
		error(400, { message: ' unable to complete action' });
	}
	let key = generateRandomKey();
	let save = body?.save;
	let html = body.html;
	let css = body.css;
	let js = body.js;
	let plugins = [JSON.parse(body.plugins)];
	let config = JSON.parse(body.config);

	let description = save ? body.description : `Fork: ${body.description}`;
	let user_id = session.user.id;
	// console.log(session.user);
	const { data, error: err } = await supabase
		.from('htmlPlayground')
		.insert([
			{ html, css, js, project_key: key, user_id, description, plugins, config, public: false }
		]);

	if (err) {
		console.log(data);
		error(400, { message: ' unable to complete action' });
	}
	const { data: _, error: er } = await supabase
		.from('view')
		.insert([{ project_key: key, views: 0 }]);

	console.log(_);
	if (er) {
		error(400, { message: 'unable to complete action' });
	}

	return new Response(JSON.stringify({ url: `/play/${key}` }));
}
