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

    getFilteredInProgressRoutesFromWave: state => wave => {
        let routes = []
        Object.keys(state.stationPairData).forEach(stationPair => {
            let stationNum = parseInt(stationPair.substring(1))
            if (stationNum >= state.minFilterRange && stationNum <= state.maxFilterRange) 
            {
                let filtered = state.stationPairData[stationPair].filter(routeData => {
                    if (state.cartData[routeData.route] !== undefined &&
                        routeData.status === 'In Progress' &&
                        state.cartData[routeData.route].waveTime === wave) 
                        {
                            return true
                        }
                    return false
                })

                let convertedRouteList = []
                filtered.forEach(route => {
                    let split = route.progress.split('/')
                    let percent = Math.floor(100 * ((split[0] / split[1]).toFixed(2)))

                    convertedRouteList.push({ 'station': stationPair, 'progress': route.progress, percent, 'route': route.route })
                })
        

                routes = routes.concat(convertedRouteList)
            }
        })

        return routes
    },

    getInProgressRouteFromStation: state => station => {
        if (state.stationPairData[station] !== undefined) {
            let routeObj = state.stationPairData[station].find(routeData => {
                return routeData.status === 'In Progress'
            })

            return routeObj.route
        }
    },

    getCartsInRoute: state => routeCode => {
        return (state.cartData[routeCode] !== undefined) ? state.cartData[routeCode].carts : []
    },

    getRoutesFromStation: state => {
        if (state.stationPairData[state.selectedStationPair] !== undefined) {
            return state.stationPairData[state.selectedStationPair]
        }

        return []
    },

    getSelectedStationPair: state => {
        return state.selectedStationPair
    },

    getSelectedRouteID: state => {
        return state.selectedRouteID
    },

    getSelectedRouteFilter: state => {
        return state.selectedRouteFilterType
    },

    getSelectedListType: state => {
        return state.selectedListType
    },

    getMinFilterRange: state => {
        return state.minFilterRange
    },

    getMaxFilterRange: state => {
        return state.maxFilterRange
    },

    getAllWaveTimes: state => {
        return state.waveTimes
    },

    getCurrentWaveIndex: state => {
        return state.currentWaveIndex
    },
    
    getCurrentWaveTime: state => {
        if (state.waveTimes[state.currentWaveIndex]) {
            return state.waveTimes[state.currentWaveIndex]
        }

        return ''
    },

    getWaveTimeFromRoute: state => routeCode => {
        if (state.cartData[routeCode] !== undefined) {
            return state.cartData[routeCode].waveTime
        }

        return ''
    },

    getWaveTimeByID: state => id => {
        return state.waveTimes[id]
    },

    getMaxStations: state => {
        return state.maxStationAmount
    }
    
}

export default getters