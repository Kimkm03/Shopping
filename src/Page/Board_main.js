import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import './Board_main.css';

function Board_main(){
    const [memberData, setMemberData] = useState(null);
    const [boardData, setBoardData] = useState(null);
    const memid = sessionStorage.getItem("memid"); // memId가 sessionStorage에 제대로 저장되어 있는지 확인

    // 회원 데이터 가져오기
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
                setMemberData(response.data);
            } catch (error) {
                console.error('Failed to fetch member data:', error);
                // 네트워크 오류 등으로 요청이 실패할 경우 적절히 처리
                alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
            }
        };

        if (memid) {
            fetchMemberData();
        }
    }, [memid]);

    useEffect(() => {
        const fetchBoardData = async () => {
            if (memberData && memberData.memnum) {
                try {
                    const boardResponse = await axios.get(`http://localhost:8000/shopping/api/board/detail/${memberData.memnum}`);
                    const fetchedBoardData = boardResponse.data;
                    setBoardData(fetchedBoardData);
                } catch (error) {
                    console.error('Failed to fetch order data:', error);
                    alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
                }
            }
        };

        fetchBoardData();
    }, [memberData]);

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        return date.toLocaleString('ko-KR', options);
    };

    return (
        <div>
            <Header />
            <div className='boardmain_section'>
                <div class="board_sidemenu">
                    <ul>
                        <li><Link to="/Board_main" className="txtbold">-문의 내역</Link></li>
                        <li><Link to="/Board_review">-리뷰 내역</Link></li>
                        <li><Link to="/Board_style">-스타일 내역</Link></li>
                    </ul>
                </div> {/* 사이드 바 끝 */}
                <div className="board_detail">
                    <div className="board_title">
                        <h2>문의 내역</h2>
                    </div>
                    <Link to="/Write_inquiry" className='inquiry_btn'>+문의하기</Link>
                        <br/><br/>
                        <table id="membertable" className="membertable">
                            <thead className="membertable_title">
                                <tr>
                                    <th style={{width: "10%"}}>일시</th>
                                    <th style={{width: "20%"}}>아이디</th>
                                    <th style={{width: "10%"}}>이름</th>
                                    <th style={{width: "50%"}}>제목</th>
                                    <th style={{width: "10%"}}>검토</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(boardData) && boardData.length > 0 ? ( // 배열인지 체크
                                    boardData.map((board, index) => (
                                        <tr key={index}>
                                            <td><span>{formatDate(board.createDate) || '날짜 없음'}</span></td>
                                            <td><span>{memid || '아이디 없음'}</span></td>
                                            <td><span>{memberData ? memberData.memname : '이름 없음'}</span></td>
                                            <td><Link to={`/Write_inquiry_detail/${board.id}`}>{board.title || '제목 없음'}</Link></td>
                                            <td><span>{board.state ? '검토' : '미검토'}</span></td>
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
    );
};
export default Board_main;