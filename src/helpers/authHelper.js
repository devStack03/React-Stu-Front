import { store } from "../redux/store";
import ApiHelper from "./apiHelper";
import * as variable from "../variables/variables";

class AuthHelper {
    login = (username, password) => {
        return ApiHelper.post(`${variable.API_URL}/api/auth/login/`, { username, password }, {}, false);
    };
    socialLogin = (user) => {
        return ApiHelper.post(`${variable.API_URL}/api/auth/login/`, user, {}, false);
    };
    getUserInfo = () => {
        return ApiHelper.get(`${variable.API_URL}/api/auth/user/`);
    };
    register = (user) => {
        return ApiHelper.post(`${variable.API_URL}/api/auth/register/`, user, {}, false)
    }
    setUserRole = (id, role) => {
        const data = {
            id: id,
            role: role
        }
        return ApiHelper.post(`${variable.API_URL}/api/domains/users/`, data, {}, false);
    }
    getAccessToken = () => {
        let state = store.getState();
        if (state.auth.isAuthenticated) {
            return state.auth.token;
        }
        return null;
    };

    updateProfile = profile => {
        return ApiHelper.put(`${variable.API_URL}/api/auth/user/`, profile);
    }
}

export default new AuthHelper();

