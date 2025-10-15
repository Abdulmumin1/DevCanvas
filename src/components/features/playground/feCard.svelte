<script>
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
	import ShareAct from '$components/ui/shareAct.svelte';
	import DeleteCanvas from '$components/features/playground/deleteCanvas.svelte';

	let session = $page.data.session;
	export let details;
	let profile = details?.profiles?.username;
	let isHovered = false;
	let compRef;

	function handleDelete() {
		compRef.$destroy;
		// document.removeChild(compRef)
	}
</script>

<div
	bind:this={compRef}
	class="group flex aspect-video w-full flex-col rounded-xl transition-all duration-300"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	<div class="relative overflow-hidden rounded-xl">
		<!-- HD Image Container with proper aspect ratio -->
		<div class="relative w-full">
			<!-- Using a background div for smooth image loading -->
			<div class="absolute inset-0 bg-gray-200 dark:bg-gray-700"></div>

			<!-- Main image with lazy loading -->
			<img
				src="/images/{details.project_key}"
				loading="lazy"
				class=" aspect-video w-full transition-transform duration-500"
				class:scale-110={isHovered}
				alt={details.description || 'Project preview'}
			/>

			<!-- Fallback to iframe if image fails -->
			<iframe
				src="/output/compile/{details.project_key}?p=1"
				title="Project Preview"
				loading="lazy"
				class="absolute inset-0 h-full w-full"
				style="pointer-events: none; display: none;"
				onError="this.style.display='block'; this.previousElementSibling.style.display='none';"
			></iframe>
		</div>

		<!-- Overlay gradient for better text readability -->
		<div
			class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300"
			class:opacity-100={isHovered}
		></div>
	</div>

	<div class="flex flex-1 flex-col justify-between p-3">
		<!-- Title with truncation -->

		<!-- Author and stats section -->
		<div class="flex w-full items-center justify-between">
			<div>
				<a
					href="/play/{details.project_key}"
					class="line-clamp-2 text-xl font-semibold text-gray-800 hover:text-sky-600 dark:text-gray-100 dark:hover:text-sky-400"
				>
					{details.description}
				</a>
				{#if details.user_id === session?.user?.id}
					<div in:fade class="flex items-center gap-2">
						<div class="h-6 w-6 overflow-hidden rounded-full bg-sky-500 dark:bg-sky-400"></div>
						<a href="/{profile}" class="text-sm font-medium hover:underline">You</a>
					</div>
				{:else if profile}
					<div in:fade class="flex items-center gap-2">
						<div class="dark:bg-sly-400 h-6 w-6 overflow-hidden rounded-full bg-sky-500"></div>
						<a class="text-sm font-medium capitalize hover:underline" href={`/${profile}`}
							>{profile}</a
						>
					</div>
				{:else}
					<div in:fade class="flex items-center gap-2">
						<div class="h-6 w-6 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-600"></div>
						<div class="h-4 w-16 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
					</div>
				{/if}
			</div>

			<!-- Action buttons -->
			<div class="hidden items-center gap-3 group-hover:flex">
				<!-- <span class="flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">
			 <Fa icon={faEye} class="" />
			 <span>{details.view?.length > 0 ? details.view[0].views : '0'}</span>
		   </span> -->

				<ShareAct
					link="{$page.url.origin}/play/{details.project_key}"
					title={details.description}
				/>

				{#if details.user_id === session?.user?.id && $page.url.pathname === '/dashboard'}
					<DeleteCanvas
						on:deleted={handleDelete}
						canvas_id={details.project_key}
						title={details.description}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		will-change: transform;
	}

	.card:hover {
		transform: translateY(-8px);
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	/* Better dark mode support */
	@media (prefers-color-scheme: dark) {
		.card:hover {
			box-shadow:
				0 10px 25px -5px rgba(0, 0, 0, 0.3),
				0 10px 10px -5px rgba(0, 0, 0, 0.2);
		}
	}

	/* Smooth image loading animation */
	img {
		opacity: 0;
		animation: fadeIn 0.5s ease forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
