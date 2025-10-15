<script>

	/**
	 * @typedef {Object} Props
	 * @property {number} [version]
	 * @property {boolean} [inProgress]
	 * @property {any} codeBlock
	 */

	/** @type {Props} */
	let { version = 1, inProgress = false, codeBlock } = $props();

	function handleClick() {
		const myEvent = new CustomEvent('codeSwap', {
			detail: { code: codeBlock, lang: 'html' }
		});

		window.dispatchEvent(myEvent);
	}
</script>

<span
	onclick={handleClick}
	class="inline-block w-full cursor-pointer rounded-xl border border-sky-200 bg-sky-50 bg-gradient-to-r from-sky-400 to-sky-300 px-2 py-4 transition-all duration-300 hover:rounded-2xl"
>
	Code Artifact {inProgress ? ' (in progress)' : ''}
	<div>
		{''}
	</div>
</span>
