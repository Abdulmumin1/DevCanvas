<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { user } from '$lib/index.js';
	let loading = false;
	const handleSubmit = () => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			user.set(false);
			invalidateAll();
			await update();
		};
	};
</script>

<form action="/auth/signout" use:enhance={handleSubmit} method="post">
	<button type="submit" aria-busy={loading} class="w-full"> Logout </button>
</form>
