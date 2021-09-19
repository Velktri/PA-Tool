<template>
    <div class="box">
        <div class="st-list-container">
            <RouteListContainer v-for="(route, i) in stationList()"
                                        :key="i"
                                        :id="i"
                                        :isSelected="route.station === selectionStation"
                                        :contentData="route"
                                        :listType='stations'
            />
        </div>
    </div>
</template>

<script>
import RouteListContainer from "./ListContentsContainer.vue"


export default {
    components: {
        RouteListContainer
    },

    computed: {
        selectionStation() {
            return this.$store.getters.getSelectedStationPair
        }
    },

    methods: {
        stationList() {
            let InProgressRoutes = this.$store.getters.getInProgressRoutes

            let listSize = this.$store.getters.getMaxFilterRange - this.$store.getters.getMinFilterRange
            let offset = this.$store.getters.getMinFilterRange
            let sortedRoutes = []
            sortedRoutes = new Array(listSize).fill({})
            

            sortedRoutes.forEach((ele, i, arr) => {
                arr[i] = {'station': 'P' + (i + offset), 'routeData': [] }
            })

            Object.keys(InProgressRoutes).forEach((pairKey) => {
                let stationNum = parseInt(pairKey.substring(1))
                if (stationNum >= this.$store.getters.getMinFilterRange && stationNum <= this.$store.getters.getMaxFilterRange) 
                {

                    let stationObj = { 'station': pairKey, 'routeData': [] }
                    InProgressRoutes[pairKey].forEach(route => {
                        let split = route.progress.split('/')
                        let percent = Math.floor(100 * ((split[0] / split[1]).toFixed(2)))
                        stationObj.routeData.push({ 'route': route.route, percent })
                    })

                    sortedRoutes[parseInt(pairKey.substring(1)) - offset] = stationObj
                }
            })

            return sortedRoutes
        }
    }
}
</script>


<style lang="scss" scoped>

.st-list-container {
    padding: 0.5rem;
    scrollbar-width: thin;
    height: calc(#{$content-height} - 3.5rem);
    overflow:auto;
}

</style>