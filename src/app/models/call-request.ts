export interface CallRequest {
    toUserId: string
    fromUser: {
        _id: string
        name: string
        imgUrl: string
        peerId: string
    }
    isVideo: boolean
}
