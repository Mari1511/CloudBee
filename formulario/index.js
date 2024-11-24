document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Añadir clase para efecto de carga
    const button = e.target.querySelector('button');
    button.innerHTML = 'Conectando...';
    button.disabled = true;
    // Simular delay de autenticación
    setTimeout(() => {
        if ((username === 'Mariana Padron' && password === '124') || 
            (username === 'Victor Hernandez' && password === '264')) {
            // Efecto de éxito
            button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            button.innerHTML = '¡Conectado!';
            // Redireccionar después de mostrar el éxito
            setTimeout(() => {
                window.location.href = '../inicio/home.html';
            }, 500);
        } else {
            // Mostrar modal de error
            showErrorModal(getErrorMessage(username, password));
            // Resetear el botón
            setTimeout(() => {
                button.style.background = 'linear-gradient(135deg, #673ab7, #9c27b0)';
                button.innerHTML = 'Conectar';
                button.disabled = false;
            }, 1000);
        }
    }, 1000);
});
function showErrorModal(message) {
    const modal = document.getElementById('errorModal');
    const modalContent = modal.querySelector('.modal-content');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    modal.style.display = 'block';
    modalContent.classList.add('shake');
    setTimeout(() => {
        modalContent.classList.remove('shake');
    }, 500);
}
function getErrorMessage(username, password) {
    if (!username && !password) {
        return "Por favor, introduce el usuario y la contraseña.";
    } else if (!username) {
        return "Por favor, introduce el usuario.";
    } else if (!password) {
        return "Por favor, introduce la contraseña.";
    } else {
        return "Las credenciales introducidas son incorrectas. Por favor, verifica tus datos.";
    }
}
// Cerrar modal cuando se hace clic en la X
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('errorModal').style.display = 'none';
});
// Cerrar modal cuando se hace clic fuera del contenido
window.addEventListener('click', (e) => {
    const modal = document.getElementById('errorModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('errorModal').style.display = 'none';
    }
});
// Cerrar modal cuando se hace clic en la X
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('errorModal').style.display = 'none';
});
// Efectos visuales en los inputs
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});