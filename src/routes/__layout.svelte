<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<!-- <Header /> -->

<main onunload="con();">
	<slot />
</main>

<!-- <footer>
	<p>Designed and developed by <a href="https://501a.netlify.app">501A</a></p>
</footer> -->

<style>
	main {
		padding: 0;
		margin: 0;
		display:flex;
		align-items: center;
		justify-content: center;
	}

	/* footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	} */
</style>
