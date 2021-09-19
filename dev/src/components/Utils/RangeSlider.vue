<template>
    <div class="columns is-gapless">
        <div class="column is-2">
            <div class="num-offset">
                {{ sliderMin }}
            </div>
        </div>
        <div class="column">
            <div class='range-slider'>
                <input type="range" :min="minRange" :max="maxRange" step="1" v-model="sliderMin">
                <input type="range" :min="minRange" :max="maxRange" step="1" v-model="sliderMax">
            </div>
        </div>
        <div class="column is-2">
            <div class="num-offset">
                {{ sliderMax }}
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data: () => {
        return {
            minRange: 1,
            maxRange: 19
        }
    },

    computed: {
        sliderMin: {
            get: function() {
                return parseInt(this.$store.getters.getMinFilterRange)
            },
            set: function(val) {
                val = parseInt(val)
                if (val > this.$store.getters.getMaxFilterRange) {
                    this.$store.commit('setMaxFilterRange', { 'range': val })
                }
                this.$store.commit('setMinFilterRange', { 'range': val })
            }
        },
        sliderMax: {
            get: function() {
                return parseInt(this.$store.getters.getMaxFilterRange)
            },
            set: function(val) {
                val = parseInt(val)
                if (val < this.$store.getters.getMinFilterRange) {
                    this.$store.commit('setMinFilterRange', { 'range': val })
                }
                this.$store.commit('setMaxFilterRange', { 'range': val })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.num-offset {
    margin-top: .5rem;
    margin-left: 1.5rem !important;
}

.range-slider {
    width: 100%;
    margin: auto;
    text-align: center;
    position: relative;
}

input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    background: $foreground-color;
    width: 100%;
    height: 1rem;
    outline: none;
}

input[type=range]:focus {
    outline: none;
}

input[type=range]::-moz-range-track {
    background: $bg-color;
}

input[type=range]::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 0px #000;
    border: 0px;
    background: $green-color;
    cursor: pointer;
}
</style>
