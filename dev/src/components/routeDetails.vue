<template>
    <div v-if="routeDetails !== undefined" class="card">
        <header class="card-header">
            <div class="level st-fill-width">
                <div class="card-header-title st-title-font level-left">
                    {{ routeDetails.route }}
                </div>

                <div class="card-header-title st-title-font level-right columns">
                    <div class="columm">
                        <div>{{ routeDetails.progress }}</div>
                        <div>{{ progressPercent }}</div>
                    </div>
                </div>
            </div>
        </header>

        <div class="card-content">
            <div class="" v-for="(cart, i) in getCarts()" :key="i">
                <CartDetails :cartData="cart" />
            </div>
        </div>
    </div>

    <div v-else></div>
</template>

<script>
import CartDetails from './CartDetails.vue'

export default {
    components: {
        CartDetails
    },

    props: {
        routeDetails: {
            required: true,
            type: Object
        }
    },

    computed: {
        progressPercent() {
            let split = this.routeDetails.progress.split('/')
            return Math.floor(100 * ((split[0] / split[1]).toFixed(2))) + '%'
        }
    },

    methods: {
        getCarts() {
            return this.$store.getters.getCartsFromRoute(this.routeDetails.route)
        }
    }
}
</script>

<style lang="scss" scoped>
.card-content {
    padding: 0.55rem 0.6rem;
}

.st-title-font {
    font-size: 125%;
}
.st-fill-width {
    width: 100%;
}
</style>