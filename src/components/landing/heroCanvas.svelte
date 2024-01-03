<script>
	import TypeWriterEffect from './typeWriterEffect.svelte';
</script>

<div class="window relative bg-secondary-dark">
	<div class="window-title">
		<div class="pills">
			<div class="pill red" />
			<div class="pill blue" />
			<div class="pill green" />
		</div>
		<div class="search text-black bg-[#cecbcb] dark:bg-light">https://devcanvas.art</div>
		<div />
	</div>
	<div class="box">
		<div class="editor">
			<div class="pane html">
				<div class="pane-header bg-primary text-light text-sm">HTML</div>
				<div class="code-input" id="html-code" placeholder="Enter HTML code here...">
					<TypeWriterEffect />
				</div>
			</div>

			<div class="pane css">
				<div class="pane-header bg-primary text-light text-sm">SCSS</div>
				<div class="code-input" id="css-code" placeholder="Enter CSS code here...">
					<TypeWriterEffect
						text={`body{
							display:flex; }`}
						delay="2000"
					/>
				</div>
			</div>

			<div class="pane js">
				<div class="pane-header bg-primary text-light text-sm">JS (TypeScript)</div>
				<div class="code-input" id="js-code" placeholder="Enter JavaScript code here..." />
			</div>
		</div>

		<div class="preview bg-white dark:bg-light text-black"><h1>HELLO WORLD</h1></div>
	</div>
</div>

<style>
	* {
		box-sizing: content-box;
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
