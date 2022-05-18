<script>

</script>

<!-- <Header /> -->

<footer>
	<slot />
</footer>

<style>
    footer{
        position:fixed;
        z-index: 20;
        /* bottom:0.5em; */
        bottom:0;
        padding: 1em;
        width: 100%;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: inset 0 -80px 80px -80px gray;
    }
</style>
