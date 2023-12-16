export function handleRedirect(event) {
	const redirectTo = event.url.pathname + event.url.search;
	return `/signin?redirectTo=${redirectTo}`;
}

export function handleRedirectURL(url, custom = null) {
	let redirectTo = url.pathname + url.search;
	if (custom) {
		redirectTo = custom;
	}
	return `/signin?redirectTo=${redirectTo}`;
}

export async function getProfile(user_id, supabase) {
	const { data, error: err } = await supabase
		.from('profiles')
		.select('username')
		.eq('user_id', user_id);
	if (err) throw err;
	return data;
}

export async function getViews(slug, supabase) {
	const { data, error: er } = await supabase.from('view').select('views').eq('project_key', slug);
	if (er) throw er;
	return data;
}
