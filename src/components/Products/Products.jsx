import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Products.module.css'

const Products = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState()

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true) 
        const response = await axios.get('https://dummyjson.com/products')
        console.log(response.data)
        setProducts(response.data)
      }
      catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    getProducts()
  }, [])

  return (
    <div>
      <div className='item'>Placeholder for item</div>
      <button>Load more</button>
    </div>
  )
}

export default Products