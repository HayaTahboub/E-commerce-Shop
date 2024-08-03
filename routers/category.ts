import { Router, Request, Response, NextFunction } from "express";
import { createCategory, getAllCategories } from "../Controller/category.js";


const router = Router()

router.get("/", getAllCategories)

router.post('/', async(req:Request,res:Response, next:NextFunction)=>{
    try {
        if(!req.body.name){
            res.status(400).json({
                message:"some fields are missing",
                success: false
            })
        }
        const category = await createCategory(req.body)
        res.status(200).json({
            message :"category created successfully",
            category:category
        })
    } catch (error) {
        next(error)
    }
})

export default router