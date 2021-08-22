const mutations = {
    setStationData(state, payload) {
        state.stationPairData = payload.stationPairData
    },

    setCartData(state, payload) {
        state.cartData = payload.cartData
    },

    setSelectedStationPair(state, payload) {
        state.selectedStationPair = payload.stationPair
    },

    setSelectedListID(state, payload) {
        state.selectedListIndex = payload.id
    },

    setSelectedRouteFilter(state, filter) {
        state.selectedRouteFilterType = filter
    }
}

export default mutations