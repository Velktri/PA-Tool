<template>
    <div v-if="routeDetails !== undefined" class="card">
        <header v-if="Object.keys(routeDetails).length > 0" class="card-header">
            <p class="card-header-title so-title-font">
                {{ routeDetails.route }}
            </p>

            <p class="card-header-title so-title-font">
                {{ routeDetails.progress }} | {{ progressPercent }}
            </p>
        </header>

        
        <header v-else class="card-header">
            <p class="card-header-title so-title-font is-centered">
                Empty
            </p>
        </header>
        <div class="card-content">
            <div class="" v-for="(cart, i) in getCarts()" :key="i">
                <CartList :cartData="cart" />
            </div>
        </div>
    </div>

    <div v-else></div>
</template>

<script>
import CartList from './cartList.vue'

export default {
    components: {
        CartList
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

</style>