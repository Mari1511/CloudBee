// Listas de productos y contratos
const productos = [
    "Alcohol isopropílico",
    "Cloro",
    "Desinfectante de superficies",
    "Gas lacrimógeno",
];
const contratos = [
    "D.G. ADMÓN. SAE-100-F-2024",
    "D.G. ADMÓN. SAE-101-F-2024",
];
// Funcionalidad para la barra de búsqueda
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    // Limpiar resultados anteriores
    const resultContainer = document.getElementById('searchResults');
    resultContainer.innerHTML = '';
    // Verificar si el query tiene al menos 3 caracteres
    if (query.length >= 3) {
        // Verificar si el query coincide con algún producto
        const productoEncontrado = productos.find(producto => producto.toLowerCase().startsWith(query));
        // Verificar si el query coincide con algún contrato
        const contratoEncontrado = contratos.find(contrato => contrato.includes(query));
        // Mostrar el resultado del producto si se encuentra
        if (productoEncontrado) {
            resultContainer.innerHTML = `
                <div>
                    <strong>Producto encontrado:</strong> ${productoEncontrado}
                </div>
            `;
        }
        // Mostrar el resultado del contrato si se encuentra
        else if (contratoEncontrado) {
            resultContainer.innerHTML = `
                <div>
                    <strong>Contrato encontrado:</strong> ${contratoEncontrado}
                </div>
            `;
        } else {
            // Si no se encuentra nada, mostrar un mensaje
            resultContainer.innerHTML = `
                <div>No se encontró ningún producto o contrato.</div>
            `;
        }
    }
});
// Botón de limpiar búsqueda
document.getElementById('clearButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = ''; // Limpiar el campo de búsqueda
    searchInput.focus(); // Volver a enfocar el campo de búsqueda
    document.getElementById('searchResults').innerHTML = ''; // Limpiar resultados
});