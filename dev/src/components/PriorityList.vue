<template>
    <div class="box">
        <div v-if="$store.getters.getSelectedListType === 'routes'" class="priority-css st-list-container">
            <div class="st-mt" v-for="(wave, i) in waveTimes" :key="i">
                <WaveContainer :waveTime="{ wave, 'index': i }" />
            </div>
        </div>
        <div v-else>
            <div class="priority-css st-list-container">
                <RouteListContainer v-for="(route, i) in stationList()"
                                            :key="i"
                                            :id="i"
                                            :isSelected="route.station === selectionStation"
                                            :contentData="route"
                />
            </div>
        </div>
    </div>
</template>

<script>
import RouteListContainer from "./ListContentsContainer.vue"
import WaveContainer from './WaveContainer.vue'

export default {
    components: {
        RouteListContainer,
        WaveContainer
    },

    computed: {
        selectionStation() {
            return this.$store.getters.getSelectedStationPair
        },

        waveTimes() {
            return this.$store.getters.getAllWaveTimes
        }
    },
    
    methods: {
        filterRoutes(routes) {
            let filteredRoutes = {}
            let minRange = this.$store.getters.getMinFilterRange
            let maxRange = this.$store.getters.getMaxFilterRange
            
            Object.keys(routes).forEach((stationID) => {
                let stationNum = parseInt(stationID.substring(1))
                if (stationNum >= minRange && stationNum <= maxRange) {
                    filteredRoutes = { ...filteredRoutes, ...{ [stationID]: routes[stationID] }}
                }
            })

            return filteredRoutes
        },

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

.st-mt:not(:first-child) {
    margin-top: 1.5rem !important;
}

.st-mb {
    margin-bottom: 1rem !important;
}

.st-buffer {
    height: 50px;
}
</style>