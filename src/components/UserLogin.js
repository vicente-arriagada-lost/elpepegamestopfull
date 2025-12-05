import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ApiService from '../services/ApiService';

export default function UserLogin({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar estado de error cuando el usuario escribe
    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.email || !formData.password) {
      setSubmitStatus('error');
      setErrorMessage('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    
    try {
      // Llamar al backend para autenticar
      const response = await ApiService.login({
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login exitoso:', response);
      setSubmitStatus('success');
      
      // Cerrar modal después de 1.5 segundos
      setTimeout(() => {
        setFormData({
          email: '',
          password: ''
        });
        setSubmitStatus(null);
        if (onClose) onClose();
        
        // Recargar la página para actualizar el estado de autenticación
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Error en login:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-login-form">
      {submitStatus === 'success' && (
        <Alert variant="success" className="mb-3">
          <i className="fas fa-check-circle me-2"></i>
          ¡Inicio de sesión exitoso!
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="danger" className="mb-3">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errorMessage || 'Revisar elementos ingresados'}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-envelope me-2"></i>
            Correo Electrónico
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            autoComplete="email"
            disabled={isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            disabled={isLoading}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Iniciando sesión...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Iniciar Sesión
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}



