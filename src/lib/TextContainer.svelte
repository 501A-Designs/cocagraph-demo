<script>
    import { onMount } from 'svelte'
	import { draggable } from '@neodrag/svelte'
	import { textArray,connectionArray,isDragging } from '../store';

    import {url, urlImage, urlYoutubeVideo} from '../regex';

    import ConnectionLine from './ConnectionLine.svelte';

    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import IbmCloudSubnets from "carbon-icons-svelte/lib/IbmCloudSubnets.svelte";
    import ExamMode from "carbon-icons-svelte/lib/ExamMode.svelte";


    export let text, x, y, index, connections;

    let showOnHover = false;

    let beforeIndex = 0;
    if (index !== 0) {
        beforeIndex = index - 1;
    }

    const createConnectionLine = (obj) => {
        $connectionArray = [...$connectionArray, obj];
    }
    const startingDrag = () =>{
        $isDragging = true;
    }
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
    const updateTextContainerConnection = () => {
		let newConnection = window.prompt(`connection id? (must be number)`, beforeIndex);
        if (parseInt(newConnection) !== index) {
            if(newConnection !== null){
                createConnectionLine({
                    firstElementIndex: index,
                    secondElementIndex: parseInt(newConnection)
                })
                $textArray[index].connections.push(parseInt(newConnection))
                $textArray[parseInt(newConnection)].connections.push(index)
            }
        }else{
            alert('you cannot run a connection to your own node')
        }
	};


    let urlCheck = text.match(new RegExp(url))
    let urlImageCheck = text.match(new RegExp(urlImage))
    let urlYoutubeVideoCheck = text.match(new RegExp(urlYoutubeVideo))

    let type;

    if (urlCheck) {
        type = 'url'
        if (urlImageCheck) {
            type = 'image';
        } if (urlYoutubeVideoCheck) {
            type = 'ytVideo';
        }
    }else{
        type = 'text'
    }
</script>
    <!-- on:neodrag:start={(e) => {
        isDragging = true;
    }} -->
<div
    class="draggableContainer"
    use:draggable={{ position: { x, y } }}
    on:mouseenter={() => showOnHover = true}
    on:mouseleave={() => showOnHover = false}
    on:neodrag={() => {startingDrag()}}
    on:neodrag:end={(e) => {
        $isDragging = false;
        console.log(e.detail.offsetX,e.detail.offsetY);
        console.log(x,y)
        if (e.detail.offsetX != 0 && e.detail.offsetY != 0) {
            x = e.detail.offsetX;
            y = e.detail.offsetY;
        }
        updateTextContainerLocation(x,y);
    }}
>
    <strong class={'tag'}>{index}</strong>


    {#if type == "text"}
        <p
            style="text-align:left; margin: 5px; padding:0; user-select:none"
        >
            {text}
        </p>
    {/if}
    {#if type == "url"}
        <a href={text} style="text-decoration:wavy; overflow-x:scroll">{text}</a>
    {/if}
    {#if type == "image"}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={text} alt="no image"/>
    {/if}
    {#if type == "ytVideo"}
        <iframe title="video link" src={'https://www.youtube.com/embed/' + text.split('=')[1]}/>
    {/if}


    {#if showOnHover}
        <div style="display:flex; align-items:center; gap:5px;user-select:none;">
            {#if connections.length == 0}
                <button 
                    on:click={() => {
                            $textArray.splice(index,1);
                            $textArray = $textArray;
                            $connectionArray = $connectionArray;
                        }
                    }
                >
                    <TrashCan/>
                </button>
            {/if}
            <button 
                on:click={() => {
                        updateTextContainerContent();
                        $textArray = $textArray;
                    }
                }
                title="update content"
            >
                <ExamMode/>
            </button>
            <button 
                on:click={() => {
                        updateTextContainerConnection();
                        $textArray = $textArray;
                    }
                }
                title="connect"
            >
                <IbmCloudSubnets/>
            </button>
        </div>
    {/if}
</div>
<style>
    .tag{
        position: absolute;
        color:black;
        background-color:var(--cocaOrange);
        padding: 0.5em 1em;
        border-radius: 20px;
        font-size:0.8em;
        user-select:none;
        width:fit-content;
        left: -15px;
        top: -15px;
    }
	.draggableContainer {
        position: absolute;
        border-radius: 0px 10px 10px 10px;
        padding: 10px;
        color: black;
        font-size:1em;
        border: 1px solid var(--cocaOrange);
		height: fit-content;
        width: fit-content;
		max-width: 250px;
        display: flex;
        flex-direction: column;
        gap:5px;
        /* border: 1px solid rgb(190, 190, 190); */
        background-color: rgb(244, 244, 244);
        z-index: 10;
        transition:0.05s;
	}
    .draggableContainer:hover{
        cursor: all-scroll;
    }
    .draggableContainer:active{
        box-shadow: 0px 0px 30px rgb(208, 208, 208);
    }
    button{
        cursor: pointer;
    }
</style>