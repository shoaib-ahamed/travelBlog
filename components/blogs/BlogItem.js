/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useState } from 'react'

const BlogsItem = ({blogs}) => {
    const [ checked , setChecked ] = useState(false)
    
    const userLink = () => {
        return(
            <>
                <Link href={`blogs/${blogs._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>View</a>
                </Link>
            </>
        )
    }

    return(
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={blogs.images} alt={blogs.images} />
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={blogs.title}>
                    {blogs.title}
                </h5>

                <div className="row justify-content-between mx-0">
                    
                </div>

                <p className="card-text" title={blogs.content}>
                    {blogs.content}
                </p>

                <div onClick={() => setChecked(true)} >
      
                    {
                        (checked) 
                        ?<i className="fas fa-heart"></i>
                        : <i className="far fa-heart"></i>
                    }
        
                </div>
                
                    
                <div className="row justify-content-between mx-0">
                    {userLink()}
                </div>
            </div>
        </div>
    )
}


export default BlogsItem