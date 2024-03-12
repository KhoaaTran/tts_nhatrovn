
export const FormatNumber = (number) => {
    try {
        return new Intl.NumberFormat('en').format(number)
    } catch (err) {
        return '';
    }
}

export const ToNumber = (string) => {
    if (undefined == string || null == string || string == '') return 0;
    try {
        var replaced = string.replace(/\s/g, '').replace(/,/g, '');
        return parseFloat(replaced)
    } catch (err) {
        return 0
    }
}

export const extractNumbersFromString = (str) => {
    // const regex = /\d+/g;
    // return str.match(regex).map(Number);
    const numbers = str.match(/\d+/g);
    if (numbers == null || numbers.length == 0) return 0;
    return ToNumber(numbers[0]);
};



export const getDescRsp = (err) => {
    if (err.response) {
        // The client was given an error response (5xx, 4xx)
        if (err.response?.status === 404) {
            return 'Không tìm thấy hàm xử lý dữ liệu.'
        } else {
            return 'Lỗi xử lý dữ liệu.'
        }
    } else if (err.request) {
        // The client never received a response, and the request was never left
        return 'Vui lòng kiểm tra lại kết nối mạng.'
    } else {
        // Anything else
        return 'Thực hiện không thành công.';
    }
}

export const FormatStringRemoveDiacritics = (inputString) => {
    return inputString
        //.toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .replace(/Đ/g, 'D')
        .replace(/đ/g, 'd');
}

export const calculateHHCTV = (price, listHHCTV) => {
    let a = 300000;
    if (null == listHHCTV || listHHCTV.length == 0) return a;
    try {
        let i = listHHCTV.length - 1;
        let f, t = 0;
        let o = null;
        let check = true;
        while (i >= 0 && check) {
            o = listHHCTV[i];
            f = 0; t = 0;
            f = o['f'] == null ? 0 : o['f']
            t = o['t'] == null ? 0 : o['t']

            if ((f == 0 || f <= price) && (t == 0 || t >= price)) {
                if (!o['a'] != null)
                    a = o['a']
                check = false;
            }

            i--;
        }
    } catch (err) {
        a = 300000;
    }
    return a;
}

export const generateRandomString = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }

    return result;
}

export const generateDeviceIdForApp = () => {
    let keys = [];
    for (let i = 0; i < 12; i++) {
        keys.push(generateRandomString(6));
    }
    return keys.join('-');
}

const moment = require('moment');
export const convertStringToDate = (input, format) => {
    if (input == null || input == '') return null;
    try {
        return moment(input, format).toDate();
    } catch (err) {
        return null;
    }
}
export const convertDateToString = (input, format) => {
    if (input == null) return '';
    try {
        return moment(input).format(format);
    } catch (err) {
        return '';
    }
}
