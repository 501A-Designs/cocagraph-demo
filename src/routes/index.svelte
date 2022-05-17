<script context="module">
	export const prerender = true;
</script>

<script>
	// import Counter from '$lib/Counter.svelte';
	import ImageContainer from '../lib/ImageContainer.svelte';
	import TextContainer from '../lib/TextContainer.svelte';
	import { onMount } from 'svelte';
	import { textArray,connectionArray,isDragging } from '../store';
	import ConnectionLine from '../lib/ConnectionLine.svelte';
	
	let locationX,locationY;

	const mouseLocation = (event) => {
		locationX = event.offsetX;
		locationY = event.offsetY;
	}
	const addTextObject = (obj) => {
		$textArray = [...$textArray, obj];
	}
	const createTextContainer = () => {
		let textContent = window.prompt(`add text box`, 'Text goes here');
        if(textContent !== null){
            addTextObject(
				{
					text:textContent,
					locationX:locationX,
					locationY:locationY,
				}
			);
        }
	}

	// const removeObject = (index,array) => {
	// 	array.splice(index,1);
	// 	console.log(array);
	// }

	// let imageUrlArray = [];
	// onMount(() => {
	// 	const addObject = (obj) => {
	// 		imageUrlArray = [...imageUrlArray, obj];
	// 	}
	// 	var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;
	// 	var loadImage = function (file) {
	// 		var reader = new FileReader();
	// 		reader.onload = function(e){
	// 			addObject(e.target.result)
	// 		};
	// 		reader.readAsDataURL(file);
	// 	};
	// 	document.onpaste = function(e){
	// 		var items = e.clipboardData.items;
	// 		for (var i = 0; i < items.length; i++) {
	// 			if (IMAGE_MIME_REGEX.test(items[i].type)) {
	// 				loadImage(items[i].getAsFile());
	// 				return;
	// 			}
	// 		}
	// 		e.PreventDefault()
	// 	}
	// })
</script>

<svelte:head>
	<title>Editor</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div style="position:fixed; padding: 1em; z-index: 20">
	<h1>
		cocagraph
	</h1>
	<p style='margin:0;padding:0;'>{`cursor location: ${locationX}px,${locationY}px`}</p>
</div>
<section
	id="editorCanvas"
	on:mousemove={(e) => mouseLocation(e)}
	on:dblclick={() => createTextContainer()}
>
	<!-- on:click={() => createTextContainer()} -->
	<!-- {#each $imageArray as image}
		<ImageContainer
			src={image.src}
			x={image.x}
			y={image.y}
			index={$imageArray.indexOf(imageUrl)}
		/>
	{/each} -->
	{#each $textArray as text}
		<TextContainer
			text={text.text}
			x={text.locationX}
			y={text.locationY}
			index={$textArray.indexOf(text)}
		/>
	{/each}
	{#if $textArray.length > 1 && !$isDragging}
		{#each $connectionArray as connection}
			<ConnectionLine
				firstElementIndex={connection.firstElementIndex}
				secondElementIndex={connection.secondElementIndex}
				color={'grey'}
				thickness={1}
				index={$connectionArray.indexOf(connection)}
			/>
		{/each}
	{/if}
</section>

<style>
	#editorCanvas {
		width: 3000px;
		height: 3000px;
		border-radius: 5px;
		margin: 0;
		padding: 0;
		cursor: copy;
		background: radial-gradient(rgb(162, 162, 162) 1px, transparent 1px);
   		background-size : 20px 20px;
		transition:0.5s;
		background-color: rgb(241, 241, 241);
	}
</style>
