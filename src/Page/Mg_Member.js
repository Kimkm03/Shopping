
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Member.css';


function Mg_Member() {
    
    const memberResultRef = useRef(null); // memberresult에 대한 참조 생성
    const tableRef = useRef(null); // table에 대한 참조 생성

    useEffect(() => {
        /*회원 수 코드*/
        if (tableRef.current && memberResultRef.current) {
            const table = tableRef.current;
            const tbody = table.tBodies[0].rows.length;
            memberResultRef.current.innerText = `회원 수: ${tbody}`;
          }
        }, []);

    return(
        <div>
            <Header />
            <div className="mgmain_section">
                <div className="pr50">
                    <div className="sidemenu">
                        <ul>
                            <li><Link to="/Mg_Member" className="txtbold">-회원관리</Link></li>
                            <li><Link to="/Mg_Orderlist">-주문 관리</Link></li>
                            <li><Link to="/Mg_Product">-상품 관리</Link></li>
                            <li><Link to="/Mg_Review">-리뷰 관리</Link></li>
                            <li><Link to="/Mg_Total">-통계</Link></li>
                        </ul>
                    </div>{/* 사이드 바 끝 */}
                    <div className="mgmain_detail" >
                        <div className="membersearch">
                            <h2 className='membersearch_title'>회원검색</h2> 
                            <br></br>
                            <br/>
                            <select name="" id="" className='searchoption1'>
                                <option value="">아이디</option>
                                <option value="">이름</option>
                            </select>
                            <input type="text" className='searchoption2'></input>

                        </div>
                        <div className="tablediv">
                            <p className="membernumder"> 총 <span id="memberresult" ref={memberResultRef}></span> 명</p> {/* 스크립트 구현함 */}
                            <table id="membertable" ref={tableRef} className="membertable">
                                <thead className="membertable_title">
                                    <tr>
                                        <th style={{width: "20%"}}>아이디</th>
                                        <th style={{width: "15%"}}>이름</th>
                                        <th style={{width: "15%"}}>전화번호</th>
                                        <th style={{width: "10%"}}>등급</th>
                                        <th style={{width: "15%"}}>가입일</th>
                                        <th style={{width: "25%"}}>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span>a1234</span></td>
                                        <td><span>강민태</span></td>
                                        <td><span>010-1234-5678</span></td>
                                        <td><span>일반</span></td>
                                        <td><span>2024-05-21</span></td>
                                        <td><Link to="">활동로그</Link><b> / </b><Link to="">수정</Link><b> / </b><Link to="">삭제</Link></td>
                                    </tr>
                                    <tr>
                                        <td><span>a1234</span></td>
                                        <td><span>강민태</span></td>
                                        <td><span>010-1234-5678</span></td>
                                        <td><span>일반</span></td>
                                        <td><span>2024-05-21</span></td>
                                        <td><Link to="">활동로그</Link><b> / </b><Link to="">수정</Link><b> / </b><Link to="">삭제</Link></td>
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


export default Mg_Member;
