import ExtendableError from './extendable_error';
export default class ValidationError extends ExtendableError {
    constructor(m) {
        super(m);
    }
}