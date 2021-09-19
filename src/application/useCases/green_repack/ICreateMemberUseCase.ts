export interface ICreateNewMemberUseCase {
    execute(memberInfo: any): Promise<string>
}