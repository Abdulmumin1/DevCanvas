<script>
	import CodeVersionBadge from './CodeVersionBadge.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} [content]
	 */

	/** @type {Props} */
	let { content = '' } = $props();

	function processedContent(content) {
		// If no content, return empty string
		if (!content) return { parts: [''], hasCodeBlock: false };

		// Check for code blocks
		const startTags = '<DEVCANVAS_START>';
		const endTags = '</DEVCANVAS_START>';

		if (!content.includes(startTags)) {
			return { parts: [content], hasCodeBlock: false };
		}

		// Get parts before, during, and after code block
		const startIndex = content.indexOf(startTags);
		const endIndex = content.indexOf(endTags, startIndex);

		const beforeBlock = content.substring(0, startIndex);
		const afterBlock = endIndex !== -1 ? content.substring(endIndex + endTags.length) : '';

		const codeBlock = content.substring(startIndex, endIndex !== -1 ? endIndex : content.length);
		const inProgress = endIndex === -1;

		let r = {
			parts: [beforeBlock, afterBlock],
			hasCodeBlock: true,
			inProgress,
			codeBlock
		};
		// console.log(r)
		return r;
	}

	let processed = $derived(processedContent(content));
	// $: console.log(processed)
</script>

{#if !processed.hasCodeBlock}
	{content}
{:else}
	{processed.parts[0]}
	<CodeVersionBadge inProgress={processed.inProgress} codeBlock={processed.codeBlock} />
	{processed.parts[1]}
{/if}
