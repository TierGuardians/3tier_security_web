import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupPage from "./Signuppage";
import styles from "../style/LoginSignupUI.module.css";
import axios from "../../config/axiosConfig";
import DOMPurify from "dompurify";
import loginSchema from "../validation/loginSchema";
import logo from "../../assets/logo.png";

function LoginSignupUI() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});



  const handleLogin = async () => {
    try {
      await loginSchema.validate({ userId, password }, { abortEarly: false });
        setErrors({}); 
        setTouched({ userId: true, password: true });



      const cleanUserId = DOMPurify.sanitize(userId);
      const cleanPassword = DOMPurify.sanitize(password);

      const response = await axios.post("/users/login", {
        userId: cleanUserId,
        password: cleanPassword,
      });

      const { success, code, message, data } = response.data;

      if (success && code === 200) {
        if (data && data.csrfToken) {
          sessionStorage.setItem("csrfToken", data.csrfToken);
        }

        alert(message || "로그인 성공");
        navigate("/dashboard");
      } else {
        alert("로그인 응답이 올바르지 않습니다.");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const fieldErrors = {};
        err.inner.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors); 
        setTouched({ userId: true, password: true });} 
      else{
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
      <div className={styles["login-box"]}>
        <div
        className={styles.header}
        style={{
          transition: "transform 0.8s ease-in-out",
          backgroundColor: "white",
          color: "black",
          animation: "pulseScale 2s infinite alternate"
        }}
      >
       <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
          userSelect: "none",
          cursor: "default"
       }}
>
    <img
      src={logo}
     alt="로고"
      draggable={false}
      tabIndex={-1}
      contentEditable={false}
      style={{
        display: "block",           
        height: "60px",
        margin: 0,
        padding: 0,
        border: "none",
        userSelect: "none",
        cursor: "default"
       }}
       />
      </div>
      </div>
        <h3 className={styles["login-title"]}>Login</h3>

        <div className="mb-3">
          <label className="form-label">아이디</label>
          <input
            type="text"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onBlur={() => setTouched({ ...touched, userId: true })}

            placeholder="ID"
          />
         {touched.userId && errors.userId && (
            <div style={{ fontSize: "0.875rem" }} className="text-danger">
              {errors.userId}
            </div>
  )}
        </div>

        <div className="mb-3">
          <label className="form-label">비밀번호</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched({ ...touched, password: true })}

            placeholder="Password"
          />
       {touched.password && errors.password && (
        <div style={{ fontSize: "0.875rem" }} className="text-danger">
         {errors.password}
        </div>
  )}
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
