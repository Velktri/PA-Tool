import { createStore } from "vuex";
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default createStore({
    state: {
        stationPairData: {
            'P05': [
                { route: 'CX115', status: 'In Progress', progress: '273/277' },
                { route: 'CX173', status: 'In Progress', progress: '82/248' },
                { route: 'CX41', status: 'Picked', progress: '236/236' },
                { route: 'CX45', status: 'Picked', progress: '313/314' }
            ],

            'P10': [
                { route: 'CX110', status: 'In Progress', progress: '238/250' },
                { route: 'CX149', status: 'In Progress', progress: '31/154' },
                { route: 'CX44', status: 'Picked', progress: '264/265' },
                { route: 'CX52', status: 'Picked', progress: '252/256' }
            ],
            'P14': [
                { route: 'CX83', status: 'Picked', progress: '301/302' },
                { route: 'CX170', status: 'Picked', progress: '262/262' },
                { route: 'CX26', status: 'RouteCut', progress: '253/255' },
                { route: 'CX17', status: 'RouteCut', progress: '233/235' }
            ],
            'P12': [
                { route: 'CX99', status: 'RouteCut', progress: '185/185' },
                { route: 'CX245', status: 'In Progress', progress: '91/265' },
                { route: 'CX197', status: 'In Progress', progress: '91/278' },
                { route: 'CX18', status: 'RouteCut', progress: '241/242' },
                { route: 'CX8', status: 'Picked', progress: '245/247' },
                { route: 'CX106', status: 'Picked', progress: '251/254' }
            ]

        },
        cartData: {}
    },
    mutations,
    actions,
    getters,
});
