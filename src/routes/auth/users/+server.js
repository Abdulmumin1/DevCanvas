import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals: { supabase } }) {
	const {
		data: { users },
		error: err
	} = await supabase.auth.admin.listUsers();
	// console.log(users);
	if (err) {
		console.error(err);
		error(500, 'Unable to complete action');
	}
	return new Response({ users });
}
