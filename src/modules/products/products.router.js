import { Router } from "express";
import * as productController from './products.controller.js'
import fileUpload, { fileValidation } from "../../services/multer.js";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./products.endpoint.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { vaildation } from "../../services/validation.js";


const router= Router();
router.get('/',productController.getProducts)
router.get('/category/:categotyId',asyncHandler(productController.getProductWithCategory))
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields(
    [
        {name:'mainImage',maxCount:1},
        {name:'subImages',maxCount:4}
     ]),asyncHandler(productController.createProduct))
export default router;