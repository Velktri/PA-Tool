import { createStore } from "vuex";
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default createStore({
    state: {
        stationPairData: {},
        cartData: {}
    },
    mutations,
    actions,
    getters,
});
