<script>
	import { user } from '$lib/index.js';
</script>

<div class="rounded-full bg-gray-300 p-2 dark:bg-primary dark:text-white text-primary">
	<a class=" uppercase" href="/profile">{$user.email.slice(0, 2)}</a>
</div>
