import React from 'react'
import Annoucement from '../components/Annoucement'
import Brand from '../components/Brand'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Slogans from '../components/Slogans'
import Toolbar from '../components/Toolbar'
import ListProducts3 from '../components/ListProducts3'
import ListProducts2 from '../components/ListProducts2'
import ListProducts1 from '../components/ListProducts1'

const Page2 = () => {
  return (
    <div className='container'>
        <Annoucement />
        <Navbar />
        <Toolbar/>
        <ListProducts1 />
        <ListProducts2 />
        <ListProducts3 />
        <Footer />
    </div>
  )
}

export default Page2
