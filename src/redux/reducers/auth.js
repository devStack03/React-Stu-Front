/* eslint-disable no-fallthrough */
import { toastr } from "react-redux-toastr";
import {
    LOGIN_REQUEST,
    REFRESH_TOKEN_REQUEST,
    GET_USER_INFO_REQUEST,
    LOGIN_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REFRESH_TOKEN_FAILURE,
    GET_USER_INFO_FAILURE,
    GET_USER_INFO_SUCCESS,
    SIGNUP_SUCCESS,
    SET_LOADING,
    SUCCESS_CHANGED_ROLE_REQUEST,
    ROLE_CHANGED,
} from "../actions/constants";

const initialState = {
    token: localStorage.getItem("token"),
    isLoading: false,
    isAuthenticated: null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    userRole: {}
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SUCCESS_CHANGED_ROLE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ROLE_CHANGED:
            return {
                ...state,
                userRole: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case LOGIN_REQUEST:
        case REFRESH_TOKEN_REQUEST:
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
        case REFRESH_TOKEN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", action?.payload?.user ? JSON.stringify(action.payload.user) : '{}');
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                token: action.payload.token
            };

        case LOGIN_FAILURE:
            console.log('login failed');
            toastr.error("Login Failed", "Please check your credentials");
        case LOGOUT:
        case REFRESH_TOKEN_FAILURE:
        case GET_USER_INFO_FAILURE:
            // localStorage.removeItem("token");
            localStorage.clear();
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };

        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            };
        default:
            return state
    }
}
