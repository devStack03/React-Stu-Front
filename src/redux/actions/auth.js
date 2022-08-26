import AuthHelper from "../../helpers/authHelper";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SUCCESS_CHANGED_ROLE_REQUEST,
    ROLE_CHANGED,
    ROLE_CHANGED_FAILED
} from "./constants"

export const login = (email, password) => dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    return AuthHelper.login(email, password)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        }).catch(err => {
            dispatch({
                type: LOGIN_FAILURE,
            });
            throw (err);
        });
};

export const setUserRole = (id, role) => dispatch => {
    dispatch({ type: SUCCESS_CHANGED_ROLE_REQUEST});
    return AuthHelper.setUserRole(id, role)
        .then(res => {
            // console.log(res.data); return;
            dispatch({
                type: ROLE_CHANGED,
                payload: res.data
            });
        }).catch(err => {
            dispatch({
                type: ROLE_CHANGED_FAILED
            });
            throw (err);
        });
}

export const socialLogin = (user, type) => dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    let userInfo = null
    if (type === 'google') {
        userInfo = {
            "username": user.email,
            "authentication_type": "2",
            "authentication_label": "2",
            "authentication_token": user.id_token
        }

    } else if (type === 'facebook') {
        userInfo = {
            "username": user.email,
            "authentication_type": "2",
            "authentication_label": "3",
            "authentication_token": user.accessToken
        }
    }
    return AuthHelper.socialLogin(userInfo)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        }).catch((err) => {
            dispatch({
                type: LOGIN_FAILURE,
            });
            throw (err);
        });
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const refreshToken = () => (dispatch, getState) => {
    let token = getState().auth.refresh.token;
    dispatch({ type: REFRESH_TOKEN_REQUEST });
    return AuthHelper.refreshToken({ refresh: token })
        .then(res => {
            dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: res.data,
            });
        }).catch(() => {
            dispatch({
                type: REFRESH_TOKEN_FAILURE,
            });
        });
};

export const getUserInfo = () => dispatch => {
    dispatch({ type: GET_USER_INFO_REQUEST });
    return AuthHelper.getUserInfo()
        .then(res => {
            dispatch({
                type: GET_USER_INFO_SUCCESS,
                payload: res.data
            });
        }).catch(() => {
            dispatch({
                type: GET_USER_INFO_FAILURE,
            });
        });
};

export const signup = (userInfo) => dispatch => {
    dispatch({ type: SIGNUP_REQUEST });
    return AuthHelper.register(userInfo)
        .then(res => {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });
        }).catch(err => {
            dispatch({
                type: SIGNUP_FAILURE,
            });
            throw (err);
        });
};

