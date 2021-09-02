export interface IUserDTO {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    greenCoins?: string
    marchand: boolean
    token?: boolean
}