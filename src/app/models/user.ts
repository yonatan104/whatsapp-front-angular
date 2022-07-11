export interface User {
    _id?: string
    name: string
    fullName: string
    password?: string
    imgUrl: string
    chatRoomsIds: string[]
}
