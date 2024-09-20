import React from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Board_main.css';

function Board_main(){
    return (
        <div>
            <Header />
            <section className="board_main_section">
            <h2>게시글 관리</h2>
            <table className="board_main_table">
                <thead>
                    <tr className="board_main_table_title">
                        <th className="board_day">작성일</th>
                        <th className="board_value">분류</th>
                        <th className="board_title">제목</th>
                        <th className="board_name">작성자</th>
                        <th className="board_check">조회</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="board_main_table_list">
                        <td>2024-05-13</td>
                        <td>스타일</td>
                        <td><a href="">테스트 중...</a></td>
                        <td>관리자</td>
                        <td>99,999</td>
                    </tr>
                    <tr className="board_main_table_list">
                        <td>2024-05-13</td>
                        <td>스타일</td>
                        <td><a href="">테스트 중...</a></td>
                        <td>관리자</td>
                        <td>99,999</td>
                    </tr>
                    <tr className="board_main_table_list">
                        <td>2024-05-13</td>
                        <td>스타일</td>
                        <td><a href="">테스트 중...</a></td>
                        <td>관리자</td>
                        <td>99,999</td>
                    </tr>
                </tbody>
            </table><br/>
            <div>
                <ul className="paging">
                </ul>
            </div>
            <br/><br/><br/>
            <h2>내가 작성한 리뷰</h2><br/><br/><br/>
            <table className="board_review_table">
                <thead>
                    <tr className="board_review_table_title">
                        <th>작성일자</th>
                        <th>상품명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="board_review_table_detail">
                        <td className="board_review_table_day">2024-05-13</td>
                        <td><a href="">테스트 중입니다.</a></td>
                    </tr>
                </tbody>
            </table><br/>
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