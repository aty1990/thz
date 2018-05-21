<template>
    <div class="page-header">
        <slot>
            <mt-header title="淘花宅"></mt-header>
        </slot>
    </div>
</template>
<script>
    export default {
        name: 'page-header',
        data () {
            return {}
        }
    }
</script>
<style lang="scss">
    .page-header{
        width: 100%;
    }
</style>
