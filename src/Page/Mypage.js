import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Mypage.css';

function Mypage() {
  const [memberData, setMemberData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [paidCount, setPaidCount] = useState(0);
  const [prepaging_shipmentCount, setPrepaging_ShipmentCount] = useState(0);
  const [inTransitCount, setInTransitCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const memid = sessionStorage.getItem("memid"); // memId가 sessionStorage에 제대로 저장되어 있는지 확인

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


  useEffect(() => {
    if(orderData){
      // 결제 완료(PAID) 및 배송 중(IN_TRANSIT)의 갯수 계산
      const paidOrders = orderData.filter(order => order.orderStatus === 'PAID').length;
      const prepaging_shipmentOrders = orderData.filter(order => order.orderStatus === 'PREPARING_SHIPMENT').length;
      const inTransitOrders = orderData.filter(order => order.orderStatus === 'IN_TRANSIT').length;
      const deliveredOrders = orderData.filter(order => order.orderStatus === 'DELIVERED').length;
  
      setPaidCount(paidOrders);
      setPrepaging_ShipmentCount(prepaging_shipmentOrders);
      setInTransitCount(inTransitOrders);
      setDeliveredCount(deliveredOrders);
    }
  }, [orderData]);

  return (
    <div>
      <Header />
      <section className="mypage_detail">
        <h2 className='mypage_detail_title'>마이 페이지</h2>
        <div className="rank">
          <img src="" alt="" />
          {memberData && memberData.memname && (
            <p style={{ fontWeight: 'bold' }}>안녕하세요. {memberData.memname} 님!</p>
          )}
          {memberData && memberData.memrank && (
            <p style={{ color: 'rgb(116, 116, 116)' }}>고객님의 회원등급은 {memberData.memrank} 입니다.</p>
          )}
        </div>
        <div className="order_processingdiv">
          <p style={{ fontWeight: 'bold' }}>나의 주문처리 현황</p>
          <br></br>
          <table className="order_processing">
            <tbody>
              <tr className="order_num">
                <td>{paidCount}</td>
                <td>{prepaging_shipmentCount}</td>
                <td>{inTransitCount}</td>
                <td>{deliveredCount}</td>
              </tr>
              <tr className="order_text">
                <td>결제완료</td>
                <td>배송준비중</td>
                <td>배송중</td>
                <td>배송완료</td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="mypage_menu">
          <tbody>
            <tr>
              <td className="tableset">
                <a href="Delivery_check" className="menuset">
                  Delivery<br />
                  <p className="menuset_p">배송조회</p>
                </a>
                <br />
                <Link to="/Delivery_check" className="menuset2">
                  고객님께서 주문하신 상품의 배송조회를 하실 수 있습니다.
                </Link>
              </td>
              <td className="tableset">
                <a href="order" className="menuset">
                  Order <br />
                  <p className="menuset_p">주문내역조회</p>
                </a>
                <br />
                <Link to="/order" className="menuset2">
                  고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.
                </Link>
              </td>
              <td className="tableset">
                <a href="modify" className="menuset">
                  Profile <br />
                  <p className="menuset_p">회원정보수정</p>
                </a>
                <br />
                <Link to="/modify" className="menuset2">
                  회원이신 고객님의 개인정보를 관리하는 공간입니다.
                </Link>
              </td>
              <td className="tableset">
                <a href="wishlist" className="menuset">
                  Wishlist <br />
                  <p className="menuset_p">관심 상품</p>
                </a>
                <br />
                <Link to="/wishlist" className="menuset2">
                  관심 상품으로 등록하신 상품의 목록을 보여드립니다.
                </Link>
              </td>
              <td className="tableset">
                <a href="board_main" className="menuset">
                  Board <br />
                  <p className="menuset_p">게시물 관리</p>
                </a>
                <br />
                <Link to="/board_main" className="menuset2">
                  관심 상품으로 등록하신 상품의 목록을 보여드립니다.
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  );

}

export default Mypage;
