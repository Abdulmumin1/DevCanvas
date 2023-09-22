<script>
	import { onMount } from 'svelte';

	export let data;

	let supabase = data.supabase;
	let slug = data.details.project_key;

	function update_views() {
		let view = new Object(data.details.view).length > 0 ? parseInt(data.details.view[0].views) : 0;
		// console.log(data.details.description, 'view', view);
		// console.log(parseInt(data.details.view[0].views));
		setTimeout(async () => {
			const { data: dt, error: er } = await supabase
				.from('view')
				.update([{ views: view + 1 }])
				.eq('project_key', slug);
		}, 5000);
	}

	onMount(() => {
		// console.log(data.details);
		update_views();
	});
</script>

<slot />
