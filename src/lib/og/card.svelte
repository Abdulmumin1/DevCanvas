<script>
	export let message = 'Blog - DevCanvas';
	// import logo from '$lib/logo.svg';
</script>

<div>
	<!-- <img src="https://devcanvas.art/logo.svg" alt="" /> -->
	<p>{message}</p>
	<footer>devcanvas.art</footer>
</div>

<style>
	div {
		font-family: 'visby';
		display: flex;
		flex-direction: column;
		font-size: 50px;
		background-color: rgb(240 249 255);
		height: 100%;
		width: 100%;
		color: rgb(14 165 233);
		align-items: center;
		justify-content: center;
	}

	p {
		height: 90%;
		width: 90%;
		border-radius: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 5rem;
	}

	footer {
		font-size: 30px;
		/* color:; */
		margin-bottom: 10px;
	}
</style>
