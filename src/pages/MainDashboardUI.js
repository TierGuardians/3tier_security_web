// MainDashboardUI.js + 간단한 소비 내역 그래프 시각화 추가
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./MainDashboardUI.module.css";

import BudgetPage from "./Budgetpage";
import AssetPage from "./Assetpage";
import ExpensePage from "./Expensepage";
import MyinfoPage from "./Myinfopage";

import axios from "../pages/axiosConfig";


function MainDashboardUI() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [expenseSummary, setExpenseSummary] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
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

  useEffect(() => {
    axios.get("/expenses/summary")
      .then(res => {
        setExpenseSummary(res.data.data || []);
      })
      .catch(err => {
        console.error("소비 요약 조회 실패:", err);
        if (err.response?.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          handleLogout();
        }
      });
  }, []);

  return (
    <div className={styles.fullBackground}>
      <Card className={`shadow-lg text-center ${styles.dashboardCard}`}>
        <h1 className="mb-3">
          <i className="bi bi-graph-up-arrow text-danger me-2"></i>
          <span className={styles.title}>개인 금융 관리 시스템</span>
        </h1>

        <p className="text-muted mb-4">예산, 자산, 소비 내역을 한눈에 관리하세요.</p>

        {expenseSummary.length > 0 && (
          <div style={{ width: "100%", height: 240 }} className="mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseSummary} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="d-grid gap-3">
          <Button className={styles.menuButton} onClick={() => setActiveModal("budget")}>월 예산 관리</Button>
          <Button className={styles.menuButton} onClick={() => setActiveModal("asset")}>자산 관리</Button>
          <Button className={styles.menuButton} onClick={() => setActiveModal("expense")}>소비내역 관리</Button>
          <Button className={styles.menuButton} onClick={() => setActiveModal("myinfo")}>내 정보</Button>
        </div>

        <div className="mt-4 text-end">
          <Button variant="link" className="text-muted" onClick={handleLogout}>로그아웃</Button>
        </div>
      </Card>

      {activeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className="btn btn-sm btn-danger float-end" onClick={closeModal}>X</button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainDashboardUI;
