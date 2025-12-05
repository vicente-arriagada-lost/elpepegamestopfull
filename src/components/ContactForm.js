import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

function ContactForm({ onClose }) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });
    
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensaje({ tipo: '', texto: '' });

        try {
            // Simulación de envío (plug and play - puede integrarse con API real)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simulación de éxito (90% de probabilidad)
            const exito = Math.random() > 0.1;
            
            if (exito) {
                setMensaje({
                    tipo: 'success',
                    texto: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'
                });
                
                // Limpiar formulario
                setFormData({
                    nombre: '',
                    email: '',
                    mensaje: ''
                });

                // Cerrar modal después de 2 segundos
                setTimeout(() => {
                    if (onClose) {
                        onClose();
                    }
                }, 2000);
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            setMensaje({
                tipo: 'danger',
                texto: 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.'
            });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="contact-form-container">
            <h2 className="mb-4">Contáctanos</h2>
            
            {mensaje.texto && (
                <Alert variant={mensaje.tipo} onClose={() => setMensaje({ tipo: '', texto: '' })} dismissible>
                    {mensaje.texto}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input 
                        id="nombre" 
                        name="nombre"
                        type="text" 
                        className="form-control" 
                        value={formData.nombre}
                        onChange={handleChange}
                        required 
                        disabled={enviando}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        id="email" 
                        name="email"
                        type="email" 
                        className="form-control" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        disabled={enviando}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea 
                        id="mensaje" 
                        name="mensaje"
                        className="form-control" 
                        rows="4" 
                        value={formData.mensaje}
                        onChange={handleChange}
                        required 
                        disabled={enviando}
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary w-100" 
                    disabled={enviando}
                >
                    {enviando ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Enviando...
                        </>
                    ) : (
                        'Enviar Mensaje'
                    )}
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
