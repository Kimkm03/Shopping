import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Board_main.css';

function Board_main(){
    return (
        <div>
            <Header />
            <section className="board_main_section">
            
            
            <h2>작성한 리뷰</h2><br/><br/>
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
                        <td><button className='reviewremovebtn'>삭제</button></td>
                    </tr>
                </tbody>
            </table>
            <br/><br/><br/>
            <h2>문의 내역</h2><br/>
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
                    <tr>
                        <td><span>2024-05-21</span></td>
                        <td><span>a1234</span></td>
                        <td><span>강민태</span></td>
                        <td><Link to="/Write_inquiry_detail">배송관련문의입니다</Link></td>
                        <td><span>미완료</span></td>
                    </tr>
                    <tr>
                        <td><span>2024-05-21</span></td>
                        <td><span>a1234</span></td>
                        <td><span>강민태</span></td>
                        <td><Link to="/Write_inquiry_detail">배송언제되나요</Link></td>
                        <td><span>완료</span></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            
            <br/>
            <div>
                <ul className="paging">
                </ul>
            </div>
        </section>
            <Footer />
        </div>
    );
};
export default Board_main;