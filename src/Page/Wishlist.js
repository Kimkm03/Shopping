import React from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';

import { Link } from 'react-router-dom';
import './Wishlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

function Wishlist(){
    return(
    <div>
        <Header />
        <div className='sidebar'>
            <ul className='sidebar_ul'>
                <li ><Link to='/Delivery_check'><FontAwesomeIcon icon={faTruckFast} /> 배송조회</Link></li>
                <li><Link to='/order'><FontAwesomeIcon icon={faCartShopping} /> 주문 조회</Link></li>
                <li className='sidebar_select'><Link to='/Wishlist'><FontAwesomeIcon icon={faHeart} /> 관심 상품</Link></li>
                <li><Link to='/Board_main'><FontAwesomeIcon icon={faPenToSquare} /> 게시글 관리</Link></li>
                <li className='mg40_left'><Link to='/Board_main'><FontAwesomeIcon icon={faMinus} /> 문의</Link></li>
                <li className='mg40_left'><Link to='/Board_review'><FontAwesomeIcon icon={faMinus} /> 리뷰</Link></li>
                <li className='mg40_left'><Link to='/Board_style'><FontAwesomeIcon icon={faMinus} /> 스타일</Link></li>
            </ul>
        </div>
        <section className="wishlist_section">
            
            <h2 className='wishlisttitle'>관심 상품 목록</h2>
            <div>
                <form className='wishlist_searchform'>
                    <input type='text' className='wishlist_searchip' />
                    
                    <button type="submit" className="btn_search">
                    <img src="https://i.postimg.cc/cH85Hwp5/search-btn2.png" alt="Search" />
                    </button>
                </form>
            </div>
            <table class="wishlist_table">
                <tbody>
                    <tr class="wishlist_tr">
                        <td class="wishlist_img"><a href=""><img src={`${process.env.PUBLIC_URL}/test_product.png`} alt=""/></a>
                        </td>
                        <td class="img_title"><a href="">상품명 ㅇㅇㅇㅇㅇㅇㅇㅇ<br/>
                        금액 : 00000000</a></td>
                        <td class="wishlist_btn">
                            <Link to={``}>
                                <button class="order_btn" >주문하기</button>
                            </Link>
                            <a href="product.html"></a>
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