import joi from "joi";
import { generalFields } from "../../services/validation";

export const createProduct=joi.object({
    name:joi.string().min(3).max(25).required(),
    description:joi.string().min(2).max(15000),
    stock:joi.number().integer().required(),
    discount:joi.number().positive().min(1),
    price:joi.number().positive().min(1),
    file:joi.object({
        mainImage:joi.array().items(generalFields.file.required()).length(1),
        subImages:joi.array().items(generalFields.file.required()).min(2).max(4)
    }),
    status:joi.string().valid('Active','Inactive'),
    categoryId:joi.string().required(),
    subcategoryId:joi.string().required(),
    
}).required()