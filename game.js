require("js/matchvs.js")

let matchvsEngine = new MatchvsEngine()
let matchvsResponse = new MatchvsResponse()

let GameData = {
    gameId: 201126,
    appKey: "f38ef43d2c024590afd295cc311440dd",
    secretKey: "9ae1acc200bd4a178d0be24bf3b1f5a3",
    gameVersion: 1,
    channel: "Matchvs",
    platform: "release",
    deviceId: "123456789",
    gatewayId: 0,

    userId: 0,
    userName: "",
    avatarUrl: "avatar_png",
    token: "",

    maxPlayer: 2,
    roomId: 0,
    rate: 20,
}

/**
 * init
 */
function init(cb) {
    matchvsResponse.initResponse = (data) => {
        console.log('[initResponse]', data)
        cb && cb()
    }
    let result = matchvsEngine.init(matchvsResponse, GameData.channel, GameData.platform, GameData.gameId)
    console.log('[init]', result)
}

/**
 * registerUserResponse
 */
function registerUser(cb) {
    matchvsResponse.registerUserResponse = (data) => {
        console.log('[registerUserResponse]', data)
        GameData.userId = data.id;
        GameData.token = data.token;
        GameData.userName = data.id;
        GameData.avatarUrl = data.avatar;

        cb && cb()
    }
    let result = matchvsEngine.registerUser()
    console.log('[registerUser]', result)
}

function login(cb) {
    matchvsResponse.loginResponse = (data) => {
        console.log('[loginResponse]', data)
        cb && cb()
    }
    let result = matchvsEngine.login(GameData.userId, GameData.token,
        GameData.gameId, GameData.gameVersion, GameData.appKey,
        GameData.secretKey, GameData.deviceId, GameData.gatewayId)
    console.log('[login]', result)
}

function logout(cb) {
    matchvsResponse.logoutResponse = (data) => {
        console.log('[logoutResponse]', data)
        cb && cb()
    }
    let result = matchvsEngine.logout('')
    console.log('[logout]', result)
}

function joinRandomRoom(cb) {
    matchvsResponse.joinRoomResponse = (status, userInfoList, roomInfo) => {
        console.log('[joinRoomResponse]')
        console.log('status', status)
        console.log('userInfoList', userInfoList)
        console.log('roomInfo', roomInfo)
        cb && cb()
    }
    let result = matchvsEngine.joinRandomRoom(GameData.maxPlayer, GameData.userName)
    console.log('[joinRandomRoom]', result)
}

function leaveRoom(cb) {
    matchvsResponse.leaveRoomResponse = (leaveRoomInfo) => {
        console.log('[leaveRoomResponse]', leaveRoomInfo)
        cb && cb()
    }
    let result = matchvsEngine.leaveRoom(GameData.userName)
    console.log('[leaveRoom]', result)
}

function getRoomList(cb) {
    matchvsResponse.getRoomListResponse = (status, roomInfos) => {
        console.log('[getRoomListResponse]')
        console.log('status', status)
        console.log('roomInfos', roomInfos)
        cb && cb()
    }
    let result = matchvsEngine.getRoomList(new MsRoomFilter(GameData.maxPlayer, 0, 0, ''))
    console.log('[getRoomList]', result)
}

function joinRoom(cb) {
    matchvsResponse.joinRoomResponse = (status, userInfoList, roomInfo) => {
        console.log('[joinRoomResponse]')
        console.log('status', status)
        console.log('userInfoList', userInfoList)
        console.log('roomInfo', roomInfo)
        cb && cb()
    }
    let result = matchvsEngine.joinRoom(GameData.roomId, GameData.userName)
    console.log('[leaveRoom]', result)
}

function setFrameSync(cb) {
    matchvsResponse.setFrameSyncResponse = (rsp) => {
        console.log('[setFrameSyncResponse]', rsp)
        cb && cb()
    }
    let result = matchvsEngine.setFrameSync(GameData.rate)
    console.log('[setFrameSync]', result)
}

function frameUpdate(cb) {
    matchvsResponse.frameUpdate = (data) => {
        console.log('[frameUpdate]', data)
        cb && cb()
    }
}

init(() => {
    registerUser(() => {
        login(() => {
            // logout(() => {

            // })
            getRoomList(() => {

            })

            // joinRandomRoom(() => {
            //     leaveRoom(() => {

            //     })
            // })

            // joinRoom(() => {
            //     leaveRoom(() => {

            //     })
            // })

            joinRandomRoom(() => {
                setFrameSync(() => {
                    frameUpdate(()=>{
                    })                    
                })
            })
        })
    })
})


