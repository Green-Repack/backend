import { Router } from "express";
import bodyParser from "body-parser";
import DIcontainer from "../../../inversify.config";
import { WebhookController } from "../../application/controllers/WebhookController";

let webhookController: WebhookController = DIcontainer.resolve<WebhookController>(WebhookController)

const webhookRouter = Router();

webhookRouter.post("/", bodyParser.raw({type: 'application/json'}),webhookController.updateInfo)

export default webhookRouter