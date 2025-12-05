import React from 'react';
import { Offcanvas, Button, ListGroup, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import '../styles/ShoppingCart.css';

function ShoppingCart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    showCart, 
    setShowCart 
  } = useCart();

  const handleClose = () => setShowCart(false);

  const formatPrice = (price) => {
    if (!price) return '$0';
    if (typeof price === 'number') {
      return `$${price.toLocaleString('es-CL')}`;
    }
    if (typeof price === 'string') {
      if (price.startsWith('$')) {
        return price;
      }
      const numPrice = parseFloat(price.replace(/\D/g, ''));
      return `$${numPrice.toLocaleString('es-CL')}`;
    }
    return '$0';
  };

  return (
    <Offcanvas show={showCart} onHide={handleClose} placement="end" className="shopping-cart-offcanvas">
      <Offcanvas.Header closeButton className="cart-header">
        <Offcanvas.Title>
          <i className="fas fa-shopping-cart me-2"></i>
          Carrito de Compras
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="cart-body">
        {cartItems.length === 0 ? (
          <div className="empty-cart text-center py-5">
            <i className="fas fa-shopping-cart fa-4x mb-3 text-muted"></i>
            <h5>Tu carrito está vacío</h5>
            <p className="text-muted">Agrega productos para comenzar a comprar</p>
          </div>
        ) : (
          <>
            <ListGroup variant="flush" className="cart-items-list">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="cart-item">
                  <div className="d-flex gap-3">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre}
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=Producto';
                      }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="cart-item-name">{item.nombre}</h6>
                      <p className="cart-item-price mb-2">{formatPrice(item.precio)}</p>
                      <div className="d-flex align-items-center gap-2">
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                        <Badge bg="secondary" className="quantity-badge">
                          {item.quantity}
                        </Badge>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          <i className="fas fa-plus"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="ms-auto remove-btn"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            
            <div className="cart-footer">
              <div className="cart-total">
                <h5>Total a Pagar:</h5>
                <h4 className="total-price">
                  ${getCartTotal().toLocaleString('es-CL')}
                </h4>
              </div>
              <Button variant="primary" size="lg" className="w-100 checkout-btn">
                <i className="fas fa-credit-card me-2"></i>
                Proceder al Pago
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
