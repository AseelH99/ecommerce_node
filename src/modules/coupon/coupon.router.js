import { Router } from "express";
import * as couponController from'./coupon.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import * as validatores from './coupon.validation.js';
import { vaildation } from "../../services/validation.js";


const router= Router();
router.post('/',vaildation(validatores.createCoupon),asyncHandler(couponController.createCoupon));
router.get('/',asyncHandler(couponController.getCoupons));
router.put('/:id',asyncHandler(couponController.updateCoupon));
router.patch('/softDelete/:id',asyncHandler(couponController.softdelete));
router.delete('/hardDelete/:id',asyncHandler(couponController.hardDelete));
router.patch('/restore/:id',asyncHandler(couponController.restorCoupon));

export default router;