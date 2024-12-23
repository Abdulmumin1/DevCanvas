import { redirect } from '@sveltejs/kit';

// src/routes/+layout.server.js
export const load = async ({ locals: { getSession, getUser }, url }) => {
	let user = await getUser();

	// console.log(user.?user_metadata)
	if (user && !user.user_metadata?.profileComplete && url.pathname != '/profile') {
		throw redirect(301, `/profile?rt=303&next=${url.pathname}`);
	}
	return {
		session: await getSession(),
		user: await getUser()
	};
};
