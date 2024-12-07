import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';

import { Link } from 'react-router-dom';
import './Wishlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

function Wishlist() {
    const [memberData, setMemberData] = useState(null);
    const [wishListData, SetWishListData] = useState(null);
    const [productData, SetProductData] = useState(null);
    const [keyword, setKeyword] = useState("");
    const memid = sessionStorage.getItem("memid");

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
                setMemberData(response.data);
            } catch (error) {
                console.error('Failed to fetch member data:', error);
                // 네트워크 오류 등으로 요청이 실패할 경우 적절히 처리
                alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
            }
        };

        if (memid) {
            fetchMemberData();
        }
    }, [memid]);

    useEffect(() => {
        // 데이터 가져오기
        const fetchProductCode = async () => {
            if (memberData) {
                try {
                    const response = await axios.get(`http://localhost:8000/shopping/api/wishlist/productCode/${memberData.memnum}`); // Spring API 엔드포인트
                    SetWishListData(response.data); // 스타일 데이터 설정
                } catch (error) {
                    console.error('Failed to fetch order data:', error);
                    alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
                }
            }
        };

        fetchProductCode();
    }, [memberData]);

    useEffect(() => {
        // 데이터 가져오기
        const fetchProducts = async () => {
            if (wishListData && wishListData.length > 0) {
                try {
                    // 각 wishlistData의 productCode에 대해 요청
                    const productRequests = wishListData.map((item) =>
                        axios.get(`http://localhost:8000/shopping/api/products/${item.productCode}`)
                    );

                    // 모든 요청을 병렬로 실행
                    const responses = await Promise.all(productRequests);

                    // 각 응답의 데이터를 추출
                    const products = responses.map((response) => response.data);

                    // 데이터를 상태에 저장
                    SetProductData(products);
                } catch (error) {
                    console.error('Failed to fetch product data:', error);
                    alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
                }
            }
        };

        fetchProducts();
    }, [wishListData]);

    const handleRemoveFromWishlist = async (id) => {
        try {
            // API 호출: 서버에 삭제 요청
            await axios.post(`http://localhost:8000/shopping/api/wishlist/delete/${id}`);

            // 삭제 성공 시 상태 업데이트
            const updatedWishlist = productData.filter(
                (product) => !wishListData.some((wish) => wish.id === id && wish.pnum === product.pnum)
            );
            SetProductData(updatedWishlist);

            alert('찜 목록에서 삭제되었습니다.');

            // 페이지를 새로고침
            window.location.href = '/Wishlist';
        } catch (error) {
            console.error('Failed to remove product from wishlist:', error);
            alert('찜 목록에서 삭제하는 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        if (!keyword.trim()) {
            alert("검색어를 입력해주세요!");
            return;
        }

        if(memberData){
            const memberCode = memberData.memnum; // 실제 로그인된 사용자 코드로 교체해야 함
        
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/wishlist/search`, {
                    params: { keyword, memberCode }, // keyword와 memberCode를 함께 전달
                });
                SetWishListData(response.data); // 검색 결과를 화면에 표시하거나 다른 작업 수행
            } catch (error) {
                console.error("검색 요청 중 오류 발생:", error);
            }
        }
    };
    


    return (
        <div>
            <Header />
            <div className='sidebar'>
                <ul className='sidebar_ul'>
                    <li ><Link to='/Delivery_check'><FontAwesomeIcon icon={faTruckFast} /> 배송조회</Link></li>
                    <li><Link to='/order'><FontAwesomeIcon icon={faCartShopping} /> 주문 조회</Link></li>
                    <li className=''><Link to='/Wishlist'><FontAwesomeIcon icon={faHeart} /> 관심 상품</Link></li>
                    <li className='mg40_left sidebar_select'><Link to='/Wishlist'><FontAwesomeIcon icon={faMinus} /> 상품</Link></li>
                    <li className='mg40_left'><Link to='/Wishlist_stylelist'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
                    <li><Link to='/Board_main'><FontAwesomeIcon icon={faPenToSquare} /> 게시글 관리</Link></li>
                    <li className='mg40_left'><Link to='/Board_main'><FontAwesomeIcon icon={faMinus} /> 문의</Link></li>
                    <li className='mg40_left'><Link to='/Board_review'><FontAwesomeIcon icon={faMinus} /> 리뷰</Link></li>
                    <li className='mg40_left'><Link to='/Board_style'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
                </ul>
            </div>
            <section className="wishlist_section">

                <h2 className='wishlisttitle'>관심 상품 목록</h2>
                <div>
                    <form className='wishlist_searchform' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            className='wishlist_searchip'
                            value={keyword}
                            onChange={handleInputChange}
                            placeholder="검색어를 입력하세요" />

                        <button type="submit" className="btn_search" >
                            <img src="https://i.postimg.cc/cH85Hwp5/search-btn2.png" alt="Search" />
                        </button>
                    </form>
                </div>
                <table class="wishlist_table">
                    <tbody>
                        {productData && wishListData && productData.length > 0 ? (
                            productData.map((product, index) => (
                                <tr className="wishlist_tr" key={index}>
                                    <td className="wishlist_img">
                                        <Link to={`/product/${product.pnum}`}>
                                            <img src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`} alt={product.name || "상품 이미지"} />
                                        </Link>
                                    </td>
                                    <td className="img_title">

                                        상품명 : {product.pname}<br />
                                        금액 : {product.price?.toLocaleString() || "0"}원

                                    </td>
                                    <td className="wishlist_btn">
                                        <Link to={`/product/${product.pnum}`}>
                                            <button className="order_btn">주문하기</button>
                                        </Link>
                                        <button
                                            className="wishlist_cancle"
                                            onClick={() => handleRemoveFromWishlist(wishListData[index].id)}
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                                    찜한 상품이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    <ul class="paging">
                    </ul>
                </div>


            </section>
            <Footer />
        </div>
    );
};

export default Wishlist;