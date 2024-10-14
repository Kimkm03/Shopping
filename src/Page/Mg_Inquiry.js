import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Member.css';


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
                            <br />
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
        </div>

    );
};


export default Mg_Inquiry;
