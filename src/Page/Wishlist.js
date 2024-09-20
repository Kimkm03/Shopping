import React from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Wishlist.css';

function Wishlist(){
    return(
    <div>
        <Header />
        <section className="wishlist_section">
            
            <h2 className='wishlisttitle'>관심 상품 목록</h2>
            <table class="wishlist_table">
                <tbody>
                    <tr class="wishlist_tr">
                        <td class="wishlist_img"><a href=""><img src={`${process.env.PUBLIC_URL}/test_product.png`} alt=""/></a>
                        </td>
                        <td class="img_title"><a href="">상품명 ㅇㅇㅇㅇㅇㅇㅇㅇ<br/>
                        금액 : 00000000</a></td>
                        <td class="wishlist_btn">
                            <a href="product.html"><button class="order_btn" >주문하기</button></a>
                            <button class="wishlist_cancle">삭제</button>
                        </td>
                    </tr>
                </tbody>
            
            </table>
            <div>
                <ul class="paging">
                </ul>
            </div>


        </section>
        <Footer />
    </div>
    );
};

export default Wishlist;