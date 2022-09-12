
var DOLARVENTA=0;
//funcion para obtener el valor del dolar blue
async function obtenerValorDolar() { 

    const URLDOLAR = "https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    
    DOLARVENTA = await fetch(URLDOLAR)
    .then(response => response.json() )
    .then(data => {return data.venta});
}

async function init() {
    await obtenerValorDolar();
    const promise1 = Promise.resolve(DOLARVENTA)
    return promise1;
}
DOLARVENTA = await init();
 
export {DOLARVENTA};
//FUNCIONAAAAAA