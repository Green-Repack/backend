import { IGreenRepackProps } from "../interface/green_repack/IGreenRepackProps";
import { Entity } from "./BaseEntity";

export class GreenRepack extends Entity<IGreenRepackProps> {
    get id(): string {
        return this._id!
    }
    
    get firstName(): string {
        return this.props.firstName
    }

    get lastName(): string {
        return this.props.lastName
    }

    get username(): string {
        return this.props.username!
    }

    get password(): string {
        return this.props.password
    }

    get creationDate(): Date {
        return this.props.creationDate
    }

    get token(): string {
        return this.props.token!
    }

    public isAdmin(): boolean {
        return this.props.admin
    }

    private constructor(props: IGreenRepackProps, id?: string) {
        super(props, id)
    }

    public static createGreenRepackMember(props: IGreenRepackProps, id?: string): GreenRepack {
        const instance = new GreenRepack(props, id)
        return instance
    }
}