<template>
    <div class="columns is-gapless">
        <div class="column is-1">
            <Sidebar />
        </div>
        <div class="column">
            <div class="container is-fluid">
                <div class="overview">
                    <div class="columns">
                        <div class="column is-1">
                            <div class="box">
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" name="listType" value="routes" v-model="listType" checked>
                                        Routes
                                    </label><br />
                                    <label class="radio">
                                        <input type="radio" name="listType" value="stations" v-model="listType">
                                        Stations
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="box">
                                <div class="columns is-gapless">
                                    <div class="column">
                                        <div class="control">
                                            <label class="radio">
                                                <input type="radio" name="routeFilter" value="percentage" v-model="routeFilter" checked>
                                                Percentage
                                            </label><br />
                                            <label class="radio">
                                                <input type="radio" name="routeFilter" value="packages" v-model="routeFilter">
                                                Remaining Packages
                                            </label>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <RangeSlider />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="box">
                                <div class="title is-2">{{ $store.getters.getSelectedStationPair }}</div>
                            </div>
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
import RangeSlider from "./components/Utils/RangeSlider.vue"

export default {
    name: "App",
    components: {
        Sidebar,
        PriorityList,
        StationDetailsContainer,
        RangeSlider
    },

    computed: {
        routeFilter: {
            get() {
                return this.$store.getters.getSelectedRouteFilter
            },
            set(filter) {
                this.$store.commit("setSelectedRouteFilter", filter)
            }
        },

        listType: {
            get() {
                return this.$store.getters.getSelectedListType
            },
            set(type) {
                this.$store.commit("setSelectedListID", { id: 0 })
                this.$store.commit("setSelectedListType", type)
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

.overview {
    height: $overview-height;
    margin-top: 2rem;
}

.content {
    height: calc(#{$content-height} + 0.75rem);
}

</style>
