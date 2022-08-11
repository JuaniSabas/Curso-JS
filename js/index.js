//Productos declarados
const bicicletas = [
{ marca: "Venzo", talle: "M", modelo: "Loki", precio: 76000 },
{ marca: "SLP", talle: "M", modelo: "5 pro lady", precio: 53000 },
{ marca: "Fire bird", talle: "M", modelo: "Adventure", precio: 54000 },
{ marca: "Nordic", talle: "M", modelo: "X1.0", precio: 49000 }]

//constructor para nuevos productos/objetos
class Producto{
    constructor(marca,talle,modelo,precio){
        this.marca=marca;
        this.talle=talle;
        this.modelo=modelo;
        this.precio=parseFloat(precio);
    }
}

const carritoDeCompras=[];

//agregar producto
function agregarProducto(){
    let marcaBicicleta=prompt("ingresa la marca del producto");
    let talle=prompt("ingresa el talle del producto");
    let modelo=prompt("ingresa el modelo del producto");
    let precio=prompt("ingresa el precio del producto");
    
    let biciNueva= new Producto(marcaBicicleta,talle,modelo,precio);

    bicicletas.push(biciNueva);
    console.table(bicicletas);
}

//carrito
let carrito=[];

//funcion para agregar al carrito de compras
const addCarrito = () => {
    let modelo=prompt("Ingrese el modelo del producto a agregar").toLowerCase();
    let resultado=bicicletas.find((n) => n.modelo.toLowerCase() === modelo);

    if(resultado){
        carrito.push(resultado);
        console.log(carrito);
    }else{
        alert("la bicicleta no existe.");
    }
};

//ver carrito de compras
function totalCarrito(){
let total = carrito.reduce(((acumulador,carrito) => acumulador + carrito.precio),0);
    return total;
}



//interaccion con el usuario
let main=true;
do{

let interaccion=prompt("¿Desea comprar un producto?(SI/NO) (ADD para agregar un producto al stock.)").toLowerCase();


//si el usuario quiere comprar, agrega al carrito y devuelve el precio final
if(interaccion == "si"){
    let continuar=true;
    do{
        alert("Lista de productos")
    let listaDeProductos = bicicletas.map((bicicletas) => bicicletas.marca +" "+ bicicletas.modelo+" "+"talle "+bicicletas.talle + " $"+bicicletas.precio);
    alert(listaDeProductos.join(" - "));
    addCarrito();

    let si=prompt("Desea continuar?(SI/NO)").toUpperCase();
    if(si == "NO"){
        continuar=false;
    }

    }while (continuar==true)

    alert("El total es: $"+totalCarrito());
}
//si el usuario quiere agregar producto al stock , lo agrega con add
else if(interaccion=="add"){
let continuar=true;
do{
    agregarProducto();
    alert("Producto agregado con éxito!");
    resultado=prompt("Desea continuar agregando productos?").toUpperCase();
    if (resultado==="NO"){
        continuar=false;
    }

}while(continuar==true);
}
let continuarEnPage=prompt("Desea continuar en la pagina? ").toLowerCase();
if (continuarEnPage==="no"){
    main=false;
}
}while(main==true);








