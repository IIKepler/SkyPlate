const INITIAL_MENU = [
  // 8 Platos Fríos (Peruanos)
  { id: 1, name: "Pulpo al Olivo", category: "Frío", type: "Plato", price: 14500, description: "Pulpo macerado en limón de pica y especias con suave salsa al olivo.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Causa Camarón y Jaiba", category: "Frío", type: "Plato", price: 12900, description: "Masa de papa amarilla y ají rellena de camarones frescos y jugosa jaiba.", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Causa de Pulpo al Olivo", category: "Frío", type: "Plato", price: 13500, description: "Masa de papa y ají tradicional rellena de tierno pulpo en salsa al olivo.", image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Papas a la Huancaína", category: "Frío", type: "Plato", price: 8900, description: "Papas cocidas bañadas en cremosa salsa de ají, galleta, maní y queso andino.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Salpicón de Pollo", category: "Frío", type: "Plato", price: 9500, description: "Ensalada fresca de lechuga, tomate, zanahoria, papas, pechuga de pollo y vinagreta.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Ceviche de Pescado", category: "Frío", type: "Plato", price: 15500, description: "Cubos de pescado fresco marinados en jugo de limón de pica, cilantro y especias.", image: "https://cdn7.kiwilimon.com/recetaimagen/41515/640x640/56738.jpg.jpg" },
  { id: 7, name: "Tiradito de Pescado", category: "Frío", type: "Plato", price: 16500, description: "Finos cortes de pescado marinados en limón de pica con un toque de crema de ají amarillo.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "Leche de Tigre con Pisco", category: "Frío", type: "Plato", price: 11000, description: "Concentrado cítrico de ceviche peruano realzado con un elegante toque de pisco.", image: "https://blog.amigofoods.com/wp-content/uploads/2020/08/leche-de-tigre-peruvian-drink-999x1024.jpg" },

  // 8 Platos Calientes (Peruanos)
  { id: 9, name: "Anticucho de Corazón", category: "Caliente", type: "Plato", price: 11500, description: "Trozos de corazón de vacuno a la plancha macerados en salsa panca especial.", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600" },
  { id: 10, name: "Chicharrón de Pescado", category: "Caliente", type: "Plato", price: 14500, description: "Trozos de pescado blanco apanados y fritos, servidos con crujientes papas doradas.", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600" },
  { id: 11, name: "Machas a la Parmesana", category: "Caliente", type: "Plato", price: 16900, description: "Machas frescas horneadas con vino blanco, toques de mantequilla y queso parmesano gratinado.", image: "https://www.recetaslider.cl/wp-content/uploads/2021/11/R8A6477cambio6-scaled.jpg" },
  { id: 12, name: "Lomo Saltado", category: "Caliente", type: "Plato", price: 17500, description: "Jugoso filete de vacuno salteado al wok con cebolla, tomate, ají, servido con arroz y papas.", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600" },
  { id: 13, name: "Ají de Gallina", category: "Caliente", type: "Plato", price: 13500, description: "Pechuga de pollo deshilachada sumergida en una crema de nueces, pan y ají amarillo.", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=600" },
  { id: 14, name: "Pescado a lo Macho", category: "Caliente", type: "Plato", price: 18500, description: "Filete de pescado bañado en una contundente salsa de mariscos al vino blanco y ají panca.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600" },
  { id: 15, name: "Arroz con Mariscos", category: "Caliente", type: "Plato", price: 16500, description: "Sabrosa mixtura de mariscos salteados sobre una base de arroz sazonado con choclo guisado.", image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600" },
  { id: 16, name: "Chupe de Camarones", category: "Caliente", type: "Plato", price: 15900, description: "Sopa espesa y reconfortante de camarones, papa, choclo, queso fresco, leche y huevo escalfado.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600" },

  // Bebidas (Frías)
  { id: 17, name: "Pisco Sour Clásico", category: "Frío", type: "Bebida", price: 6500, description: "Clásico peruano a base de pisco quebranta, limón de pica, jarabe de goma y clara.", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600" },
  { id: 18, name: "Chicha Morada Helada", category: "Frío", type: "Bebida", price: 3500, description: "Refrescante chicha de maíz morado hervida con piña, canela, clavo y limón.", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600" },
  { id: 19, name: "Limonada Frozen", category: "Frío", type: "Bebida", price: 3200, description: "Limonada sumamente refrescante batida con abundante hielo frappé.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600" },
  { id: 20, name: "Inca Kola Helada", category: "Frío", type: "Bebida", price: 2500, description: "La icónica bebida gaseosa de sabor nacional, bien helada.", image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=600" },

  // Bebidas (Calientes)
  { id: 21, name: "Té de Muña", category: "Caliente", type: "Bebida", price: 2500, description: "Infusión andina digestiva y reconfortante de hojas de muña natural.", image: "https://www.herbazest.com/imgs/c/d/0/691353/infusion-refrescante-de-muna-index.jpg" },
  { id: 22, name: "Emoliente Caliente", category: "Caliente", type: "Bebida", price: 3000, description: "Bebida tradicional de hierbas medicinales, linaza y un toque de limón caliente.", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600" },
  { id: 23, name: "Café Pasado", category: "Caliente", type: "Bebida", price: 2900, description: "Intenso café orgánico peruano, pasado gota a gota.", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600" },
  { id: 24, name: "Infusión de Hierbaluisa", category: "Caliente", type: "Bebida", price: 2500, description: "Clásica infusión suave y relajante de hierbaluisa recién recolectada.", image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600" }
];

let menuData = [];
let currentCategory = 'Frío';
let cart = [];
let WHATSAPP_NUMBER = window.APP_CONFIG ? window.APP_CONFIG.whatsapp : '+569757152957'; 

// Elements
const bodyEl = document.body;
const weatherMsgEl = document.getElementById('weather-msg');
const btnToggleTheme = document.getElementById('btn-toggle-theme');
const cartBadge = document.getElementById('cart-badge');
const btnCart = document.getElementById('btn-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalEl = document.getElementById('cart-total');
const btnCheckout = document.getElementById('btn-checkout');

const foodContainer = document.getElementById('food-container');
const drinkContainer = document.getElementById('drink-container');
const foodTitleIcon = document.getElementById('food-title-icon');
const drinkTitleIcon = document.getElementById('drink-title-icon');
const emptyFoodMsg = document.getElementById('empty-food-msg');
const emptyDrinkMsg = document.getElementById('empty-drink-msg');

function init() {
  // Load Menu
  let saved = localStorage.getItem('skyplate_menu_v7');
  if (saved) {
    menuData = JSON.parse(saved);
  } else {
    menuData = INITIAL_MENU;
    localStorage.setItem('skyplate_menu_v7', JSON.stringify(menuData));
  }
  
  // Setup Weather
  fetchWeather(-34.61, -58.38); // Fallback init
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
      (error) => console.warn("Geo fallback", error)
    );
  }

  // Event Listeners
  btnToggleTheme.addEventListener('click', toggleCategory);
  btnCart.addEventListener('click', () => toggleCart(true));
  btnCloseCart.addEventListener('click', () => toggleCart(false));
  btnCheckout.addEventListener('click', handleCheckout);
}

function fetchWeather(lat, lon) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const temp = data.current_weather.temperature;
      if (temp > 20) {
        setCategory('Frío');
        weatherMsgEl.innerText = `Hace ${temp}°C en tu ubicación. ¡Ideal para algo Frío!`;
      } else {
        setCategory('Caliente');
        weatherMsgEl.innerText = `Hace ${temp}°C en tu ubicación. ¡Ideal para algo Caliente!`;
      }
    })
    .catch(err => console.error(err));
}

function setCategory(cat) {
  currentCategory = cat;
  bodyEl.className = cat === 'Frío' ? 'theme-cold' : 'theme-hot';
  
  if (cat === 'Frío') {
    btnToggleTheme.innerHTML = '<i class="ph ph-cloud-rain" style="font-size: 1.2rem;"></i> Ver Menú Caliente';
    btnToggleTheme.className = 'btn-toggle-theme frio';
    foodTitleIcon.innerText = '❄️';
    drinkTitleIcon.innerText = '❄️';
  } else {
    btnToggleTheme.innerHTML = '<i class="ph ph-sun" style="font-size: 1.2rem;"></i> Ver Menú Frío';
    btnToggleTheme.className = 'btn-toggle-theme caliente';
    foodTitleIcon.innerText = '🔥';
    drinkTitleIcon.innerText = '🔥';
  }
  renderMenu();
}

function toggleCategory() {
  setCategory(currentCategory === 'Frío' ? 'Caliente' : 'Frío');
}

function renderMenu() {
  const foodItems = menuData.filter(d => d.category === currentCategory && (d.type === 'Plato' || !d.type));
  const drinkItems = menuData.filter(d => d.category === currentCategory && d.type === 'Bebida');

  renderGrid(foodContainer, emptyFoodMsg, foodItems);
  renderGrid(drinkContainer, emptyDrinkMsg, drinkItems);
}

function renderGrid(container, emptyMsgEl, items) {
  container.innerHTML = '';
  if (items.length === 0) {
    emptyMsgEl.classList.remove('hidden');
  } else {
    emptyMsgEl.classList.add('hidden');
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : ''}
        <div class="card-body">
          <h3 class="card-title">${item.name}</h3>
          ${item.description ? `<p class="card-desc">${item.description}</p>` : ''}
          <div class="card-footer">
            <span class="card-price">$${parseInt(item.price).toLocaleString('es-CL')}</span>
            <button class="btn btn-primary btn-add-cart" data-id="${item.id}" style="border-radius: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">Agregar</button>
          </div>
        </div>
      `;
      const btnAdd = card.querySelector('.btn-add-cart');
      btnAdd.addEventListener('click', () => addToCart(item));
      container.appendChild(card);
    });
  }
}

function addToCart(dish) {
  const existing = cart.find(item => item.id == dish.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...dish, quantity: 1 });
  }
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id != id);
  updateCartUI();
}

function changeQuantity(id, delta) {
  const item = cart.find(i => i.id == id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id != id);
  }
  updateCartUI();
}

function toggleCart(show) {
  if (show) {
    cartSidebar.classList.add('open');
  } else {
    cartSidebar.classList.remove('open');
  }
}

function updateCartUI() {
  let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (totalCount > 0) {
    cartBadge.classList.remove('hidden');
    cartBadge.innerText = totalCount;
  } else {
    cartBadge.classList.add('hidden');
  }

  // Render Sidebar items
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="opacity: 0.7;">Tu carrito está vacío.</p>';
  } else {
    cart.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-unit-price">$${parseInt(item.price).toLocaleString('es-CL')} c/u</p>
        </div>
        <div class="cart-item-actions">
          <div class="qty-controls">
            <button class="qty-btn btn-decrease" data-id="${item.id}" title="Restar unidad">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn btn-increase" data-id="${item.id}" title="Sumar unidad">+</button>
          </div>
          <span class="cart-item-subtotal">$${(item.quantity * item.price).toLocaleString('es-CL')}</span>
          <button class="btn-remove" data-id="${item.id}" title="Eliminar plato">
            <i class="ph ph-trash" style="font-size: 1.25rem;"></i>
          </button>
        </div>
      `;
      el.querySelector('.btn-decrease').addEventListener('click', () => changeQuantity(item.id, -1));
      el.querySelector('.btn-increase').addEventListener('click', () => changeQuantity(item.id, +1));
      el.querySelector('.btn-remove').addEventListener('click', () => removeFromCart(item.id));
      cartItemsContainer.appendChild(el);
    });
  }

  cartTotalEl.innerText = `$${totalPrice.toLocaleString('es-CL')}`;
  
  // Update header and total cart element
  document.getElementById('cart-title-count').innerText = `(${totalCount})`;
}

function handleCheckout() {
  if (cart.length === 0) return;
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let text = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n`;
  cart.forEach(item => {
    text += `- ${item.quantity}x ${item.name} ($${parseInt(item.price).toLocaleString('es-CL')} c/u) = $${(item.quantity * item.price).toLocaleString('es-CL')}\n`;
  });
  text += `\n*TOTAL: $${totalPrice.toLocaleString('es-CL')}*`;

  const cleanPhone = WHATSAPP_NUMBER.replace(/[^\d+]/g, '');
  const encodedText = encodeURIComponent(text);
  window.open(`https://wa.me/${cleanPhone}?text=${encodedText}`, '_blank');
}

// Ensure smooth scroll utility
window.scrollToSec = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Start
document.addEventListener('DOMContentLoaded', init);
