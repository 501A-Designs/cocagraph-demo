<script>

</script>

<header>
	<h2 style="margin:0;padding:0;">cocagraph</h2>
	<!-- <nav style="gap:0.5em;">
		<button>file</button>
		<button>theme</button>
		<button>account</button>
	</nav> -->
	<nav style="gap:1em;">
		<a sveltekit:prefetch href="/">Editor</a>
		<a sveltekit:prefetch href="/about">About</a>
		<a sveltekit:prefetch href="/todos">GitHub</a>
	</nav>
</header>

<style>
	header {
		position: sticky;
		z-index: 100;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* width: 100%; */
		padding:1em 1.5em;
		background-color:rgb(228, 228, 228);
		border-bottom: 1px solid rgb(212, 212, 212);
		margin-bottom: 0;
	}
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
