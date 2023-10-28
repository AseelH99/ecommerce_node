import { Router } from "express";
import * as categoriesRouter from './cacegories.controller.js'
import fileUpload, { fileValidation } from "../../services/multer.js";
const router= Router();
router.get('/',categoriesRouter.getGategories)
router.post('/',fileUpload(fileValidation.image).single('image'),categoriesRouter.creatCategory)
export default router;