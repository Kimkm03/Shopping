import React from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './StylecodiDetail.css';

function StylecodiDetail(){
    return(
    <div> 
        <Header />
        <div class="codidetailwrap">
        <div class="codidetailcontents">
            <div class="product_detail">
                <div class="detail_area">
                    <div class="profile">
                        <div><img src="" alt=""/></div>
                        <div class="profile_text">
                            <span>계정닉네임</span>
                            <div class="summary">
                                <span>178cm</span>
                                <b> / </b>
                                <span>73kg F</span>
                            </div>
                        </div>
                    </div>
                    <div class="img_area">
                        <div class="leftimg">
                            <a href="">
                                <img src={`${process.env.PUBLIC_URL}/style1.jpg`} alt=""/>
                            </a>
                        </div>
                        <div class="rightimg">
                            <div>
                                <div class="relation">
                                    <div class="wear_product">
                                        <h2 class="wear_product_title">착용 상품</h2>
                                        <ul class="wear_product_list">
                                            <li>
                                                <div class="codidetailthumbnail">
                                                    <a href="product.html">
                                                        <img src={`${process.env.PUBLIC_URL}/test_product.png`} alt=""/>
                                                    </a>
                                                </div>
                                                <div class="description">
                                                    <div class="name">
                                                        <a href="product.html">상품명 ooooooooo</a>
                                                    </div>
                                                    <div class="price">
                                                        <span class="">KRW 36,900</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="codidetailthumbnail">
                                                    <a href="product.html">
                                                        <img src={`${process.env.PUBLIC_URL}/test_product.png`} alt=""/>
                                                    </a>
                                                </div>
                                                <div class="description">
                                                    <div class="name">
                                                        <a href="product.html">상품명 ooooooooo</a>
                                                    </div>
                                                    <div class="price">
                                                        <span class="">KRW 56,900</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
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