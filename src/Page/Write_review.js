import React, { useEffect } from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Write_review.css';

function Write_review(){
    const back = () => {
        window.history.back();
    };

    useEffect(() => {
        const stars = document.querySelectorAll('.stars');
        stars.forEach((star) => {
            star.addEventListener('click', () => {
                const rating = star.getAttribute('data-value');
                document.getElementById('selected-rating').innerText = `: ${rating}점!!`;
            });
        });

        // Clean up event listeners on unmount
        return () => {
            stars.forEach((star) => {
                star.removeEventListener('click', () => {
                    const rating = star.getAttribute('data-value');
                    document.getElementById('selected-rating').innerText = `: ${rating}점!!`;
                });
            });
        };
    }, []);
    return(
    <div>
        <Header />
        <section class="write_review_section">
      <br /><br /><br />
      <h2>리뷰작성</h2>
      <br /><br /><br />
      <div class="review_score">
        평점 : &nbsp;&nbsp;&nbsp;
        <div id="stars-container">
          <span class="stars" data-value="1">&#9733;</span>
          <span class="stars" data-value="2">&#9733;</span>
          <span class="stars" data-value="3">&#9733;</span>
          <span class="stars" data-value="4">&#9733;</span>
          <span class="stars" data-value="5">&#9733;</span>
        </div>
        &nbsp;&nbsp;&nbsp;
        <p id="selected-rating"></p>
      </div>
      <div class="toggle_zone">
        <span>배송:</span>
        <div class="form_toggle row-vh">
          <div class="form_radio_btn radio_male">
            <input id="radio-1" type="radio" name="user" value="fast" />
            <label for="radio-1">빨라요</label>
          </div>

          <div class="form_radio_btn">
            <input id="radio-2" type="radio" name="user" value="bad" />
            <label for="radio-2">아쉬워요</label>
          </div>
        </div>
      </div>
      <br />
      <div class="toggle_zone">
        포장 :
        <div class="form_toggle row-vh">
          <div class="form_radio_btn radio_male">
            <input id="radio-3" type="radio" name="user2" value="careful" />
            <label for="radio-3">꼼꼼해요</label>
          </div>

          <div class="form_radio_btn">
            <input id="radio-4" type="radio" name="user2" value="bad" />
            <label for="radio-4">아쉬워요</label>
          </div>
        </div>
      </div>
      <br />
      <div>
        <p>내용 :</p>
        <br />

        <textarea id="review" name="review" required></textarea>
      </div>

      <div>
        <br />
        <input type="file" id="photo" name="photo" accept="image/*" required />
      </div>
      <br /><br /><br />
      <div>
        <button onclick="back()" class="back_btn">←</button>
        <input type="submit" class="next_btn" value="등록하기" />
      </div>

      <table></table>
    </section>
        <Footer />
    </div>
    );
};

export default Write_review;