import { useState, useEffect } from 'react';
import "./Style.css"

function ListaCompra({ usuarioId }) {
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({ nome: "", quantidade: 1 });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        fetch(`/usuarios/${usuarioId}/carrinho/produtos`)
            .then((response) => response.json())
            .then((data) => setProdutos(data))
            .catch((error) => console.error("Erro ao carregar produtos:", error));
    }, [usuarioId]);

    const adicionarProduto = async () => {
        if (!novoProduto.nome || novoProduto.quantidade <= 0) {
            alert("Por favor, preencha o nome e a quantidade do produto.");
            return;
        }

        try {
            const response = await fetch(`/usuarios/${usuarioId}/carrinho/produtos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoProduto),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar produto');
            }

            const data = await response.json();
            setProdutos([...produtos, data]); 
            setNovoProduto({ nome: "", quantidade: 1 }); 
            setMostrarFormulario(false); 
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <div className="container">
            <h1>Lista de Compras</h1>
            <section className="ContainerLista">
                {produtos.map((produto, index) => (
                    <div className="listaDeCompra" key={index}>
                        <section className="ItemLista">
                            <h2>{produto.nome}</h2>
                            <h2>Quantidade: {produto.quantidade}</h2>
                        </section>
                    </div>
                ))}
            </section>

            <section className="AdicionarItem">
                {mostrarFormulario ? (
                    <div className="formularioAdicionar">
                        <input
                            type="text"
                            placeholder="Nome do Produto"
                            value={novoProduto.nome}
                            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Quantidade"
                            value={novoProduto.quantidade}
                            onChange={(e) =>
                                setNovoProduto({ ...novoProduto, quantidade: parseInt(e.target.value) || 1 })
                            }
                        />
                        <button onClick={adicionarProduto}>Confirmar</button>
                        <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                    </div>
                ) : (
                    <button id="BotaoAdicionar" onClick={() => setMostrarFormulario(true)}>
                        Adicionar Item
                    </button>
                )}
            </section>
        </div>
    );
}

export default ListaCompra;