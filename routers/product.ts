import { Router, Request, Response, NextFunction } from "express"
import { createProduct, getAllProducts, getSingleProduct } from "../Controller/product.js"



const router = Router()

router.get("/", getAllProducts)

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.name || !req.body.price) {
            return res.status(400).json({
                message: "some fields are missing",
                success: false
            })
        }
        const product = await createProduct(req.body,req.body.shopId, req.body.categories)
        res.json({
            message: "product created successfully",
            product: product
        })
    } catch (error) {
        next(error)
    }
})


router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Number(req.params.id)
        const product = await getSingleProduct(productId)
        res.json({
            message: "product returned successfully",
            product: product
        })
    } catch (error) {
        next(error)
    }
})


export default router;