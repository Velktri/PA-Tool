<template>
    <button class="tile button list-container" :class="{ 'is-primary': isSelected }" @click="selectRoute">
        {{ routeData.route }}
        {{ routeData.station }}
        {{ routeData.percent }}% complete
        {{ routeData.progress }} {{ remainingPackages }} packages remaining
    </button>
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
            type: Boolean
        }
    },

    computed: {
        remainingPackages() {
            let split = this.routeData.progress.split('/')
            return split[1] - split[0]
        },
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
    min-width: 100%;
    margin-bottom: .5rem;
}

.selected {
    background-color: limegreen;
}
</style>