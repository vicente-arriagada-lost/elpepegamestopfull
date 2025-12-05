const API_BASE_URL = 'http://localhost:8080/api';
const USUARIOS_URL = `${API_BASE_URL}/usuarios`;
const PRODUCTOS_URL = `${API_BASE_URL}/productos`;

/**
 * Servicio para manejar las peticiones HTTP al backend
 */
class ApiService {
  /**
   * Registrar nuevo usuario
   * @param {Object} userData - Datos del usuario {name, email, password}
   * @returns {Promise<Object>} Respuesta con authToken y datos del usuario
   */
  async signup(userData) {
    try {
      const response = await fetch(`${USUARIOS_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al registrar usuario');
      }

      const data = await response.json();
      
      // Guardar el token si viene en la respuesta
      if (data.authToken) {
        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('user', JSON.stringify(data));
      }
      
      return data;
    } catch (error) {
      console.error('Error en signup:', error);
      throw error;
    }
  }

  /**
   * Login de usuario
   * @param {Object} credentials - Credenciales {email, password}
   * @returns {Promise<Object>} Respuesta con authToken y datos del usuario
   */
  async login(credentials) {
    try {
      const response = await fetch(`${USUARIOS_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Credenciales inválidas');
      }

      const data = await response.json();
      
      // Guardar el token y datos del usuario
      if (data.authToken) {
        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('user', JSON.stringify(data));
      }
      
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Logout del usuario
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  /**
   * Obtener el token de autenticación
   * @returns {string|null} Token de autenticación
   */
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Obtener los datos del usuario logueado
   * @returns {Object|null} Datos del usuario
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} True si está autenticado
   */
  isAuthenticated() {
    return !!this.getAuthToken();
  }

  // ==================== PRODUCTOS ====================

  /**
   * Obtener todos los productos con filtros opcionales
   * @param {Object} filters - Filtros {categoria, plataforma, destacado, enOferta}
   * @returns {Promise<Array>} Lista de productos
   */
  async getAllProductos(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.categoria) params.append('categoria', filters.categoria);
      if (filters.plataforma) params.append('plataforma', filters.plataforma);
      if (filters.destacado !== undefined) params.append('destacado', filters.destacado);
      if (filters.enOferta !== undefined) params.append('enOferta', filters.enOferta);

      const url = `${PRODUCTOS_URL}${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  }

  /**
   * Obtener producto por ID
   * @param {string} id - ID del producto
   * @returns {Promise<Object>} Datos del producto
   */
  async getProductoById(id) {
    try {
      const response = await fetch(`${PRODUCTOS_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  }

  /**
   * Buscar productos por término
   * @param {string} query - Término de búsqueda
   * @returns {Promise<Array>} Lista de productos
   */
  async searchProductos(query) {
    try {
      const response = await fetch(`${PRODUCTOS_URL}/buscar?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw error;
    }
  }

  /**
   * Obtener productos destacados
   * @returns {Promise<Array>} Lista de productos destacados
   */
  async getProductosDestacados() {
    try {
      const response = await fetch(`${PRODUCTOS_URL}/destacados`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener productos destacados');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
      throw error;
    }
  }

  /**
   * Obtener productos en oferta
   * @returns {Promise<Array>} Lista de productos en oferta
   */
  async getProductosOferta() {
    try {
      const response = await fetch(`${PRODUCTOS_URL}/ofertas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener productos en oferta');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener productos en oferta:', error);
      throw error;
    }
  }

  /**
   * Obtener productos por categoría
   * @param {string} categoria - Categoría del producto
   * @returns {Promise<Array>} Lista de productos de la categoría
   */
  async getProductosPorCategoria(categoria) {
    try {
      const response = await fetch(`${PRODUCTOS_URL}/categoria/${encodeURIComponent(categoria)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener productos por categoría');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
      throw error;
    }
  }
}

// Exportar una instancia singleton para usar en toda la aplicación
const apiServiceInstance = new ApiService();
export default apiServiceInstance;
