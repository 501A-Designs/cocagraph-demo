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
	<title>Usage</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div style="padding:5% 10%;">
	<h1>JSON object?</h1>
	<p>
		cocagraph saves your data as JSON objects.
		<br/>
		<br/>
		you dont need to have any prior knowledge about JSON itsself, just know that it's a simple and easy way to store data. what you should know is how your data is structured, which we will go through in the next section!
	</p>
	<h2>data structure</h2>
	<p>
		cocagraph at its simplest level is just a collection of notes and connectors. a node contains 4 types of data. the content, the x location, y location, and connection (what other nodes it is connected to). and a connector (or connection line) contains 2, the starting node and ending node. below you can see what is in each cocagraph file.
	</p>
	<h2>updating your data</h2>
	<p>
		unfortunatly because the browser file API does not support content updates of files from the client side, we are not able to implement a content update feature on cocagraph. instead we require users to download the data onto their machine.
	</p>
</div>

<style>
</style>
