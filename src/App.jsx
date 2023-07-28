import React from 'react'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Components/Home/Home'
import Blog from './Components/Blog/Blog'
import About from './Components/About/About'
import BlogDetails from './Components/Blog/BlogDetails'
import BlogForm from './Components/BlogForm/BlogForm'
import WeatherApp from './Components/WeatherApp/WeatherApp'
import ForecastCard from './Components/WeatherApp/ForecastCard'
import Navbar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'

const App = () => {
  const accessToken = sessionStorage.getItem('accessToken')
  const refreshToken = sessionStorage.getItem('refreshToken')
  const userrole = sessionStorage.getItem('userrole')

  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<WeatherApp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/fuck' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/blogdetails' element={<BlogDetails />} />
          <Route path='/forecast' element={<ForecastCard />} />

          <Route path='/blogform' element={<BlogForm />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
