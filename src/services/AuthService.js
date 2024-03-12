import { axiosInstance } from './axiosInstance';

const AuthService = {
    postData: (url, userInfo, data) => {
        return axiosInstance.call().post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': userInfo == null ? "" : userInfo?.token,
                'auth-token': userInfo?.token || ''
            },
        });
    },
    postDataStream: (url, userInfo, data) => {
        return axiosInstance.call().post(url, data, {
            headers: {
                // 'Content-Type': 'application/json',
                // 'auth-token': userInfo == null ? "" : userInfo?.token,
                'auth-token': userInfo?.token || ''
            },
        });
    },
    getData: (url) => {
        return axiosInstance.call().get(
            url,
            {
                headers: {
                }
            }
        )
    }
};

export default AuthService;
