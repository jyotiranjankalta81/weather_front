import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import categories from '../Category/Categories'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BsArrowRight } from 'react-icons/bs'

const Blog = () => {
  const [blogInfo, setBlogInfo] = useState([])
  const [selectType, setSelectType] = useState(categories?.[0]?.technology)
  const [blogdata, setBlogData] = useState([])

  const navigate = useNavigate()

  const getAllBlogs = () => {
    axios
      .get('https://weather-back-ebon.vercel.app/getblogs')
      .then(res => {
        setBlogInfo(res.data)
        setBlogData(res.data)
      })
      .catch(err => {})
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  useEffect(() => {
    if (blogdata?.length !== 0) {
      if (selectType == 'All') {
        setBlogInfo(blogdata)
      } else {
        var blogs = blogdata?.filter(el => {
          return el.category == selectType
        })
        setBlogInfo(blogs)
      }
    }
  }, [selectType])

  const handlepressReadmore = props => {
    navigate('/blogdetails?BLOG_ID=' + props._id)
  }

  return (
    <div className=''>
      <div className='bg-gray-900 h-screen'>
        <NavBar />
        <div className='bg-black w-full text-white flex justify-evenly py-2 text-xs'>
          {/* <Link className='text-white' to={'/blog'}>All</Link> */}
          {categories?.map(categories => {
            return (
              <div
                className=''
                key={categories.id}
                onClick={() => setSelectType(categories?.technology)}
              >
                <span className='cursor-pointer active:text-green-500 hover:underline'>
                  {categories?.technology}
                </span>
              </div>
            )
          })}
        </div>

        <div className='w-full flex justify-center items-center flex-col py-3'>
          <div className='font-bold text-xl text-white'>
            <span className=''>Tech-Talk</span>
          </div>
          <div className=''>
            <span className='text-6xl text-white font-bold'>
              Explore <span className='text-violet-400'>learn</span> Build 🚀
            </span>
          </div>
        </div>

        <div className='blogList grid grid-cols-3 py-20 px-10 gap-10 bg-gray-900'>
          {blogInfo?.map(values => {
            return (
              <div key={values._id}>
                <div
                  onClick={() => handlepressReadmore(values)}
                  className='h-56  rounded-sm px-5 py-5 space-y-5 hover:cursor-pointer hover:shadow-gray-600 border-b-2 hover:shadow-md hover:-translate-y-1 transition-all'
                >
                  <div className='my-2'>
                    <span className='category px-2 py-1  bg-indigo-800  text-white rounded-md'>
                      {values?.category}
                    </span>
                  </div>

                  <div className='my-2'>
                    <span className='category text-2xl text-white rounded-md'>
                      {values?.mainHeading}
                    </span>
                  </div>

                  <p className='text-white my-5 text-sm '>
                    {/* {values?.description} */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: values?.description?.slice(0, 100)
                      }}
                    />{' '}
                    <span>...</span>
                  </p>

                  {/* <p className='text-white text-xs' dangerouslySetInnerHTML={{ __html: values?.description }} /> */}

                  <div className='space-x-5'>
                    <Link className='text-violet-500 flex items-center space-x-5'>
                      <p>Learn More</p>{' '}
                      <span>
                        <BsArrowRight className='text-xl' />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Blog
