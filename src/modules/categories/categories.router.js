import { Router } from "express";
import * as categoriesController from './cacegories.controller.js'
import subCategoryRouter from '../subCategory/subcategory.router.js'
import fileUpload, { fileValidation } from "../../services/multer.js";
import { auth, roles } from "../../middleware/auth.js";
import { endPoint } from "./category.endpoint.js";
import { asyncHandler } from "../../services/errorHandling.js";
import * as validitors from './category.validation.js'
import { vaildation } from "../../services/validation.js";

const router= Router();
router.use('/:id/subCategory',subCategoryRouter)
router.get('/',auth(endPoint.getAll),asyncHandler(categoriesController.getGategories))
router.get('/active',asyncHandler(categoriesController.getActiveCategory));
router.get('/:id',auth(endPoint.spesific),vaildation(validitors.getSpecificCategory),asyncHandler(categoriesController.getSpesificCategory));
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),vaildation(validitors.createCategory),asyncHandler(categoriesController.creatCategory))
router.put('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),asyncHandler(categoriesController.updateCategory))
router.delete('/:categoryId',auth(endPoint.delete),asyncHandler(categoriesController.deleteCategory))
export default router;