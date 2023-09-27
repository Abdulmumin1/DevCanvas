import { fail } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase }, request }) {
	const body = Object.fromEntries(await request.formData());
	let id = body.id;
	delete body['id'];
	const { data, error: err } = await supabase.from('snips').update([body]).eq('id', id);

	if (err) {
		fail(400, { error: ' unable to complete action' });
	} else {
		console.log(data);
	}
}
