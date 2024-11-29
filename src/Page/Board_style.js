import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import './Board_main.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

function Board_style() {
    const [memberData, setMemberData] = useState(null);
    const [styleData, setStyleData] = useState(null);
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
        const fetchStyleData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/style/member/${memberData.memnum}`);
                setStyleData(response.data);
            } catch (error) {
                console.error('Failed to fetch style data:', error);
                // 네트워크 오류 등으로 요청이 실패할 경우 적절히 처리
                alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
            }
        };

        if (memberData) {
            fetchStyleData();
        }

    }, [memberData]);

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // 1월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <Header />
            <div className='sidebar'>
                <ul className='sidebar_ul'>
                    <li ><Link to='/Delivery_check'><FontAwesomeIcon icon={faTruckFast} /> 배송조회</Link></li>
                    <li><Link to='/order'><FontAwesomeIcon icon={faCartShopping} /> 주문 조회</Link></li>
                    <li ><Link to='/Wishlist'><FontAwesomeIcon icon={faHeart} /> 관심 상품</Link></li>
                    <li><Link to='/Board_main'><FontAwesomeIcon icon={faPenToSquare} /> 게시글 관리</Link></li>
                    <li className='mg40_left'><Link to='/Board_main'><FontAwesomeIcon icon={faMinus} /> 문의</Link></li>
                    <li className='mg40_left'><Link to='/Board_review'><FontAwesomeIcon icon={faMinus} /> 리뷰</Link></li>
                    <li className='mg40_left sidebar_select'><Link to='/Board_style'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
                </ul>
            </div>{/* 사이드 바 끝 */}
            <div className='boardmain_section'>

                <div className="board_detail">
                    <div className="board_title">
                        <h2>스타일 내역</h2>
                    </div>
                    <Link to="/StylecodiRegister" className='inquiry_btn'>+스타일 작성</Link>
                    <br /><br />
                    <table className='board_styletable'>
                        <thead className="membertable_title">
                            <tr>
                                <th style={{ width: "10%" }}>일시</th>
                                {/* <th style={{width: "20%"}}>아이디</th> */}
                                <th style={{ width: "50%" }}>스타일코디링크</th>
                                <th style={{ width: "10%" }}>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {styleData && styleData.length > 0 ? (
                                styleData.map((data, index) => (
                                    <tr key={index} className="board_styletable_tb">
                                        <td>{formatDate(data.createDate)}</td>
                                        <td>
                                            <Link to="/StylecodiRegister">링크란</Link>
                                            <Link to="/StylecodiRegister">링크란</Link>
                                        </td>
                                        <td>
                                            <button className="board_delbtn">삭제하기</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>스타일 내역이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Board_style;