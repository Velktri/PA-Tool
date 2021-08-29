const actions = {
    processCartData({ commit }, cartData) {
        commit('updateCartData', { cartData })

        let waveSet = {}
        Object.keys(cartData).forEach(route => {
            waveSet = { ...waveSet, ...{ [cartData[route].waveTime]: 0 }}
        })

        let sortedWaves = Object.keys(waveSet).sort((x, y) => {
            let xTime = x.split(':')
            let yTime = y.split(':')

            let xHour = parseInt(xTime[0])
            let yHour = parseInt(yTime[0])

            // hours
            if (xHour < yHour)
            {
                return -1
            }
            else if (xHour > yHour)
            {
                return 1
            }

            // mintues
            if (xHour === yHour)
            {
                let xMinute = parseInt(xTime[1])
                let yMinute = parseInt(yTime[1])

                if (xMinute < yMinute)
                {
                    return -1
                }

                if (xMinute > yMinute)
                {
                    return 1
                }
            }

            return 0

        })

        commit('setWaveTimes', { 'waveTimes': sortedWaves })


        let date = new Date()
        let curTime = { hour: date.getHours(), minute: date.getMinutes() }
        let currentWaveIndex = sortedWaves.findIndex(time => {
            if (parseInt(curTime.hour) < parseInt(time.split(':')[0])) {
                return true
            }
            else if (parseInt(curTime.hour) === parseInt(time.split(':')[0]))
            {
                if (parseInt(curTime.minute) <= parseInt(time.split(':')[1]))
                {
                    return true
                }
            }

            return false
        })

        commit('setCurrentWaveIndex', { 'index': currentWaveIndex })
    },

    processPickData({ commit, state }, pickData) {
        commit('updateStationData', { 'stationData': pickData })

        let arr = Object.keys(pickData).sort((x, y) => {
            let xStation = parseInt(x.substring(1))
            let yStation = parseInt(y.substring(1))

            if (xStation < yStation) { return -1 }
            if (xStation > yStation) { return 1 }
        })

        let maxNum = parseInt(arr[arr.length - 1].substring(1))
        if (maxNum > state.maxStationAmount) {
            commit('setMaxStationAmount', { 'newMax': maxNum })
        }
    }
}

export default actions