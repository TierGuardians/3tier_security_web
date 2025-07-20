import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      alert("로그인 성공");
      navigate("/mypage"); // 로그인 성공 시 마이페이지로 이동
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginPage;
