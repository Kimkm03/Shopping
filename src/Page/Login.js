import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [memid, setMemid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      memid: memid,
      mempwd: password
    };

    if (memid === "" || password === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
    } else {
      try {
        const response = await axios.post('http://localhost:8000/shopping/api/login', dataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.status === "Login Success") {
          sessionStorage.setItem('memid', memid); // 회원 아이디를 sessionStorage에 저장
          sessionStorage.setItem('memname', response.data.memname); // 회원 이름을 sessionStorage에 저장
          
          if (response.data.admintype) {
            alert(`관리자에 접속하였습니다.`);
            navigate('/Management'); // 관리자로 로그인 시 관리자 페이지로 이동
          } else {
            alert(`로그인에 성공했습니다.`);
            navigate('/main'); // 일반 사용자 로그인 시 메인 페이지로 이동
          }
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error('로그인 중 오류가 발생했습니다!', error.response?.data || error.message);
        alert("존재하지 않는 회원입니다.");
      }
    }
  };

  return (
    <div className="set">
      <div className="setdiv">
        <br /><br /><br /><br /><br /><br />
        <main id="main-holder">
          <h1 id="login-header">로그인</h1>
          <br />
          <br />

          <form id="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="memid"
              id="userid-field"
              className="login-form-id"
              placeholder="아이디"
              value={memid}
              onChange={(e) => setMemid(e.target.value)}
            />
            <input
              type="password"
              name="password"
              id="password-field"
              className="login-form-pw"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div id="id_save">
              <span>
                <input type="checkbox" />
                아이디 저장
              </span>
            </div>

            <input
              type="submit" // submit 타입으로 변경
              value="로그인"
              id="login-form-submit"
            />
            <br />

            <ul className="find">
              <li style={{ cursor: 'pointer' }}>
                <a href="join">회원가입</a>
              </li>
              <li className="bunri"> | </li>
              <li style={{ cursor: 'pointer' }}>
                <a href="">아이디 찾기</a>
              </li>
              <li className="bunri"> | </li>
              <li style={{ cursor: 'pointer' }}>
                <a href="">비밀번호 찾기</a>
              </li>
            </ul>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
