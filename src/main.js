import Vue from 'vue'
import './styles/common.scss';
import App from './App.vue'
import BuyDialogComponent from './components/ByDialogs.vue'
import EditDialogComponent from './components/EditProduct.vue'
import router from './router/router'
import store from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faAlignLeft, faSignInAlt, faSignOutAlt, faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import Drawer from './components/Drawer';
import vmodal from 'vue-js-modal'
import Spinner from './components/Spinner.vue'
import Vuelidate from 'vuelidate'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LazyLoadDirective from "./directives/LazyLoadDirective";

import * as fb from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

library.add(faSpinner, faAlignLeft, faSignInAlt, faSignOutAlt, faUser, faBars)
Vue.use(vmodal, { dialog: true, dynamic: true })
Vue.use(Vuelidate)

Vue.directive("lazyload", LazyLoadDirective);

Vue.component('fai', FontAwesomeIcon)
Vue.component('Spinner',Spinner)
Vue.component('Drawer', Drawer);
Vue.component('app-buy-dialog', BuyDialogComponent)
Vue.component('app-edit-dialog', EditDialogComponent)



const firebaseConfig = {
    apiKey: "AIzaSyCddzYnhLiBHZUHzZHwq15L_pdORCbQwPk",
    authDomain: "pvvgallery.firebaseapp.com",
    databaseURL: "https://pvvgallery.firebaseio.com",
    projectId: "pvvgallery",
    storageBucket: "pvvgallery.appspot.com",
    messagingSenderId: "502915711073",
    appId: "1:502915711073:web:529d46389cf1663a06ea20",
    measurementId: "G-4F6K0PXY3Y"
};


/*
 apiKey: "AIzaSyAjsgqqkzjBVbqLrrr67Wnlxvh7evWInH0",
    authDomain: "v25u-2893a.firebaseapp.com",
    databaseURL: "https://v25u-2893a.firebaseio.com",
    projectId: "v25u-2893a",
    storageBucket: "v25u-2893a.appspot.com",
    messagingSenderId: "426949654227",
    appId: "1:426949654227:web:2cc80c0b76a3aee8a84626"
* */
fb.initializeApp(firebaseConfig);

export const db = fb.firestore()

// console.log(db);

let app;

fb.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            // vuetify,
            render: h => h(App),
            created() {

                fb.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.$store.dispatch('autoLoginUser', user)
                    }
                    this.$store.dispatch('fetchProducts')
                });


            }
        }).$mount('#app')
    }
})


