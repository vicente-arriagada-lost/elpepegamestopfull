import React, { useState, useEffect } from 'react';
import { Container, Carousel, Card, Button, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ApiService from '../services/ApiService';
import switchImg from '../assets/img/switch_2.jpg';
import ps5Img from '../assets/img/1366_2000.jpg';
import steamImg from '../assets/img/Steam-Deck.jpg';

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await ApiService.getAllProductos();
        
        // Seleccionar productos destacados (puedes modificar la lógica)
        // Por ahora, seleccionamos los primeros 3 productos
        const featured = allProducts
          .slice(0, 3)
          .map(product => ({
            ...product,
            badge: product.id === 34 ? 'Nuevo' : product.id === 24 ? 'Popular' : 'Oferta',
            badgeVariant: product.id === 34 ? 'success' : product.id === 24 ? 'primary' : 'danger'
          }));
        
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error al cargar productos destacados:', error);
        // Mantener productos por defecto en caso de error
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const formatPrice = (price) => {
    if (typeof price === 'string' && price.startsWith('$')) {
      return price;
    }
    return `$${parseInt(price).toLocaleString('es-CL')}`;
  };

  return (
    <>
      <div className="hero-section">
        <Carousel fade controls indicators interval={4000} pause="hover" className="hero-carousel">
          <Carousel.Item>
            <div className="carousel-image-wrapper">
              <img className="d-block w-100 carousel-img" src={switchImg} alt="Nintendo Switch" />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="carousel-caption-custom">
              <h1 className="display-4 fw-bold">Nintendo Switch 2</h1>
              <p className="lead">Descubre la nueva generación de juegos portátiles</p>
              <Button 
                variant="primary" 
                size="lg" 
                className="cta-button"
                onClick={() => navigate('/consolas/nintendo')}
              >
                Ver Más <i className="fas fa-arrow-right ms-2"></i>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-wrapper">
              <img className="d-block w-100 carousel-img" src={ps5Img} alt="PlayStation 5" />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="carousel-caption-custom">
              <h1 className="display-4 fw-bold">PlayStation 5</h1>
              <p className="lead">Experimenta el gaming de próxima generación</p>
              <Button 
                variant="primary" 
                size="lg" 
                className="cta-button"
                onClick={() => navigate('/consolas/playstation')}
              >
                Explorar <i className="fas fa-arrow-right ms-2"></i>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-wrapper">
              <img className="d-block w-100 carousel-img" src={steamImg} alt="Steam Deck" />
              <div className="carousel-overlay"></div>
            </div>
            <Carousel.Caption className="carousel-caption-custom">
              <h1 className="display-4 fw-bold">Steam Deck</h1>
              <p className="lead">Tu biblioteca de Steam en cualquier lugar</p>
              <Button 
                variant="primary" 
                size="lg" 
                className="cta-button"
                onClick={() => navigate('/consolas/portable')}
              >
                Comprar Ahora <i className="fas fa-arrow-right ms-2"></i>
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <main className="main-content">
        <Container>
          <section className="featured-section py-5">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Productos Destacados</h2>
              <p className="section-subtitle">Las mejores ofertas en consolas y accesorios gaming</p>
            </div>
            
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3">Cargando productos destacados...</p>
              </div>
            ) : (
              <Row className="g-4">
                {featuredProducts.length > 0 ? (
                  featuredProducts.map((product) => (
                    <Col key={product.id} xs={12} md={6} lg={4}>
                      <Card className="product-card h-100 shadow-sm">
                        <div className="product-image-wrapper">
                          <Card.Img 
                            variant="top" 
                            src={product.imageUrl || product.imagen || 'https://via.placeholder.com/300x300?text=Sin+Imagen'} 
                            className="product-image"
                            onError={(e) => {
                              console.error('Error loading image for product:', product.name, product.imageUrl);
                              e.target.src = 'https://via.placeholder.com/300x300?text=Sin+Imagen';
                            }}
                          />
                          <Badge bg={product.badgeVariant} className="product-badge">
                            {product.badge}
                          </Badge>
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <div className="mb-2">
                            <span className="category-label">{product.category}</span>
                          </div>
                          <Card.Title className="product-title">{product.name}</Card.Title>
                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center">
                              <h4 className="price-text mb-0">{formatPrice(product.price)}</h4>
                              <Button 
                                variant="primary" 
                                className="add-to-cart-btn"
                                onClick={() => addToCart(product)}
                              >
                                <i className="fas fa-shopping-cart me-2"></i>
                                Agregar
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col xs={12} className="text-center">
                    <p>No hay productos destacados disponibles</p>
                  </Col>
                )}
              </Row>
            )}
          </section>

          <section className="categories-section py-5">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Explora por Categorías</h2>
            </div>
            <Row className="g-4">
              <Col xs={12} md={4}>
                <Card className="category-card text-white border-0">
                  <Card.Body className="p-4 category-consolas">
                    <i className="fas fa-tv fa-3x mb-3"></i>
                    <h3>Consolas</h3>
                    <p>PlayStation, Xbox, Nintendo y más</p>
                    <Button 
                      variant="light" 
                      className="mt-2"
                      onClick={() => navigate('/consolas/playstation')}
                    >
                      Ver Todo
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="category-card text-white border-0">
                  <Card.Body className="p-4 category-juegos">
                    <i className="fas fa-ghost fa-3x mb-3"></i>
                    <h3>Juegos</h3>
                    <p>Los últimos lanzamientos y clásicos</p>
                    <Button 
                      variant="light" 
                      className="mt-2"
                      onClick={() => navigate('/juegos/ps5')}
                    >
                      Ver Todo
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="category-card text-white border-0">
                  <Card.Body className="p-4 category-perifericos">
                    <i className="fas fa-keyboard fa-3x mb-3"></i>
                    <h3>Periféricos</h3>
                    <p>Mejora tu experiencia gaming</p>
                    <Button 
                      variant="light" 
                      className="mt-2"
                      onClick={() => navigate('/perifericos/teclados')}
                    >
                      Ver Todo
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>

          <section className="info-section py-5">
            <Row className="g-4 text-center">
              <Col xs={12} md={4}>
                <div className="info-card p-4">
                  <i className="fas fa-shipping-fast fa-3x text-primary mb-3"></i>
                  <h4 className="info-title">Envío Gratis</h4>
                  <p className="info-text">En compras superiores a $50</p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="info-card p-4">
                  <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                  <h4 className="info-title">Compra Segura</h4>
                  <p className="info-text">Protección en todas tus compras</p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="info-card p-4">
                  <i className="fas fa-headset fa-3x text-primary mb-3"></i>
                  <h4 className="info-title">Soporte 24/7</h4>
                  <p className="info-text">Estamos aquí para ayudarte</p>
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
    </>
  );
}

export default Home;
