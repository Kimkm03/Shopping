import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Main from './Page/Main';
import Join from './Page/Join';
import New_products from './Page/New_products';
import Best_products from './Page/Best_products';
import Product from './Page/Product';
import Stylecodi from './Page/Stylecodi';
import StylecodiDetail from './Page/StylecodiDetail';
import OUTER from './Page/OUTER';
import TOP from './Page/TOP';
import PANTS from './Page/PANTS';
import Basket from './Page/Basket';
import Order from './Page/Order';
import Mileage_collect from './Page/Mileage_collect';
import Board_main from './Page/Board_main';
import Delivery_check from './Page/Delivery_check';
import Mypage from './Page/Mypage'; // Mypage 컴포넌트 import
import Login from './Page/Login';
import Modify from './Page/Modify';
import Payment from './Page/Payment';
import Wishlist from './Page/Wishlist';
import Write_review from './Page/Write_review';
import Product_add from './Page/Product_add';
import Management from './Page/Management';
import Search from './Page/Search';
import Mg_Product from './Page/Mg_Product';
import Mg_Member from './Page/Mg_Member';
import Mg_Orderlist from './Page/Mg_Orderlist';
import Mg_Review from './Page/Mg_Review';
import Mg_Total from './Page/Mg_Total';
import Mg_Inquiry from './Page/Mg_Inquiry';
import Write_inquiry from './Page/Write_inquiry';
import Write_inquiry_detail from './Page/Write_inquiry_detail';
import Write_inquiry_reply from './Page/Write_inquiry_reply';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Main" element={<Main />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/New_products" element={<New_products />} />
          <Route path="/Best_products" element={<Best_products />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/Stylecodi" element={<Stylecodi />} />
          <Route path="/StylecodiDetail" element={<StylecodiDetail />} />
          <Route path="/OUTER" element={<OUTER />} />
          <Route path="/top" element={<TOP />} />
          <Route path="/PANTS" element={<PANTS />} />
          <Route path="/Basket" element={<Basket />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/Mileage_collect" element={<Mileage_collect />} />
          <Route path="/Board_main" element={<Board_main />} />
          <Route path="/Delivery_check" element={<Delivery_check />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Modify" element={<Modify />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Write_review" element={<Write_review />} />
          <Route path="/Mypage" element={<Mypage />} /> {/* Mypage 경로 추가 */}
          <Route path="/Product_add" element={<Product_add />} />
          <Route path="/Management" element={<Management />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Mg_Product" element={<Mg_Product />} />
          <Route path="/Mg_Member" element={<Mg_Member />} />
          <Route path="/Mg_Orderlist" element={<Mg_Orderlist />} />
          <Route path="/Mg_Review" element={<Mg_Review />} />
          <Route path="/Mg_Total" element={<Mg_Total />} />
          <Route path="/Mg_Inquiry" element={<Mg_Inquiry />} />
          <Route path="/Write_inquiry" element={<Write_inquiry />} />
          <Route path="/Write_inquiry_detail/:boardId" element={<Write_inquiry_detail />} />
          <Route path="/Write_inquiry_reply/:boardId" element={<Write_inquiry_reply />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
