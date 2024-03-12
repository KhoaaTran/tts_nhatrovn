import { axiosInstanceSocketIO } from './axiosInstance'

const GuestServiceSocketIO = {
    postData: (url, data) => {
        return axiosInstanceSocketIO.call().post(
            url,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    },

}

export default GuestServiceSocketIO;