export class BadRequest extends Error {
    constructor(message) {
        super()
        this.status = 400
        this.message = message
    }
}

export class Unauthorized extends Error {
    constructor(message) {
        super()
        this.status = 401
        this.message = message
    }
}

export class Forbidden extends Error {
    constructor(message) {
        super()
        this.status = 403
        this.message = message
    }
}

export class NotFound extends Error {
    constructor(message) {
        super()
        this.status = 404
        this.message = message
    }
}

export class NotImplemented extends Error {
    constructor(message) {
        super()
        this.status = 501
        this.message = message
    }   
}
