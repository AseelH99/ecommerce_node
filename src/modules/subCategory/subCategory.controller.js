import slugify from "slugify";
import categoryModel from "../../../DB/model/categories.model.js";
import subCategoryModel from "../../../DB/model/subCategory.model.js";
import cloudinary from "../../services/cloudinary.js";

export const createSubCategory= async(req,res,next)=>{
 const{name,categoryId}=req.body;
 const subcategory= await subCategoryModel.findOne({name});
 if(subcategory){
    return res.status(409).json({message:`sub category allready exist ${name}`});
 }
 const category= await categoryModel.findById(categoryId);
 if(!category){
    return res.status(409).json({message:"category not found"});
 }
 const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:`${process.env.APPNAME}/subCategory`
});

const subCategory=await subCategoryModel.create({name,slug:slugify(name),categoryId,image:{secure_url,public_id}});
return res.status(201).json({message:"success",subCategory});
}
export const getSubCategory= async(req,res,next)=>{
const categoryId = req.params.id;
const category = await categoryModel.findById(categoryId);
if(!category){
    return res.status(404).json({message:"category not found"});
}
const subCategory=await subCategoryModel.find({categoryId}).populate({
    path:'categoryId'
});
return res.status(200).json({message:"success",subCategory});

}