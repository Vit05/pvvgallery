<template>
    <div class="cnt_full">

        <div class="cnt" v-if="!loading && orders.length !== 0">
            <div>
                <div>
                    <h1 class="c_subtitle">Orders</h1>
                    <div class="c_order_product">
                        <div class="t_head">
                            <div class="t_row">
                                <div class="t_check">Status</div>
                                <div class="t_name">Name</div>
                                <div class="t_phone">Phone</div>
                                <div class="t_email">email</div>
                                <div class="t_btn"></div>
                            </div>
                        </div>
                        <div class="t_body ">

                            <div class="t_row" v-for="(order, i) in orders" :key="i">
                                <div class="t_check" data-title="Status">
                                    <input type="checkbox"
                                           :value="order.done"
                                           v-model="order.done"
                                           @change="markDone(order)">
                                </div>


                                <div class="t_name" data-title="Name">{{order.name}}</div>
                                <div class="t_phone" data-title="Phone">
                                    <a :href="`tel:${order.phone}`">
                                    {{order.phone}}
                                    </a>
                                </div>
                                <div class="t_email" data-title="email">{{order.email}}</div>
                                <div class="t_btn" data-title="">
                                    <router-link class="primary" :to="`/product/${order.productId}`">Open
                                        <fai icon="external-link-alt" class="icon" size="xs"/>

                                    </router-link>

                                </div>

                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div class="cnt" v-else-if="!loading && orders.length === 0">
            <h1 class="c_title">No orders </h1>
        </div>

        <Spinner v-if="loading"></Spinner>


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
    .c_order_product {
        width: 100%;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

        a {
        }

        .t_head {
            width: 100%;
            border-bottom: 1px solid #343838;
            @media screen and (max-width: 767px) {
                display: none;
            }
        }

        .t_body {
            display: flex;
            flex-direction: column;

            .t_row:nth-of-type(even) {
                background-color: rgba(#343838, 0.1);
            }

        }

        .t_row {
            padding-top: 10px;
            padding-bottom: 10px;
            display: flex;
            word-break: break-word;
            @media screen and (max-width: 767px) {
                display: flex;
                /*align-items: flex-end;*/
                /*flex-direction: column;*/
                flex-wrap: wrap;

            }

            > div {
                padding-left: 5px;
                padding-right: 5px;
                position: relative;
                @media screen and (max-width: 767px) {
                    width: 100%;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    /*background-color: red;*/
                    /*width: 100%;*/
                    padding-left: 150px;
                    &:before {
                        position: absolute;
                        top: 0;
                        box-sizing: border-box;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        padding-left: 20px;
                        bottom: 0;
                        left: 0;
                        /*width: 50%;*/
                        content: attr(data-title);
                        font-weight: 300;
                        font-size: 18px;
                        opacity: 0.45;
                        color: #000000;
                        z-index: 10;
                    }
                }
                @media screen and (max-width: 420px) {
                    width: 100%;
                    /*background-color: red;*/
                    /*width: 100%;*/
                    padding-left: 90px;
                    &:before {
                        padding-left: 5px;
                    }
                }

            }
        }


        .t_check {
            width: 5%;
            padding-left: 10px;
            /* @media screen and (max-width: 767px) {
                 order: 10;
                 width: 50% !important;
                 padding-left: 0 !important;
             }*/
        }

        .t_name {
            width: 25%;
        }

        .t_phone {
            width: 25%;
        }

        .t_email {
            width: 30%;
        }

        .t_btn {
            width: 10%;
            a{
                color: #3323ff;
                &:hover{
                    text-decoration: none;
                }
            }
            .icon{
                margin-left: 5px;
            }
            /*@media screen and (max-width: 767px) {
                order: 11;
                width: 50% !important;
                padding-left: 0 !important;
            }*/
        }

    }
</style>