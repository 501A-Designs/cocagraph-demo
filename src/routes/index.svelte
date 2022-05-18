<script context="module">
	export const prerender = true;
</script>

<script>
	// import Counter from '$lib/Counter.svelte';
	import ImageContainer from '../lib/ImageContainer.svelte';
	import TextContainer from '../lib/TextContainer.svelte';
	import Footer from '../lib/Footer.svelte';

	import { onMount } from 'svelte';
	import { textArray,connectionArray,isDragging } from '../store';
	import ConnectionLine from '../lib/ConnectionLine.svelte';

	import Edit from "carbon-icons-svelte/lib/Edit.svelte";
	import EditOff from "carbon-icons-svelte/lib/EditOff.svelte";

	
	let locationX,locationY;
	let editMode = false;

	const mouseLocation = (event) => {
		locationX = event.offsetX;
		locationY = event.offsetY;
	}
	const addTextObject = (obj) => {
		$textArray = [...$textArray, obj];
	}
	const createTextContainer = () => {
		if (editMode == true) {		
			let textContent = window.prompt(`add text box`, 'Text goes here');
			if(textContent !== null){
				addTextObject(
					{
						text:textContent,
						locationX:locationX,
						locationY:locationY,
						connections:[]
					}
				);
			}
		}else{
			alert('enable edit mode!');
		}
	}

	// const removeObject = (index,array) => {
	// 	array.splice(index,1);
	// 	console.log(array);
	// }

	onMount(() => {
		var loadImage = function (file) {
			var reader = new FileReader();
			reader.onload = function(e){
				// addTextObject(
				// 	{
				// 		text:e.target.result,
				// 		locationX:locationX,
				// 		locationY:locationX,
				// 		connections:[]
				// 	}
				// )
				// console.log(e.target.result);
				console.log(file);
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
			e.preventDefault()
		}
	})

	function getDarkColor() {
		var color = '#';
		for (var i = 0; i < 3; i++) {
			color += Math.floor(Math.random() * 10);
		}
		return color;
	}

	let scaleValue = 10;
	if(scaleValue < 10){
		editMode = false;
	}
</script>

<svelte:head>
	<title>Editor</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<section
	id="editorCanvas"
	style={`transform:scale(${scaleValue/10})`}
	on:mousemove={(e) => mouseLocation(e)}
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
			connections={text.connections}
		/>
	{/each}
	{#if $textArray.length > 1 && !$isDragging}
		{#each $connectionArray as connection}
			<ConnectionLine
				firstElementIndex={connection.firstElementIndex}
				secondElementIndex={connection.secondElementIndex}
				color={'#a2a2a2'}
				thickness={1}
				index={$connectionArray.indexOf(connection)}
			/>
		{/each}
	{/if}
</section>
{#if scaleValue === 10}
	{#if editMode}
		<div
			class="pointerButton"
			style={`
				position:absolute;
				z-index:10;
				left:${locationX-70}px;
				top:${locationY-70}px;
			`}
			on:click={() => createTextContainer()}
		/>
	{/if}
{/if}
<Footer>
	<h1 style="margin-left:5%">cocagraph</h1>
	<!-- <div>
		<p style="margin:0;padding:0;">double click to create node</p>
	</div> -->
	<div style={'margin:0;padding:0;display:flex;gap:5px;'}>
		{#if scaleValue === 10}
			{#if editMode}
				<button
					class="largeButton"
					style={`background-color:var(--cocaOrange);color: white;`}
					on:click={() => editMode = false}
					title="Turn off edit mode"
				>
					<Edit size={20}/>
				</button>
				{:else}
				<button
					class="largeButton"
					style={`background-color:rgb(214, 214, 214);color: black;`}
					on:click={() => editMode = true}
					title="Enable edit mode"
				>
					<EditOff size={20}/>
				</button>
			{/if}
		{/if}

		{#if $textArray.length > 0}
		<div class="buttonContainer">
			<button>Save to cache</button>
			<button>Convert to JSON</button>
		</div>
		{/if}
	</div>

	<input style="margin-right:5%" type="range" name="scale" bind:value={scaleValue} min="6" max="10">
</Footer>

<style>
	.pointerButton{
		z-index: 20;
		background: radial-gradient(circle at center, #ffd9a4c1 0, transparent 60%);
		width:150px;
		height:150px;
		border-radius:50px;
		cursor: pointer;
		transition:0.3s;
	}
	.pointerButton:hover{
		background: radial-gradient(circle at center, #ffc370c1 0, transparent 60%);
	}
	#editorCanvas {
		width: 3000px;
		height: 3000px;
		margin: 0;
		padding: 0;
		border-radius: 15px;
		background: radial-gradient(rgb(162, 162, 162) 1px, transparent 1px);
   		background-size : 20px 20px;
		box-shadow:0px 0px 35px rgb(214, 214, 214);
		border: 1px solid rgb(192, 192, 192);
		transition:0.5s;
		background-color: rgb(233, 231, 225);
	}

	.largeButton{
		border-radius:15px;
		border:1px solid rgb(234, 234, 234);
		width: 50px;
		height: 50px;
		transition:0.5s;
	}
	.largeButton:hover{
		transform: translateY(-5px);
		/* box-shadow: 0px 0px 30px #ffc87b; */
		/* border-radius: 50px; */
	}

	.buttonContainer {
		display: flex;
		gap:8px;
		border-radius:15px;
		border:1px solid rgb(202, 202, 202);
		padding:8px;
		background-color:rgb(235, 235, 235);
		box-shadow:0px 0px 25px rgb(214, 214, 214);
	}
</style>
