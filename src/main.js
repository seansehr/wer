import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import store from './store';
import Tournament from './components/Tournament.vue';
import Tournaments from './components/Tournaments.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
  routes: [
    {path: '/tournaments/', component: Tournaments},
    {path: '/tournaments/:id', component: Tournament, props: true}
  ]
});

new Vue({
  router,
  store,
  data: {
    uid: '2ff67d29-a47a-4522-8992-750471e4b34d'
  }
}).$mount('#app');
