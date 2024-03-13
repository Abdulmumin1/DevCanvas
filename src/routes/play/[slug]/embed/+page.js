/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	let { details } = await parent();

	// console.log(detil)
	return { details };
}
