import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Total.css';

function Mg_Total() {
    return(
        <div>
            <Header />
            <div className="mgmain_section">
                <div className="sidemenu">
                    <ul>
                        <li><Link to="/Mg_Member">-회원관리</Link></li>
                        <li><Link to="/Mg_Orderlist">-주문 관리</Link></li>
                        <li><Link to="/Mg_Product">-상품 관리</Link></li>
                        <li><Link to="/Mg_Review">-리뷰 관리</Link></li>
                        <li><Link to="/Mg_Total" className="txtbold">-통계</Link></li>
                    </ul>
                </div> {/* 사이드 바 끝 */}
                <div className="mgmain_detail">
                    <div className="pr100 pb100">
                        <div className="mgmain_title">
                            <h2>통계</h2>
                        </div>
                        <div className="totalmg_detail">
                            <h2 className='totalmg_subtitle'>매출</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>전월 매출</td>
                                        <td><span>0</span> 원</td>
                                    </tr>
                                    <tr>
                                        <td>금일 매출</td>
                                        <td><span>0</span> 원</td>
                                    </tr>
                                    <tr>
                                        <td>누적 매출</td>
                                        <td><span>0</span> 원</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2 className='totalmg_subtitle'>마일리지</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>제공된 마일리지</td>
                                        <td><span>0</span> 원</td>
                                    </tr>
                                    <tr>
                                        <td>사용된 마일리지</td>
                                        <td><span>0</span> 원</td>
                                    </tr>
                                    <tr>
                                        <td>사용되지 않은 마일리지</td>
                                        <td><span>0</span> 원</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2 className='totalmg_subtitle'>결제</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>최근 결제(한달)</td>
                                        <td><span>0</span> 건</td>
                                    </tr>
                                    <tr>
                                        <td>금일 결제(한달)</td>
                                        <td><span>0</span> 건</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2 className='totalmg_subtitle'>환불 / 교환</h2>
                            <table>
                                <tbody>
                                    <tbody>
                                        <tr>
                                            <td>최근 환불(한달)</td>
                                            <td><span>0</span> 건</td>
                                        </tr>
                                        <tr>
                                            <td>최근 교환(한달)</td>
                                            <td><span>0</span> 건</td>
                                        </tr>
                                        <tr>
                                            <td>누적 환불 / 교환</td>
                                            <td><span>0</span> / <span>0</span> 건</td>
                                        </tr>
                                    </tbody>
                                </tbody>
                            </table>
                            <h2 className='totalmg_subtitle'>회원</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>총 회원</td>
                                        <td><span>0</span> 명</td>
                                    </tr>
                                    <tr>
                                        <td>신규 가입 회원(금월)</td>
                                        <td><span>0</span> 명</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Mg_Total;