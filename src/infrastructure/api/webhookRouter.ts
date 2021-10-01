import express , { Router } from "express";
import DIcontainer from "../../../inversify.config";
import { WebhookController } from "../../application/controllers/WebhookController";

let webhookController: WebhookController = DIcontainer.resolve<WebhookController>(WebhookController)

const webhookRouter = Router();

webhookRouter.post("/", express.raw({type: 'application/json'}), webhookController.updateInfo)

export default webhookRouter