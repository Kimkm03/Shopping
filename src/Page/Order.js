import React from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Order.css';

function Order(){
    return(
    <div> 
        <Header />
        <section className="order_datail">
            <h2 className='orderh2'>주문조회</h2>
            <p style={{fontweight: 'bold'}}>주문내역 조회</p>
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
                <tr className="order_list">
                    <td>1</td>
                    <td>0000-00-00</td>
                    <td>00000000</td>
                    <td><a href="" style={{textDecoration: 'none', color: 'black'}}>조원들은 무엇을할까</a></td>
                    <td>500</td>
                    <td>500,000</td>
                    <td> 구매확정<br/><br/>
                        <a href="write_review.html"><button className="go_review">후기작성</button></a></td>
                </tr>
                <tr className="order_list">
                    <td>1</td>
                    <td>0000-00-00</td>
                    <td>00000000</td>
                    <td><a href="" style={{textDecoration: 'none', color: 'black'}}>조원들은 무엇을할까</a></td>
                    <td>500</td>
                    <td>500,000</td>
                    <td> 배송완료<br/><br/>
                        <button className="go_deliver">배송조회</button></td>
                </tr>
            
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