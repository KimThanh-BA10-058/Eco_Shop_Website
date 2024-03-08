import React from 'react'
import { Link } from 'react-router-dom'
import Annoucement from '../components/Annoucement'
import Brand from '../components/Brand'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import MoreDetail from '../components/MoreDetail'
import Navbar from '../components/Navbar'
import Products0 from '../components/Products0'
import Products2 from '../components/Products2'
import Products3 from '../components/Products3'
import Slider from '../components/Slider'
import Slogans from '../components/Slogans'
import Toolbar from '../components/Toolbar'
import Pages from '../components/Pages'
import ProductListByCategory from '../phanloaisp/ProductListByCategory'
import Searchh from '../components/Searchh'


const HomePage = () => {
  return (
    <div className='container'>
        <Annoucement />
        <Navbar />
        <Toolbar/>
        <br/>
        <Slider />
        <Products0 />
        {/* <Products2 />
        <Products3 /> */}
        <Brand />
        <br />
        <Slogans />
        <Footer />
    </div>
  )
}

export default HomePage
