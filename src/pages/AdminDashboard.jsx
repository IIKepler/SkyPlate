import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Upload, Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [newDish, setNewDish] = useState({ name: '', price: '', category: '', type: 'Plato', description: '' });

  useEffect(() => {
    const savedMenu = JSON.parse(localStorage.getItem('skyplate_menu_v7') || '[]');
    setMenu(savedMenu);
  }, []);

  const categorizeDish = (name) => {
    const coldKeywords = ['ensalada', 'helado', 'postre', 'frío', 'frio', 'bebida', 'sushi', 'ceviche', 'jugo', 'agua', 'vino'];
    const lowerName = name.toLowerCase();
    const isCold = coldKeywords.some(kw => lowerName.includes(kw));
    return isCold ? 'Frío' : 'Caliente';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
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

      const updatedMenu = [...menu, ...newDishes];
      setMenu(updatedMenu);
      localStorage.setItem('skyplate_menu_v7', JSON.stringify(updatedMenu));
    };
    reader.readAsBinaryString(file);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!newDish.name.trim()) return;

    const dishCat = newDish.category || categorizeDish(newDish.name);
    
    const dish = {
      id: Date.now(),
      name: newDish.name,
      price: parseFloat(newDish.price) || 0,
      category: dishCat,
      type: newDish.type || 'Plato',
      description: newDish.description || '',
      image: newDish.image || ''
    };

    const updatedMenu = [...menu, dish];
    setMenu(updatedMenu);
    localStorage.setItem('skyplate_menu_v7', JSON.stringify(updatedMenu));
    setNewDish({ name: '', price: '', category: '', type: 'Plato', description: '' });
  };

  const removeDish = (id) => {
    const updated = menu.filter(d => d.id !== id);
    setMenu(updated);
    localStorage.setItem('skyplate_menu_v7', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--bg-dark)', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Panel de Administración</h1>
        <button className="btn btn-primary" onClick={() => navigate('/menu')}>Ver Menú Cliente</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'var(--bg-form)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Upload /> Cargar desde Excel
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '1rem', fontSize: '0.875rem' }}>
            El archivo debe contener las columnas: Nombre, Precio, Descripcion.
          </p>
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleFileUpload}
            style={{ display: 'block', width: '100%', padding: '0.5rem', background: '#374151', borderRadius: '0.5rem', color: 'white', border: '1px solid #4b5563', cursor: 'pointer' }}
          />
        </div>

        <div style={{ background: 'var(--bg-form)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus /> Entrada Manual
          </h2>
          <form onSubmit={handleManualSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Nombre del plato" 
              value={newDish.name}
              onChange={e => setNewDish({...newDish, name: e.target.value})}
              required
              style={{ padding: '0.75rem', borderRadius: '0.5rem', background: '#374151', color: 'white', border: '1px solid #4b5563' }}
            />
            <input 
              type="number" 
              placeholder="Precio ($)" 
              value={newDish.price}
              onChange={e => setNewDish({...newDish, price: e.target.value})}
              required
              style={{ padding: '0.75rem', borderRadius: '0.5rem', background: '#374151', color: 'white', border: '1px solid #4b5563' }}
            />
            <select
              value={newDish.type}
              onChange={e => setNewDish({...newDish, type: e.target.value})}
              style={{ padding: '0.75rem', borderRadius: '0.5rem', background: '#374151', color: 'white', border: '1px solid #4b5563' }}
            >
              <option value="Plato">Plato</option>
              <option value="Bebida">Bebida</option>
            </select>
            <button type="submit" className="btn btn-primary">Agregar Plato</button>
          </form>
        </div>
      </div>

      <div style={{ marginTop: '2rem', background: 'var(--bg-form)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Menú Actual ({menu.length} platos)</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {menu.map(dish => (
            <div key={dish.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#374151', borderRadius: '0.5rem' }}>
              <div>
                <h3 style={{ fontWeight: '600' }}>
                  {dish.name} 
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: dish.category === 'Frío' ? '#3b82f6' : '#ef4444', borderRadius: '1rem', marginLeft: '0.5rem' }}>
                    {dish.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: '#4b5563', borderRadius: '1rem', marginLeft: '0.5rem' }}>
                    {dish.type || 'Plato'}
                  </span>
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>${dish.price.toLocaleString('es-CL')}</p>
              </div>
              <button 
                onClick={() => removeDish(dish.id)}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash2 />
              </button>
            </div>
          ))}
          {menu.length === 0 && <p style={{ color: '#9ca3af' }}>No hay platos en el menú.</p>}
        </div>
      </div>
    </div>
  );
}
