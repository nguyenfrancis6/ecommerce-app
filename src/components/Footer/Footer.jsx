import React from 'react'
import './Footer.module.css'
import logo from '../../assets/shop_logo.jpg'

const Footer = () => {
  return (
    <footer>
      <img src={logo} alt="" />
      <p>Made by Francis Nguyen</p>
    </footer>
  )
}

export default Footer