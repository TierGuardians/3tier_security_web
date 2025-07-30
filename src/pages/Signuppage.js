import React, { useState } from "react";
import axios from '../config/axiosConfig'; 
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';


function SignupPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const sanitizedData = {
                userId: DOMPurify.sanitize(userId),
                password: password, // 비밀번호는 그대로 전송
                name: DOMPurify.sanitize(name),
                email: DOMPurify.sanitize(email)
            };

            const response = await axios.post('/users/signup', sanitizedData);

            alert(response.data.message || "회원가입 완료");
            navigate("/");
        } catch (error) {
            console.error("회원가입 에러:", error);
            alert(error.response?.data?.message || "회원가입 중 오류 발생");
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

            <button className="btn btn-primary w-100" onClick={handleSignup}>
                회원가입
            </button>
        </div>
    );
}

export default SignupPage;