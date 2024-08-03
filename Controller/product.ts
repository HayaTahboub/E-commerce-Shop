import { Request, Response } from "express";
import { Product } from "../db/entities/Products.js";
import { AppError } from "../errors/AppErrors.js";
import { Shop } from "../db/entities/Shop.js";
import { Category } from "../db/entities/Category.js";
import { In } from "typeorm";

const getSingleProduct = async(productId: number) => {
    const product = await Product.findOne({where:{id: productId}})
    

    if (!product) {
        throw new AppError("product not found ", 404, true)
    }
    return product
}

const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find()

    res.json({
        message: "getting products successfully",
        products: products
    })
}

const createProduct = async(payLoad:Product, shopId:string, categoriesIds:number[])=>{
    const shop = await Shop.findOne({where:{id:shopId}})
    if(!shop){
        throw new AppError("Shop dose not exist",404,true)
    }

    const product = await Product.findOne({where:{name:payLoad.name, shop:shop }})
    if(product){
        throw new AppError("Product already exist",409,true)
    }
    const categories = await Category.find({where:{id: In(categoriesIds)}})
    if(categories.length !== categoriesIds.length){
        throw new AppError("some categories are not exists",409,true)
    }

    const newShop = Product.create({...payLoad, shop, categories})
    return newShop.save()

}

export {getSingleProduct, getAllProducts, createProduct}