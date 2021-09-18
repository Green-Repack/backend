import { IUserProps } from "../entityProperties/IUserProps";
import { IAddress } from "../entityProperties/IAddress";
import { IGreenCoins } from "../entityProperties/IGreenCoins";
import { Entity } from "./BaseEntity";

export class User extends Entity<IUserProps> {
    get id(): string {
        return this._id!
    }

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

    get siret(): string {
        return this.props.siret!
    }

    get siren(): string {
        return this.props.siren!
    }

    get creationDate(): Date {
        return this.props.creationDate
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