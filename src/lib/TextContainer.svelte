<script>
    import { onMount } from 'svelte'
	import { draggable } from '@neodrag/svelte'
	import { textArray,connectionArray,zoneArray,isDragging } from '../store';

    import {url, urlImage, urlYoutubeVideo} from '../regex';

    import ConnectionLine from './ConnectionLine.svelte';

    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import IbmCloudSubnets from "carbon-icons-svelte/lib/IbmCloudSubnets.svelte";
    import ExamMode from "carbon-icons-svelte/lib/ExamMode.svelte";
    import Grid from "carbon-icons-svelte/lib/Grid.svelte";


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

    const newZone = (obj) =>{
        $zoneArray = [...$zoneArray, obj];
    }
    const createZone = () => {
        let zoneName = window.prompt(`create zone`, 'Zone Name');
        if(zoneName !== null){
            newZone({
                name:zoneName,
                locationX:x - 50,
                locationY:y - 50,
                nodeInZoneIndex:[]
            })
        }
    }
</script>

<div
    id={`${index}-node`}
    class="draggableContainer"
    use:draggable={{ position: { x, y } }}
    on:mouseenter={() => showOnHover = true}
    on:mouseleave={() => showOnHover = false}
    on:neodrag={() => {startingDrag()}}
    on:neodrag:end={(e) => {
        $isDragging = false;
        if (e.detail.offsetX != 0 && e.detail.offsetY != 0) {
            x = e.detail.offsetX;
            y = e.detail.offsetY;
        }
        updateTextContainerLocation(x,y);
    }}
>
    <strong class={'tag'} style={'padding: 0.5em 1em'}>{index}</strong>


    {#if type == "text"}
        <p
            style="text-align:left; margin: 5px; padding:0; user-select:none"
        >
            {text}
        </p>
    {/if}
    {#if type == "url"}
        <a href={text} style="overflow-x:scroll">{text}</a>
    {/if}
    {#if type == "image"}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
            src={text}
            alt="no image"
        />
    {/if}
    {#if type == "ytVideo"}
        <iframe class={'scaleHover'} title="video link" src={'https://www.youtube.com/embed/' + text.split('=')[1]}/>
    {/if}


    {#if showOnHover}
        <div style="display:flex; align-items:center; gap:5px;user-select:none;">
            {#if connections.length == 0}
                <button
                    class={'scaleHover'}
                    on:click={() => {
                            $textArray.splice(index,1);
                            $textArray = $textArray;
                            $connectionArray = $connectionArray;
                        }
                    }
                    title="delete node"
                >
                    <TrashCan/>
                </button>
                <button
                    class={'scaleHover'}
                    on:click={() => {
                            createZone();
                        }
                    }
                    title="create zone"
                >
                <Grid/>
            </button>
            {/if}
            <button
                class={'scaleHover'}
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
                class={'scaleHover'}
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

	.draggableContainer {
        position: absolute;
        border-radius: 0px 10px 10px 10px;
        padding: 10px;
        color: black;
        font-size:1em;
		height: fit-content;
        width: fit-content;
		max-width: 250px;
        display: flex;
        flex-direction: column;
        gap:5px;
        /* border: 1px solid rgb(190, 190, 190); */
        border: 1px solid var(--cocaOrange);
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