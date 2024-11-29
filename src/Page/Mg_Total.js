import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Total.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faShirt,faScroll,faComment,faPenToSquare,faMinus,faChartSimple } from '@fortawesome/free-solid-svg-icons';


function Mg_Total() {
    return(
        <div>
            <Header />
            <div className="mgmain_section">
                <div className="sidemenu">
                    <ul>
                        <li><Link to="/Mg_Orderlist" ><FontAwesomeIcon icon={faScroll} />주문 관리</Link></li>
                        <li><Link to="/Mg_Member"><FontAwesomeIcon icon={faUser} />회원 관리</Link></li>
                        <li><Link to="/Mg_Product"><FontAwesomeIcon icon={faShirt} />상품 관리</Link></li>
                        <li><Link to="/Mg_Inquiry"><FontAwesomeIcon icon={faComment} />고객 문의</Link></li>
                        <li><Link to="/Mg_Review"><FontAwesomeIcon icon={faPenToSquare} />게시글 관리</Link></li>
                        <li><Link to="/Mg_Review" className='suvsidemenu'><FontAwesomeIcon icon={faMinus} />리뷰</Link></li>
                        <li><Link to="/Mg_Total" className="txtbold"><FontAwesomeIcon icon={faChartSimple} />통계</Link></li>
                    </ul>
                </div>{/* 사이드 바 끝 */}
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