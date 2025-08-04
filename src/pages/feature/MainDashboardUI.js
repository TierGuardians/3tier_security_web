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

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("/users/mypage");
          const { user } = response.data.data;
          setUserName(user.name); 
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
        }
      };

      fetchUserInfo();
    }, []);

    const [summary, setSummary] = useState({ asset: 0, expense: 0, budget: 0 });
    useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [assetRes, expenseRes, budgetRes] = await Promise.all([
          axios.get("/assets/total"),
          axios.get("/expenses/monthly-total"),
          axios.get("/budgets/monthly-total"),
        ]);
        setSummary({
          asset: assetRes.data.data || 0,
          expense: expenseRes.data.data || 0,
          budget: budgetRes.data.data || 0,
        });
      } catch (err) {
        console.error("요약 정보 로딩 실패:", err);
      }
    };
    fetchSummary();
  }, []);

  const formatCurrency = (amount) => {
    return "₩" + Number(amount).toLocaleString();
  };


  return (
    <div className={styles.fullBackground}>
      <Card className={`shadow-lg text-center ${styles.dashboardCard}`}>
        <div
          className={styles.header}
          style={{
            transition: "transform 0.8s ease-in-out",
            backgroundColor: "white",
            color: "black",
            animation: "pulseScale 2s infinite alternate",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              userSelect: "none",
              cursor: "default",
            }}
          >
            <img
              src={logo}
              alt="로고"
              draggable={false}
              tabIndex={-1}
              contentEditable={false}
              className={styles.logoImage}
              style={{
                display: "block",
                height: "80px",
                margin: 0,
                padding: 0,
                border: "none",
                userSelect: "none",
                outline: "none",
                cursor: "default",
              }}
            />
          </div>
        </div>

        <div className="text-end me-3 mb-2">
          <span className={styles.username}>
            {userName ? `${userName}님, 안녕하세요 👋` : "환영합니다 👋"}
          </span>
        </div>
        <div className="d-flex justify-content-center gap-4 flex-wrap my-4">
          <div className={`${styles.summaryCard} text-primary`}>
            <i className="bi bi-wallet2 fs-2 mb-2"></i>
            <div>총 자산</div>
            <strong>{formatCurrency(summary.asset)}</strong>
          </div>
          <div className={`${styles.summaryCard} text-danger`}>
            <i className="bi bi-journal-text fs-2 mb-2"></i>
            <div>이번 달 소비</div>
            <strong>{formatCurrency(summary.expense)}</strong>
          </div>
          <div className={`${styles.summaryCard} text-info`}>
            <i className="bi bi-bullseye fs-2 mb-2"></i>
            <div>이번 달 예산</div>
            <strong>{formatCurrency(summary.budget)}</strong>
          </div>
        </div>
        <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
          <div
            className={`${styles.menuCard} ${
              activeModal === "budget" ? styles.active : ""
            }`}
            onClick={() => setActiveModal("budget")}
          >
            <div style={{ display: "block", userSelect: "none", cursor: "default" }}>
              <i className="bi bi-cash-coin mb-2 fs-2"></i>
            </div>
            <div style={{ display: "block", userSelect: "none", cursor: "default" }}>
              예산 관리
            </div>
          </div>

          <div
            className={`${styles.menuCard} ${
              activeModal === "asset" ? styles.active : ""
            }`}
            onClick={() => setActiveModal("asset")}
          >
            <div style={{ display: "block", userSelect: "none", cursor: "default" }}>
              <i className="bi bi-piggy-bank mb-2 fs-2"></i>
            </div>
            <div style={{ display: "block", userSelect: "none", cursor: "default" }}>
              자산 관리
            </div>
          </div>

          <div
            className={`${styles.menuCard} ${
              activeModal === "expense" ? styles.active : ""
            }`}
            onClick={() => setActiveModal("expense")}
          >
            <div style={{ display: "block", userSelect: "none", cursor: "default" }}>
              <i className="bi bi-credit-card-2-front mb-2 fs-2"></i>
            </div>
            <div style={{ display: "block", userSelect: "none", cursor: "default" }}>
              소비 관리
            </div>
          </div>

          <div
            className={`${styles.menuCard} ${styles.wideCard} ${
              activeModal === "myinfo" ? styles.active : ""
            }`}
            onClick={() => setActiveModal("myinfo")}
          >
            <div style={{ display: "block", userSelect: "none", cursor: "default" }}>
              <i className="bi bi-person-circle mb-2 fs-2"></i>
            </div>
            <div style={{ display: "block", userSelect: "none", cursor: "default" }}>
              내 정보
            </div>
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