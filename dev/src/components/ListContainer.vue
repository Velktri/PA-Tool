<template>
    <div class="tile box list-container" :class="{ selected: isSelected }" @click="selectRoute">
        {{ routeData.route }}
        {{ routeData.station }}
        {{ routeData.percent }}% complete
        {{ routeData.progress }} {{ remainingPackages }} packages remaining
    </div>
</template>

<script>
export default {
    props: {
        routeData: {
            required: true,
            type: Object
        },

        id: {
            required: true,
            type: Number
        },

        isSelected: {
            required: true,
            default: false,
            type: Boolean
        }
    },

    computed: {
        remainingPackages() {
            let split = this.routeData.progress.split('/')
            return split[1] - split[0]
        }
    },

    methods: {
        selectRoute() {
            this.$emit('listClicked', { 'id': this.id, 'station': this.routeData.station })
        }
    }

}
</script>

<style lang="scss" scoped>
.list-container {
    background-color: rgb(140, 175, 211);
}

.selected {
    background-color: limegreen;
}
</style>