<template>
    <div class="cnt_full">


        <div class="cnt">
            <div class="c_form cnt_login_form">
                <h2 class="c_title">Registration form</h2>
                <form class="c_form" @submit.prevent="onSubmit">
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
                        <input type="password" v-model="password"/>
                        <span class="error_message" v-if="$v.password.$error">
                            <template v-if="!$v.password.minLength">
                                Password must have at least {{ $v.password.$params.minLength.min }} letters.
                            </template>
                            <template v-else>
                                This field is required
                            </template>
                        </span>
                    </label>

                    <label class="input_group" :class="{error_field: $v.repeat.$error}">
                        <span>Password</span>
                        <input type="password" v-model="repeat"/>


                        <!--  <div class="error"
                               v-if="!$v.repeatPassword.sameAsPassword">
                              Passwords must be identical.</div>-->

                        <span class="error_message" v-if="$v.repeat.$error">
                            <template v-if="!$v.repeat.minLength">
                                Password must have at least {{ $v.repeat.sameAsPassword }} letters.
                            </template>
                        </span>
                    </label>


                    <button type="submit" class="c_btn btn_dark">Register                    </button>
                </form>

            </div>

        </div>
        <div>
            <!--  <div>
                  <div>

                      <div>
                          <v-form ref="form"
                                  v-model="valid">
                              <v-text-field
                                      label="Email"
                                      name="email"
                                      :prepend-icon="icons.account"
                                      type="email"
                                      :rules="emailRules"
                                      v-model="email"
                              ></v-text-field>
                              <v-text-field
                                      :prepend-icon="icons.lock"
                                      :append-icon="show3 ? icons.eye : icons.eyeOff"
                                      :rules="[passwordRules.required, passwordRules.min]"
                                      :type="show3 ? 'text' : 'password'"
                                      name="password"
                                      label="Password"
                                      hint="At least 6 characters"
                                      v-model="password"
                                      @click:append="show3 = !show3"
                              ></v-text-field>
                              <v-text-field
                                      :prepend-icon="icons.repeat"
                                      :append-icon="show3 ? icons.eye : icons.eyeOff"
                                      :rules="[confirmPasswordRules.required, confirmPasswordRules.equel]"
                                      :type="show3 ? 'text' : 'password'"
                                      name="confirm_password"
                                      label="Password"
                                      hint="At least 6 characters"
                                      v-model="confirmPassword"
                                      @click:append="show3 = !show3"
                              ></v-text-field>
                          </v-form>
                      </div>
                      <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="primary"
                                 :disabled="!valid || loading"
                                 :loading="loading"
                                 @click="onSubmit">Login
                          </v-btn>
                      </v-card-actions>
                  </div>
              </div>-->
        </div>
    </div>
</template>
<script>
    import {required, sameAs, minLength, email} from 'vuelidate/lib/validators'


    export default {
        props: {
            source: String,
        },
        data() {
            return {
                password: '',
                repeat: '',
                email: '',
                submitStatus: null
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
            repeat: {
                sameAsPassword: sameAs('password')
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            onSubmit() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    const user = {
                        email: this.email,
                        password: this.password
                    };


                    this.$store.dispatch('registerUser', user)
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(() => {
                        })
                }
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