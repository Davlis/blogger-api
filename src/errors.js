export class notFound extends Error {
    constructor(message) {
        super();
        this.status = 404;
        this.message = message
    }
}
