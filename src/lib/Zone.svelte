<script>
	import { draggable } from '@neodrag/svelte'
	import { textArray,zoneArray,isDragging } from '../store';

    export let name, x, y, index, nodeInZoneIndex;

    const startingDrag = () =>{
        $isDragging = true;
    }
    const updateZoneLocation = (x,y) => {
		$zoneArray = $zoneArray.map(obj => {
			if ($zoneArray.indexOf(obj) === index) {
				return {
					...obj,
					locationX:x,
					locationY:y,
				};
			}
			return obj;
		});
	};
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

    let zoneWidth = 150;
    let zoneHeight = 150;
    
    $: if ($textArray.length > 0) {
        let nodeInZoneWidth;
        let nodeInZoneHeight;
        let objectLocationX;
        let objectLocationY;

        $textArray.map(obj => {
            objectLocationX = obj.locationX;
            objectLocationY = obj.locationY; 
            if (
                objectLocationX > x &&
                objectLocationX < zoneWidth+x && 
                objectLocationY > y &&
                objectLocationY < zoneHeight+y
            ) {
                if (!nodeInZoneIndex.includes($textArray.indexOf(obj))) {
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
            zoneWidth =  (getMaxX - x) + (nodeInZoneWidth + 30);
            zoneHeight =  (getMaxY - y) + (nodeInZoneHeight + 30);
        } else{
            zoneWidth = 150;
            zoneHeight = 150;
        }
        console.log(nodeInZoneIndex);
    }

    // $zoneArray = $zoneArray;
</script>

    <!-- left:${x}px;
        top:${y}px; -->
    <!-- 
        
    -->
<div
    class="draggableContainer"
    style='width:{zoneWidth}px;height:{zoneHeight}px;'
    use:draggable={{ position: { x, y } }}
    on:neodrag={() => {startingDrag()}}
    on:neodrag:end={(e) => {
        $isDragging = false;
        if (e.detail.offsetX != 0 && e.detail.offsetY != 0) {
            x = e.detail.offsetX;
            y = e.detail.offsetY;
        }
        updateZoneLocation(x,y);
    }}

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
        /* width: 200px; */
        /* height: 200px; */
        position: absolute;
        border-radius: 0px 30px 30px 30px;
        padding: 10px;
        border: 2px solid rgba(244, 244, 244, 0.462);
        background-color: rgba(244, 244, 244, 0.462);
        z-index: 5;
        transition:0.05s;
        box-shadow: 0px 0px 30px rgb(208, 208, 208);
	}
    .draggableContainer:hover{
        cursor: all-scroll;
    }
    /* .draggableContainer:active{
    } */
</style>