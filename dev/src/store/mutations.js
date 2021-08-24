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
    },
    setSelectedListType(state, type) {
        state.selectedListType = type
    },

    setMinFilterRange(state, payload) {
        state.minFilterRange = payload.range
    },
    setMaxFilterRange(state, payload) {
        state.maxFilterRange = payload.range
    }
}

export default mutations