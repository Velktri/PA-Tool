const mutations = {
    setStationData(state, payload) {
        state.stationPairData = payload.stationPairData
    },

    setCartData(state, payload) {
        state.cartData = payload.cartData
    },

    setSelectedRouteDetails(state, payload) {
        state.selectedStationDetails = payload.stationPair
    }
}

export default mutations