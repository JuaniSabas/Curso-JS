//operador ternario
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
    producto.push(new bicicleta("Fire bird turbo", 76000, "./img/hombre1.jpeg", 0o1));
    producto.push(new bicicleta("SLP 5 pro", 49000, "./img/slp 5 blanca.jpg", 0o2));
    producto.push(new bicicleta("Fire bird lady", 49000, "./img/fire bird lady.jpg", 0o3));
    producto.push(new bicicleta("Venzo skyline", 83000, "./img/mujer1.jpg", 0o4));
    producto.push(new bicicleta("Venzo loki", 54000, "./img/hombre2.jpeg", 0o5));
    producto.push(new bicicleta("SLP 5 pro", 54000, "./img/hombre4.jpeg", 0o5));


}
cargarProductos();
//funcion de dibujo de carrito
function dibujarCarrito() {

    let sumaCarrito = 0;

    contenedorCarritoCompras.innerHTML = "";

    carrito.forEach(

        (elemento) => {
            let renglonesCarrito = document.createElement("tr");

            renglonesCarrito.innerHTML = `
                <tr>
                    <td>${elemento.producto.id}</td>
                    <td>${elemento.producto.nombre}</td>
                    <td><input id="cantidad-producto-${elemento.producto.id}" type= "number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                    <td>$ ${elemento.producto.precio}</td>
                    <td>$ ${elemento.producto.precio * elemento.cantidad}</td>
                </tr>
            `;


            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito += elemento.cantidad * elemento.producto.precio;

            //agregamos evento a carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);

            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });
        }
    );

    if (carrito.length == 0) {
        precioTotal.innerHTML = `
        <th>Carrito vacío - Comprate algo!</th>
        `;
        
    } else {
        precioTotal.innerHTML = `
        <th>Precio total: $${sumaCarrito}
         ` ;
    }


}

const contenedorCarritoCompras = document.querySelector('#items');
const contenedorDeProductos = document.getElementsByClassName("row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center");
const addProductos = contenedorDeProductos[0];

var DOLARVENTA = await obtenerValorDolar();

dibujarCarrito();

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
        <p>US$ ${(producto.precio / DOLARVENTA).toFixed(2)}</p>
    `;

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
        //Busco si hay un elemento repetido y le sumamos la cantidad
        let elementoExistente = carrito.find((elemento) => elemento.producto.id == producto.id);

        if (elementoExistente) {
            elementoExistente.cantidad ++;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            carrito.push(elementoCarrito);
        }
        dibujarCarrito();
        // Agregando SweetAlert
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito exitosamente',
            showConfirmButton: false,
            timer: 1500
        })

        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    return carta;

}


function dibujarCatalogoProductos() {
    addProductos.innerHTML = "";
    producto.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            addProductos.append(contenedorCarta);
        }
    );

};

dibujarCatalogoProductos();

//funcion preciofinal
function precioFinal() {
    let totalPrecios = carrito.reduce(((acumulador, carrito) => acumulador + carrito.producto.precio), 0);
    return totalPrecios;
}


async function obtenerValorDolar() {

    const URLDOLAR = "https://api.bluelytics.com.ar/v2/latest";

    DOLARVENTA = await fetch(URLDOLAR)
        .then(response => response.json())
        .then(data => { return data.blue.value_avg});
        console.log("Dolar Venta:",DOLARVENTA);
    return DOLARVENTA;
}

//vaciar el carrito
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    precioFinal();
    
    // Dibujamos nuevamente el carrito para renderizar
    dibujarCarrito();

    //limpiamos los datos almacenados en el Storage
    localStorage.clear();
}

// Evento vaciar carrito
DOMbotonVaciar.addEventListener("click", vaciarCarrito);

