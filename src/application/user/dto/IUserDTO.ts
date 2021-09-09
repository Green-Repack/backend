import { IAddress } from "../../../domain/interface/common/IAddress";
import { IGreenCoins } from "../../../domain/interface/common/IGreenCoins";

export interface IUserDTO {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    greenCoins: IGreenCoins
    merchant: boolean
    token?: string
    address: IAddress
    siret?: string
    siren?: string
}