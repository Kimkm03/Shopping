import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import ProductInfo from '../Components/ProductInfo';
import './Delivery_check.css';

function Delivery_check() {
    const [memberData, setMemberData] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const memid = sessionStorage.getItem("memid"); // memId가 sessionStorage에 제대로 저장되어 있는지 확인

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

    useEffect(() => {
        // 컴포넌트가 렌더링된 후에 실행되는 코드
        const today = new Date().toISOString().substring(0, 10);
        document.getElementById('dayset').value = today;
        document.getElementById('dayset2').value = today;
    }, []); // 빈 배열은 이 효과가 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

    return (
        <div>
            <Header />
            <section className="delivery_section">
                <h2 style={{ color: 'rgb(81, 79, 79)' }}>배송 조회</h2>

                <div className="delivery_dayset">
                    <select id="mobile01">
                        <option value="전체">전체</option>
                        <option value="입금전">입금전</option>
                        <option value="배송준비중">배송준비중</option>
                        <option value="배송중">배송중</option>
                        <option value="배송완료">배송완료</option>
                        <option value="취소">취소</option>
                        <option value="교환">교환</option>
                        <option value="반품">반품</option>
                    </select>

                    <button id="daybtn">오늘</button>
                    <button id="daybtn">7일</button>
                    <button id="daybtn">1개월</button>
                    <button id="daybtn">3개월</button>
                    <input type="date" id="dayset" /> ~
                    <input type="date" id="dayset2" />
                    <button id="delivery_select">조회</button>
                    <ul className="delivery_dayset_info">
                        <li>배송조회는 최대 3개월까지만 확인이 가능합니다.</li>
                        <li>배송완료 7일 이후에는 취소/교환/환불이 불가합니다.</li>
                        <li>추가로 더 궁금하신 사항은 문의해주세요!</li>
                    </ul>
                </div><br /><br />
                <table className="delivery_table">
                    <thead>
                        <tr style={{ height: '60px', borderbottom: '1px solid grey' }}>
                            <th style={{ width: '120px' }}>주문일자</th>
                            <th style={{ width: '120px' }}>주문번호</th>
                            <th>상품정보</th>
                            <th style={{ width: '120px' }}>배송상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData && orderData.length > 0 ? (
                            orderData.map((order) => (
                                <tr key={order.id} style={{ height: '140px', borderBottom: '1px solid grey' }}>
                                    <td>{formatDate(order.orderDate)}</td>
                                    <td>{order.impUid}</td>
                                    <td>
                                        <ProductInfo productCode={order.productCode} />
                                        <br />
                                        <p id="detail2">옵션 : {order.productColor} , {order.productSize}</p>
                                    </td>
                                    <td>{getStatusText(order.orderStatus)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center' }}>주문 내역이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section><br /><br /><br />
            <script>
                document.getElementById('dayset').value = new Date().toISOString().substring(0, 10);;
                document.getElementById('dayset2').value = new Date().toISOString().substring(0, 10);;
            </script>
            <Footer />
        </div>
    );
};
export default Delivery_check;