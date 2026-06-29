export interface UserInfo {
  id_usuario: number;
  id_tipo_usuario: number;
  id_sede: number;
  nombre?: string;
  email?: string;
}

export interface SessionData {
  token: string;
  user: UserInfo;
}

export interface LoginResponse {
  data: SessionData;
}
