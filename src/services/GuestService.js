import { axiosInstance } from './axiosInstance'

const GuestService = {
    postData: (url, data) => {
        return axiosInstance.call().post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    },
    postDataStream: (url, data) => {
        return axiosInstance.call().post(
            url,
            data,
            {
                headers: {
                    // 'Content-Type': 'application/json'
                }
            }
        )
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

}

export default GuestService;