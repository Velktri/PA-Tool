<template>
    <div class="st-station-details">
        <div class="box st-progress">
            <div class="title is-1">In Progress</div>
            <div class="columns">
                <div class="column is-half" v-for="(routeData, i) in getInProgressRoutes()" :key='i'>
                    <RouteDetails :routeDetails="routeData" />
                </div>
            </div>
        </div>

        <div class="box">
            <div class="st-completed">
                <div class="title is-1">Completed Routes</div>
                <div class="columns completed-columns" v-for="i in Math.ceil(this.$store.getters.getCompletedRoutesFromStationAmount / 3)" :key='i'>
                    <div class="column is-one-third"
                        v-for="j in 3"
                        :key="j"
                    >
                        <RouteDetails :routeDetails="getCompletedRoutes()[(j + ((i - 1) * 3) - 1)]" />
                    </div>
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
                routes = routes.filter(route => {
                    return route.status !== 'In Progress'
                })

                routes.sort((x, y) => {
                    if (!this.$store.getters.doesRouteHaveReadyCarts(x.route) &&
                        this.$store.getters.doesRouteHaveReadyCarts(y.route)) { return 1 }

                    return 0
                })

                return routes
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
.st-completed {
    scrollbar-width: thin;
    overflow: auto;
    height: calc(#{$content-height} - #{$progress-height} - 5rem);
}

.test2 {
    scrollbar-width: thin;
    overflow: auto;
}

.st-progress {
    height: $progress-height;
}

.completed-columns {
    margin: -0.75rem 0;
}

.st-station-details {
    height: $content-height;

}
</style>