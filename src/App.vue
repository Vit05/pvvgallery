<template>
    <!-- <v-app id="inspire">
         <v-navigation-drawer v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
                              v-model="drawer"
                              app>
             <v-list dense>
                 <v-list-item v-for="(link, i) in links" :to="link.url" :key="i">
                     <v-list-item-content>
                         <v-list-item-title>{{link.title}}</v-list-item-title>
                     </v-list-item-content>
                 </v-list-item>


             </v-list>
         </v-navigation-drawer>

         <v-app-bar app dark class="c_header">
             <template v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs">

                 <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
             </template>
             <v-toolbar flat color="transparent">
                 <div>
                     <router-link to="/" class="c_logotype">PVVGALLERY</router-link>

                 </div>

                 <div class="flex-grow-1"></div>
                 <template v-if="$vuetify.breakpoint.mdAndUp">


                     <ul class="c_header_nav">
                         <li v-for="(link, i) in links" :key="i">
                             <router-link :to="link.url">{{link.title}}</router-link>
                         </li>
                         <li v-if="isUserLoggedIn" class="c_user">
                             <span class="c_name">
                                 <fai icon="user"/>{{user.email}}
                             </span>
                             <span @click="onLogout" class="c_logout">
                                 <fai icon="sign-out-alt"/>
                             </span>
                         </li>
                     </ul>

                 </template>
             </v-toolbar>
         </v-app-bar>
         <template v-if="error">
             <v-snackbar
                     color="red"
                     :multi-line="true"
                     :timeout="5000"
                     @input="closeError"
                     :value="true"
             >
                 {{ error }}
                 <v-btn
                         dark
                         text
                         @click.native="closeError"
                 >
                     Close
                 </v-btn>
             </v-snackbar>

         </template>

         <v-content>
             <router-view/>
         </v-content>
         <v-footer color="indigo" app>
             <span class="white&#45;&#45;text">&copy; 2019</span>
         </v-footer>
     </v-app>-->

    <div class="wrapper">
        <div class="c_content">
            <div class="cnt_full c_header">
                <div class="cnt">
                    <button v-if="isMobile" @click="openMenu">
                        <fai icon="bars" class="icon"/>

                    </button>
                    <router-link to="/" class="c_logotype">PVVGALLERY22</router-link>
                    <ul class="c_header_nav" v-if="!isMobile">
                        <li v-for="(link, i) in links" :key="i">
                            <router-link :to="link.url">{{link.title}}</router-link>
                        </li>
                        <li v-if="isUserLoggedIn" class="c_user">
                            <span class="c_name">
                                <fai icon="user" class="icon"/>{{user.email}}
                            </span>
                            <span @click="onLogout" class="c_logout">
                                <fai icon="sign-out-alt" class="icon"/>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <router-view class="cnt_full cnt_view"/>

            <component-error v-if="error">
                {{error}}
            </component-error>

            <Drawer v-if="isMobile" :direction="'left'" :exist="true" ref="LeftDrawer">
                <ul class="c_header_nav">
                    <li v-for="(link, i) in links" :key="i" @click="openMenu">
                        <router-link :to="link.url">{{link.title}}</router-link>
                    </li>
                    <li v-if="isUserLoggedIn" class="c_user">
                            <span class="c_name">
                                <fai icon="user"/>{{user.email}}
                            </span>
                        <span @click="onLogout" class="c_logout">
                                <fai icon="sign-out-alt"/>
                            </span>
                    </li>
                </ul>
            </Drawer>

        </div>

        <footer class="cnt_full c_footer">
            <div class="cnt">
                <p>Design and development by V.Paleychuk</p>
            </div>
        </footer>
    </div>
</template>

<script>
    import Error from './components/Error.vue'

    export default {
        name: 'App',
        components: {
            componentError: Error
        },

        data: () => ({
            isMobile: true,
            window: {
                width: 0,
                height: 0
            },
            drawer: false,
        }),
        created() {
            window.addEventListener('resize', this.handleResize.bind(this));
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize.bind(this));
        },
        destroyed() {
            document.removeEventListener("resize", this.handleResize);
        },
        mounted() {
            this.handleResize()
        },

        computed: {
            error() {
                return this.$store.getters.error
            },

            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn
            },
            user() {
                return this.$store.getters.user
            },
            links() {
                if (this.isUserLoggedIn) {
                    return [
                        {title: 'Home', url: '/'},

                        {title: 'Cart', url: '/checkout'},
                        {title: 'New Product', url: '/new'},
                        {title: 'My Products', url: '/list'},
                    ]
                }
                return [
                    {title: 'Home', url: '/'},
                    {title: 'Login', url: '/login'},
                    {title: 'Register', url: '/register'},
                ]
            }
        },
        methods: {

            onLogout() {
                this.$store.dispatch('logoutUser')
                this.$router.push('/')
            },
            openMenu() {
                if (this.$refs.LeftDrawer.active) {
                    this.$refs.LeftDrawer.close();
                } else {
                    this.$refs.LeftDrawer.open();
                }
            },
            handleResize() {
                window.innerWidth < 768 ? this.isMobile = true : this.isMobile = false;
            }


        },

    };
</script>

<style scoped lang="scss">
    @import "styles/styles/var";

    .c_header {
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: $color_4;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 3000;
        .icon {
            path {
                fill: white
            }

        }

        .cnt {
            display: flex;
            justify-content: space-between;
        }


        a, span {
            color: #fff;
            text-decoration: none;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }


    }

    .c_user {
        border-left: 1px solid #ffffff;
        padding-left: 15px;

        svg {
            margin: 0 5px;
        }

        .c_logout {
            margin-left: 20px;
        }
    }

    .c_header_nav {
        display: flex;

        li {
            margin: 0 15px;
            display: flex;
            align-items: center;
        }


    }

    .cnt_view {

    }
</style>
