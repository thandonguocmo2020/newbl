import api from '../../api';
import { AUTH_REGISTER, AUTH_LOGIN, MEMBER_INFO, MEMBER_UPDATE,MEMBER_UPDATE_PASSWORD  } from '../const';

export default {
    state: {
        member: null
    },
    getters: {
        member: (state) => {
            return state.member
        }
    },
    mutations: {

        [MEMBER_INFO](state, payload) {
            state.member = payload;
        }
    },
    actions: {
        [AUTH_REGISTER]({ commit }, payload) {
            return api.post('/auth/register', payload);
        },
        [AUTH_LOGIN]({ commit }, payload) {
            return api.post('/auth/login', payload).then(response => {
                if (response.body.stt == 1) {
                    localStorage.setItem('hash', response.body.token);
                    localStorage.setItem('auth', 1);
                }
                return response;
            });
        },
        [MEMBER_INFO]({ commit }, payload) {
            return api.post('/auth/info', payload).then(res => {
                if (res.body.stt == 1) {
                    commit('MEMBER_INFO', res.body.data);
                } else {
                    localStorage.removeItem('auth');
                    localStorage.removeItem('hash');
                }

                return res;
            });
        },
        [MEMBER_UPDATE]({ commit }, payload) {
            return api.post('/auth/update', payload).then(res => {
                if (res.body.stt == 1) {
                    commit('MEMBER_INFO', res.body._data);
                }
                return res;
            });
        },
        [MEMBER_UPDATE_PASSWORD]({ commit }, payload) {
            return api.post('/auth/change-pwd', payload).then(res => {
                return res;
            });
        }
    }
}