const productosCargadosEnCarrito = JSON.parse(localStorage.getItem("productos-agregados-al-carrito"));

const contenedorCarritoVacio = document.querySelector("#contenedor-carrito-vacio")
const contenedorCarrito = document.querySelector("#contenedor-carrito")
const contenedorCarritoCheckout = document.querySelector("#contenedor-carrito-checkout")
let botonDecrementar = document.querySelectorAll('.boton-decrementar');
let botonIncrementar = document.querySelectorAll('.boton-incrementar');
let botonEliminar = document.querySelectorAll('.carrito-eliminar');

function cargarProductosCarrito(){
    if(productosCargadosEnCarrito){
        contenedorCarritoVacio.classList.add("invisible");
        contenedorCarrito.classList.remove("invisible");
        contenedorCarritoCheckout.classList.remove("invisible");

        contenedorCarrito.innerHTML= "";
    
        productosCargadosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
                <img class="carritoImagenProducto" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carritoProductoNombre texto-carrito">
                    <small class="">Articulo</small>
                    <p class="">${producto.titulo}</p>
                </div>
                <div class="carritoProductoPrecio texto-carrito">
                    <small class="">Precio</small>
                    <p class="">$${producto.precio}</p>
                </div>
                <div class="carritoProductoCantidad texto-carrito">
                    <small class="">Cantidad</small>
                    <div class="productoContador">
                    <button class="contador-item contador-boton boton-decrementar" id="${producto.id}"><i class="bi bi-dash-circle"></i></button>
                    <span class="contador-item" id="contador-${producto.id}"> ${producto.cantidad} </span>
                    <button class="contador-item contador-boton boton-incrementar" id="${producto.id}"><i class="bi bi-plus-circle"></i></button>    
                </div>
                </div>
                <div class="carritoProductoSubtotal texto-carrito">
                    <small class="">Subtotal</small>
                    <p class="">$${producto.precio * producto.cantidad}</p>
                </div>
                <button id="${producto.id}" class="carrito-eliminar"><i class="bi bi-trash3"></i></button>        
            `;
            
            contenedorCarrito.append(div);
            actualizarBotonesCarrito()
        });
    }
    else{
        contenedorCarritoVacio.classList.remove("invisible");
        contenedorCarrito.classList.add("invisible");
        contenedorCarritoCheckout.classList.add("invisible");
    }
}

cargarProductosCarrito();

function actualizarBotonesCarrito(){
    botonIncrementar = document.querySelectorAll('.boton-incrementar');
    botonIncrementar.forEach(boton => {
        boton.addEventListener("click", incrementarContadorCarrito);
        console.log("boton clickeado");
    });
    
    botonDecrementar = document.querySelectorAll('.boton-decrementar');
    botonDecrementar.forEach(boton => {
        boton.addEventListener("click", decrementarContadorCarrito);
    });

    botonEliminar = document.querySelectorAll(".carrito-eliminar");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", quitarElementosDelCarrito);
    });
}

function incrementarContadorCarrito(e){
    const productId = e.currentTarget.id;
    const productoSeleccionado = productosCargadosEnCarrito.find(producto => producto.id === productId);
    productoSeleccionado.cantidad ++;
    cargarProductosCarrito()
    localStorage.setItem("productos-agregados-al-carrito", productosCargadosEnCarrito); 
}

function decrementarContadorCarrito(e){
    const productId = e.currentTarget.id;
    const productoSeleccionado = productosCargadosEnCarrito.find(producto => producto.id === productId);
    if (productoSeleccionado.cantidad > 1) {
        productoSeleccionado.cantidad --;
    }
    else{
        console.log("desea eliminar el producto?")
        quitarElementosDelCarrito();
    }
    cargarProductosCarrito()
    localStorage.setItem("productos-agregados-al-carrito", productosCargadosEnCarrito); 
}

function quitarElementosDelCarrito(e){
    const productId = e.currentTarget.id;
    const indice = productosCargadosEnCarrito.findIndex(producto => producto.id === productId);
    productosCargadosEnCarrito.splice(indice, 1);
    cargarProductosCarrito()
    localStorage.setItem("productos-agregados-al-carrito", JSON.stringify(productosCargadosEnCarrito)); 
}