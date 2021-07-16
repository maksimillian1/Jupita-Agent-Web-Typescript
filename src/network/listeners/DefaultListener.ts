// baseListener
interface defaultListener {
    onSuccess(response: object): void;
    onError(statusCode: string, response: object): void;
}