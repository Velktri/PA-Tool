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

            if (routeObj !== undefined) {
                return routeObj.route
            }
        }

        return ''
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
    },

    getStageLocationFromRoute: state => route => {
        if (state.cartData[route] !== undefined) {
            return state.cartData[route].loc
        }

        return ''
    },

    getShortestDwellTimeFromRoute: state => route => {
        if (state.cartData[route] !== undefined) {
            let dwellTimes = state.cartData[route].carts.filter(cart => cart.dwellTime !== '...').map(cart => cart.dwellTime)

            if (dwellTimes.length > 0) {
                dwellTimes.sort((x, y) => {
                    let xTime = { 'minutes': parseInt(x.split(':')[0]), 'seconds': parseInt(x.split(':')[1]) }
                    let yTime = { 'minutes': parseInt(y.split(':')[0]), 'seconds': parseInt(y.split(':')[1]) }
    
                    if (xTime.minutes > yTime.minutes) { return 1 }
                    if (xTime.minutes < yTime.minutes) { return -1 }
    
                    if (xTime.minutes === yTime.minutes) {
                        if (xTime.seconds > yTime.seconds) { return 1 }
                        if (xTime.seconds < yTime.seconds) { return -1 }
                    }
    
                    return 0
                })
    
                return dwellTimes[0]
            }
        }

        return ''
    },

    doesStationHaveReadyCarts: state => station => {
        if (state.stationPairData[station] !== undefined) {
            for (let i = 0; i < state.stationPairData[station].length; i++) {
                let routeObj = state.stationPairData[station][i]
                if (state.cartData[routeObj.route] !== undefined) {
                    if (state.cartData[routeObj.route].carts.find(cart => cart.status === 'Ready') !== undefined) {
                        return true
                    }
                }
            }
        }
        
        return false
    }
}

export default getters