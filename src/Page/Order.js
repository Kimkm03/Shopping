import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import ProductInfo from '../Components/ProductInfo';
import './Order.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

function Order() {
    const [memberData, setMemberData] = useState(null);
    const [orderData, setOrderData] = useState({});
    const [reviewStates, setReviewStates] = useState({});
    const [code, setCode] = useState("");
    const [keyword, setKeyword] = useState("");
    const memid = sessionStorage.getItem("memid"); // memId가 sessionStorage에 제대로 저장되어 있는지 확인
    const navigate = useNavigate();

    // 회원 데이터 가져오기
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
                setMemberData(response.data);
                setCode(response.data.memnum);
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
        const fetchOrderAndReviewStates = async () => {
            if (memberData && memberData.memnum) {
                try {
                    // 주문 데이터 가져오기
                    const orderResponse = await axios.get(`http://localhost:8000/shopping/api/orderdetail/${memberData.memnum}`);
                    const fetchedOrderData = orderResponse.data;
                    setOrderData(fetchedOrderData);

                    // 각 주문의 productCode와 memnum으로 리뷰 상태를 동시에 조회
                    if (Array.isArray(fetchedOrderData)) {
                        const reviewStatePromises = fetchedOrderData.map(order =>
                            // productCode와 memnum을 함께 전달
                            axios.get(`http://localhost:8000/shopping/api/review/product/${order.productCode}/memnum/${memberData.memnum}`)
                        );

                        // 모든 리뷰 상태 요청이 완료될 때까지 대기
                        const reviewResponses = await Promise.all(reviewStatePromises);

                        // productCode를 키로 하여 리뷰 상태 객체 생성
                        const states = reviewResponses.reduce((acc, response, index) => {
                            const productCode = fetchedOrderData[index].productCode;
                            acc[productCode] = response.data.state; // 상태는 boolean 값
                            return acc;
                        }, {});

                        // 상태 설정
                        setReviewStates(states);
                    } else {
                        console.error("fetchedOrderData가 배열이 아닙니다.", fetchedOrderData);
                    }

                } catch (error) {
                    console.error('Failed to fetch order or review data:', error);
                    alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
                }
            }
        };

        fetchOrderAndReviewStates();
    }, [memberData]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        if (!keyword.trim()) {
            alert("검색어를 입력해주세요!");
            return;
        }

        try {
            if(keyword && code){
                const response = await axios.get(`http://localhost:8000/shopping/api/orders/search`, {
                    params: { keyword, code },
                });
                setOrderData(response.data);
                // 검색 결과를 화면에 표시하거나 다른 작업 수행
            }
        } catch (error) {
            console.error("검색 요청 중 오류 발생:", error);
        }
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return date.toLocaleString('ko-KR', options);
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING':
                return '결제 대기 중';
            case 'PAID':
                return '결제완료';
            case 'PREPARING_SHIPMENT':
                return '배송 준비 중';
            case 'IN_TRANSIT':
                return '배송 중';
            case 'DELIVERED':
                return '배송완료';
            case 'REFUNDED':
                return '환불';
            case 'EXCHANGED':
                return '교환';
            default:
                return '알 수 없음'; // 예외 처리
        }
    };

    const handleReviewClick = (productCode) => {
        // orderData에서 productCode가 일치하는 제품을 찾음
        const product = orderData.find(item => item.productCode === productCode);

        if (product) {
            navigate('/write_review', {
                state: {
                    productCode,
                    productColor: product.productColor,
                    productSize: product.productSize
                }

            });
        } else {
            console.error("해당 제품 코드를 찾을 수 없습니다.");
        }
    };

    return (
        <div>
            <Header />
            <div className='sidebar'>
                <ul className='sidebar_ul'>
                    <li ><Link to='/Delivery_check'><FontAwesomeIcon icon={faTruckFast} /> 배송조회</Link></li>
                    <li className='sidebar_select'><Link to='/order'><FontAwesomeIcon icon={faCartShopping} /> 주문 조회</Link></li>
                    <li><Link to='/Wishlist'><FontAwesomeIcon icon={faHeart} /> 관심 상품</Link></li>
                    <li><Link to='/Board_main'><FontAwesomeIcon icon={faPenToSquare} /> 게시글 관리</Link></li>
                    <li className='mg40_left'><Link to='/Board_main'><FontAwesomeIcon icon={faMinus} /> 문의</Link></li>
                    <li className='mg40_left'><Link to='/Board_review'><FontAwesomeIcon icon={faMinus} /> 리뷰</Link></li>
                    <li className='mg40_left'><Link to='/Board_style'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
                </ul>
            </div>
            <section className="order_datail">
                <h2 className='orderh2'>주문조회</h2>
                {/* <p style={{ fontweight: 'bold' }}>주문내역 조회</p> */}
                <div className='od_his_search'>
                    <form className='od_his_searchform' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="od_his_searchip"
                            value={keyword}
                            onChange={handleInputChange}
                            placeholder="검색어를 입력하세요"
                        />
                        <button type="submit" className="btn_search">
                            <img
                                src="https://i.postimg.cc/cH85Hwp5/search-btn2.png"
                                alt="Search"
                            />
                        </button>
                    </form>
                </div>
                <table className="order_history">
                    <thead>
                        <tr>
                            <th className="or_no">No</th>
                            <th className="or_day">주문일자</th>
                            <th className="or_num">주문번호</th>
                            <th className="or_name">상품명</th>
                            <th className="or_count">수량</th>
                            <th className="or_price">가격</th>
                            <th className="or_member">주문처리상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData && orderData.length > 0 ? (
                            orderData.map((order, index) => (
                                <tr className="order_list" key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{formatDate(order.orderDate)}</td>
                                    <td>{order.impUid}</td>

                                    {/* 개별 주문에 해당하는 상품 정보 로딩 */}
                                    <ProductInfo productCode={order.productCode} />
                                    <td>{order.count}</td>
                                    <td>{order.orderPrice}</td>
                                    <td>
                                        {getStatusText(order.orderStatus)}<br /><br />
                                        {reviewStates[order.productCode] ? (
                                            <strong>후기작성 완료</strong>
                                        ) : (
                                            <button className="go_review" onClick={() => handleReviewClick(order.productCode)}>
                                                후기작성
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center' }}>주문 내역이 없습니다.</td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </section>
            <Footer />
        </div>
    );
};

export default Order;