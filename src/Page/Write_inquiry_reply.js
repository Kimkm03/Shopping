import React, { useEffect } from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Write_inquiry_detail.css';

function Write_inquiry_reply(){
    
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
        <textarea className='iqreplytxt'>

        </textarea>
      </div>
      <br /><br /><br />
      
      <button className='inquiry_reply_save_btn'>답변 저장하기</button>

      <table></table>
    </section>
        <Footer />
    </div>
    );
};

export default Write_inquiry_reply;