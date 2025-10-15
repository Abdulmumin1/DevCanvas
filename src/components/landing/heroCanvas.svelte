<script>
	import { onMount } from 'svelte';
	import TypeWriterEffect from './typeWriterEffect.svelte';
	import { fly, scale, slide } from 'svelte/transition';

	let classOrange = $state();
	onMount(() => {
		classOrange = 'orange';
	});
</script>

<div class="window relative bg-secondary-dark">
	<div class="window-title">
		<div class="pills">
			<div class="pill red"></div>
			<div class="pill blue"></div>
			<div class="pill green"></div>
		</div>
		<div class="search bg-white text-black">https://devcanvas.dev</div>
		<div></div>
	</div>
	<div class="box">
		<div class="editor">
			<div class="pane html">
				<div class="pane-header bg-primary text-sm text-light">HTML</div>
				<div class="code-input" id="html-code" placeholder="Enter HTML code here...">
					<TypeWriterEffect />
				</div>
			</div>

			<div class="pane css">
				<div class="pane-header bg-primary text-sm text-light">SCSS</div>
				<div class="code-input" id="css-code" placeholder="Enter CSS code here...">
					<TypeWriterEffect text={`h1 { color: skyblue; }`} delay="2020" />
				</div>
			</div>

			<div class="pane js">
				<div class="pane-header bg-primary text-sm text-light">JS (TypeScript)</div>
				<div class="code-input" id="js-code" placeholder="Enter JavaScript code here..."></div>
			</div>
		</div>

		<div class="preview bg-white text-black">
			{#if classOrange}
				<h1 in:fly={{ x: 100, duration: 100, delay: 1300 }} class="text-xl font-bold {classOrange}">
					HELLO WORLD
				</h1>
			{/if}
		</div>
	</div>
</div>

<style>
	* {
		box-sizing: content-box;
	}

	.orange {
		/* opacity: 0; */
		animation: changeColor 100ms forwards 1.9s;
	}

	@keyframes changeColor {
		to {
			color: skyblue;
		}
	}
	.editor {
		display: flex;
		height: 500px;
		flex-direction: column;
		width: 40%;
	}

	.pane {
		flex: 1;
		overflow: hidden;
	}

	.pane-header {
		padding: 8px;
		/* font-weight: bold; */
	}

	.code-input {
		width: 100%;
		height: calc(100% - 30px);
		padding: 10px;
		font-size: 14px;
		box-sizing: border-box;
	}

	.preview {
		width: 60%;
		height: 500px;
		display: flex;
		padding: 20px;
	}

	.box {
		display: flex;
	}

	.window {
		width: 670px;
		border-radius: 10px;
	}
	.window-title {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		align-items: center;
	}

	.pills {
		display: flex;
		gap: 5px;
	}

	.pill {
		background-color: var(--pill, red);
		width: 20px;
		height: 20px;
		border-radius: 100%;
	}

	.red {
		--pill: #ef5350;
	}
	.blue {
		--pill: #ffca28;
	}

	.green {
		--pill: #66bb6a;
	}

	.search {
		/* background-color: #cecbcb; */
		width: 300px;
		text-align: center;
		padding: 4px;
		border-radius: 3px;
	}
</style>
