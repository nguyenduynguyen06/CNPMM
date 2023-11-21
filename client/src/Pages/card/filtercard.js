import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { WrapperFilterCard } from './styled';



function FilterCard({products}) {

  return (
    
      <div style={{ width: '100%' }}>
        
        <WrapperFilterCard>
          <ul className='mainContainer' style={{ alignItems: 'center', justifyContent: 'center', listStyle: 'none' }}>
          {products.map((product) => (
                  <li className='box'  style={{ padding: '0' }} >
                    <NavLink className='card' to={`/product/${product.name}`}>
                      <div className='image' style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
                        <img src={product.pictures[0]} loading="lazy"/>
                      </div>
                      <div className='desc' style={{ alignContent: 'start' }}>
                        <div style={{ height: '3em' }}>
                          <h1 style={{ padding: 3 }}>{product.name} </h1>
                        </div>
                        <div>
                          <div style={{ padding: '0 0 30px 0' }}>
                            <p style={{ fontWeight: 700, height: '20px' }}>
                            {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </p>
                            <p style={{ color: '#000', height: '20px' }}>
                                {product.platform}
                            </p>
                            <p style={{ color: '#000', height: '20px' }}>
                                Thể loại {product.category.name}
                            </p>
                          </div>
                          <div>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                        ))}
          </ul>
        </WrapperFilterCard>
      </div>
  );
}

export default FilterCard;
