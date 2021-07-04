/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useContext, useState } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import { imageUpload } from '../utils/imageUpload'

const Profile = () => {
    const initialState = { title: '', content: '' , images: '' , checked: false}

    const [blogData, setBlogData] = useState(initialState)
    const { title, content , images, checked} = blogData

    const [state , dispatch] = useContext(DataContext)
    const { auth , notify } =  state

    const handleChange = e => {
        const { name, value } = e.target
        setBlogData({...blogData, [name]:value})
    }

    const handleChangeImage = async (e) => {
        const file = e.target.files[0]
        
        if(!file)
            return dispatch({type: 'NOTIFY', payload: {error: 'File does not exist.'}})

        if(file.size > 1024 * 1024) //1mb
            return dispatch({type: 'NOTIFY', payload: {error: 'The largest image size is 1mb.'}})

        if(file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return dispatch({type: 'NOTIFY', payload: {error: 'Image format is incorrect.'}})

         setBlogData({...blogData, images: file})    
         
       
    }

    const uploadImage = async () => {
        let media = await  imageUpload([images])
        console.log(media)
        setBlogData({...blogData, images: media[0].url})  
        console.log(images)   
    }

    const handleSubmit = async e => {
        e.preventDefault()
       dispatch({ type: 'NOTIFY', payload: {loading: true}})
       await uploadImage()
        const res = await  postData('blog/createBlogs' , blogData)

        if(res.err) return dispatch({ type: 'NOTIFY' ,  payload: {error: res.err } })

        return dispatch({ type: 'NOTIFY' ,  payload: {success: res.msg  } })

    }

    if(!auth.user) return null

    return (
        <div className="profile_page">
        <Head>
            <title>Profile</title>
        </Head>

        <section className="row text-secondary my-3">
            <div className="col-md-4">
                <h3 className="text-center text-uppercase">
                     
                </h3>

                <div className="avatar">
                    <img src={auth.user.avatar} alt="avatar" />     
                </div>

                <h1>{auth.user.name}  Blogs :</h1>

                

              <form onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={title} className="form-control"
                            placeholder="Blog title" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <input type="content" name="content" value={content}  className="form-control" 
                            placeholder="Blog content" onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="images">Image</label>
                            <input type="file" name="file"  className="form-control"
                            placeholder="Your new password" 
                            accept="image/*"  onChange={handleChangeImage}/>
                        </div>


                        <button className="btn btn-info">
                            Create Blog
                        </button> 
              </form>
            </div>
        </section>
    </div>
    )
}

export  default Profile