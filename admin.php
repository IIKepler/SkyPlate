<?php
session_start();

// Validar que exista la sesión de administrador
if (!isset($_SESSION['logged_in']) || $_SESSION['role'] !== 'admin') {
    // Si no está validado, redirigir a la página de login
    header("Location: login.php");
    exit();
}

// Lógica de cerrar sesión si el parametro logout es enviado
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_unset();
    session_destroy();
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkyPlate - Dashboard de Administración</title>
  
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  
  <!-- SheetJS para cargar el archivo excel -->
  <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
  
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="theme-cold">
  <div class="admin-container">
    <div class="admin-header">
      <h1 style="font-size: 2rem; font-weight: bold;">Panel de Administración</h1>
      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-primary" onclick="window.location.href='index.php'">Ver Menú Cliente</button>
        <button class="btn" style="background: #ef4444; color: white;" onclick="window.location.href='admin.php?action=logout'">
          <i class="ph ph-sign-out"></i> Cerrar Sesión
        </button>
      </div>
    </div>

    <div class="admin-grid">
      <!-- Cargar Excel -->
      <div class="admin-panel">
        <h2><i class="ph ph-upload-simple"></i> Cargar desde Excel</h2>
        <p style="color: #9ca3af; margin-bottom: 1rem; font-size: 0.875rem;">
          El archivo debe contener las columnas: Nombre, Precio, Categoria, Tipo, Descripcion.
        </p>
        <input type="file" id="excel-file" accept=".xlsx, .xls" style="cursor: pointer;">
      </div>

      <!-- Entrada Manual -->
      <div class="admin-panel">
        <h2><i class="ph ph-plus"></i> Entrada Manual</h2>
        <form id="form-manual" style="display: flex; flex-direction: column;">
          <input type="text" id="dish-name" placeholder="Nombre del plato" required>
          <input type="number" id="dish-price" placeholder="Precio ($)" required>
          
          <select id="dish-type" required>
            <option value="Plato">Plato</option>
            <option value="Bebida">Bebida</option>
          </select>
          
          <input type="text" id="dish-desc" placeholder="Descripción breve (opcional)">

          <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">Agregar Plato</button>
        </form>
      </div>
    </div>

    <!-- Lista de Platos Actuales -->
    <div class="admin-list">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
        <h2 style="margin: 0;">Menú Actual (<span id="menu-count">0</span> platos)</h2>
        <input type="text" id="search-input" placeholder="Buscar por nombre..." style="padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 6px; width: 100%; max-width: 300px; font-family: inherit;">
      </div>
      <div id="menu-list" style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- Elementos del menu dinámicos desde admin.js -->
        <p style="color: #9ca3af;">Cargando menú...</p>
      </div>
    </div>
  </div>

  <script src="js/admin.js"></script>
</body>
</html>
