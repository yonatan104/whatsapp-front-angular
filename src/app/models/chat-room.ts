import { Message } from "./message"
export class ChatRoom {

    constructor(
        public usersIds: string[],
        public messages: Message[],
        public _id?: string,
    ) {

    }
}

