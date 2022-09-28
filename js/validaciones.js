export function validar(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");  
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacío."
    },
    email: {
        valueMissing: "El correo electrónico no puede estar vacío.",
        typeMismatch: "El correo no es válido."
    },
    password: {
        valueMissing: "La contraseña no puede estar vacía.",
        patterMismatch: "Debe tener al menos 6 caracteres. Una letra mayúscula, una minúscula, número y un caracter especial.",
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento no puede estar vacía.",
        customError: "La edad de la fecha debe ser de al menos 18 años de edad.",
    },
    numero: {
        valueMissing: "El teléfono no puede estar vacío.",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 dígitos.",
    },
    direccion: {
        valueMissing: "La dirección no puede estar vacía.",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres.",
    },
    ciudad: {
        valueMissing: "La ciudad no puede estar vacía.",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres.",
    },
    provincia: {
            valueMissing: "La provincia no puede estar vacía.",
            patternMismatch: "La provincia debe contener entre 10 y 40 caracteres.",
            
        
    } 

}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(), 
    fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}