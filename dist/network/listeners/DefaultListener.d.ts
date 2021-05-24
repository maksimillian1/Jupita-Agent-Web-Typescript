interface defaultListener {
    onSuccess(week: object): void;
    onError(statusCode: string, response: object): void;
}
