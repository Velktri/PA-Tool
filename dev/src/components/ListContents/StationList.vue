<template>
    <div class="columns is-gapless st-fw">
        <div class="column is-1">
            <div class="st-p-r">{{ contentData.station }}</div>
        </div>


        <div class="column">
            <div class="columns is-gapless">
                <div class="column" v-if="contentData.routeData.length >= 1">
                    <span>{{ contentData.routeData[0].route }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <span>{{ contentData.routeData[0].percent }}%</span>
                </div>
                <div class="column" v-else>
                    <span class="icon has-text-danger">
                        <i class="fas fa-info-circle"></i>
                    </span>
                </div>
                <div class="column" v-if="contentData.routeData.length >= 2">
                    <span>{{ contentData.routeData[1].route }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <span>{{ contentData.routeData[1].percent }}%</span>
                </div>
                <div class="column" v-else>
                    <span class="icon has-text-danger">
                        <i class="fas fa-info-circle"></i>
                    </span>
                </div>
            </div>
        </div>

        <div class="column is-2">
            <div class="columns">
                <div class="column"></div>
                <div v-for="(readyRoute, i) in $store.getters.getReadyRoutesFromStation(contentData.station)" :key="i" class="column is-narrow">
                    <span :class="setIconColor(readyRoute)" class="icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        contentData: {
            required: true,
            type: Object
        }
    },

    data() {
        return {
            iconColorMap: {
                '3': 'has-text-success',
                '5': 'has-text-warning',
                '999': 'has-text-danger',
            },
        }
    },

    computed: {
        remainingPackages() {
            let split = this.contentData.progress.split('/')
            return split[1] - split[0]
        },
    },

    methods: {
        setIconColor(readyRoute) {
            let dwellTime = this.$store.getters.getShortestDwellTimeFromRoute(readyRoute)
            dwellTime = (dwellTime === '...') ? 0 : dwellTime = parseInt(dwellTime.split(':')[0])
            return this.iconColorMap[Object.keys(this.iconColorMap).find(key => parseInt(key) > dwellTime)]
        }
    }
}
</script>

<style lang="scss" scoped>
.st-p-r {
    padding-right: 1.5rem;
}

.st-fw {
    width: 100%;
    padding: 0rem .75rem;
}
</style>