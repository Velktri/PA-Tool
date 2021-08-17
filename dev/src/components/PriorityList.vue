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

    data() {
        return {
            selectionID: 0
        }
    },
    
    methods: {
        onListClicked(payload) {
            this.selectionID = payload.id
            this.$store.commit('setSelectedRouteDetails', { 'stationPair': payload.station })
        },

        computePercentage(num) {
            let split = num.split('/')
            return Math.floor(100 * ((split[0] / split[1]).toFixed(2)))
        },

        setActiveRouteList() {
            let InProgressRoutes = this.$store.getters.getInProgressRoutes
            if (InProgressRoutes !== undefined)
            {
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


                /* sort the routes based on completion */
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