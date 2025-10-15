import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

const PUBLIC_SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const PUBLIC_SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const handle = async ({ event, resolve }) => {
	// Create Supabase client
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	// Convenience helpers for session and user retrieval
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
			return null; // JWT validation failed
		}
		return user;
	};

	// Handle redirects
	const session = await event.locals.getSession(); // Ensure this is resolved early
	const pathname = event.url.pathname;

	if (pathname === '/new') {
		redirect(301, '/play/try');
	}
	if (pathname === '/community') {
		redirect(301, '/explore');
	}
	if (pathname === '/signin' && session) {
		redirect(307, '/dashboard');
	}
	if (pathname.startsWith('/html-playground') || pathname === '/html-playground') {
		redirect(307, pathname.replace('/html-playground', '/play'));
	}

	// Resolve the response
	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'; // Pass through specific headers
		}
	});
};
