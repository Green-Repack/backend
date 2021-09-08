export interface Repository<T> {
    exists(idOrEmail: string): Promise<boolean>
    delete(id: string): Promise<void>
    save(t: T): Promise<void>
}