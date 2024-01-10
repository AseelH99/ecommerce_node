import { Router } from "express";
import * as subCategoryController from './subCategory.controller.js'
import * as categoriesController from '../categories/cacegories.controller.js'
import fileUpload, { fileValidation } from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router= Router({mergeParams:true});

router.post('/',fileUpload(fileValidation.image).single('image'), asyncHandler (subCategoryController.createSubCategory))
router.get('/',asyncHandler(subCategoryController.getSubCategory))
export default router;