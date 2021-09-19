<template>
    <div class="box">
        <div class="st-list-container">
            <div class="st-mt" v-for="(wave, i) in waveTimes" :key="i">
                <WaveContainer :waveTime="{ wave, 'index': i }" />
            </div>
        </div>
    </div>
</template>

<script>
import WaveContainer from './WaveContainer.vue'

export default {
    components: {
        WaveContainer
    },

    computed: {
        waveTimes() {
            return this.$store.getters.getAllWaveTimes
        }
    },
    
    /*methods: {
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
        }
    }*/
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