import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Products.module.css";
import arrow from "../../assets/arrow.png";
import ProductStyle from "./Products.module.css";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [skipNumber, setSkipNumber] = useState(0);

  // get previous product data
  function prevProducts() {
    if (skipNumber !== 0) {
      setSkipNumber((prevNumber) => prevNumber - 20);
    }
  }

  // get next product data
  function nextProducts() {
    if (skipNumber !== 80) {
      setSkipNumber((prevNumber) => prevNumber + 20);
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products?limit=20&skip=${skipNumber}`
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getProducts();
  }, [skipNumber]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <button onClick={prevProducts}>
            <img className={ProductStyle.leftArrow} src={arrow} alt="" />
          </button>
          <button onClick={nextProducts}>
            <img src={arrow} alt="" />
          </button>
          {products.map((item, index) => (
            <div key={index}>{item.title}</div>
          ))}
        </>
      )}
    </>
  );
};

export default Products;
