// Generar nombres de contratos
const contratos = Array.from({ length: 35 }, (_, i) => `D.G. ADMÓN. SAE-${100 + i}-F-2024`);
const contractFolderContainer = document.getElementById('contractFolders');
let filesList = []; // Almacenar los archivos subidos
// Generar carpetas de contratos
contratos.forEach(name => {
    const folderDiv = document.createElement('div');
    folderDiv.className = 'folder';
    folderDiv.innerText = name;
    folderDiv.onclick = () => openContract(name);
    contractFolderContainer.appendChild(folderDiv);
});
// Abrir contrato
function openContract(name) {
    currentContract = name;
    showUploadModal(); // Muestra el modal para seleccionar el archivo
}
// Mostrar modal para seleccionar archivo
function showUploadModal() {
    const uploadModal = document.getElementById('uploadModal');
    uploadModal.style.display = 'block';
}
// Cerrar modal
function closeModal() {
    document.getElementById('uploadModal').style.display = 'none';
    document.getElementById('openModal').style.display = 'none'; // Cierra el modal de abrir
}
// Abrir archivos PDF
function openFiles() {
    const fileInput = document.getElementById('pdfUploader');
    const files = fileInput.files;
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
        filesList.push({ name: file.name, url: fileURL }); // Almacena el archivo
    }
    closeModal(); // Cierra el modal
    displayFiles(); // Muestra los archivos subidos
}
// Mostrar archivos
function displayFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    filesList.forEach((file, index) => {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file';
        fileDiv.innerHTML = `
            <a href="${file.url}" target="_blank">${file.name}</a>
            <button onclick="deleteFile(${index})">Eliminar</button>
        `;
        fileList.appendChild(fileDiv);
    });
}
// Eliminar archivo
function deleteFile(index) {
    filesList.splice(index, 1); // Elimina el archivo
    displayFiles(); // Actualiza la lista de archivos
}
// Cerrar modal de subida
function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
}
// Cambia el texto del botón a "Abrir"
document.querySelector('#uploadModal button').innerText = 'Abrir PDFs';
document.querySelector('#uploadModal button').onclick = openFiles; // Evento de botón