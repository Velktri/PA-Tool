<template>
    <div class="columns is-gapless">
        <div class="column is-1">
            <Sidebar />
        </div>
        <div class="column">
            <div class="header">
                header
            </div>
            <div class="container is-fluid">
                <div class="overview">
                    <div class="box">
                        
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="routeFilter" value="percentage" v-model="routeFilter" checked>
                                Percentage Remaining
                            </label>
                            <label class="radio">
                                <input type="radio" name="routeFilter" value="packages" v-model="routeFilter">
                                Packages Remaining
                            </label>
                        </div>
                    </div>
                </div>
                <div class="columns content">
                    
                    <div class="column is-4">
                        <PriorityList />
                    </div>

                    <div class="column">
                        <StationDetailsContainer />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue"
import PriorityList from "./components/PriorityList.vue"
import StationDetailsContainer from "./components/StationDetailsContainer.vue"

export default {
    name: "App",
    components: {
        Sidebar,
        PriorityList,
        StationDetailsContainer
    },

    computed: {
        routeFilter: {
            get() {
                return this.$store.getters.getSelectedRouteFilter;
            },
            set(filter) {
                this.$store.commit("setSelectedRouteFilter", filter);
            }
        }
    },

    methods: {
        processStationData() {
            browser.storage.local.get('ST_STATION_PAIR_DATA').then((res) => {
                this.$store.commit('setStationData', { stationPairData: res.ST_STATION_PAIR_DATA })
            })
        },

        processCartData() {
            browser.storage.local.get('ST_CART_DATA').then((res) => {
                this.$store.commit('setCartData', { cartData: res.ST_CART_DATA })
            })
        }
    },

    async created() {
        browser.runtime.onMessage.addListener((res) => {
            if (res.command === 'ST_STATION_DATA_UPDATED') {
                this.processStationData()
            }

            if (res.command === 'ST_CART_DATA_UPDATED') {
                this.processCartData()
            }
        })
    },
}
</script>

<style lang="scss">

.header {
    height: $header-height2;
    background-color: $test-color;
}

.overview {
    height: $overview-height;
}

.content {
    height: calc(#{$content-height} + 0.75rem);
}

</style>
