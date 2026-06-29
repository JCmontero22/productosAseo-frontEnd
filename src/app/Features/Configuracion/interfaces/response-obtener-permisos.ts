export interface ResponseObtenerPermisos {
  statusCode:     number;
  titulo:         string;
  mensaje:        string;
  icono:          string;
  data:           Datum[];
  infoPagination: InfoPagination;
}

export interface Datum {
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

export interface InfoPagination {
  current_page: number;
  per_page:     number;
  total:        number;
  last_page:    number;
  from:         number;
  to:           number;
}
