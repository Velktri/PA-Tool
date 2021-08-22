<template>
    <button class="tile button list-container" :class="{ 'st-outlined': isSelected }" @click="selectRoute">
        <div class="st-p-r">{{ routeData.route }}</div>
        <div class="st-p-r">{{ routeData.station }}</div>
        <div class="st-p-r">{{ routeData.percent }}%</div>
        <div class="st-p-r">{{ routeData.progress }}</div>
        <div>{{ remainingPackages }} remaining</div>
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

.st-p-r {
    padding-right: 1.5rem;
}

.st-outlined {
    border-color: #2ecc71;
}

.st-outlined:hover {
    border-color: #2ecc71;
}

.st-outlined:focus {
    color: white;
    border-color: #2ecc71;
}
</style>