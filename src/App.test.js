import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupUI from "./pages/LoginSignupUI";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signuppage";

function App() {
  return (
  <Routes>
  <Route path="/" element={<LoginSignupUI />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
</Routes>
  );
}

export default App; 



