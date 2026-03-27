import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, LogOut, Sun, CloudRain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const INITIAL_MENU = [
  // 8 Platos Fríos (Italian)
  { id: 1, name: "Carpaccio de Ternera", category: "Frío", price: 18.5, description: "Finas láminas de ternera con rúcula, alcaparras y lluvia de parmesano.", image: "https://images.unsplash.com/photo-1541592654513-f4270ebc0903?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Ensalada Caprese", category: "Frío", price: 14.0, description: "Mozzarella di bufala, tomates cherry asados y pesto genovés de albahaca.", image: "https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Tiramisú Tradizionale", category: "Frío", price: 9.5, description: "Bizcochos savoiardi bañados en café expreso con crema montada de mascarpone.", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Burrata Cremosa", category: "Frío", price: 16.0, description: "Burrata fresca de corazón líquido, prosciutto italiano y reducción de balsámico.", image: "https://images.unsplash.com/photo-1628108922245-5df8524d7768?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Bruschetta al Pomodoro", category: "Frío", price: 11.0, description: "Rebajas de pan campesino con ajo frotado, tomate fresco y aceite de oliva.", image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873ce4?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Panna Cotta de Frutos Rojos", category: "Frío", price: 8.5, description: "Postre clásico piamontés de crema avainillada con un exquisito coulis.", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600" },
  { id: 7, name: "Vitello Tonnato", category: "Frío", price: 21.0, description: "Cortes finos de ternera bañados en una suave salsa de atún, anchoas y alcaparras.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "Ensalada Panzanella", category: "Frío", price: 13.5, description: "Ensalada toscana rústica con pan crujiente, tomate reliquia y vinagreta.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600" },

  // 8 Platos Calientes (Italian)
  { id: 9, name: "Lasaña Boloñesa", category: "Caliente", price: 19.5, description: "Lasaña tradicional al horno con bechamel casera, ragú de carne y gratinado de queso.", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=600" },
  { id: 10, name: "Pizza Margherita Napoli", category: "Caliente", price: 15.0, description: "Masa madre a la piedra con salsa San Marzano, fior di latte y hojas de albahaca.", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=600" },
  { id: 11, name: "Risotto ai Funghi", category: "Caliente", price: 22.0, description: "Arroz arborio cremoso con setas porcini silvestres al vino blanco y trufa.", image: "https://images.unsplash.com/photo-1633337474564-1d9aba52f442?auto=format&fit=crop&q=80&w=600" },
  { id: 12, name: "Sopa Minestrone", category: "Caliente", price: 12.0, description: "Sopa rústica reconfortante de vegetales de temporada, alubias tiernas y pasta.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600" },
  { id: 13, name: "Spaghetti Carbonara", category: "Caliente", price: 17.5, description: "Receta romana original: guanciale crujiente, yemas, pecorino romano y pimienta.", image: "https://images.unsplash.com/photo-1612874742237-65262215c0a9?auto=format&fit=crop&q=80&w=600" },
  { id: 14, name: "Ossobuco alla Milanese", category: "Caliente", price: 28.0, description: "Estofado tierno de ternera servido con reducción de sus jugos sobre polenta.", image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600" },
  { id: 15, name: "Pizza Quattro Formaggi", category: "Caliente", price: 18.0, description: "Exquisita masa crujiente con gorgonzola, mozzarella, parmesano y ricotta fresca.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600" },
  { id: 16, name: "Raviolis de Espinaca", category: "Caliente", price: 18.5, description: "Pasta fresca artesanal rellena de espinaca y ricotta, bañada en mantequilla y salvia.", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600" }
];

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState('Frío');
  const [weatherMsg, setWeatherMsg] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Menu
    let saved = JSON.parse(localStorage.getItem('restaurant_menu') || 'null');
    // Forzamos la carga del menú italiano si hay menos de 10 platos guardados
    if (!saved || saved.length < 10) {
      localStorage.setItem('restaurant_menu', JSON.stringify(INITIAL_MENU));
      saved = INITIAL_MENU;
    }
    setMenu(saved);

    // Weather API (Open-Meteo) con Geolocalización Real
    const fetchWeather = (lat, lon) => {
      const apiUrl = import.meta.env.VITE_WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast';
      axios.get(`${apiUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(res => {
          const temp = res.data.current_weather.temperature;
          if (temp > 20) {
            setCategory('Frío');
            setWeatherMsg(`Hace ${temp}°C en tu ubicación. ¡Ideal para algo Frío!`);
          } else {
            setCategory('Caliente');
            setWeatherMsg(`Hace ${temp}°C en tu ubicación. ¡Ideal para algo Caliente!`);
          }
        })
        .catch(err => console.error("Error weather API", err));
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
        (error) => {
          console.warn("Geolocalización denegada o fallida. Usando coordenadas por defecto.", error);
          fetchWeather(-34.61, -58.38); // Fallback por defecto
        }
      );
    } else {
      fetchWeather(-34.61, -58.38);
    }
  }, []);

  useEffect(() => {
    document.body.className = category === 'Frío' ? 'theme-cold' : 'theme-hot';
  }, [category]);

  const toggleCategory = () => setCategory(c => c === 'Frío' ? 'Caliente' : 'Frío');

  const addToCart = (dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const currentDishes = menu.filter(d => d.category === category);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', transition: 'all 0.5s', position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>SkyPlate</h1>
          {weatherMsg && <p style={{ opacity: 0.9, fontSize: '0.9rem', marginTop: '0.5rem' }}>🌤 {weatherMsg}</p>}
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={toggleCategory}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: 'none', background: category === 'Frío' ? '#3b82f6' : '#ef4444', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
          >
            {category === 'Frío' ? <CloudRain /> : <Sun />}
            Ver Menú {category === 'Frío' ? 'Caliente' : 'Frío'}
          </button>

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            <ShoppingCart size={32} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: '1rem' }} title="Salir">
            <LogOut size={28} />
          </button>
        </div>
      </header>

      <main>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
          Nuestros Platos {category === 'Frío' ? '❄️' : '🔥'}
        </h2>

        {currentDishes.length === 0 ? (
          <p style={{ opacity: 0.8, fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>No hay platos disponibles en esta categoría.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {currentDishes.map(dish => (
              <div key={dish.id} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '1rem', transition: 'transform 0.2s', cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                {dish.image && (
                  <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{dish.name}</h3>
                  {dish.description && <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.5rem', flexGrow: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{dish.description}</p>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>${dish.price.toFixed(2)}</span>
                    <button className="btn btn-primary" onClick={() => addToCart(dish)} style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>Agregar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '4rem', padding: '2rem 1rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.2)', color: 'rgba(0, 0, 0, 0.8)' }}>
        <p style={{ fontSize: '1rem', fontWeight: '500', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          &copy; {new Date().getFullYear()} SkyPlate. Todos los derechos reservados.
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.7, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Un rincón del mundo en cada bocado.
        </p>
      </footer>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100vh', background: 'rgba(31, 41, 55, 0.95)', backdropFilter: 'blur(20px)', color: 'white', padding: '2rem', boxShadow: '-5px 0 25px rgba(0,0,0,0.6)', zIndex: 50, overflowY: 'auto', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShoppingCart /> Carrito ({cartCount})</h2>
            <button onClick={() => setIsCartOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', lineHeight: '1' }}>&times;</button>
          </div>

          {cart.length === 0 ? (
            <p style={{ opacity: 0.7 }}>Tu carrito está vacío.</p>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontWeight: 'bold' }}>{item.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{item.quantity} x ${item.price.toFixed(2)}</p>
                    </div>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', fontSize: '1.1rem', background: '#2563eb' }}>
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
