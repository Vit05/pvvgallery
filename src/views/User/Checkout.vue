<template>
    <div class="cnt_full">
        <div class="cnt">
            <Spinner v-if="loading"></Spinner>
            <div v-else-if="!loading && orders.length !==  0">
                <div >
                    <div>
                        <h1 class="c_title">Orders</h1>


                        <div v-for="(order, i) in orders" :key="i" class="c_order_product">


                            <!-- <v-checkbox
                                     color="success"
                                     :input-value="order.done"
                                     @change="markDone(order)"
                             ></v-checkbox>-->


                            <div>{{order.name}}</div>
                            <div>{{order.phone}}</div>

                            <router-link class="primary" :to="`/product/${order.productId}`">Open</router-link>


                        </div>


                    </div>
                </div>
            </div>
            <div v-else>

                <h1>No orders </h1>

            </div>
        </div>


    </div>
</template>
<script>

    export default {

        computed: {
            loading() {
                return this.$store.getters.loading
            },
            orders() {
                return this.$store.getters.orders
            }
        },
        methods: {
            markDone(order) {
                this.$store.dispatch('markOrderDone', order.id)
                    .then(() => {
                        order.done = true
                    })
                    .catch(() => {
                    })
            }
        },
        created() {
            this.$store.dispatch('fetchOrders')
        }
    }
</script>

<style scoped lang="scss">
.c_order_product{
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}
</style>