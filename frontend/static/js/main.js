// URL de los microservicios (usando nombres de servicio de Docker Compose)
const API_AUTH = "http://auth_service:5000";  // Microservicio de autenticación
const API_PRODUCT = "http://product_service:5001";  // Microservicio de productos
const API_ORDER = "http://order_service:5002";  // Microservicio de órdenes
const API_NOTIFICATION = "http://notification_service:5003";  // Microservicio de notificaciones


// Función para ocultar alertas después de 5 segundos
window.onload = function() {
    let alerts = document.querySelectorAll('.alert');
    if (alerts.length > 0) {
        setTimeout(function() {
            alerts.forEach(function(alert) {
                alert.style.display = 'none';
            });
        }, 5000); // Ocultar después de 5 segundos
    }
};

// Función para registrar un usuario
async function registerUser(username, password, email) {
    try {
        const response = await axios.post(`${API_AUTH}/register`, {
            username: username,
            password: password,
            email: email
        });
        if (response.status === 200) {
            alert("Usuario registrado exitosamente!");
            window.location.href = '/';  // Redirigir al inicio después del registro
        } else {
            alert("Error al registrar el usuario. Inténtalo nuevamente.");
        }
    } catch (error) {
        console.error("Error en el registro: ", error);
        alert("Hubo un problema con el registro.");
    }
}

// Función para iniciar sesión
async function loginUser(username, password) {
    try {
        const response = await axios.post(`${API_AUTH}/login`, {
            username: username,
            password: password
        });
        if (response.status === 200) {
            alert("Inicio de sesión exitoso!");
            window.location.href = '/';  // Redirigir al inicio después de iniciar sesión
        } else {
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error en el inicio de sesión: ", error);
        alert("Hubo un problema con el inicio de sesión.");
    }
}

// Función para obtener la lista de productos (usando el microservicio de productos)
async function getProducts() {
    try {
        const response = await axios.get(`${API_PRODUCT}/products`);
        if (response.status === 200) {
            const products = response.data;
            console.log("Productos obtenidos: ", products);
            // Aquí puedes procesar los productos y mostrarlos en la UI
            renderProductList(products);
        } else {
            alert("Error al obtener los productos.");
        }
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        alert("Hubo un problema al obtener los productos.");
    }
}

// Función para realizar una orden (usando el microservicio de órdenes)
async function createOrder(productId, quantity) {
    try {
        const response = await axios.post(`${API_ORDER}/create-order`, {
            product_id: productId,
            quantity: quantity
        });
        if (response.status === 200) {
            alert("Orden creada exitosamente!");
        } else {
            alert("Error al crear la orden.");
        }
    } catch (error) {
        console.error("Error al crear la orden: ", error);
        alert("Hubo un problema con la creación de la orden.");
    }
}

// Función para enviar una notificación (usando el microservicio de notificaciones)
async function sendNotification(message, userId) {
    try {
        const response = await axios.post(`${API_NOTIFICATION}/send`, {
            message: message,
            user_id: userId
        });
        if (response.status === 200) {
            alert("Notificación enviada exitosamente!");
        } else {
            alert("Error al enviar la notificación.");
        }
    } catch (error) {
        console.error("Error al enviar la notificación: ", error);
        alert("Hubo un problema al enviar la notificación.");
    }
}

// Renderizar la lista de productos en la UI
function renderProductList(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h4>${product.name}</h4>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-primary">Agregar al carrito</button>
        `;
        productList.appendChild(productItem);
    });
}

// Función para agregar un producto al carrito (puedes usarla para gestionar la orden)
function addToCart(productId) {
    const quantity = prompt("Ingrese la cantidad:");
    if (quantity) {
        createOrder(productId, quantity);
    }
}
