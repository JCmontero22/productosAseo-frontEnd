export interface ResponseObtenerPemisoPorID {
  statusCode: number;
  titulo:     string;
  mensaje:    string;
  icono:      string;
  data:       Data;
  meta:       any[];
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
