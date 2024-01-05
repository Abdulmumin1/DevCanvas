import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	let { session } = await parent();
	// let user = new Object(userInfo);
	// console.log(user.length);
	if (!session) {
		throw redirect(302, '/signin?redirectTo=/gEtHAndShAkE?whereto=/pro/activate');
	}
}
