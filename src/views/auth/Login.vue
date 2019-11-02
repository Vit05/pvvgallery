<template>
    <div class="cnt">
        <div class="c_form cnt_login_form">
            <h2 class="c_title">Login form</h2>
            <h2 class="c_subtitle">Login form</h2>
            <form>
                <label class="input_group" :class="{error_field: validation.hasError('email')}">
                    <span>Email</span>

                    <input type="email" name="email" v-model="email">
                    <span class="error_message">{{ validation.firstError('email') }}</span>
                </label>

                <label class="input_group" :class=" {error_field: validation.hasError('password')}">
                    <span>Password</span>
                    <input type="password" name="email" v-model="password">
                    <span class="error_message">{{ validation.firstError('password') }}</span>
                </label>

                <button :disabled="loading"
                        :loading="loading"
                        type="button"
                        @click="onSubmit">Login
                </button>
            </form>

        </div>

    </div>
</template>
<script>
    import SimpleVueValidation from 'simple-vue-validator';

    const Validator = SimpleVueValidation.Validator;

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

        validators: {
            email: function (value) {
                return Validator.value(value).required().email();
            },
            password: function (value) {
                return Validator.value(value).required().minLength(6);
            },
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            onSubmit() {
                if (this.$validate()) {
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
    }

    .cnt_login_form {
        max-width: 420px;
        width: 100%;

    }



</style>