import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Member.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faShirt,faScroll,faComment,faPenToSquare,faMinus,faChartSimple } from '@fortawesome/free-solid-svg-icons';


function Mg_Member() {
    const [members, setMembers] = useState([]); // 여러 회원 데이터를 저장하기 위해 배열로 설정
    const memberResultRef = useRef(null); // memberresult에 대한 참조 생성
    const tableRef = useRef(null); // table에 대한 참조 생성
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e) => {
        
      };

    useEffect(() => {
        /*회원 수 코드*/
        if (tableRef.current && memberResultRef.current) {
            const table = tableRef.current;
            const tbody = table.tBodies[0].rows.length;
            memberResultRef.current.innerText = `회원 수: ${tbody}`; // 총 회원 수 업데이트
        }
    }, [members]); // members가 변경될 때마다 업데이트

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/shopping/api/memberCount'); // 모든 회원 데이터 가져오기
                const filteredMembers = response.data.filter(member => !member.admintype); // admintype이 false인 회원만 필터링
                setMembers(filteredMembers); // 필터링된 회원 데이터 설정
                console.log(members);
            } catch (error) {
                console.error('Error fetching member count:', error);
                setMembers([]);  // 에러 발생 시 빈 배열로 설정
            }
        };

        fetchMembers();
    }, []);

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
                            <li><Link to="/Mg_Orderlist" ><FontAwesomeIcon icon={faScroll} />주문 관리</Link></li>
                            <li><Link to="/Mg_Member" className="txtbold"><FontAwesomeIcon icon={faUser} />회원 관리</Link></li>
                            <li><Link to="/Mg_Product"><FontAwesomeIcon icon={faShirt} />상품 관리</Link></li>
                            <li><Link to="/Mg_Inquiry"><FontAwesomeIcon icon={faComment} />고객 문의</Link></li>
                            <li><Link to="/Mg_Review"><FontAwesomeIcon icon={faPenToSquare} />게시글 관리</Link></li>
                            <li><Link to="/Mg_Review" className='suvsidemenu'><FontAwesomeIcon icon={faMinus} />리뷰</Link></li>
                            <li><Link to="/Mg_Total"><FontAwesomeIcon icon={faChartSimple} />통계</Link></li>
                        </ul>
                    </div>{/* 사이드 바 끝 */}
                    <div className="mgmain_detail">
                        <div className="membersearch">
                            <div className="mgmain_title">
                                <h2>회원 관리</h2>
                            </div>
                            <br></br>
                            <br/>
                            <select name="" id="" className='searchoption1'>
                                <option value="">아이디</option>
                                <option value="">이름</option>
                            </select>
                            <input type="text" className='searchoption2' onClick={handleSearch}></input>
                            
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
                                    {members.map((member, index) => ( // 필터링된 회원 데이터로 반복
                                        <tr key={index}>
                                            <td><span>{member.memid}</span></td>
                                            <td><span>{member.memname}</span></td>
                                            <td><span>{member.pnumber}</span></td>
                                            <td><span>{member.memrank}</span></td>
                                            <td><span>{formatDate(member.createDate)}</span></td>
                                            <td>
                                                <Link to="">활동로그</Link><b> / </b>
                                                <Link to="">수정</Link><b> / </b>
                                                <Link to="">삭제</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                
            </div>
        </div>
    );
};

export default Mg_Member;
