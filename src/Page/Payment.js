import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import PricingApiButton from '../Components/PricingApiButton';
import './Payment.css';

function Payment() {
    const [product, setProduct] = useState(null);
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState(sessionStorage.getItem('productName'));
    const [cartItems, setCartItems] = useState([]);
    // const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartId, setCartId] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [memberData, setMemberData] = useState(null);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [isListeningForPostcode, setIsListeningForPostcode] = useState(false);
    const [orderRequest, setOrderRequest] = useState(null);
    const [deliveryData, setDeliveryData] = useState({
        receiverName: "",
        postcode: "",
        receiverPhone: "",
        receiverEmail: "",
        firstaddress: "",
        secondaddress: "",
        shippingAddress: ""
    });
    const [deliveryMessage, setDeliveryMessage] = useState('문 앞에 놔주세요');  // 기본값 설정
    const memid = sessionStorage.getItem("memid");
    const storeId = 'store-cc5c0f67-cf0f-45b3-bc8e-5b2b46921971';
    const channelKey = 'channel-key-d6f10cc6-a4e1-42bb-bf9d-15c432ea39a3';
    const location = useLocation();
    const selectedCartIds = location.state?.selectedCartIds || [];

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

        // radioButtons.forEach(radio => {
        //     radio.addEventListener('change', updateLabelColors);
        // });

        // paymethodCard.addEventListener('change', toggleCashReceiptSection);
        // paymethodCash.addEventListener('change', toggleCashReceiptSection);
        // paymethodKakao.addEventListener('change', toggleCashReceiptSection);
        // yescr.addEventListener('change', toggleCashReceiptForm);
        // nocr.addEventListener('change', toggleCashReceiptForm);
        // individualCr.addEventListener('change', toggleDivisionForm);
        // businessCr.addEventListener('change', toggleDivisionForm);

        updateLabelColors();
        // toggleCashReceiptSection();
        // toggleDivisionForm();

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

        // function toggleCashReceiptSection() {
        //     if (paymethodCash.checked) {
        //         segmentSurport.classList.remove('hidden');
        //         cashReceiptSection.classList.remove('hidden');
        //         toggleCashReceiptForm();
        //     } else {
        //         segmentSurport.classList.add('hidden');
        //         cashReceiptSection.classList.add('hidden');
        //     }
        // }

        // function toggleCashReceiptForm() {
        //     if (yescr.checked) {
        //         cashReceiptForm.classList.remove('hidden');
        //     } else {
        //         cashReceiptForm.classList.add('hidden');
        //     }
        // }

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

    // 회원 정보를 deliveryData로 설정
    const initializeDeliveryData = (data) => {
        setDeliveryData({
            receiverName: data.memname || "",
            postcode: data.postcode || "",
            receiverPhone: data.pnumber || "",
            receiverEmail: data.email || "",
            firstaddress: data.firstaddress || "",
            secondaddress: data.secondaddress || "",
            shippingAddress: `${data.firstaddress || ""} ${data.secondaddress || ""}` // 주소 합치기
        });
    };

    useEffect(() => {
        fetchCartItemCount()
    });

    useEffect(() => {
        if (memid) {
            fetchMemberData();  // 함수가 선언된 후 호출되어야 합니다
        }
    }, [memid]);

    // 회원 데이터가 업데이트될 때 deliveryData를 설정
    useEffect(() => {
        if (memberData) {
            initializeDeliveryData(memberData); // 회원 정보를 deliveryData에 초기화
        }
    }, [memberData]);

    useEffect(() => {
        if (memberData) {
            fetchCartId(memberData.memnum);

        }
    }, [memberData]);

    // 신규 입력 클릭 시 초기화
    const handleNewInfoClick = () => {
        setDeliveryData({
            receiverName: "",
            postcode: "",
            receiverPhone: "",
            receiverEmail: "",
            firstaddress: "",
            secondaddress: "",
            shippingAddress: ""
        });
    };

    // 회원정보와 일치 클릭 시 데이터 다시 불러오기
    const handleMemberInfoClick = () => {
        if (memberData) {
            setDeliveryData((prevData) => ({
                ...prevData,
                receiverName: memberData.memname || '',
                postcode: memberData.postcode || '',
                receiverPhone: memberData.pnumber || '',
                receiverEmail: memberData.email || '',
                firstaddress: memberData.firstaddress || '',
                secondaddress: memberData.secondaddress || '',
                shippingAddress: `${memberData.firstaddress || ''} ${memberData.secondaddress || ''}` // 주소 합치기
            }));
        }
    };

    // useEffect(() => {
    //     if (cartId !== null) {
    //         fetchCartItems(cartId);
    //     }
    // }, [cartId]);

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

    useEffect(() => {
        const fetchCartItems = async () => {
            if (selectedCartIds.length > 0) {
                try {
                    // 중복된 카트 ID 제거
                    const uniqueCartIds = [...new Set(selectedCartIds)];

                    // 모든 카트 ID의 아이템을 병합하여 가져오기
                    const cartItemsPromises = uniqueCartIds.map(cartId =>
                        axios.get(`http://localhost:8000/shopping/api/cart/item/selectItems/${cartId}`)
                    );

                    // 모든 요청이 완료될 때까지 기다리기
                    const responses = await Promise.all(cartItemsPromises);

                    // 모든 응답에서 데이터를 병합
                    const allCartItems = responses.flatMap(response => response.data);

                    console.log(allCartItems); // 모든 카트 아이템 로그

                    // 기존 카트 아이템과 새로운 아이템 결합
                    setCartItems(allCartItems);

                    calculateTotalPrice(allCartItems); // 총 가격 계산

                    // 첫 번째 제품 ID 설정
                    if (allCartItems.length > 0) {
                        const firstItemProductId = allCartItems[0].productId;
                        setProductId(firstItemProductId);
                    }
                } catch (error) {
                    if (error.response) {
                        console.error(`HTTP 오류 발생 (상태 코드: ${error.response.status}):`, error.response.data);
                    } else if (error.request) {
                        console.error('서버에 요청을 보냈으나 응답이 없었습니다:', error.request);
                    } else {
                        console.error('요청을 설정하는 동안 오류가 발생했습니다:', error.message);
                    }
                    setCartItems([]); // 오류 발생 시 빈 배열 설정
                }
            } else {
                console.log('선택된 장바구니 ID가 없습니다.'); // 카트 ID 없을 경우 로그
            }
        };

        fetchCartItems(); // 호출을 한 번만 수행
    }, [selectedCartIds]); // selectedCartIds가 변경될 때만 실행






    const fetchCartItemCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/cart/${memid}/count`);
            setCartItemCount(response.data); // 서버에서 장바구니에 있는 상품 수량을 가져와 상태 업데이트
        } catch (error) {
            console.error('장바구니 상품 수량 가져오기 실패:', error);
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
            setProductName(response.data.pname)
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
        setDeliveryData(prevData => ({
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
                setDeliveryData(prevData => ({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryData(prevState => ({
            ...prevState,
            [name]: value // 입력된 값으로 업데이트
        }));
    };

    useEffect(() => {
        // memberData와 cartItems가 불러와진 후에 orderRequest 생성
        if (memberData && cartItems.length && totalPrice > 0) {
            setOrderRequest({
                userCode: memberData.memnum,
                productCode: cartItems[0].productId,  // cartItems에서 productId 가져오기
                receiverName: deliveryData.receiverName,
                postcode: deliveryData.postcode,
                receiverPhone: deliveryData.receiverPhone,
                receiverEmail: deliveryData.receiverEmail,
                shippingAddress: deliveryData.firstaddress + deliveryData.secondaddress,
                productSize: cartItems[0].size,  // 첫 번째 상품의 사이즈
                productColor: cartItems[0].color,  // 첫 번째 상품의 색상
                request: deliveryMessage,  // 요청 메시지
                orderPrice: totalPrice, // 예시 가격
                count: cartItems[0].quantity
            });
        }
    }, [memberData, cartItems, deliveryData, deliveryMessage]);  // memberData와 cartItems가 변경될 때마다 실행

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
                        {/* <div className="detail_section">
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
                        </div> 상품 수령 끝 */}
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
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="overlap3"
                                                            name="receiverName"
                                                            value={deliveryData.receiverName}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>주소</th>
                                                    <td>
                                                        <ul>
                                                            <li className="dif_li">
                                                                <input
                                                                    id="postcode"
                                                                    className="ad_input overlap3"
                                                                    name='postcode'
                                                                    type="text"
                                                                    placeholder="우편번호"
                                                                    readOnly
                                                                    value={deliveryData.postcode}
                                                                    onChange={handleChange}
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
                                                                    name='firstaddress'
                                                                    type="text"
                                                                    placeholder="기본 주소"
                                                                    readOnly
                                                                    value={deliveryData.firstaddress}
                                                                    onChange={handleChange}
                                                                />
                                                            </li>
                                                            <li>
                                                                <input
                                                                    id="detailaddress"
                                                                    className="ad_input_2 overlap3"
                                                                    name='secondaddress'
                                                                    type="text"
                                                                    placeholder="나머지 주소"
                                                                    value={deliveryData.secondaddress}
                                                                    onChange={handleChange}
                                                                />
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>휴대전화</th>
                                                    <td>
                                                        <div className="call_div">
                                                            <select
                                                                value={deliveryData.receiverPhone.split('-')[0] || '010'} // 선택된 번호
                                                                onChange={(e) => {
                                                                    const newPhone = `${e.target.value}-${deliveryData.receiverPhone.split('-')[1] || ''}-${deliveryData.receiverPhone.split('-')[2] || ''}`;
                                                                    setDeliveryData({ ...deliveryData, receiverPhone: newPhone });
                                                                }}
                                                                className="overlap4"
                                                            >
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
                                                                value={deliveryData.receiverPhone.split('-')[1] || ''} // 두 번째 부분
                                                                onChange={(e) => {
                                                                    const newPhone = `${deliveryData.receiverPhone.split('-')[0] || '010'}-${e.target.value}-${deliveryData.receiverPhone.split('-')[2] || ''}`;
                                                                    setDeliveryData({ ...deliveryData, receiverPhone: newPhone });
                                                                }}
                                                            />
                                                            -
                                                            <input
                                                                type="text"
                                                                className="overlap3"
                                                                value={deliveryData.receiverPhone.split('-')[2] || ''} // 세 번째 부분
                                                                onChange={(e) => {
                                                                    const newPhone = `${deliveryData.receiverPhone.split('-')[0] || '010'}-${deliveryData.receiverPhone.split('-')[1] || ''}-${e.target.value}`;
                                                                    setDeliveryData({ ...deliveryData, receiverPhone: newPhone });
                                                                }}
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
                                                                value={deliveryData.receiverEmail.split('@')[0] || ''} // 이메일 아이디
                                                                onChange={(e) => {
                                                                    const newEmail = `${e.target.value}@${deliveryData.receiverEmail.split('@')[1] || 'naver.com'}`;
                                                                    setDeliveryData({ ...deliveryData, receiverEmail: newEmail });
                                                                }}
                                                            /> @
                                                            <select
                                                                value={deliveryData.receiverEmail.split('@')[1] || 'naver.com'} // 이메일 도메인
                                                                onChange={(e) => {
                                                                    const newEmail = `${deliveryData.receiverEmail.split('@')[0] || ''}@${e.target.value}`;
                                                                    setDeliveryData({ ...deliveryData, receiverEmail: newEmail });
                                                                }}
                                                                className="overlap4"
                                                            >
                                                                <option value="naver.com">naver.com</option>
                                                                <option value="daum.net">daum.net</option>
                                                                <option value="nate.com">nate.com</option>
                                                                <option value="gmail.com">gmail.com</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>배송 메세지</th>
                                                    <td>
                                                        <input
                                                            type='text'
                                                            className="overlap3"
                                                            value={deliveryMessage}
                                                            onChange={(e) => setDeliveryMessage(e.target.value)}
                                                        />
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
                                            {cartItems.map((item, index) => (
                                                <div className="orderbox" key={index}>
                                                    <div className="orderbox_img">
                                                        {product && (
                                                            <img
                                                                src={`http://localhost:8000/shopping/api/products/${item.productId}/picture`} // 각 아이템의 pnum 사용
                                                                alt={item.productName} // 각 아이템의 pname 사용
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="orderbox_detail">
                                                        <strong>
                                                            <a href="">{item.productName}</a> {/* 각 아이템의 pname 사용 */}
                                                        </strong>
                                                        <ul>
                                                            <li>
                                                                <p className="option">[Color: {item.color}]<br />[Size: {item.size}]</p>
                                                            </li>
                                                            <li>수량: {item.quantity}</li>
                                                        </ul>
                                                        <div>
                                                            <span>KRW {item.price}</span>
                                                        </div>
                                                        <br />
                                                    </div>
                                                    <button>X</button>
                                                </div>
                                            ))}
                                        </div>


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
                        {/* <div className="detail_section">
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
                        </div> *<!-- 마일리지 끝 --> */}
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
                                                        {cartItems.length > 0 ? (
                                                            cartItems.map((item, index) => (
                                                                <div key={index}>
                                                                    <span>KRW <span>{item.price}</span></span>
                                                                    {index < cartItems.length - 1 && <br />} {/* 마지막 아이템이 아닐 경우 줄바꿈 */}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <span>상품이 없습니다.</span> // 카트가 비어있을 경우 메시지 표시
                                                        )}
                                                    </td>
                                                </tr>
                                                {/* <tr>
                                                    <th>배송비</th>
                                                    <td><span>+KRW 0</span></td>
                                                </tr>
                                                <tr>
                                                    <th>적립금</th>
                                                    <td className="red">
                                                        <span>-KRW<span>0</span></span>
                                                    </td>
                                                </tr> */}
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
                                                {/* <span className="paymethod_choice">
                                                    <input type="radio" id="paymethod_cash" name="paymethod" value="cash" autocomplete="off" />
                                                    <label for="paymethod_cash" className="overlap2">무통장 입금</label>
                                                </span>
                                                <span className="paymethod_choice">
                                                    <input type="radio" id="paymethod_kakao" name="paymethod" value="kakao" autocomplete="off" />
                                                    <label for="paymethod_kakao" className="overlap2">카카오페이</label>
                                                </span> */}

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* <div className="segment_surport hidden">
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
                                </div>*<!----> */}
                            </div>
                        </div>
                        {/* <div className="detail_section">
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
                        </div>적립 내역 끝 */}
                        <div className="finish_order_btn">
                            <div className="finish_order_btn_div"></div>
                            <PricingApiButton
                                title={productName}
                                price={100}
                                storeId={storeId}
                                channelKey={channelKey}
                                totalPrice={totalPrice}
                                orderRequest={orderRequest}
                                {...(cartItems.length > 0 && { cartItemId: cartItems[0].id })} // cartItems가 있을 때만 cartItemId 전달
                            />
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