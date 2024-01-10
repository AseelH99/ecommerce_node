import slugify from "slugify";
import cloudinary from "../../services/cloudinary.js";
import categoryModel from "../../../DB/model/categories.model.js";
import { pagination } from "../../services/pagination.js";
import productModel from "../../../DB/model/product.model.js"
export const getGategories= async (req,res,next)=>{
    const {skip,limit} = pagination(req.query.page,req.query.limit); 
    const categories = await categoryModel.find().skip(skip).limit(limit).populate('subcategory');
    return res.status(200).json({message:"sucess",categories});

}
export const getSpesificCategory=async  (req,res,next)=>{
const {id}= req.params;
const category = await categoryModel.findById(id).populate('subcategory');
if(category){
    return res.status(200).json({message:"success",category});
}else{
    return next( new Error(`There is no category with this id`,{cause:404}))
  
}

}
export const creatCategory = async (req,res,next)=>{
    const name = req.body.name.toLowerCase();
    if(await categoryModel.findOne({name})){
        //return res.status(409).json({"message":"category name is allready exisit"});
        return next(new Error(`message":"category name is allready exisit`,{cause:409}));
    }
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APPNAME}/categories`
    })
     const cat =await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id},
     createdBy:req.user._id,updatedBy:req.user._id });
    res.status(201).json({"message":"category is created",cat});
}

export const updateCategory = async (req,res,next)=>{
    const {id}= req.params;
    try{
        const cat =await categoryModel.findById(id);
        if(!cat){
            return res.status(400).json({message:`invalid category id ${id}`});
        }
        if(req.body.name){
          if(await categoryModel.findOne({name:req.body.name,_id:{$ne:cat._id}}).select('name'))
           {return res.status(400).json({message:"name is already exisit"});}
          cat.name=req.body.name;
          cat.slug=slugify(req.body.name);
        }
        if (req.body.status){
            cat.status=req.body.status;
        }
        if(req.file){
            const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
                folder:`${process.env.APPNAME}/categories`
            });
            await cloudinary.uploader.destroy(cat.image.public_id);
            cat.image={secure_url,public_id}
        }
        cat.updatedBy=req.user._id;
        await cat.save();
        return res .status(200).json({message:"sucess",cat});
    }
    catch(err){
        return res.status(500).json({message:"error",err})
    }
}
export const getActiveCategory = async (req,res,next)=>{
    try{
           const {skip,limit} = pagination(req.query.page,req.query.limit);
           const categories =await categoryModel.find({status:'Active'}).skip(skip).limit(limit).select('name image');
           return res.status(200).json({message:"success",categories});
    }
    catch(err){
          return res.json({err:err.stack});
    }
}
export const deleteCategory = async (req,res,next)=>{
    const {categoryId}=req.params;
    const category = await categoryModel.findByIdAndDelete(categoryId);
    if(!category){
        return next( new Error(`category not found`,{cause:404}));
    }
    await productModel.deleteMany({categoryId});
    return res.status(200).json({message:"success"});
}