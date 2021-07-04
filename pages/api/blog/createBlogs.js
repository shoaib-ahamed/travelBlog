/* eslint-disable import/no-anonymous-default-export */
import Blogs from '../../../models/blogModel'
import connectDB from '../../../utils/connectDB'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { title, content , images , checked} = req.body

        const blog = await Blogs.findOne({ title })
        if(blog) return res.status(400).json({err: 'This blog already exists.'})

        const newBlog = new Blogs({ 
            title, content , images , checked
        })

        await newBlog.save()
        res.json({msg: "Blog Published!"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}