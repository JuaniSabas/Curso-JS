//simulador de costos
alert("¡ESTE ES UN SIMULADOR DE COSTOS DE UN CARRITO!");

function Sumar(array){
    let suma=0;
    for(const producto of array){
        suma+=producto;
    }
    return suma;
}
function descuento(Total){
    return (Total*0.80);
}
function mostrarCarrito(Total){
    return alert("El total del carrito es $"+Total);
}

let total=0;
let nombreProducto = prompt("Ingrese nombre del producto");
let precio=0;
const listaPrecios=[];
do{
    
    precio=parseInt(prompt("Ingrese el precio"));
    listaPrecios.push(precio);
    console.log(nombreProducto+" tiene un precio de $"+precio);
    nombreProducto = prompt("Ingrese nombre del producto");
}while(nombreProducto != "ESC" )

total=Sumar(listaPrecios);


mostrarCarrito(total);

let cantidad=listaPrecios.length;
console.log("Cantidad de productos en el carrito: "+cantidad);

let formaDePago=prompt("¿Cómo desea abonar?(20% off efec/transf)");

if (formaDePago==="efectivo"||formaDePago==="Efectivo"||formaDePago==="Transferencia"||formaDePago==="transferencia"){ 
    total=descuento(total);
    mostrarCarrito(total);
    alert("Descuento aplicado");
}
else{ 
mostrarCarrito(total);
alert("Descuento aplicado? NO")
}