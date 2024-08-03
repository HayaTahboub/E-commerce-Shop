import { Router, Request, Response, NextFunction } from "express";
import { createHotline } from "../Controller/hotline.js";


const router= Router()

router.post('/', async(req:Request,res:Response, next:NextFunction)=>{
    try {
        if(!req.body.hotlineNumber){
            res.status(400).json({
                message:"some fields are missing",
                success: false
            })
        }
        const hotline = await createHotline(req.body)
        res.status(200).json({
            message :"hotline created successfully",
            hotline:hotline
        })
    } catch (error) {
        next(error)
    }
})



export default router