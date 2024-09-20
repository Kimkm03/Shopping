import React, { useEffect }  from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Delivery_check.css';

function Delivery_check(){
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
        <h2 style={{color: 'rgb(81, 79, 79)'}}>배송 조회</h2>
        
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
            <input type="date" id="dayset"/> ~
            <input type="date" id="dayset2"/>
            <button id="delivery_select">조회</button>
            <ul className="delivery_dayset_info">
                <li>배송조회는 최대 3개월까지만 확인이 가능합니다.</li>
                <li>배송완료 7일 이후에는 취소/교환/환불이 불가합니다.</li>
                <li>추가로 더 궁금하신 사항은 문의해주세요!</li>
            </ul>
        </div><br/><br/>
        <table className="delivery_table">
            <thead>
                <tr style={{height:'60px', borderbottom: '1px solid grey'}}>
                    <th style={{width: '120px'}}>주문일자</th>
                    <th style={{width: '120px'}}>주문번호</th>
                    <th>상품정보</th>
                    <th style={{width: '120px'}}>배송상태</th>
                </tr>
            </thead>
            <tbody>
                <tr style={{height: '140px', borderbottom: '1px solid grey;'}}>
                    <td>2000-01-01</td>
                    <td>12345678</td>
                    <td><a href=""><img src={`${process.env.PUBLIC_URL}/test_product.png`} alt=""/></a><br/><br/>
                        <a href="" id="detail">상품명을 작성하는 란</a><br/>
                    <p id="detail2">옵션 : aaaaaa</p></td>
                    <td>배송완료</td>
                </tr>
                <tr style={{height: '140px', borderbottom: '1px solid grey;'}}>
                    <td>2000-01-01</td>
                    <td>12345678</td>
                    <td><a href=""><img src={`${process.env.PUBLIC_URL}/test_product.png`} alt=""/></a><br/><br/>
                        <a href="" id="detail">상품명을 작성하는 란</a><br/>
                    <p id="detail2">옵션 : aaaaaa</p></td>
                    <td>배송중</td>
                </tr>
            </tbody>
        </table>
    </section><br/><br/><br/>
    <script>
        document.getElementById('dayset').value = new Date().toISOString().substring(0, 10);;
        document.getElementById('dayset2').value = new Date().toISOString().substring(0, 10);;
    </script>
            <Footer />
        </div>
    );
};
export default Delivery_check;