<script>
	import InnerNav from '$components/innerNav.svelte';
	import Footer from '../../components/footer.svelte';
</script>

<div>
	<!-- <div class="relative">
		<InnerNav />
	</div> -->
	<slot />
	<Footer />
</div>
