<script>
	import Footer from '../components/footer.svelte';
	import InnerNav from '../components/innerNav.svelte';
	import { faAngleDown, faRightLong, faStar } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import SectionCard from '../components/landing/sectionCard.svelte';
	import Accodion from '../components/landing/accodion.svelte';
	import { fade } from 'svelte/transition';
	import Hero from '../components/landing/hero.svelte';
	import Explore from '../components/landing/explore.svelte';
	import Discover from '../components/landing/discover.svelte';
	import LanguageSupport from '../components/landing/languageSupport.svelte';
	import CodeEditor from '../components/landing/codeEditor.svelte';
	import Idea from '../components/landing/idea.svelte';
	import Faq from '../components/landing/faq.svelte';
	import EmbedSection from '../components/landing/embedSection.svelte';
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>SnippetsLand</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="Snippets" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="Snippets" />
</svelte:head>

<main class="bg-skyblue-500 min-h-screen flex flex-col items-center justify-center">
	<div class="w-full">
		<InnerNav />
	</div>
	<div class="w-full mx-auto rounded-lg flex flex-col gap-4 justify-center items-center">
		<!-- Add your landing page content here -->
		<Hero />
		<div class="w-full">
			<!-- Add your features or benefits here -->

			<Explore />
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
</main>
