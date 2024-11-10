import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './StylecodiDetail.css';

function StylecodiDetail() {
    const { styleId } = useParams();
    const memname = sessionStorage.getItem("memname");
    const [stylecodi, setStylecodi] = useState(null);  // 스타일 코드 정보
    const [upperProduct, setUpperProduct] = useState(null);  // 상의 상품 정보
    const [lowerProduct, setLowerProduct] = useState(null);  // 하의 상품 정보

    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 스타일 코드 정보 가져오기 (예시로 ID 123을 사용)
                const stylecodiResponse = await axios.get(`http://localhost:8000/shopping/api/style/${styleId}`);
                setStylecodi(stylecodiResponse.data);  // 스타일 코드 정보 저장

                // 상의 상품 정보 가져오기
                const upperProductResponse = await axios.get(`http://localhost:8000/shopping/api/products/${stylecodiResponse.data.upperpnum}`);
                setUpperProduct(upperProductResponse.data);  // 상의 상품 정보 저장

                // 하의 상품 정보 가져오기
                const lowerProductResponse = await axios.get(`http://localhost:8000/shopping/api/products/${stylecodiResponse.data.lowerpnum}`);
                setLowerProduct(lowerProductResponse.data);  // 하의 상품 정보 저장

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [styleId]);  // 컴포넌트가 처음 렌더링될 때만 실행

    return (
        <div>
            <Header />
            <div className="codidetailwrap">
                <div className="codidetailcontents">
                    <div className="product_detail">
                        <div className="detail_area">
                            <div className="profile">
                                {/* <div><img src={stylecodi.profilePicture} alt="Profile" /></div> */}
                                <div className="profile_text">
                                    <span>{memname}</span>
                                    <div className="summary">
                                        {stylecodi && stylecodi.height && (
                                            <span>{stylecodi.height}cm</span>
                                        )}
                                        <b> / </b>
                                        {stylecodi && stylecodi.weight && (
                                            <span>{stylecodi.weight}kg</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="img_area">
                                <div className="leftimg">
                                    <a href="">
                                        {stylecodi && stylecodi.id && (
                                            <img src={`http://localhost:8000/shopping/api/style/${stylecodi.id}/picture`} alt="Main Style" />
                                        )}
                                    </a>
                                </div>
                                <div className="rightimg">
                                    <div className="relation">
                                        <div className="wear_product">
                                            <h2 className="wear_product_title">착용 상품</h2>

                                            {/* 상의 상품 */}
                                            <h3>상의</h3>
                                            {upperProduct ? (
                                                <ul className="wear_product_list">
                                                    <li>
                                                        <span>착용 사이즈</span>
                                                        <div className="codidetailthumbnail">
                                                            <a href={`/product/${upperProduct.pnum}`}>
                                                                <img src={`http://localhost:8000/shopping/api/products/${upperProduct.pnum}/picture`} alt={upperProduct.name} />
                                                            </a>
                                                        </div>
                                                        <div className="description">
                                                            <div className="name">
                                                                <span>{upperProduct.pname}</span>
                                                            </div>
                                                            <div className="price">
                                                                <span>KRW {upperProduct.price}</span>
                                                            </div>
                                                            <div className="modeloption">
                                                                착용정보 : <span>{stylecodi.uppersize}</span> / <span>{stylecodi.uppercolor}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ) : (
                                                <div>Loading upper product...</div>
                                            )}

                                            {/* 하의 상품 */}
                                            <h3>하의</h3>
                                            {lowerProduct ? (
                                                <ul className="wear_product_list">
                                                    <li>
                                                        <span>착용 사이즈</span>
                                                        <div className="codidetailthumbnail">
                                                            <a href={`/product/${lowerProduct.pnum}`}>
                                                                <img src={`http://localhost:8000/shopping/api/products/${lowerProduct.pnum}/picture`} alt={lowerProduct.name} />
                                                            </a>
                                                        </div>
                                                        <div className="description">
                                                            <div className="name">
                                                                <span>{lowerProduct.pname}</span>
                                                            </div>
                                                            <div className="price">
                                                                <span>KRW {lowerProduct.price}</span>
                                                            </div>
                                                            <div className="modeloption">
                                                                착용정보 : <span>{stylecodi.lowersize}</span> / <span>{stylecodi.lowercolor}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ) : (
                                                <div>Loading lower product...</div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StylecodiDetail;