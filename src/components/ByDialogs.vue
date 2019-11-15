<template>
    <!--    <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn color="light-blue darken-4" dark v-on="on">Buy</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Do ypu want to buy?</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-text-field
                                label="Your name "
                                name="name"
                                type="text"
                                required
                                v-model="name"
                        ></v-text-field>
                        <v-text-field
                                label="Your phone "
                                name="phone"
                                type="text"
                                v-model="phone"
                        ></v-text-field>

                        <v-text-field
                                label="Your email "
                                name="email"
                                type="email"
                                v-model="email"
                        ></v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn :disabled="localLoading"
                               color="blue darken-1"
                               outlined
                               text
                               @click="onClose">Close
                        </v-btn>
                        <v-btn :disabled="localLoading"
                               :loading="localLoading"
                               color="blue darken-1"
                               text
                               class="success"
                               @click="onSave">BUY IT
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>-->
    <div>
        <modal name="product-modal"
               height="auto"
               :clickToClose="false"
               class="qqq">
            <div class="c_modal_box">
                <h1>Buy {{this.product.title}}</h1>
                <form @submit.prevent="onSave" class="c_form">
                    <label class="input_group"
                           :class="{error_field: $v.name.$error}">
                        <span>Name</span>
                        <input name="name"
                               type="text"
                               @blur="$v.name.$touch()"
                               v-model="name">
                        <span class="error_message" v-if="$v.name.$error">
                            <template v-if="!$v.name.maxLength">
                                Name must not exceed  {{ $v.name.$params.maxLength.max }} characters
                            </template>
                            <template v-else>
                                This field is required
                            </template>
                        </span>
                    </label>

                    <label class="input_group">
                        <span>Phone (optional)</span>

                        <input name="phone"
                               type="text"
                               v-model="phone">

                    </label>
                    <label class="input_group"
                           :class="{error_field: $v.email.$error}">
                        <span>Email</span>

                        <input name="email"
                               type="email"
                               @blur="$v.email.$touch()"

                               v-model="email">
                        <span class="error_message" v-if="$v.email.$error">
                            <template v-if="!$v.email.email">
                                Must be a valid e-mail
                            </template>
                            <template v-else>
                                This field is required
                            </template>
                        </span>
                    </label>


                    <button class="c_btn btn_dark"
                            type="button"
                            @click="onClose">Close
                    </button>
                    <button class="c_btn btn_dark"
                            type="submit">BUY IT
                    </button>

                  <!--  <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                    <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>-->

                </form>
            </div>

        </modal>
    </div>
</template>

<script>
   import { required, maxLength, email } from "vuelidate/lib/validators";

   export default {
        props: ['product'],
        components: {     },
        data() {
            return {
                dialog: false,
                name: '',
                phone: '',
                email: '',
                localLoading: false,
                submitStatus: null
            }
        },

       validations: {
           email: {
               required,
               email,
           },
           name: {
               required,
               maxLength: maxLength(10)
           },
       },
        methods: {

            onClose() {
                this.name = ''
                this.phone = ''
                this.email = ''
                this.$v.$reset()

                this.$modal.hide('product-modal');

            },

            onSave() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                }
                else {
                    // do your submit logic here
                    this.submitStatus = 'PENDING'
                    this.$store.dispatch('createOrder', {
                        name: this.name,
                        phone: this.phone,
                        email: this.email,
                        productId: this.product.id,
                        ownerId: this.product.ownerId
                    }).finally(() => {
                        this.name = ''
                        this.phone = ''
                        this.email = ''
                        this.localLoading = false
                        this.dialog = false
                    })
                    this.$modal.hide('product-modal');
                }

            }

        }
    }
</script>

<style lang="scss">
    .c_modal_box {
        padding: 30px 20px;
    }

    .v--modal-box {
        padding: 50px 30px;
    }
</style>