/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useContext, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { getData } from '../../utils/fetchData';


const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const [ state, dispatch ] = useContext(DataContext)
    const { cart } = state

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    return(
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="col-md-6">
                <img src={ product.images } alt={ product.images }
                className="d-block img-thumbnail rounded mt-4 w-100"
                style={{height: '350px'}} />

                {/* <div className="row mx-0" style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}

                </div> */}
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>


                <div className="my-2">{product.content}</div>
                <div className="my-2">
                    {product.content}
                </div>

            </div>
        </div>
    )
}


export async function getServerSideProps({params: {id}}) {
    const res = await getData(`blog/${id}`)
    // server side rendering
    return {
      props: {
           product: res.product 
        }, // will be passed to the page component as props
    }
}


export default DetailProduct;