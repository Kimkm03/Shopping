import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

function Header() {
  // 회원 이름 상태 변수 추가
  const [username, setUsername] = useState(sessionStorage.getItem('memname'));
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 변수 추가
  const [cartItemCount, setCartItemCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    }
  };


  // 실제로 로그인 여부에 따라 표시되는 내용을 변경해야 함
  const isLoggedIn = username !== null;

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('memname');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // isAdmin 상태 업데이트 로직 (예: 서버에서 가져온 관리자 정보를 확인하는 로직)
    const fetchAdminInfo = async () => {
      try {
        const memid = sessionStorage.getItem("memid");
        const response = await axios.get(`http://localhost:8000/shopping/api/mypage/${memid}`);
        const isAdmin = response.data.admintype;
        setIsAdmin(isAdmin); // 예시: 서버 응답에서 관리자 타입을 가져와 설정
      } catch (error) {
        console.error('관리자 정보 가져오기 실패:', error);
      }
    };

    const fetchCartItemCount = async () => {
      try {
        const memid = sessionStorage.getItem("memid");
        const response = await axios.get(`http://localhost:8000/shopping/api/cart/${memid}/count`);
        setCartItemCount(response.data); // 서버에서 장바구니에 있는 상품 수량을 가져와 상태 업데이트
      } catch (error) {
        console.error('장바구니 상품 수량 가져오기 실패:', error);
      }
    };

    const storedIsAdmin = sessionStorage.getItem('isAdmin') === 'true';
    setIsAdmin(storedIsAdmin);

    if (isLoggedIn) {
      fetchAdminInfo();
      fetchCartItemCount(); // 컴포넌트가 마운트될 때와 장바구니가 업데이트될 때마다 호출
    }
  }, [isLoggedIn]);



  const logout = () => {
    sessionStorage.removeItem('memname');
    sessionStorage.removeItem('isAdmin');
    setUsername(null);
    setIsAdmin(false);
    navigate("/Main");
  };

  return (
    <header className="fixed">
      <div className="head_wrap">
        <div className="main_logo">
          <Link to="/Main"><div className="logo_link"></div></Link>
        </div>
        <div className="gnd_wrap">
          <div className="gnd">
            <ul>
              <li><Link to="/New_products">신상품</Link></li>
              <li><Link to="/best_products">인기상품</Link></li>
              <li><Link to="/stylecodi">스타일</Link></li>
              <li><Link to="/outer">OUTER</Link></li>
              <li><Link to="/top">TOP</Link></li>
              <li><Link to="/pants">BOTTOM</Link></li>
              {/* 관리자 메뉴 추가 */}
              {isAdmin && (
                <li>
                  <Link to="/Management">관리자</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <ul className="head_myshop">
          <li>
            <div className="search_bar_box">
              <form onSubmit={handleSearch} className='search_bar_box_set'>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search for products..."  
                  className='searchtxtinput'
                />
                <button type="submit" className="btn_search">
                  <img src="https://i.postimg.cc/cH85Hwp5/search-btn2.png" alt="Search" />
                </button>
              </form>
            </div>
          </li>{/*
          <li className="btn_search">
            <Link to="/search"><img src="https://i.postimg.cc/cH85Hwp5/search-btn2.png" alt="Search" /></Link>
          </li> */}
          <li className='user_menu'>
            <Link to="/mypage"><img src='https://i.postimg.cc/cJtVKpYm/my-icon.png' alt='mypage' /></Link>
          </li>
          {/* 회원 이름 또는 로그인 버튼 표시 */}
          {isLoggedIn ? (
            <>
              <li className="username">
                <span>{username}님</span>
              </li>
              <li className="logout">
                <button onClick={logout}>로그아웃</button>
              </li>
            </>
          ) : (
            <li className="login">
              <Link to="/login"><span>로그인</span></Link>
            </li>
          )}
          <li className="btn_basket">
            <Link to="/basket"><img src="https://i.postimg.cc/DfPRbdWt/bag-icon.png" alt="Basket" /></Link>
            <span className="cnt">
              <span>{cartItemCount}</span> {/* 상품 수량 상태 변수 출력 */}
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
