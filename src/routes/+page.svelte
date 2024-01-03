<script>
	import Footer from '$components/footer.svelte';
	import InnerNav from '$components/innerNav.svelte';

	import Hero from '$components/landing/hero.svelte';
	import Discover from '$components/landing/discover.svelte';
	import LanguageSupport from '$components/landing/languageSupport.svelte';
	import CodeEditor from '$components/landing/codeEditor.svelte';
	import Faq from '$components/landing/faq.svelte';
	import EmbedSection from '$components/landing/embedSection.svelte';
	import Forcreators from '$components/landing/forcreators.svelte';
	import Forcreatives from '$components/landing/forcreatives.svelte';
	import Explore from '$components/landing/explore.svelte';
	import Features from '$components/landing/features.svelte';
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>DevCanvas</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="Snippets" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="Snippets" />

	<meta name="robots" content="index, follow" />
</svelte:head>

<div
	class="before:he bg-skyblue-500 min-h-screen w-screen flex flex-col items-center justify-center relative"
>
	<div class="w-full relative z-10">
		<InnerNav />
	</div>
	<div class="w-full mx-auto rounded-lg flex flex-col gap-4 justify-center items-center">
		<!-- Add your landing page content here -->
		<div class="h-[500px] grid">
			<header class="w-full overflow-hidden">
				<!-- <div
					id="kds"
					class=" w-screen right-0 h-[612px] bg-sky-300 top-0 overflow-hidden absolute"
				/> -->
				<div class="mt-20">
					<Hero />
				</div>
			</header>
		</div>
		<main class="w-full">
			<!-- Add your features or benefits here -->
			<!-- <Explore /> -->
			<Features />
			<div>
				<div class="">
					<Forcreators />
				</div>
				<div class=" bg-white dark:bg-primary">
					<Forcreatives />
				</div>
			</div>
			<Discover />
			<LanguageSupport />
			<EmbedSection />
			<!-- Add code editor section -->
			<CodeEditor />
			<!-- The Idea-->
			<!-- <Idea /> -->
			<!-- The Idea-->
			<Faq />
		</main>
	</div>
</div>
<Footer />
