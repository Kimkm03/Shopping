import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Product_add.css';

function ProductAdd() {
    const [formData, setFormData] = useState({
        categorynum: '',
        pname: '',
        price: '',
        pcount: '',
        size: '',
        color: '',
        comment: ''
    });

    const [picture, setPicture] = useState(null);
    const [memberId, setMemberId] = useState(null); // 관리자 확인을 위한 memberId 상태 추가
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 확인 상태 추가

    useEffect(() => {
        // 실제로는 로그인 정보를 가져오는 API 호출이 필요할 수 있습니다.
        // 예시로 간단하게 memberId와 isAdmin 값을 설정합니다.
        const fetchMemberInfo = async () => {
            try {
                // 로그인된 사용자 정보를 가져오는 API 요청
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
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const checkhandleChange = (e) => {
        const { name, value } = e.target;
        let updatedValues = [...formData[name]]; // 기존 formData[name] 배열을 복제하여 사용
        if (e.target.checked) {
            updatedValues.push(value); // 체크된 경우 배열에 추가
        } else {
            updatedValues = updatedValues.filter(val => val !== value); // 체크 해제된 경우 배열에서 제거
        }
        setFormData({
            ...formData,
            [name]: updatedValues
        });
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
        productData.append('memberId', memberId); // memberId 추가
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
                        <p>* 기본 정보</p>
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
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="sizeXS"
                                                name="size"
                                                value="XS"
                                                checked={formData.size.includes("XS")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="sizeXS">XS</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="sizeS"
                                                name="size"
                                                value="S"
                                                checked={formData.size.includes("S")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="sizeS">S</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="sizeM"
                                                name="size"
                                                value="M"
                                                checked={formData.size.includes("M")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="sizeM">M</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="sizeL"
                                                name="size"
                                                value="L"
                                                checked={formData.size.includes("L")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="sizeL">L</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="sizeXL"
                                                name="size"
                                                value="XL"
                                                checked={formData.size.includes("XL")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="sizeXL">XL</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="sizeXXL"
                                                name="size"
                                                value="XXL"
                                                checked={formData.size.includes("XXL")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="sizeXXL">XXL</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="sizeXXXL"
                                                name="size"
                                                value="XXXL"
                                                checked={formData.size.includes("XXXL")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="sizeXXXL">XXXL</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="sizeFREE"
                                                name="size"
                                                value="FREE"
                                                checked={formData.size.includes("FREE")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="sizeFREE">FREE</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td_1">* 색상</td>
                                    <td className="td_2">
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorBLACK"
                                                name="color"
                                                value="BLACK"
                                                checked={formData.color.includes("BLACK")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorBLACK">BLACK</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorWHITE"
                                                name="color"
                                                value="WHITE"
                                                checked={formData.color.includes("WHITE")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorWHITE">WHITE</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorGREEN"
                                                name="color"
                                                value="GREEN"
                                                checked={formData.color.includes("GREEN")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorGREEN">GREEN</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorYELLOW"
                                                name="color"
                                                value="YELLOW"
                                                checked={formData.color.includes("YELLOW")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorYELLOW">YELLOW</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorBLUE"
                                                name="color"
                                                value="BLUE"
                                                checked={formData.color.includes("BLUE")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorBLUE">BLUE</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorSKYBLUE"
                                                name="color"
                                                value="SKYBLUE"
                                                checked={formData.color.includes("SKYBLUE")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorSKYBLUE">SKYBLUE</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorPURPLE"
                                                name="color"
                                                value="PURPLE"
                                                checked={formData.color.includes("PURPLE")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorPURPLE">PURPLE</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorRED"
                                                name="color"
                                                value="RED"
                                                checked={formData.color.includes("RED")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorRED">RED</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="colorORANGE"
                                                name="color"
                                                value="ORANGE"
                                                checked={formData.color.includes("ORANGE")}
                                                onChange={checkhandleChange}
                                            />
                                            <label htmlFor="colorORANGE">ORANGE</label>
                                        </div>
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
