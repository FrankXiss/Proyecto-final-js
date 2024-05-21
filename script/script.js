let productos = [];

fetch("./script/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    });

const contenedorProductos = document.querySelector("#contenedor-Productos");
const botonesArea = document.querySelectorAll(".boton-Area");
const tituloPrincipal = document.querySelector("#titulo-principal");
let contadorCarrito = document.querySelector("#contador-carrito")
let botonDecrementar = document.querySelectorAll('.boton-decrementar');
let botonIncrementar = document.querySelectorAll('.boton-incrementar');
let botonesAgregar = document.querySelectorAll(".productoAgregar");
let productosEnCarritoLS =localStorage.getItem("productos-agregados-al-carrito");
let productosEnCarrito;

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarContadorCarrito();
} else {
    productosEnCarrito=[];
}

function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div")
        div.innerHTML = `
        <img class="imagenProducto" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="productoDetalles">
            <h3 class="productoNombre">${producto.titulo}</h3>
            <p class="productoPrecio">${producto.precio}</p>
            <div class="productoContador">
                <button class="contador-item contador-boton boton-decrementar" id="${producto.id}"><i class="bi bi-dash-circle"></i></button>
                <span class="contador-item" id="contador-${producto.id}">0</span>
                <button class="contador-item contador-boton boton-incrementar" id="${producto.id}"><i class="bi bi-plus-circle"></i></button>    
            </div>
            <button id="${producto.id}" class="productoAgregar" >Agregar al Carrito</button>
        </div>
        `
        contenedorProductos.append(div);
    })
    
    actualizarBotones();    
}

botonesArea.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesArea.forEach(boton => boton.classList.remove("seleccionado"));
        e.currentTarget.classList.add("seleccionado");

        if (e.currentTarget.id != "todos") {
            const productosArea = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerHTML = productosArea.categoria.nombre;
            const productosBotonArea = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBotonArea);
        }
        else{
            tituloPrincipal.innerHTML = "Todos los Productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotones(){
    botonIncrementar = document.querySelectorAll('.boton-incrementar');
    botonIncrementar.forEach(boton => {
        boton.addEventListener("click", incrementarContadorProductos);
        console.log("boton clickeado");
    });
    
    botonDecrementar = document.querySelectorAll('.boton-decrementar');
    botonDecrementar.forEach(boton => {
        boton.addEventListener("click", decrementarContadorProductos);
    });

    botonesAgregar = document.querySelectorAll(".productoAgregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarProductosAlCarrito);
    });
}

function incrementarContadorProductos(e){
    const productId = e.currentTarget.getAttribute('id');
    const contadorProducto = document.getElementById(`contador-${productId}`);
    let count = parseInt(contadorProducto.textContent);
    contadorProducto.textContent = count + 1;
}

function decrementarContadorProductos(e){
    const productId = e.currentTarget.id;
    const contadorProducto = document.getElementById(`contador-${productId}`);
    let count = parseInt(contadorProducto.textContent);
    if (count > 0) {
        contadorProducto.textContent = count - 1;
    }
    else{
        console.log("no se puede decrementar ")
    }
}

function agregarProductosAlCarrito(e){
    const productId = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === productId)
    const contadorProducto = document.getElementById(`contador-${productId}`);
    let count = parseInt(contadorProducto.textContent);
    if (count === 0) {
        console.log("no hay productos para agregar al carrito ")
    }
    else{
        if (productosEnCarrito.some(producto => producto.id === productId)) {
            const index = productosEnCarrito.findIndex(producto => producto.id === productId)
            productosEnCarrito[index].cantidad = productosEnCarrito[index].cantidad + count;
            contadorProducto.textContent = 0
        } else {
            productoAgregado.cantidad = 0;
            productoAgregado.cantidad = count;
            productosEnCarrito.push(productoAgregado);
            contadorProducto.textContent = 0
        }
    }
    actualizarContadorCarrito();
    localStorage.setItem("productos-agregados-al-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarContadorCarrito(){
    let contadorCarritoActualizado = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    console.log(contadorCarritoActualizado);
    contadorCarrito.textContent = contadorCarritoActualizado;
}










