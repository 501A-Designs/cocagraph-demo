<script>
	import { draggable } from '@neodrag/svelte'
    export let text,x,y,deleteText;

    let showOnHover = false;
</script>

<!-- style={`left: ${x}px; top:${y}px;`} -->
<div
    use:draggable={{ position: { x, y } }}
    class="draggableContainer"
    on:mouseenter={()=> showOnHover=true}
    on:mouseleave={()=> showOnHover=false}
    on:neodrag:end={(e) => {
        x = e.detail.offsetX;
        y = e.detail.offsetY;
    }}
>


    <!-- on:neodrag:end={(e) => {
        x = e.detail.offsetX;
        y = e.detail.offsetY;
    }} -->
    <p style="text-align:left; margin:0; padding:0">{text}</p>
    <button on:click={() => deleteText()}>Delete Text Box</button>
    <!-- {#if showOnHover}
    {/if} -->
</div>

<style>
	.draggableContainer {
        border-radius: 5px;
        padding: 5px;
        color: black;
        font-size:1em;
        /* background-color: white; */
        border: 2px solid transparent;
		height: fit-content;
        width: fit-content;
		max-width: 250px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap:5px;
	}
    .draggableContainer:hover{
        border: 2px solid grey;
        cursor: all-scroll;
    }
    button{
        opacity: 0;
    }
    .draggableContainer:hover button{
        opacity: 1;
    }
</style>