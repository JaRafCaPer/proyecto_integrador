import { Router } from 'express'
import CartModel from '../DAO/mongoManager/models/cart.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const result = await CartModel.find()
    res.send(result)
})

// Add product to cart
router.get('/:idc/:idp', async (req, res) => {
    const idc = req.params.idc
    const idp = req.params.idp
    const quantity = req.query.quantity || 1

    const cart = await CartModel.findById(idc)
    cart.products.push({ id: idp, quantity })
    const result = cart.save()

    res.send(result)
})

router.post('/', async (req, res) => {
    const result = await CartModel.create({products: []})
    res.send(result)
})

router.post("/:cid/product/:pid", async (req, res) => {
  try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const quantity = req.body.quantity;

      const cart = await CartModel.findById(cid);
      cart.products.push({ product: pid, quantity });
      const updatedCart = await cart.save();

      res.json(updatedCart);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


export default router
