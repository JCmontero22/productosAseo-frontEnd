export interface DataSesionInterface {
  user:  User;
  token: string;
}

export interface User {
  id_usuario:          number;
  id_tipo_usuario:     number;
  id_sede:             number;
  nombre_usuario:      string;
  user_usuario:        string;
  id_estado:           number;
  fecha_ultima_sesion: Date;
  created_at:          Date;
  updated_at:          Date;
}
