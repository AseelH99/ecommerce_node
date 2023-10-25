import { Router } from "express";
import * as categoriesRouter from './cacegories.controller.js'
const router= Router();
router.get('/',categoriesRouter.getGategories)
export default router;