import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './Mg_Review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faShirt,faScroll,faComment,faPenToSquare,faMinus,faChartSimple } from '@fortawesome/free-solid-svg-icons';

function Mg_Review() {
    const [reviewData, setReviewData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [memberData, setMamberData] = useState(null);

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/shopping/api/review/all');
                setReviewData(response.data);
            } catch (error) {
                console.error('Failed to fetch review data:', error);
                // 네트워크 오류 등으로 요청이 실패할 경우 적절히 처리
                alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
            }
        }

        fetchReviewData();
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productDataResponses = await Promise.all(
                    reviewData.map(item =>
                        axios.get(`http://localhost:8000/shopping/api/products/${item.productCode}`)
                    )
                );
                setProductData(productDataResponses.map(response => response.data));
            } catch (error) {
                console.error('Failed to fetch product data:', error);
            }
        };

        const fetchMemberData = async () => {
            try {
                const memberDataResponses = await Promise.all(
                    reviewData.map(item =>
                        axios.get(`http://localhost:8000/shopping/api/memberInfo/${item.memnum}`)
                    )
                );
                setMamberData(memberDataResponses.map(response => response.data));
            } catch (error) {
                console.error('Failed to fetch member data:', error)
            }
        }

        if (reviewData && reviewData.length > 0) {
            fetchProductData();
            fetchMemberData();
        }
    }, [reviewData]);

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear(); // 연도 추출
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 1을 더하고, 2자리로 포맷팅)
        const day = date.getDate().toString().padStart(2, '0'); // 일, 2자리로 포맷팅

        return `${year}${month}${day}`; // 형식: YYYYMMDD
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
                        <li><Link to="/Mg_Inquiry"><FontAwesomeIcon icon={faComment} />고객 문의</Link></li>
                        <li><Link to="/Mg_Review"><FontAwesomeIcon icon={faPenToSquare} />게시글 관리</Link></li>
                        <li><Link to="/Mg_Review" className='suvsidemenu txtbold'><FontAwesomeIcon icon={faMinus} />리뷰</Link></li>
                        {/* <li><Link to="/Mg_Total"><FontAwesomeIcon icon={faChartSimple} />통계</Link></li> */}
                    </ul>
                </div>{/* 사이드 바 끝 */}
                <div className="mgmain_detail">
                    <div className="mgmain_title">
                        <h2>리뷰 관리</h2>
                    </div>
                    <div>
                        {/* <table className="total_review">
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
                        </table> */}
                    </div>
                    <div className="">
                        {/* <div className="middle_main2">
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
                        </div> */}
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
                                    {/* <th className="wid50">기타</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {reviewData && reviewData.length > 0 && productData && productData.length > 0 && memberData ? (
                                    reviewData.map((review, index) => (
                                        <tr key={index}>
                                            <td><span>{index + 1}</span></td>
                                            <td>
                                                <span>
                                                    {productData[index]?.categorynum === 1
                                                        ? 'OUTER'
                                                        : productData[index]?.categorynum === 2
                                                            ? 'TOP'
                                                            : productData[index]?.categorynum === 3
                                                                ? 'BOTTOM'
                                                                : 'Unknown'}
                                                </span>
                                            </td>
                                            <td><strong>{productData[index]?.pname}</strong></td>
                                            <td>{review.delveryreply === 'fast' ? '빨라요' : review.delveryreply === 'bad' ? '아쉬워요' : review.delveryreply}</td>
                                            <td>{review.takeoutreply === 'careful' ? '꼼꼼해요' : review.takeoutreply === 'bad' ? '아쉬워요' : review.takeoutreply}</td>
                                            <td><span>{review.starcnt}</span></td>
                                            <td>{memberData[index].memname}</td>
                                            <td>{formatDate(review.createDate)}</td>
                                            <td>{review.picture ? "유" : "무"}</td>
                                            {/* <td><button className="board_delbtn">삭제</button></td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" style={{ textAlign: "center" }}>리뷰가 없습니다</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Mg_Review;