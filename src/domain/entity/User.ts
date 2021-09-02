import { MongoExpiredSessionError } from "mongodb";
import { IUserProps } from "../interface/user/IUserProps";
import { IAddress } from "../interface/common/IAddress";
import { IGreenCoins } from "../interface/common/IGreenCoins";
import { Entity } from "./BaseEntity";

export class User extends Entity<IUserProps> {
    get firstName(): string {
        return this.props.firstName
    }

    get lastName(): string {
        return this.props.lastName
    }

    get email(): string {
        return this.props.email
    }

    get password(): string {
        return this.props.password
    }

    get address(): IAddress {
        return this.props.address
    }

    get greenCoins(): IGreenCoins {
        return this.props.greenCoins
    }

    get token(): string {
        return this.props.token!
    }

    private constructor(props: IUserProps, id?: string) {
        super(props, id)
    }

    public static createUser(props: IUserProps, id?: string): User {
        const instance = new User(props, id)
        return instance
    }

    public isMarchand(): boolean {
        return this.props.marchand
    }
}