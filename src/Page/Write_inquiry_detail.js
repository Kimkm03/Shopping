import React, { useEffect } from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Write_inquiry_detail.css';

function Write_inquiry_detail(){
    
    return(
    <div>
        <Header />
        <section class="write_inquiry_section">
      <br /><br /><br />
      <h2>문의하기</h2>
      <br /><br /><br />
      
      
      <div>
        <p>제목 :</p>
        <br />  
        <span>
            배송 문의입니다.
        </span>
      </div>
      <br />
      <div>
        <p>내용 :</p>
        <br />
        <span>
            금일 주문건은 언제 배송이 되나요?
        </span>
      </div>
      <br /><br /><br />
      <div className='inquiryreply'>
        <p>답변 :</p>
        <br />
        <span>
            금일 16시 이전 주문건은 당일 배송으로 업체에 전달하여 2~4일 이내로 도착할 것으로 예상됩니다. 감사합니다.

        </span>
      </div>
      <br /><br /><br />
      

      <table></table>
    </section>
        <Footer />
    </div>
    );
};

export default Write_inquiry_detail;