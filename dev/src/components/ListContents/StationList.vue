<template>
    <div class="columns is-gapless st-fw">
        <div class="column is-2">
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

        <div class="column is-2">
            <div v-if="contentData.routeData.length < 2">
                <span class="icon has-text-danger">
                    <i class="fas fa-info-circle"></i>
                </span>
            </div>
            <div v-else>
                <span class="icon has-text-success">
                    <i class="far fa-check-circle"></i>
                </span>
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
    }
}
</script>

<style lang="scss" scoped>
.st-p-r {
    padding-right: 1.5rem;
}

.st-fw {
    width: 100%;
}
</style>