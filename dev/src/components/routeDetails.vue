<template>
    <div v-if="routeDetails !== undefined" class="card mt-2">
        <header class="card-header">
            <div class="columns st-fill-width card-header-title is-centered">
                <div class="column st-title-font is-narrow">
                    {{ stageLoc(routeDetails.route) }}
                </div>

                <div class=" st-title-font has-text-centered column auto">
                    <div>
                        {{ routeDetails.route }}
                    </div>
                </div>

                <div v-if="routeDetails.status === 'In Progress'" class="st-title-font column is-narrow">
                    <div> {{ routeDetails.progress }} </div>
                </div>
                <div v-else :class="statusMap[routeDetails.status]" class="st-route-tag tag st-title-font column is-narrow">
                        <div> {{ routeDetails.status }}</div>
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

    data() {
        return {
            statusMap: {
                'Picked': 'is-success',
                'Route Cut': 'is-warning',
            },
        }
    },

    computed: {
        progressPercent() {
            let split = this.routeDetails.progress.split('/')
            return Math.floor(100 * ((split[0] / split[1]).toFixed(2))) + '%'
        }
    },

    methods: {
        stageLoc(route) {
            let loc = this.$store.getters.getStageLocationFromRoute(route)
            if (loc !== '' && loc !== undefined) {
                let locSplit  = loc.split('.')
                if (locSplit[0] === 'STG') {
                    return locSplit[1]
                }
            }

            return 'N/A'
        },
    
        setDwellTime(route) {
            return this.$store.getters.getShortestDwellTimeFromRoute(route)
        },

        getCarts() {
            return this.$store.getters.getCartsInRoute(this.routeDetails.route)
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    max-width: 99%;
}

.card-content {
    padding: 0.55rem 0.6rem;
}

.st-title-font {
    font-size: 125%;
}
.st-fill-width {
    width: 100%;
}
$padding-y: calc(1rem - 1px);
$padding-x: .5rem;

.st-route-tag {
    border-radius: .4em;
    border: 1px solid transparent;
    padding-bottom: $padding-y;
    padding-left: $padding-x;
    padding-right: $padding-x;
    padding-top: $padding-y;
    user-select:none;
    font-size: .85rem;
    margin-right: .5rem;
}
</style>