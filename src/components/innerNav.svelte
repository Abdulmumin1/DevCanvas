<script>
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import logo from '$lib/logo.png';
</script>

<div class="h-[12vh] p-4 md:p-6 w-full bg-inherit">
	<ul class="flex w-full justify-between items-center">
		<li
			class="text-xl px-3 py-2 gap-3 text-light bg-secondary-dark flex items-center justify-center rounded-3xl"
		>
			<img src={logo} class="h-6 w-6" alt="snippetsLand" />
			SnippetLand
		</li>
		<li>
			<ul class="flex gap-2">
				<li class="bg-secondary-dark text-light rounded-full p-3">
					<a href="https://github.com/Abdulmumin1/snippets" target="_blank">
						<Fa icon={faGithub} class="" /></a
					>
				</li>
			</ul>
		</li>
	</ul>
</div>
