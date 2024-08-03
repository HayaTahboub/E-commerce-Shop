import { Hotline } from "../db/entities/Hotline.js";

const createHotline = async(payLoad:Hotline)=>{
    return await Hotline.create(payLoad).save()
}

export {createHotline}