export interface Message {
    _id: string
    fromUser: {
        name: string
        imgUrl: string
        userId: string
    }
    text: string
    createAt: number
}
