import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://192.168.0.83:8081/users/signup', {
                userId,
                password,
                name,
                email
            });

            alert(response.data.message); // "회원가입 완료"
            navigate("/"); // 회원가입 후 로그인 페이지로 이동 (원하면 경로 수정 가능)
        } catch (error) {
            console.error("회원가입 에러:", error);
            alert("회원가입 중 오류 발생");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="text-center mb-4">회원가입</h2>

            <div className="mb-3">
                <label className="form-label">이름</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">이메일</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">아이디</label>
                <input
                    type="text"
                    className="form-control"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
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

            <button className="btn btn-primary w-100" onClick={handleSignup}>회원가입</button>
        </div>
    );
}

export default SignupPage;