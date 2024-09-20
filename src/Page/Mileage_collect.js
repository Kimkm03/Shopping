import React from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Mileage_collect.css';

function Mileage_collect(){
    return(
    <div> 
        <Header />
        <section className="mileage_collect_section">
            <h2>적립금 내역&nbsp;</h2>
            <br/><br/>
            <table className="mileage_now">
                <tr className="mileage_now_tr">
                    <td>총 적립금 : <span style={{float:'right'}}><span>999,000</span>원</span></td>
                </tr>
                <tr className="mileage_now_tr">
                    <td>사용가능 적립금 : <span style={{float:'right'}}><span>999,000</span>원</span>
                    </td>
                </tr>
                <tr className="mileage_now_tr">
                    <td>사용된 적립금 :  <span style={{float:'right'}}><span>999,000</span>원</span></td>
                </tr>

            </table><br/><br/><br/><br/>
            <table className="mileage_history">
                <thead>
                    <tr>
                        <th className="mileage_history_day">날짜</th>
                        <th className="mileage_history_count">적립금</th>
                        <th className="mileage_history_detail">내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="mileage_history_list">
                        <td>2024-05-13</td>
                        <td>999,000</td>
                        <td>사용에 의한 차감</td>
                    </tr>
                    <tr className="mileage_history_list">
                        <td>2024-05-13</td>
                        <td>999,000</td>
                        <td>구매에 의한 적립</td>
                    </tr>
                    
                </tbody>
            </table><br/><br/>
            <div>
                <ul className="paging">
                </ul>
            </div>
        </section>
        <Footer />
    </div>
    );
};

export default Mileage_collect;