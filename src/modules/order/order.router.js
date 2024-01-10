import { Router } from "express";
import * as orederController from './order.controller.js';
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./order.endpoint.js";

const router=Router();
router.post('/',auth(endPoint.create),orederController.createOrder)
router.patch('/cancel/:orderId',auth(endPoint.cancel),orederController.cancelOrder)
router.get('/',auth(endPoint.get),orederController.getOrder)
router.patch('/changeStatus/:orderId',auth(endPoint.change),orederController.changeOrderStatus)
export default router;