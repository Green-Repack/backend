import { injectable } from "inversify";
import mongoose from "mongoose";
import { IGeneratorIdHandler } from "../../application/interfaces/services/IGeneratorIdHandler";

@injectable()
export class IdGeneratorHandler implements IGeneratorIdHandler {
    generate(): string {
        let id = new mongoose.Types.ObjectId().toString()
        return id
    }
}