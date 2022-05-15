<script context="module">
	export const prerender = true;
</script>

<script>
	// import Counter from '$lib/Counter.svelte';
	import ImageContainer from '../lib/ImageContainer.svelte';
	import TextContainer from '../lib/TextContainer.svelte';
	import { onMount } from 'svelte';

	let imageUrlArray = [];
	
	let textArray = [];
	const addTextObject = (obj) => {
		textArray = [...textArray, obj];
	}
	const createTextContainer = () =>{
		let textContent = window.prompt("Add text", 'Text goes here');
        if(textContent !== null){
            addTextObject(textContent);
        }
	}

	const removeObject = (index) => {
		imageUrlArray.splice(index,1)
		imageUrlArray = imageUrlArray;
	}
	onMount(() => {
		const addObject = (obj) => {
			imageUrlArray = [...imageUrlArray, obj];
		}
		var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;
		var loadImage = function (file) {
			var reader = new FileReader();
			reader.onload = function(e){
				addObject(e.target.result)
			};
			reader.readAsDataURL(file);
		};
		document.onpaste = function(e){
			var items = e.clipboardData.items;
			for (var i = 0; i < items.length; i++) {
				if (IMAGE_MIME_REGEX.test(items[i].type)) {
					loadImage(items[i].getAsFile());
					return;
				}
			}
			e.PreventDefault()
		}
	})
</script>

<svelte:head>
	<title>Editor</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div style="text-align: center;">
		<h1 contenteditable="true">
			starterpack maker
		</h1>
		<h2 contenteditable="true">
			double click to add text. paste images directly on screen (this text is editable as well)
		</h2>
	</div>


	<div class="editorCanvas" on:dblclick={() =>{ createTextContainer()}}>
		{#each imageUrlArray as imageUrl}
			<!-- <SomeComponent object={obj} /> -->
			<ImageContainer
				src={imageUrl}
				imageIndex={imageUrlArray.indexOf(imageUrl)}
				deleteImage={() => removeObject(imageUrlArray.indexOf(imageUrl))}
			/>
		{/each}
		{#each textArray as text}
			<TextContainer
				text={text}
			/>
		{/each}
		<div style="display:grid; gap:5px; grid-template-columns:1fr 1fr 1fr; margin:1em">
		</div>
	</div>

	<!-- <Counter /> -->
</section>

<style>
	.editorCanvas {
		min-height: 500px;
		width: 100%;
	}
	.editorCanvas:hover{
		border: 1px solid grey;
	}
</style>
