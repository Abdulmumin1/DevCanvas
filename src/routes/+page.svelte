<script>
	import Footer from '../components/footer.svelte';
	import InnerNav from '../components/innerNav.svelte';

	import Hero from '../components/landing/hero.svelte';
	import Discover from '../components/landing/discover.svelte';
	import LanguageSupport from '../components/landing/languageSupport.svelte';
	import CodeEditor from '../components/landing/codeEditor.svelte';
	import Faq from '../components/landing/faq.svelte';
	import EmbedSection from '../components/landing/embedSection.svelte';
	import Forcreators from '../components/landing/forcreators.svelte';
	import Forcreatives from '../components/landing/forcreatives.svelte';
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>SnippetsLand</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="Snippets" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="Snippets" />
</svelte:head>

<div class=" bg-skyblue-500 min-h-screen w-screen flex flex-col items-center justify-center">
	<div class="w-full">
		<InnerNav />
	</div>
	<div class="w-full mx-auto rounded-lg flex flex-col gap-4 justify-center items-center">
		<!-- Add your landing page content here -->
		<Hero />
		<div class="w-full">
			<!-- Add your features or benefits here -->

			<Forcreators />
			<Forcreatives />
			<Discover />
			<LanguageSupport />
			<EmbedSection />
			<!-- Add code editor section -->
			<CodeEditor />
			<!-- The Idea-->
			<!-- <Idea /> -->
			<!-- The Idea-->
			<Faq />
		</div>
	</div>
	<Footer />
</div>
