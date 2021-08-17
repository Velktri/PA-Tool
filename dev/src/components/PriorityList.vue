<template>
    <div class="container is-fluid priority-css">
        <div class="block">
            <ListContainer  v-for="(route, i) in setActiveRouteList()" 
                            :key="i"
                            :id="i"
                            :isSelected="i === selectionID"
                            :routeData="route" 
                            @listClicked='onListClicked'
            />
        </div>
    </div>
</template>

<script>
import ListContainer from "./ListContainer.vue"

export default {
    components: {
        ListContainer
    },

    computed: {
        selectionID() {
            return this.$store.getters.getSelectedListID
        }
    },
    
    methods: {
        onListClicked(payload) {
            this.$store.commit('setSelectedListID', { 'id': payload.id })
            this.$store.commit('setSelectedStationPair', { 'stationPair': payload.station })
        },

        computePercentage(num) {
            let split = num.split('/')
            return Math.floor(100 * ((split[0] / split[1]).toFixed(2)))
        },

        setActiveRouteList() {
            let InProgressRoutes = this.$store.getters.getInProgressRoutes
            if (InProgressRoutes !== undefined) {
                let sortedRoutes = []

                Object.keys(InProgressRoutes).forEach((pairKey) => {
                    InProgressRoutes[pairKey].forEach((route) => {

                        sortedRoutes.push({ 'station': pairKey, 'percent': this.computePercentage(route.progress), ...route })
                    })
                })

                sortedRoutes.sort((x, y) => {
                    if (x.percent < y.percent) { return 1 }
                    if (x.percent > y.percent) { return -1 }

                    return 0
                })
                this.$store.commit('setSelectedStationPair', { 'stationPair': sortedRoutes[this.$store.getters.getSelectedListID].station })
                return sortedRoutes
            }

            return []
        }
    }
}
</script>

<style lang="scss" scoped>
.priority-css {
    height:100vh;
    overflow:auto;
}
</style>