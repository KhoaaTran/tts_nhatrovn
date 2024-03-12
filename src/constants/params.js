const PARAMS = {
    VERSION: '1.09.06',
    PRICES: [
        { code: 'ALL', desc: 'Tất cả' },
        { code: '1', desc: '<= 2 triệu' },
        { code: '2', desc: '2 - 3 triệu' },
        { code: '3', desc: '3 - 4 triệu' },
        { code: '4', desc: '4 - 5 triệu' },
        { code: '5', desc: '5 - 6 triệu' },
        { code: '6', desc: '6 - 8 triệu' },
        { code: '7', desc: '>= 8 triệu' }
    ],
    YNALL: [
        { code: 'Y', desc: 'Có' },
        { code: 'N', desc: 'Không' },
        { code: 'ALL', desc: 'Tất cả' },
    ],
    YN_UNKNOW: [
        { code: 'Y', name: 'Có' },
        { code: 'N', name: 'Không' },
        { code: 'N-Y', name: 'Chưa biết' },
    ],
    GIGIAC: [
        { code: 'Y', desc: 'Tự do' },
        { code: 'N', desc: 'Theo qui định' },
        { code: 'ALL', desc: 'Tất cả' },
    ],
    NUMBER_PEOPLES: [
        { code: '1', name: '1 người' },
        { code: '2', name: '2 người' },
        { code: '3', name: '3 người' },
        { code: '4', name: '4 người' },
        { code: '5', name: '5 người' },
        { code: '6', name: '6 người' },
    ],
    NUMBER_VEHICLES: [
        { code: '0', name: 'Không' },
        { code: '1', name: '1 xe' },
        { code: '2', name: '2 xe' },
        { code: '3', name: '3 xe' },
        { code: '4', name: '4 xe' },
    ],
    HOTLINE: "0913890182",
    ESTIMATED_TIME: [
        { code: 'ONgay', name: 'Cần phòng ở ngay' },
        { code: '3D', name: '3 ngày' },
        { code: '5D', name: '5 ngày' },
        { code: '7D', name: '7 ngày' },
        { code: '15D', name: '15 ngày' },
        { code: 'FinishViewToChoose', name: 'Xem xong mới chọn' },
        { code: 'MiddleThisMonth', name: 'Giữa tháng này' },
        { code: 'EndThisMonth', name: 'Cuối tháng này' },
        { code: 'StartNextMonth', name: 'Đầu tháng sau' },
        { code: 'MiddleNextMonth', name: 'Giữa tháng sau' },
        { code: 'EndNextMonth', name: 'Cuối tháng sau' },
    ],
    TTCOCS: [
        { code: '*', name: 'Bấm chọn' },
        { code: 'Y', name: 'Có TTC' },
        { code: 'N', name: 'Không TTC' }
    ],
    TTCOCS_FILTER: [
        { code: 'ALL', name: 'Tất cả' },
        { code: 'Y-USED', name: 'Đã tài trợ' },
        { code: 'Y', name: 'Có' },
        { code: 'N', name: 'Không' }
    ],
    NTVN_QUANLY: [
        { code: 'ALL', name: 'Tất cả' },
        { code: 'Y', name: 'Quản lý' },
        { code: 'N', name: 'Không quản lý' },
    ],
    CONTRACT_SIGN_TIME: [
        { code: '0', name: 'Không' },
        { code: '1', name: '1 tháng' },
        { code: '2', name: '2 tháng' },
        { code: '3', name: '3 tháng' },
        { code: '4', name: '4 tháng' },
        { code: '5', name: '5 tháng' },
        { code: '6', name: '6 tháng' },
        { code: '7', name: '7 tháng' },
        { code: '8', name: '8 tháng' },
        { code: '9', name: '9 tháng' },
        { code: '10', name: '10 tháng' },
        { code: '11', name: '11 tháng' },
        { code: '12', name: '12 tháng' },
        { code: '13', name: '13 tháng' },
        { code: '14', name: '14 tháng' },
        { code: '15', name: '15 tháng' },
        { code: '16', name: '16 tháng' },
        { code: '17', name: '17 tháng' },
        { code: '18', name: '18 tháng' },
        { code: '19', name: '19 tháng' },
        { code: '20', name: '20 tháng' },
        { code: '21', name: '21 tháng' },
        { code: '22', name: '22 tháng' },
        { code: '23', name: '23 tháng' },
        { code: '24', name: '24 tháng' },
    ],
    ROOM_TYPES: [
        { code: 'ALL', desc: 'Tất cả' },
        { code: 'MBang', desc: 'Mặt bằng' },
        { code: '1PN', desc: '1 Phòng ngủ' },
        { code: '2PN', desc: '2 Phòng ngủ' },
        { code: '3PN', desc: '3 Phòng ngủ' },
        { code: 'Sleepbox', desc: 'Sleepbox' },
        { code: 'G-NAM', desc: 'Giường Nam' },
        { code: 'G-NU', desc: 'Giường Nữ' }
    ],
    THU_TIEN: [
        { code: 'ALL', name: 'Tất cả' },
        { code: 'N', name: 'Chưa thu' },
        { code: 'Y', name: 'Đã thu' },
    ],
    UNITS_ELECTRICITY: [
        { code: 'KWH', name: 'đ/kWh' },
        { code: 'PERSON', name: 'đ/người' },
        { code: 'ROOM', name: 'đ/phòng' },
    ],
    UNITS_WATER: [
        { code: 'M3', name: 'đ/m3' },
        { code: 'PERSON', name: 'đ/người' },
        { code: 'ROOM', name: 'đ/phòng' },
    ],
    UNITS_PARK: [
        { code: 'VEHICLE', name: 'đ/xe' },
        { code: 'ROOM', name: 'đ/phòng' },
    ],
    UNITS_WIFI: [
        { code: 'PERSON', name: 'đ/người' },
        { code: 'ROOM', name: 'đ/phòng' },
    ],
    UNITS_WASH: [
        { code: 'PERSON', name: 'đ/người' },
        { code: 'ROOM', name: 'đ/phòng' },
        { code: 'P_TIME', name: 'đ/lần' },
        { code: 'P_KG', name: 'đ/kg' },
    ],
    GENDERS: [
        { 'key': 'M', 'val': 'Nam' },
        { 'key': 'F', 'val': 'Nữ' },
        { 'key': 'O', 'val': 'Khác' },
    ],
    ACCESS_PHOTO: {
        TITLE: '"Nhatrovn - Tìm Trọ" Would Like to access photos on your device',
        MESSAGE: 'We need access to your photos to allow you to upload profile pictures and share images with friends within the app. We will never share your photos with third parties.'
    },
    URI_SCHEME: 'nhatrovn://app'
}
export default PARAMS