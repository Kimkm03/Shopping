import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Write_inquiry_detail.css';

function Write_inquiry_reply() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [reply, setReply] = useState('');

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

  const handleSaveReply = async () => {
    if (!reply) {
      alert("답변을 입력해주세요."); // 답변이 없을 경우 경고
      return;
    }

    const orderStatus = true;

    try {
      const response = await axios.put(`http://localhost:8000/shopping/api/board/check/${boardId}`, null, {
        params: {
          orderStatus, // 검토 상태
          reply: reply // 입력한 답변 내용
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 1) {
        alert("답변이 저장되었습니다.");
        window.location.href = '/Mg_Inquiry';
      } else {
        alert('답변 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('답변 저장 중 오류 발생:', error);
      alert('답변 저장 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };


  const handleReplyChange = (e) => {
    setReply(e.target.value); // 텍스트 영역의 값이 변경될 때 상태 업데이트
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
          <textarea
            className='iqreplytxt'
            value={reply}
            onChange={handleReplyChange}
          >

          </textarea>
        </div>
        <br /><br /><br />

        <button className='inquiry_reply_save_btn' onClick={handleSaveReply}>답변 저장하기</button>

        <table></table>
      </section>
      <Footer />
    </div>
  );
};

export default Write_inquiry_reply;