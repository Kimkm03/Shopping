import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div>
            <section className="end_banner_section">
                <table className="end_banner">
                    <tbody>
                        <tr>
                            <td className="end">
                                CENTER <br />
                                <p className="end_p">call. 010-8304-7694 <br />
                                평일 am 10:00 ~ pm 17:00 <br />
                                토일 휴무 </p><br />
                                ACCOUNT <br />
                                <p className="end_p">신한 110-258-839777 <br />
                                예금주 : 강민태</p>
                            </td>
                            <td className="end">
                                <div className='end_logo'></div>
                            </td>
                            <td className="end">
                                OWNER . 강민태, 김경모 <br />
                                ADDRESS . 부천대학교 <br />
                                졸업작품
                            </td>
                            <td className="end">
                                고객 반품 주소 <br />
                                <p className="end_p">부천대학교 꿈집 6층 </p><br />
                                * 접수전 문의 필수 * <br /><br />
                                SNS <br />
                                <a href="#" className="end_sns">INSTAGRAM</a><br />
                                <a href="#" className="end_sns">FACEBOOK</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Footer;
