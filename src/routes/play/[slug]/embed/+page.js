export async function load({ parent }) {
	const { details } = await parent();
	return { details };
}
export const ssr = false;
