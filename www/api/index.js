import Vue from 'vue';
import Resource from 'vue-resource';
// import config from './server/config';
Vue.use(Resource);

Vue.http.options.root = 'localhost:4000';
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

// Fixed 400 Bad Request when use jQuery serialize()
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('#__csrf').getAttribute('content');

//application/json; charset=utf-8
//X-CSRF-Token

//  

export default {
    put(url, data) {
        return Vue.http.put(url, data);
    },
    get(url, data) {
        return Vue.http.get(url, data);
    },
    post(url, data) {
        return Vue.http.post(url, data);
    },
    delete(url, data) {
        return Vue.http.delete(url, data);
    }
}
