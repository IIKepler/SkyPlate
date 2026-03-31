<?php
session_start();

// Configuración de credenciales (idealmente en base de datos o variables de entorno)
$admin_user = "admin";
$admin_pass = "admin";

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if ($username === $admin_user && $password === $admin_pass) {
        $_SESSION['role'] = 'admin';
        $_SESSION['logged_in'] = true;
        header("Location: admin.php");
        exit();
    } elseif (!empty($username) || !empty($password)) {
        $error = "Usuario o contraseña incorrectos.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkyPlate - Iniciar Sesión</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="theme-cold">
  <div class="login-container">
    <div class="login-form-wrapper">
      <h2>SkyPlate Login</h2>
      
      <?php if ($error): ?>
        <div style="background: #ef4444; color: white; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; text-align: center;">
          <?php echo htmlspecialchars($error); ?>
        </div>
      <?php endif; ?>

      <form method="POST" action="login.php" style="display: flex; flex-direction: column; gap: 1rem;">
        <div class="input-group">
          <i class="ph ph-user"></i>
          <input type="text" name="username" placeholder="Usuario" required autocomplete="off">
        </div>
        
        <div class="input-group">
          <i class="ph ph-lock-key"></i>
          <input type="password" name="password" placeholder="Contraseña" required>
        </div>
        
        <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">Ingresar</button>
        
        <div style="text-align: center; margin-top: 1rem;">
          <a href="index.php" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem;">Volver al menú</a>
        </div>
      </form>
    </div>
  </div>
</body>
</html>
