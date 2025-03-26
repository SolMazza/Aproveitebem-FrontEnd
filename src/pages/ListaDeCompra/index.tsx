import { useState, useEffect } from 'react';
import "./Style.css";
import { Link } from 'react-router-dom';
import api from '../../Api/api';

interface ItemLista {
    id: number;
    nome: string;
    quantidade: number;
}

interface NovoItemLista {
    nome: string;
    quantidade: number;
}

const ItemProduto = ({ produto, onRemove }: { produto: ItemLista, onRemove: (id: number) => void }) => (
    <div className="listaDeCompra">
        <section className="ItemLista">
            <h2>{produto.nome}</h2>
            <h2>Quantidade: {produto.quantidade}</h2>
            <button 
                className="remove-button"
                onClick={() => onRemove(produto.id)}
            >
                Remover
            </button>
        </section>
    </div>
);

const FormularioProduto = ({
    produto,
    onChange,
    onConfirm,
    onCancel,
    isLoading
}: {
    produto: NovoItemLista;
    onChange: (produto: NovoItemLista) => void;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading: boolean;
}) => (
    <div className="formularioAdicionar">
        <input
            type="text"
            placeholder="Nome do Produto"
            value={produto.nome}
            onChange={(e) => onChange({ ...produto, nome: e.target.value })}
            disabled={isLoading}
        />
        <input
            type="number"
            min="1"
            placeholder="Quantidade"
            value={produto.quantidade}
            onChange={(e) => onChange({ ...produto, quantidade: Number(e.target.value) || 1 })}
            disabled={isLoading}
        />
        <button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Confirmar"}
        </button>
        <button onClick={onCancel} disabled={isLoading}>
            Cancelar
        </button>
    </div>
);


    function ListaCompra() {
    const [produtos, setProdutos] = useState<ItemLista[]>([]);
    const [novoProduto, setNovoProduto] = useState<NovoItemLista>({ nome: "", quantidade: 1 });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
        useEffect(() => {
            const carregarProdutos = async () => {
                try {
                    setIsLoading(true);
                    const response = await api.get("/carrinho/itens");
                    setProdutos(response.data);
                    setError(null);
                } catch (err) {
                    setError("Falha ao carregar lista de compras");
                    console.error("Erro ao carregar produtos:", err);
                } finally {
                    setIsLoading(false);
                }
            };
    
            carregarProdutos();
        }, []);
    
        const adicionarProduto = async () => {
            if (novoProduto.quantidade <= 0) { 
                setError("A quantidade deve ser maior que zero");
                return;
            }
            if (!novoProduto.nome.trim()) {
                setError("O nome do produto é obrigatório");
                return;
            }
    
            setIsLoading(true);
            try {
                const response = await api.post("/carrinho/itens", novoProduto);
                
                setProdutos(prev => [...prev, response.data]);
                setNovoProduto({ nome: "", quantidade: 1 });
                setMostrarFormulario(false);
                setError(null);
            } catch (err) {
                setError("Erro ao adicionar produto");
                console.error("Erro ao adicionar produto:", err);
            } finally {
                setIsLoading(false);
            }
        };
    
        const removerProduto = async (itemId: number) => {
            setIsLoading(true);
            try {
                await api.delete(`/carrinho/itens/${itemId}`);
                setProdutos(produtos.filter(produto => produto.id !== itemId));
                setError(null);
            } catch (err) {
                setError("Erro ao remover produto");
                console.error("Erro ao remover produto:", err);
            } finally {
                setIsLoading(false);
            }
        };


    return (
        <div className="container">
            <header className='Cabecalho'>
                <Link to="/home">
                    <img className="logo" id="logoAccount" src="/logoAp.png" alt="Logo" />
                </Link>
                <h1>Lista de Compras</h1>
            </header>

            {error && <div className="error-message">{error}</div>}

            <section className="ContainerLista">
                {isLoading && produtos.length === 0 ? (
                    <p>Carregando lista de compras...</p>
                ) : produtos.length > 0 ? (
                    produtos.map((produto) => (
                        <ItemProduto 
                            key={produto.id} 
                            produto={produto} 
                            onRemove={removerProduto}
                        />
                    ))
                ) : (
                    <p>Nenhum produto na lista</p>
                )}
            </section>

            <section className="AdicionarItem">
                {mostrarFormulario ? (
                    <FormularioProduto
                        produto={novoProduto}
                        onChange={setNovoProduto}
                        onConfirm={adicionarProduto}
                        onCancel={() => {
                            setMostrarFormulario(false);
                            setError(null);
                        }}
                        isLoading={isLoading}
                    />
                ) : (
                    <button
                        id="BotaoAdicionar"
                        onClick={() => setMostrarFormulario(true)}
                        disabled={isLoading}
                    >
                        {isLoading ? "Carregando..." : "Adicionar Item"}
                    </button>
                )}
            </section>
        </div>
    );
}

export default ListaCompra;