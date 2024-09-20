import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Review.css';

function Mg_Review() {
    return(
        <div>
            <Header />
                <div className="mgmain_section">
        
        <div class="sidemenu">
            <ul>
                <li><Link to="/Mg_Member">-회원관리</Link></li>
                <li><Link to="/Mg_Orderlist">-주문 관리</Link></li>
                <li><Link to="/Mg_Product">-상품 관리</Link></li>
                <li><Link to="/Mg_Review" className="txtbold">-리뷰 관리</Link></li>
                <li><Link to="/Mg_Total">-통계</Link></li>
            </ul>
        </div> {/* 사이드 바 끝 */}
        <div className="mgmain_detail">
            <div className="mgmain_title">
                <h2>리뷰 관리</h2>
            </div>
            <div>
                <table className="total_review">
                    <tbody> 
                        <tr>
                            <td>누적 리뷰</td>
                            <td><span>1</span>건</td>
                        </tr>
                        <tr>
                            <td>월간 리뷰</td>
                            <td><span>1</span>건</td>
                        </tr>
                        <tr>
                            <td>주간 리뷰</td>
                            <td><span>1</span>건</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="pr200">
            <div className="middle_main2">
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
                        <td><button>삭제</button></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>


        </div>
    );
}

export default Mg_Review;