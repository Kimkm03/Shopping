import React, { useEffect } from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Write_inquiry.css';

function Write_inquiry(){
    
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

        <textarea id="write_inquiry_title" name="review" required></textarea>
      </div>
      <br />
      <div>
        <p>내용 :</p>
        <br />

        <textarea id="write_inquiry_detail" name="review" required></textarea>
      </div>
      <br /><br /><br />
      <div>
        <button onclick="back()" class="back_btn">←</button>
        <input type="submit" class="next_btn" value="등록" />
      </div>

      <table></table>
    </section>
        <Footer />
    </div>
    );
};

export default Write_inquiry;