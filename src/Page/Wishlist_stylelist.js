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

function Wishlist_stylelist() {
    const [memberData, setMemberData] = useState(null);
    const [wishListData, SetWishListData] = useState(null);
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
                    const response = await axios.get(`http://localhost:8000/shopping/api/wishlist/styleCode/${memberData.memnum}`); // Spring API 엔드포인트
                    SetWishListData(response.data); // 스타일 데이터 설정
                } catch (error) {
                    console.error('Failed to fetch order data:', error);
                    alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
                }
            }
        };

        fetchProductCode();
    }, [memberData]);

    return (
        <div>
            <Header />
            <div className='sidebar'>
                <ul className='sidebar_ul'>
                    <li ><Link to='/Delivery_check'><FontAwesomeIcon icon={faTruckFast} /> 배송조회</Link></li>
                    <li><Link to='/order'><FontAwesomeIcon icon={faCartShopping} /> 주문 조회</Link></li>
                    <li className=''><Link to='/Wishlist'><FontAwesomeIcon icon={faHeart} /> 관심 상품</Link></li>
                    <li className='mg40_left '><Link to='/Wishlist'><FontAwesomeIcon icon={faMinus} /> 상품</Link></li>
                    <li className='mg40_left sidebar_select'><Link to='/Wishlist_stylelist'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
                    <li><Link to='/Board_main'><FontAwesomeIcon icon={faPenToSquare} /> 게시글 관리</Link></li>
                    <li className='mg40_left'><Link to='/Board_main'><FontAwesomeIcon icon={faMinus} /> 문의</Link></li>
                    <li className='mg40_left'><Link to='/Board_review'><FontAwesomeIcon icon={faMinus} /> 리뷰</Link></li>
                    <li className='mg40_left'><Link to='/Board_style'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
                </ul>
            </div>
            <section className="wishlist_section">

                <h2 className='wishlisttitle'>관심 스타일 목록</h2>
                <div>
                </div>
                <div>
                    <div className='wishstyle_section'>
                        <ul className='wishstyle_list'>
                            {wishListData && wishListData.length > 0 ? (
                                wishListData.map((item, index) => (
                                    <li className='' key={index}>
                                        <Link to={`/stylecodidetail/${item.styleCode}`}>
                                            <img
                                                src={`http://localhost:8000/shopping/api/style/${item.styleCode}/picture` || '/style1.jpg'}
                                                alt={item.name || '상품 이미지'}
                                                className='wishstyle_list_img'
                                            />
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li style={{ textAlign: 'center', padding: '20px' }}>
                                    찜한 스타일이 없습니다.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Wishlist_stylelist;