const config = {
    screens: {
        ViewRoomInfo: {
            path: "view-room-info/:key_house/:key_room",
            parse: {
                key_house: (key_house) => `${key_house}`,
                key_room: (key_room) => `${key_room}`,
            },
        },


        // LoginNavigation: 'test'
        // ListRoomForHouseNavigation: {
        //     path: "test",
        // }
        // Home: {
        //     path: "home",
        //   },
        //   Profile: {
        //     path: "profile/:id",
        //     parse: {
        //       id: (id) => `${id}`,
        //     },
        //   },
        //   Notifications: "notifications",
        //   Settings: "settings",
    }
}

const linking = {
    prefixes: ["nhatrovn://app"],
    config,
}
export default linking;