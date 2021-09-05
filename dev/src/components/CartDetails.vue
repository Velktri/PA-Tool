<template>
    <div class="st-cart-list">
        <div class="columns is-gapless">
            <div class="column is-narrow">
                {{ cartData.cartName }}
            </div>

            <div class="column">
                <div class="columns is-justify-content-flex-end">
                    <div class="column">

                    </div>
                    <div class="column is-narrow">
                        <div class="title is-6">
                            {{ formatedDwellTime }}
                        </div>
                    </div>
                    <div class="column is-2"></div>
                </div>
            </div>

            <div class="column is-narrow">
                <div class="tag" :class="statusMap[cartData.status]">{{ cartData.status }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cartData: {
            required: true,
            type: Object
        },
    },
    data() {
        return {
            statusMap: {
                'Staged': 'is-success',
                'Ready': 'is-warning',
                'Not Ready': 'is-light',
                'Missing': 'is-danger',
                'Sidelined': 'is-danger'
            },
        }
    },

    computed: {
        formatedDwellTime() {
            return (this.cartData.dwellTime !== '...') ? this.cartData.dwellTime : ''
        }
    }
}
</script>

<style lang="scss" scoped>
$padding-y: calc(.20em - 1px);
$padding-x: 0.15em;

.st-cart-list {
    border-radius: .4em;
    border: 1px solid transparent;
    padding-bottom: $padding-y;
    padding-left: $padding-x;
    padding-right: $padding-x;
    padding-top: $padding-y;
    user-select:none;
    font-size: .85rem;
}
</style>