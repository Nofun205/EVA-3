$(document).ready(function() {

    // ==========================================
    // 1. FUNCIONES DE CONFIGURACIÓN
    // ==========================================
    function configurarCalendario() {
        if ($('#fecha').length > 0) {
            let hoy = new Date();
            let año = hoy.getFullYear();
            let mes = String(hoy.getMonth() + 1).padStart(2, '0'); 
            let dia = String(hoy.getDate()).padStart(2, '0');
            
            let fechaMax = `${año}-${mes}-${dia}`; 
            $('#fecha').attr('max', fechaMax);
        }
    }

    function limpiarErrores() {
        $('.is-invalid').removeClass('is-invalid');
    }

    // ==========================================
    // 2. FUNCIÓN DE VALIDACIÓN DEL FORMULARIO
    // ==========================================
    function validarFormulario() {
        let esValido = true;
        limpiarErrores();

        // Validar Nombre
        let nombre = $('#nombre').val().trim();
        if (nombre === '') {
            $('#nombre').addClass('is-invalid');
            esValido = false;
        }

        // Validar Usuario
        let usuario = $('#usuario').val().trim();
        if (usuario === '') {
            $('#usuario').addClass('is-invalid');
            esValido = false;
        }

        // Validar Fecha
        let fecha = $('#fecha').val();
        if (fecha === '') {
            $('#fecha').addClass('is-invalid');
            $('#fecha').siblings('.invalid-feedback').text('La fecha es obligatoria.');
            esValido = false;
        } else {
            let fechaIngresada = new Date(fecha);
            let fechaHoy = new Date();
            if (fechaIngresada > fechaHoy) {
                $('#fecha').addClass('is-invalid');
                $('#fecha').siblings('.invalid-feedback').text('La fecha no puede ser en el futuro.');
                esValido = false;
            }
        }

        // Validar Email
        let email = $('#email').val().trim();
        let regexEmail = /^[a-zA-Z0-9._-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|inacapmail\.cl)$/i; 
        if (email === '' || !regexEmail.test(email)) {
            $('#email').addClass('is-invalid');
            esValido = false;
        }

        // Validar Sitio Web
        let sitioWeb = $('#sitioweb').val().trim();
        let regexUrl = /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/i;
        if (sitioWeb !== '' && !regexUrl.test(sitioWeb)) {
            $('#sitioweb').addClass('is-invalid');
            if ($('#sitioweb').siblings('.invalid-feedback').length === 0) {
                $('#sitioweb').after('<div class="invalid-feedback">Debe incluir http:// o https:// y terminar en un dominio válido (.com, .cl).</div>');
            } else {
                $('#sitioweb').siblings('.invalid-feedback').text('Debe incluir http:// o https:// y terminar en un dominio válido (.com, .cl).');
            }
            esValido = false;
        }

        return esValido;
    }

    // ==========================================
    // 3. FUNCIÓN PARA CARGAR LA TABLA (API)
    // ==========================================
    function cargarUsuariosAPI() {
        if ($('#tablaUsuarios').length > 0) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/users',
                method: 'GET',
                success: function(datos) { 
                    let tbody = $('#cuerpoTabla');
                    
                    datos.forEach(function(usuario) {
                        let fila = `
                            <tr>
                                <td>${usuario.name}</td>
                                <td>${usuario.username}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.website}</td>
                            </tr>
                        `;
                        tbody.append(fila); //  DOM 
                    });

                    $('#tablaUsuarios').DataTable();
                },
                error: function() {
                    alert('Hubo un error al intentar cargar los datos de los usuarios.');
                }
            });
        }
    }

    // ==========================================
    // 4. EVENTOS (Ejecución del código)
    // ==========================================
    
    // Inicializar configuraciones
    configurarCalendario();
    cargarUsuariosAPI();

    // Eventos del formulario
    $('input').on('input', function() {
        $(this).removeClass('is-invalid');
    });

    $('#btnCancelar').click(function() {
        $('#formUsuario')[0].reset();
        limpiarErrores();
    });

    $('#btnEnviar').click(function() {
        // Llamamos a la función principal de validación (Criterio 3.4)
        if (validarFormulario()) {
            alert('Envío de datos correcto'); 
            $('#formUsuario')[0].reset(); 
            window.location.href = 'index.html'; 
        }
    });

});