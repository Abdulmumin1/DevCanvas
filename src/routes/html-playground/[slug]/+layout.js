import { error } from '@sveltejs/kit';
import { getProfile, getViews } from '$lib/utils.js';
// import { current_data } from '$lib/index.js';

export async function load({ params, parent }) {
	const { supabase } = await parent();
	let slug = params['slug'];
	// console.log(slug);
	let { data, error: err } = await supabase
		.from('htmlPlayground')
		.select('*')
		.eq('project_key', slug);

	if (err) throw err;
	if (data.length <= 0) {
		// console.error(error);
		// console.log('erejrejlreo rea fljsa fdoaf dsaf ');
		throw error(404, 'Enhance your calm');
	}
	data = data[0];
	const views = await getViews(data.project_key, supabase);
	try {
		const user_name = await getProfile(data.user_id, supabase);
		// Assuming getProfile returns an object with a 'user_name' property
		if (new Object(user_name).length > 0) {
			data = { ...data, profile: user_name[0].username, views: views[0]?.views };
		} else {
			data = { ...data, profile: 'anonymous', views: views[0]?.views };
		}
	} catch (error) {
		data = { ...data, profile: 'anonymous', views: views[0]?.views };
		console.error(`Error fetching profile for user_id ${data.user_id}: ${error.message}`);
	}

	return { details: data };
}
