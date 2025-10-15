async function loadIntialData(supabase, query) {
	let { data: dt, error } = await supabase
		.from('snips')
		.select('*, profiles (username)')
		.ilike('description', `%${query}%`)
		.order('created_at', { ascending: false })
		.limit(12);

	if (error) {
		console.error(error);
	}
	return dt;
}

/** @type {import('./$types').PageLoad} */
export async function load({ locals: { supabase }, request, url }) {
	let query = url.searchParams.get('query');
	let userSnippets = await loadIntialData(supabase, query);
	// console.log(url, query, userSnippets);

	return { userSnippets: userSnippets };
}

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	search: async ({ request }) => {
		let body = Object.fromEntries(await request.formData());
		redirect(303, `/snippets/search?query=${body.query}&w=s`);
	}
};
