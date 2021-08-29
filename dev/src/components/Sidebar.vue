<template>
    <div class="st-menu">
        <ul class="menu-list">
            <li><a>Station Tracker</a></li>
            <li><a>Wave Tracker</a></li>
            <li>{{ clock }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        clock() {
            let time = new Date(new Date().getTime() + 12*60*60*1000)
            return time.getHours() + ':' + time.getMinutes()
        }
    }
}
</script>

<style lang="scss" scoped>
.st-menu {
    background-color: rgb(93, 130, 167);
    min-height: 100vh;
    width: 100%
}

</style>