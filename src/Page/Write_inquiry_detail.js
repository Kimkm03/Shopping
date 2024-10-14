import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Write_inquiry_detail.css';

function Write_inquiry_detail() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  const fetchBoard = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/shopping/api/board/${boardId}`);
      setBoard(response.data);
    } catch (error) {
      console.error('문의 정보를 불러오는 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <Header />
      <section class="write_inquiry_section">
        <br /><br /><br />
        <h2>문의하기</h2>
        <br /><br /><br />


        <div>
          <p>제목 :</p>
          <br />
          {board && (  
            <span>
              {board.title}
            </span>
          )}
        </div>
        <br />
        <div>
          <p>내용 :</p>
          <br />
          {board && (
            <span>
              {board.content}
            </span>
          )}
        </div>
        <br /><br /><br />
        <div className='inquiryreply'>
          <p>답변 :</p>
          <br />
          {board && (
            <span>
              {board.reply}
            </span>
          )}
        </div>
        <br /><br /><br />


        <table></table>
      </section>
      <Footer />
    </div>
  );
};

export default Write_inquiry_detail;