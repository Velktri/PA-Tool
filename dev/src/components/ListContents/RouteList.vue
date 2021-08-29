<template>
    <div class="columns st-fw">
        <div class="column">
            <span class="st-pr">{{ contentData.route }}</span>
            <span class="icon-text">
                <span class="icon has-text-info">
                    <i class="fas fa-building"></i>
                </span>
                <span class="st-pr">{{ contentData.station }}</span>
            </span>
        </div>
        <div class="column auto"></div>
        <div class="column is-6">
            <div class="columns is-gapless">
                <progress class="progress is-success column is-7 st-mt" :value="contentData.percent" max="100">{{ contentData.percent }}</progress>
                <div class="column">{{ contentData.percent }}%</div>
                <div class="icon-text column">
                    <span class="icon has-text-success">
                        <i class="fas fa-box-open"></i>
                    </span>
                    <span>{{ remainingPackages }}</span>
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
        },

        barColor() {

        }
    }
}
</script>

<style lang="scss" scoped>
.st-fw {
    width: 100%;
}

.st-pr {
    padding-right: 1.5rem;
}

.st-mt {
    margin-top: .25rem !important;
}
</style>