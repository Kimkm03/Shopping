import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Product.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faShirt,faScroll,faComment,faPenToSquare,faMinus,faChartSimple } from '@fortawesome/free-solid-svg-icons';


function Mg_Product() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(new Set()); // 선택된 상품들의 pnum을 저장할 Set
    const [selectAll, setSelectAll] = useState(false);
    const [productStates, setProductStates] = useState({}); // 상품별 상태 정보를 저장할 객체
    const [discountprice, setDiscountPrice] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/shopping/api/products/all');
            setProducts(response.data);
        } catch (error) {
            console.error('상품 목록을 불러오는 데 실패했습니다:', error);
        }
    };

    const handleSave = async () => {
        if (selectedProducts.size === 0) {
            alert("상품을 선택해주세요");
            return;
        }

        try {
            const updatePromises = Array.from(selectedProducts).map(async pnum => {
                const product = products.find(p => p.pnum === pnum);
                if (!product) {
                    console.warn(`상품 번호 ${pnum}에 해당하는 상품을 찾을 수 없습니다.`);
                    return;
                }

                const updatedProduct = {
                    ...product,
                    productstate: productStates[pnum],
                    discountprice: discountprice[pnum]
                };

                // JSON 형식으로 변환하여 전송
                const response = await axios.put(`http://localhost:8000/shopping/api/products/${pnum}`, updatedProduct, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    console.log(`상품 번호 ${pnum}의 정보가 성공적으로 업데이트되었습니다.`);
                    return true;
                } else {
                    console.log(`상품 번호 ${pnum}의 정보 업데이트에 실패했습니다.`);
                    return false;
                }
            });

            // 모든 업데이트 요청을 처리하고 결과를 받아옴
            const results = await Promise.all(updatePromises);
            if (results.every(result => result === true)) {
                console.log('모든 상품 정보가 성공적으로 업데이트되었습니다.');
                alert("선택된 상품들의 정보 업데이트에 성공했습니다.");
                fetchProducts();
                setSelectedProducts(new Set()); // 선택된 상품 초기화
                window.location.href = '/Mg_Product';
            } else {
                console.log('일부 상품 정보 업데이트에 실패했습니다.');
            }
        } catch (error) {
            console.error('상품 정보 업데이트 중 오류가 발생했습니다:', error);
        }
    };


    const handleCheckboxChange = (e, pnum) => {
        const newSelectedProducts = new Set(selectedProducts);
        if (e.target.checked) {
            newSelectedProducts.add(pnum);
        } else {
            newSelectedProducts.delete(pnum);
        }
        setSelectedProducts(newSelectedProducts);
        setSelectAll(newSelectedProducts.size === products.length);
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);

        if (isChecked) {
            const allProductIds = new Set(products.map(product => product.pnum));
            setSelectedProducts(allProductIds);
        } else {
            setSelectedProducts(new Set());
        }
    };

    const handleProductStateChange = (product, newState) => {
        if (!product || !product.pnum) {
            console.warn('유효하지 않은 상품 정보입니다.');
            return;
        }

        // 새로운 상태로 업데이트된 상품 객체 생성
        const updatedProduct = { ...product, productstate: newState };

        // 선택된 상품의 상태를 업데이트하기 위해 상태 관리 객체 업데이트
        setProductStates(prevStates => ({
            ...prevStates,
            [product.pnum]: newState
        }));
        setProducts(prevProducts => prevProducts.map(p => (p.pnum === updatedProduct.pnum ? updatedProduct : p)));
    };

    const handleDiscountPriceChange = (e, pnum) => {
        const value = parseInt(e.target.value);
        setDiscountPrice(prevPrices => ({
            ...prevPrices,
            [pnum]: value
        }));
    };


    return (
        <div>
            <Header />
            <div className="mgmain_section">
                <div className="sidemenu">
                    <ul>
                        <li><Link to="/Mg_Orderlist" ><FontAwesomeIcon icon={faScroll} />주문 관리</Link></li>
                        <li><Link to="/Mg_Member"><FontAwesomeIcon icon={faUser} />회원 관리</Link></li>
                        <li><Link to="/Mg_Product" className="txtbold"><FontAwesomeIcon icon={faShirt} />상품 관리</Link></li>
                        <li><Link to="/Mg_Inquiry"><FontAwesomeIcon icon={faComment} />고객 문의</Link></li>
                        <li><Link to="/Mg_Review"><FontAwesomeIcon icon={faPenToSquare} />게시글 관리</Link></li>
                        <li><Link to="/Mg_Review" className='suvsidemenu'><FontAwesomeIcon icon={faMinus} />리뷰</Link></li>
                        <li><Link to="/Mg_Total"><FontAwesomeIcon icon={faChartSimple} />통계</Link></li>
                    </ul>
                </div>
                <div className="mgmain_detail">
                    <div className="mgmain_title">
                        <h2>상품 관리 페이지</h2>
                        {/* 검색 필드와 버튼 등 추가 필요 */}
                    </div>
                    <div className='mg_search'>{/* 검색 기능 추가 예정 */}
                            <form className='mg_searchform'>
                                <input type='text' className='mg_searchtxt' placeholder="상품명" />
                                <button type="submit" className="btn_search">
                                <img src="https://i.postimg.cc/cH85Hwp5/search-btn2.png" alt="Search" />
                                </button>
                            </form>
                    </div>
                    <div className="tablediv">
                        <Link to='/Product_add'><button className='pdadd_btn'> + 상품등록 </button></Link>
                        <div className="tablediv2">
                            <span>총 <span id="productresult">{products.length}</span> 개</span>
                            <span style={{ float: "right" }}>
                                <select name="" id="">
                                    <option value="">정렬</option>
                                    <option value="">판매량</option>
                                    <option value="">등록일</option>
                                </select>
                            </span>
                        </div>
                        <table id="producttable" className="producttable">
                            <thead>
                                <tr>
                                    <th style={{ width: "3%" }}><input type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectAll} /></th>
                                    <th style={{ width: "30%" }}>상품</th>
                                    <th style={{ width: "8%" }}>정가</th>
                                    <th style={{ width: "8%" }}>판매가</th>
                                    <th style={{ width: "7%" }}>분류</th>
                                    <th style={{ width: "10%" }}>노출</th>
                                    <th style={{ width: "10%" }}>상태</th>
                                    <th style={{ width: "10%" }}>재고</th>
                                    <th style={{ width: "8%" }}>등록일</th>
                                    <th style={{ width: "7%" }}>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.pnum}>
                                        <td><input type="checkbox" onChange={(e) => handleCheckboxChange(e, product.pnum)} checked={selectedProducts.has(product.pnum)} /></td>
                                        <td>
                                            <div className="productset">
                                                <div className="productimg">
                                                    <img src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`} alt="" />
                                                </div>
                                                <div className="productdetail"><span>{product.pname}</span></div>
                                            </div>
                                        </td>
                                        <td><span>{product.price.toLocaleString()}원</span></td>
                                        <td><input type='text' value={discountprice[product.pnum] || ''} onChange={(e) => handleDiscountPriceChange(e, product.pnum)} placeholder={product.discountprice} /></td>
                                        <td>
                                            <span>
                                                {product.categorynum === 1 ? 'OUTER' :
                                                    product.categorynum === 2 ? 'TOP' :
                                                        product.categorynum === 3 ? 'PANTS' : '기타'}
                                            </span>
                                        </td>
                                        <td>
                                            <input type="checkbox" checked={product.newFlag} />신상품 <p></p>
                                            <input type="checkbox" checked={product.bestFlag} />인기상품
                                        </td>
                                        <td>
                                            <select value={productStates[product.pnum] || product.productstate} onChange={(e) => handleProductStateChange(product, e.target.value)}>
                                                <option value="판매중">판매중</option>
                                                <option value="품절">품절</option>
                                            </select>
                                        </td>
                                        <td><span>{product.pcount.toLocaleString()}</span></td>
                                        <td><span>{new Date(product.pcreateDate).toLocaleDateString()}</span></td>
                                        <td>
                                            <button className="savebtn" onClick={handleSave}>저장</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mg_Product;
