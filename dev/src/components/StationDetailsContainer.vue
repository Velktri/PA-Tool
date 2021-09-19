<template>
    <div class="box">
        <div class="st-list-container">
            <div class="st-station-details">
                <div class="title is-1 st-mb">In Progress</div>
                <div v-for="(routeData, i) in getInProgressRoutes()" :key='i'>
                    <RouteDetails :routeDetails="routeData" />
                </div>

                <div class="title is-1 st-mt st-mb">Completed Routes</div>
                <div v-for="(route, i) in getCompletedRoutes()" :key='i'>
                    <RouteDetails :routeDetails="route" />
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

.st-list-container {
    padding: 0.5rem;
    scrollbar-width: thin;
    height: calc(#{$content-height} - 3.5rem);
    overflow:auto;
}

.test2 {
    scrollbar-width: thin;
    overflow: auto;
}

.st-mb {
    margin-bottom: .5rem !important;
}

.st-mt {
    margin-top: 1rem;
}

.st-station-details {
    height: $content-height;

}
</style>