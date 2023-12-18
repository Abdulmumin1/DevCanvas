<div class="min-h-screen">
	<div
		class="w-full h-full bg-gray-50 dark:bg-secondary-dark p-4 flex flex-col md:flex-row gap-3 items-center justify-center"
	>
		<h1 class="text-3xl md:text-4xl">For <span class="bg-sky-500 text-black">CREATORS</span></h1>
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
		/>

		<div class="dark:text-black">
			<div class="post-container floating-object2">
				<div class="user-info">
					<img
						src="https://cdn.pixabay.com/photo/2016/04/01/12/11/avatar-1300582_1280.png"
						alt=""
						class="profile-picture"
					/>
					<div>
						<span class="name">Emily Darwin</span>
						<span class="timestamp">. 9h</span><br />
						<span class="username">@thebaadcoder</span>
					</div>
				</div>
				<p class="tweet-content">
					Calculate the factorial of a number using iterative method -Python 👇🏾<br />
					<a href="">https://snippetland.io/emily/NyUx5P</a>
				</p>
				<div class="post-image">
					<img
						src="https://pbs.twimg.com/media/F65hR_4WwAEPx2j?format=jpg&name=medium"
						width="100%"
						alt=""
					/>
				</div>
				<div class="action-buttons">
					<div class="action-button">
						<span class="material-symbols-outlined icon"> share </span>
						<span>53 4</span>
					</div>
					<div class="action-button">
						<i class="material-symbols-outlined icon"> circle </i>
						<span>104</span>
					</div>
					<div class="action-button">
						<i class="material-symbols-outlined icon"> favorite </i>
						4,003
					</div>
				</div>
			</div>
		</div>

		<div class="dark:text-black">
			<div class="post-container floating-object">
				<div class="user-info">
					<img
						src="https://yaqeen.me/_app/immutable/assets/abdul.66936237.jpg"
						alt=""
						class="profile-picture"
					/>
					<div>
						<span class="name">Abdulmumin Yaqeen</span>
						<span class="timestamp">. 2h</span><br />
						<span class="username">@abdulmuminyqn</span>
					</div>
				</div>
				<p class="tweet-content">
					Super cool Google Pixel Art with Just HMTL and css 👇🏾<br />
					<a href="">https://snippetland.io/play/zuyrPz</a>
				</p>
				<div class="post-image">
					<img
						src="https://pbs.twimg.com/media/F6lEU2yXMAASyiD?format=png&name=medium"
						width="100%"
						alt=""
					/>
				</div>
				<div class="action-buttons">
					<div class="action-button">
						<span class="material-symbols-outlined icon"> share </span>
						<span>54</span>
					</div>
					<div class="action-button">
						<i class="material-symbols-outlined icon"> circle </i>
						<span>254</span>
					</div>
					<div class="action-button">
						<i class="material-symbols-outlined icon"> favorite </i>
						3.4k
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Basic styling for the post container */
	.post-container {
		border: 1px solid #ccc;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		max-width: 400px;
		background-color: white;
	}

	/* Styling for the user profile picture */
	.profile-picture {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 10px;
	}

	/* Styling for the username and timestamp */
	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.name {
		font-weight: bold;
	}

	.username {
		color: #777;
		font-size: 14px;
	}

	.timestamp {
		color: #777;
	}

	/* Styling for the tweet content */
	.tweet-content {
		font-size: 16px;
		line-height: 1.4;
	}

	/* Styling for action buttons (like, retweet, reply) */
	.action-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.action-button {
		display: flex;
		align-items: center;
		color: #777;
		gap: 3px;
		cursor: pointer;
	}

	.action-button:hover {
		color: #1da1f2;
	}

	.floating-object {
		position: relative;
		/* animation: float 3s ease-in-out infinite; */
	}

	.floating-object2 {
		position: relative;
		/* animation: float 3s ease-in-out infinite 1s; */
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
	}
</style>
