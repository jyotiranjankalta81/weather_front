import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    email: '',
    password: ''
  }

  const [loginInfo, setLoginInfo] = useState(initialState)

  const inputChangeHandle = e => {
    const { name, value } = e.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const login = e => {
    e.preventDefault()
    validateSignupUser(loginInfo)
  }

  const validateSignupUser = values => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!values.email) {
      toast.error('Email is required')
      return false
    } else if (!regEx.test(values.email)) {
      toast.error('Enter a valid email')
      return false
    }

    if (!values.password) {
      toast.error('Password is empty')
      return false
    } else if (values.password.length < 6) {
      toast.error('Password required minimum 6 char')
      return false
    } else {
      axios
        .post('https://weather-back-ebon.vercel.app/login', loginInfo)
        .then(res => {
          if (res.status === 200) {
            console.log(res.data)
            sessionStorage.setItem(
              'accessToken',
              `Bearer ${res.data.myAccessToken}`
            )
            sessionStorage.setItem(
              'refreshToken',
              `Bearer ${res.data.myRefreshToken}`
            )
            sessionStorage.setItem('userrole', `Bearer ${res.data.userrole}`)

            toast.success('login Success')

            setLoginInfo({ email: '', password: '' })
            navigate('/')
          }
        })
        .catch(err => {
          toast.error(err.response.data.res)
        })
    }
  }

  return (
    <div className='flex flex-col w-full justify-center items-center pt-16'>
      <form
        action=''
        className='flex flex-col w-[400px] border border-gray-300 rounded-md px-5 py-5'
      >
        <div className='titile'>
          <h1 className='text-3xl text-gray-500 font-semibold mb-5'>Login</h1>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='' className='font-semibold text-sm'>
            Username
          </label>
          <input
            type='text'
            placeholder='Email'
            className='border border-gray-500 outline-none  py-1 px-1 rounded-sm focus:bg-blue-50'
            autoComplete='off'
            onChange={inputChangeHandle}
            name='email'
            value={loginInfo.email}
          />
        </div>

        <div className='flex flex-col mt-3'>
          <label htmlFor='' className='font-semibold text-sm'>
            Password
          </label>
          <input
            type='password'
            placeholder='Password'
            className='border border-gray-500 outline-none py-1 px-1 rounded-sm focus:bg-blue-50'
            onChange={inputChangeHandle}
            name='password'
            value={loginInfo.password}
          />
        </div>

        <button
          className='bg-indigo-500 text-white py-1 px-2 mt-5  rounded-sm font-semibold active:bg-blue-900'
          onClick={login}
        >
          Login
        </button>
        <div className='flex justify-center mt-5'>
          <Link
            to={'/signup'}
            className='text-blue-700 font-light text-sm hover:underline active:text-green-600'
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
