<template>
    <div class="box">
        <div class="priority-css st-list-container">
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
                let sortedRoutes = this.sortRouteFromFilter(InProgressRoutes)
                this.$store.commit('setSelectedStationPair', { 'stationPair': sortedRoutes[this.$store.getters.getSelectedListID].station })
                return sortedRoutes
            }

            return []
        },

        sortRouteFromFilter(routeObj) {
            let filterType = this.$store.getters.getSelectedRouteFilter
            let sortedRoutes = []

            Object.keys(routeObj).forEach((pairKey) => {
                routeObj[pairKey].forEach((route) => {

                    sortedRoutes.push({ 'station': pairKey, 'percent': this.computePercentage(route.progress), ...route })
                })
            })

            if (filterType === 'percentage') {
                sortedRoutes.sort((x, y) => {
                    if (x.percent < y.percent) { return 1 }
                    if (x.percent > y.percent) { return -1 }

                    return 0
                })
            }

            if (filterType === 'packages') {
                sortedRoutes.sort((x, y) => {
                    let xRemain = x.progress.split('/')[1] - x.progress.split('/')[0]
                    let yRemain = y.progress.split('/')[1] - y.progress.split('/')[0]
                    if (xRemain < yRemain) { return -1 }
                    if (xRemain > yRemain) { return 1 }

                    return 0
                })
            }

            return sortedRoutes
        }
    }
}
</script>

<style lang="scss" scoped>

.st-list-container {
    padding: 0.5rem;
    scrollbar-width: thin;
    height: calc(#{$content-height} - 3.75rem);
    overflow:auto;
}

.st-buffer {
    height: 50px;
}
</style>