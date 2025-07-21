import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Mypage from "./pages/Mypage";
import SignupPage from "./pages/Signuppage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">로그인</Link> |<Link to="/mypage">마이페이지</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
