import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Col, Row, Badge, Button, Offcanvas } from 'react-bootstrap';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import ShoppingCart from './components/ShoppingCart';
import ContactForm from './components/ContactForm';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import { CartProvider, useCart } from './context/CartContext';

function AppNavbar({ onContactClick, onRegisterClick, onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { getCartItemsCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category, type = 'perifericos') => {
    navigate(`/${type}/${category}`);
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      fixed="top"
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          <i className="fas fa-gamepad me-2"></i>
          ElPepe Gamestop
        </Navbar.Brand>
        <Button 
          variant="outline-light" 
          size="sm"
          className="ms-2 d-none d-lg-inline-block"
          onClick={onLoginClick}
        >
          <i className="fas fa-sign-in-alt me-1"></i>
          Login
        </Button>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            <NavDropdown title={<><i className="fas fa-ghost me-1"></i> Juegos</>} id="nav-dropdown-juegos" className="nav-dropdown-custom">
              <NavDropdown.Item onClick={() => handleCategoryClick('ps5', 'juegos')}>
                <i className="fab fa-playstation me-2"></i> PlayStation 5
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<><i className="fas fa-tv me-1"></i> Consolas</>} id="nav-dropdown-consolas" className="nav-dropdown-custom">
              <NavDropdown.Item onClick={() => handleCategoryClick('playstation', 'consolas')}>
                <i className="fab fa-playstation me-2"></i> PlayStation
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('nintendo', 'consolas')}>
                <i className="fas fa-star me-2"></i> Nintendo
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('xbox', 'consolas')}>
                <i className="fab fa-xbox me-2"></i> Xbox
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('portable', 'consolas')}>
                <i className="fas fa-mobile-alt me-2"></i> Portátil
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<><i className="fas fa-keyboard me-1"></i> Periféricos</>} id="nav-dropdown-perifericos" className="nav-dropdown-custom">
              <NavDropdown.Item onClick={() => handleCategoryClick('teclados')}>
                <i className="fas fa-keyboard me-2"></i> Teclados
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('mouse')}>
                <i className="fas fa-mouse me-2"></i> Mouse
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('audifonos')}>
                <i className="fas fa-headphones me-2"></i> Audífonos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('volantes')}>
                <i className="fas fa-steering-wheel me-2"></i> Volantes
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategoryClick('controles')}>
                <i className="fas fa-gamepad me-2"></i> Controles
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={onContactClick} className="nav-link-custom" style={{ cursor: 'pointer' }}>
              <i className="fas fa-envelope me-1"></i> Contacto
            </Nav.Link>
            <Nav.Link onClick={onRegisterClick} className="nav-link-custom" style={{ cursor: 'pointer' }}>
              <i className="fas fa-user-plus me-1"></i> Registro
            </Nav.Link>
            <Button 
              variant="outline-light" 
              className="cart-button ms-2 position-relative"
              onClick={toggleCart}
            >
              <i className="fas fa-shopping-cart"></i>
              {getCartItemsCount() > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function AppContent() {
  const [showContact, setShowContact] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleContact = () => setShowContact(!showContact);
  const closeContact = () => setShowContact(false);
  
  const toggleRegister = () => setShowRegister(!showRegister);
  const closeRegister = () => setShowRegister(false);
  
  const toggleLogin = () => setShowLogin(!showLogin);
  const closeLogin = () => setShowLogin(false);

  return (
    <div className="App">
      <AppNavbar onContactClick={toggleContact} onRegisterClick={toggleRegister} onLoginClick={toggleLogin} />
      <ShoppingCart />
      
      <Offcanvas show={showContact} onHide={closeContact} placement="end" className="contact-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <i className="fas fa-envelope me-2"></i>
            Formulario de Contacto
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ContactForm onClose={closeContact} />
        </Offcanvas.Body>
      </Offcanvas>
      
      <Offcanvas show={showRegister} onHide={closeRegister} placement="end" className="contact-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <i className="fas fa-user-plus me-2"></i>
            Registro de Usuario
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserRegister onClose={closeRegister} />
        </Offcanvas.Body>
      </Offcanvas>
      
      <Offcanvas show={showLogin} onHide={closeLogin} placement="end" className="contact-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <i className="fas fa-sign-in-alt me-2"></i>
            Iniciar Sesión
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserLogin onClose={closeLogin} />
        </Offcanvas.Body>
      </Offcanvas>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perifericos/teclados" element={<CategoryPage category="teclados" type="perifericos" />} />
        <Route path="/perifericos/mouse" element={<CategoryPage category="mouse" type="perifericos" />} />
        <Route path="/perifericos/audifonos" element={<CategoryPage category="audifonos" type="perifericos" />} />
        <Route path="/perifericos/volantes" element={<CategoryPage category="volantes" type="perifericos" />} />
        <Route path="/perifericos/controles" element={<CategoryPage category="controles" type="perifericos" />} />
        <Route path="/consolas/playstation" element={<CategoryPage category="playstation" type="consolas" />} />
        <Route path="/consolas/nintendo" element={<CategoryPage category="nintendo" type="consolas" />} />
        <Route path="/consolas/xbox" element={<CategoryPage category="xbox" type="consolas" />} />
        <Route path="/consolas/portable" element={<CategoryPage category="portable" type="consolas" />} />
        <Route path="/juegos/ps5" element={<CategoryPage category="ps5" type="juegos" />} />
      </Routes>

        <footer className="custom-footer">
          <Container>
            <Row className="py-5">
              <Col xs={12} md={4} className="mb-4 mb-md-0">
                <h5 className="footer-title">
                  <i className="fas fa-gamepad me-2"></i>
                  ElPepe Gamestop
                </h5>
                <p className="footer-description">
                  Tu tienda de confianza para todo lo relacionado con videojuegos, consolas y accesorios gaming.
                </p>
                <div className="social-links mt-3">
                  <a href="#facebook" className="social-link"><i className="fab fa-facebook-f"></i></a>
                  <a href="#twitter" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#instagram" className="social-link"><i className="fab fa-instagram"></i></a>
                  <a href="#youtube" className="social-link"><i className="fab fa-youtube"></i></a>
                </div>
              </Col>
              <Col xs={12} md={4} className="mb-4 mb-md-0">
                <h5 className="footer-title">Enlaces Rápidos</h5>
                <ul className="footer-links">
                  <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
                  <li><a href="#politica-privacidad">Política de Privacidad</a></li>
                  <li><a href="#terminos">Términos y Condiciones</a></li>
                  <li><a href="#faq">Preguntas Frecuentes</a></li>
                </ul>
              </Col>
              <Col xs={12} md={4}>
                <h5 className="footer-title">Contacto</h5>
                <ul className="footer-contact">
                  <li><i className="fas fa-map-marker-alt me-2"></i> Santiago, Chile</li>
                  <li><i className="fas fa-phone me-2"></i> +56 9 1234 5678</li>
                  <li><i className="fas fa-envelope me-2"></i> info@elpepegamestop.cl</li>
                </ul>
              </Col>
            </Row>
            <hr className="footer-divider" />
            <Row className="py-3">
              <Col className="text-center">
                <p className="mb-0 footer-copyright">
                  © 2025 N.W.A - ElPepe Gamestop | Equipo: Jeferson Carbonell, Roberto Jara, Vicente Arriagada, Ice Cube
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
