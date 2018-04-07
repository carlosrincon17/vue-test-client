import Vue from 'vue'
import VueRouter from "vue-router";
import VueGoodWizard from 'vue-good-wizard';
import {USER_LOCAL_STORAGE_KEY} from "./constants/localstorage";

Vue.use(VueRouter);
Vue.use(VueGoodWizard);


function guardLogin(to, from, next) {
    if (localStorage.getItem(USER_LOCAL_STORAGE_KEY)) {
        next('/')
    } else {
        next()
    }
}

function guardAuth(to, from, next) {
    if (!localStorage.getItem(USER_LOCAL_STORAGE_KEY)) {
        next('/login')
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/login', component: require('./components/Login.vue'), beforeEnter: guardLogin},
        { path: '/', component: require('./components/Home.vue'), beforeEnter: guardAuth}
    ]
});

router.beforeEach((to, from, next) => {
    next();
});

new Vue({
    router,
    template : `
        <div id="app">
            <router-view class="view"></router-view>
         </div>
        `
}).$mount('#app');
