import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Member.css';


function Mg_Inquiry() {
    
    

    return(
        <div>
            <Header />
            <div className="mgmain_section">
                <div className="pr50">
                    <div className="sidemenu">
                        <ul>
                            <li><Link to="/Mg_Member">-회원관리</Link></li>
                            <li><Link to="/Mg_Orderlist">-주문 관리</Link></li>
                            <li><Link to="/Mg_Product">-상품 관리</Link></li>
                            <li><Link to="/Mg_Review">-리뷰 관리</Link></li>
                            <li><Link to="/Mg_Inquiry" className="txtbold">-고객 문의</Link></li>
                            <li><Link to="/Mg_Total">-통계</Link></li>
                        </ul>
                    </div>{/* 사이드 바 끝 */}
                    <div className="mgmain_detail" >
                        <div className="membersearch">
                            <h2 className='membersearch_title'>고객 문의</h2> 
                            <br></br>
                            <br/>
                            <select name="" id="" className='searchoption1'>
                                <option value="">아이디</option>
                                <option value="">이름</option>
                            </select>
                            <input type="text" className='searchoption2'></input>

                        </div>
                        <div className="tablediv">
                            
                            <table id="membertable" className="membertable">
                                <thead className="membertable_title">
                                    <tr>
                                        <th style={{width: "10%"}}>일시</th>
                                        <th style={{width: "20%"}}>아이디</th>
                                        <th style={{width: "10%"}}>이름</th>
                                        <th style={{width: "50%"}}>제목</th>
                                        <th style={{width: "10%"}}>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span>2024-05-21</span></td>
                                        <td><span>a1234</span></td>
                                        <td><span>강민태</span></td>
                                        <td><Link to="/Write_inquiry_reply">배송관련문의입니다</Link></td>
                                        <td><span>대기</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>2024-05-21</span></td>
                                        <td><span>a1234</span></td>
                                        <td><span>강민태</span></td>
                                        <td><Link to="/Write_inquiry_reply">배송언제되나요</Link></td>
                                        <td><span>완료</span></td>
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


export default Mg_Inquiry;
