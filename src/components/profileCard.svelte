<script>
	import { user } from '$lib/index.js';
</script>

<div class="rounded-full bg-gray-100 p-2 dark:bg-secondary-dark dark:text-white">
	<a class=" uppercase" href="/profile">{$user.email.slice(0, 2)}</a>
</div>
