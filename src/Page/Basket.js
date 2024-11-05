import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import './Basket.css';
import './style.css';

function Basket() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartId, setCartId] = useState(null);
    const [memberData, setMemberData] = useState(null);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const memid = sessionStorage.getItem("memid");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
                setMemberData(response.data);
            } catch (error) {
                console.error('Failed to fetch member data:', error);
                alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
            }
        };

        if (memid) {
            fetchMemberData();
        }
    }, [memid]);

    useEffect(() => {
        if (memberData) {
            fetchCartId(memberData.memnum);
        }
    }, [memberData]);

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
            calculateTotalPrice(response.data);
        } catch (error) {
            console.error('장바구니 데이터를 가져오는 중 오류 발생:', error);
            setCartItems([]); // 오류 발생 시 빈 배열 설정
        }
    };

    useEffect(() => {
        const selectedCartItems = cartItems.filter(item => selectedItems.has(item.id));
        calculateTotalPrice(selectedCartItems);
    }, [selectedItems]);

    const calculateTotalPrice = (selectedCartItems) => {
        const total = selectedCartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        setTotalPrice(total);
    };
    
    

    const handleDeleteItem = async (itemId) => {
        try {
            const response = await axios.post(`http://localhost:8000/shopping/api/cart/item/deleteCartItem/${itemId}`);
            if (response.status === 200) {
                fetchCartItems(cartId);
                alert('상품이 장바구니에서 삭제되었습니다.');
            } else {
                alert('상품 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('장바구니 아이템 삭제 중 오류 발생:', error);
        }
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);

        if (isChecked) {
            const allItemIds = new Set(cartItems.map(item => item.id));
            setSelectedItems(allItemIds);
        } else {
            setSelectedItems(new Set());
        }
    };

    const handleItemCheckboxChange = (e, itemId) => {
        const newSelectedItems = new Set(selectedItems);
        if (e.target.checked) {
            newSelectedItems.add(itemId);
        } else {
            newSelectedItems.delete(itemId);
        }
        setSelectedItems(newSelectedItems);
        setSelectAll(newSelectedItems.size === cartItems.length);
    };

    const handleProceedToPayment = () => {
        if (selectedItems.size === 0) {
            alert("주문하실 상품을 선택해주세요");
            return;
        }
        const selectedCartIds = Array.from(new Set(selectedItems));
        navigate('/payment', { state: { selectedCartIds } });
    };
    return (
        <div>
            <Header />
            <section className="basket_section">
                <h2>장바구니</h2>
                <div className="basket_info">
                    <ul>
                        <li>품절된 상품은 자동으로 삭제됩니다.</li>
                        <li>장바구니에 담긴 상품은 30일 이후에 자동 삭제됩니다.</li>
                        <li>제주도/도서산간 제외 전 지역 무료배송입니다.</li>
                        <li>할인 금액은 결제창에서 이루어집니다.</li>
                    </ul>
                </div>
                <br /><br /><br />
                <table className="basket_table">
                    <thead>
                        <tr className="basket_table_head">
                            <th className="wid60">NO</th>
                            <th className="wid60"><input type="checkbox"
                                className="basketcb"
                                onChange={handleSelectAll}
                                checked={selectAll} /></th>
                            <th>상품정보</th>
                            <th className="wid60">수량</th>
                            <th className="wid100">금액</th>
                            <th className="wid50"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(cartItems) && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <tr key={item.id} className="basket_item_list">
                                    <td>{index + 1}</td>
                                    <td><input type="checkbox"
                                        className="basketcb"
                                        checked={selectedItems.has(item.id)}
                                        onChange={(e) => handleItemCheckboxChange(e, item.id)}
                                    /></td>
                                    <td className="basket_item">
                                        <Link to={`/product/${item.productId}`}>
                                            <img src={`http://localhost:8000/shopping/api/products/${item.productId}/picture`} alt={item.productName} />
                                        </Link><br /><br />
                                        <Link to={`/product/${item.productId}`}>상품명 : {item.productName}</Link><br />
                                        <p>옵션 : {item.size}, {item.color}</p>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price.toLocaleString()}</td>
                                    <td><button className="basket_item_delete" onClick={() => handleDeleteItem(item.id)}>X</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">장바구니가 비어 있습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br /><br />
                <div className="total_price">총 결제 금액 :&nbsp;&nbsp;&nbsp;&nbsp; <div>{totalPrice.toLocaleString()}</div> &nbsp;&nbsp;</div>
                <br /><br /><br />
                <button className="basket_buy_btn" onClick={handleProceedToPayment}>주문하기</button>
                <br /><br /><br />
            </section>
            <Footer />
        </div>
    );
}

export default Basket;
