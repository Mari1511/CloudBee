const licitaciones = Array.from({ length: 35 }, (_, i) => `LA-07-110-00700099-T-${100 + i}-2024`);
const folderContainer = document.getElementById('folders');
// Generar carpetas de licitaciones
licitaciones.forEach(name => {
    const folder = document.createElement('div');
    folder.className = 'folder';
    folder.textContent = name;
    folder.onclick = () => openFolder(name);
    folderContainer.appendChild(folder);
});
// Subir archivos
function uploadFiles(type) {
    const fileInput = document.getElementById(`${type}Uploader`);
    const files = fileInput.files;
    const fileListDiv = document.getElementById(`${type}Files`);
    if (files.length === 0) {
        alert('Por favor, selecciona al menos un archivo.');
        return;
    }
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type !== 'application/pdf') {
            alert('Error: Solo se permiten archivos PDF.');
            return;
        }
        const fileURL = URL.createObjectURL(file); // Crea una URL para el archivo
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file'; // Añadir clase para el estilo
        fileDiv.innerHTML = `
            <a href="${fileURL}" target="_blank">${file.name}</a>
            <button onclick="deleteFile(this)">Eliminar</button>
        `;
        fileListDiv.appendChild(fileDiv);
    }
}
// Eliminar archivo
function deleteFile(button) {
    const fileDiv = button.parentElement; // Obtener el div del archivo
    fileDiv.remove(); // Eliminar el div del archivo
}