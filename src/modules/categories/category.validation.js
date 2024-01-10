import joi from "joi";
import { generalFields } from "../../services/validation.js";

export const createCategory = joi.object({
    name:joi.string().min(3).max(25).required(),
    file:generalFields.file.required() //one file
    //file:joi.array().items(generalFields.file.required()).required()//more than one file
})
export const getSpecificCategory=joi.object({
    id:joi.string().min(24).max(24).required(),
})