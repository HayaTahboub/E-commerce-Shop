import { Shop } from "../db/entities/Shop.js";
import { AppError } from "../errors/AppErrors.js";
import { Hotline } from "../db/entities/Hotline.js";
import bcrypt from "bcrypt"

const createShop = async(payLoad:Shop, hotlineId:number)=>{
    let shop = await Shop.findOne({where: {email: payLoad.email}})
    if(shop){
        throw new AppError("Email already exists",409,true)
    }
    
    const hotline = await Hotline.findOne({where:{id:hotlineId}})
    if(!hotline){
        throw new AppError("Hotline dose not exist", 409, true)
    }

    shop = await Shop.findOne({where:{hotline: hotline}})
    if(shop){
        throw new AppError("hotline already exist", 409, true)
    }

    payLoad.password = await bcrypt.hash(payLoad.password,10)
    const newShop = await Shop.create({...payLoad, hotline}).save()
    return newShop

}

const getSingleShop = async(ShopId: string) => {
    const shop = await Shop.findOne({where:{id: ShopId}})
    

    if (!shop) {
        throw new AppError("shop not found ", 404, true)
    }
    return shop
}

export {getSingleShop, createShop}