<script>
	import '../tailwind.css';
	import '../app.css';
	import { supabase } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import { user } from '$lib/index.js';

	// console.log(supabase.auth.getUser());

	async function getUser() {
			console.log('Getting USer[')
		try {	
			return await supabase.auth.getUser();
		} catch (error) {
			console.log('error')
			return false
		}
	}
	user.set(getUser());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});

	// console.log($user.id);
</script>

<main>
	<slot />
</main>
