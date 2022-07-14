export class Contact {

    constructor(
        public _id?: string,
        public name: string = '',
        public password?: string,
        public lastMsgTimeStemp: string = '',
        public imgUrl: string = '' ,
        public chatRoomsIds?: string[]
    ) {

    }
}

