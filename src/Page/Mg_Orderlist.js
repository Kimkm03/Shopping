import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ProductInfo from '../Components/ProductInfo';
import './Mg_Orderlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faShirt,faScroll,faComment,faPenToSquare,faMinus,faChartSimple } from '@fortawesome/free-solid-svg-icons';


function Mg_Orderlist() {
    const [userInfo, setUserInfo] = useState({});
    const [orderData, setOrderData] = useState([]);

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

    const handleStatusChange = async (orderId, status) => {
        try {
            await axios.put(`http://localhost:8000/shopping/api/updateOrder/${orderId}`, null, {
                params: { orderStatus: status }
            });
            fetchOrders();
            alert('주문 상태가 업데이트되었습니다.');
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
                        <li><Link to="/Mg_Orderlist" className="txtbold"><FontAwesomeIcon icon={faScroll} />주문 관리</Link></li>
                        <li><Link to="/Mg_Member"><FontAwesomeIcon icon={faUser} />회원 관리</Link></li>
                        <li><Link to="/Mg_Product"><FontAwesomeIcon icon={faShirt} />상품 관리</Link></li>
                        <li><Link to="/Mg_Inquiry"><FontAwesomeIcon icon={faComment} />고객 문의</Link></li>
                        <li><Link to="/Mg_Review"><FontAwesomeIcon icon={faPenToSquare} />게시글 관리</Link></li>
                        <li><Link to="/Mg_Review" className='suvsidemenu'><FontAwesomeIcon icon={faMinus} />리뷰</Link></li>
                        {/* <li><Link to="/Mg_Total"><FontAwesomeIcon icon={faChartSimple} />통계</Link></li> */}
                    </ul>
                </div>{/* 사이드 바 끝 */}
                <div className="mgmain_detail">
                    <div className='tablediv'>
                        <div className="mgmain_title">
                            <h2>주문 관리</h2>
                        </div>
                        <div className='mg_search'>{/* 검색 기능 추가 예정 */}
                            <form className='mg_searchform'>
                                <input type='text' className='mg_searchtxt' placeholder="상품명 또는 주문자" />
                                <button type="submit" className="btn_search">
                                <img src="https://i.postimg.cc/cH85Hwp5/search-btn2.png" alt="Search" />
                                </button>
                            </form>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mg_Orderlist;
