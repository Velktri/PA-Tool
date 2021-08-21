<template>
    <div class="so-button" @click="auditCart">
        <div class="level">
            <div class="level-left">
                <span>{{ cartData.cartName }}</span>
            </div>

            <div class="level-right">
                <div class="tag" v-bind:class="statusMap[cartData.status]">{{ cartData.status }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cartData: {
            required: true,
            type: Object
        },
    },
    data() {
        return {
            statusMap: {
                'Staged': 'is-success',
                'Ready': 'is-warning',
                'Not Ready': 'is-light',
                'Missing': 'is-danger',
                'Sidelined': 'is-danger'
            },
        }
    },
}
</script>

<style lang="scss" scoped>

</style>