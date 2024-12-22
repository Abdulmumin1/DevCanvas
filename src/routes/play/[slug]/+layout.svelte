<script>
	import { onMount } from 'svelte';
	import SEO from '$components/seoComp.svelte'
	import {page} from '$app/stores'
	export let data;

	let supabase = data.supabase;
	let slug = data.details.project_key;
	let title = encodeURIComponent(data.details.description);

	function update_views() {
		let view = new Object(data.details.view).length > 0 ? parseInt(data.details.view[0].views) : 0;
		// console.log(data.details.description, 'view', view);
		// console.log(parseInt(data.details.view[0].views));
		setTimeout(async () => {
			const { data: dt, error: er } = await supabase
				.from('view')
				.update([{ views: view + 1 }])
				.eq('project_key', slug);
		}, 100);
	}

	onMount(() => {
		// console.log(data.details);
		update_views();
	});
</script>

<svelte:head>
	
	
<SEO title={data.details.description} description={`View project - ${data.details.description}`} imageUrl={`https://devcanvas.art/output/image/${$page.params.slug}?width=1200&height=630`} index={ data.details?.public == true}/>

</svelte:head>
<slot />
