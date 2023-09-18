<script>
	import { user } from '$lib/index.js';
</script>

<div
	class="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center dark:bg-secondary-dark dark:text-white text-primary"
>
	<a class=" uppercase" href="/profile">{$user.email.slice(0, 2)}</a>
</div>
