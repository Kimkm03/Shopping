import React from 'react';
import * as PortOne from "@portone/browser-sdk/v2";

const PricingApiButton = ({ title, price, storeId, channelKey, totalPrice }) => {
    // Payment request function
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
            // 서버로 결제 확인 요청
            await verifyPayment(txId, paymentId, price);
            alert('Payment was successfully completed.');
        } catch (error) {
            console.error('Payment failed:', error.response ? error.response.data : error.message);
            alert('Payment failed. Please try again.');
        }
    };

    const verifyPayment = async (impUid, merchantUid, amount) => {
        try {
            const response = await fetch(`http://localhost:8000/shopping/orders/verifyIamportAndAddOrder/${impUid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ impUid, merchantUid, amount }),
            });

            if (!response.ok) {
                throw new Error('Payment verification failed');
            }

            const result = await response.json();
            console.log('Verification result:', result);
        } catch (error) {
            console.error('Verification error:', error);
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