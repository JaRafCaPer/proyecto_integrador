import mongoose from "mongoose";

const productModel = mongoose.model('products', new mongoose.Schema({
        name: { type: String, require: true, unique:true},
        image: String ,
        description: String,
        price: Number,
        status: String, 
        stock: Number,
}))

export default productModel