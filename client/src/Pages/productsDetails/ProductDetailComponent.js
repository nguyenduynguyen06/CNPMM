import React, { useState, useEffect } from "react"
import { Button, Col, Image, Row, Table, Rate, message } from 'antd'
import {
    WrapperStyleColImage,
    WrapperStyleImageSmall,
    WrapperStyleImageBig,
    WrapperStyleTextSell,
    WrapperPriceTextProduct,
    WrapperInputNumber,
    WrapperPropTable,
    WrapperDetail,
    WrapperPolicy,
} from "./style"
import {  RetweetOutlined, PropertySafetyOutlined, DropboxOutlined, GiftOutlined } from '@ant-design/icons'
import axios from "axios"
import {  useParams } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import ProductDescription from "./productdesscription"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from "../../Componant/Header/header"
import { addItemToCart } from "../cart/cart"


const ProductDetailComponents = () => {
    const [productDetails, setProductDetails] = useState(null);
    const { name } = useParams();
    const [quantity, setQuantity] = useState(1);
  
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/detailsProduct/${name}`)
            .then((response) => {
                setProductDetails(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, [name]);
    const handleIncreaseQuantity = () => {
        if (quantity < 3) {
            setQuantity(quantity + 1);
        }
    };
    const handleChange = (value) => {
        setQuantity(value);
    };
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
        appendDots: (dots) => (
            <ul style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', listStyle: 'none', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {dots}
            </ul>)
    };
    const goBack = () => {
        window.history.back();
    };
    const handleAddToCart = () => {
        if (productDetails) {
            addItemToCart(productDetails.name, quantity);
            message.success('Thêm vào giỏ thành công')
        }
    };
    return (
        <WrapperDetail>
                <Header></Header>
            <div style={{ background: '#fff', padding: '10px' }}>
                <button style={{ border: 'none', background: 'transparent' }} onClick={goBack}>
                    <ArrowLeftOutlined /> Quay lại
                </button>
            </div>
            <Row className="product-pick">
                <Col className="slider-col">
                    <Slider {...sliderSettings} className="slider" style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                        {productDetails && productDetails.pictures.slice(0).map((pictures, index) => (
                            <WrapperStyleImageBig key={index}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image src={pictures} alt={`Thumbnail ${index}`} className="slider-image" />
                                </div>
                            </WrapperStyleImageBig>
                        ))}
                    </Slider>

                </Col>
                <br></br>
                <Col className="pick-col">
                    {productDetails ? (
                        <div>
                            <WrapperPriceTextProduct>
                                {productDetails?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </WrapperPriceTextProduct>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng:</div>
                        <div>
                            <Button type="primary" size='medium' style={{ background: 'transparent', border: '1px solid #ccc', color: '#000', boxShadow: 'none', borderRadius: '5px' }} onClick={handleDecreaseQuantity}>-</Button>
                            <WrapperInputNumber
                                type="number"
                                value={quantity}
                                onChange={handleChange}
                                size="middle"
                                defaultValue={1}
                                upHandler={null}
                                downHandler={null}
                                min={1}
                                max={3}
                            />
                            <Button type="primary" size='medium' style={{ background: 'transparent', border: '1px solid #ccc', color: '#000', boxShadow: 'none', borderRadius: '5px' }} onClick={handleIncreaseQuantity}>+</Button>
                        </div>
                    </div >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       
                        <Button
                            bordered={false}
                            size={40}
                            styleButton={{
                                background: 'rgb(225,57,69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            onClick={handleAddToCart} 
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                                Thêm vào giỏ
                        </Button>
                    </div>
                    <br></br>
                </Col>
               
            </Row>
            <hr className="my-4" />
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col className="des-col">
                    <h3>Mô tả sản phẩm</h3>
                    <div
                        style={{
                            height: `600px`,
                            overflowY: 'hidden',
                            textAlign: 'justify',
                            position: 'relative',
                        }}
                    >
                        {productDetails ? (
                            <ProductDescription description={productDetails.description} />
                        ) : (
                            <p>Loading...</p>
                        )}

                        <div
                            style={{
                                position:'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                background: 'linear-gradient(to bottom, transparent, white)',
                                padding: '30px 10px 0px',
                                boxSizing: 'border-box',
                                display:'flex',
                                justifyContent: 'center',
                            }}
                        >
                        </div>
                    </div>
                </Col>

            </Row>
        </WrapperDetail>
    )
}

export default ProductDetailComponents;