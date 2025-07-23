import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; //정보 전달용 라이브러리


function LoginPage() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin=async () => {
    try {
      const response = await axios.post('http://192.168.0.83:8081/users/login', {
        userId: username,
        password: password
      });

      if (response.data.success) {
        localStorage.setItem('userId',username);
        alert(response.data.message);
        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 중 에러 발생");
    }
  };

   const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">로그인</h2>
            
            <div className="mb-3">
                <label className="form-label">아이디</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">비밀번호</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
                로그인
            </button>

            <button className="btn btn-secondary w-100" onClick={handleSignupRedirect}>
                회원가입
            </button>
        </div>
  );
}

export default LoginPage;
