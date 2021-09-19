const mutations = {
    updateStationData(state, payload) {
        state.stationPairData = { ...state.stationPairData, ...payload.stationData }
    },

    updateCartData(state, payload) {
        state.cartData = { ...state.cartData, ...payload.cartData }
    },

    setSelectedStationPair(state, payload) {
        state.selectedStationPair = payload.stationPair
    },

    setSelectedRouteFilter(state, filter) {
        state.selectedRouteFilterType = filter
    },

    setMinFilterRange(state, payload) {
        state.minFilterRange = payload.range
    },
    setMaxFilterRange(state, payload) {
        state.maxFilterRange = payload.range
    },
    setWaveTimes(state, payload) {
        state.waveTimes = payload.waveTimes
    },
    setCurrentWaveIndex(state, payload) {
        state.currentWaveIndex = payload.index
    },
    setSelectedRouteID(state, payload) {
        state.selectedRouteID = payload.routeID
    },
    setMaxStationAmount(state, payload) {
        state.maxStationAmount = payload.newMax
    }
}

export default mutations