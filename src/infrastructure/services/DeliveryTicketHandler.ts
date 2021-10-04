import { injectable } from "inversify";
import { IDeliveryTicketHandler } from "../../application/interfaces/services/IDeliveryTicketHandler";
import { IAddress } from "../../domain/entityProperties/IAddress";
import fs from "fs";
import PDFDocument from "pdfkit";
import blobStream  from "blob-stream";
import {BlobServiceClient} from "@azure/storage-blob";
import autoBind from "auto-bind";
import config from "../../../config";


@injectable()
export class DeliveryTicketHanlder implements IDeliveryTicketHandler {

    constructor() {
      autoBind(this);
    }

    async generate(senderLastName: string, senderFirstName: string, senderAddress: IAddress, receiverLastName: string, receiverFirstName: string, 
        receiverAddress: IAddress, weight: number, productId: string): Promise<string> {
        const doc = new PDFDocument();
        const stream = doc.pipe(blobStream());
        let fileName: string = "shipping_label_"+Date.now()+".pdf";
    
        const today = new Date()
        doc.image('pdf_template/background.png', {
            scale : 0.5,
            align: 'center',
            valign: 'center'
        });
    
        doc.pipe(fs.createWriteStream(fileName));
    
        let date: number = today.getDate();
        let month: number = today.getMonth()+1;
        let year: number = today.getFullYear();
    
        doc.fontSize(9).text(date+"/"+month+"/"+year, 168, 170);
    
        doc.fontSize(11).text(senderLastName+" "+senderFirstName, 42, 41);
        doc.fontSize(11).text(senderAddress.streetNumber+ " "+senderAddress.streetName, 42, 53);
        doc.fontSize(11).text(senderAddress.zipCode+" "+senderAddress.city, 42, 64);
    
        doc.fontSize(11).text(receiverLastName+" "+receiverFirstName, 296, 185);
        doc.fontSize(11).text(receiverAddress.streetNumber+ " "+receiverAddress.streetName, 296, 197);
        doc.fontSize(11).text(receiverAddress.zipCode+" "+receiverAddress.city, 296, 209);
    
        
        doc.fontSize(11).text(receiverLastName+" "+receiverFirstName, 296, 500);
        doc.fontSize(11).text(receiverAddress.streetNumber+ " "+receiverAddress.streetName, 296, 512);
        doc.fontSize(11).text(receiverAddress.zipCode+" "+receiverAddress.city, 296, 524);
        
        
        doc.fontSize(9).text(weight, 168, 191);
        doc.fontSize(9).text(productId.substring(0,10), 165, 200);
    
        doc.fontSize(11).text(this.getPriceFromWeight(weight), 230, 187);
        doc.end();
    
        stream.on('finish', function() {
            fs.readFile(fileName, async (err, data) => {
            if (err) throw err;
    
            const blobServiceClient = await BlobServiceClient.fromConnectionString(config.AZURE_STORAGE_CONNECTION_STRING);
    
            const container = "pdf"
            const containerClient = await blobServiceClient.getContainerClient(container);
    
    
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            await blockBlobClient.upload(data, data.length);
            
            fs.unlinkSync(fileName);
            });
        });
        return process.env.ShIPPING_LABEL_URL+fileName;
    }

    public getPriceFromWeight(weight: number): number {
        if(weight<0.25 && weight>=0){
          return 4.95
        }
        if(weight>=0.25 && weight<0.5){
          return 6.15
        }
        if(weight>=0.5 && weight<0.75){
          return 7
        }
        if(weight<1 && weight>=0.75){
          return 7.65
        }
        if(weight>=1 && weight>=2){
          return 8.65
        }
        if(weight<2 && weight>=5){
          return 13.15
        }
        if(weight>=10 && weight<30){
          return 19.2
        }
        return 27.30
    }
}