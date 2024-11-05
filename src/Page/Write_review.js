import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Write_review.css';

function Write_review() {
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState(null);
  const location = useLocation();
  const { productCode } = location.state || {};
  const [formData, setFormData] = useState({
    starcnt: '',
    content: '',
    delveryreply: '',
    takeoutreply: '',
    productCode: productCode,
  });

  // 평점 선택
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 사진 파일 선택
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // 데이터 서버 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !formData.delveryreply || !formData.takeoutreply || !formData.content || !photo) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    // formData 객체에 starcnt 추가
    const reviewData = {
      ...formData,
      starcnt: rating, // starcnt 필드 추가
    };

    const formDataToSend = new FormData();
    formDataToSend.append('review', JSON.stringify(reviewData)); // JSON 문자열로 추가
    formDataToSend.append('picture', photo); // 파일 추가

    try {
      const response = await axios.post('http://localhost:8000/shopping/api/review/save', formDataToSend);
      if (response.data.status === 200) {
        alert('리뷰가 성공적으로 등록되었습니다.');
        window.location.href = `/Product/${productCode}`;
      }
    } catch (error) {
      console.error('리뷰 등록 중 오류가 발생했습니다:', error);
    }
  };

  const back = () => {
    window.history.back();
  };

  return (
    <div>
      <Header />
      <section className="write_review_section">
        <h2>리뷰작성</h2>
        <div className="review_score">
          평점:&nbsp;&nbsp;&nbsp;
          <div id="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`stars ${star <= rating ? 'selected' : ''}`}
                data-value={star}
                onClick={() => handleRatingClick(star)}
              >
                {star <= rating ? '★' : '☆'}
              </span>
            ))}
          </div><br />
          <p id="selected-rating">{rating > 0 ? `선택된 평점: ${rating}` : ''}</p>
        </div>

        <div className="toggle_zone">
          <span>배송:</span>
          <div className="form_toggle row-vh">
            <div className="form_radio_btn">
              <input id="radio-1" type="radio" name="delveryreply" value="fast" onChange={handleInputChange} />
              <label htmlFor="radio-1">빨라요</label>
            </div>
            <div className="form_radio_btn">
              <input id="radio-2" type="radio" name="delveryreply" value="bad" onChange={handleInputChange} />
              <label htmlFor="radio-2">아쉬워요</label>
            </div>
          </div>
        </div><br />

        <div className="toggle_zone">
          <span>포장:</span>
          <div className="form_toggle row-vh">
            <div className="form_radio_btn">
              <input id="radio-3" type="radio" name="takeoutreply" value="careful" onChange={handleInputChange} />
              <label htmlFor="radio-3">꼼꼼해요</label>
            </div>
            <div className="form_radio_btn">
              <input id="radio-4" type="radio" name="takeoutreply" value="bad" onChange={handleInputChange} />
              <label htmlFor="radio-4">아쉬워요</label>
            </div>
          </div>
        </div><br />

        <div>
          <p>내용:</p>
          <textarea
            id="review"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          ></textarea>
        </div><br />

        <div>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            required
          />
        </div><br />
        <button onClick={back} className="back_btn">←</button>
        <div>
          <button type="button" onClick={handleSubmit} className="next_btn">등록하기</button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Write_review;