<script>
	import { draggable } from '@neodrag/svelte'
    export let text;

    let showOnHover = false;
</script>

<div
    use:draggable
    class="draggableContainer"
    on:mouseenter={()=> showOnHover=true}
    on:mouseleave={()=> showOnHover=false}
>
    <p style="text-align:center; margin:0; padding:0">{text}</p>
    <!-- {#if showOnHover} -->
        <!-- <p style="margin:0; padding:0;">Double click to change image</p> -->
        <!-- <button on:click={() => deleteImage(imageIndex)}>Delete Image</button> -->
    <!-- {/if} -->
</div>

<style>
	.draggableContainer {
        border-radius: 5px;
        padding: 5px;
        color: black;
        font-size:1em;
        background-color: white;
        border: 2px solid white;
		height: fit-content;
		width: 250px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap:5px;
	}
    .draggableContainer:hover{
        border: 2px solid blue;
        cursor: all-scroll;
    }
</style>