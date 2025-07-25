import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupPage from "./Signuppage";
import styles from "./LoginSignupUI.module.css";
import axios from "axios";

function LoginSignupUI() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.83:8081/users/login', {
        userId,
        password
      });

      if (response.data.success && (response.data.code) == 200) {  // 검증 강화
        localStorage.setItem("userId", userId)
        alert(response.data.message);
        navigate("/dashboard");
      } else {
        alert("로그인 오류 발생");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("로그인 오류 발생");
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
            <button className="btn btn-sm btn-danger float-end" onClick={closeModal}>
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