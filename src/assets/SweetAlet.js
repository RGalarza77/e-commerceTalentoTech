import Swal from 'sweetalert2';

export function dispararAlerta(titulo, texto, icono, textoBoton) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: textoBoton
    })
}

export function dispararAlertaConConfirmacion(titulo, texto, icono, botonConfirmar, botonoCancelar){
    return Swal.fire({
                title: titulo,
                text: texto,
                icon: icono,
                showCancelButton: true,
                confirmButtonText: botonConfirmar,
                cancelButtonText: botonoCancelar,
            })
}


