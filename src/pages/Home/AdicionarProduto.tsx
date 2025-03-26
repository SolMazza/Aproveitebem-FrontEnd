import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style.css";
import api from "../../Api/api";
import { Produto } from "../../interface/PrateleiraData";




const AdicionarProduto = () => {
  const { prateleiraId } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Omit<Produto, 'id'>>({ 
    nome: "",
    quantidade: 1,
    dataFabricacao: "",
    dataVencimento: ""
  });
  const [categorias, setCategorias] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const carregarCategorias = async () => {
        try {
            const response = await api.get("/categorias/minhas-categorias");
            setCategorias(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao carregar categorias");
        }
    };

    carregarCategorias();
}, []);
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduto(prev => ({
        ...prev,
        [name]: value
    }));
};
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
        await api.post(`/prateleiras/${prateleiraId}/produtos`, produto);
        navigate("/home");
    } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao adicionar produto");
    }
};

  return (
    <div className="container">
      <h1>Adicionar Produto à Prateleira</h1>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="formularioAdicionar">
        <label htmlFor="nome">Nome do Produto</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="quantidade">Quantidade</label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          min="1"
          value={produto.quantidade}
          onChange={handleChange}
          required
        />

        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          name="categoriaId"
          onChange={handleChange}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <label htmlFor="dataFabricacao">Data de Fabricação</label>
        <input
          type="date"
          id="dataFabricacao"
          name="dataFabricacao"
          value={produto.dataFabricacao}
          onChange={handleChange}
        />

        <label htmlFor="dataVencimento">Data de Vencimento</label>
        <input
          type="date"
          id="dataVencimento"
          name="dataVencimento"
          value={produto.dataVencimento}
          onChange={handleChange}
        />

        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default AdicionarProduto;