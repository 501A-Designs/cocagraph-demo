<script>
	import { draggable } from '@neodrag/svelte'
	import { textArray } from '../store';
    export let text, x, y, index;
    let showOnHover = false;
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
    // const updateTextContainerConnection = () => {
	// 	let newConnection = window.prompt(`connection id?`, 0);
    //     if(newConnection !== null){
    //         $textArray = $textArray.map(obj => {
    //             if ($textArray.indexOf(obj) === index) {
    //                 return {
    //                     ...obj,
    //                     connectedIndex:newConnection,
    //                 };
    //             }
    //             return obj;
    //         });
    //     }
	// };
</script>
<div
    class="draggableContainer"
    use:draggable={{ position: { x, y } }}
    on:neodrag:end={(e) => {
        x = e.detail.offsetX;
        y = e.detail.offsetY;
        updateTextContainerLocation(x,y);
    }}
    on:mouseenter={() => showOnHover = true}
    on:mouseleave={() => showOnHover = false}
>
    {#if showOnHover}
        <div>
            <strong style="color:white; background-color:grey; padding: 0 0.3em; border-radius: 2px">note #{index}</strong>
        </div>
    {/if}
    <p
        style="text-align:left; margin:0; padding:0"
    >
        {text}
    </p>
    {#if showOnHover}
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
                update
            </button>
            <!-- <button 
                on:click={() => {
                        updateTextContainerConnection();
                        $textArray = $textArray;
                    }
                }
            >
                connect
            </button> -->
        </div>
    {/if}
</div>
<style>
	.draggableContainer {
        position: absolute;
        border-radius: 5px;
        padding: 5px;
        color: black;
        font-size:1em;
        /* background-color: white; */
        border: 1px solid transparent;
		height: fit-content;
        width: fit-content;
		max-width: 250px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap:5px;
	}
    .draggableContainer:hover{
        border: 1px solid grey;
        background-color: rgb(244, 244, 244);
        box-shadow: 0px 0px 10px rgb(191, 191, 191);
        cursor: all-scroll;
    }
    button{
        cursor: pointer;
    }
    .showOnHover{
        opacity: 0;
    }
    .draggableContainer:hover .showOnHover{
        opacity: 1;
    }
</style>