export class badRequest extends Error {
    constructor(message) {
        super();
        this.status = 400;
        this.message = message;
    }
}

export class unauthorized extends Error {
    constructor(message) {
        super();
        this.status = 401;
        this.message = message;
    }
}

export class forbidden extends Error {
    constructor(message) {
        super();
        this.status = 403;
        this.message = message
    }
}

export class notFound extends Error {
    constructor(message) {
        super();
        this.status = 404;
        this.message = message
    }
}
