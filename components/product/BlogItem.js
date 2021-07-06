/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useContext, useState } from 'react'
import { DataContext } from '../../store/GlobalState'

const ProductItem = ({product, handleCheck}) => {
    const [ checked , setChecked ] = useState(false)

    const [ state, dispatch ] = useContext(DataContext)
    const { cart, auth } = state

  

    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info"
                    style={{marginRight: '5px', flex: 1}}>View</a>
                </Link>
            </>
        )
    }

    return(
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={product.images} alt={product.images} />
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                </h5>

                <div className="row justify-content-between mx-0">
                    
                </div>

                <p className="card-text" title={product.content}>
                    {product.content}
                </p>

                <div onClick={() => setChecked(true)} >
      
                    {
                        (checked) 
                        ?<i className="fas fa-heart"></i>
                        : <i className="far fa-heart"></i>
                    }
        
                </div>
                
                    
                <div className="row justify-content-between mx-0">
                    {/* {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()} */}
                    {userLink()}
                </div>
            </div>
        </div>
    )
}


export default ProductItem