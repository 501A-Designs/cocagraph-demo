<script>
    import { onMount } from 'svelte'
	import { draggable } from '@neodrag/svelte'
	import { textArray,zoneArray,isDragging } from '../store';

    import {url, urlImage, urlYoutubeVideo} from '../regex';

    import ConnectionLine from './ConnectionLine.svelte';

    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import IbmCloudSubnets from "carbon-icons-svelte/lib/IbmCloudSubnets.svelte";
    import ExamMode from "carbon-icons-svelte/lib/ExamMode.svelte";

    export let name, x, y,index, nodeInZoneIndex;

    // export let text, x, y, index, connections;

    // let showOnHover = false;

    // let beforeIndex = 0;
    // if (index !== 0) {
    //     beforeIndex = index - 1;
    // }

    // const createConnectionLine = (obj) => {
    //     $connectionArray = [...$connectionArray, obj];
    // }
    // const startingDrag = () =>{
    //     $isDragging = true;
    // }
    // const updateZoneLocation = (x,y) => {
	// 	$zoneArray = $zoneArray.map(obj => {
	// 		if ($zoneArray.indexOf(obj) === index) {
	// 			return {
	// 				...obj,
	// 				locationX:x,
	// 				locationY:y,
	// 			};
	// 		}
	// 		return obj;
	// 	});
	// };
    // $:console.log($zoneArray);
    // const updateTextContainerContent = () => {
	// 	let textContent = window.prompt(`new text?`, text);
    //     if(textContent !== null){
    //         $textArray = $textArray.map(obj => {
    //             if ($textArray.indexOf(obj) === index) {
    //                 return {
    //                     ...obj,
    //                     text:textContent,
    //                 };
    //             }
    //             return obj;
    //         });
    //     }
	// }
    // const updateTextContainerConnection = () => {
	// 	let newConnection = window.prompt(`connection id? (must be number)`, beforeIndex);
    //     if (parseInt(newConnection) !== index) {
    //         if(newConnection !== null){
    //             createConnectionLine({
    //                 firstElementIndex: index,
    //                 secondElementIndex: parseInt(newConnection)
    //             })
    //             $textArray[index].connections.push(parseInt(newConnection))
    //             $textArray[parseInt(newConnection)].connections.push(index)
    //         }
    //     }else{
    //         alert('you cannot run a connection to your own node')
    //     }
	// };

    // let urlCheck = text.match(new RegExp(url))
    // let urlImageCheck = text.match(new RegExp(urlImage))
    // let urlYoutubeVideoCheck = text.match(new RegExp(urlYoutubeVideo))

    // let type;

    // if (urlCheck) {
    //     type = 'url'
    //     if (urlImageCheck) {
    //         type = 'image';
    //     } if (urlYoutubeVideoCheck) {
    //         type = 'ytVideo';
    //     }
    // }else{
    //     type = 'text'
    // }

    let zoneWidth = 150;
    let zoneHeight = 150;
    
    let indexInZone = [];
    $: if ($textArray.length > 0) {

        let nodeInZoneWidth;
        let nodeInZoneHeight;
        let objectLocationX;
        let objectLocationY;

        $textArray.map(obj => {
            objectLocationX = obj.locationX;
            objectLocationY = obj.locationY; 

            // console.log(`${x} < Xrange < ${zoneWidth+x}, ${y} < Yrange < ${zoneHeight+y}`)
            if (
                objectLocationX > x &&
                objectLocationX < zoneWidth+x && 
                objectLocationY > y &&
                objectLocationY < zoneHeight+y
            ) {
                // let nodeInZone = obj;
                // let nodeInZoneIndex = $textArray.indexOf(nodeInZone);
                if (nodeInZoneIndex.includes($textArray.indexOf(obj))) {
                    console.log('already in');
                }else{
                    nodeInZoneIndex.push($textArray.indexOf(obj));
                }
            }else{
                nodeInZoneIndex.splice($textArray.indexOf(obj),1);
            }
        })

        
        
        if (nodeInZoneIndex.length > 0) {
            let maxXIndex;
            let getMaxX = Math.max(...nodeInZoneIndex.map(index => $textArray[index].locationX));
            $textArray.map(obj => {
                if (obj.locationX === getMaxX) {
                    maxXIndex = $textArray.indexOf(obj);
                    console.log(obj);
                }
            })

            let maxYIndex;
            let getMaxY = Math.max(...nodeInZoneIndex.map(index => $textArray[index].locationY));
            $textArray.map(obj => {
                if (obj.locationY === getMaxY) {
                    maxYIndex = $textArray.indexOf(obj);
                }
            })

            nodeInZoneWidth = document.getElementById(`${maxXIndex}-node`).clientWidth;
            nodeInZoneHeight = document.getElementById(`${maxYIndex}-node`).clientHeight;

            console.log(maxXIndex,maxYIndex);

            console.log((getMaxX - x) + (nodeInZoneWidth + 40))
            console.log((getMaxY - y) + (nodeInZoneHeight + 40))



            zoneWidth =  (getMaxX - x) + (nodeInZoneWidth + 30);
            zoneHeight =  (getMaxY - y) + (nodeInZoneHeight + 30);
        } else{
            zoneWidth = 150;
            zoneHeight = 150;
        }
        console.log(nodeInZoneIndex);
        // console.log(indexInZone);
    }

</script>

<!-- on:neodrag={() => {startingDrag()}} -->

<!-- use:draggable={{ position: { x, y } }} -->
    <!-- on:neodrag:end={(e) => {
        $isDragging = false;
        if (e.detail.offsetX != 0 && e.detail.offsetY != 0) {
            x = e.detail.offsetX;
            y = e.detail.offsetY;
        }
        updateZoneLocation(x,y); 
    }} -->
<div
    class="draggableContainer"
    style={`left:${x}px; top:${y}px; width:${zoneWidth}px; height:${zoneHeight}px;`}
>
    <strong
        class={'tag'}
        style={'padding: 0.5em 1em'}
    >
        {name}
    </strong>


    <!-- {#if showOnHover}
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
                >
                    <TrashCan/>
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
    {/if} -->
</div>
<style>

	.draggableContainer {
        position: absolute;
        border-radius: 0px 30px 30px 30px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap:5px;
        /* border: 1px solid rgb(190, 190, 190); */
        border: 2px solid rgba(244, 244, 244, 0.462);
        background-color: rgba(244, 244, 244, 0.462);
        z-index: 10;
        transition:0.05s;
        box-shadow: 0px 0px 30px rgb(208, 208, 208);
	}
    .draggableContainer:hover{
        cursor: all-scroll;
    }
    /* .draggableContainer:active{
    } */
</style>