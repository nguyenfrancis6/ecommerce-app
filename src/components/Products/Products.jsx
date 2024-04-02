import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Products.module.css";
import arrow from "../../assets/arrow.png";
import ProductStyle from "./Products.module.css";
import ItemCard from "../ItemCard/ItemCard";

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
        setTimeout(() => {
          setLoading(false);
        }, 500);
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
          <div className={ProductStyle.container}>
            <h1>Browse And Shop!</h1>
            <div className={ProductStyle.buttonContainer}>
              {skipNumber !== 0 && (
                <button
                  className={`${ProductStyle.leftButton} ${ProductStyle.button}`}
                  onClick={prevProducts}
                >
                  <img
                    className={`${ProductStyle.leftArrow} ${ProductStyle.arrow}`}
                    src={arrow}
                    alt="arrow"
                  />
                </button>
              )}
              {skipNumber !== 80 && (
                <button
                  className={`${ProductStyle.rightButton} ${ProductStyle.button}`}
                  onClick={nextProducts}
                >
                  <img
                    className={`${ProductStyle.rightArrow} ${ProductStyle.arrow}`}
                    src={arrow}
                    alt="arrow"
                  />
                </button>
              )}
            </div>
            <div className={ProductStyle.cardContainer}>
              <ItemCard products={products} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
