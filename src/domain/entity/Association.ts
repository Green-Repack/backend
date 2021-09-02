import { IAssociationProps } from "../interface/association/IAssociationProps"
import { Entity } from "./BaseEntity"

export class Assocation extends Entity<IAssociationProps> {
    get name(): string {
        return this.props.name
    }

    get greenCoinsReceived(): number {
        return this.props.greenCoinsReceived
    }

    public isVerified(): boolean {
        return this.props.verified
    }

    private constructor(props: IAssociationProps, id?: string) {
        super(props, id)
    }

    public static createAssociation(props: IAssociationProps, id?: string): Assocation {
        const instance = new Assocation(props, id)
        return instance
    }
}