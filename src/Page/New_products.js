import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './New_products.css';
import './item.css';

function New_products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchNewProducts();
    }, []);

    const fetchNewProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/shopping/api/products/new');
            setProducts(response.data);
        } catch (error) {
            console.error('상품 정보를 불러오는 중 오류 발생:', error);
        }
    };

    return (
        <div className=''>
            <Header /><div className='allbasicpage'>
            <div className="new_product_section">
                <h2>NEW ITEM</h2>
            </div>
            <section className="item_section">
                <div className="item_list_tool">
                    <div className="list_tool_div">
                        <select name="" id="" className="item_list_print">
                            <option value="" className="" selected>신상품</option>
                            <option value="" className="">상품명</option>
                            <option value="" className="">낮은 가격</option>
                            <option value="" className="">높은 가격</option>
                        </select>
                    </div>
                </div>
                <div className="product_section">
                    <ul className="product_section_ul">
                        {products.map(product => (
                            <li className="product_section__ul_li" key={product.pnum}>
                                <div className="product_section_li_div1">
                                    <div className="product_section_div_img">
                                        <Link to={`/product/${product.pnum}`}>
                                            <img src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`} alt={product.pname} />
                                        </Link>
                                    </div>
                                    <div className="product_section_div_detail">
                                        <p>
                                            <a href={`product.html?productId=${product.pnum}`}>
                                                <span style={{ fontSize: '14px', color: '#5a5a5a' }}>{product.pname}</span>
                                            </a>
                                        </p>
                                        <ul className="product_section_div_detail_ul">
                                            <li><span className="sstyle1">5/13일 순차배송</span></li>
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
            </div>
        <Footer />  
        </div>
    );
}

export default New_products;
