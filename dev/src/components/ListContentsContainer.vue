<template>
    <button class="tile button list-container" :class="{ 'st-outlined': isSelected }" @click="selectRoute">
        <component :is="activeComponent" :contentData='contentData' />
    </button>
</template>

<script>
import RouteList from './ListContents/RouteList.vue'
import StationList from './ListContents/StationList.vue'

export default {
    props: {
        contentData: {
            required: true,
            type: Object
        },

        isSelected: {
            required: true,
            type: Boolean
        }
    },

    computed: {
        activeComponent() {
            let isRouteType = this.$store.getters.getSelectedListType
            return (isRouteType === 'routes') ? RouteList : StationList
        }
    },

    methods: {
        selectRoute() {
            this.$store.commit('setSelectedStationPair', { 'stationPair': this.contentData.station })
            
            if (this.contentData.routeData.length > 0) {
                this.$store.commit('setSelectedRouteID', { 'routeID': this.contentData.routeData[0].route })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list-container {
    min-width: 100%;
    margin-bottom: .38rem;
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