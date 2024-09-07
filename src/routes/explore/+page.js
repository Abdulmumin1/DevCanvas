async function loadPlaygroundData(supabase) {
	let { data: dt, error } = await supabase
		.from('htmlPlayground')
		.select('*, view (views), profiles (username)')
		.order('created_at', { ascending: false })
		.is('public', true)
		.limit(12);

	if (error) {
		console.error(error);
		return;
	}
	// console.log(dt, error);
	// pageCount.update((cur) => {
	// 	return cur + 6;
	// });
	return dt;
}
/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	let { supabase } = await parent();

	let canvas = await loadPlaygroundData(supabase);

	return { canvas };
}
