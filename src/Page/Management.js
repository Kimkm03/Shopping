import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Management.css';

function Management() {
    const [memberCount, setMemberCount] = useState(0);

    useEffect(() => {
        const fetchMemberCount = async () => {
            try {
                const response = await axios.get('http://localhost:8000/shopping/api/memberCount');
                setMemberCount(response.data.length);  // 받아온 데이터의 길이를 상태로 설정
            } catch (error) {
                console.error('Error fetching member count:', error);
                setMemberCount(0);  // 에러 발생 시 0으로 설정
            }
        };

        fetchMemberCount();
    }, []);

    return(
        <div>
            <Header />
            <section class="management_section">
                <h2>관리자 전용 모드</h2><br/><br/><br/>
                
                <p style={{fontWeight: 'bold'}}>금일 현황</p>
                <table class="management_section_table1">
                    <tr class="table1_num">
                        <td><span>9,999,999,999</span></td>
                        <td><span>9,999,999,999</span></td>
                        <td><span>{memberCount}</span></td>
                        <td><span>9,999,999,999</span></td>
                    </tr>
                    <tr class="table1_text">
                        <td>금일 방문자</td>
                        <td>금일 주문건</td>
                        <td>총 유저수</td>
                        <td>누적 주문</td>
                    </tr>
                </table>
                <br/><br/><br/><br/>
                <table class="management_section_table2">
                    <tr >
                        <td class="tableset">
                            <a href="" class="menuset">Order <br/> <p class="menuset_p">주문 관리</p></a>
                            <br/>
                            <a href="" class="menuset2">고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.</a>
                        </td>
                        <td class="tableset">
                            <a href="" class="menuset">Member-mg <br/> <p class="menuset_p">회원 관리</p></a>
                            <br/>
                            <a href="" class="menuset2">고객님의 개인정보를 관리하는 공간입니다.</a>
                        </td>
                        <td class="tableset">
                            <a href="Product_mg" class="menuset">Product-mg <br/> <p class="menuset_p">상품 관리</p></a>
                            <br/>
                            <a href="Product_mg" class="menuset2">상품을 관리하는 공간입니다.</a>
                        </td>
                        <td class="tableset">
                            <a href="" class="menuset">Review <br/> <p class="menuset_p">리뷰 관리</p></a>
                            <br/>
                            <a href="" class="menuset2">리뷰 목록을 보여드립니다.</a>
                        </td>
                        <td class="tableset">
                            <a href="" class="menuset">Board <br/> <p class="menuset_p">게시물 관리</p></a>
                            <br/>
                            <a href="" class="menuset2">개시물 목록을 보여드립니다.</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="tableset">
                            <a href="" class="menuset">Mileage <br/> <p class="menuset_p">적립금</p></a>
                            <br/>
                            <a href="" class="menuset2">적립금 목록을 보여드립니다.</a>
                        </td>
                    </tr>
                </table>
            </section>
            <Footer />
        </div>

    );
};

export default Management;