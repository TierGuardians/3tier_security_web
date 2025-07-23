import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupUI from "./pages/LoginSignupUI";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signuppage";
import MainDashboardUI from "./pages/MainDashboardUI";
import AssetPage from "./pages/Assetpage";
import BudgetPage from "./pages/Budgetpage";
import ExpensePage from "./pages/Expensepage";
import MyinfoPage from "./pages/Myinfopage";


function App() {
  return (
<Router>
  <Routes>
  <Route path="/" element={<LoginSignupUI />} />
  <Route path="/login" element={<LoginPage />} />
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



