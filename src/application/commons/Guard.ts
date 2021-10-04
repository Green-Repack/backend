import { ArgumentNullError } from "../errors/ArgumentNullError";
import { InvalidEmailError } from "../errors/InvalidEmailError";
import validator from "validator";

export class Guard {
    public static AgainstNullOrUndefined(argument: Object, argumentName: string) {
        if (argument == null || argument == undefined) {
            throw new ArgumentNullError(argumentName)
        }
    }

    public static AgainstInvalidEmail(email: string, argumentName: string) {
        if (!validator.isEmail(email)) {
            throw new InvalidEmailError(argumentName)
        }
    }
}