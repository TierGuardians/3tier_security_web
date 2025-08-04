import React, { useState } from "react";
import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import signupSchema from "../validation/signupSchema";

function SignupPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async () => {
    const sanitizedData = {
      userId: DOMPurify.sanitize(userId),
      password,
      name: DOMPurify.sanitize(name),
      email: DOMPurify.sanitize(email),
    };

    try {
      await signupSchema.validate(sanitizedData, { abortEarly: false });
      setErrors({}); 

      const response = await axios.post("/users/signup", sanitizedData);
      alert(response.data.message || "회원가입 완료");
      navigate("/");
    } catch (err) {
      if (err.name === "ValidationError") {
        const fieldErrors = {};
        err.inner.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors); 
      } else {
        alert("회원가입 중 오류 발생");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">회원가입</h2>

      <div className="mb-3">
        <label className="form-label">이름</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">이메일</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">아이디</label>
        <input
          type="text"
          className="form-control"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        {errors.userId && <div className="text-danger">{errors.userId}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">비밀번호</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small className="form-text text-muted">
          8자 이상 / 영문자,숫자,특수문자 포함 / 공백 없이 입력해주세요
        </small>
        {errors.password && (
          <div className="text-danger">{errors.password}</div>
        )}
      </div>

      <button className="btn btn-primary w-100" onClick={handleSignup}>
        회원가입
      </button>
    </div>
  );
}

export default SignupPage;
