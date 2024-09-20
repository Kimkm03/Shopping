import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Orderlist.css';

function Mg_Orderlist() {
    return(
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
                                    <th className="wid80">결제정보</th>
                                    <th className="wid80">금액</th>
                                </tr> 
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024-06-01 15:15</td>
                                    <td><span>2022020</span></td>
                                    <td><span>가나다</span></td>
                                    <td><span>ㅇㅇㅇㅇㅇㅇㅇㅇㅇ</span></td>
                                    <td><span>M</span> / <span>black</span></td>
                                    <td>999</td>
                                    <td>
                                        <select name="" id="">
                                            <option value="">입금전</option>
                                            <option value="" selected>배송준비중</option>
                                            <option value="">배송중</option>
                                            <option value="">배송완료</option>
                                            <option value="">구매확정</option>
                                            <option value="">환불</option>
                                            <option value="">교환</option>
                                        </select>
                                    </td>
                                    <td><p><span>수령인</span> / <span>010-1234-5678</span></p><p>배송지</p></td>
                                    <td>카드결제</td>
                                    <td>1,000,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};


export default Mg_Orderlist;
