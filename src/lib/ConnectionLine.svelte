<script>
    import { textArray, connectionArray,isDragging } from "../store";
    import Cut from "carbon-icons-svelte/lib/Cut.svelte";

    export let firstElementIndex,secondElementIndex, color, thickness;
    // console.log(firstElementLocation);
    let firstElementData = $textArray[firstElementIndex];
    let secondElementData = $textArray[secondElementIndex];
    let x1 = firstElementData.locationX;
    let y1 = firstElementData.locationY;
    let x2 = secondElementData.locationX;
    let y2 = secondElementData.locationY;

    let length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    let cx = ((x1 + x2) / 2) - (length / 2);
    let cy = ((y1 + y2) / 2) - (thickness / 2);
    let angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
</script>

<div
    class="connectionLine"
    style={`
        height:${thickness}px;
        left:${cx}px;
        top:${cy}px;
        width:${length}px;
        transform:rotate(${angle}deg);
        background-color:${color};
    `}
>
    <button on:click={() => {
        let connectedNodes;

        $connectionArray.map((obj) => {
            if (obj.firstElementIndex == firstElementIndex && obj.secondElementIndex == secondElementIndex) {
                connectedNodes = obj;
            }
        })
        
        let fCN = $textArray[connectedNodes.firstElementIndex];
        let sCN = $textArray[connectedNodes.secondElementIndex];

        let fCCN = fCN.connections.splice(connectedNodes.firstElementIndex,1)
        let sCCN = sCN.connections.splice(connectedNodes.secondElementIndex,1)

        console.log(fCCN, sCCN);

        // let finalVersionArray = removedFirst[connectedNodes.secondElementIndex].connections.filter((f) => { return f !== connectedNodes.firstElementIndex })

        // $textArray = finalVersionArray;
        console.log($textArray);
        $connectionArray = $connectionArray;
    }}><Cut /></button>
</div>

<style>
    .connectionLine{
        line-height:1px;
        position:absolute;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    button{
        opacity: 0;
        cursor: pointer;
    }
    .connectionLine:hover button{
        opacity: 1;
    }
</style>