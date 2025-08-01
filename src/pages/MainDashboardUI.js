import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./MainDashboardUI.module.css";

import BudgetPage from "./Budgetpage";
import AssetPage from "./Assetpage";
import ExpensePage from "./Expensepage";
import MyinfoPage from "./Myinfopage";

import axios from "../config/axiosConfig";


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

  return (
    <div className={styles.fullBackground}>
      <Card className={`shadow-lg text-center ${styles.dashboardCard}`}>
        <h1 className="mb-3">
          <i className="bi bi-graph-up-arrow text-danger me-2"></i>
          <span className={styles.title}>개인 금융 관리 시스템</span>
        </h1>

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
