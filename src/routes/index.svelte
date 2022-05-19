<script context="module">
	export const prerender = true;
</script>

<script>
	// import Counter from '$lib/Counter.svelte';

	import TextContainer from '../lib/TextContainer.svelte';
	import Footer from '../lib/Footer.svelte';
	import * as animateScroll from "svelte-scrollto";

	import { onMount } from 'svelte';
	import { textArray,connectionArray,isDragging } from '../store';
	import ConnectionLine from '../lib/ConnectionLine.svelte';

	import Edit from "carbon-icons-svelte/lib/Edit.svelte";
	import EditOff from "carbon-icons-svelte/lib/EditOff.svelte";
	import FolderParent from "carbon-icons-svelte/lib/FolderParent.svelte";
	import PinFilled from "carbon-icons-svelte/lib/PinFilled.svelte";
	import CheckmarkOutline from "carbon-icons-svelte/lib/CheckmarkOutline.svelte";


	import {urlImage} from '../regex'
	
	let locationX,locationY;
	let editMode = false;
	let mergingOnLocal = false;

	const mouseLocation = (event) => {
		locationX = event.offsetX;
		locationY = event.offsetY;
	}
	const addTextObject = (obj) => {
		$textArray = [...$textArray, obj];
	}
	const createTextContainer = () => {
		if (uploadedFromLocal === true) {
			mergingOnLocal = true;
		}
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
				addTextObject(
					{
						text:e.target.result,
						locationX:locationX,
						locationY:locationX,
						connections:[]
					}
				)
				console.log(e.target.result);
				console.log(file);
			};
			reader.readAsDataURL(file);
		};
		document.onpaste = function(e){
			var items = e.clipboardData.items;
			for (var i = 0; i < items.length; i++) {
				if (urlImage.test(items[i].type)) {
					loadImage(items[i].getAsFile());
					return;
				}
			}
			e.preventDefault()
		}
	})

	let downloadJSONHref = '';
	const saveAsJSON = () => {
		let formatedJSON = {
			'containerDataArray':$textArray,
			'connectionLineLinks':$connectionArray,
		}
		downloadJSONHref = URL.createObjectURL(new Blob([JSON.stringify(formatedJSON, null, 2)], {type: "text/plain"}));
		console.log(downloadJSONHref);
	}

	let scaleValue = 10;
	if(scaleValue < 10){
		editMode = false;
	}

	let file = null;
	let modalType;

	function beforeUnload() {
		if ($textArray.length > 0) {
			alert("Please save")
		}
	}

	let openModal = false;
	let uploadedFromLocal = false;
	const updateDataFromJSON = async () =>{
		let text = await file[0].text();
		const importedData = JSON.parse(text);
		importedData.containerDataArray.map(prop =>{
			$textArray.push(prop);
		})
		importedData.connectionLineLinks.map(prop =>{
			$connectionArray.push(prop);
		})
		$textArray = $textArray;
		$connectionArray = $connectionArray;
		openModal = false;
		uploadedFromLocal = true;
	}
</script>

<svelte:head>
	<title>cocagraph</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<svelte:window on:beforeunload={beforeUnload}/> 

{#if openModal}
	<div id="modal">
		<div class={'tag'} style={'padding: 0 1em ;'}>
			<PinFilled/>
			<p>Temporary Pin</p>
		</div>
		{#if modalType == 'uploadLocalData'}
			{#if file}
				{#await file[0].text() then text}
					<pre style="margin-top:2em">{text}</pre>
				{/await}
				{:else}
				<div style="margin-top:2em">
					<strong>Nothing to preview</strong>
					<p>When uploading a local file to cocagraph, the data must be in a specific JSON file format.</p>
				</div>
			{/if}
			<div style={'display: flex; align-items: center;justify-content:space-between;'}>
				<label>
					<input type='file' bind:files={file}/>
					<FolderParent size={20}/>
					Upload JSON formated file
				</label>
				{#if file}
					<button
						class={'largeButton'}
						title='Use this file'
						on:click={()=>updateDataFromJSON()}
					>
						<CheckmarkOutline size={20}/>
					</button>
				{/if}
			</div>
		{/if}
		{#if modalType == 'navigation'}
			<div style="margin-top:2em">
				<strong>Navigation</strong>
				<p>When uploading a local file to cocagraph, the data must be in a specific JSON file format.</p>
				<ul>
					<li><a href="/about">About</a></li>
					<li><a href="/usage">JSON file format?</a></li>
					<li><a href="https://github.com/501A-Designs/cocagraph" target="_blank">GitHub</a></li>
					<li><a href="https://501a.netlify.app/" target="_blank">Developer Site</a></li>
				</ul>
			</div>
		{/if}
	</div>
{/if}

<div style="padding:0; margin:0; overflow-x:scroll;">
	<!-- // translateX(-${scaleValue/15}%) -->
	<section
		id="editorCanvas"
		style={`
			transform:
			scale(${scaleValue/10})
			translateY(-${scaleValue/10}px)
		`}
		on:mousemove={(e) => mouseLocation(e)}
	>
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
					color={'var(--cocaOrange)'}
					thickness={2}
				/>
				<!-- #a2a2a2 -->
			{/each}
		{/if}
	</section>
</div>

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
	<h1
		style="margin-left:5%; cursor:pointer;"
		on:click|preventDefault={() => {
			modalType='navigation';
			openModal=true;
			animateScroll.scrollToTop();
		}}
	>
		cocagraph
	</h1>
	<div style={'margin:0;padding:0;display:flex;gap:8px;'}>
		{#if scaleValue === 10}
			{#if editMode}
				<button
					class="largeButton"
					style={`
						background-color:var(--cocaOrange);
					`}
					on:click={() => editMode = false}
					title="Turn off edit mode"
				>
					<Edit size={20}/>
				</button>
				{:else}
				<button
					class="largeButton"
					on:click={() => editMode = true}
					title="Enable edit mode"
				>
					<EditOff size={20}/>
				</button>
			{/if}
		{/if}
		{#if $textArray.length > 0}
			<div class="buttonContainer">
				<!-- <button class={'scaleHover'}>Save to cache</button> -->
				{#if uploadedFromLocal}
					{#if mergingOnLocal}
						<button
							class={'scaleHover'}
							on:click={() => saveAsJSON()}
						>
							Convert to JSON
						</button>
					{/if}
					{:else}
					<button
						class={'scaleHover'}
						on:click={() => saveAsJSON()}
					>
						Convert to JSON
					</button>
				{/if}

				{#if downloadJSONHref !== ''}
					<a
						href={downloadJSONHref}
						download={`cocagraphData.txt`}
						style="margin:0 1em; padding:0;"
					>
						Download JSON file
					</a>
				{/if}
				{#if uploadedFromLocal}
					{#if mergingOnLocal}
						<p style="margin:0 1em; padding:0;">Added Node On Top Of Local</p>
						{:else}
						<p style="margin:0 1em; padding:0;">Uploaded From Local</p>
					{/if}
				{/if}

			</div>
		{/if}
		{#if $textArray.length === 0 && scaleValue === 10}
			<button
				class="largeButton"
				on:click|preventDefault={() => {
					modalType='uploadLocalData';
					openModal=true;
					animateScroll.scrollToTop();
				}}
			>
				<FolderParent size={20}/>
			</button>
		{/if}
	</div>
	{#if openModal}
		<button
			style="margin-right:5%"
			on:click={() => openModal=false}
		>
			Close Pin
		</button>
		{:else}
		<input
			style="margin-right:5%"
			type="range"
			name="scale"
			bind:value={scaleValue}
			min="6"
			max="10"
		>
	{/if}
</Footer>

<style>
	.pointerButton{
		z-index: 20;
		opacity: 0.2;
		background: radial-gradient(circle at center, var(--cocaOrange) 0, transparent 60%);
		width:150px;
		height:150px;
		border-radius:50px;
		cursor: pointer;
		transition:0.2s;
	}
	.pointerButton:hover{
		opacity: 0.5;
		background: radial-gradient(circle at center, var(--cocaOrange) 0, transparent 60%);
	}
	#editorCanvas {
		width: 2000px;
		height: 1500px;
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

	.largeButton:hover,label:hover{
		transform: translateY(-5px);
	}

	input[type="file"] {
		display: none;
	}
	label{
		font-family: 'Space Grotesk', sans-serif;
		user-select: none;
		border:1px solid rgb(214, 214, 214);
		background-color:rgb(214, 214, 214);
		color: rgb(56, 56, 56);
		display: flex;
		align-items: center;
		justify-content: center;
		gap:8px;
		cursor: pointer;
		padding:0;
		border-radius:15px;
		border:1px solid rgb(234, 234, 234);
		width: fit-content;
		padding: 0 1.5em;
		height: 48px;
		transition:0.5s;
	}

	.buttonContainer {
		display: flex;
		gap:8px;
		align-items: center;
		border-radius:15px;
		border:1px solid rgb(202, 202, 202);
		padding:8px;
		background-color:rgb(235, 235, 235);
		box-shadow:0px 0px 25px rgb(214, 214, 214);
	}
</style>
