import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Products.module.css";
import arrow from "../../assets/arrow.png";
import ProductStyle from "./Products.module.css";
import ItemCard from "../ItemCard/ItemCard";
import searchIcon from "../../assets/search_icon.png";
import Categories from "../Categories/Categories";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [skipNumber, setSkipNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

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

  // search product function
  const searchProduct = async (product) => {
    try {
      setLoading(true);
      // go back to initial products if no input
      if (product === "") {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=20&skip=0"
        );
        setProducts(response.data.products);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setSearchClicked(false);
        setSkipNumber(0);
      }
      // use search term
      else {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${product}&limit=20`
        );
        setProducts(response.data.products);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setSearchClicked(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // initial products
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
        <div style={{height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Loading...</div>
      ) : (
        <>
          <div className={ProductStyle.container}>
            <h1 style={{marginBottom: '30px'}}>Browse And Shop!</h1>
            <Categories setProducts={setProducts} setLoading={setLoading} setSearchClicked={setSearchClicked} />
            <div className={ProductStyle.searchContainer}>
              <label className={ProductStyle.searchLabel} htmlFor="search">
                Search a product
              </label>
              <div className={ProductStyle.search}>
                <input
                  className={ProductStyle.searchBar}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                  className={ProductStyle.searchIcon}
                  src={searchIcon}
                  alt=""
                  onClick={() =>
                    searchProduct(searchTerm.trim()) &&
                    setSearchTerm(searchTerm.trim())
                  }
                />
              </div>
            </div>
            {!searchClicked && (
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
            )}
            <div className={ProductStyle.cardContainer}>
              {products.length === 0 ? (
                "No item found"
              ) : (
                <ItemCard products={products} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
