
document.addEventListener('DOMContentLoaded', function () {
    const productosContainer2 = document.getElementById('productosContainer');
    const tbody = document.querySelector('#carrito2 tbody');
    let carrito = [];


    // Lista de productos
    const productos = [
        { id: 1, nombre: "Laptop Lenovo ThinkPad", precio: 12000, img: "./assets/LenovoThinkPad" },
        { id: 2, nombre: "Monitor Dell UltraSharp 27 pulgadas", precio: 3500, img: "assets/DellUltraSharp" },
        { id: 3, nombre: "Teclado mecánico Razer BlackWidow", precio: 1500, img: "assets/RazerBlackWidow" },
        { id: 4, nombre: "Mouse inalámbrico Logitech MX Master 3", precio: 1900, img: "assets/LogitechMXMaster" },
        { id: 5, nombre: "Disco duro externo Samsung T5 1TB", precio: 1450, img: "assets/SamsungT5" },
        { id: 6, nombre: "Tarjeta gráfica NVIDIA GeForce RTX 3080", precio: 14000, img: "assets/NVIDIAGeForceRTX3080" },
        { id: 7, nombre: "Memoria RAM Corsair Vengeance LPX 16GB", precio: 1200, img: "assets/CorsairVengeanceLPX" },
        { id: 8, nombre: "Procesador AMD Ryzen 9 5900X", precio: 4525, img: "assets/AMDRyzen95900X" },
        { id: 9, nombre: "Impresora multifuncional HP OfficeJet Pro", precio: 2360, img: "assets/HPOfficeJetPro" },
        { id: 10, nombre: "Router WiFi Mesh TP-Link Deco X20", precio: 2400, img: "assets/TPLinkDecoX20" },
        { id: 11, nombre: "Auriculares gaming HyperX Cloud Alpha", precio: 879, img: "assets/HyperXCloudAlpha" },
        { id: 12, nombre: "Webcam Logitech C920 HD Pro", precio: 1400, img: "assets/LogitechC920HDPro" }
        // Puedes añadir más productos aquí si lo deseas
    ];


    // Función para mostrar los productos en el HTML
    function mostrarProductos2() {
        // Limpiar el contenedor de productos antes de agregar los nuevos
        productosContainer2.innerHTML = '';

        // Iterar sobre la lista de productos y crear un elemento para cada uno
        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');
            productoDiv.innerHTML = `
            <img src="${producto.img}.jpg" class="mx-auto h-32 object-cover mb-2 rounded-md">
            <h3 class="text-lg font-semibold mb-1">${producto.nombre}</h3>
            <p class="text-gray-500">$${producto.precio.toFixed(2)}</p>
            <button class="agregar bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" data-id="${producto.id}">Agregar</button>
        `;
            productosContainer2.appendChild(productoDiv);
        });
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            const itemExistente = carrito.find(item => item.id === id);
            if (itemExistente) {
                itemExistente.cantidad++;
            } else {
                carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1, img: producto.img });
            }
            mostrarCarrito2();
        }
    }

    function quitarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
        mostrarCarrito2();
    }

    function mostrarCarrito2() {

        tbody.innerHTML = '';

        carrito.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="py-4">
                    <div class="flex items-center">
                        <img src="${item.img}.jpg" class="mx-auto h-32 object-cover mb-2 rounded-md">
                        <span class="font-semibold">${item.nombre}</span>
                    </div>
                </td>
                <td class="py-4">$${item.precio.toFixed(2)}</td>
                <td class="py-4">
                    <span class="text-center w-8">${item.cantidad}</span>
                </td>
                <td class="py-4">$${(item.precio * item.cantidad).toFixed(2)}</td>
                <td class="py-4">
                <button
                    class="eliminar bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                    Eliminar
                </button>
            </td>
            `;
            // Agregar evento de escucha para el botón "Eliminar"
            const btnEliminar = tr.querySelector('.eliminar');
            btnEliminar.addEventListener('click', () => {
                quitarDelCarrito(item.id);
            });

            tbody.appendChild(tr);
        });

        calcularTotal2();
    }

    function calcularTotal2() {
        let subtotal = 0;
        carrito.forEach(item => {
            subtotal += item.precio * item.cantidad;
        });
        const iva = .16;
        const shipping = 0; // Puedes agregar una lógica para calcular los costos de envío si es necesario

        const total = subtotal + (iva * subtotal);
        const totalIVA = subtotal * iva;

        const subtotalSpan = document.querySelector('#carrito2 #subtotal');
        const ivaSpan = document.querySelector('#carrito2 #iva');
        const totalSpan = document.querySelector('#carrito2 #total');

        subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
        ivaSpan.textContent = `$${totalIVA.toFixed(2)}`;
        totalSpan.textContent = `$${total.toFixed(2)}`;
    }




    productosContainer2.addEventListener('click', function (e) {
        if (e.target.classList.contains('agregar')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        }
    });





    // Mostrar los productos cuando la página se carga
    mostrarProductos2();

    const bntComprar = this.documentElement.querySelector('#comprarAhora');
    bntComprar.addEventListener('click', function(){
        alert('Gracias por tu compra');
    
    });

});
