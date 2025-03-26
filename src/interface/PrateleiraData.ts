export interface Prateleira {
    id: number;
    produtos: Produto[];
}

export interface Produto {
    id: number;
    nome: string;
    quantidade: number;
    dataFabricacao?: string;
    dataVencimento?: string;
    categoria?: Categoria;
}

export interface Categoria {
    id: number;
    nome: string;
}