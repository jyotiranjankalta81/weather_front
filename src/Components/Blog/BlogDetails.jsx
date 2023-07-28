import * as React from 'react'
import { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import header from '../../Assets/header.jpg'
import axios from 'axios'
import { useParams, useSearchParams } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState()

  const paramsId = useParams()

  let [searchParams, setSearchParams] = useSearchParams()
  const backendUrl = 'https://weather-back-ebon.vercel.app/'

  const getBlogDetails = () => {
    const id = searchParams.get('BLOG_ID')

    axios
      .get(`https://weather-back-ebon.vercel.app/getparticularblog/${id}`)
      .then(res => {
        setBlogDetails(res.data.res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    getBlogDetails()
  }, [searchParams.get('BLOG_ID')])

  return (
    <div className='bg-gray-800 w-full'>
      <NavBar />

      <div className='flex w-full justify-center'>
        <div className=' w-11/12 h-96 flex mt-10 bg-center'>
          <img
            src={backendUrl + blogDetails?.image}
            alt=''
            className='rounded-md w-full object-cover '
          />
        </div>
      </div>

      <div className='flex justify-center my-10'>
        <span className='category  text-white font-semibold bg-indigo-800 py-1 px-2 rounded-md text-center'>
          {blogDetails?.category}
        </span>
      </div>

      <div className='text-center'>
        <span className='text-3xl text-white font-semibold'>
          {blogDetails?.mainHeading}
        </span>
      </div>

      <div className='flex justify-center'>
        <span className=''>
          <BsThreeDots className='text-white text-6xl' />
        </span>
      </div>

      <div className='description'>
        <span className='text-white'>
          {/* {blogDetails?.description} */}
          <div dangerouslySetInnerHTML={{ __html: blogDetails?.description }} />
        </span>
      </div>
    </div>
  )
}

export default BlogDetails
