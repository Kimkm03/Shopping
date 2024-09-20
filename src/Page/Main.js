import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Main.css';
import './Slide.css';

const Main = () => {
  const [newproducts, setNewProducts] = useState([]);
  const [bestproducts, setBestProducts] = useState([]);

  useEffect(() => {
    fetchNewProducts();
    fetchBestProducts();
  }, []);

  const fetchNewProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/shopping/api/products/new');
      setNewProducts(response.data);
    } catch (error) {
      console.error('상품 정보를 불러오는 중 오류 발생:', error);
    }
  };

  const fetchBestProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/shopping/api/products/best');
      setBestProducts(response.data);
    } catch (error) {
      console.error('상품 정보를 불러오는 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <Header /> {/* Header 컴포넌트를 사용합니다. */}
      <div className="slide_section">
        {/* 슬라이드 바 생성 */}
        {bestproducts.map((product, index) => (
          <input
            key={index}
            type="radio"
            name="slide"
            id={`slide${index + 1}`}
            defaultChecked={index === 0} // 첫번째 슬라이드만 기본 체크
          />
        ))}
        <div className="slidewrap">
          <ul className="slidelist">
            {bestproducts.map((product, index) => (
              <li className="slideitem" key={product.pname}>
                <div className="textbox">
                  <Link to={`/product/${product.pnum}`}>
                    <img
                      src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`}
                      alt={product.pname}
                    />
                  </Link>
                </div>
              </li>
            ))}
            
          </ul>

          {/* 좌우 슬라이드 버튼 생성 */}
          <div className="slide-control">
            {bestproducts.map((product, index) => (
              <div key={index}>
                <label htmlFor={`slide${index === 0 ? bestproducts.length : index}`} className="left"></label>
                <label htmlFor={`slide${index === bestproducts.length - 1 ? 1 : index + 2}`} className="right"></label>
              </div>
            ))}
          </div>

          {/* 페이징 생성 */}
          <ul className="slide-pagelist">
            {bestproducts.map((product, index) => (
              <li key={index}>
                <label htmlFor={`slide${index + 1}`}></label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*=================================================================*/}
      <div className="all">
        <div className=''>
          <div className=''>
            <h2>WEEKLY BEST</h2>
            <p>매주 인기 상품을 만나보세요!</p>
          </div>
          <ul>
            <li>
              <div>
                <img src='{/image/Main1.jpg' />
              </div>
            </li>
          </ul>
        </div>
        <div className="NEW_ARRIVALS">
          <div className="NEW_ARRIVALS_detail">
            <h2>NEW ARRIVALS</h2>
            <p>새롭게 입고 되는 상품을 만나보세요!</p>
          </div>
          <ul className="img_area_1">
            {newproducts.map(product => (
              <li key={product.pnum}>
                <div className="img_area_img">
                  <Link to={`/product/${product.pnum}`}>
                    <img
                      src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`}
                      alt={product.pname}
                    />
                  </Link>
                </div>
                <div className="img_area_imgtit">
                  <a href={`product.html?productId=${product.pnum}`}>
                    <p>{product.pname}</p>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
