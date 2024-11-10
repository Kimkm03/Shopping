import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StylecodiRegister.css';

function StylecodiRegister() {
    const [photo, setPhoto] = useState(null);
    const memid = sessionStorage.getItem("memid");
    const [formData, setFormData] = useState({
        gender: '',
        season: '',
        tpo: '',
        height: '',
        weight: '',
        uppercolor: '',
        uppersize: '',
        lowercolor: '',
        lowersize: '',
        memnum: '',
        upperpnum: '',
        lowerpnum: ''
    });

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
                setFormData((prevData) => ({
                    ...prevData,
                    memnum: response.data.memnum
                }));
            } catch (error) {
                console.error('Failed to fetch member data:', error);
                alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
            }
        };

        if (memid) {
            fetchMemberData();
        }
    }, [memid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 사진 파일 선택
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleLinkChange = (e) => {
        const { name, value } = e.target;
        const lastNumber = value.match(/\d+$/)?.[0] || ""; // URL에서 마지막 숫자 추출

        setFormData((prevData) => ({
            ...prevData,
            [name === 'upperlink' ? 'upperpnum' : 'lowerpnum']: lastNumber
        }));
    };

    // 데이터 서버 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.gender || !formData.season || !formData.tpo || !formData.height || 
        !formData.weight || !formData.uppercolor || !formData.uppersize || !formData.lowercolor ||
        !formData.lowersize || !formData.memnum || !formData.upperpnum || !formData.lowerpnum || !photo) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('style', JSON.stringify(formData)); // JSON 문자열로 추가
    formDataToSend.append('picture', photo); // 파일 추가

    try {
      const response = await axios.post('http://localhost:8000/shopping/api/style/save', formDataToSend);
      if (response.data.status === 200) {
        alert('스타일이 성공적으로 등록되었습니다.');
        window.location.href = '/Stylecodi';
      }
    } catch (error) {
      console.error('스타일 등록 중 오류가 발생했습니다:', error);
    }
  };

    return (
        <div>
            <div className='codiregdiv'>
                <div className='codiregsection'>
                    <p className='coditabletit'> Stylecodi</p>
                    <table className='coditable'>
                        <tbody>
                            <tr className='coditr1'>
                                <td className='coditd1'>
                                    * 이미지
                                </td>
                                <td className='coditd2'>
                                    <input type="file" name="picture" onChange={handlePhotoChange} required />
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>* 성별</td>
                                <td className='coditd2'>
                                    <div className='filter_chobox'>
                                        <label className='filterla'> 남자 <input type='radio' name='gender' value='남자' onChange={handleChange} /></label>
                                        <label className='filterla'> 여자 <input type='radio' name='gender' value='여자' onChange={handleChange} /></label>
                                    </div>
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>* 계절</td>
                                <td className='coditd2'>
                                    <div className='filter_chobox'>
                                        <label className='filterla'> 봄 <input type='radio' name='season' value='봄' onChange={handleChange} /></label>
                                        <label className='filterla'> 여름 <input type='radio' name='season' value='여름' onChange={handleChange} /></label>
                                        <label className='filterla'> 가을 <input type='radio' name='season' value='가을' onChange={handleChange} /></label>
                                        <label className='filterla'> 겨울 <input type='radio' name='season' value='겨울' onChange={handleChange} /></label>
                                    </div>
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>* TPO</td>
                                <td className='coditd2'>
                                    <div className='filter_chobox'>
                                        {['바다', '여행', '캠퍼스', '카페', '데이트', '결혼식', '출근', '데일리'].map((tpo) => (
                                            <label className='filterla' key={tpo}>
                                                {tpo} <input type='radio' name='tpo' value={tpo} onChange={handleChange} />
                                            </label>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>* 키</td>
                                <td className='coditd2'>
                                    <input type='text' name='height' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>* 몸무게</td>
                                <td className='coditd2'>
                                    <input type='text' name='weight' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>상의 착용 사이즈</td>
                                <td className='coditd2'>
                                    <input type='text' name='uppersize' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>색상</td>
                                <td className='coditd2'>
                                    <div className='filter_chobox'>
                                        {['BLACK', 'NAVY', 'GREY', 'WHITE', 'GREEN', 'YELLOW', 'BLUE', 'SKYBLUE', 'PURPLE', 'RED', 'ORANGE'].map((color) => (
                                            <label className='filterla' key={`upper-${color}`}>
                                                <img src={`/color-${color.toLowerCase()}.png`} className='colorimg' /> {color}
                                                <input type='radio' name='uppercolor' value={color} onChange={handleChange} />
                                            </label>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>상의 상품 링크(URL)</td>
                                <td className='coditd2'>
                                    <input type='text' name='upperlink' onChange={handleLinkChange} />
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>하의 착용 사이즈</td>
                                <td className='coditd2'>
                                    <input type='text' name='lowersize' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>색상</td>
                                <td className='coditd2'>
                                    <div className='filter_chobox'>
                                        {['BLACK', 'NAVY', 'GREY', 'WHITE', 'GREEN', 'YELLOW', 'BLUE', 'SKYBLUE', 'PURPLE', 'RED', 'ORANGE'].map((color) => (
                                            <label className='filterla' key={`lower-${color}`}>
                                                <img src={`/color-${color.toLowerCase()}.png`} className='colorimg' /> {color}
                                                <input type='radio' name='lowercolor' value={color} onChange={handleChange} />
                                            </label>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                            <tr className='coditr1'>
                                <td className='coditd1'>하의 상품 링크(URL)</td>
                                <td className='coditd2'>
                                    <input type='text' name='lowerlink' onChange={handleLinkChange} />
                                </td>
                            </tr>
                            <tr>
                                <td><button className='codipreview_btn'> 미리보기 </button></td>
                                <td><button className='codiupload_btn' onClick={handleSubmit}> 등록하기 </button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StylecodiRegister;