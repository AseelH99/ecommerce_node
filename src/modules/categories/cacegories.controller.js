import slugify from "slugify";
import cloudinary from "../../services/cloudinary.js";
import categoryModel from "../../../DB/model/categories.model.js";
export const getGategories= (req,res)=>{
    return res.json("Welcome to Categories page");

}
export const creatCategory = async(req,res)=>{
    const name = req.body.name.toLowerCase();
    if(await categoryModel.findOne({name})){
        return res.status(409).json({"message":"category name is allready exisit"});
    }
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APPNAME}/categories`
    })
     const cat =await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id}});
    res.status(201).json({"message":"category is created",cat});
}