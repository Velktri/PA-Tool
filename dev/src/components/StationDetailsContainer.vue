<template>
    <div class="container is-fluid">
        <div class="tile is-vertical">
            <div class="title is-1">In Progress</div>
            <div class="columns">
                <div class="column is-half" v-for="(routeData, i) in getInProgressRoutes()" :key='i'>
                    <RouteDetails :routeDetails="routeData" />
                </div>
            </div>

            <div class="title is-1">Completed Routes</div>
            <div class="columns " v-for="i in Math.ceil(this.$store.getters.getRoutesFromStation.length / 3)" :key='i'>
                <div class="column is-one-third"
                     v-for="j in 3"
                     :key="j"
                >
                    <RouteDetails :routeDetails="getCompletedRoutes()[(j + ((i - 1) * 3) - 1)]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RouteDetails from './routeDetails.vue'

export default {
    components: {
        RouteDetails
    },

    methods: {
        getInProgressRoutes() {
            let routes = this.$store.getters.getRoutesFromStation
            if (routes !== undefined) {
                return routes.filter(route => {
                    return route.status === 'In Progress'
                })
            }
        },

        getCompletedRoutes() {
            let routes = this.$store.getters.getRoutesFromStation
            if (routes !== undefined) {
                return routes.filter(route => {
                    return route.status !== 'In Progress'
                })
            }
        },

        setRouteDetails(index) {
            let stationRoutes = this.$store.getters.getRoutesFromStation
            if (stationRoutes !== undefined) {
                stationRoutes.sort((x, y) => {
                    if (x.status === 'In Progress' && y.status !== 'InProgress') {
                        return -1
                    }

                    if (y.status === 'In Progress' && x.status !== 'InProgress') {
                        return 1
                    }

                    return 0
                })

                return stationRoutes[index]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.st-details-container {
    height: 100vh;
    overflow: auto;
}
</style>