import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupUI from "./pages/feature/LoginSignupUI";
import SignupPage from "./pages/feature/Signuppage";
import MainDashboardUI from "./pages/feature/MainDashboardUI";
import AssetPage from "./pages/feature/Assetpage";
import BudgetPage from "./pages/feature/Budgetpage";
import ExpensePage from "./pages/feature/Expensepage";
import MyinfoPage from "./pages/feature/Myinfopage";
import XssDemo from "./pages/feature/demo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignupUI />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/asset" element={<AssetPage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/myinfo" element={<MyinfoPage />} />
        <Route path="/dashboard" element={<MainDashboardUI />} />
      </Routes>
    </Router>
  );
}

export default App;
