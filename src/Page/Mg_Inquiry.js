import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Member.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faShirt,faScroll,faComment,faPenToSquare,faMinus,faChartSimple } from '@fortawesome/free-solid-svg-icons';



function Mg_Inquiry() {
    const [userInfo, setUserInfo] = useState({});
    const [boardData, setBoardData] = useState([]);

    // 주문 데이터 가져오기
    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const response = await axios.get('http://localhost:8000/shopping/api/board/allBoards');
            setBoardData(response.data);
        } catch (error) {
            console.error('문의 목록을 불러오는 데 실패했습니다:', error);
        }
    };

    const fetchUserInfo = async (userCode) => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/memberInfo/${userCode}`);
            setUserInfo((prev) => ({ ...prev, [userCode]: response.data }));
        } catch (error) {
            console.error('문의자 정보를 불러오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        if (boardData.length > 0) {
            boardData.forEach(board => {
                if (!userInfo[board.userCode]) { // 중복 호출 방지
                    fetchUserInfo(board.userCode);
                }
            });
        }
    }, [boardData]);

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
                            <li><Link to="/Mg_Member"><FontAwesomeIcon icon={faUser} />회원 관리</Link></li>
                            <li><Link to="/Mg_Product"><FontAwesomeIcon icon={faShirt} />상품 관리</Link></li>
                            <li><Link to="/Mg_Inquiry" className="txtbold"><FontAwesomeIcon icon={faComment} />고객 문의</Link></li>
                            <li><Link to="/Mg_Review"><FontAwesomeIcon icon={faPenToSquare} />게시글 관리</Link></li>
                            <li><Link to="/Mg_Review" className='suvsidemenu'><FontAwesomeIcon icon={faMinus} />리뷰</Link></li>
                            <li><Link to="/Mg_Total"><FontAwesomeIcon icon={faChartSimple} />통계</Link></li>
                        </ul>
                    </div>{/* 사이드 바 끝 */}
                    <div className="mgmain_detail" >
                        <div className="mgmain_title">
                            <h2>고객 문의</h2>
                        </div>
                        <div className='mg_search'>{/* 검색 기능 추가 예정 */}
                            <form className='mg_searchform'>
                                <input type='text' className='mg_searchtxt' placeholder="아이디 또는 이름" />
                                <button type="submit" className="btn_search">
                                <img src="https://i.postimg.cc/cH85Hwp5/search-btn2.png" alt="Search" />
                                </button>
                            </form>
                        </div>
                        
                        <div className="tablediv">

                            <table id="membertable" className="membertable">
                                <thead className="membertable_title">
                                    <tr>
                                        <th style={{ width: "10%" }}>일시</th>
                                        <th style={{ width: "20%" }}>아이디</th>
                                        <th style={{ width: "10%" }}>이름</th>
                                        <th style={{ width: "50%" }}>제목</th>
                                        <th style={{ width: "10%" }}>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boardData.length > 0 ? (
                                        boardData.map((board, index) => (
                                            <tr key={index}>
                                                <td><span>{formatDate(board.createDate) || '날짜 없음'}</span></td>
                                                <td>
                                                {userInfo[board.userCode] ? (
                                                    <span>{userInfo[board.userCode].memid}</span>
                                                ) : (
                                                    <span>불러오는 중...</span>
                                                )}
                                                </td>
                                                <td>
                                                {userInfo[board.userCode] ? (
                                                    <span>{userInfo[board.userCode].memname}</span>
                                                ) : (
                                                    <span>불러오는 중...</span>
                                                )}
                                                </td>
                                                <td><Link to={`/Write_inquiry_reply/${board.id}`}>{board.title || '제목 없음'}</Link></td>
                                                <td><span>{board.state ? '완료' : '대기'}</span></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">문의 내역이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                
            </div>
        </div>

    );
};


export default Mg_Inquiry;
