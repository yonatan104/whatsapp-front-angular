import { Message } from "./message"
export class ChatRoom {

    constructor(
        public _id: string,
        public usersIds: string[],
        public messages: Message[],
    ) {

    }
}

