import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ProductInfo from '../Components/ProductInfo';
import './Mg_Orderlist.css';

function Mg_Orderlist() {
    const [userInfo, setUserInfo] = useState({});
    const [orderData, setOrderData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    // 주문 데이터 가져오기
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/shopping/api/allOrders');
            setOrderData(response.data);
        } catch (error) {
            console.error('주문 목록을 불러오는 데 실패했습니다:', error);
        }
    };

    const fetchUserInfo = async (userCode) => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/memberInfo/${userCode}`);
            setUserInfo((prev) => ({ ...prev, [userCode]: response.data }));
        } catch (error) {
            console.error('주문자 정보를 불러오는 데 실패했습니다:', error);
        }
    };

    // 주문이 로드될 때마다 주문자 정보도 가져오기
    useEffect(() => {
        if (orderData.length > 0) {
            orderData.forEach(order => {
                if (!userInfo[order.userCode]) { // 중복 호출 방지
                    fetchUserInfo(order.userCode);
                }
            });
        }
    }, [orderData]);

    const handleStatusChange = (orderId, status) => {
        setSelectedStatus((prev) => ({
            ...prev,
            [orderId]: status,
        }));
    };

    const updateOrderStatus = async () => {
        try {
            const requests = Object.entries(selectedStatus).map(([orderId, status]) => {
                return axios.put(`http://localhost:8000/shopping/api/updateOrder/${orderId}`, null, {
                    params: { orderStatus: status } // 쿼리 매개변수로 전송
                });
            });

            await Promise.all(requests);
            alert('주문 상태가 업데이트되었습니다.');
            // 데이터 새로 고침
            fetchOrders();
        } catch (error) {
            console.error('주문 상태 업데이트 오류:', error);
            alert('주문 상태 업데이트에 실패했습니다.');
        }
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

    return (
        <div>
            <Header />
            <div className="mgmain_section">
                <div className="sidemenu">
                    <ul>
                        <li><Link to="/Mg_Member">-회원관리</Link></li>
                        <li><Link to="/Mg_Orderlist" className="txtbold">-주문 관리</Link></li>
                        <li><Link to="/Mg_Product">-상품 관리</Link></li>
                        <li><Link to="/Mg_Review">-리뷰 관리</Link></li>
                        <li><Link to="/Mg_Total">-통계</Link></li>
                    </ul>
                </div>{/* 사이드 바 끝 */}
                <div className="mgmain_detail">
                    <div className="pr100">
                        <div className="mgmain_title">
                            <h2>주문 관리</h2>
                        </div>
                        <table className="orderlistmg">
                            <thead>
                                <tr>
                                    <th className="wid100">주문일시</th>
                                    <th className="wid80">주문번호</th>
                                    <th className="wid60">주문자</th>
                                    <th className="">상품명</th>
                                    <th className="wid80">옵션</th>
                                    <th className="wid50">수량</th>
                                    <th className="wid60">상태</th>
                                    <th className="wid200">배송지정보</th>
                                    <th className="wid80">금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.length > 0 ? (
                                    orderData.map((order, index) => (
                                        <tr key={index}>
                                            <td>{formatDate(order.orderDate)}</td>
                                            <td><span>{order.impUid}</span></td>
                                            <td>
                                                {userInfo[order.userCode] ? (
                                                    <span>{userInfo[order.userCode].memname}</span> // 예시로 이름을 보여줌
                                                ) : (
                                                    <span>불러오는 중...</span>
                                                )}
                                            </td>
                                            <ProductInfo productCode={order.productCode} />
                                            <td><span>{order.productSize}</span> / <span>{order.productColor}</span></td>
                                            <td>{order.count}</td>
                                            <td>
                                                <select
                                                    defaultValue={order.orderStatus}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    <option value="PENDING">입금전</option>
                                                    <option value="PREPARING_SHIPMENT">배송준비중</option>
                                                    <option value="IN_TRANSIT">배송중</option>
                                                    <option value="DELIVERED">배송완료</option>
                                                    <option value="PAID">구매확정</option>
                                                    <option value="REFUNDED">환불</option>
                                                    <option value="EXCHANGED">교환</option>
                                                </select>
                                            </td>
                                            <td>
                                                    <p><span>{order.receiverName}</span> / <span>{order.receiverPhone}</span></p>
                                                <p>{order.shippingAddress}</p>
                                            </td>
                                            <td>{order.orderPrice.toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10">주문 데이터가 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button onClick={updateOrderStatus}>주문 상태 업데이트</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mg_Orderlist;
