import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, LogOut, Sun, CloudRain, Trash2, Utensils, CupSoda } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState('Frío');
  const [weatherMsg, setWeatherMsg] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem('skyplate_menu_v7') || 'null');
    if (!saved || saved.length < 24) {
      localStorage.setItem('skyplate_menu_v7', JSON.stringify(INITIAL_MENU));
      saved = INITIAL_MENU;
    }
    setMenu(saved);

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

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '+569757152957';
    let text = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n`;
    cart.forEach(item => {
      text += `- ${item.quantity}x ${item.name} ($${item.price.toLocaleString('es-CL')} c/u) = $${(item.quantity * item.price).toLocaleString('es-CL')}\n`;
    });
    text += `\n*TOTAL: $${cartTotal.toLocaleString('es-CL')}*`;

    // Eliminamos caracteres no numericos (excepto +) del numero telefonico
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const encodedText = encodeURIComponent(text);

    window.open(`https://wa.me/${cleanPhone}?text=${encodedText}`, '_blank');
  };

  // Filtrando los platos y bebidas segun tipo y categoria
  const foodItems = menu.filter(d => d.category === category && (d.type === 'Plato' || !d.type));
  const drinkItems = menu.filter(d => d.category === category && d.type === 'Bebida');

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSec = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', transition: 'all 0.5s', position: 'relative' }}>

      {/* Floating Quick Navigation */}
      <div style={{ position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 40 }}>
        <button onClick={() => scrollToSec('seccion-platos')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '1rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}>
          <Utensils size={28} style={{ marginBottom: '0.3rem' }} />
          <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>Ver Platos</span>
        </button>
        <button onClick={() => scrollToSec('seccion-bebidas')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '1rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}>
          <CupSoda size={28} style={{ marginBottom: '0.3rem' }} />
          <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>Ver Bebidas</span>
        </button>
      </div>

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
        {/* Sección Platos */}
        <section id="seccion-platos" style={{ marginBottom: '4rem', scrollMarginTop: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
            Nuestros Platos {category === 'Frío' ? '❄️' : '🔥'}
          </h2>

          {foodItems.length === 0 ? (
            <p style={{ opacity: 0.8, fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>No hay platos disponibles en esta categoría.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {foodItems.map(dish => (
                <div key={dish.id} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '1rem', transition: 'transform 0.2s', cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  {dish.image && (
                    <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  )}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{dish.name}</h3>
                    {dish.description && <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.5rem', flexGrow: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{dish.description}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>${dish.price.toLocaleString('es-CL')}</span>
                      <button className="btn btn-primary" onClick={() => addToCart(dish)} style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>Agregar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sección Bebidas */}
        <section id="seccion-bebidas" style={{ scrollMarginTop: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
            Nuestras Bebidas {category === 'Frío' ? '❄️' : '🔥'}
          </h2>

          {drinkItems.length === 0 ? (
            <p style={{ opacity: 0.8, fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>No hay bebidas disponibles en esta categoría.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {drinkItems.map(dish => (
                <div key={dish.id} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '1rem', transition: 'transform 0.2s', cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  {dish.image && (
                    <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '180px', objectFit: 'cover', objectPosition: 'center' }} />
                  )}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{dish.name}</h3>
                    {dish.description && <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.5rem', flexGrow: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>{dish.description}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>${dish.price.toLocaleString('es-CL')}</span>
                      <button className="btn btn-primary" onClick={() => addToCart(dish)} style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>Agregar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
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
                      <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{item.quantity} x ${item.price.toLocaleString('es-CL')}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${(item.quantity * item.price).toLocaleString('es-CL')}</span>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Eliminar plato">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  <span>Total:</span>
                  <span>${cartTotal.toLocaleString('es-CL')}</span>
                </div>
                <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', fontSize: '1.1rem', background: '#25eb5f', color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                  Finalizar Compra por WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
