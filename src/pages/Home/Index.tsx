import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import api from "../../Api/api";
import { Prateleira, Produto } from "../../interface/PrateleiraData";

const Home = () => {
  const [prateleiras, setPrateleiras] = useState<Prateleira[]>([]);
  const [activeSection, setActiveSection] = useState("geladeira");
  const [expandedPrateleira, setExpandedPrateleira] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    } else {
      setError("Usuário não autenticado");
      setLoading(false);
      navigate("/login");}
  }, [navigate]);

  useEffect(() => {
    const carregarPrateleiras = async () => {
        try {
            setLoading(true);
            const response = await api.get("/prateleiras/minhas-prateleiras");
            setPrateleiras(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao carregar prateleiras");
        } finally {
            setLoading(false);
        }
    };

    carregarPrateleiras();
}, []);

const handleToggleProdutos = (prateleiraId: number) => {
  setExpandedPrateleira(expandedPrateleira === prateleiraId ? null : prateleiraId);
};

const handleAdicionarPrateleira = async () => {
    try {
        const novaPrateleira = { nome: `Prateleira ${prateleiras.length + 1}` };
        const response = await api.post("/prateleiras/cadastrar", novaPrateleira);
        setPrateleiras([...prateleiras, response.data]);
    } catch (err: any) {
        setError(err.message || err.response?.data?.message || "Erro ao adicionar prateleira");
    }
};

  if (loading) return <div className="loading">Carregando...</div>;

  if (error && !userEmail) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
        <Link to="/login" className="login-redirect-btn">
          Ir para página de login
        </Link>
      </div>
    );
  }

  return (    
    <div className="container">
      <header className="Cabecalho">
        <h1>AproveiteBem</h1>
        <div className="header-actions">
          <Link to="/listaCompra" className="carrinho-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </Link>
        </div>
      </header>

      <nav className="secoes-nav">
        <button 
          className={`secao-btn ${activeSection === "geladeira" ? "active" : ""}`}
          onClick={() => setActiveSection("geladeira")}
        >
          Geladeira
        </button>
        <button 
          className={`secao-btn ${activeSection === "armario" ? "active" : ""}`}
          onClick={() => setActiveSection("armario")}
        >
          Armário
        </button>
        <button 
          className={`secao-btn ${activeSection === "freezer" ? "active" : ""}`}
          onClick={() => setActiveSection("freezer")}
        >
          Freezer
        </button>
      </nav>

      {error && <div className="error-message">{error}</div>}

      <div className="prateleiras-container">
        {prateleiras.length > 0 ? (
          prateleiras.map((prateleira) => (
            <div 
              key={prateleira.id} 
              className={`prateleira-card ${expandedPrateleira === prateleira.id ? 'expanded' : ''}`}
            >
              <div className="prateleira-header">
                <h3>{`Prateleira ${prateleira.id}`}</h3>
                <button 
                  className="expand-btn"
                  onClick={() => handleToggleProdutos(prateleira.id)}
                  aria-label={expandedPrateleira === prateleira.id ? "Recolher produtos" : "Expandir produtos"}
                >
                  {expandedPrateleira === prateleira.id ? "−" : "+"}
                </button>
              </div>

              {expandedPrateleira === prateleira.id && (
                <div className="produtos-list">
                  {prateleira.produtos?.length > 0 ? (
                    prateleira.produtos.map((produto: Produto) => (
                      <div key={produto.id} className="produto-item">
                        <span>{produto.nome}</span>
                        <span>{produto.quantidade}x</span>
                        {produto.dataVencimento && (
                          <span className="vencimento">
                            Vence: {new Date(produto.dataVencimento).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="empty-message">Nenhum produto nesta prateleira</p>
                  )}
                  <Link 
                    to={`/adicionar-produto/${prateleira.id}`}
                    className="add-produto-btn"
                  >
                    Adicionar Produto
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-shelves-message">
            <p>Nenhuma prateleira encontrada</p>
            <button 
              className="add-prateleira-btn"
              onClick={handleAdicionarPrateleira}
            >
              Criar Primeira Prateleira
            </button>
          </div>
        )}
      </div>

      {prateleiras.length > 0 && (
        <button 
          className="add-prateleira-btn"
          onClick={handleAdicionarPrateleira}
        >
          Adicionar Prateleira
        </button>
      )}
    </div>
  );
};

export default Home;