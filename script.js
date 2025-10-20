const uploadInput = document.getElementById('uploadImage');
const cartonesWrapper = document.getElementById('cartonesWrapper');
const resetBtn = document.getElementById('resetBtn');
let currentShape = 'square';

// Subir múltiples imágenes
uploadInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function (event) {
      crearCarton(event.target.result);
    };
    reader.readAsDataURL(file);
  });
});

// Cambiar forma de subrayado
document.querySelectorAll('input[name="shape"]').forEach(radio => {
  radio.addEventListener('change', () => {
    currentShape = radio.value;
  });
});

// Función para crear cada cartón dinámicamente
function crearCarton(src) {
  const container = document.createElement('div');
  container.classList.add('carton-container');

  const img = document.createElement('img');
  img.src = src;
  img.classList.add('carton-img');

  container.appendChild(img);
  cartonesWrapper.appendChild(container);

  // Evento de clic para marcar
  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mark = document.createElement('div');
    mark.classList.add('mark', currentShape);
    mark.style.left = `${x}px`;
    mark.style.top = `${y}px`;

    container.appendChild(mark);
  });
}

// Reiniciar TODAS las marcas de todos los cartones
resetBtn.addEventListener('click', () => {
  document.querySelectorAll('.mark').forEach(m => m.remove());
});


