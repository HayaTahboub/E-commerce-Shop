import { NextFunction, Router, Request, Response } from "express";
import { createShop, getSingleShop } from "../Controller/shop.js";

const router = Router()

router.post("/", async (req:Request, res:Response, next:NextFunction)=>{
    try {
        if(!req.body.shopName || !req.body.email || !req.body.password || !req.body.hotlineId){
            res.status(400).json({
                message:"some fields are missing",
                success: false
            })
        }
        const shop = await createShop(req.body, req.body.hotlineId)
        res.status(200).json({
            message :"shop created successfully",
            shop: shop
        })
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shopId = req.params.id
        const shop = await getSingleShop(shopId)
        res.json({
            message: "shop returned successfully",
            shop: shop
        })
    } catch (error) {
        next(error)
    }
})

export default router