import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  }, {
    path: '/appdetails',
    name: 'appdetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/AppDetails'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
