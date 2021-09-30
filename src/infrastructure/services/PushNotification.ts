import https from 'https';
import {Product} from "../../domain/entity/Product";

export class PushNotification{

    static sendNotification(product: Product) {

        let data = {
            app_id: process.env.ONE_SIGNAL_APP_ID,
            headings: {"en": "A new product is available !", "fr": "Un nouveau produit est disponible !"},
            contents: {"en": "A "+product.name+ " is now available for the price of "+product.price+"€. Rush to buy it !!!",
                "fr": "Un "+product.name+ " est à présent disponible pour le prix de "+product.price+"€. Précipitez vous pour l'acheter !!!"},
            subtitle: {"en": product.productId, "fr": product.productId},
            included_segments: ["Subscribed Users"]
        };

        console.log(data)

        let headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic "+process.env.ONE_SIGNAL_REST_API_KEY
        };

        let options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        let req = https.request(options, function(res) {
            res.on('data', function(data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });

        req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    };
}
