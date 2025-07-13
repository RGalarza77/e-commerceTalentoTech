import Swal from 'sweetalert2';

export function dispararAlerta(titulo, texto, icono, textoBoton) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: textoBoton
    })
}


