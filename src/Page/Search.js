import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Search.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Search() {
    const ulRef = useRef(null);
    const [itemCount, setItemCount] = useState(0);
    const [products, setProducts] = useState([]);
    const query = useQuery();
    const keyword = query.get('keyword');

    useEffect(() => {
        if (keyword) {
            fetchProductsByKeyword(keyword);
        }
    }, [keyword]);

    const fetchProductsByKeyword = async (keyword) => {
        const response = await fetch(`http://localhost:8000/shopping/api/products/search?keyword=${keyword}`);
        const data = await response.json();
        setProducts(data);
        setItemCount(data.length);
    };

    return (
        <div>
            <Header />
            <div className="search_section">
                <div className="search_container">
                    <div className="search_title">
                        <h2>상품 검색</h2>
                    </div>
                    <div className="searchinfo">
                        <span className="searchinfo_tx" id="searchinfo_tx">
                            상품 검색 결과: {itemCount}
                        </span>
                    </div>
                    <div className="searchproduct">
                        <ul className="searchpdul" id="ulpdcount" ref={ulRef}>
                            {products.map((product) => (
                                <li className="searchpdul_li" key={product.id}>
                                    <div className="searchpdimg">
                                        <Link to={`/product/${product.pnum}`}>
                                            <img src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`} alt={product.pname} />
                                        </Link>
                                    </div>
                                    <div className="searchpddt">
                                        <p className="searchpddt_t">
                                            <Link to={`/product/${product.pnum}`}>
                                                <span className="searchpddttitle">{product.pname}</span>
                                            </Link>
                                        </p>
                                        <ul className="searchpddt_ul">
                                            {product.discountprice > 0 ? (
                                                <>
                                                    <li><span className="searchpddt_lip1"> KRW {product.price}</span></li>
                                                    <li><span className="searchpddt_lip2">KRW {product.discountprice}</span></li>
                                                </>
                                            ) : (
                                                <li><span className="searchpddt_lip2"> KRW {product.price}</span></li>
                                            )}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;
