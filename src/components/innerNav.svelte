<script>
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
</script>

<div class="h-[12vh] p-4 md:p-6 w-full bg-inherit">
	<ul class="flex w-full justify-between items-center">
		<li class="text-xl px-3 p-1 bg-sky-100 rounded-3xl">SnippetsLand</li>
		<li>
			<ul class="flex gap-2">
				<li class="bg-sky-100 rounded-full p-3">
					<a href="https://github.com/Abdulmumin1/snippets" target="_blank">
						<Fa icon={faGithub} /></a
					>
				</li>
			</ul>
		</li>
	</ul>
</div>
