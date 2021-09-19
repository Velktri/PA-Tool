<template>
    <div class="container is-fluid">
        <div class="overview">
            <div class="columns">
                <div class="column is-4">
                    <div class="box st-max-height">
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

                <div class="column is-4">
                    <div class="box st-max-height">
                    </div>
                </div>
                <div class="column is-4">
                    <div class="box st-max-height">
                        <div class="title is-2">{{ $store.getters.getSelectedStationPair }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns content">
            <div class="column is-4">
                <PriorityList />
            </div>
            <div class="column is-4">
                <StationContainer />
            </div>

            <div class="column is-4">
                <StationDetailsContainer />
            </div>
        </div>
    </div>
</template>

<script>

import StationContainer from "./components/StationContainer.vue"
import PriorityList from "./components/PriorityList.vue"
import StationDetailsContainer from "./components/StationDetailsContainer.vue"
import RangeSlider from "./components/Utils/RangeSlider.vue"
import { _pickData, _stageData } from './api/test.js'

export default {
    name: "App",
    components: {
        PriorityList,
        StationContainer,
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
        }
    },

    methods: {
        processStationData() {
            browser.storage.local.get('ST_STATION_PAIR_DATA').then((res) => {
                this.$store.dispatch('processPickData', res.ST_STATION_PAIR_DATA)
            })
        },

        processCartData() {
            browser.storage.local.get('ST_CART_DATA').then((res) => {
                this.$store.dispatch('processCartData', res.ST_CART_DATA)
            })
        }
    },

    async created() {
        if (process.env.NODE_ENV == 'development') {
            this.$store.dispatch('processPickData', _pickData)
            this.$store.dispatch('processCartData', _stageData)
        } else {
            browser.runtime.onMessage.addListener((res) => {
                if (res.command === 'ST_STATION_DATA_UPDATED') {
                    this.processStationData()
                }

                if (res.command === 'ST_CART_DATA_UPDATED') {
                    this.processCartData()
                }
            })
        }
    },
}
</script>

<style lang="scss">

.overview {
    height: $overview-height;
    padding-top: 1rem;
}

.content {
    height: #{$content-height};
    padding-top: 1.5rem;
}

.st-max-height {
    height: 100%;
}

</style>
