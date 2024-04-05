import React from "react";
import CategoryStyle from "./Categories.module.css";
import axios from "axios";

const categoriesList = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

const Categories = ({ setProducts, setLoading, setSearchClicked}) => {
  const getCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      setProducts(response.data.products);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setSearchClicked(true)
    } catch (error) {
      console.error("Error fetching category products: ", error);
    }
  };

  return (
    <div className={CategoryStyle.container}>
      <div className={CategoryStyle.categoryContainer}>
        <h2>Categories</h2>
        <ul className={CategoryStyle.categoryList}>
          {categoriesList.map((category, index) => (
            <li key={index} className={CategoryStyle.categoryName} onClick={() => getCategory(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
