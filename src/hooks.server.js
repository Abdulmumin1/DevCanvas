// src/hooks.server.ts
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
// import { handleRedirect } from '$lib/utils';

//https://devcanvas.art/v0/callback/github/auth

let PUBLIC_SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
let PUBLIC_SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});
	/**
	 * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.getUser = async () => {
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			// JWT validation has failed
			return null;
		}

		return user;
	};

	if (event.url.pathname == '/new') {
		throw redirect(301, '/play/try');
	}
	if (event.url.pathname == '/signin') {
		let session = await event.locals.getSession();
		if (session) {
			throw redirect(307, '/dashboard');
		}
	}
	if (
		event.url.pathname.startsWith('/html-playground') ||
		event.url.pathname == '/html-playground'
	) {
		throw redirect(307, event.url.pathname.replace('/html-playground', '/play'));
	}

	// console.log(event.url);
	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
