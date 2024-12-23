async function loadIntialData(supabase) {
	let { data: dt, error } = await supabase
		.from('snips')
		.select('*, profiles (username)')
		.order('created_at', { ascending: false })
		.limit(12);

	if (error) {
		console.error(error);
	}
	return dt;
}

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	let { supabase } = await parent();
	let userSnippets = await loadIntialData(supabase);

	return { userSnippets: userSnippets };
}
