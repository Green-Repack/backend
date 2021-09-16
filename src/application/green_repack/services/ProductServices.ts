import {IAddress} from "../../../domain/interface/common/IAddress";

export class ProductServices{
    static generateColissimoLabel(sender: IAddress, receiver: IAddress) : string{
        console.log("Sender : "+sender);
        console.log("Sender : "+receiver);
        return "https://shippinglabelgr.blob.core.windows.net/pdf/preview-colissimo-5y00002479163-1.pdf"
    }
}
