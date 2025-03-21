import { useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <div className="container">
      <section className="formularioContainer" id="FormularioLogin">
        <img className="logo" id="logoLogin" src="/logoAp.png" alt="Logo" />
        <form className="formulario" id="loginForm" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            className="inputAccount"
            placeholder="usuario@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            className="inputAccount"
            placeholder="Senha!forte180"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </section>

      <div className="recursos" id="AcessosTipos">
        <Link to="/account">
          <p>Criar Conta</p>
        </Link>
        <p>Esqueci a Senha</p>
      </div>

      <button type="submit" id="BotaoEntrar" form="loginForm">
        Entrar
      </button>
    </div>
  );
};

export default Login;
