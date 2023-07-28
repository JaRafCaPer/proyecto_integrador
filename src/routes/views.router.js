import { Router } from "express";
import ProductModel from '../DAO/mongoManager/models/product.model.js'


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

router.get("/chat", (req, res) => {
    res.render("chat");
});

router.post('/form-products', async (req, res) => {
    const data = req.body
    const result = await ProductModel.create(data)

    res.redirect('/')
})

export default router