import { redirect } from '@sveltejs/kit';
import { error } from 'sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals: { supabase } }) {
	const { error: err } = await supabase.auth.signOut();
	if (err) {
		throw error(500, 'Unable to complete action');
	}
	return redirect(303, '/');
}
