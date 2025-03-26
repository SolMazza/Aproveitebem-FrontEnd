import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import api from "../../Api/api";
import { UsuarioRequestDto } from "../../interface/UsuarioData";

const Account: React.FC = () => {
  const [formData, setFormData] = useState<UsuarioRequestDto>({
    nomeCompleto: "",
    email: "",
    senha: ""
  });

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
        const response = await api.post("/usuarios/cadastrar", {
            nomeCompleto: formData.nomeCompleto,
            email: formData.email,
            senha: formData.senha
        });
        
        console.log("Resposta completa:", response);
        navigate("/");
    } catch (err: any) {
        console.error("Detalhes do erro:", err.response);
        setError(err.response?.data?.message || "Erro ao cadastrar");
    }
}

  return (
    <div className="container">
      <section className="formularioContainer" id="FormularioAccount">
        <img className="logo" id="logoAccount" src="/logoAp.png" alt="Logo" />
        <form className="formulario" id="AccountForm" onSubmit={handleSubmit}>
          <h1>Criar Conta</h1>
          
          {error && <div className="error-message">{error}</div>}

          <label htmlFor="nomeCompleto">Nome Completo</label>
          <input
            id="nomeCompleto"
            className="inputAccount"
            placeholder="Seu Nome Completo"
            type="text"
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            className="inputAccount"
            placeholder="usuario@gmail.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            className="inputAccount"
            placeholder="Senha!forte180"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            minLength={6}
            required
          />
        </form>
      </section>

      <div className="recursos" id="AcessosTipos">
        <Link to="/">
          <p>Já tem conta? Faça login</p>
        </Link>
      </div>

      <button type="submit" id="BotaoCriarConta" form="AccountForm">
        Criar Conta
      </button>
    </div>
  );
};

export default Account;