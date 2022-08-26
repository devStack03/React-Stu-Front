import axios from "axios";
import AuthHelper from "./authHelper";
import { store } from "../redux/store";
import NProgress from "nprogress";
import { LOGOUT, SET_LOADING } from "../redux/actions/constants";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    store.dispatch({
        type: SET_LOADING,
        payload: true,
    });
    return config;
}, function (error) {
    store.dispatch({
        type: SET_LOADING,
        payload: false,
    });
    // Do something with request error
    NProgress.done();
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    NProgress.done();
    store.dispatch({
        type: SET_LOADING,
        payload: false,
    });
    return response;
}, function (error) {
    NProgress.done();
    store.dispatch({
        type: SET_LOADING,
        payload: false,
    });
    // Do something with response error
    return Promise.reject(error);
});

const withAuth = (headers = {}) => {
    return {
        ...headers,
        'Authorization': `Token ${AuthHelper.getAccessToken()}`
    }
};

const base = (method, url, data = {}, headers = {}, secure = true) => {
    if (secure) {
        return axios({
            method,
            url,
            data,
            headers: withAuth(headers),
        }).catch(err => {
            if (err.response.status === 401) {
                store.dispatch({
                    type: LOGOUT
                });
            }
            throw err;
        });
    } else {
        return axios({
            method,
            url,
            headers,
            data
        })
    }
};

const ApiHelper = {};

['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
    ApiHelper[method] = base.bind(null, method);
});

export default ApiHelper;
