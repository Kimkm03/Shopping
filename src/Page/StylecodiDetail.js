import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './StylecodiDetail.css';
// 여기부터
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faOutlineHeart } from '@fortawesome/free-regular-svg-icons';
// 11/30 코드 추가 내용


function StylecodiDetail() {
    const { styleId } = useParams();
    const [memname, setMemName] = useState(null);
    const [memnum, setMemNum] = useState(null);
    //const memname = sessionStorage.getItem("memname");
    const [stylecodi, setStylecodi] = useState(null);  // 스타일 코드 정보
    const [upperProduct, setUpperProduct] = useState(null);  // 상의 상품 정보
    const [lowerProduct, setLowerProduct] = useState(null);  // 하의 상품 정보

    //여기부터
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = async () => {
        const newState = !isClicked; // 이전 상태에 상관없이 하트 상태를 반전시킴
    
        // 하트 상태 업데이트
        setIsClicked(newState);
    
        const wishlist = {
            styleCode: styleId, // 관심 목록에 추가/제거할 스타일 코드
            memberCode: memnum
        };
    
        if (newState) {
            // 하트가 빨간색으로 바뀔 때 -> 관심 목록에 추가
            try {
                const response = await axios.post('http://localhost:8000/shopping/api/wishlist/save', wishlist);
                if (response.data.status === 200) {
                    alert('관심 목록에 추가되었습니다.'); // 추가 완료 알림
                }
            } catch (error) {
                console.error('관심 목록 추가 중 오류 발생:', error);
                alert('관심 목록 추가 중 오류 발생');
            }
        } else {
            // 하트가 회색으로 바뀔 때 -> 관심 목록에서 제거
            if (styleId) {
                try {
                    const response = await axios.post(`http://localhost:8000/shopping/api/wishlist/deleteStyle/${styleId}`);
                    if (response.data.status === 200) {
                        alert('관심 목록에서 제거되었습니다.'); // 제거 완료 알림
                        // 페이지를 새로고침
                        // window.location.href = `/stylecodidetail/${styleId}`;
                    }
                } catch (error) {
                    console.error('관심 목록 제거 중 오류 발생:', error);
                    alert('관심 목록 제거 중 오류 발생');
                }
            }
        }
    };
    
    // 여기까지 11/30 코드 추가 내용

    // 관심 목록에 해당 상품이 이미 있는지 확인하는 함수
    const checkIfExists = async (styleCode, memberCode) => {
        try {
            const response = await axios.post(`http://localhost:8000/shopping/api/wishlist/check/${styleCode}/${memberCode}`);
            return response.data;
        } catch (error) {
            console.error('관심 목록 상태 확인 중 오류 발생:', error);
            return false;
        }
    };

    useEffect(() => {
        // 초기 렌더링 시, 관심 목록에 해당 상품이 있는지 확인
        if (styleId && memnum) {
            const checkWishlistStatus = async () => {
                const exists = await checkIfExists(styleId, memnum);
                setIsClicked(exists); // 존재하면 하트를 활성화 상태로 설정
            }
            checkWishlistStatus();
        };

    }, [styleId, memnum]); // 스타일 코드와 회원 코드가 변경될 때마다 확인

    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 스타일 코드 정보 가져오기 (예시로 ID 123을 사용)
                const stylecodiResponse = await axios.get(`http://localhost:8000/shopping/api/style/${styleId}`);
                setStylecodi(stylecodiResponse.data);  // 스타일 코드 정보 저장

                // 상의 상품 정보 가져오기
                const upperProductResponse = await axios.get(`http://localhost:8000/shopping/api/products/${stylecodiResponse.data.upperpnum}`);
                setUpperProduct(upperProductResponse.data);  // 상의 상품 정보 저장

                // 하의 상품 정보 가져오기
                const lowerProductResponse = await axios.get(`http://localhost:8000/shopping/api/products/${stylecodiResponse.data.lowerpnum}`);
                setLowerProduct(lowerProductResponse.data);  // 하의 상품 정보 저장

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [styleId]);  // 컴포넌트가 처음 렌더링될 때만 실행

    useEffect(() => {
        const fetchMemberData = async () => {
            if (stylecodi) {
                try {
                    const memberResponse = await axios.get(`http://localhost:8000/shopping/api/memberInfo/${stylecodi.memnum}`);
                    setMemName(memberResponse.data.memname);
                    setMemNum(memberResponse.data.memnum);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        fetchMemberData();
    }, [stylecodi]);

    return (
        <div>
            <Header />
            <div className="codidetailwrap">
                <div className="codidetailcontents">
                    <div className="product_detail">
                        <div className="detail_area">
                            <div className="profile">
                                {/* <div><img src={stylecodi.profilePicture} alt="Profile" /></div> */}
                                <div className="profile_text">
                                    {memname && (
                                        <span>{memname}</span>
                                    )}
                                    <div className="summary">
                                        {stylecodi && stylecodi.height && (
                                            <span>{stylecodi.height}cm</span>
                                        )}
                                        <b> / </b>
                                        {stylecodi && stylecodi.weight && (
                                            <span>{stylecodi.weight}kg</span>
                                        )}
                                    </div>
                                </div>
                                <div className="styleheartcheck" onClick={handleClick} >{/* 관심 표시 기능 추가 */}
                                    <FontAwesomeIcon icon={isClicked ? faSolidHeart : faOutlineHeart} />
                                    {/*클릭 상태에 따라 아이콘 변경*/}
                                </div>
                            </div>
                            <div className="img_area">
                                <div className="leftimg">
                                    <a>
                                        {stylecodi && stylecodi.id && (
                                            <img src={`http://localhost:8000/shopping/api/style/${stylecodi.id}/picture`} alt="Main Style" />
                                        )}
                                    </a>
                                </div>
                                <div className="rightimg">
                                    <div className="relation">
                                        <div className="wear_product">
                                            <h2 className="wear_product_title">착용 상품</h2>

                                            {/* 상의 상품 */}
                                            <h3>상의</h3>
                                            {upperProduct ? (
                                                <ul className="wear_product_list">
                                                    <li>
                                                        <span>착용 사이즈</span>
                                                        <div className="codidetailthumbnail">
                                                            <a href={`/product/${upperProduct.pnum}`}>
                                                                <img src={`http://localhost:8000/shopping/api/products/${upperProduct.pnum}/picture`} alt={upperProduct.name} />
                                                            </a>
                                                        </div>
                                                        <div className="description">
                                                            <div className="name">
                                                                <span>{upperProduct.pname}</span>
                                                            </div>
                                                            <div className="price">
                                                                <span>KRW {upperProduct.price}</span>
                                                            </div>
                                                            <div className="modeloption">
                                                                착용정보 : <span>{stylecodi.uppersize}</span> / <span>{stylecodi.uppercolor}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ) : (
                                                <div>Loading upper product...</div>
                                            )}

                                            {/* 하의 상품 */}
                                            <h3>하의</h3>
                                            {lowerProduct ? (
                                                <ul className="wear_product_list">
                                                    <li>
                                                        <span>착용 사이즈</span>
                                                        <div className="codidetailthumbnail">
                                                            <a href={`/product/${lowerProduct.pnum}`}>
                                                                <img src={`http://localhost:8000/shopping/api/products/${lowerProduct.pnum}/picture`} alt={lowerProduct.name} />
                                                            </a>
                                                        </div>
                                                        <div className="description">
                                                            <div className="name">
                                                                <span>{lowerProduct.pname}</span>
                                                            </div>
                                                            <div className="price">
                                                                <span>KRW {lowerProduct.price}</span>
                                                            </div>
                                                            <div className="modeloption">
                                                                착용정보 : <span>{stylecodi.lowersize}</span> / <span>{stylecodi.lowercolor}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ) : (
                                                <div>Loading lower product...</div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StylecodiDetail;