//operador ternario
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

//clase constructora de nuevo objetos
class bicicleta {
    constructor(nombre, precio, foto, id) {
        this.nombre = nombre
        this.precio = precio
        this.id = id
        this.foto = foto
    }
}


//productos ya declarados
const producto = [];

function cargarProductos() {
    producto.push(new bicicleta("Fire bird turbo", 76000, "./img/hombre1.jpeg", 001));
    producto.push(new bicicleta("SLP 5 pro", 49000, "./img/slp 5 blanca.jpg", 002));
    producto.push(new bicicleta("Fire bird lady", 49000, "./img/fire bird lady.jpg", 003));
    producto.push(new bicicleta("Venzo skyline", 83000, "./img/mujer1.jpg", 004));
    producto.push(new bicicleta("Venzo loki", 54000, "./img/hombre2.jpeg", 005));
    producto.push(new bicicleta("SLP 5 pro", 54000, "./img/hombre4.jpeg", 005));


}
cargarProductos();
//funcion de dibujo de carrito
function dibujarCarrito() {
    let renglonesCarrito = '';

    carrito.forEach(
        (elemento) => {
            renglonesCarrito += `
                <tr>
                    <td>${elemento.producto.id}</td>
                    <td>${elemento.producto.nombre}</td>
                    <td>${elemento.cantidad}</td>
                    <td>$ ${elemento.producto.precio}</td>
                </tr>
            `;
        }
    );

    contenedorCarritoCompras.innerHTML = renglonesCarrito;
}


//storage and JSON

/*if (carrito) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(carrito);
} else {
    carrito = [];
}*/

const contenedorCarritoCompras = document.querySelector('#items');
const contenedorDeProductos = document.getElementsByClassName("row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center");

const addProductos = contenedorDeProductos[0];
let dolarVenta;
obtenerValorDolar();

function crearCard(producto) {
    //footer card
    let footerCard = document.createElement("div");
    footerCard.className = "card-footer p-4 pt-0 border-top-0 bg-transparent"
    //boton
    let botonAgregar = document.createElement("div");
    botonAgregar.className = "text-center"
    botonAgregar.className = "btn btn-outline-dark mt-auto";
    botonAgregar.innerText = "Agregar al carrito";

    //card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body p-4";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio}</p>
        <p>US$ ${dolarVenta}</p>
    `;
    console.log(dolarVenta);

    cuerpoCarta.append(footerCard);
    cuerpoCarta.append(botonAgregar);

    //imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //CARD
    let carta = document.createElement("div");
    carta.className = "card h-100 m-4";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    let colum = document.createElement('div');
    colum.className = "col mb-5";
    colum.append(carta);


    //agregar algunos eventos
    botonAgregar.onclick = () => {

        // Agregando SweetAlert
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito exitosamente',
            showConfirmButton: false,
            timer: 1500
        })

        let elementoCarrito = new ElementoCarrito(producto, 1);
        console.log(elementoCarrito);
        carrito.push(elementoCarrito);


        let total = precioFinal();
        let precioTotal = document.getElementById("precioTotal");
        precioTotal.innerHTML = "$" + total;
        console.log(carrito);
        dibujarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    return carta;

}


function dibujarCatalogoProductos() {
    addProductos.innerHTML = "";
    producto.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto)
                ;
            addProductos.append(contenedorCarta);
        }
    );

};

dibujarCatalogoProductos();

//funcion preciofinal
function precioFinal() {
    let totalPrecios = carrito.reduce(((acumulador, carrito) => acumulador + carrito.producto.precio), 0);
    console.log(totalPrecios);
    return totalPrecios;
}




//funcion para obtener el valor del dolar blue
async function obtenerValorDolar() {

    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";

    const resp = await fetch(URLDOLAR)
    const data = await resp.json()
    dolarVenta = data.venta;
    const element = document.createElement('p');
    element.innerHTML = `
        Dólar compra: $ ${data.compra}
        Dólar venta: $ ${data.venta}
        `;
    document.body.append(element);
    console.log(data);
}







