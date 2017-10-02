import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login.vue';
import Register from '../views/register.vue';
import Logout from '../views/logout.vue';
import Layout from '../views/layout.vue';
import Member from '../views/member.vue';
import Post from '../views/post.vue';
import Password from '../views/pwd.vue';
import SendPwd from '../views/send-pwd.vue';
import ResetPwd from '../views/reset-pwd.vue';


// import Home from '../views/home.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        // { path: '/', component: Home, name: 'home' },
        { path: '/login', component: Login, name: 'login' },
        { path: '/register', component: Register },
        { path: '/logout', component: Logout },
        { path: '/send-pwd', component: SendPwd, name: 'send-pwd' },
        { path: '/reset-pwd/:id', component: ResetPwd, name: 'reset-pwd' },
        {
            name: 'admin', path: '/cpanel', component: Layout, meta: { auth: true },
            children: [
                { name: 'c-user', path: '/cpanel/user', component: Member, meta: { auth: true } },
                { name: 'c-pwd', path: '/cpanel/pwd', component: Password, meta: { auth: true } },
                { name: 'c-post', path: '/cpanel/post', component: Post, meta: { auth: true } }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {

    if (to.meta.auth && !localStorage.getItem("auth")) {
        next({
            path: '/login',
            query: { next: to.fullPath }
        })
    } else {
        next()
    }
});

export default router