import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import './Board_main.css';

function Board_style(){
    

    return (
        <div>
            <Header />
            <div className='boardmain_section'>
                <div class="board_sidemenu">
                    <ul>
                        <li><Link to="/Board_main" >-문의 내역</Link></li>
                        <li><Link to="/Board_review" >-리뷰 내역</Link></li>
                        <li><Link to="/Board_style" className="txtbold">-스타일 내역</Link></li>
                    </ul>
                </div> {/* 사이드 바 끝 */}
                <div className="board_detail">
                    <div className="board_title">
                        <h2>스타일 내역</h2>
                    </div>
                    <Link to="/StylecodiRegister" className='inquiry_btn'>+스타일 작성</Link>
                    <br/><br/>
                    <table className='board_styletable'>
                        <thead className="membertable_title">
                            <tr>
                                <th style={{width: "10%"}}>일시</th>
                                <th style={{width: "20%"}}>아이디</th>
                                <th style={{width: "50%"}}>스타일코디링크</th>
                                <th style={{width: "10%"}}>-</th>
                            </tr>
                        </thead>
                        <tbody>
                           <tr className='board_styletable_tb'>
                                <td>
                                    2024-11-11
                                </td>
                                <td>
                                    아이디
                                </td>
                                <td>
                                    <Link to="/StylecodiRegister" > 링크란</Link>
                                    <Link to="/StylecodiRegister" > 링크란</Link>
                                </td>
                                <td>
                                    <button className='board_delbtn'>삭제하기</button>
                                </td>
                           </tr>
                        </tbody>
                    </table>
                        

                </div>
            </div>
        </div>
    );
};
export default Board_style;