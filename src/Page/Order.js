import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import ProductInfo from '../Components/ProductInfo';
import './Order.css';

function Order() {
    const [memberData, setMemberData] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const memid = sessionStorage.getItem("memid"); // memId가 sessionStorage에 제대로 저장되어 있는지 확인
    const navigate = useNavigate();

    // 회원 데이터 가져오기
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
        const fetchOrderAndProductData = async () => {
            if (memberData && memberData.memnum) {
                try {
                    // 주문 데이터를 가져옴
                    const orderResponse = await axios.get(`http://localhost:8000/shopping/api/orderdetail/${memberData.memnum}`);
                    const fetchedOrderData = orderResponse.data;
                    setOrderData(fetchedOrderData);
                } catch (error) {
                    console.error('Failed to fetch order data:', error);
                    alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
                }
            }
        };

        fetchOrderAndProductData();
    }, [memberData]); // memberData가 변경될 때마다 주문 및 상품 데이터를 가져옵니다.


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
        navigate('/write_review', { state: { productCode } });
    };

    return (
        <div>
            <Header />
            <section className="order_datail">
                <h2 className='orderh2'>주문조회</h2>
                <p style={{ fontweight: 'bold' }}>주문내역 조회</p>
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
                                        <button className="go_review" onClick={() => handleReviewClick(order.productCode)}>후기작성</button>
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
                <div>
                    <ul className="paging">
                    </ul>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Order;