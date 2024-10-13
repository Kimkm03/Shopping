import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import DaumPostcode from 'react-daum-postcode';
import './Join.css';

function Join() {
  const [setpwd, setPwd] = useState('');
  const [checkpwd, checkPwd] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false); // 주소 찾기 열기/닫기 상태
  const [formData, setFormData] = useState({
    memid: '',
    mempwd: '',
    checkmempwd: '',
    memname: '',
    email1: '',
    email2: '',
    mobile01: '010',
    phoneMiddle: '',
    phoneLast: '',
    firstaddress: '',
    secondaddress: '',
    postcode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const checkPasswords = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (setpwd !== checkpwd) {
      setMessage('비밀번호가 일치하지 않습니다.');
      setMessageColor('red');
    } else if (!regex.test(setpwd)) {
      setMessage('비밀번호는 영문+숫자 조합 8자 이상이어야 합니다.');
      setMessageColor('red');
    } else {
      setMessage('비밀번호가 일치합니다.');
      setMessageColor('green');
    }
  };

  const sendPassword = (password) => {
    return password;
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/shopping/api/check/${formData.memid}`);
      setIsDuplicate(response.data);
      if (response.data) {
        alert('아이디가 이미 사용 중입니다.');
      } else {
        alert('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      alert('아이디 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const validateForm = () => {
    const requiredFields = ['memid', 'memname', 'firstaddress', 'email1', 'email2', 'phoneMiddle', 'phoneLast'];
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        return false;
      }
    }
    if (setpwd !== checkpwd || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(setpwd)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("필수정보를 입력해주세요!");
      return;
    }
    const phoneNumber = `${formData.mobile01}-${formData.phoneMiddle}-${formData.phoneLast}`;
    const email = `${formData.email1}@${formData.email2}`;
    const dataToSend = {
      memid: formData.memid,
      mempwd: sendPassword(setpwd),
      memname: formData.memname,
      email: email,
      pnumber: phoneNumber,
      postcode: formData.postcode,
      firstaddress: formData.firstaddress,
      secondaddress: formData.secondaddress
    };
    try {
      const response = await axios.post('http://localhost:8000/shopping/api/signup', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      if (response.data.status === 200 && response.data.data === 1) {
        alert("회원가입에 성공했습니다.");
        window.location.href = '/Login';
      }  else if (response.data.status === 400 && response.data.data === -1) {
        alert('중복된 회원이 존재합니다.');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleReset = () => {
    setFormData({
      memid: '',
      setmempwd: '',
      checkmempwd: '',
      memname: '',
      email1: '',
      email2: '',
      mobile01: '010',
      phoneMiddle: '',
      phoneLast: '',
      firstaddress: '',
      secondaddress: '',
      postcode: ''
    });
    setPwd('');
    checkPwd('');
    setMessage('');
    setMessageColor('red');
  };

  const handleAddressComplete = (data) => {
    const { address, zonecode } = data;
    setFormData({
      ...formData,
      firstaddress: address,
      postcode: zonecode
    });
    setIsPostcodeOpen(false);
  };

  const openPostcodePopup = () => {
    const popup = window.open(
        '',
        '우편번호 검색',
        'width=600,height=600,scrollbars=yes'
    );

    popup.document.write(`
        <html>
            <head>
                <title>우편번호 검색</title>
            </head>
            <body>
                <div id="popup-daum-postcode"></div>
                <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
                <script>
                    new daum.Postcode({
                        oncomplete: function(data) {
                            window.opener.postMessage(data, "*");
                            window.close();
                        }
                    }).embed(document.getElementById('popup-daum-postcode'));
                </script>
            </body>
        </html>
    `);
  };

  useEffect(() => {
    const handlePostMessage = (event) => {
        if (event.origin !== window.location.origin) return;
        
        const { address, zonecode } = event.data;
        setFormData({
            ...formData,
            firstaddress: address,
            postcode: zonecode
        });
    };

    window.addEventListener('message', handlePostMessage);

    return () => {
        window.removeEventListener('message', handlePostMessage);
    };
  }, [formData]);

  return (
    <div className="join-container">
      <Header />
      <section className='join_section'>
        <div className="back">
          <h2 className='joinh2'>회원 가입</h2>
          <p className='member_access'>회원인증</p>
          <br />
          <table className="join_section_table1">
            <tbody>
              <tr>
                <td className="member">* 회원구분</td>
                <td><input type="radio" id="division" defaultChecked />개인회원</td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </div>

        <div>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div>
              <p className='basic_info'>기본 정보</p>
              <br />
              <p className='need'>* 필수 입력 사항</p>
              <br />
              <table className="join_section_table2">
                <tbody>
                  <tr>
                    <td htmlFor="memid" className='id'>* 아이디</td>
                    <td>
                      <input
                        type="text"
                        id="memid"
                        name="memid"
                        value={formData.memid}
                        onChange={handleChange}
                        className={formData.memid ? "valid" : "invalid"}
                      />
                      <input type="button" defaultValue="중복확인" className="id_check" onClick={handleIdCheck} />
                      <p className='set'>( 최소 4자 / 대소문자 구분 )</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pw">* 비밀번호</td>
                    <td>
                      <input
                        type="password"
                        id="setmempwd"
                        name="setmempwd"
                        value={setpwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onBlur={checkPasswords}
                      />
                      <p>( 영문+숫자 조합 8자 이상 )</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pw">* 비밀번호 확인</td>
                    <td>
                      <input
                        type="password"
                        id="checkmempwd"
                        name="checkmempwd"
                        value={checkpwd}
                        onChange={(e) => checkPwd(e.target.value)}
                        onBlur={checkPasswords}
                      />
                      <br />
                      <span id="pwconfirm" style={{ color: messageColor }}>{message}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="joinname" htmlFor="memname">* 이름</td>
                    <td>
                      <input
                        type="text"
                        id="memname"
                        name="memname"
                        value={formData.memname}
                        onChange={handleChange}
                        className={formData.memname ? "valid" : "invalid"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ad">* 주소</td>
                    <td>
                      <input type="text" placeholder="우편번호" className="post" value={formData.postcode} disabled />
                      <input type="button" defaultValue="주소검색" className="post_btn" onClick={openPostcodePopup} />
                      {isPostcodeOpen && (
                        <div>
                          <DaumPostcode
                            onComplete={handleAddressComplete}
                            style={{ width: '100%', height: '400px' }}
                          />
                        </div>
                      )}
                      <br />
                      <input 
                        type="text" 
                        placeholder="기본주소" 
                        className="basic_ad"
                        id="firstaddress"
                        name="firstaddress"
                        value={formData.firstaddress}
                        onChange={handleChange}
                        disabled
                      />
                      <br />
                      <input 
                        type="text" 
                        placeholder="상세주소" 
                        className={formData.secondaddress ? "valid" : "invalid"}
                        id="secondaddress"
                        name="secondaddress"
                        value={formData.secondaddress}
                        onChange={handleChange} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="tell">* 전화번호</td>
                    <td>
                      <select id="mobile01"
                        name="mobile01"
                        value={formData.mobile01}
                        onChange={handleChange}
                      >
                        <option value="010">010</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                      </select> - <input
                        type="tel"
                        className="phone"
                        maxLength={4}
                        name="phoneMiddle"
                        value={formData.phoneMiddle}
                        onChange={handleChange}
                      /> - <input
                        type="tel"
                        className="phone"
                        maxLength={4}
                        name="phoneLast"
                        value={formData.phoneLast}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="email" htmlFor="email">* 이메일</td>
                    <td>
                      <input
                        type="text"
                        className='email-input'
                        name="email1"
                        value={formData.email1}
                        onChange={handleChange}
                      />
                      @
                      <input
                        type="text"
                        className='email-input'
                        name="email2"
                        value={formData.email2}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <br />
              <input type="reset" defaultValue="취소" id="cancle" className='cancel-button' />
              <input type="submit" defaultValue="가입하기" id="finish" className='submit-button' />
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Join;
