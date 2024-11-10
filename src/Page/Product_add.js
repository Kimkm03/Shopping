import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Product_add.css';

function ProductAdd() {
    const [formData, setFormData] = useState({
        categorynum: '',
        subcategorynum: '',
        pname: '',
        price: '',
        pcount: '',
        size: [],
        color: [],
        comment: ''
    });

    const [picture, setPicture] = useState(null);
    const [memberId, setMemberId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const memid = sessionStorage.getItem("memid");
                const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
                setMemberId(response.data.memnum);
                setIsAdmin(response.data.admintype);
            } catch (error) {
                console.error('회원 정보 가져오기 실패:', error);
            }
        };
        fetchMemberInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            // categorynum이 변경될 때는 subcategorynum을 빈 문자열로 초기화
            ...(name === "categorynum" ? { subcategorynum: "" } : {})
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: prevData[name].includes(value)
                ? prevData[name].filter((val) => val !== value)
                : [...prevData[name], value]
        }));
    };

    const handleFileChange = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            alert('관리자만 상품을 등록할 수 있습니다.');
            return;
        }

        const productData = new FormData();
        productData.append('product', JSON.stringify(formData));
        productData.append('picture', picture);
        productData.append('memberId', memberId);

        formData.size.forEach(size => {
            productData.append('size', size);
        });

        formData.color.forEach(color => {
            productData.append('color', color);
        });

        try {
            const response = await axios.post('http://localhost:8000/shopping/api/add', productData);
            if (response.data.status === 200) {
                alert('상품이 성공적으로 등록되었습니다.');
                window.location.href = '/Mg_Product';
            } else {
                alert('상품 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('상품 등록 실패:', error);
            alert('상품 등록에 실패했습니다.');
        }
    };

    return (
        <div>
            <Header />
            <div className="productadd_div">
                <div className="productadd_section">
                    <h2>상품 등록</h2>
                    <form onSubmit={handleSubmit}>
                        <p>*필수</p>
                        <table className="addtable">
                            <tbody>
                                <tr>
                                    <td className="td_1">* 대분류</td>
                                    <td className="td_2">
                                        <select name="categorynum" value={formData.categorynum} onChange={handleChange} required>
                                            <option value="">=필수선택=</option>
                                            <option value="1">OUTER</option>
                                            <option value="2">TOP</option>
                                            <option value="3">BOTTOM</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td_1">* 중분류</td>
                                    <td className="td_2">
                                        <select name="subcategorynum" value={formData.subcategorynum} onChange={handleChange} required>
                                            <option value="">=필수선택=</option>
                                            {formData.categorynum === '1' && (
                                                <>
                                                    <option value="1">패딩</option>
                                                    <option value="2">자켓</option>
                                                    <option value="3">가디건</option>
                                                </>
                                            )}
                                            {formData.categorynum === '2' && (
                                                <>
                                                    <option value="1">후드</option>
                                                    <option value="2">맨투맨</option>
                                                    <option value="3">니트</option>
                                                    <option value="4">반팔</option>
                                                </>
                                            )}
                                            {formData.categorynum === '3' && (
                                                <>
                                                    <option value="1">청바지</option>
                                                    <option value="2">면바지</option>
                                                    <option value="3">트레이닝바지</option>
                                                    <option value="4">반바지</option>
                                                </>
                                            )}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td_1">* 상품명</td>
                                    <td className="td_2"><input type="text" name="pname" value={formData.pname} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="td_1">* 가격</td>
                                    <td className="td_2"><input type="number" name="price" value={formData.price} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="td_1">* 수량</td>
                                    <td className="td_2"><input type="number" name="pcount" value={formData.pcount} onChange={handleChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="td_1">* 사이즈</td>
                                    <td className="td_2">
                                        {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'FREE'].map((size) => (
                                            <div key={size}>
                                                <input
                                                    type="checkbox"
                                                    id={`size${size}`}
                                                    name="size"
                                                    value={size}
                                                    checked={formData.size.includes(size)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor={`size${size}`}>{size}</label>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td_1">* 색상</td>
                                    <td className="td_2">
                                        {['BLACK', 'WHITE', 'GREEN', 'YELLOW', 'BLUE', 'SKYBLUE', 'PURPLE', 'RED', 'ORANGE'].map((color) => (
                                            <div key={color}>
                                                <input
                                                    type="checkbox"
                                                    id={`color${color}`}
                                                    name="color"
                                                    value={color}
                                                    checked={formData.color.includes(color)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor={`color${color}`}>{color}</label>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td_1">이미지 등록</td>
                                    <td className="td_2"><input type="file" name="picture" onChange={handleFileChange} required /></td>
                                </tr>
                                <tr>
                                    <td className="td_1">상품 설명</td>
                                    <td className="td_2"><input type="text" name="comment" value={formData.comment} onChange={handleChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="submitbtn">
                            <input type="submit" value="등록하기" />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductAdd;
