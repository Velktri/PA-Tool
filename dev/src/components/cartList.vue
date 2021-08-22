<template>
    <div class="st-cart-list">
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
$padding-y: calc(.20em - 1px);
$padding-x: 0.15em;

.st-cart-list {
    border-radius: .4em;
    border: 1px solid transparent;
    padding-bottom: $padding-y;
    padding-left: $padding-x;
    padding-right: $padding-x;
    padding-top: $padding-y;
    user-select:none;
}
</style>