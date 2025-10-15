import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	// console.log(url);
	const { session } = await parent();
	if (session) {
		redirect(303, '/dashboard');
	}
}
