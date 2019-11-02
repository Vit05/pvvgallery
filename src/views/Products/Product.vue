<template>
    <div class="cnt_full">

        <div v-if="!loading" class="cnt">
            <div>
                <div>
                    <img :src="product.imageSrc"
                         max-height="300"        />
                </div>
                <div cols="8" class="pa-4">


                    <div>

                        <tbody>
                        <tr>
                            <th class="text-right">Name:</th>
                            <td>{{ product.title }}</td>
                        </tr>
                        <tr>
                            <th class="text-right">Vendor:</th>
                            <td>{{ product.vendor }}</td>
                        </tr>
                        <tr>
                            <th class="text-right">Color:</th>
                            <td>{{ product.color }}</td>
                        </tr>
                        <tr>
                            <th class="text-right">Material:</th>
                            <td>{{ product.material }}</td>
                        </tr>
                        <tr>
                            <th class="text-right">Price:</th>
                            <td>{{ product.price }}</td>
                        </tr>
                        <tr>
                            <th class="text-right">Desc:</th>
                            <td class="py-2">{{ product.description }}</td>
                        </tr>


                        </tbody>
                    </div>

                    <hr>


                    <div>
                        <!--                        <app-edit-product v-if="isOwner" :product="product"></app-edit-product>-->
                        <app-buy-dialog :product="product"></app-buy-dialog>

                    </div>
                </div>
            </div>

        </div>
        <Spinner v-else/>


    </div>
</template>

<script>
    import fb from 'firebase'
    // import EditProduct from "./editProduct";

    export default {
        props: ['id'],
        computed: {
            product() {
                const id = this.id;
                return this.$store.getters.productById(id)
            },
            loading() {
                return this.$store.getters.loading
            },
            isOwner() {
                if (this.$store.getters.isUserLoggedIn) {
                    return this.product.ownerId === fb.auth().currentUser.uid
                } else {
                    // console.log('YOU DO NOT LOGIN')
                }
            }
        },
        components: {
            // appEditProduct: EditProduct
        }
    }
</script>

<style scoped>
    img {
        max-width: 400px;
    }
</style>