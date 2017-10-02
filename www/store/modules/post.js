import api from '../../api';
import { POST_CREATE, FETCH_POST, FETCH_POST_BY_TAG, UPDATE_POST, POST_DELETE, POST_DELETE_MU } from '../const';

export default {
    state: {
        posts: []
    },
    getters: {
        posts(state) {
            return state.posts;
        }
    },
    mutations: {
        [POST_CREATE](state, payload) {
            state.posts.push(payload);
        },

        [UPDATE_POST](state, payload) {
            state.posts = state.posts.map(index => {
                if (index._id == payload._id) {
                    return index = payload;
                } else {
                    return index;
                }
            });
        },
        [FETCH_POST](state, payload) {
            state.posts = payload;
        },
        [POST_DELETE](state, payload) {
            state.posts = state.posts.filter(i => i._id !== payload._id);
        },
        [POST_DELETE_MU](state, payload) {

            var posts = [];

            // payload.items.filter(index => {
            //     state.posts.map(item => {
            //         if (item._id != index) {
            //             // posts.push(item);
            //         }
            //     })
            // })

            state.posts = posts;

        }
    },
    actions: {
        [POST_CREATE]({ commit }, payload) {
            return api.post('/api/post', payload).then(res => {
                if (res.body.stt == 1) {
                    commit(POST_CREATE, res.body._data);
                }
                return res;
            });
        },
        [FETCH_POST]({ commit }, payload) {
            return api.post('/api/p/member', payload).then(res => {
                if (res.body.stt == 1) {
                    commit(FETCH_POST, res.body._data);
                }
                return res;
            });
        },

        [UPDATE_POST]({ commit }, payload) {
            return api.post('/api/post', payload).then(restful => {

                if (restful.body.stt == 1) {
                    commit(UPDATE_POST, restful.body._data);
                }
                return restful;
            });
        },

        [POST_DELETE]({ commit }, payload) {
            return api.post('/api/post/delete', payload).then(api => {
                if (api.body.stt == 1) {
                    commit(POST_DELETE, payload);
                }
                return api;
            });
        },
        [POST_DELETE_MU]({ commit }, payload) {
            return api.post('/api/post/delete-mul', payload).then(api => {
                if (api.body.stt == 1) {
                    commit(POST_DELETE_MU, payload);
                }
                return api;
            });
        },

        [FETCH_POST_BY_TAG]({ commit }, payload) {
            return api.get('/api/post/' + payload);
        },

    }
}