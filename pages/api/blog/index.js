/* eslint-disable import/no-anonymous-default-export */
import Blogs from '../../../models/blogModel'
import connectDB from '../../../utils/connectDB'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Blogs.find()
        
        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}