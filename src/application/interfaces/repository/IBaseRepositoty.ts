export interface IBaseRepository<T> {
    exists(idOrEmailOrUsername: string): Promise<boolean>
    delete(t: T): Promise<void>
    save(t: T): Promise<void>
}