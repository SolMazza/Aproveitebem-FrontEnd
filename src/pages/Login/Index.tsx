import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import api from "../../Api/api";

interface LoginDto {
  email: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginDto>({ email: "" });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLoginData({ email: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/usuarios/login", loginData);
      
      if (response.status === 200) {
        localStorage.setItem("userEmail", loginData.email);
        localStorage.setItem('usuarioId', response.data.id);
        navigate("/home");
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("E-mail não cadastrado");
      } else {
        setError("Erro ao conectar com o servidor");
      }
      console.error("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <section className="formularioContainer" id="FormularioLogin">
        <img className="logo" id="logoLogin" src="/logoAp.png" alt="Logo" />
        <form className="formulario" id="loginForm" onSubmit={handleSubmit}>
          <h1>Login</h1>

          {error && <div className="error-message">{error}</div>}

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            className="inputAccount"
            placeholder="usuario@gmail.com"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </form>
      </section>

      <div className="recursos" id="AcessosTipos">
        <Link to="/account">
          <p>Criar Conta</p>
        </Link>
      </div>

      <button 
        type="submit" 
        id="BotaoEntrar" 
        form="loginForm"
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : "Entrar"}
      </button>
    </div>
  );
};

export default Login;