export function handleRedirect(event) {
	const redirectTo = event.url.pathname + event.url.search;
	return `/signin?redirectTo=${redirectTo}`;
}

export function handleRedirectURL(url) {
	const redirectTo = url.pathname + url.search;
	return `/signin?redirectTo=${redirectTo}`;
}

export async function getProfile(user_id, supabase) {
	const { data, error: err } = await supabase.from('profiles').select('*').eq('user_id', user_id);
	if (err) throw err;
	return data;
}
