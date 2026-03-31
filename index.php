<?php
// Configuración de variables básicas usando PHP
// Idealmente en un archivo config.php, pero para mantenerlo simple aquí mismo.
$whatsapp_number = '+569757152957';
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkyPlate - Web Menu</title>
  
  <!-- Font -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  
  <!-- Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  
  <!-- Styles -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="theme-cold">

  <script>
    // Pasar variables PHP a Javascript de forma segura
    window.APP_CONFIG = {
      whatsapp: '<?php echo $whatsapp_number; ?>'
    };
  </script>

  <!-- Floating Quick Navigation -->
  <div class="floating-nav">
    <a href="#seccion-platos" class="float-btn">
      <i class="ph ph-fork-knife" style="font-size: 28px; margin-bottom: 0.3rem;"></i>
      <span>Ver Platos</span>
    </a>
    <a href="#seccion-bebidas" class="float-btn">
      <i class="ph ph-brandy" style="font-size: 28px; margin-bottom: 0.3rem;"></i>
      <span>Ver Bebidas</span>
    </a>
  </div>

  <div class="container">
    <header class="header">
      <div>
        <h1 class="header-title">SkyPlate</h1>
        <p class="weather-msg" id="weather-msg">🌤 Cargando clima...</p>
      </div>

      <div class="header-actions">
        <button id="btn-toggle-theme" class="btn-toggle-theme frio">
          <i class="ph ph-cloud-rain" style="font-size: 1.2rem;"></i> Ver Menú Caliente
        </button>

        <button id="btn-cart" class="btn-cart">
          <i class="ph ph-shopping-cart" style="font-size: 2rem;"></i>
          <span id="cart-badge" class="cart-badge hidden">0</span>
        </button>

        <button onclick="window.location.href='login.php'" class="btn-logout" title="Salir">
          <i class="ph ph-sign-out" style="font-size: 1.75rem;"></i>
        </button>
      </div>
    </header>

    <main>
      <!-- Sección Platos -->
      <section id="seccion-platos" class="menu-section">
        <h2 class="section-title">
          Nuestros Platos <span id="food-title-icon">❄️</span>
        </h2>
        <p id="empty-food-msg" class="hidden" style="opacity: 0.8; font-size: 1.2rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">No hay platos disponibles en esta categoría.</p>
        <div id="food-container" class="grid-container">
          <!-- Platos cargados con JS aquí -->
        </div>
      </section>

      <!-- Sección Bebidas -->
      <section id="seccion-bebidas" class="menu-section">
        <h2 class="section-title">
          Nuestras Bebidas <span id="drink-title-icon">❄️</span>
        </h2>
        <p id="empty-drink-msg" class="hidden" style="opacity: 0.8; font-size: 1.2rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">No hay bebidas disponibles en esta categoría.</p>
        <div id="drink-container" class="grid-container">
          <!-- Bebidas cargadas con JS aquí -->
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p style="font-size: 1rem; font-weight: 500;">
        &copy; <?php echo date("Y"); ?> SkyPlate. Todos los derechos reservados.
      </p>
      <p style="margin-top: 0.5rem; font-size: 0.85rem; opacity: 0.7;">
        Un rincón del mundo en cada bocado.
      </p>
    </footer>
  </div> <!-- Fin container -->

  <!-- Cart Sidebar -->
  <div id="cart-sidebar" class="cart-sidebar">
    <div class="cart-header">
      <h2 class="cart-title"><i class="ph ph-shopping-cart"></i> Carrito <span id="cart-title-count">(0)</span></h2>
      <button id="btn-close-cart" class="cart-close">&times;</button>
    </div>

    <div id="cart-items-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
      <p style="opacity: 0.7;">Tu carrito está vacío.</p>
    </div>

    <div class="cart-footer">
      <div class="cart-total">
        <span>Total:</span>
        <span id="cart-total">$0</span>
      </div>
      <button id="btn-checkout" class="btn-checkout">
        Finalizar Compra por WhatsApp
      </button>
    </div>
  </div>

  <!-- Script Menu -->
  <script src="js/menu.js"></script>
</body>
</html>
