import { Request, Response } from "express";
import express from 'express';
import env from 'dotenv';
import shopRouter from "./routers/shop.js"
import productRouter from "./routers/product.js"
import hotlineRouter from "./routers/hotline.js"
import categoryRouter from "./routers/category.js"
import AppDataSource from "./db/dbConfig.js";
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandller.js"

const app = express();
env.config();
const PORT = process.env.PORT || 3000;
app.use(express.json())

app.use('/shop', shopRouter)

app.use('/product', productRouter)

app.use('/hotline', hotlineRouter)

app.use('/category', categoryRouter)


app.use(customErrorHandler)

app.use(DefaultErrorHandler)


AppDataSource.initialize().then(()=>{
    console.log("connect to DB");
    
}).catch(err => {
    console.log("failed to connect to DB"+ err);
    
})

app.listen(PORT, () => {
    console.log(`server is running on host: http://localhost:${PORT}`);
});



export default app;
