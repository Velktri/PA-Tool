<template>
    <div class="columns st-fw">
        <div class="column">
            <span class="st-pr">{{ contentData.route }}</span>
            <span class="icon-text">
                <span class="icon has-text-info">
                    <i class="fas fa-building"></i>
                </span>
                <span>{{ contentData.station }}</span>
            </span>
        </div>
        <div class="column auto"></div>
        <div class="column st-mr">
            <span class="st-pr">{{ contentData.percent }}%</span>
            <span class="icon-text">
                <span class="icon has-text-success">
                    <i class="fas fa-box-open"></i>
                </span>
                <span>{{ remainingPackages }}</span>
            </span>
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
.st-fw {
    width: 100%;
}

.st-pr {
    padding-right: 1.5rem;
}

.st-mr {
    margin-right: 1rem;
}
</style>