import { Service } from '@angular/core';
import Swal from 'sweetalert2';
@Service()
export class AlerService {

    success(titulo: string, mensaje: string):void{
        Swal.fire({
            icon: "success",
            title: titulo,
            text: mensaje,
        });
    }

    warning(titulo: string, mensaje: string):void{
        Swal.fire({
            icon: "warning",
            title: titulo,
            text: mensaje,
        });
    }

    info(titulo: string, mensaje: string):void{
        Swal.fire({
            icon: "info",
            title: titulo,
            text: mensaje,
        });
    }

    question(titulo: string, mensaje: string):void{
        Swal.fire({
            icon: "question",
            title: titulo,
            text: mensaje,
        });
    }

    error(titulo: string, mensaje: string):void{
        Swal.fire({
            icon: "error",
            title: titulo,
            text: mensaje,
        });
    }

}
