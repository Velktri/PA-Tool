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
                <div class="column" v-if="contentData.routeData.length >= 2">
                    <span>{{ contentData.routeData[1].route }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <span>{{ contentData.routeData[1].percent }}%</span>
                </div>
                <div class="column" v-else></div>
            </div>
        </div>

        <div class="column is-1">
            <div class="columns">
                <div class="column">
                    <span v-if="checkCartStatus(contentData.station)" class="icon has-text-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    <span v-else></span>
                </div>
                <div v-if="contentData.routeData.length < 2" class="column">
                    <span class="icon has-text-danger">
                        <i class="fas fa-info-circle"></i>
                    </span>
                </div>
                <div v-else class="column">
                    <span class="icon has-text-success">
                        <i class="far fa-check-circle"></i>
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

    computed: {
        remainingPackages() {
            let split = this.contentData.progress.split('/')
            return split[1] - split[0]
        }
    },

    methods: {
        checkCartStatus(station) {
            return this.$store.getters.doesStationHaveReadyCarts(station)
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