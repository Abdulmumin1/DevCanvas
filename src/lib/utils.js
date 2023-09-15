export function handleRedirect(event) {
	const redirectTo = event.url.pathname + event.url.search;
	return `/signin?redirectTo=${redirectTo}`;
}

export function handleRedirectURL(url) {
	const redirectTo = url.pathname + url.search;
	return `/signin?redirectTo=${redirectTo}`;
}
