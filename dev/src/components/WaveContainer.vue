<template>
    <div v-if="isWaveEmpty(waveTime.wave)">
        <div class="title is-3 st-mb st-mt">
            {{ waveTitle(waveTime.index) }}
        </div>
        <RouteListContainer v-for='(route, j) in getRouteDataFromWave(waveTime.wave)'
                            :key='j'
                            :id='j'
                            :isSelected='route.route === selectedRoute'
                            :contentData='route'
        />
    </div>
</template>

<script>
import RouteListContainer from "./ListContentsContainer.vue"

export default {
    components: {
        RouteListContainer
    },

    props: {
        waveTime: {
            required: true,
            type: Object
        }
    },

    computed: {
        selectedRoute() {
            return this.$store.getters.getSelectedRouteID
        }
    },

    methods: {
        waveTitle(id) {
            if (this.$store.getters.getWaveTimeByID(id)) {
                return  'Wave ' + id + 
                        ' - (' + this.$store.getters.getWaveTimeByID(id) + ') - ' + 
                        this.timeRemaining(id) + ' Minutes Left'
            }

            return ''
        },

        timeRemaining(id) {
            let date = new Date()

            let curTime = { hour: date.getHours(), minute: date.getMinutes() }
            let waveTime = { 
                hour: parseInt(this.$store.getters.getWaveTimeByID(id).split(':')[0]),
                minute: parseInt(this.$store.getters.getWaveTimeByID(id).split(':')[1])
            }

            let hourDiff = waveTime.hour - curTime.hour
            let minDiff = waveTime.minute - curTime.minute


            return (hourDiff * 60) + minDiff
        },
        
        isWaveEmpty(wave) {
            return this.$store.getters.getFilteredInProgressRoutesFromWave(wave).length > 0
        },

        getRouteDataFromWave(waveTime) {
            let unsortedRoutes = this.$store.getters.getFilteredInProgressRoutesFromWave(waveTime)

            let filterType = this.$store.getters.getSelectedRouteFilter
            if (filterType === 'percentage') {
                unsortedRoutes.sort((x, y) => {
                    if (x.percent < y.percent) { return 1 }
                    if (x.percent > y.percent) { return -1 }

                    return 0
                })
            } else if (filterType === 'packages') {
                unsortedRoutes.sort((x, y) => {
                    let xRemain = x.progress.split('/')[1] - x.progress.split('/')[0]
                    let yRemain = y.progress.split('/')[1] - y.progress.split('/')[0]
                    if (xRemain < yRemain) { return -1 }
                    if (xRemain > yRemain) { return 1 }

                    return 0
                })
            }

            return unsortedRoutes
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>