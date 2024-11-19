import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import './Board_main.css';

function Board_review(){
    

    return (
        <div>
            <Header />
            <div className='boardmain_section'>
                <div class="board_sidemenu">
                    <ul>
                        <li><Link to="/Board_main" >-문의 내역</Link></li>
                        <li><Link to="/Board_review" className="txtbold">-리뷰 내역</Link></li>
                        <li><Link to="/Board_style">-스타일 내역</Link></li>
                    </ul>
                </div> {/* 사이드 바 끝 */}
                <div className="board_detail">
                    <div className="board_title">
                        <h2>리뷰 내역</h2>
                    </div>
                    <Link to="/order" className='inquiry_btn'>+리뷰 작성</Link>
                        <br/><br/>
                        <div className="">
                            <div className="rev_searchtop">
                                <table className="search_table">
                                    <tbody>
                                        <tr>
                                            <td className="search_tabletitle">상품 분류</td>
                                            <td>
                                                <select name="" id="" className="main2_select">
                                                    <option value="" selected>전체</option>
                                                    <option value="OUTER">OUTER</option>
                                                    <option value="TOP">TOP</option>
                                                    <option value="BOTTOM">BOTTOM</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="search_tabletitle">상품 검색</td>
                                            <td><input type="text" className="search_tableinput" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <table className="reviewmg_table">
                                <thead>
                                    <tr>
                                        <th className="wid10">No</th>
                                        <th className="wid80">분류</th>
                                        <th className="wid200">상품명</th>
                                        <th className="wid80">배송</th>
                                        <th className="wid80">포장</th>
                                        <th className="wid40">별점</th>
                                        <th className="wid100">회원명</th>
                                        <th className="wid100">등록일</th>
                                        <th className="wid50">이미지</th>
                                        <th className="wid50">기타</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span>1</span></td>
                                        <td><span>BOTTOM</span></td>
                                        <td><strong>상품명</strong></td>
                                        <td>빨라요</td>
                                        <td>꼼꼼해요</td>
                                        <td><span>5</span></td>
                                        <td>ㅇㅇㅇ</td>
                                        <td>2024-05-05</td>
                                        <td>유</td>
                                        <td><button className='board_delbtn'>삭제</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </div>
    );
};
export default Board_review;