import { Router } from "express";
import ProductModel from '../DAO/mongoManager/models/product.model.js'
import messageModel from "../DAO/mongoManager/models/message.model.js";


const router = Router()


router.get('/', async (req, res) => {
    const products = await ProductModel.find().lean().exec()
    res.render('products', {products })
})

router.get('/realtimeproducts', async (req, res) => {
    console.log("get products")
    const products = await ProductModel.find().lean().exec()
    res.render('products_realtime', { products })
})

router.get('/form-products', async (req, res) => {
    res.render('form', {})
})

router.get('/chat', async (req, res) => {
    try {
        const messages = await messageModel.find().lean().exec();
        res.render('chat', { messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/form-products', async (req, res) => {
    const data = req.body
    const result = await ProductModel.create(data)

    res.redirect('/')
})

export default router