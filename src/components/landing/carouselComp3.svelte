<div class="card">
	<h2 class="text-center">Glowing Border</h2>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.card {
		position: relative;
		width: 210px;
		height: 310px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
		border-radius: 20px;
		overflow: hidden;
	}

	.card h2 {
		color: rgb(226, 226, 226);
		font-size: 2rem;
		text-shadow: 2px 2px black;
		z-index: 3;
	}

	.card::before,
	.card.card::after {
		content: '';
		position: absolute;
	}

	.card::before {
		width: 170px;
		height: 140%;
		background: linear-gradient(#00ccff, #d500f9);
		animation: rotate 4s linear infinite;
		z-index: 2;
	}

	.card::after {
		inset: 4px;
		background-color: black;
		z-index: 2;
		border-radius: 20px;
	}

	@keyframes rotate {
		to {
			rotate: 360deg;
		}
	}
</style>
