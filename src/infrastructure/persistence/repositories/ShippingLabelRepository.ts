import { ShippingLabelMap } from "../../../application/mappers/ShippingLabelMap";
import {ShippingLabel} from "../../../domain/entity/ShippingLabel";
import {IShippingLabelProps} from "../../../domain/interface/shippingLabel/IShippingLabelProps";
import {IShippingLabelRepository} from "../../../domain/interface/shippingLabel/IShippingLabelRepository";
import { ShippingLabelModel } from "../schemas/ShippingLabel";

export class ShippingLabelRepository implements IShippingLabelRepository{
    async delete(id: string): Promise<void> {
        await ShippingLabelModel.findByIdAndDelete(id);
    }

    async exists(id: string): Promise<boolean> {
        let label = await ShippingLabelModel.findById(id);
        return !!label;
    }

    async getAllByProductId(prodId: string): Promise<IShippingLabelProps[]> {
        let labels = await ShippingLabelModel.find({productId: prodId});
        if(labels) return labels;
        return []
    }

    async getAllByUserId(userId: string): Promise<IShippingLabelProps[]> {
        let labels = await ShippingLabelModel.find({userId: userId});
        if(labels) return labels;
        return []
    }

    async getAllByWareHouseId(wareHouseId: string): Promise<IShippingLabelProps[]> {
        let labels = await ShippingLabelModel.find({wareHouseId: wareHouseId});
        if(labels) return labels;
        return []
    }

    async getAllWhereDateIsPast(date: Date): Promise<IShippingLabelProps[]> {
        let maxDate = new Date(Date.now()-1000*60*60*24*14)
        let products = await ShippingLabelModel.find({
            creationDate: {
                $lt: maxDate
            }
        });
        if(products) return products
        return [];
    }

    async save(t: ShippingLabel): Promise<void> {
        let exist = await this.exists(t.id);
        let rawShippingModelData = ShippingLabelMap.toPersistence(t);

        if(exist){
            const mongoLabel = await ShippingLabelModel.findById(t.id);
            if(mongoLabel) await ShippingLabelModel.updateOne(rawShippingModelData);
        }else{
            await ShippingLabelModel.create(rawShippingModelData);
        }
    }

}
