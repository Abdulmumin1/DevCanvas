// import { error } from '@sveltejs/kit';
import { getProfile, getViews } from '$lib/utils.js';
// import { current_data } from '$lib/index.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	let { details, supabase } = await parent();
	console.log('Prefetching page', details);

	// try {
	// 	const user_name = await getProfile(details.user_id, supabase);
	// 	// Assuming getProfile returns an object with a 'user_name' property
	// 	if (new Object(user_name).length > 0) {
	// 		details = { ...details, profile: user_name[0].username, views: details.view[0]?.views };
	// 	} else {
	// 		details = { ...details, profile: 'anonymous', views: details.view[0]?.views };
	// 	}
	// } catch (error) {
	// 	details = { ...details, profile: 'anonymous', views: details.view[0]?.views };
	// 	console.error(`Error fetching profile for user_id ${details.user_id}: ${error.message}`);
	// }

	details = { ...details, profile: details.profiles.username, views: details.view[0]?.views };

	return { details };
}
