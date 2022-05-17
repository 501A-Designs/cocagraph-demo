<script>
    import { textArray, connectionArray,isDragging } from "../store";
    export let firstElementIndex,secondElementIndex, color, thickness, index;
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
        $connectionArray.splice(index,1);
        $connectionArray = $connectionArray;
    }}>delete</button>
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