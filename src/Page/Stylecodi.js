import React from 'react';
import Header from '../Components/Header'; // Header 컴포넌트를 import 합니다.
import Footer from '../Components/Footer';
import './Stylecodi.css';
import { Link } from 'react-router-dom';

function Stylecodi(){
    return(
    <div> 
        <Header />
        <div class="codiwrap">
        <div class="codicontainer">
            <div class="codicontents">
                <div class="top_div">
                    <div style={{display: 'block'}}>
                        <img class="top_div_img" src={`${process.env.PUBLIC_URL}/styleimg.jpg`} alt=""/>
                    </div>
                </div>

                <div class="middle_div">
                    <div class="codi_title">
                        <p class="codi_title_text">스타일 뱅킹을 통해 트렌디를 확인하세요.</p>
                    </div>
                </div>

                <div class="bottom_div">
                        <div class="stylecodi_list">
                            <ul class="ranking_list">
                                <li>
                                    <div class="codithumbnail">
                                        <span class="list_top_label">1</span>
                                        <div class="list_img">
                                            <Link to={"/stylecodidetail"}>
                                            <img src={`${process.env.PUBLIC_URL}/style1.jpg`} alt=""/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div class="codithumbnailinfo">
                                        <ul class="spec">
                                            <li class="simple">20230514 TUE 24º</li>
                                            <li class="simple2">
                                                <span>178cm</span>
                                                <b>/</b>
                                                <span>73kg F</span>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div class="codithumbnail">
                                        <span class="list_top_label">2</span>
                                        <div class="list_img">
                                            <a href="stylecodi_detail.html">
                                                <img src={`${process.env.PUBLIC_URL}/style2.jpg`} alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="codithumbnailinfo">
                                        <ul class="spec">
                                            <li class="simple">20230514 TUE 24º</li>
                                            <li class="simple2">
                                                <span>178cm</span>
                                                <b>/</b>
                                                <span>73kg F</span>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div class="codithumbnail">
                                        <span class="list_top_label">3</span>
                                        <div class="list_img">
                                            <a href="stylecodi_detail.html">
                                                <img src={`${process.env.PUBLIC_URL}/style3.jpg`} alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="codithumbnailinfo">
                                        <ul class="spec">
                                            <li class="simple">20230514 TUE 24º</li>
                                            <li class="simple2">
                                                <span>178cm</span>
                                                <b>/</b>
                                                <span>73kg F</span>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div class="codithumbnail">
                                        <span class="list_top_label">4</span>
                                        <div class="list_img">
                                            <a href="stylecodi_detail.html">
                                                <img src={`${process.env.PUBLIC_URL}/style4.jpg`} alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="codithumbnailinfo">
                                        <ul class="spec">
                                            <li class="simple">20230514 TUE 24º</li>
                                            <li class="simple2">
                                                <span>178cm</span>
                                                <b>/</b>
                                                <span>73kg F</span>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
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