<template>
    <div class="st-p-r">{{ contentData.station }}</div>

    <div class="st-p-r" v-for="(data, i) in contentData.routeData" :key="i">
        <span class="">{{ data.route }}&nbsp;</span>
        <span class="st-p-r">{{ data.percent }}%</span>
    </div>

    <div v-if="contentData.routeData.length < 2">
        <span class="icon has-text-danger">
            <i class="fas fa-info-circle"></i>
        </span>
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
</style>