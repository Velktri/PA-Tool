const mutations = {
    setStationData(state, payload) {
        //console.log(payload.stationPairData)
        state.stationPairData = payload.stationPairData
    },

    setCartData(state, payload) {
        //console.log(payload.cartData)
        state.cartData = payload.cartData
    }
}

export default mutations