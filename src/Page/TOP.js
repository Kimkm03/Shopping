import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import './Mid_title.css';

function TOP() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/shopping/api/products?categorynum=2');
            setProducts(response.data);
        } catch (error) {
            console.error('상품 목록을 불러오는 중 오류 발생:', error);
        }
    };

    return (
        <div>
            <Header /><div className='allbasicpage'>
            <div className="title">
                <div className="item_title">TOP</div>
                <br /><br /><br />
                <ul className="item_type">
                    <li><a href="">후드</a></li>
                    <li><a href="">맨투맨</a></li>
                    <li><a href="">니트</a></li>
                </ul>
                <br />
            </div>
            <br />
            <section className="item_section">
                <div className="item_list_tool">
                    <div className="list_tool_div">
                        <select name="" id="" className="item_list_print">
                            <option value="" className="">신상품</option>
                            <option value="" className="">상품명</option>
                            <option value="" className="">낮은 가격</option>
                            <option value="" className="">높은 가격</option>
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
                                            {product.productstate === "판매중" ? (
                                                product.discountprice > 0 ? (
                                                    <>
                                                        <li><span className="sstyle2"> KRW {product.price}</span></li>
                                                        <li><span className="sstyle3">KRW {product.discountprice}</span></li>
                                                    </>
                                                ) : (
                                                    <li><span className="sstyle3"> KRW {product.price}</span></li>
                                                )
                                            ) : (
                                                <li><span className="sstyle3">품절</span></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section></div>
            <Footer />
        </div>
    );
}

export default TOP;
