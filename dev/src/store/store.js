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
            'P21': [
                { route: 'CX99', status: 'RouteCut', progress: '185/185' },
                { route: 'CX245', status: 'In Progress', progress: '91/265' },
                { route: 'CX197', status: 'In Progress', progress: '278/278' },
                { route: 'CX18', status: 'RouteCut', progress: '241/242' },
                { route: 'CX8', status: 'Picked', progress: '245/247' },
                { route: 'CX106', status: 'Picked', progress: '251/254' },
                { route: 'CX18', status: 'RouteCut', progress: '241/242' },
                { route: 'CX8', status: 'Picked', progress: '245/247' },
                { route: 'CX106', status: 'Picked', progress: '251/254' },
                { route: 'CX18', status: 'RouteCut', progress: '241/242' },
                { route: 'CX8', status: 'Picked', progress: '245/247' },
                { route: 'CX106', status: 'Picked', progress: '251/254' }
            ],
            'P08': [
                { route: 'CX115', status: 'In Progress', progress: '273/277' },
                { route: 'CX173', status: 'In Progress', progress: '82/248' },
                { route: 'CX41', status: 'Picked', progress: '236/236' },
                { route: 'CX45', status: 'Picked', progress: '313/314' }
            ],
            'P20': [
                { route: 'CX110', status: 'In Progress', progress: '238/250' },
                { route: 'CX149', status: 'In Progress', progress: '31/154' },
                { route: 'CX44', status: 'Picked', progress: '264/265' },
                { route: 'CX52', status: 'Picked', progress: '252/256' }
            ],
            'P19': [
                { route: 'CX83', status: 'Picked', progress: '301/302' },
                { route: 'CX170', status: 'Picked', progress: '262/262' },
                { route: 'CX26', status: 'RouteCut', progress: '253/255' },
                { route: 'CX17', status: 'RouteCut', progress: '233/235' }
            ],            
            'P07': [
                { route: 'CX115', status: 'In Progress', progress: '273/277' },
                { route: 'CX173', status: 'In Progress', progress: '82/248' },
                { route: 'CX41', status: 'Picked', progress: '236/236' },
                { route: 'CX45', status: 'Picked', progress: '313/314' }
            ],
            'P18': [
                { route: 'CX110', status: 'In Progress', progress: '238/250' },
                { route: 'CX149', status: 'In Progress', progress: '31/154' },
                { route: 'CX44', status: 'Picked', progress: '264/265' },
                { route: 'CX52', status: 'Picked', progress: '252/256' }
            ],
            'P17': [
                { route: 'CX83', status: 'Picked', progress: '301/302' },
                { route: 'CX170', status: 'Picked', progress: '262/262' },
                { route: 'CX26', status: 'RouteCut', progress: '253/255' },
                { route: 'CX17', status: 'RouteCut', progress: '233/235' }
            ],            
            'P06': [
                { route: 'CX115', status: 'In Progress', progress: '273/277' },
                { route: 'CX173', status: 'In Progress', progress: '82/248' },
                { route: 'CX41', status: 'Picked', progress: '236/236' },
                { route: 'CX45', status: 'Picked', progress: '313/314' }
            ],
            'P16': [
                { route: 'CX110', status: 'In Progress', progress: '238/250' },
                { route: 'CX149', status: 'In Progress', progress: '31/154' },
                { route: 'CX44', status: 'Picked', progress: '264/265' },
                { route: 'CX52', status: 'Picked', progress: '252/256' }
            ],
            'P15': [
                { route: 'CX83', status: 'Picked', progress: '301/302' },
                { route: 'CX170', status: 'Picked', progress: '262/262' },
                { route: 'CX26', status: 'RouteCut', progress: '253/255' },
                { route: 'CX17', status: 'RouteCut', progress: '233/235' }
            ],            
            'P04': [
                { route: 'CX115', status: 'In Progress', progress: '273/277' },
                { route: 'CX173', status: 'In Progress', progress: '82/248' },
                { route: 'CX41', status: 'Picked', progress: '236/236' },
                { route: 'CX45', status: 'Picked', progress: '313/314' }
            ],
            'P03': [
                { route: 'CX110', status: 'In Progress', progress: '238/250' },
                { route: 'CX149', status: 'In Progress', progress: '31/154' },
                { route: 'CX44', status: 'Picked', progress: '264/265' },
                { route: 'CX52', status: 'Picked', progress: '252/256' }
            ],
            'P02': [
                { route: 'CX83', status: 'Picked', progress: '301/302' },
                { route: 'CX170', status: 'Picked', progress: '262/262' },
                { route: 'CX26', status: 'RouteCut', progress: '253/255' },
                { route: 'CX17', status: 'RouteCut', progress: '233/235' }
            ],            
            'P01': [
                { route: 'CX115', status: 'In Progress', progress: '273/277' },
                { route: 'CX173', status: 'In Progress', progress: '82/248' },
                { route: 'CX41', status: 'Picked', progress: '236/236' },
                { route: 'CX45', status: 'Picked', progress: '313/314' }
            ],
            'P11': [
                { route: 'CX110', status: 'In Progress', progress: '238/250' },
                { route: 'CX149', status: 'In Progress', progress: '31/154' },
                { route: 'CX44', status: 'Picked', progress: '264/265' },
                { route: 'CX52', status: 'Picked', progress: '252/256' }
            ],
            'P22': [
                { route: 'CX83', status: 'Picked', progress: '301/302' },
                { route: 'CX170', status: 'Picked', progress: '262/262' },
                { route: 'CX26', status: 'RouteCut', progress: '253/255' },
                { route: 'CX17', status: 'RouteCut', progress: '233/235' }
            ],
        },
        cartData: {
            'CX245': [
                {
                    cartName: 'CRT1-532-VND',
                    status: 'Ready'
                },
                {
                    cartName: 'CRT1-552-XLT',
                    status: 'Not Ready'
                },
                {
                    cartName: 'CRT1-119-WOT',
                    status: 'Staged'
                },
                {
                    cartName: 'CRT1-119-WIT',
                    status: 'Staged'
                }
            ],
            'CX197': [
                {
                    cartName: 'CRT1-532-VND',
                    status: 'Ready'
                },
                {
                    cartName: 'CRT1-552-XLT',
                    status: 'Not Ready'
                },
                {
                    cartName: 'CRT1-119-WOT',
                    status: 'Staged'
                }
            ],
            'CX99': [
                {
                    cartName: 'CRT1-532-VND',
                    status: 'Ready'
                },
                {
                    cartName: 'CRT1-552-XLT',
                    status: 'Not Ready'
                },
                {
                    cartName: 'CRT1-119-WOT',
                    status: 'Staged'
                }
            ],
            'CX18': [
                {
                    cartName: 'CRT1-532-VND',
                    status: 'Ready'
                },
                {
                    cartName: 'CRT1-552-XLT',
                    status: 'Not Ready'
                },
                {
                    cartName: 'CRT1-119-WOT',
                    status: 'Staged'
                }
            ],
            'CX8': [
                {
                    cartName: 'CRT1-532-VND',
                    status: 'Ready'
                },
                {
                    cartName: 'CRT1-552-XLT',
                    status: 'Not Ready'
                },
                {
                    cartName: 'CRT1-119-WOT',
                    status: 'Staged'
                }
            ],
            'CX106': [
                {
                    cartName: 'CRT1-532-VND',
                    status: 'Ready'
                },
                {
                    cartName: 'CRT1-552-XLT',
                    status: 'Not Ready'
                },
                {
                    cartName: 'CRT1-119-WOT',
                    status: 'Staged'
                }
            ],
        },
        selectedListIndex: 0,
        selectedStationPair: '',
        selectedRouteFilterType: 'percentage'
    },
    mutations,
    actions,
    getters,
});
