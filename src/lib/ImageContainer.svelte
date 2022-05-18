<script>
	import { draggable } from '@neodrag/svelte'
    export let imageUrl, deleteImage;

    let showOnHover = false;
</script>

<div
    use:draggable
    class="draggableContainer"
    on:mouseenter={()=> showOnHover=true}
    on:mouseleave={()=> showOnHover=false}
>
    <img
        src={imageUrl}
        alt={'no image inserted'}
    />
    {#if showOnHover}
        <!-- <p style="margin:0; padding:0;">Double click to change image</p> -->
        <button on:click={() => {deleteImage()}}>
            Delete Image
        </button>
    {/if}
</div>

<style>
	.draggableContainer {
        border-radius: 5px;
        padding: 5px;
        background-color: grey;
        border: 1px solid white;
		height: fit-content;
		width: fit-content;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap:5px;
	}
    .draggableContainer:hover{
        border: 1px solid grey;
        cursor: all-scroll;
    }
    img{
        border-radius: 2px;
        width: 250px;
        height: auto;
    }

</style>