import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Index";
import Account from "../pages/CreateCont/Index";
import Home from "../pages/Home/Index";
import ListaCompra from "../pages/ListaDeCompra";

const App: React.FC = () => {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/home" element={<Home />} />
        <Route path="/listaCompra" element={<ListaCompra />} />
      </Routes>
    </Router>
    
  );
};

export default App;
