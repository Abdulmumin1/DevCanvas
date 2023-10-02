<script>
	import InnerNav from '$components/innerNav.svelte';
	import Footer from '../../components/footer.svelte';
</script>

<div>
	<InnerNav />
	<slot />
	<Footer />
</div>
