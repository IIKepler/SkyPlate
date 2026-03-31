let menuData = [];

// Elements
const fileInput = document.getElementById('excel-file');
const formManual = document.getElementById('form-manual');
const dishNameEl = document.getElementById('dish-name');
const dishPriceEl = document.getElementById('dish-price');
const dishTypeEl = document.getElementById('dish-type');
const dishDescEl = document.getElementById('dish-desc'); // opcional
const menuListContainer = document.getElementById('menu-list');
const menuCountEl = document.getElementById('menu-count');

function initAdmin() {
  const saved = localStorage.getItem('skyplate_menu_v7');
  if (saved) {
    menuData = JSON.parse(saved);
  } else {
    menuData = [];
  }
  
  renderAdminMenu();

  // Events
  if (fileInput) fileInput.addEventListener('change', handleFileUpload);
  if (formManual) formManual.addEventListener('submit', handleManualSubmit);
}

function categorizeDish(name) {
  const coldKeywords = ['ensalada', 'helado', 'postre', 'frío', 'frio', 'bebida', 'sushi', 'ceviche', 'jugo', 'agua', 'vino'];
  const lowerName = name.toLowerCase();
  const isCold = coldKeywords.some(kw => lowerName.includes(kw));
  return isCold ? 'Frío' : 'Caliente';
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const bstr = evt.target.result;
    
    // Asumimos que XLSX viene desde el CDN en admin.php
    if (typeof XLSX === 'undefined') {
      alert("Error: Librería SheetJS no encontrada.");
      return;
    }
    
    const wb = XLSX.read(bstr, { type: 'binary' });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws);
    
    const newDishes = data.map((row, index) => {
      const name = row.Nombre || row.name || `Plato ${index + 1}`;
      const price = row.Precio || row.price || 0;
      const category = row.Categoria || row.category || categorizeDish(name);
      const type = row.Tipo || row.type || 'Plato';
      return {
        id: Date.now() + Math.random(),
        name,
        price: parseFloat(price),
        category,
        type,
        description: row.Descripcion || row.description || '',
        image: row.Imagen || row.image || ''
      };
    });

    menuData = [...menuData, ...newDishes];
    saveMenu();
    renderAdminMenu();
    fileInput.value = ''; // clear input
  };
  reader.readAsBinaryString(file);
}

function handleManualSubmit(e) {
  e.preventDefault();
  const name = dishNameEl.value.trim();
  if (!name) return;

  const dishCat = categorizeDish(name);
  const dish = {
    id: Date.now(),
    name: name,
    price: parseFloat(dishPriceEl.value) || 0,
    category: dishCat,
    type: dishTypeEl.value || 'Plato',
    description: dishDescEl ? dishDescEl.value : '',
    image: ''
  };

  menuData.push(dish);
  saveMenu();
  renderAdminMenu();
  
  // reset form
  formManual.reset();
}

function removeDish(id) {
  if(confirm('¿Seguro de que deseas borrar este plato?')) {
    menuData = menuData.filter(d => d.id != id);
    saveMenu();
    renderAdminMenu();
  }
}

function saveMenu() {
  localStorage.setItem('skyplate_menu_v7', JSON.stringify(menuData));
}

function renderAdminMenu() {
  menuCountEl.innerText = menuData.length;
  menuListContainer.innerHTML = '';

  if (menuData.length === 0) {
    menuListContainer.innerHTML = '<p style="color: #9ca3af;">No hay platos en el menú.</p>';
    return;
  }

  menuData.forEach(dish => {
    const div = document.createElement('div');
    div.className = 'admin-list-item';
    
    let badgeClass = dish.category === 'Frío' ? 'badge-frio' : 'badge-caliente';

    div.innerHTML = `
      <div>
        <h3 style="font-weight: 600;">
          ${dish.name} 
          <span class="badge ${badgeClass}">${dish.category}</span>
          <span class="badge badge-tipo">${dish.type || 'Plato'}</span>
        </h3>
        <p style="color: #9ca3af; font-size: 0.9rem;">$${parseInt(dish.price).toLocaleString('es-CL')}</p>
      </div>
      <button class="btn-remove-admin" data-id="${dish.id}" style="background: transparent; border: none; color: #ef4444; cursor: pointer;">
        <i class="ph ph-trash" style="font-size: 1.5rem;"></i>
      </button>
    `;
    
    div.querySelector('.btn-remove-admin').addEventListener('click', () => removeDish(dish.id));
    menuListContainer.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', initAdmin);
