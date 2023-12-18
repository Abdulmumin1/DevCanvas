<div class="pricing-container">
	<div class="name">Unlimited</div>
	<div class="price">$8.99 <span class="recuring">/per month</span></div>
	<div class="deal">
		<div><span class="save">Save <strong>$18 </strong></span> with annual billing</div>
		<label>
			<input id="check" type="checkbox" />
			<div class="check-deal" />
		</label>
	</div>

	<div class="package">
		<div>
			<img src="https://api.iconify.design/material-symbols:check-circle.svg" alt="" /> Unlimited users
		</div>
		<div>
			<img src="https://api.iconify.design/material-symbols:check-circle.svg" alt="" /> Articles
		</div>
		<div>
			<img src="https://api.iconify.design/material-symbols:check-circle.svg" alt="" />
			<span class="soon">embeds (coming soon)</span>
		</div>
		<div>
			<img src="https://api.iconify.design/material-symbols:check-circle.svg" alt="" />
			<span class="soon">Podcast (coming soon)</span>
		</div>
	</div>

	<a href="/signin" class="sign-up"> Sign Up</a>
</div>

<style>
	/* @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap'); */
	* {
		font-size: 10px;
		color: #333;
	}
	.pricing-container {
		height: 300px;
		width: 200px;
		border: 2px solid #333;
		border-radius: 10px;
		box-shadow: 5px 5px 0px 1px rgb(33, 33, 33);
		font-family: 'Rubik';
		padding: 21px 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.name {
		font-weight: 700;
		font-size: 12px;
	}

	.price {
		font-size: 20px;
		font-weight: 800;
		display: flex;
		align-items: baseline;
	}

	.recuring {
		font-size: 8px;
	}

	.deal {
		font-size: 8px !important;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.save {
		color: rgb(18, 199, 18);
	}

	.check-deal {
		height: 20px;
		width: 30px;
		border-radius: 4px;
		box-shadow: 2px 2px 0px 0.2px rgb(33, 33, 33);
		position: relative;
		background-color: #cacaca;
		cursor: pointer;
	}

	#check {
		display: none;
	}

	.check-deal::before {
		content: '';
		height: calc(100% - 7px);
		width: 10px;
		background-color: white;
		position: absolute;
		top: 50%;
		left: 6px;
		border-radius: 3px;
		transform: translate(-50%, -50%);
		box-shadow: 2px 2px 5px 0.1px rgb(124, 123, 123);
		bottom: 0;
		transition: transform 0.3s ease-in-out;
	}
	.package > div {
		display: flex;
		gap: 2px;
		/* align-content: start; */
	}

	#check:checked + .check-deal {
		background-color: orange;
	}

	#check:checked + .check-deal::before {
		transform: translate(100%, -50%);
	}

	.package {
		margin-top: 0px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-weight: 500;
	}

	.soon {
		color: #999;
	}

	.sign-up {
		margin-top: 5px;
		width: fit-content;
		padding: 3px;
		background-color: white;
		border: 1px solid #333;
		border-radius: 3px;
		box-shadow: 3px 2px 0 1px orange;
	}
</style>
