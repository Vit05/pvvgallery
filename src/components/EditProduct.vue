<template>
    <!--<v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Edit</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">User Profile</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field
                            label="Title "
                            name="title"
                            type="text"
                            required
                            v-model="editTitle"
                    ></v-text-field>
                    <v-text-field
                            label="Price "
                            name="price"
                            type="text"
                            v-model="editPrice"
                    ></v-text-field>

                    <v-text-field
                            label="Description"
                            name="description"
                            type="text"
                            v-model="editDescription"
                    ></v-text-field>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" outlined text @click="onCancel">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>-->


    <div>
        <modal name="edit-product-modal"
               width="95%"
               height="auto"
               :maxWidth="360"
               :adaptive="true"
               :clickToClose="false">
            <div class="c_modal_box">
                <p class="c_subtitle">Edit <strong>{{this.product.title}}</strong></p>
                <form @submit.prevent="onSave" class="c_form">
                    <label class="input_group"
                           :class="{error_field: $v.editTitle.$error}">
                        <span>Name</span>
                        <input name="name"
                               type="text"
                               @blur="$v.editTitle.$touch()"
                               v-model="editTitle">
                        <span class="error_message" v-if="$v.editTitle.$error">
                                This field is required
                        </span>
                    </label>

                    <label class="input_group"
                           :class="{error_field: $v.editPrice.$error}">
                        <span>Price</span>
                        <input name="name"
                               type="text"
                               @blur="$v.editPrice.$touch()"
                               v-model="editPrice">
                        <span class="error_message" v-if="$v.editPrice.$error">
                                This field is required
                        </span>
                    </label>
                    <label class="textarea_group">
                        <span>Description</span>
                        <textarea name="description" v-model="editDescription" cols="30" rows="10"></textarea>
                    </label>


                    <div class="c_row">
                        <button class="c_btn btn_dark"
                                type="button"
                                @click="onCancel">CLOSE
                        </button>
                        <button class="c_btn btn_dark"
                                type="submit">SAVE
                        </button>
                    </div>
                </form>
            </div>

        </modal>
    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";

    export default {
        props: ['product'],
        data() {
            return {
                editTitle: this.product.title,
                editPrice: this.product.price,
                editDescription: this.product.description,

            }
        },
        validations: {
            editTitle: {
                required,
            },
            editPrice: {
                required,
            },
        },
        methods: {
            onCancel() {
                this.editTitle = this.product.title
                this.editPrice = this.product.price
                this.editDescription = this.product.description
                this.$modal.hide('edit-product-modal');

            },

            onSave() {
                /*if (this.editTitle !=='' && this.editPrice !=='' && this.editDescription !=='' ){

                }*/


                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    // do your submit logic here
                    this.submitStatus = 'PENDING'
                    this.$store.dispatch('updateProduct', {
                        title: this.editTitle,
                        price: this.editPrice,
                        description: this.editDescription,
                        id: this.product.id
                    })
                    this.$modal.hide('edit-product-modal');
                }
            },

        }
    }
</script>

<style scoped>

</style>