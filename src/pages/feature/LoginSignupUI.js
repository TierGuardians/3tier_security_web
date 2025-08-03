import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupPage from "./Signuppage";
import styles from "../style/LoginSignupUI.module.css";
import axios from "../../config/axiosConfig";
import DOMPurify from "dompurify";
import loginSchema from "../validation/loginSchema";

function LoginSignupUI() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLogin = async () => {
    try {
      // ✅ yup 유효성 검사
      await loginSchema.validate({ userId, password }, { abortEarly: false });

      const cleanUserId = DOMPurify.sanitize(userId);
      const cleanPassword = DOMPurify.sanitize(password);

      // ✅ API 요청
      const response = await axios.post("/users/login", {
        userId: cleanUserId,
        password: cleanPassword,
      });

      console.log("로그인 응답:", response);

      const { success, code, message, data } = response.data;

      if (success && code === 200) {
        if (data && data.csrfToken) {
          sessionStorage.setItem("csrfToken", data.csrfToken);
          console.log("CSRF 토큰 저장됨:", data.csrfToken);
        } else {
          console.warn("CSRF 토큰이 응답에 없음");
        }

        alert(message || "로그인 성공");
        navigate("/dashboard");
      } else {
        alert("로그인 응답이 올바르지 않습니다.");
      }
    } catch (err) {
      // ✅ yup 유효성 오류 메시지 처리
      if (err.name === "ValidationError") {
        alert(err.errors.join("\n"));
      } else {
        console.error("로그인 실패:", err);
        alert(err.response?.data?.message || "로그인 중 오류 발생");
      }
    }
  };
  const handleSignupRedirect = () => {
    setShowSignupModal(true);
  };

  const closeModal = () => {
    setShowSignupModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>개인 금융 관리 시스템</div>

      <div className={styles["login-box"]}>
        <h3 className={styles["login-title"]}>로그인</h3>

        <div className="mb-3">
          <label className="form-label">아이디</label>
          <input
            type="text"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">비밀번호</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </div>

        <button
          className={`btn btn-primary w-100 ${styles["btn-login"]} mb-2`}
          onClick={handleLogin}
        >
          로그인
        </button>
        <button
          className={`btn btn-secondary w-100 ${styles["btn-signup"]}`}
          onClick={handleSignupRedirect}
        >
          회원가입
        </button>
      </div>

      {/* 모달 부분 */}
      {showSignupModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className="btn btn-sm btn-danger float-end"
              onClick={closeModal}
            >
              X
            </button>
            <SignupPage closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginSignupUI;
