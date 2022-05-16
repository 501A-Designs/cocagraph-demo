<script>
	import { draggable } from '@neodrag/svelte'
	import { textArray } from '../store';
    export let text, x, y, index;
    const updateTextContainerLocation = (x,y) => {
		$textArray = $textArray.map(obj => {
			if ($textArray.indexOf(obj) === index) {
				return {
					...obj,
					locationX:x,
					locationY:y,
				};
			}
			return obj;
		});
	};
    const updateTextContainerContent = () => {
		let textContent = window.prompt(`new text?`, text);
        if(textContent !== null){
            $textArray = $textArray.map(obj => {
                if ($textArray.indexOf(obj) === index) {
                    return {
                        ...obj,
                        text:textContent,
                    };
                }
                return obj;
            });
        }
	}
</script>
<div
    use:draggable={{ position: { x, y } }}
    class="draggableContainer"
>
    <p
        on:neodrag:end={(e) => {
            x = e.detail.offsetX;
            y = e.detail.offsetY;
            updateTextContainerLocation(x,y);
        }}
        style="text-align:left; margin:0; padding:0"
    >
        {text}
    </p>
    <div style="display:flex; align-items:center; gap:5px;">
        <button 
            on:click={() => {
                    $textArray.splice(index,1);
                    $textArray = $textArray;
                }
            }
        >
            delete
        </button>
        <button 
            on:click={() => {
                    updateTextContainerContent();
                    $textArray = $textArray;
                }
            }
        >
            update content
        </button>
    </div>
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