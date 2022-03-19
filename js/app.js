
/******** Expresiones regulares para la validacion del nombre ********/

const expresiones = {
    validarNombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
}

/****  Escuchamos el evento submit para validar el cliente ****/

let datosPersona = document.getElementById("datosPersona");
datosPersona.addEventListener("submit", validarCliente);

/********  Validacion campos nombre y dni ********/

function validarCliente(e) {
    e.preventDefault();

    nombre = document.getElementById("input-name").value;
    dni = document.getElementById("input-dni").value;
    NombreError = document.getElementById("spanNombre");
    DniError = document.getElementById("spanDni");

    if (nombre == "" || !expresiones.validarNombre.test(nombre)) {
        document.getElementById("input-name").focus();
        document.getElementById("input-name").style.borderColor = "red";

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'En el campo Nombre solo se permiten letras!',
            confirmButtonColor: '#d33'
        })

    } else {
        document.getElementById("input-name").style.borderColor = "green";
        datosCliente.push(nombre);
    }

    if (isNaN(dni) || dni == "") {
        document.getElementById("input-dni").focus();
        document.getElementById("input-dni").style.borderColor = "red";

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'En el campo DNI solo se permiten números!',
            confirmButtonColor: '#d33'
        })

    } else {
        document.getElementById("input-dni").style.borderColor = "green";
        datosCliente.push(dni);
    }
}

// Controlamos si es cliente o no para saber la base del interes que tendra

function checkedCliente() {

    let tna = document.getElementById("tna");
    let tea = document.getElementById("tea");
    let cft = document.getElementById("cft");
    let cftImp = document.getElementById("cftImp");

    if (document.getElementById("checkbox-cliente").checked) {
        tna.innerText = 5;
        tea.innerText = 13.67;
        cft.innerText = 13.67;
        cftImp.innerText = 22;
        document.getElementById("label-datos").style.color = "green";
    } else {
        tna.innerText = 11;
        tea.innerText = 19.67;
        cft.innerText = 19.67;
        cftImp.innerText = 32;
        document.getElementById("label-datos").style.color = "red";
    }
}

// calculamos el prestamo

calcularPrestamo = () => {

    // Obtenemos el valor de cada input

    let capital = parseInt(document.getElementById("capital").value);
    let tasa = parseInt(document.getElementById("cftImp").textContent);
    let plazo = parseInt(document.getElementById("plazo").value);
    let gastos = 2500;
    
    // obtenemos la taza de interes dependiendo del plazo elegido

    switch (plazo) {
        case 12:
            tasa = tasa;
            break;
        case 24:
            tasa = tasa + 1;
            cftImp.innerText = tasa;
            break;
        case 36:
            tasa = tasa + 2;
            cftImp.innerText = tasa;

            break;
        case 48:
            tasa = tasa + 3;
            cftImp.innerText = tasa;

            break;
        case 60:
            tasa = tasa + 4;
            cftImp.innerText = tasa;

            break;
        default:
            break;
    }

    // chequeamos que esten completos los imputs de la solicitud del credito "importe del credito y el plazo", 
    // y si estan llenamos correctamente calculamos el prestamo

    if (isNaN(capital) || isNaN(plazo)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe completar el campo importe del credito o el plazo',
            confirmButtonColor: '#d33'
        })
    } else {
        let interes = capital * tasa / 100;
        let montoTotal = capital + interes;
        let cuotaTotal = Math.ceil(montoTotal / plazo);
        let cuotaPura = cuotaTotal - gastos;

        document.getElementById("cuotas").innerText = plazo;
        document.getElementById("saldo-capital").innerText = capital;
        document.getElementById("interes-tabla").innerText = interes;
        document.getElementById("gastosAdm").innerText = gastos;
        document.getElementById("cuota-pura").innerText = cuotaPura;
        document.getElementById("valor-cuotas").innerText = cuotaTotal;
        document.getElementById("saldo-final").innerText = montoTotal;
        datosCliente.push(`Plazo seleccionado para su préstamo: ${plazo} meses`);
        datosCliente.push(`Valor de las cuotas: $${cuotaTotal}`);
        datosCliente.push(`Monto total a devolver: $${montoTotal}`);

        /* llamamos a la funcion para guadar los datos en el localstorage */
        guardarLocalStorage();
    }
}

// guardamos los datos del cliente

const datosCliente = [];

function guardarLocalStorage() {
    localStorage.setItem("Perfil Cliente", JSON.stringify(datosCliente));
    JSON.parse(localStorage.getItem("Perfil Cliente"));
};