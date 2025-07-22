import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Mypage from "./pages/Mypage";
import SignupPage from "./pages/Signuppage";
import Myinfopage from "./pages/Myinfopage";
import AssetPage from "./pages/Assetpage";


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">로그인</Link> |<Link to="/mypage">마이페이지</Link>|<Link to="/signup">회원가입</Link>|<Link to="/myinfo">사용자 정보</Link>|<Link to="/asset">자산</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/myinfo" element={<Myinfopage />} />
        <Route path="/asset" element={<AssetPage />} />
      </Routes>
    </Router>
  );
}

export default App;
