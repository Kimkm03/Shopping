import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Mid_title.css';

function OUTER() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/shopping/api/products?categorynum=1');
            setProducts(response.data);
        } catch (error) {
            console.error('상품 목록을 불러오는 중 오류 발생:', error);
        }
    };
    return (
        <div>
            <Header />
            <div class="title">
                <div class="item_title">OUTER</div>
                <br /><br /><br />
                <ul class="item_type">
                    <li><a href="">전체</a></li>
                    <li><a href="">패딩</a></li>
                    <li><a href="">자켓</a></li>
                    <li><a href="">가디건</a></li>
                    <li><a href="">블레이저</a></li>
                </ul>
                <br />
            </div>
            <br />
            <section class="item_section">
                <div class="item_list_tool">
                    <div class="list_tool_div">
                        <select name="" id="" class="item_list_print">
                            <option value="" class="">신상품</option>
                            <option value="" class="">상품명</option>
                            <option value="" class="">낮은 가격</option>
                            <option value="" class="">높은 가격</option>
                        </select>
                    </div>
                </div>


                <div className="product_section">
                    <ul className="product_section_ul">
                        {products.map(product => (
                            <li key={product.pnum} className="product_section__ul_li">
                                <div className="product_section_li_div1">
                                    <div className="product_section_div_img">
                                        <Link to={`/product/${product.pnum}`}>
                                            <img src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`} alt={product.pname} />
                                        </Link>
                                    </div>
                                    <div className="product_section_div_detail">
                                        <p>
                                            <span style={{ fontSize: '14px', color: '#5a5a5a' }}>{product.pname}</span>
                                        </p>
                                        <ul className="product_section_div_detail_ul">
                                            {product.discountprice > 0 ? (
                                                <>
                                                    <li><span className="sstyle2"> KRW {product.price}</span></li>
                                                    <li><span className="sstyle3">KRW {product.discountprice}</span></li>
                                                </>
                                            ) : (
                                                <li><span className="sstyle3"> KRW {product.price}</span></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default OUTER;