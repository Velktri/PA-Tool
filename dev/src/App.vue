<template>
    <div class="columns is-gapless">
        <div class="column is-1">
            <Sidebar />
        </div>

        <div class="column is-4">
            <PriorityList />
        </div>

        <div class="column">
            <StationDetailsContainer />
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
