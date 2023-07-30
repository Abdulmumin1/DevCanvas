<script>
	import '../tailwind.css';
	import '../app.css';
	import { supabase } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import { user } from '$lib/index.js';

	// console.log(supabase.auth.getUser());

	async function getUser() {
		await supabase.auth.getUser();
	}
	user.set(getUser());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});

	// console.log(supabase);
</script>

<main>
	<slot />
</main>
