import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import ProductInfo from '../Components/ProductInfo';
import { Link } from 'react-router-dom';
import './Delivery_check.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

function Delivery_check() {
    const [memberData, setMemberData] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const memid = sessionStorage.getItem("memid"); // memId가 sessionStorage에 제대로 저장되어 있는지 확인

    const [filter, setFilter] = useState({
        userCode: null,         // 특정 사용자 코드
        orderStatus: "전체",       // "전체" 선택 시 빈 문자열
        startDate: "",
        endDate: "",
    });

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
                    const orderResponse = await axios.get(`http://localhost:8000/shopping/api/orderstatusdetail/${memberData.memnum}`);
                    const fetchedOrderData = orderResponse.data;
                    setOrderData(fetchedOrderData);
                } catch (error) {
                    console.error('Failed to fetch order data:', error);
                    alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
                }
            }
        };

        if (memberData && memberData.memnum) {
            setFilter((prevFilter) => ({
                ...prevFilter,
                userCode: memberData.memnum,  // memnum이 로드되면 userCode 설정
            }));
        }

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

    const handleStatusChange = (e) => {
        setFilter({ ...filter, orderStatus: e.target.value });
    };

    const handleDateChange = (e) => {
        const { id, value } = e.target;
        if (id === "dayset") {
            setFilter({ ...filter, startDate: value });
        } else if (id === "dayset2") {
            setFilter({ ...filter, endDate: value });
        }
    };

    const handlePeriodClick = (period) => {
        const today = new Date();
        let startDate = "";
        if (period === "오늘") {
            startDate = today.toISOString().split("T")[0];
        } else if (period === "7일") {
            startDate = new Date(today.setDate(today.getDate() - 7))
                .toISOString()
                .split("T")[0];
        } else if (period === "1개월") {
            startDate = new Date(today.setMonth(today.getMonth() - 1))
                .toISOString()
                .split("T")[0];
        } else if (period === "3개월") {
            startDate = new Date(today.setMonth(today.getMonth() - 3))
                .toISOString()
                .split("T")[0];
        }

        setFilter({ ...filter, startDate, endDate: new Date().toISOString().split("T")[0], period });
    };

    const handleSearch = () => {
        axios
            .post("http://localhost:8000/shopping/api/order/search", filter)
            .then((response) => {
                console.log("조회 결과:", response.data);
                setOrderData(response.data);
                alert("검색이 완료되었습니다.");
            })
            .catch((error) => {
                console.error("조회 오류:", error);
            });
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
            <div className='sidebar'>
                <ul className='sidebar_ul'>
                    <li className='sidebar_select'><Link to='/Delivery_check'><FontAwesomeIcon icon={faTruckFast} /> 배송조회</Link></li>
                    <li><Link to='/order'><FontAwesomeIcon icon={faCartShopping} /> 주문 조회</Link></li>
                    <li><Link to='/Wishlist'><FontAwesomeIcon icon={faHeart} /> 관심 상품</Link></li>
                    <li><Link to='/Board_main'><FontAwesomeIcon icon={faPenToSquare} /> 게시글 관리</Link></li>
                    <li className='mg40_left'><Link to='/Board_main'><FontAwesomeIcon icon={faMinus} /> 문의</Link></li>
                    <li className='mg40_left'><Link to='/Board_review'><FontAwesomeIcon icon={faMinus} /> 리뷰</Link></li>
                    <li className='mg40_left'><Link to='/Board_style'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
                </ul>
            </div>
            <section className="delivery_section">

                <h2 style={{ color: 'rgb(81, 79, 79)' }}>배송 조회</h2>

                <div className="delivery_dayset">
                    <select id="mobile01" onChange={handleStatusChange}>
                        <option value="전체">전체</option>
                        <option value="PREPARING_SHIPMENT">배송준비중</option>
                        <option value="IN_TRANSIT">배송중</option>
                        <option value="DELIVERED">배송완료</option>
                    </select>

                    <button id="daybtn" onClick={() => handlePeriodClick("오늘")}>오늘</button>
                    <button id="daybtn" onClick={() => handlePeriodClick("7일")}>7일</button>
                    <button id="daybtn" onClick={() => handlePeriodClick("1개월")}>1개월</button>
                    <button id="daybtn" onClick={() => handlePeriodClick("3개월")}>3개월</button>

                    <input type="date" id="dayset" value={filter.startDate} onChange={handleDateChange} />
                    ~
                    <input type="date" id="dayset2" value={filter.endDate} onChange={handleDateChange} />

                    <button id="delivery_select" onClick={handleSearch}>조회</button>
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