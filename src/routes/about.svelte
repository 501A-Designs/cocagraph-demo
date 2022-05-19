<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div style="padding:5% 10%;">
	<h1>about</h1>
	<p>
		welcome to cocagraph.
		<br/>
		<br/>
		you can call it a lot of things. a note book, idea pad, sketch pad, brainstorming chart, relational chart, anything you wish it to be!
	</p>
	<h2>underlying technology</h2>
	<p>
		cocagraph is built using svelte kit, with no backend. anybody can open the app and instantly use it. users can save their graph data as JSON objects and open them back in cocagraph for further editing and spinoffs. to see how cocagraph works under the hood, you can check out its <a href="https://github.com/501A-Designs/cocagraph" target="_blank">GitHub repository</a> which is open for anybody to see.
	</p>
	<h2>getting started</h2>
	<p>
		The <a href="/">editor</a> page is where you can get started in no time! no login is required
	</p>
</div>

<style>
</style>
