// src/routes/+layout.ts

import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
let PUBLIC_SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
let PUBLIC_SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
