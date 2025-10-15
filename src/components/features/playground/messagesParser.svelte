<script>
	import MessageProcessor from './MessageProcessor.svelte';

	let { messages = [] } = $props();
	let versionCount = 0;

	// Process content to replace code blocks with version indicators
	function processContent(content) {
		// If no content, return empty string
		if (!content) return '';

		// Count how many code versions are in the content
		const startTags = '<!DOCTYPE html>';
		const endTags = '</html>';
		let processedContent = content;

		// Replace each code block with a version indicator
		while (processedContent.includes(startTags)) {
			versionCount++;
			const startIndex = processedContent.indexOf(startTags);
			const endIndex = processedContent.indexOf(endTags, startIndex);

			if (endIndex !== -1) {
				// Replace the code block with a version indicator
				let beforeBlock = processedContent.substring(0, startIndex);
				let afterBlock = processedContent.substring(endIndex + endTags.length);
				return (
					beforeBlock +
					`<span class="inline-block bg-sky-50 text-sky-700 px-2 py-0.5 rounded text-xs font-medium border border-sky-200 my-1">Code Version ${versionCount}</span>` +
					afterBlock
				);
			} else {
				// If no end tag, replace from start tag to the end
				let beforeBlock = processedContent.substring(0, startIndex);
				return (
					beforeBlock +
					`<span class="inline-block bg-sky-50 text-sky-700 px-2 py-0.5 rounded text-xs font-medium border border-sky-200 my-1">Code Version ${versionCount} (in progress)</span>`
				);
			}
		}

		return processedContent;
	}

	function hasCodeBlock(content) {
		if (!content) return false;
		return content.includes(
			'<span class="inline-block w-full bg-gradient-to-r from-sky-400 to-sky-300 text-sky-700 px-2 py-0.5 rounded text-xs font-medium border border-sky-200 my-1">'
		);
	}
</script>

<div class="flex max-h-full w-full flex-col gap-3 overflow-y-auto overflow-x-hidden p-2">
	{#each messages as message (message.messageId)}
		{#if !['DEVCANVAS_INITIAL_MESSAGE', 'DEVCANVAS_INITIAL_CODE'].includes(message.messageId)}
			<div
				class="max-w-full rounded-lg p-2 text-white {message.role === 'user'
					? 'ml-5 bg-neutral-700'
					: 'mr-5 bg-stone-800'}"
			>
				<div class="mb-1 flex items-center">
					<div
						class="mr-1.5 size-3 rounded-full {message.role === 'user'
							? 'bg-neutral-400'
							: 'bg-stone-100'}"
					></div>
					<div class="text-xs font-medium">{message.role === 'user' ? 'You' : 'AI Assistant'}</div>
				</div>
				{#key message.content}
					<div class="whitespace-pre-wrap text-sm leading-normal">
						<MessageProcessor content={message.content} />
					</div>
				{/key}
			</div>
		{/if}
	{/each}
</div>
