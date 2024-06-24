// src/routes/+layout.server.js
export const load = async ({ locals: { getSession, getUser } }) => {
	return {
		session: await getSession(),
		user: await getUser()
	};
};
