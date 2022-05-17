<script>
    import { textArray, connectionArray,isDragging } from "../store";
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
/>

<style>
    .connectionLine{
        line-height:1px;
        position:absolute;
    }
</style>