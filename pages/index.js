import Head from 'next/head'
import React, { useState } from 'react'
import BlogtItem from '../components/blogs/BlogItem'
import { getData } from '../utils/fetchData'

const Home = (props) => {

  const [blogs, setblogs] = useState(props.blogs)


  return (
    <div className="blogs">
      <Head>
          <title>Home</title>
      </Head>
      
      {
        blogs.length === 0
        ? <h2> no blogs </h2>
        : blogs.map(blogs =>(
          <BlogtItem key={blogs._id} blogs={blogs} />
        ))
      }
    </div>
  )
}

export async function getServerSideProps() {
  const res = await getData('blog')

  return {
    props: {
      blogs : res.blogs,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default Home