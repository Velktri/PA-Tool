<template>
    <ul>
        <li v-for="route in setActiveRouteList()" :key="route">{{ route }}</li>
    </ul>

</template>

<script>
export default {
    
    methods: {

        computePercentage(num) {
            let split = num.split('/')
            return Math.floor(100 * ((split[0] / split[1]).toFixed(2)))
        },

        setActiveRouteList() {
            let InProgressRoutes = this.$store.getters.getInProgressRoutes
            if (InProgressRoutes !== undefined)
            {
                console.log(InProgressRoutes)
                let sortedRoutes = []

                Object.keys(InProgressRoutes).forEach((pairKey) => {
                    InProgressRoutes[pairKey].forEach((route) => {

                        sortedRoutes.push({ 'station': pairKey, 'percent': this.computePercentage(route.progress), ...route })
                    })
                })

                sortedRoutes.sort((x, y) => {
                    if (x.percent < y.percent) { return 1 }
                    if (x.percent > y.percent) { return -1 }

                    return 0
                })


                /* sort the routes based on completion */
                return sortedRoutes
            }

            return []
        }
    }
}
</script>

<style lang="scss" scoped>

</style>