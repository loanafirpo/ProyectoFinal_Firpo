const productos = [
    // cuidado capilar
    {
        id: "1",
        titulo: "Shampoo sólido",
        imagen: "./imagenes/Shampoo solido.jpg",
        categoria: {
            nombre: "Cuidado capilar",
            id: "cuidado capilar"
        },
        precio: 1300
    },
    {
        id: "2",
        titulo: "Peine de madera",
        imagen: "./imagenes/Peine.jpg",
        categoria: {
            nombre: "Cuidado capilar",
            id: "cuidado capilar"
        },
        precio: 1200
    },
    {
        id: "3",
        titulo: "Acondicionador solido",
        imagen: "./imagenes/acondicionador.jpg",
        categoria: {
            nombre: "Cuidado capilar",
            id: "cuidado capilar"
        },
        precio: 1500
    },
    //cuidado facial
    {
        id: "4",
        titulo: "Mascarilla facial",
        imagen: "./imagenes/mascarilla facial.jpg",
        categoria: {
            nombre: "Cuidado facial",
            id: "cuidado facial"
        },
        precio: 1000
    },
    {
        id: "5",
        titulo: "Tónico facial",
        imagen: "./imagenes/tonico facial.jpg",
        categoria: {
            nombre: "Cuidado facial",
            id: "cuidado facial"
        },
        precio: 1200
    },
    //cuidado corporal
    {
        id: "6",
        titulo: "Bálsamo de caléndula",
        imagen: "./imagenes/balsamos.jpg",
        categoria: {
            nombre: "Cuidado corporal",
            id: "cuidado corporal"
        },
        precio: 1800
    },
    {
        id: "7",
        titulo: "Jabones artesanales",
        imagen: "./imagenes/jabon artesanal.jpg",
        categoria: {
            nombre: "Cuidado corporal",
            id: "cuidado corporal"
        },
        precio: 800
    },
];

const contenedorProductos =document.querySelector("#contenedorProductos");
const botonesCategorias =document.querySelectorAll(".boton-categoria");
const tituloPrincipal =document.querySelector ("#tituloPrincipal")
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach (producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
          <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach (boton => {
    boton.addEventListener ("click", (e) => { 

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find (producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton); 
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
   })
});
function actualizarBotonesAgregar(){
    botonesAgregar =document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
  });
}
let ProductosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

 if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
 } else{
    productosEnCarrito = [];
 }

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

    function actualizarNumerito(){
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    } 
