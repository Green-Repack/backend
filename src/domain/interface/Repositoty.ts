export interface Repository<T> {
    exists(idOrEmailOrUsername: string): Promise<boolean>
    delete(id: string): Promise<void>
    save(t: T): Promise<void>
}