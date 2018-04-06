export class badRequest extends Error {
    constructor(message) {
        super();
        this.status = 400;
        this.message = message;
    }
}

export class notFound extends Error {
    constructor(message) {
        super();
        this.status = 404;
        this.message = message
    }
}
