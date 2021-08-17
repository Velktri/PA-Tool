<template>
    <div>
        <div class="tile">
            <div class="tile is-1">
                <div class="tile">
                    <Sidebar />
                </div>
            </div>

            <div class="tile">
                <div class="tile container is-vertical">
                    <PriorityList />
                </div>
            </div>

            <div class="tile is-vertical">
                <div class="tile">
                    <StationDetails />
                </div>

                <div class="tile">
                    <StationDetails />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue"
import PriorityList from "./components/PriorityList.vue"
import StationDetails from "./components/StationDetails.vue"

export default {
    name: "App",
    components: {
        Sidebar,
        PriorityList,
        StationDetails
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

</style>
