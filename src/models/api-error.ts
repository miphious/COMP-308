export class ApiError {
    ok: boolean;

    error: string;

    constructor(message) {
        this.ok = false;
        this.error = message;
    }
}
