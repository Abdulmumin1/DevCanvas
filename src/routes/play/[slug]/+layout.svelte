<script>
	import { onMount } from 'svelte';

	export let data;

	let supabase = data.supabase;
	let slug = data.details.project_key;

	function update_views() {
		console.log('wiil be updating vies');
		console.log(parseInt(data.details.views));
		setTimeout(async () => {
			const { data: dt, error: er } = await supabase
				.from('view')
				.update([{ views: parseInt(data.details.views != undefined ? data.details.views : 0) + 1 }])
				.eq('project_key', slug);
		}, 5000);
	}

	onMount(() => {
		update_views();
	});
</script>

<slot />
