<template>

    <div class="cnt">

        <div class="">

            <h1 class="c_title">Create new product</h1>


            <form @submit.prevent="createProduct" class="c_form">
                <label class="input_group"
                       :class="{error_field: $v.title.$error}">
                    <span>Product Name</span>

                    <input name="title"
                           type="text"
                           v-model="title">
                    <span class="error_message" v-if="$v.title.$error">
                            <template v-if="!$v.title.maxLength">
                                Name must not exceed  {{ $v.title.$params.maxLength.max }} characters
                            </template>
                            <template v-else>
                                This field is required
                            </template>
                        </span>

                </label>
               <!-- <label class="input_group">
                    <span>Product Vendor</span>

                    <input name="vendor"
                           type="text"
                           v-model="vendor">
                </label>-->
                <label class="input_group">
                    <span>Product Color</span>

                    <input name="color"
                           type="text"
                           v-model="color">
                </label>
                <label class="input_group">
                    <span>Product Material</span>

                    <input name="material"
                           type="text"
                           v-model="material">
                </label>
                <label class="input_group"
                       :class="{error_field: $v.price.$error}">
                    <span>Product Price</span>

                    <input name="price"
                           type="text"
                           v-model="price">
                    <span class="error_message" v-if="$v.price.$error">

                                This field is required
                        </span>

                </label>
                <label class="textarea_group">
                    <span>Product Description</span>

                    <textarea name="description"

                              v-model="description"></textarea>
                </label>
                <label class="input_group">
                    <span>Product Image</span>

                    <input
                            style="display: none"
                            accept="image/*"
                            type="file"
                            name="file"
                            ref="fileInput"
                            @change="onFileChange"
                    />
                </label>
                <button type="button" class="c_btn btn_dark" @click="upload">Upload</button>


                <div>
                    <img
                            v-if="imageSrc"
                            :src="imageSrc"
                            max-width="350"
                            max-height="200"
                            alt=""
                    />
                </div>

                <!-- <v-switch
                         color="primary"
                         v-model="promo"
                         label="Add to Promo?"
                 ></v-switch>-->
                <button class="c_btn btn_dark">
                    Create product
                    <p-spinner
                            v-if="loading"
                            line-fg-color="#00dffc"/>
                </button>
            </form>
            <!-- <v-form ref="form"
                     v-model="valid">
                 <v-text-field
                         label="TitleProduct "
                         name="title"
                         type="text"
                         required
                         :rules="[v=>!!v||'Field is required']"
                         v-model="title"
                 ></v-text-field>
                 <v-text-field
                         label="Vendor Product"
                         name="vendor"
                         type="text"
                         v-model="vendor"
                 ></v-text-field>
                 <v-text-field
                         label="Color Product"
                         name="color"
                         type="text"
                         v-model="color"
                 ></v-text-field>
                 <v-text-field
                         label="Material Product"
                         name="material"
                         type="text"
                         v-model="material"
                 ></v-text-field>
                 <v-text-field
                         label="Price Product"
                         name="price"
                         type="text"
                         required
                         :rules="[v=>!!v||'Field is required']"
                         v-model="price"
                 ></v-text-field>

                 <v-text-field
                         label="Description Product"
                         name="description"
                         type="text"

                         v-model="description"
                 ></v-text-field>
               &lt;!&ndash;  <v-textarea
                         label="Description Product"
                         name="description"
                         v-model="description"
                         :value="description"
                 ></v-textarea>&ndash;&gt;
                 <input
                         style="display: none"
                         accept="image/*"
                         type="file"
                         name="file"
                         ref="fileInput"
                         @change="onFileChange"
                 />
                 <v-btn class="warning" @click="upload">Upload
                     <v-icon>{{icons.upload}}</v-icon>
                 </v-btn>


                 <div align="center" justify="center">
                     <v-img
                             v-if="imageSrc"
                             :src="imageSrc"
                             lazy-src="https://picsum.photos/id/11/10/6"
                             aspect-ratio="1"
                             class="grey lighten-2"
                             max-width="350"
                             max-height="200"
                     ></v-img>
                 </div>

                 <v-switch
                         color="primary"
                         v-model="promo"
                         label="Add to Promo?"
                 ></v-switch>

                 <v-btn class="success"
                        :loading="loading"
                        :disabled="!valid || !image || loading"
                        @click="createProduct"
                 >Create product
                 </v-btn>
             </v-form>-->
        </div>


    </div>
</template>

<script>
    import { required, maxLength } from "vuelidate/lib/validators";
    import Spinner from 'vue-simple-spinner'

    export default {
        data: () => ({
            title: '',
            // vendor: '',
            color: '',
            material: '',
            price: '',
            description: '',
            promo: false,
            valid: false,
            image: null,
            imageSrc: '',


        }),
        validations: {
            price: {
                required,
            },
            title: {
                required,
                maxLength: maxLength(10)
            },
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        components:{
            'p-spinner':Spinner

        },
        methods: {
            createProduct() {
                /*if (this.$validate() && this.image && this.price) {
                    const product = {
                        title: this.title,
                        vendor: this.vendor,
                        color: this.color,
                        material: this.material,
                        price: this.price,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    }
                    // console.log("PRD", prd);
                    this.$store.dispatch('createProduct', product)
                        .then(() => {
                            this.$router.push('/list')
                        })
                        .catch(() => {
                        })
                }*/
                this.$v.$touch()
                if (this.$v.$invalid && !this.image) {
                    this.submitStatus = 'ERROR'
                    console.log( this.$store.getters.user.email);
                }
                else {
                    // do your submit logic here
                    this.submitStatus = 'PENDING'
                    const product = {
                        title: this.title,
                        // vendor: this.vendor,
                        color: this.color,
                        material: this.material,
                        price: this.price,
                        description: this.description,
                        promo: this.promo,
                        image: this.image,
                        productCreator: this.$store.getters.user.email
                    }
                    this.$store.dispatch('createProduct', product)
                        .then(() => {
                            this.$router.push('/list')
                        })
                        .catch(() => {
                        })
                }
            },
            upload() {
                this.$refs.fileInput.click()
            },
            onFileChange(event) {
                const file = event.target.files[0];
                // console.log(file)
                const reader = new FileReader()

                reader.onload = e => {
                    this.imageSrc = reader.result
                }
                reader.readAsDataURL(file)
                this.image = file
            }
        }
    }
</script>

<style scoped>
    img {
        max-width: 400px;
    }
</style>