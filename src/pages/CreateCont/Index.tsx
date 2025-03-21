import { useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const Account: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <div className="container">
      <section className="formularioContainer" id="FormularioAccount">
        <img className="logo" id="logoAccount" src="/logoAp.png" alt="Logo" />
        <form className="formulario" id="AccountForm" onSubmit={handleSubmit}>
          <h1>Criar Conta</h1>

          <label htmlFor="nomeCompleto">Nome Completo</label>
          <input
            id="nomeCompleto"
            className="inputAccount"
            placeholder="Seu Nome Completo"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
        <Link to="/login">
        <p>Login</p>
        </Link>
        <p>Esqueci a Senha</p>
      </div>

      <button type="submit" id="BotaoCriarConta" form="AccountForm">
        Criar Conta
      </button>
    </div>
  );
};

export default Account;
