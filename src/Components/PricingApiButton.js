import React from 'react';
import axios from 'axios';
import * as PortOne from "@portone/browser-sdk/v2";

const PricingApiButton = ({ title, price, storeId, channelKey, totalPrice, orderRequest, cartItemId }) => {
    const handlePayment = async (event) => {
        event.preventDefault(); // 기본 폼 제출 방지
        try {
            const paymentId = `payment-${crypto.randomUUID()}` // Generate unique payment ID
            const response = await PortOne.requestPayment({
                pg: "nice_v2",
                storeId: storeId,
                channelKey: channelKey,
                paymentId: paymentId,
                orderName: title,
                totalAmount: price,
                currency: "CURRENCY_KRW",
                payMethod: "CARD",
            });
            console.log('Payment successful:', response);
            const { txId } = response; // ES6 디스트럭처링 사용
            console.log('Extracted txId:', txId);

            if (response.code != null) {
                // 오류 발생
                return alert('결제가 취소되었습니다.');
            }

            // 서버로 결제 확인 요청 (orderRequest 전달)
            await verifyPayment(txId, paymentId, price, orderRequest, cartItemId);
        } catch (error) {
            console.error('Payment failed:', error.response ? error.response.data : error.message);
            alert('Payment failed. Please try again.');
        }
    };

    const verifyPayment = async (impUid, merchantUid, amount, orderRequest, cartItemId) => {
        try {
            const response = await fetch(`http://localhost:8000/shopping/api/verifyIamportAndAddOrder/${merchantUid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    impUid,
                    merchantUid,
                    amount,
                    userCode: orderRequest.userCode,
                    productCode: orderRequest.productCode,
                    shippingAddress: orderRequest.shippingAddress,
                    productSize: orderRequest.productSize,
                    productColor: orderRequest.productColor,
                    request: orderRequest.request,
                    orderPrice: orderRequest.orderPrice,
                    count: orderRequest.count
                }),
            });

            // 결제 상태 확인
            if (!response.ok) {
                const errorText = await response.text(); // 서버로부터의 오류 메시지
                throw new Error(`Payment verification failed: ${errorText}`);
            }

            // 성공적인 응답 처리
            const result = await response.json();
            console.log('주문이 성공적으로 완료되었습니다:', result);
            try {
                await updateProductQuantity(orderRequest.productCode, orderRequest.count);
                console.log('상품 수량이 성공적으로 업데이트되었습니다.');
                try{
                    await deleteCateItem(cartItemId);
                    alert('주문이 성공적으로 완료되었습니다!');
                    window.location.href = '/order';
                } catch (error){
                    console.error('카트 업데이트 중 오류 발생:', error);
                }
            } catch (error) {
                console.error('상품 수량 업데이트 중 오류 발생:', error);
            }

        } catch (error) {
            console.error('Verification error:', error);
            alert('결제 검증 중 오류가 발생했습니다.');
        }
    };

    // 카트 아이템 삭제 함수
    const deleteCateItem = async (cartItemId) => {
        try{
            const response = await axios.post(`http://localhost:8000/shopping/api/cart/item/deleteCartItem/${cartItemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if (response.data.status === 200 && response.data.data === 1) {
                console.log('장바구니 삭제 완료');
            } else if (response.data.status === 404 && response.data.data === -1) {
                console.log('카트를 찾지 못했습니다.');
            } else {
                console.log('회원탈퇴에 실패했습니다.');
            }
        } catch(error){
            console.error('There was an error!', error);
        }
    }

    // 상품 수량 업데이트 함수
    const updateProductQuantity = async (productCode, orderQuantity) => {
        try {
            const response = await axios.put(`http://localhost:8000/shopping/api/products/${productCode}/update-quantity`, {
                orderQuantity: orderQuantity
            });
            return response.data;
        } catch (error) {
            throw new Error('상품 수량 업데이트 실패');
        }
    };

    return (
        <div>
            <button
                onClick={handlePayment}
                className="orderbtn_submit overlap5">
                KRW {totalPrice}원 결제하기
            </button>
        </div>
    );
};

export default PricingApiButton;
