import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Write_inquiry.css';

function Write_inquiry() {
  const [memberData, setMemberData] = useState(null);
  const memid = sessionStorage.getItem("memid"); // memId가 sessionStorage에 제대로 저장되어 있는지 확인
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    userCode: ''
  });


  // 회원 데이터 가져오기
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
        setMemberData(response.data);
      } catch (error) {
        console.error('Failed to fetch member data:', error);
        // 네트워크 오류 등으로 요청이 실패할 경우 적절히 처리
        alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
      }
    };

    if (memid) {
      fetchMemberData();
    }
  }, [memid]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 제목과 내용 유효성 검사
    if (!formData.title) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formData.content) {
      alert('내용을 입력해주세요.');
      return;
    }
    const dataToSend = {
      title: formData.title,
      content: formData.content,
      userCode: memberData.memnum
    }
    try {
      const response = await axios.post('http://localhost:8000/shopping/api/board/save', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      if (response.data.status === 200 && response.data.data === 1) {
        alert("등록에 성공했습니다.");
        window.location.href = '/Board_main';
      } else {
        alert('등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // formData 업데이트
  };

  const back = () => {
    // 뒤로가기 기능 구현
    window.history.back();
  };

  return (
    <div>
      <Header />
      <section className="write_inquiry_section">
        <br /><br /><br />
        <h2>문의하기</h2>
        <br /><br /><br />

        <form onSubmit={handleSubmit}>
          <div>
            <p>제목 :</p>
            <br />
            <textarea
              id="write_inquiry_title"
              name="title"
              value={formData.title}
              onChange={handleInputChange} // 제목 변경 시 상태 업데이트
              required
            ></textarea>
          </div>
          <br />
          <div>
            <p>내용 :</p>
            <br />
            <textarea
              id="write_inquiry_detail"
              name="content"
              value={formData.content}
              onChange={handleInputChange} // 내용 변경 시 상태 업데이트
              required
            ></textarea>
          </div>
          <br /><br /><br />
          <div>
            <button type="button" onClick={back} className="back_btn">←</button>
            <input type="submit" className="next_btn" value="등록" />
          </div>
        </form>

        <table></table>
      </section>
    </div>
  );
};

export default Write_inquiry;