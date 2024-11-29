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

function Board_review() {
    const [memberData, setMemberData] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [productData, setProductData] = useState(null);
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
        const fetchReviewData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/review/member/${memberData.memnum}`);
                setReviewData(response.data);
            } catch (error) {
                console.error('Failed to fetch review data:', error);
                // 네트워크 오류 등으로 요청이 실패할 경우 적절히 처리
                alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
            }
        }

        if (memberData) {
            fetchReviewData();
        }
    }, [memberData]);

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

        if (reviewData && reviewData.length > 0) {
            fetchProductData();
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
            <div className='sidebar'>
            <ul className='sidebar_ul'>
                <li ><Link to='/Delivery_check'><FontAwesomeIcon icon={faTruckFast} /> 배송조회</Link></li>
                <li><Link to='/order'><FontAwesomeIcon icon={faCartShopping} /> 주문 조회</Link></li>
                <li ><Link to='/Wishlist'><FontAwesomeIcon icon={faHeart} /> 관심 상품</Link></li>
                <li><Link to='/Board_main'><FontAwesomeIcon icon={faPenToSquare} /> 게시글 관리</Link></li>
                <li className='mg40_left '><Link to='/Board_main'><FontAwesomeIcon icon={faMinus} /> 문의</Link></li>
                <li className='mg40_left sidebar_select'><Link to='/Board_review'><FontAwesomeIcon icon={faMinus} /> 리뷰</Link></li>
                <li className='mg40_left'><Link to='/Board_style'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
            </ul>
            </div>{/* 사이드 바 끝 */}
            <div className='boardmain_section'>
                
                <div className="board_detail">
                    <div className="board_title">
                        <h2>리뷰 내역</h2>
                    </div>
                    <Link to="/order" className='inquiry_btn'>+리뷰 작성</Link>
                    <br /><br />
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
                                    {/* <th className="wid100">회원명</th> */}
                                    <th className="wid100">등록일</th>
                                    <th className="wid50">이미지</th>
                                    <th className="wid50">기타</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviewData && reviewData.length > 0 && productData && productData.length ? (
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
                                            {/* <td>{review.memberName}</td> */}
                                            <td>{formatDate(review.createDate)}</td>
                                            <td>{review.picture ? "유" : "무"}</td>
                                            <td><button className="board_delbtn">삭제</button></td>
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
};
export default Board_review;