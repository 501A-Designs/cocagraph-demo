<script>
    import { textArray } from "../store";
    export let firstElementIndex, secondElementIndex, color, thickness;
    const firstElementData = $textArray[firstElementIndex];
    const secondElementData = $textArray[secondElementIndex];
    const x1 = firstElementData.locationX;
    const y1 = firstElementData.locationY;
    const x2 = secondElementData.locationX;
    const y2 = secondElementData.locationY;
    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    const cx = ((x1 + x2) / 2) - (length / 2);
    const cy = ((y1 + y2) / 2) - (thickness / 2);
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
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
        padding:0px;
        margin:0px;
        line-height:1px;
        position:absolute;
    }
</style>