import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Product.css';

function Product() {
    const { productId } = useParams(); // URL에서 productId를 추출합니다.
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [memberData, setMemberData] = useState(null);
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
            quantity: 1 // 예시로 1로 설정, 실제 구현에 따라 조정 가능
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
                                                <strike><span className='sstyle2'> KRW {product.price}</span></strike>
                                            </div>
                                            <div>
                                                <strong><span>KRW {product.discountprice}</span></strong>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <strong><span> KRW {product.price}</span></strong>
                                        </div>
                                    )}
                                </div>

                                <div className="choice_option">
                                    <table className="infoarea_table">
                                        <tbody>
                                            <tr>
                                                <th>사이즈</th>
                                                <td className="size_select">
                                                    <select className="size_select_option" name="" id="" value={selectedSize} onChange={handleSizeChange}>
                                                        <option value="">--[필수]-옵션을 선택해주세요--</option>
                                                        {renderSizeOptions()}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>색상</th>
                                                <td className="size_select">
                                                    <select className="size_select_option" name="" id="" value={selectedColor} onChange={handleColorChange}>
                                                        <option value="">--[필수]-옵션을 선택해주세요--</option>
                                                        {renderColorOptions()}
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="totalprice">
                                    <strong>총 상품 금액 :</strong>
                                    <span className="total">
                                        <strong>
                                            KRW {product.discountprice > 0 ? product.discountprice : product.price}
                                        </strong>
                                    </span>
                                </div>
                                <div className="product_action">
                                    <div className="btn_list">
                                        <a href="" className="buy_btn">
                                            <span>BUY IT NOW</span>
                                        </a>
                                        <button className="cart_btn" onClick={handleAddToCart}>CART</button>
                                        <button className="wish_btn">WISH LIST</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Product;
