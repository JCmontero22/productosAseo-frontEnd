export interface ResponseCrearPermiso {
  statusCode: number;
  titulo:     string;
  mensaje:    string;
  icono:      string;
  data:       Data;
}

export interface Data {
  id:             number;
  nombre:         string;
  descripcion:    string;
  slug:           string;
  estado:         Estado;
  fecha_creacion: Date;
}

export interface Estado {
  id:     number;
  nombre: string;
}
