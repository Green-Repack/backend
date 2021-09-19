import { IAssociationProps } from "../entityProperties/IAssociationProps"
import { IAddress } from "../entityProperties/IAddress"
import { Entity } from "./BaseEntity"
import { IProjectAssociation } from "../entityProperties/IProjectAssociation"

export class Association extends Entity<IAssociationProps> {
    get id(): string {
        return this._id!
    }
    
    get name(): string {
        return this.props.name
    }

    get description(): string {
        return this.props.description!
    }

    get address(): IAddress {
        return this.props.address
    }

    get numRNA(): string {
        return this.props.numRNA!
    }

    get siret(): string {
        return this.props.siret!
    }

    get greenCoins(): number {
        return this.props.greenCoins
    }

    get email(): string {
        return this.props.email
    }

    get password(): string {
        return this.props.password
    }

    get token(): string {
        return this.props.token!
    }

    get creationDate(): Date {
        return this.props.creatonDate
    }

    get projects(): IProjectAssociation[] {
        return this.props.projects
    }

    public isVerified(): boolean {
        return this.props.verified
    }

    private constructor(props: IAssociationProps, id?: string) {
        super(props, id)
    }

    public static createAssociation(props: IAssociationProps, id?: string): Association {
        const instance = new Association(props, id)
        return instance
    }
}