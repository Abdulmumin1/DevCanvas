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
	<title>DevCanvas</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="Snippets" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="Snippets" />

	<meta name="robots" content="index, follow" />
</svelte:head>

<div
	class="before:he bg-skyblue-500 min-h-screen w-screen flex flex-col items-center justify-center"
>
	<div class="w-full">
		<InnerNav />
	</div>
	<div
		class="w-full max-w-[1500px] mx-auto rounded-lg flex flex-col gap-4 justify-center items-center relative"
	>
		<!-- Add your landing page content here -->
		<div class="h-[500px] md:h-[100dvh] grid">
			<header class="w-full overflow-hidden">
				<div
					class="hidden md:flex w-[500px] md:w-full h-[500px] md:h-[100dvh] bg-sky-300 opacity-80 blur-lg overflow-hidden absolute top-0 inset-x-0 mx-auto rounded-full md:rounded-none md:rounded-t-full"
				/>
				<div class="mt-20">
					<Hero />
				</div>
			</header>
		</div>
		<main class="w-full">
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
		</main>
	</div>
</div>
<Footer />
