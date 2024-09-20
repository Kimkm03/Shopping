import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import DaumPostcode from 'react-daum-postcode';
import './Modify.css';

function Modify() {
    const memid = sessionStorage.getItem("memid");
    const [setpwd, setPwd] = useState('');
    const [checkpwd, checkPwd] = useState('');
    const [memnum, setMemnum] = useState('');
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
        postcode: '',
        firstaddress: '',
        secondaddress: ''
    });

    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('red');

    useEffect(() => {
        // Fetch the member data from the session when the component mounts
        axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`)
            .then(response => {
                const data = response.data;
                setFormData({
                    memnum: data.memnum,
                    memid: data.memid,
                    memname: data.memname,
                    email1: data.email.split('@')[0],
                    email2: data.email.split('@')[1],
                    mobile01: data.pnumber.split('-')[0],
                    phoneMiddle: data.pnumber.split('-')[1],
                    phoneLast: data.pnumber.split('-')[2],
                    postcode: data.postcode,
                    firstaddress: data.firstaddress,
                    secondaddress: data.secondaddress
                });
                setMemnum(data.memnum);
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
            });
    }, [memid]);

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
            return false;
        } else if (!regex.test(setpwd)) {
            setMessage('비밀번호는 영문+숫자 조합 8자 이상이어야 합니다.');
            setMessageColor('red');
            return false;
        } else {
            setMessage('비밀번호가 일치합니다.');
            setMessageColor('green');
            return true;
        }
    };

    const sendPassword = (password) => {
        return password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("필수 정보를 입력해주세요!");
            return;
        }

        const phoneNumber = `${formData.mobile01}-${formData.phoneMiddle}-${formData.phoneLast}`;
        const email = `${formData.email1}@${formData.email2}`;
        const dataToSend = {
            mempwd: sendPassword(setpwd),
            email: email,
            pnumber: phoneNumber,
            postcode: formData.postcode,
            firstaddress: formData.firstaddress,
            secondaddress: formData.secondaddress
        };

        try {
            const response = await axios.post(`http://localhost:8000/shopping/api/updateMember/${memnum}`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            alert("회원정보가 수정되었습니다.");
            window.location.href = '/Main';
        } catch (error) {
            console.error('There was an error!', error);
        }
    };



    const handleDelete = async () => {
        const confirmDelete = window.confirm("회원탈퇴하시겠습니까?");
        if (!confirmDelete) {
            return; // 사용자가 취소를 선택한 경우 탈퇴 요청을 보내지 않음
        }

        try {
            const response = await axios.post(`http://localhost:8000/shopping/api/deleteMember/${memnum}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if (response.data.status === 200 && response.data.data === 1) {
                alert("회원탈퇴에 성공했습니다.");
                sessionStorage.removeItem('memname');
                window.location.href = '/Main';
            } else if (response.data.status === 404 && response.data.data === -1) {
                alert('회원을 찾지 못했습니다.');
            } else {
                alert('회원탈퇴에 실패했습니다.');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };


    const validateForm = () => {
        const requiredFields = ['memname', 'firstaddress', 'email1', 'email2', 'phoneMiddle', 'phoneLast'];
        for (let field of requiredFields) {
            if (!formData[field].trim()) {
                return false;
            }
        }
        if (!checkPasswords()) {
            return false;
        }

        return true;
    };


    const handleReset = () => {
        setFormData({
            ...formData,
            mempwd: '',
            checkmempwd: '',
            postcode: '',
            firstaddress: '',
            secondaddress: ''
        });
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
        <div>
            <Header />
            <section>
                <div className="modify_detail">
                    <h2 className='Modifyh2'>회원 정보 수정</h2>
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

                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <div>
                            <p className='basic_info'>기본 정보</p>
                            <br />
                            <p className='need'>* 필수 입력 사항</p>
                            <br />
                            <table className="join_section_table2">
                                <tbody>
                                    <tr>
                                        <td htmlFor="memid" className='id'>아이디</td>
                                        <td><input
                                            type="text"
                                            id="memid"
                                            name="memid"
                                            value={formData.memid}
                                            readOnly
                                            className="valid"
                                        /></td>
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
                                                onBlur={() => checkPasswords()}
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
                                                onBlur={() => checkPasswords()}
                                            />
                                            <br />
                                            <span id="pwconfirm" style={{ color: messageColor }}>{message}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="modiname" htmlFor="memname">이름</td>
                                        <td>
                                            <input
                                                type="text"
                                                id="memname"
                                                name="memname"
                                                value={formData.memname}
                                                readOnly
                                                className="valid" />
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
                                <tr>
                                    <td colSpan="2">
                                        <input type="button" value="회원탈퇴" id="delete" className='joinput' onClick={handleDelete} />
                                    </td>
                                </tr>
                            </table>
                            <br />
                            <br />
                            <input type="reset" defaultValue="취소" id="cancle" className='cancel-button' />
                            <input type="submit" defaultValue="수정하기" id="finish" className='submit-button' />
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Modify;

