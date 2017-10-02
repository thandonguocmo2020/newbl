import Vue from 'vue'
import Vuex from 'vuex'
import Members from './modules/member';
import Posts from './modules/post';


Vue.use(Vuex);

const store = new Vuex.Store({
//   strict: process.env.NODE_ENV !== 'prod',
  modules: {
    member: Members,
    post: Posts
  }
});

export default store;