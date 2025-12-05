import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ApiService from '../services/ApiService';

function UserRegister({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Enviar datos al backend
        const response = await ApiService.signup({
          name: formData.nombre,
          email: formData.email,
          password: formData.password
        });
        
        console.log('Registro exitoso:', response);
        setSubmitStatus('success');
        
        // Resetear formulario y cerrar después de 2 segundos
        setTimeout(() => {
          setFormData({
            nombre: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          setSubmitStatus(null);
          if (onClose) onClose();
        }, 2000);
        
      } catch (error) {
        console.error('Error en registro:', error);
        setSubmitStatus('error');
        setErrors({ submit: error.message || 'Error al registrar usuario' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="user-register-form">
      {submitStatus === 'success' && (
        <Alert variant="success" className="mb-3">
          <i className="fas fa-check-circle me-2"></i>
          ¡Registro exitoso! Bienvenido a ElPepe Gamestop.
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="danger" className="mb-3">
          <i className="fas fa-exclamation-circle me-2"></i>
          {errors.submit || 'Por favor, corrige los errores en el formulario.'}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-user me-2"></i>
            Nombre *
          </Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            isInvalid={!!errors.nombre}
            placeholder="Ingresa tu nombre completo"
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-envelope me-2"></i>
            Email *
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="ejemplo@correo.com"
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Contraseña *
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Mínimo 6 caracteres"
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="fas fa-lock me-2"></i>
            Confirmar Contraseña *
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
            placeholder="Repite tu contraseña"
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Registrando...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Registrarse
              </>
            )}
          </Button>
        </div>

        <p className="text-muted text-center mt-3 small">
          Los campos marcados con * son obligatorios
        </p>
      </Form>
    </div>
  );
}

export default UserRegister;
