<template>
    <div class="columns st-fw">
        <div class="column is-3">
            <div class="columns is-gapless">
                <div class="column is-3">
                    <div class="st-fw">{{ contentData.route }}</div>
                </div>
                <div class="column auto"></div>
                <div class="column is-5">
                    <div class="columns is-gapless is-vcentered">
                        <div class="icon column is-6">
                            <span class="icon has-text-info">
                                <i class="fas fa-building"></i>
                            </span>
                        </div>
                        <div class="column">
                            <span>{{ contentData.station }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="column auto"></div>
        <div class="column is-6">
            <div class="columns is-gapless is-vcentered">
                <progress class="progress is-success column is-7" :value="contentData.percent" max="100">{{ contentData.percent }}</progress>
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
            if (this.contentData !== undefined && this.contentData.progress !== undefined) {
                let split = this.contentData.progress.split('/')
                return split[1] - split[0]
            }

            return 0
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
    padding-right: 2.5rem;
}

.st-mt {
    margin-top: .25rem !important;
}
</style>