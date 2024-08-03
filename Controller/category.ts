import { Request, Response} from "express";
import { Category } from "../db/entities/Category.js";
import { AppError } from "../errors/AppErrors.js";

const getAllCategories = async (req: Request, res: Response) => {
    const categories = await Category.find()

    res.json({
        message: "getting categories successfully",
        categories: categories
    })
}

const createCategory=async(payLoad: Category)=>{
    const category = await Category.findOne({where:{name:payLoad.name}})
    if(category){
        throw new AppError('this category already exist',409,true)
    }
    return await Category.create(payLoad).save()
}

export { getAllCategories, createCategory}