import { createStore } from "vuex";
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default createStore({
    state: {
        stationPairData: {},
        cartData: {},
        selectedStationPair: 'P01',
        selectedRouteID: '',
        selectedRouteFilterType: 'percentage',
        selectedListType: 'routes',

        maxStationAmount: -1,
        
        minFilterRange: 1,
        maxFilterRange: 19,
        currentWaveIndex: 0,
        waveTimes: []
    },
    mutations,
    actions,
    getters,
});


