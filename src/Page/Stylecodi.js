
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Stylecodi.css';
import { Link } from 'react-router-dom';

function Stylecodi() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [styles, setStyles] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        gender: '',
        season: '',
        tpo: '',
        color1: ''
    });

    const [appliedFilters, setAppliedFilters] = useState({});

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilters({
            ...selectedFilters,
            [name]: value
        });
    };

    const applyFilters = async () => {
        try {
            // 필터 값으로 API 요청을 위한 params 설정
            const params = {
                gender: selectedFilters.gender || undefined,
                season: selectedFilters.season || undefined,
                tpo: selectedFilters.tpo || undefined,
                uppercolor: selectedFilters.color1 || undefined,
            };

            // GET 요청을 통해 필터된 스타일 데이터를 가져옴
            const response = await axios.get('http://localhost:8000/shopping/api/style/filter', { params });
            setStyles(response.data); // 받은 스타일 데이터를 상태에 저장

            // 선택된 필터들을 적용된 필터로 저장
            setAppliedFilters(selectedFilters); // 적용된 필터 상태 관리

            // 필터 창 닫기
            closeFilter();
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    };


    useEffect(() => {
        // 데이터 가져오기
        const fetchStyles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/shopping/api/style/all'); // Spring API 엔드포인트
                setStyles(response.data); // 스타일 데이터 설정
            } catch (error) {
                console.error('Failed to fetch order data:', error);
                alert('서버에서 데이터를 받아올 수 없습니다. 나중에 다시 시도해주세요.');
            }
        };

        fetchStyles();
    }, []); // 컴포넌트가 마운트될 때 한 번만 호출

    if (styles.length === 0) {
        return <div>스타일이 없습니다.</div>;
    }

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear(); // 연도 추출
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 1을 더하고, 2자리로 포맷팅)
        const day = date.getDate().toString().padStart(2, '0'); // 일, 2자리로 포맷팅

        return `${year}${month}${day}`; // 형식: YYYYMMDD
    };


    return (
        <div>
            <Header />
            <div class="codiwrap">
                <div class="codicontainer">
                    <div class="codicontents">
                        <div class="top_div">
                            <div className='filter_box'>
                                <button className='filter_btn' onClick={toggleFilter}> <img src='/filtericon.png' className='flitericonimg' /> </button>
                                <p className='keywordload'>
                                    {Object.values(appliedFilters).some(filter => filter) ? (
                                        Object.values(appliedFilters).map((filter, index) => (
                                            filter && <span key={index} className="applied_filter">#{filter}</span>
                                        ))
                                    ) : (
                                        <span className="applied_filter">전체</span>
                                    )}
                                </p>
                            </div>
                            <div className={`filterback ${isFilterOpen ? 'active' : ''}`}>
                                <div className='filtersection'>
                                    <div> <button className='filter_canclebtn' onClick={closeFilter}> X </button> 필터 </div>
                                    <div className='filtermain'>
                                        <p className='filter_tit'>Gender</p>
                                        <div className='filter_chobox'>
                                            <label className='filterla'> 남자 <input type='radio' name='gender' value={'남자'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 여자 <input type='radio' name='gender' value={'여자'} onChange={handleFilterChange} /></label>
                                        </div>
                                    </div>
                                    <div className='filtermain'>
                                        <p className='filter_tit'>Season</p>
                                        <div className='filter_chobox'>
                                            <label className='filterla'> 봄 <input type='radio' name='season' value={'봄'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 여름 <input type='radio' name='season' value={'여름'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 가을 <input type='radio' name='season' value={'가을'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 겨울 <input type='radio' name='season' value={'겨울'} onChange={handleFilterChange} /></label>
                                        </div>
                                    </div>
                                    <div className='filtermain'>
                                        <p className='filter_tit'>TPO</p>
                                        <div className='filter_chobox'>
                                            <label className='filterla'> 바다 <input type='radio' name='tpo' value={'바다'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 여행 <input type='radio' name='tpo' value={'여행'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 캠퍼스 <input type='radio' name='tpo' value={'캠퍼스'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 카페 <input type='radio' name='tpo' value={'카페'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 데이트 <input type='radio' name='tpo' value={'데이트'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 결혼식 <input type='radio' name='tpo' value={'결혼식'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 출근 <input type='radio' name='tpo' value={'출근'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'> 데일리 <input type='radio' name='tpo' value={'데일리'} onChange={handleFilterChange} /></label>
                                        </div>
                                    </div>
                                    <div className='filtermain'>
                                        <p className='filter_tit'>상의색상</p>
                                        <div className='filter_chobox'>
                                            <label className='filterla'><img src="/color-black.png" className='colorimg' /> BLACK <input type='radio' name='color1' value={'BLACK'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-navy.png" className='colorimg' /> NAVY <input type='radio' name='color1' value={'NAVY'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-grey.png" className='colorimg' /> GREY <input type='radio' name='color1' value={'GREY'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-white.png" className='colorimg' /> WHITE <input type='radio' name='color1' value={'WHITE'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-green.png" className='colorimg' /> GREEN <input type='radio' name='color1' value={'GREEN'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-yellow.png" className='colorimg' /> YELLOW <input type='radio' name='color1' value={'YELLOW'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-blue.png" className='colorimg' /> BLUE <input type='radio' name='color1' value={'BLUE'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-skyblue.png" className='colorimg' /> SKYBLUE <input type='radio' name='color1' value={'SKYBLUE'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-purple.png" className='colorimg' /> PURPLE <input type='radio' name='color1' value={'PURPLE'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-red.png" className='colorimg' /> RED <input type='radio' name='color1' value={'RED'} onChange={handleFilterChange} /></label>
                                            <label className='filterla'><img src="/color-orange.png" className='colorimg' /> ORANGE <input type='radio' name='color1' value={'ORANGE'} onChange={handleFilterChange} /></label>
                                        </div>
                                    </div>
                                    <button className='filter_savebtn' onClick={applyFilters}> 적용하기 </button>
                                </div>
                            </div>
                            {/* <div style={{display: 'block'}}>
                        <a href=""><img class="top_div_img" src={`${process.env.PUBLIC_URL}/styleimg.jpg`} alt=""/>
                        </a>
                    </div> */}
                        </div>

                        <div class="middle_div">
                            <div class="codi_title">
                                <p class="codi_title_text">스타일 랭킹을 통해 트렌디를 확인하세요.</p>
                            </div>
                        </div>

                        <div className="bottom_div">
                            <div className="stylecodi_list">
                                <ul className="ranking_list">
                                    {styles.map((style, index) => (
                                        <li key={style.id}>
                                            <div className="codithumbnail">
                                                <span className="list_top_label">{index + 1}</span>
                                                <div className="list_img">
                                                    <Link to={`/stylecodidetail/${style.id}`}>
                                                        <img src={`${process.env.PUBLIC_URL}/style${index + 1}.jpg`} alt={style.name} />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="codithumbnailinfo">
                                                <ul className="spec">
                                                    <li className="simple">{formatDate(style.createDate)}</li> {/* 날짜 */}
                                                    <li className="simple2">
                                                        <span>{style.height}cm</span>
                                                        <b> / </b>
                                                        <span>{style.weight}kg</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    );
};

export default Stylecodi;