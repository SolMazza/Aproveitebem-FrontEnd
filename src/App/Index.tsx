import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Index";
import Account from "../pages/CreateCont/Index";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
};

export default App;
