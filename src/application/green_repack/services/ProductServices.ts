import {IAddress} from "../../../domain/interface/common/IAddress";

export class ProductServices{
    generateColissimoLabel(sender: IAddress, receiver: IAddress) : string{
        return "https://shippinglabelgr.blob.core.windows.net/pdf/preview-colissimo-5y00002479163-1.pdf"
    }
}