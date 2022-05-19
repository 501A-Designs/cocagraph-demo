<script>
</script>

<header>
	<nav>
		<a sveltekit:prefetch href="/">Editor</a>
		<a sveltekit:prefetch href="/about">About</a>
		<a sveltekit:prefetch href="/todos">GitHub</a>
	</nav>
</header>

<style>
	header {
		position: absolute;
		top: 0;
		display: flex;
		justify-content: center;
		width: 100%;
		padding:1em;
		background-color:rgb(228, 228, 228);
		border-bottom: 1px solid rgb(212, 212, 212);
	}
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	a{
		margin-right:1em;
	}
</style>
