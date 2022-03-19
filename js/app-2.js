const mostrarDatos =(bases)=> {
    const contenido = document.querySelector(".bases");
    contenido.innerHTML = bases;
}

const obtenerDatosTXT =()=>{
    fetch("bases.txt")
    .then(function(respuesta){
        return respuesta.text();
    })
    .then((bases)=> {
        mostrarDatos(bases);
    })
    .catch((err)=>{
        console.log(err);
    });
};

const btn = document.querySelector("#btn-bases");
btn.addEventListener("click", obtenerDatosTXT);