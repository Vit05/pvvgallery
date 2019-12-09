<template>
    <div class="cnt_full">
        <div class="cnt">
            <div class="c_form cnt_login_form">

                <h2 class="c_subtitle">Login form</h2>

                <form @submit.prevent="onSubmit">
                    <label class="input_group" :class="{error_field: $v.email.$error}">
                        <span>Email</span>

                        <input type="email" name="email" v-model="email">
                        <span class="error_message" v-if="$v.email.$error">
                            <template v-if="!$v.email.email">
                                Must be a valid e-mail
                            </template>
                            <template v-else>
                                This field is required
                            </template>
                        </span>
                    </label>

                    <label class="input_group" :class="{error_field: $v.password.$error}">
                        <span>Password</span>
                        <input type="password" name="email" v-model="password">
                        <span class="error_message" v-if="$v.password.$error">
                            <template v-if="!$v.password.minLength">
                                Field must have at least {{ $v.password.$params.minLength.min }} characters.
                            </template>
                            <template v-else>
                                This field is required
                            </template>
                        </span>
                    </label>

                    <button class="c_btn btn_dark"
                            :loading="loading"
                            type="submit">Login
                    </button>
                </form>

            </div>

        </div>
    </div>

</template>
<script>
    import {required, minLength, email} from "vuelidate/lib/validators";


    export default {
        props: {
            source: String,
        },
        data() {
            return {
                email: '',
                password: '',
            }
        },


        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        validations: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(6)
            },
        },
        methods: {
            onSubmit() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING'
                    this.valid = !this.valid;
                    const user = {
                        email: this.email,
                        password: this.password
                    };


                    this.$store.dispatch('loginUser', user)
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(() => {
                        })
                }
            }
        },
        created() {
            if (this.$route.query['loginError']) {
                this.$store.dispatch('setError', 'Please login to access this page')
            }
        }
    }
</script>

<style scoped lang="scss">
    .cnt {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 50px;
    }

    .cnt_login_form {
        max-width: 460px;
        width: 100%;
        /*padding-left: 15px;*/
        /*padding-right: 15px;*/

        .c_subtitle {
            margin-bottom: 30px;
        }
    }


</style>