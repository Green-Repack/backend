import {IAddressDto} from "./IAddressDto";

export interface IUserDTO {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    greenCoins?: string
    marchand: boolean
    token?: boolean
    address: IAddressDto
    siret?: string
    siren?: string
}