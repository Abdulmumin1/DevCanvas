<script>
	import { onMount } from 'svelte';

	// Get the target element
	var element = $state();

	// Function to simulate hover effect
	function simulateHover() {
		// Dispatch mouseenter event
		var event = new Event('mouseenter');
		element.dispatchEvent(event);

		// Update styles or add a class to simulate the hover effect
		element.classList.add('hovered');
	}

	// Function to simulate mouseout
	function simulateMouseOut() {
		// Dispatch mouseout event
		var event = new Event('mouseout');
		element.dispatchEvent(event);

		// Remove the added class to revert the styles
		element.classList.remove('hovered');
	}

	// Simulate hover on page load (you can call this function when needed)

	// Simulate mouseout after a delay (for demonstration purposes)
	onMount(() => {
		// console.log('moutent');
		simulateHover();
		setTimeout(simulateMouseOut, 2000);
	});
</script>

<ul>
	<li>
		<a href="#" bind:this={element} data-text="&nbsp;Home&nbsp;" class="orange">&nbsp;Home&nbsp;</a>
	</li>
	<li><a href="#" data-text="&nbsp;Contact&nbsp;" class="sky">&nbsp;Contact&nbsp;</a></li>
	*Hover
</ul>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.orange {
		--clr: orange;
	}

	.sky {
		--clr: skyblue;
	}

	.red {
		--clr: red;
	}

	.white {
		--clr: white;
	}

	.blue {
		--clr: blue;
	}

	body {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background-color: #191919;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	ul li {
		position: relative;
	}

	ul li a {
		font-size: 4em;
		text-decoration: none;
		line-height: 1em;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
		font-weight: 900;
		text-transform: uppercase;
		color: transparent;
		-webkit-text-stroke: 1px var(--clr);
		width: fit-content;
	}

	ul li a::before {
		content: attr(data-text);
		position: absolute;
		color: var(--clr);
		width: 0px;
		overflow: hidden;
		transition: 0.75s ease-in-out;
		border-right: 8px solid var(--clr);
	}

	ul li a:hover::before {
		width: 100%;
		/* -webkit-text-stroke: 1px var(--clr); */
		filter: drop-shadow(0 0 20px var(--clr));
	}
</style>
