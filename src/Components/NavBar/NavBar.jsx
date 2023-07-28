import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const accessToken = sessionStorage.getItem('accessToken')
  const userrole = sessionStorage.getItem('userrole')

  const userLogout = () => {
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('userrole')
    alert('You have been logged out successfully')
    navigate('/')
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='bg-gray-900 p-4 px-10'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <span className='text-white text-lg font-semibold'>
            Weather Forecast
          </span>
        </div>
        <div className='hidden md:flex space-x-32 items-center'>
          <li className='list-none text-white cursor-pointer hover:text-gray-300'>
            <Link to={'/'}>Home</Link>
          </li>
          <li className='list-none text-white cursor-pointer hover:text-gray-300'>
            <Link to={'/forecast'}>Forecast</Link>
          </li>
          {accessToken && (
            <li className='list-none text-white cursor-pointer hover:text-gray-300 bg-red-600 py-1 px-4'>
              <Link to={'/signup'}>Logout</Link>
            </li>
          )}
          {!accessToken && (
            <li className='list-none text-white cursor-pointer hover:text-gray-300'>
              <Link to={'/login'}>Login</Link>
            </li>
          )}
        </div>

        <div className='md:hidden'>
          <button
            className='text-white focus:outline-none'
            onClick={toggleMenu}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className='md:hidden mt-4 space-y-4'>
          <li className='list-none text-white cursor-pointer hover:text-gray-300'>
            <Link to={'/fuck'}>Home</Link>
          </li>
          <li className='list-none text-white cursor-pointer hover:text-gray-300'>
            <Link to={'/forecast'}>Forecast</Link>
          </li>
          {/* <li className='list-none text-white cursor-pointer hover:text-gray-300'>
            <Link to={'/about'}>About</Link>
          </li> */}
          {accessToken && (
            <li className='list-none text-white cursor-pointer hover:text-gray-300'>
              <Link to={'/signup'}>Logout</Link>
            </li>
          )}
          {!accessToken && (
            <li className='list-none text-white cursor-pointer hover:text-gray-300'>
              <Link to={'/login'}>Login</Link>
            </li>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
