export class NotFoundError extends Error {

}

export class ParameterError extends Error {
    constructor(func: Function, param_name: string, param_value: string) {
        super();
    }
}