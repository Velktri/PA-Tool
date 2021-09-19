<template>
    <div v-if="isWaveEmpty(waveTime.wave)">
        <div class="title is-3 st-mb st-mt">
            <div class="level st-px">
                <div class="level-left">
                    {{ waveTitle(waveTime.index) }}
                </div>
                <div class="level-right">
                    {{ timeRemaining(waveTime.index) }}
                </div>
            </div>
        </div>
        <RouteListContainer v-for='(route, j) in getRouteDataFromWave(waveTime.wave)'
                            :key='j'
                            :id='j'
                            :isSelected='route.route === selectedRoute'
                            :contentData='route'
                            :listType='"routes"'
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
                return  'Wave ' + id + ' - (' + this.$store.getters.getWaveTimeByID(id) + ')'
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


            let remainingTime = (hourDiff * 60) + minDiff
            return (remainingTime >= 0) ? remainingTime  + ' Minutes Left' : (remainingTime * -1) + ' Minutes Past'
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
.st-px {
    padding: 0rem 0.5rem;
}
</style>