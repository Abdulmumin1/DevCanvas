import { fail, redirect } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase }, request }) {
	const body = Object.fromEntries(await request.formData());

	const { data, error: err } = await supabase.from('snips').update([body]).eq('id', body.id);

	if (err) {
		fail(400, { error: ' unable to complete action' });
	}
}
