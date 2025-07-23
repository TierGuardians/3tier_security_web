import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./MainDashboardUI.module.css";

// 필요한 컴포넌트 import
import BudgetPage from "./Budgetpage";
import AssetPage from "./Assetpage";
import ExpensePage from "./Expensepage";
import MyinfoPage from "./Myinfopage";

function MainDashboardUI() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'budget' | 'asset' | 'expense' | 'myinfo' | null

  const handleLogout = () => {
    localStorage.removeItem("userId");
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

  return (
    <>
      <Container className="main-container d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="dashboard-title">
          <i className="bi bi-graph-up-arrow me-2 text-danger"></i>
          개인 금융 관리 시스템
        </h1>

        <div className="dashboard-buttons w-100 d-flex flex-column align-items-center">
          <Button className="btn btn-outline-dark mb-3 w-50" onClick={() => setActiveModal("budget")}>예산 관리</Button>
          <Button className="btn btn-outline-dark mb-3 w-50" onClick={() => setActiveModal("asset")}>자산 관리</Button>
          <Button className="btn btn-outline-dark mb-3 w-50" onClick={() => setActiveModal("expense")}>소비 내역</Button>
          <Button className="btn btn-outline-dark mb-5 w-50" onClick={() => setActiveModal("myinfo")}>내 정보</Button>
        </div>

        <div className="logout-container text-end w-100 pe-5">
          <Button variant="link" className="text-muted logout-link" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </Container>

      {activeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className="btn btn-sm btn-danger float-end" onClick={closeModal}>X</button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </>
  );
}

export default MainDashboardUI;