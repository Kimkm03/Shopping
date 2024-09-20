import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import './Payment.css';

function Payment() {
    const [product, setProduct] = useState(null);
    const [productId, setProductId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartId, setCartId] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [memberData, setMemberData] = useState(null);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [isListeningForPostcode, setIsListeningForPostcode] = useState(false);
    const memid = sessionStorage.getItem("memid");

    useEffect(() => {
        const radioButtons = document.querySelectorAll('input[type="radio"][name="paymethod"]');
        const paymethodCard = document.getElementById('paymethod_card');
        const paymethodCash = document.getElementById('paymethod_cash');
        const paymethodKakao = document.getElementById('paymethod_kakao');
        const segmentSurport = document.querySelector('.segment_surport');
        const cashReceiptSection = document.querySelector('.cash_receipt');
        const yescr = document.getElementById('yescr');
        const nocr = document.getElementById('nocr');
        const cashReceiptForm = document.querySelector('.cash_receipt_form');
        const individualCr = document.getElementById('individual_cr');
        const businessCr = document.getElementById('business_cr');
        const individualCrForm = document.getElementById('individual_cr_form');
        const businessCrForm = document.getElementById('business_cr_form');

        radioButtons.forEach(radio => {
            radio.addEventListener('change', updateLabelColors);
        });

        paymethodCard.addEventListener('change', toggleCashReceiptSection);
        paymethodCash.addEventListener('change', toggleCashReceiptSection);
        paymethodKakao.addEventListener('change', toggleCashReceiptSection);
        yescr.addEventListener('change', toggleCashReceiptForm);
        nocr.addEventListener('change', toggleCashReceiptForm);
        individualCr.addEventListener('change', toggleDivisionForm);
        businessCr.addEventListener('change', toggleDivisionForm);

        updateLabelColors();
        toggleCashReceiptSection();
        toggleDivisionForm();

        function updateLabelColors() {
            radioButtons.forEach(radio => {
                const label = radio.nextElementSibling;
                if (radio.checked) {
                    label.style.color = 'blue';
                } else {
                    label.style.color = 'black';
                }
            });
        }

        function toggleCashReceiptSection() {
            if (paymethodCash.checked) {
                segmentSurport.classList.remove('hidden');
                cashReceiptSection.classList.remove('hidden');
                toggleCashReceiptForm();
            } else {
                segmentSurport.classList.add('hidden');
                cashReceiptSection.classList.add('hidden');
            }
        }

        function toggleCashReceiptForm() {
            if (yescr.checked) {
                cashReceiptForm.classList.remove('hidden');
            } else {
                cashReceiptForm.classList.add('hidden');
            }
        }

        function toggleDivisionForm() {
            if (individualCr.checked) {
                individualCrForm.classList.remove('hidden');
                businessCrForm.classList.add('hidden');
            } else if (businessCr.checked) {
                businessCrForm.classList.remove('hidden');
                individualCrForm.classList.add('hidden');
            }
        }
    }, []);

    // API 호출하여 회원 데이터 가져오기
    const fetchMemberData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
            setMemberData(response.data);
        } catch (error) {
            console.error('Failed to fetch member data:', error);
            alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        if (memid) {
            fetchMemberData();  // 함수가 선언된 후 호출되어야 합니다
        }
    }, [memid]);

    useEffect(() => {
        if (memberData) {
            fetchCartId(memberData.memnum);
        }
    }, [memberData]);

    const handleNewInfoClick = () => {
        setMemberData({
            memname: '',
            postcode: '',
            firstaddress: '',
            secondaddress: '',
            pnumber: '',
            email: ''
        });
    };

    // 회원정보와 일치 클릭 시 데이터 다시 불러오기
    const handleMemberInfoClick = () => {
        fetchMemberData();
    };

    useEffect(() => {
        if (cartId !== null) {
            fetchCartItems(cartId);
        }
    }, [cartId]);

    const fetchCartId = async (memnum) => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/cart/${memnum}/cartid`);
            if (response.data !== -1) {
                setCartId(response.data);
                setCartItemCount(response.data);
            } else {
                console.log('카트가 비어 있습니다.');
            }
        } catch (error) {
            console.error('카트 ID를 가져오는 중 오류 발생:', error);
        }
    };

    const fetchCartItems = async (cartId) => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/cart/item/${cartId}/items`);
            setCartItems(response.data);
            setPrice(response.data.price);
            calculateTotalPrice(response.data);
            if (response.data.length > 0) {
                const firstItemProductId = response.data[0].productId;
                setProductId(firstItemProductId);
            }
        } catch (error) {
            console.error('장바구니 데이터를 가져오는 중 오류 발생:', error);
            setCartItems([]); // 오류 발생 시 빈 배열 설정
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        }
    }, [productId]);

    const fetchProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/products/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('상품 정보를 불러오는 중 오류 발생:', error);
        }
    };

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        setTotalPrice(total);
    };

    // 주소 검색 완료 시 호출되는 함수
    const handleAddressComplete = (data) => {
        console.log('Address data received:', data);
        const { address, zonecode } = data;
        setMemberData(prevData => ({
            ...prevData,
            firstaddress: address,
            postcode: zonecode
        }));
        setIsPostcodeOpen(false);  // 주소 검색 창 닫기
    };

    const openPostcodePopup = () => {
        setIsListeningForPostcode(true);
        const popup = window.open(
            '',
            '우편번호 검색',
            'width=600,height=600,scrollbars=yes'
        );

        popup.document.write(`
            <html>
                <head>
                    <title>우편번호 검색</title>
                </head>
                <body>
                    <div id="popup-daum-postcode"></div>
                    <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
                    <script>
                        new daum.Postcode({
                            oncomplete: function(data) {
                                window.opener.postMessage(data, "*");
                                window.close();
                            }
                        }).embed(document.getElementById('popup-daum-postcode'));
                    </script>
                </body>
            </html>
        `);
    };

    // 메시지 이벤트 리스너 설정
    useEffect(() => {
        if (isListeningForPostcode) {
            const handlePostMessage = (event) => {
                if (event.origin !== window.location.origin) return; // 보안 체크

                const { address, zonecode } = event.data;
                setMemberData(prevData => ({
                    ...prevData,
                    firstaddress: address,
                    postcode: zonecode
                }));
                setIsPostcodeOpen(false); // 주소 검색 창 닫기
            };

            window.addEventListener('message', handlePostMessage);

            return () => {
                window.removeEventListener('message', handlePostMessage);
            };
        }
    }, [isListeningForPostcode]);

    return (
        <div>
            <header id="paymentheader" className="paymentheader">
                <div className="top">
                    <h1>스토어</h1>
                    <div className="menu_left">

                    </div>
                    <div className="menu_right">
                        <span className="right_left">
                            <Link to="/basket"><img src="https://i.postimg.cc/DfPRbdWt/bag-icon.png" alt="Basket" /></Link>
                            <span className="basket_count">
                                <span>{cartItemCount}</span> {/* 상품 수량 상태 변수 출력 */}
                            </span>
                        </span>
                        <Link to="/mypage"><img src='https://i.postimg.cc/cJtVKpYm/my-icon.png' alt='mypage' /></Link>
                    </div>
                </div>
                <div className="paymenttitle">
                    <h1>주문/결제</h1>
                </div>
            </header>{/* 결제 창 헤더 끝  */}
            <form action="">
                <div className="payment_main">
                    <div className="nextline_1"></div>
                    <div className="payment_detail">
                        <div className="detail_section">
                            <div className="detail_title">
                                <h2>상품 수령</h2>
                                ::after
                            </div>
                            <div className="detail_context">
                                <div className="segment">
                                    <span className="deliver_kind">
                                        <input type="radio" className="overlap1" name="commonbliver" checked />
                                        <label for="commonbliver" className="overlap2">일반 배송</label>
                                    </span>
                                    <ul className="deliver_kind_detail">
                                        <li>배송비 : KRW 0</li>
                                        <li>배송 소요 기간 : 3일 ~ 7일 이내</li>
                                        <li>*배송비 무료*</li>
                                    </ul>
                                </div>
                            </div>
                        </div>{/*  상품 수령 끝 */}
                        <div className="detail_section">
                            <div className="detail_title">
                                <h2>배송지</h2>
                                ::after
                            </div>
                            <div className="detail_context">
                                <div>
                                    <div>
                                        <ul className="context_ul_1">
                                            <li>
                                                <p style={{ paddingLeft: '30px' }}> 배송지 입력 </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="choice_div">
                                        <input
                                            type="radio"
                                            id="memder_imfo"
                                            className="overlap1"
                                            name="deliver_form"
                                            onClick={handleMemberInfoClick}  // 회원 정보와 일치 클릭 시 다시 데이터 불러오기
                                            defaultChecked
                                        />
                                        <label htmlFor="memder_imfo" className="overlap2">회원 정보와 일치</label>
                                        <input
                                            type="radio"
                                            id="new_imfo"
                                            className="overlap1"
                                            name="deliver_form"
                                            onClick={handleNewInfoClick}  // 신규 입력 클릭 시 초기화
                                        />
                                        <label htmlFor="new_imfo" className="overlap2">신규 입력</label>
                                    </div>
                                    <div className="context_table_1">
                                        <table className="paymenttable table_imfo">
                                            <tbody>
                                                <tr>
                                                    <th>받는 사람</th>
                                                    <td><input type="text" className="overlap3" value={memberData?.memname || ''} /></td>
                                                </tr>
                                                <tr>
                                                    <th>주소</th>
                                                    <td>
                                                        <ul>
                                                            <li className="dif_li">
                                                                <input
                                                                    id="postcode"
                                                                    className="ad_input overlap3"
                                                                    type="text"
                                                                    placeholder="우편번호"
                                                                    readOnly
                                                                    value={memberData?.postcode || ''}
                                                                />
                                                                <button id="ad_btn" className="ad_btn overlap5" type='button' onClick={openPostcodePopup}>주소검색</button>
                                                                {isPostcodeOpen && (
                                                                    <div>
                                                                        <DaumPostcode
                                                                            onComplete={handleAddressComplete}
                                                                            style={{ width: '100%', height: '400px' }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </li>
                                                            <li>
                                                                <input
                                                                    id="address"
                                                                    className="ad_input_2 overlap3"
                                                                    type="text"
                                                                    placeholder="기본 주소"
                                                                    readOnly
                                                                    value={memberData?.firstaddress || ''}
                                                                />
                                                            </li>
                                                            <li>
                                                                <input
                                                                    id="detailaddress"
                                                                    className="ad_input_2 overlap3"
                                                                    type="text"
                                                                    placeholder="나머지 주소"
                                                                    value={memberData?.secondaddress || ''}
                                                                />
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>휴대전화</th>
                                                    <td>
                                                        <div className="call_div">
                                                            <select name="" id="" className="overlap4">
                                                                <option value="010">010</option>
                                                                <option value="011">011</option>
                                                                <option value="016">016</option>
                                                                <option value="017">017</option>
                                                                <option value="018">018</option>
                                                                <option value="019">019</option>
                                                            </select>
                                                            -
                                                            <input
                                                                type="text"
                                                                className="overlap3"
                                                                value={memberData?.pnumber?.split('-')[1] || ''}
                                                            />
                                                            -
                                                            <input
                                                                type="text"
                                                                className="overlap3"
                                                                value={memberData?.pnumber?.split('-')[2] || ''}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>이메일</th>
                                                    <td>
                                                        <div className="mail_div">
                                                            <input
                                                                type="text"
                                                                className="overlap3"
                                                                value={memberData?.email?.split('@')[0] || ''}
                                                            /> @
                                                            <select name="" id="" className="overlap4">
                                                                <option value="naver.com">naver.com</option>
                                                                <option value="daum.net">daum.net</option>
                                                                <option value="nate.com">nate.com</option>
                                                                <option value="gmail.com">gmail.com</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>{/**<!--배송지 끝 --> */}
                        <div className="detail_section">
                            <div className="detail_title">
                                <h2>주문 상품</h2>
                                ::after
                            </div>
                            <div className="detail_context">
                                <div className="orderarea">
                                    <div className="orderarea_div">
                                        <div className="orderlist">
                                            <div className="orderbox">
                                                <div className="orderbox_img">
                                                    {product && (
                                                        <img
                                                            src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`}
                                                            alt={product.pname}
                                                        />
                                                    )}
                                                </div>
                                                <div className="orderbox_detail">
                                                    <strong>
                                                        <a href="">상품명</a>
                                                    </strong>
                                                    <ul>
                                                        <li>
                                                            {cartItems[0] && (
                                                                <p className="option">[Color: {cartItems[0].color}]<br />[Size: {cartItems[0].size}]</p>
                                                            )}
                                                        </li>
                                                        {cartItems[0] && (
                                                            <li>수량: {cartItems[0].count}</li>
                                                        )}
                                                    </ul>
                                                    <div>
                                                        {cartItems[0] && (
                                                            <span>KRW {cartItems[0].price}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button>X</button>
                                            </div>
                                        </div>{/**<!-- 상품 반복 구간--> */}

                                    </div>
                                    <div className="deliver_price">
                                        <div className="del_price detail_title">
                                            <h3>배송비</h3>
                                            <span>KRW 0(무료)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> {/**<!-- 상품리스트 끝 --> */}
                        <div className="detail_section">
                            <div className="detail_title">
                                <h2>적립금 사용</h2>
                                ::after
                            </div>
                            <div className="detail_context">
                                <div className="mileage_area" >
                                    <div className="mileage_box">
                                        <strong>적립금</strong>
                                        <div className="control">
                                            <input type="text" className="overlap3" />
                                            <button className="overlap5">전액 사용</button>
                                        </div>
                                    </div>
                                    <span>
                                        보유
                                        <span>0</span>원
                                    </span>
                                </div>
                                <div className="mileage_price detail_title">
                                    <h3>적용금액</h3>
                                    <div>
                                        -KRW <span>0</span>
                                    </div>
                                </div>
                            </div>
                        </div> {/**<!-- 마일리지 끝 --> */}
                        <div className="detail_section">
                            <div className="detail_title">
                                <h2>결제 정보</h2>
                                ::after
                            </div>
                            <div className="detail_context">
                                <div className="segment">
                                    <div>
                                        <table className="paymenttable paycount_table">
                                            <tbody>
                                                <tr>
                                                    <th>주문 상품</th>
                                                    <td>
                                                        <span>KRW <span>{price}</span></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>배송비</th>
                                                    <td><span>+KRW 0</span></td>
                                                </tr>
                                                <tr>
                                                    <th>적립금</th>
                                                    <td className="red">
                                                        <span>-KRW<span>0</span></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="total_payment detail_title">
                                    <h3>최종 결제 금액</h3>
                                    <strong>KRW <span>{totalPrice}</span></strong>
                                </div>
                            </div>
                        </div>{/** */}
                        <div className="detail_section">
                            <div className="detail_title">
                                <h2>결제 수단</h2>
                                ::after
                            </div>
                            <div className="detail_context">
                                <div className="segment">
                                    <ul className="paymethod">
                                        <li>
                                            <label for="">결제수단 선택</label>
                                            <div className="inner">
                                                <span className="paymethod_choice">
                                                    <input type="radio" id="paymethod_card" name="paymethod" value="card" checked="checked" autocomplete="off" />
                                                    <label for="paymethod_card" className="overlap2">카드 결제</label>
                                                </span>
                                                <span className="paymethod_choice">
                                                    <input type="radio" id="paymethod_cash" name="paymethod" value="cash" autocomplete="off" />
                                                    <label for="paymethod_cash" className="overlap2">무통장 입금</label>
                                                </span>
                                                <span className="paymethod_choice">
                                                    <input type="radio" id="paymethod_kakao" name="paymethod" value="kakao" autocomplete="off" />
                                                    <label for="paymethod_kakao" className="overlap2">카카오페이</label>
                                                </span>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="segment_surport hidden">
                                    <div className="segment_surport_2">
                                        <table className='paymenttable'>
                                            <tbody>
                                                <tr>
                                                    <th>입금은행 *</th>
                                                    <td>
                                                        <select name="" id="" className="choice_select overlap3">
                                                            <option value="">::선택해주세요::</option>
                                                            <option value="">신한 110-258-839777  (예금주 : 강민태)</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>입금자명 *</th>
                                                    <td>
                                                        <input type="text" className="choice_input overlap3" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="cash_receipt hidden">
                                    <div className="receiptarea">
                                        <div className="receipt_title"><h3>현금영수증</h3></div>
                                        <input type="radio" name="cash_receipt" id="yescr" />
                                        <label for="yescr">신청</label>
                                        <input type="radio" name="cash_receipt" id="nocr" checked />
                                        <label for="nocr">신청안함</label>
                                        <div className="cash_receipt_form hidden">
                                            <div className="cash_receipt_formarea">
                                                <div className="cash_receipt_form_area">
                                                    <input type="radio" className="overlap3" name="division_cr" id="individual_cr" checked />
                                                    <label for="individual_cr" className="overlap2">개인</label>
                                                    <input type="radio" className="overlap3" name="division_cr" id="business_cr" />
                                                    <label for="business_cr" className="overlap2">사업자</label>
                                                    <div className="inputarea" id="individual_cr_form">
                                                        <select name="" id="" className="overlap3 receinput">
                                                            <option value="010">010</option>
                                                            <option value="011">011</option>
                                                            <option value="016">016</option>
                                                            <option value="017">017</option>
                                                            <option value="018">018</option>
                                                            <option value="019">019</option>
                                                        </select> -
                                                        <input type="text" className="overlap3 receinput" /> - <input type="text" className="overlap3 receinput" />
                                                    </div>
                                                    <div className="inputarea hidden" id="business_cr_form" >
                                                        <input type="text" placeholder="사업자번호" className='receinput' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>{/**<!----> */}
                            </div>
                        </div>{/**<!-- 결제 수단 끝 --> */}
                        <div className="detail_section">
                            <div className="detail_title">
                                <h2>적립 내역</h2>
                                ::after
                            </div>
                            <div className="detail_context">
                                <div className="segment">
                                    <div className="give_mileage">
                                        <table className='paymenttable'>
                                            <tbody>
                                                <tr>
                                                    <th>상품별 적립금</th>
                                                    <td>
                                                        <span>0 원</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>회원 적립금</th>
                                                    <td>
                                                        <span>0 원</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="total_payment detail_title">
                                    <h3>적립 예정 금액</h3>
                                    <strong><span>0 원</span></strong>
                                </div>
                            </div>
                        </div>{/* 적립 내역 끝*/}
                        <div className="finish_order_btn">
                            <div className="finish_order_btn_div"></div>
                            <button className="orderbtn_submit overlap5">
                                <span>KRW {totalPrice}원 결제하기</span>
                            </button>
                        </div>{/**<!-- 이용 약관 및 동의 끝--> */}
                        <div className="helparea">
                            <ul className="helparea_ul">
                                <li>
                                    무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에 구매할 경우 전체 주문 상품 금액에 대해 무이자할부가 적용되지 않습니다. 무이자할부를 원하시는 경우 장바구니에서 무이자할부 상품만 선택하여 주문하여 주시기 바랍니다.
                                </li>
                                <li>
                                    최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.
                                </li>
                            </ul>
                        </div> {/**<!-- 마지막 문구 끝 --> */}
                    </div>
                    <div>

                    </div>
                </div>
            </form>

        </div>
    );
};

export default Payment;