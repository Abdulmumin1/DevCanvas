<script>
	import Fa from 'svelte-fa';
	import { faGithub, faWpexplorer } from '@fortawesome/free-brands-svg-icons';
	import logo from '$lib/logo.png';
	import Darkmode from './darkmode.svelte';
</script>

<div class="h-[12vh] p-3 md:p-6 w-full bg-inherit">
	<ul class="flex w-full justify-between items-center">
		<li
			class="text-base md:text-lg py-2 px-3 gap-3 text-light bg-secondary-dark flex items-center justify-center rounded-3xl"
		>
			<img src={logo} class="h-6 w-6" alt="snippetsLand" />
			<a href="/"> SnippetLand </a>
		</li>
		<li>
			<ul class="flex gap-2 items-center">
				<li class="bg-secondary-dark text-light rounded-full py-2 px-3">
					<a class="flex gap-2 items-center justify-center" href="/explore">
						Explore <Fa icon={faWpexplorer} class="" /></a
					>
				</li>
				<li class="bg-secondary-dark text-light rounded-full">
					<div class="flex gap-2 items-center justify-center"><Darkmode /></div>
				</li>
				<li class="bg-secondary-dark text-light rounded-full p-3">
					<a
						class="flex gap-2 items-center justify-center"
						href="https://github.com/Abdulmumin1/snippets"
						target="_blank"
					>
						<Fa icon={faGithub} class="" /></a
					>
				</li>
			</ul>
		</li>
	</ul>
</div>
