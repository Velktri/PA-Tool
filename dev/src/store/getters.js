const getters = {
    getInProgressRoutes: state => {
        let stationPairs = state.stationPairData
        let filteredStationPairs = {}

        Object.keys(stationPairs).forEach((pair) => {
            let filter = stationPairs[pair].filter(element => element.status === 'In Progress')
            filteredStationPairs = {...filteredStationPairs, ...{ [pair]: filter }}
        })

        return filteredStationPairs
    },

    getCartsInRoute: state => routeCode => {
        return (state.cartData[routeCode] !== undefined) ? state.cartData[routeCode] : []
    },

    getRoutesFromStation: state => {
        return state.stationPairData[state.selectedStationDetails]
    }
}

export default getters