<template>
    <div class="tile is-vertical">
        <RouteDetails   v-for="(routeData, i) in setRouteDetails()" 
                        :key='i'
                        :routeDetails="routeData"
        />
    </div>
</template>

<script>
import RouteDetails from './routeDetails.vue'

export default {
    components: {
        RouteDetails
    },

    methods: {
        setRouteDetails() {
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

                return stationRoutes
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>