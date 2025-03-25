export interface UsuarioRequestDto {
    nomeCompleto: string;
    email: string;
    senha: string;
}

export interface UsuarioResponseDto {
    id: number;
    nomeCompleto: string;
    email: string;
}

export interface LoginDto {
    email: string;
  }