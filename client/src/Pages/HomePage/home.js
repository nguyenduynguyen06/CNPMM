import React, { useEffect, useState } from "react";
import { WrapperHomePage } from "./styled";
import Header from "../../Componant/Header/header";
import FilterCard from "../card/filtercard";
import { Button } from "antd";
import axios from "axios";
import "./button.css";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const location = useLocation();
  const searchKeyword = new URLSearchParams(location.search).get("keyword");
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleCategoryClick = (categoryId) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product/getIdByCategory/${categoryId}`)
      .then((response) => {
        setSelectedCategory(categoryId);
        setProductData(response.data.data);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API: ', error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`);
        setCategory(categoriesResponse.data.data);
        if (isFirstLoad && categoriesResponse.data.data.length > 0) {
          handleCategoryClick(categoriesResponse.data.data[0]._id);
          setIsFirstLoad(false);
        }
        if (searchKeyword) {
          const searchResponse = await axios.get(`${process.env.REACT_APP_API_URL}/product/searchProducts?keyword=${searchKeyword}`);
          setProductData(searchResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData(); 
  
  }, [searchKeyword, isFirstLoad]);
  

  return (
    <div className="home-container">
      <Header></Header>
      <br></br>
      <WrapperHomePage style={{ display: "flex", justifyContent: "center", padding: "4%" }}>
       {searchKeyword ? null : (
            <div>
                {category.map((category) => (
                <Button
                    key={category._id}
                    style={{ marginRight: '10px' }}
                    onClick={() => handleCategoryClick(category._id)}
                    className={`memory-button ${selectedCategory === category._id ? 'selected' : ''}`}
                >
                    {category.name}
                </Button>
                ))}
            </div>
            )}
        <FilterCard products={productData}></FilterCard>
      </WrapperHomePage>
    </div>
  );
};

export default HomePage;
