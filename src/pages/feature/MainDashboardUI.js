import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../style/MainDashboardUI.module.css";

import BudgetPage from "./Budgetpage";
import AssetPage from "./Assetpage";
import ExpensePage from "./Expensepage";
import MyinfoPage from "./Myinfopage";

import axios from "../../config/axiosConfig";
import logo from "../../assets/logo.png";
import { MagnetIcon } from "lucide-react";
import 'bootstrap-icons/font/bootstrap-icons.css';

function MainDashboardUI() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.post("/users/logout");
      sessionStorage.removeItem("csrfToken");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "budget":
        return <BudgetPage />;
      case "asset":
        return <AssetPage />;
      case "expense":
        return <ExpensePage />;
      case "myinfo":
        return <MyinfoPage />;
      default:
        return null;
    }
  };

    const [userName, setUserName] = useState("");


    // 사용자 정보 가져오기
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("/users/mypage");
          const { user } = response.data.data;
          setUserName(user.name); // 이름 저장
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
        }
      };

      fetchUserInfo();
    }, []);



  return (
    <div className={styles.fullBackground}>
      <Card className={`shadow-lg text-center ${styles.dashboardCard}`}>
      
        <div
        className={styles.header}
        style={{
          transition: "transform 0.8s ease-in-out",
          backgroundColor: "white",
          color: "black",
          animation: "pulseScale 2s infinite alternate"
        }}
      >
        <img
          src={logo}
          alt="로고"
          style={{ height: "80px", marginBottom:"50px",marginRight: "10px", verticalAlign: "middle" }}
        />
      </div>
        
        {/* <h5 className="mb-3" >
          <i className="bi bi-graph-up-arrow text-danger me-2"></i>
          <span className={styles.title} >개인 금융 관리</span>
        </h5> */}
        <div className="text-end me-3 mb-2">
          <span className={styles.username}>
            {userName ? `${userName}님, 안녕하세요 👋` : "환영합니다 👋"}
          </span>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
          <div
            className={`${styles.menuCard} ${activeModal === "budget" ? styles.active : ""}`}
            onClick={() => setActiveModal("budget")}
          >
            <i className="bi bi-cash-coin mb-2 fs-2"></i>
            <div>예산 관리</div>
          </div>
          <div
            className={`${styles.menuCard} ${activeModal === "asset" ? styles.active : ""}`}
            onClick={() => setActiveModal("asset")}
          >
            <i className="bi bi-piggy-bank mb-2 fs-2"></i>
            <div>자산 관리</div>
          </div>
          <div
            className={`${styles.menuCard} ${activeModal === "expense" ? styles.active : ""}`}
            onClick={() => setActiveModal("expense")}
          >
            <i className="bi bi-credit-card-2-front mb-2 fs-2"></i>
            <div>소비 관리</div>
          </div>
          <div
              className={`${styles.menuCard} ${styles.wideCard} ${activeModal === "myinfo" ? styles.active : ""}`}
              onClick={() => setActiveModal("myinfo")}
            >
              <i className="bi bi-person-circle mb-2 fs-2"></i>
              <div>내 정보</div>
            </div>
        </div>
        
        <div className="mt-4 text-end">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1 text-danger"></i>
            로그아웃
          </button>
        </div>
      </Card>

      {activeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className="btn btn-sm btn-danger float-end"
              onClick={closeModal}
            >
              X
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainDashboardUI;
