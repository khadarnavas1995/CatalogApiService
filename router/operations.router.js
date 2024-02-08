
const express = require('express')
const router = express.Router()
const create_error = require('http-errors')
const ProductSchema = require('../model/product.schema')

router.get('/', async (req, res, next) => {
    try {
        const listOfProducts = await ProductSchema.find({}, { __v: 0, createdAt: 0 })
        res.send({
            status: true,
            message: "product lists",
            data: listOfProducts
        })
    } catch (error) {
        next(error)
    }
})
router.post('/insert', (req, res, next) => {
    try {
        const { name, price, varient } = req?.body
        if (!name) throw create_error(422, 'product name require!')
        if (!price) throw create_error(422, 'product price require!')
        if (!varient) throw create_error(422, 'product varient require!')

        new ProductSchema(req.body).save()
        res.send({
            status: true,
            message: 'New Product Inserted Successfully!'
        })
    } catch (error) {
        next(error)
    }
})
router.patch('/update/:id', async (req, res, next) => {
    try {
        const newUpdateProduct = await ProductSchema?.findByIdAndUpdate(req?.params?.id, req?.body, { new: true })
        res.send({
            status: true,
            message: 'Product updated successfully!',
            data: newUpdateProduct
        })
    } catch (error) {
        console.log(error?.status);
        next(error)
    }
})
router.delete('/delete/:id', async (req, res, next) => {
    try {
        if (!req?.params) throw create_error(422, 'product _id require')
        const findProduct = await ProductSchema.findById(req?.params?.id)

        if (!findProduct) throw create_error(421, 'invalid product_id')
        await ProductSchema.findByIdAndDelete(req?.params?.id)
        res.send({
            status: true,
            message: 'product deleted successfully!',
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router