/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	let { details } = await parent();

	return { details };
}
