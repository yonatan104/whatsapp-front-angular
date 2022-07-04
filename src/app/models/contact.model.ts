export class Contact {

    constructor(public _id?: string, public name: string = '', public email: string = '', public phone: string = '', public lastMsgTimeStemp: string = '') {

    }

    setId?() {
        // Implement your own set Id
        this._id = 'hkjgbjhb '
    }
}

