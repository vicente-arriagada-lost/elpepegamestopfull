# ElPepe Gamestop Frontend

Frontend de la aplicación ElPepe Gamestop desarrollado con React.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build
```

## 🔗 Vinculación con Backend

Este frontend está vinculado con el backend Spring Boot. Asegúrate de:

1. Tener el backend corriendo en `http://localhost:8080`
2. El servicio `ApiService.js` maneja todas las peticiones HTTP
3. El `authToken` se guarda automáticamente en localStorage

## 📁 Estructura de Servicios

```
src/
├── components/
│   ├── UserLogin.js       # Componente de login
│   ├── UserRegister.js    # Componente de registro
│   └── ...
└── services/
    └── ApiService.js      # Servicio centralizado de API
```

## 🔑 Autenticación

### Registro
```javascript
import ApiService from '../services/ApiService';

const response = await ApiService.signup({
  name: 'Jefferson',
  email: 'lol@aol.com',
  password: 'abc123456'
});
```

### Login
```javascript
const response = await ApiService.login({
  email: 'lol@aol.com',
  password: 'abc123456'
});
```

### Verificar Autenticación
```javascript
if (ApiService.isAuthenticated()) {
  const user = ApiService.getCurrentUser();
  console.log('Usuario autenticado:', user);
}
```

### Logout
```javascript
ApiService.logout();
```

## 📦 Dependencias Principales

- React 19.2.0
- React Bootstrap 2.10.10
- React Router DOM 7.9.4
- Bootstrap 5.3.8

## 🌐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```
REACT_APP_API_BASE_URL=http://localhost:8080/api/usuarios
```

## ⚙️ Configuración del Backend

El frontend espera que el backend esté disponible en:
- **Development**: `http://localhost:8080/api`
- **Production**: (configurar según despliegue)

## 🎨 Componentes de Autenticación

### UserLogin.js
- Maneja el inicio de sesión
- Valida email y password
- Guarda authToken en localStorage
- Muestra indicadores de carga
- Maneja errores del servidor

### UserRegister.js
- Maneja el registro de usuarios
- Campos: nombre, email, password, confirmPassword
- Validaciones en el frontend
- Guarda authToken tras registro exitoso
- Muestra indicadores de carga

## 📝 Notas de Desarrollo

1. El token de autenticación se almacena en `localStorage`
2. Las peticiones a la API usan `fetch` nativo
3. Los errores se manejan y muestran al usuario
4. La autenticación persiste entre recargas de página
