import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import CkEditor from '../Editor/CkEditor'
import Login from '../Login/Login'
import Home from '../Home/Home'

const BlogForm = () => {
  const userrole = sessionStorage.getItem('userrole')

  const [editorData, setEditorData] = useState('')

  // Callback function to receive CKEditor data

  const handleEditorDataChange = data => {
    setEditorData(data) // Update the editorData state with CKEditor data
  }

  const [blogData, setBlogData] = useState({
    category: '',
    mainheading: '',
    heading: ''
  })

  const [uploadFile, setUploadFile] = useState('')

  const blogFormHandle = e => {
    const { name, value } = e.target

    setBlogData({
      ...blogData,
      [name]: value
    })
  }

  const postBlog = () => {
    const data = new FormData()

    data.append('image', uploadFile)
    data.append('mainHeading', blogData.mainheading)
    data.append('heading', blogData.heading)
    data.append('description', editorData)
    data.append('category', blogData.category)

    if (
      blogData.mainheading &&
      uploadFile &&
      blogData.heading &&
      editorData &&
      blogData.category
    ) {
      axios
        .post('https://weather-back-ebon.vercel.app/blog', data)

        .then(res => {
          console.log('RES', res)
        })
        .catch(err => {
          console.log('ERR', err)
        })
    } else {
      console.log('bad request')
    }
  }

  return (
    <>
      {userrole == 'Bearer 1' ? (
        <div>
          <NavBar />
          <div className='flex justify-center items-center w-full flex-col space-y-3 mt-10'>
            <select
              name='category'
              id=''
              onChange={blogFormHandle}
              value={blogData.category}
            >
              <option value='' selected disabled>
                Choose Category
              </option>
              <option value='All'>All</option>
              <option value='Java'>Java</option>
              <option value='Javascript'>Javascript</option>
              <option value='React'>React</option>
              <option value='MongoDB'>MongoDB</option>
              <option value='Git'>Git</option>
              <option value='Docker'>Docker</option>
            </select>

            <input
              type='text'
              placeholder='Main Heading'
              className='border border-gray-400 rounded-sm py-1 px-2 w-80 outline-none'
              onChange={blogFormHandle}
              name='mainheading'
              value={blogData.mainheading}
            />

            <input
              type='text'
              placeholder='Sub Heading'
              className='border border-gray-400 rounded-sm py-1 px-2 w-80 outline-none'
              onChange={blogFormHandle}
              name='heading'
              value={blogData.heading}
            />

            {/* <input type="text" placeholder='Description' className='border border-gray-400 rounded-sm py-1 px-2 w-80 outline-none' onChange={blogFormHandle} name='description' value={blogData.description} /> */}

            <CkEditor onDataChange={handleEditorDataChange} />
            {/* <div dangerouslySetInnerHTML={{ __html: editorData }} />  */}

            <input
              type='file'
              accept='/image'
              onChange={e => setUploadFile(e.target.files[0])}
              value={blogData.image}
            />

            <button
              className='text-white bg-indigo-800 py-1 px-5 rounded-md'
              onClick={postBlog}
            >
              POST
            </button>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  )
}

export default BlogForm

// import React, { useState } from 'react';
// import NavBar from '../NavBar/NavBar';
// import axios from 'axios';

// const BlogForm = () => {

//     const [blogData, setBlogData] = useState([
//         {
//             mainheading: '',
//             heading: '',
//             description: '',
//             image: null,
//         },
//     ]);

//     const blogFormHandle = (index, e) => {
//         const { name, value } = e.target;

//         const updatedBlogs = [...blogData];
//         updatedBlogs[index] = { ...updatedBlogs[index], [name]: value };
//         setBlogData(updatedBlogs);
//     };

//     const addBlog = () => {
//         setBlogData([...blogData, { mainheading: '', heading: '', description: '', image: null }]);
//     };

//     const uploadImage = (index, file) => {
//         const updatedBlogs = [...blogData];
//         updatedBlogs[index].image = file;
//         setBlogData(updatedBlogs);
//     };

//     const deleteBlog = (index) => {
//         const updatedBlogs = [...blogData];
//         updatedBlogs.splice(index, 1);
//         setBlogData(updatedBlogs);
//     };

//     const postBlog = () => {
//         // Iterate through each blog entry and send a separate request for each entry
//         blogData.forEach((blogEntry) => {
//             const { mainheading, heading, description, image } = blogEntry;
//             if (mainheading && heading && description && image) {
//                 const data = new FormData();
//                 data.append('image', image);
//                 data.append('mainHeading', mainheading);
//                 data.append('heading', heading);
//                 data.append('description', description);

//                 axios
//                     .post('http://localhost:8000/blog', data)
//                     .then((res) => {
//                         console.log(res);
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     });
//             }
//         });
//     };

//     return (
//         <div>
//             <NavBar />
//             <div className="flex justify-center items-center w-full flex-col space-y-3 mt-10">
//                 {blogData.map((blogEntry, index) => (
//                     <div key={index}>
//                         <input
//                             type="text"
//                             placeholder="Main Heading"
//                             className="border border-gray-400 rounded-sm py-1 px-2 w-80 outline-none"
//                             onChange={(e) => blogFormHandle(index, e)}
//                             name="mainheading"
//                             value={blogEntry.mainheading}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Sub Heading"
//                             className="border border-gray-400 rounded-sm py-1 px-2 w-80 outline-none"
//                             onChange={(e) => blogFormHandle(index, e)}
//                             name="heading"
//                             value={blogEntry.heading}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Description"
//                             className="border border-gray-400 rounded-sm py-1 px-2 w-80 outline-none"
//                             onChange={(e) => blogFormHandle(index, e)}
//                             name="description"
//                             value={blogEntry.description}
//                         />
//                         <input
//                             type="file"
//                             accept="/image"
//                             onChange={(e) => uploadImage(index, e.target.files[0])}
//                         />
//                         <button className="text-white bg-red-800 py-1 px-5 rounded-md" onClick={() => deleteBlog(index)}>
//                             Delete
//                         </button>
//                     </div>
//                 ))}

//                 <button className="text-white bg-indigo-800 py-1 px-5 rounded-md" onClick={postBlog}>
//                     POST
//                 </button>

//                 <button className="text-white bg-green-800 py-1 px-5 rounded-md" onClick={addBlog}>
//                     Add Blog
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default BlogForm;
