import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Product.css';
import { height } from '@fortawesome/free-regular-svg-icons/faAddressBook';

function Product() {
    const { productId } = useParams(); // URL에서 productId를 추출합니다.
    const [product, setProduct] = useState(null);
    const [review, setReview] = useState(null);
    const [userNames, setUserNames] = useState([]);  // 유저 이름 배열로 상태 초기화
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [memberData, setMemberData] = useState(null);
    const [quantity, setQuantity] = useState(1); // 수량 상태를 1로 초기화
    const memid = sessionStorage.getItem("memid"); // memId가 sessionStorage에 제대로 저장되어 있는지 확인

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
        fetchProduct();
        fetchReview();
        incrementViews(); // 조회수를 증가시키는 함수 호출
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/products/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('상품 정보를 불러오는 중 오류 발생:', error);
        }
    };

    const incrementViews = async () => {
        try {
            await axios.put(`http://localhost:8000/shopping/api/products/${productId}/increment-views`);
        } catch (error) {
            console.error('조회수를 증가시키는 중 오류 발생:', error);
        }
    };

    const fetchReview = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/shopping/api/review/product/${productId}`);
            setReview(response.data);
            // 각 리뷰에 대해 memnum을 이용해 유저 이름을 가져옴
            const userPromises = response.data.map((rev) =>
                axios.get(`http://localhost:8000/shopping/api/memberInfo/${rev.memnum}`)
            );
            const userResponses = await Promise.all(userPromises);
            setUserNames(userResponses.map(res => res.data.memname));  // 유저 이름들을 배열로 저장
        } catch (error) {
            console.error('리뷰 정보를 불러오는 중 오류 발생 : ', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const renderSizeOptions = () => {
        if (!product) return null; // product가 로드되지 않은 경우 처리

        if (Array.isArray(product.size)) {
            return product.size.map((size, index) => (
                <option key={index} value={size}>{size}</option>
            ));
        } else if (product.size) {
            return <option value={product.size}>{product.size}</option>;
        } else {
            return null;
        }
    };

    const renderColorOptions = () => {
        if (!product) return null; // product가 로드되지 않은 경우 처리

        if (Array.isArray(product.color)) {
            return product.color.map((color, index) => (
                <option key={index} value={color}>{color}</option>
            ));
        } else if (product.color) {
            return <option value={product.color}>{product.color}</option>;
        } else {
            return null;
        }
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };


    const handleByNow = async () => {
        if (!selectedSize || !selectedColor) {
            alert('사이즈와 색상을 선택해주세요.');
            return;
        }

        const cartItem = {
            product_Id: product.pnum,
            size: selectedSize,
            color: selectedColor,
            price: product.price,
            count: product.pcount,
            quantity: quantity // 예시로 1로 설정, 실제 구현에 따라 조정 가능
        };

        try {
            const response = await axios.post(`http://localhost:8000/shopping/api/cart/${memberData.memnum}/${productId}/add`, cartItem);
            if (response.data.status === 200) {
                window.location.href = '/Basket';
            }
        } catch (error) {
            console.error('장바구니 추가 중 오류 발생:', error);
            alert('오류가 발생했습니다.');
        }
    };

    const handleAddToCart = async () => {
        if (!selectedSize || !selectedColor) {
            alert('사이즈와 색상을 선택해주세요.');
            return;
        }

        const cartItem = {
            product_Id: product.pnum,
            size: selectedSize,
            color: selectedColor,
            price: product.price,
            count: product.pcount,
            quantity: quantity // 예시로 1로 설정, 실제 구현에 따라 조정 가능
        };

        try {
            const response = await axios.post(`http://localhost:8000/shopping/api/cart/${memberData.memnum}/${productId}/add`, cartItem);
            if (response.data.status === 200) {
                alert('장바구니에 상품이 추가되었습니다.');
                window.location.href = `/Product/${productId}`;
            } else {
                alert('장바구니 추가에 실패했습니다.');
            }
        } catch (error) {
            console.error('장바구니 추가 중 오류 발생:', error);
            alert('장바구니 추가 중 오류가 발생했습니다.');
        }
    };

    const handleAddToWish = async () => {
        if(memberData){
            const wishlist = {
                productCode: productId,
                memberCode: memberData.memnum
            }

            try {
                const response = await axios.post('http://localhost:8000/shopping/api/wishlist/save', wishlist)
                if (response.data.status === 200){
                    alert('관심상품에 상품이 추가되었습니다.')
                    window.location.href = '/Wishlist';
                } else {
                    alert('관심상품에 상품 추가에 실패했습니다.');
                }
            } catch (error) {
                console.error('관심 상품 추가 중 오류 발생:', error)
            }
        }
    };

    // 수량 증가 함수
    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // 수량 감소 함수 (1 이하로는 감소하지 않도록 설정)
    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // 수동으로 수량 변경
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const renderReviews = review && review.length > 0 && review.map((rev, index) => {
        const currentUserName = userNames[index];  // 인덱스를 사용하여 유저 이름을 가져옴

        return (
            <tr key={index} className="product_review_table_td_detail">
                <td>
                    <p className="rev_statscore">{'★'.repeat(rev.starcnt)}</p>
                    <p className="rev_opt">
                        배송 : <span>{rev.delveryreply === 'fast' ? '빨라요' : rev.delveryreply === 'bad' ? '아쉬워요' : rev.delveryreply}</span> /
                        포장 : <span>{rev.takeoutreply === 'careful' ? '꼼꼼해요' : rev.takeoutreply === 'bad' ? '아쉬워요' : rev.takeoutreply}</span>
                    </p>
                    <p className="rev_usertxt">{rev.content}</p><br />
                    <img src={`http://localhost:8000/shopping/api/review/${rev.id}/picture`} alt={'리뷰 이미지'} style={{ height: '15em' }} />
                </td>
                <td className="product_review_table_buyoption">
                    <div>
                        {currentUserName ? `${currentUserName}님의 리뷰` : "유저 정보 없음"}<br />
                        사이즈 : <span>{rev.productSize}</span><br />
                        색상 : <span>{rev.productColor}</span><br />
                    </div>
                </td>
            </tr>
        );
    });


    return (
        <div>
            <Header />
            <section className="sale_product">
                <div className="sale_product_div">
                    <div className="sale_product_div2">
                        <div className="detailarea">
                            <div className="imgarea">
                                <div className="imgarea_div">
                                    <div className="swiper-container">
                                        <ul className="imgarea_ul">
                                            <li>
                                                <img src={`http://localhost:8000/shopping/api/products/${product.pnum}/picture`} alt={product.pname} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="infoarea">
                                <div className="headingarea">
                                    <h1>{product.name}</h1>
                                    <div className="headingarea_detail">
                                        {product.comment}
                                    </div>
                                </div>
                                <div className="product_price">
                                    {product.discountprice > 0 ? (
                                        <>
                                            <div style={{ marginBottom: '15px' }}>
                                                <strike><span className='sstyle2'>KRW {product.price.toLocaleString()}</span></strike>
                                            </div>
                                            <div>
                                                <strong><span>KRW {product.discountprice.toLocaleString()}</span></strong>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <strong><span>KRW {product.price.toLocaleString()}</span></strong>
                                        </div>
                                    )}
                                </div>

                                {product.productstate == "판매중" ? (
                                    <>
                                        <div className="choice_option">
                                            <table className="infoarea_table">
                                                <tbody>
                                                    <tr>
                                                        <th>사이즈</th>
                                                        <td className="size_select">
                                                            <select className="size_select_option" value={selectedSize} onChange={handleSizeChange}>
                                                                <option value="">--[필수]-사이즈를 선택해주세요--</option>
                                                                {renderSizeOptions()}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>색상</th>
                                                        <td className="size_select">
                                                            <select className="size_select_option" value={selectedColor} onChange={handleColorChange}>
                                                                <option value="">--[필수]-색상을 선택해주세요--</option>
                                                                {renderColorOptions()}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>수량</th>
                                                        <td className="size_select">
                                                            <button className='eachopbtn' onClick={handleIncrease}>+</button>
                                                            <input
                                                                className="each_select_option"
                                                                type="number"
                                                                value={quantity}
                                                                onChange={handleQuantityChange}
                                                                min="1"
                                                            />
                                                            <button className='eachopbtn' onClick={handleDecrease}>-</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="totalprice">
                                            <strong>총 상품 금액 :</strong>
                                            {product.discountprice > 0 ? (
                                                <span className="total"><strong>KRW {product.discountprice}</strong></span>
                                            ) : (
                                                <span className='total'><strong>KRW {product.price}</strong></span>
                                            )}
                                        </div>
                                        <div className="product_action">
                                            <div className="btn_list">
                                                <button className="buy_btn" onClick={handleByNow}><span>BUY IT NOW</span></button>
                                                <button className="cart_btn" onClick={handleAddToCart}>CART</button>
                                                <button className="wish_btn" onClick={handleAddToWish}>WISH LIST</button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="out_of_stock">
                                        <strong>현재 상품은 품절되었습니다.</strong>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="product_review">
                        <p className='prd_revtit'> review </p>
                        <table className="product_review_table">
                            {/* <thead className="product_review_table_thead">
                                <tr className="product_review_table_tr">
                                    <th><button>최신순</button> <button>별점순</button></th>
                                </tr>
                            </thead> */}
                            <tbody>
                                {renderReviews}
                                {/* {Array.isArray(review) && review.length > 0 ? (
                                    review.map((rev, index) => (
                                        
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">리뷰가 없습니다.</td>
                                    </tr>
                                )} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Footer />
        </div>

    );
}

export default Product;
