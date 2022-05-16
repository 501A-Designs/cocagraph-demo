<script context="module">
	export const prerender = true;
</script>

<script>
	// import Counter from '$lib/Counter.svelte';
	import ImageContainer from '../lib/ImageContainer.svelte';
	import TextContainer from '../lib/TextContainer.svelte';
	import { onMount } from 'svelte';

	let locationX,locationY;

	const mouseLocation = (event) => {
		const target = event.target;
		const rect = target.getBoundingClientRect();
		locationX = event.clientX - rect.left;
		locationY = event.clientY - rect.top;
	}

	let imageUrlArray = [];
	let textArray = [];

	const addTextObject = (obj) => {
		textArray = [...textArray, obj];
	}

	const createTextContainer = () =>{
		let textContent = window.prompt('add text', 'Text goes here');
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
	
	const refreshArray = () => {
		imageUrlArray = imageUrlArray;
		textArray = textArray;
	}
	const removeObject = (index,array) => {
		array.splice(index,1)
		refreshArray();
	}

	const updateTextContainerLocation = (index,x,y) => {
		textArray = textArray.map(obj => {
			if (textArray.indexOf(obj) === index) {
				return {
					...obj,
					locationX:x,
					locationY:y,
				};
			}
			return obj;
		});
		console.log(textArray);
	};

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
	<div style="text-align: left;">
		<h1>
			cacograph
		</h1>
		<h2>
			those notes that you find between your desk and the wall.
		</h2>
		<p>cursor location: {`${locationX}, ${locationY}`}</p>
	</div>


	<div
		id="editorCanvas"
		on:mousemove={(e)=>mouseLocation(e)}
		on:dblclick={() =>{ createTextContainer()}}
	>
		<!-- on:mousemove={(e)=>mouseLocation(e)} -->
		{#each imageUrlArray as imageUrl}
			<!-- <SomeComponent object={obj} /> -->
			<ImageContainer
				imageUrl={imageUrl}
				deleteImage={() => removeObject(imageUrlArray.indexOf(imageUrl), imageUrlArray)}
			/>
		{/each}
		{#each textArray as text}
			<TextContainer
				text={text.text}
				x={text.locationX}
				y={text.locationY}
				removeObject={()=> removeObject(textArray.indexOf(text), textArray)}
				updateTextContainerLocation={()=>updateTextContainerLocation(textArray.indexOf(text))}
			/>
		{/each}
				<!-- deleteText={() => removeObject(textArray.indexOf(text), textArray)} -->
		<div style="display:grid; gap:5px; grid-template-columns:1fr 1fr 1fr; margin:1em">
		</div>
	</div>

	<!-- <Counter /> -->
</section>

<style>
	#editorCanvas {
		height: 600px;
		width: 100%;
		border-radius: 5px;
		border: 1px solid transparent;
	}
	#editorCanvas:hover{
		border: 1px solid grey;
	}
</style>
