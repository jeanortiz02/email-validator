

// Esperar que el documento haya sido cargado totalmente
document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    //console.log('El documento ha sido cargado')
    // Seleccionando la interfaz
    const inputEmail = document.querySelector('#email');
    const inputcc = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnFormularioSubmit = document.querySelector('#formulario button[type=submit]');
    const btnFormularioReset = document.querySelector('#formulario button[type=reset]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputcc.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);


    btnFormularioReset.addEventListener('click', function(e){
        e.preventDefault();
        reiniciarFormulario()
        
    })

    function reiniciarFormulario() {
        // Reiniciando el objeto
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.remove('hidden');
        spinner.classList.add('flex');


        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            reiniciarFormulario();

            // Crear la alerta
            const alertaExito = document.createElement('p');
            alertaExito.classList.add( 'bg-green-500', 'text-center', 'text-white', 'p-2', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    // function de validar 
    function validar(e) {

        if(e.target.value.trim() === '' && e.target.id === 'email'){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        
        if( e.target.type === 'email'  && !validarEmail(e.target.value) && e.target.value !== '') {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        if( e.target.id === 'cc' && e.target.value === '') {
            limpiarAlerta(e.target.parentElement);
            delete email.cc;
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignando los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobando objeto Email cuando paso la validación
        comprobarEmail();
    }


    // FUNCIONES
    // Mostrar alerta
    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia);

        // Crea HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add( 'bg-red-600', 'text-center', 'text-white', 'p-2');

        // Inyectando al HTML
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // Prevenir que se ejecuten multiples alertas
        // Comprueba si ya existe una alerta
        const limpiarAlerta = referencia.querySelector('.bg-red-600');

        if(limpiarAlerta) {
            limpiarAlerta.remove();
        }
    }

    function validarEmail (email) {
        // Expresiones regulares email
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        //console.log(email);
        if(Object.values(email).includes('')){
            btnFormularioSubmit.classList.add('opacity-50');
            btnFormularioSubmit.disabled = true;
            return;
        } else {
            btnFormularioSubmit.classList.remove('opacity-50');
            btnFormularioSubmit.disabled = false;
        }
    }

})