<script>
	import { onMount } from 'svelte';

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
		}, 5000);
	}

	onMount(() => {
		// console.log(data.details);
		update_views();
	});
</script>

<svelte:head>
	<meta
		property="og:image"
		content="https://og.tailgraph.com/og?fontFamily=Roboto&title={title}&titleTailwind=text-gray-800%20font-bold%20text-6xl&text=&textTailwind=text-gray-700%20text-2xl%20mt-4&logoUrl=https%3A%2F%2Fsnippet-bice.vercel.app%2Flogo.svg&logoTailwind=opacity-75%20h-40%20items-center%20justify-center%20w-full&bgTailwind=bg-white&footer=devcanvas.art&footerTailwind=text-teal-600&t=1704208668613&refresh=1"
	/>
	<meta
		property="twitter:image"
		content="https://og.tailgraph.com/og?fontFamily=Roboto&title={title}&titleTailwind=text-gray-800%20font-bold%20text-6xl&text=&textTailwind=text-gray-700%20text-2xl%20mt-4&logoUrl=https%3A%2F%2Fsnippet-bice.vercel.app%2Flogo.svg&logoTailwind=opacity-75%20h-40%20items-center%20justify-center%20w-full&bgTailwind=bg-white&footer=devcanvas.art&footerTailwind=text-teal-600&t=1704208668613&refresh=1"
	/>
</svelte:head>
<slot />
