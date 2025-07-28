// Cars.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Car, Calendar, Search, CheckCircle, XCircle, Sparkles, Filter, ArrowLeft, ArrowRight, Zap, Star } from 'lucide-react';

const styles = {
  container: {
    padding: '0',
    margin: '0',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0e1229ff 0%, #0a0331ff 25%, #1f2937 50%, #181341ff 75%, #081520ff 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'radial-gradient(circle at 30% 70%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '3rem',
    textAlign: 'center',
    padding: '3rem 2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    color: 'white',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'float 6s ease-in-out infinite',
  },
  headerGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    animation: 'rotate 20s linear infinite',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    margin: '0',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  subtitle: {
    fontSize: '1.3rem',
    opacity: '0.95',
    margin: '1rem 0 0 0',
    fontWeight: '300',
    position: 'relative',
    zIndex: 2,
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  sparkleIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  filtersSection: {
    marginBottom: '3rem',
    padding: '2.5rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out',
  },
  filtersTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  filterIcon: {
    padding: '0.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    color: 'white',
    boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
  },
  filtersContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    border: '2px solid rgba(203, 213, 224, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  inputWrapperFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    transform: 'translateY(-2px)',
  },
  inputIcon: {
    color: '#667eea',
    flexShrink: 0,
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#1e293b',
    width: '100%',
    '::placeholder': {
      color: '#64748b',
    },
  },
  carsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  carCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
    borderRadius: '24px',
    padding: '0',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    animation: 'slideUp 0.8s ease-out',
  },
  carCardHover: {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
  },
  carImageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '24px 24px 0 0',
    height: '220px',
  },
  carImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  carImageHover: {
    transform: 'scale(1.1)',
  },
  carImageOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
    opacity: '0',
    transition: 'opacity 0.3s ease',
  },
  carImageOverlayHover: {
    opacity: '1',
  },
  availableBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  premiumBadge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  carContent: {
    padding: '2rem',
  },
  carTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  carDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  carDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontWeight: '500',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  price: {
    fontSize: '1.75rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  priceLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
  },
  bookButton: {
    width: '100%',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  bookButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.4)',
  },
  bookButtonGlow: {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  bookButtonGlowActive: {
    left: '100%',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  emptyStateIcon: {
    fontSize: '4rem',
    marginBottom: '1.5rem',
    opacity: '0.6',
    animation: 'bounce 2s infinite',
    color: '#64748b',
  },
  emptyStateText: {
    fontSize: '1.3rem',
    color: '#64748b',
    fontWeight: '500',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '3rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  paginationButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
    minWidth: '150px',
    justifyContent: 'center',
  },
  paginationButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.4)',
  },
  paginationButtonDisabled: {
    background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '0 4px 12px rgba(148, 163, 184, 0.2)',
  },
  pageInfo: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    padding: '1rem 2rem',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '1rem',
  },
};

// Animations CSS
const cssAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-30px); }
    70% { transform: translateY(-15px); }
    90% { transform: translateY(-4px); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

function Cars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    available: '',
    sort: 'created_at',
    order: 'desc',
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/cars', { params: filters })
      .then((res) => {
        setCars(res.data.cars);
        setTotal(res.data.total);
      })
      .catch((err) => console.error('Erreur chargement voitures:', err))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleBooking = (car) => {
    navigate('/booking', { state: { selectedCar: car } });
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePagination = (direction) => {
    setFilters((prev) => ({
      ...prev,
      page: direction === 'next' ? prev.page + 1 : Math.max(1, prev.page - 1),
    }));
  };

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        <div style={styles.contentWrapper}>
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={32} style={styles.sparkleIcon} />
            <h1 style={styles.title}>
              <Car size={40} />
              Nos Voitures Disponibles
            </h1>
            <p style={styles.subtitle}>Découvrez notre flotte premium de véhicules</p>
          </div>

          {/* Section Filtres */}
          <div style={styles.filtersSection}>
            <h3 style={styles.filtersTitle}>
              <div style={styles.filterIcon}>
                <Filter size={20} />
              </div>
              Filtres de Recherche
            </h3>
            
            <div style={styles.filtersContainer}>
              <div 
                style={{
                  ...styles.inputWrapper,
                  ...(focusedInput === 'search' ? styles.inputWrapperFocus : {})
                }}
              >
                <Search size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  name="search"
                  placeholder="Rechercher (Toyota, BMW...)"
                  value={filters.search}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('search')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                />
              </div>

              <div 
                style={{
                  ...styles.inputWrapper,
                  ...(focusedInput === 'year' ? styles.inputWrapperFocus : {})
                }}
              >
                <Calendar size={20} style={styles.inputIcon} />
                <input
                  type="number"
                  name="year"
                  placeholder="Année (ex: 2020)"
                  value={filters.year}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('year')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                />
              </div>

              <div 
                style={{
                  ...styles.inputWrapper,
                  ...(focusedInput === 'available' ? styles.inputWrapperFocus : {})
                }}
              >
                {filters.available === 'true' ? 
                  <CheckCircle size={20} style={{...styles.inputIcon, color: '#10b981'}} /> : 
                  filters.available === 'false' ?
                  <XCircle size={20} style={{...styles.inputIcon, color: '#ef4444'}} /> :
                  <Car size={20} style={styles.inputIcon} />
                }
                <select
                  name="available"
                  value={filters.available}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('available')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                >
                  <option value="">Toutes les voitures</option>
                  <option value="true">Disponibles uniquement</option>
                  <option value="false">Indisponibles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              Chargement des véhicules...
            </div>
          ) : cars.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>
                <Car size={80} />
              </div>
              <p style={styles.emptyStateText}>
                Aucune voiture trouvée avec ces critères.
              </p>
            </div>
          ) : (
            <>
              <div style={styles.carsGrid}>
                {cars.map((car, index) => (
                  <div
                    key={car.id}
                    style={{
                      ...styles.carCard,
                      ...(hoveredCard === car.id ? styles.carCardHover : {}),
                      animationDelay: `${index * 0.1}s`
                    }}
                    onMouseEnter={() => setHoveredCard(car.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.carImageContainer}>
                      <img
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        style={{
                          ...styles.carImage,
                          ...(hoveredCard === car.id ? styles.carImageHover : {})
                        }}
                      />
                      <div 
                        style={{
                          ...styles.carImageOverlay,
                          ...(hoveredCard === car.id ? styles.carImageOverlayHover : {})
                        }}
                      ></div>
                      
                      {/* Badge disponibilité */}
                      <div style={styles.availableBadge}>
                        <CheckCircle size={14} />
                        Disponible
                      </div>
                      
                      {/* Badge premium pour les voitures récentes */}
                      {car.year >= 2020 && (
                        <div style={styles.premiumBadge}>
                          <Star size={14} />
                          Premium
                        </div>
                      )}
                    </div>

                    <div style={styles.carContent}>
                      <h3 style={styles.carTitle}>
                        {car.brand} {car.model}
                      </h3>
                      
                      <div style={styles.carDetails}>
                        <div style={styles.carDetail}>
                          <Calendar size={16} />
                          <span>Année {car.year}</span>
                        </div>
                        <div style={styles.carDetail}>
                          <Zap size={16} />
                          <span>Véhicule moderne</span>
                        </div>
                      </div>

                      <div style={styles.priceContainer}>
                        <div>
                          <div style={styles.price}>
                            {Number(car.price_per_day).toLocaleString()} FCFA
                          </div>
                          <div style={styles.priceLabel}>par jour</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBooking(car)}
                        style={{
                          ...styles.bookButton,
                          ...(hoveredButton === `book-${car.id}` ? styles.bookButtonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`book-${car.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <div 
                          style={{
                            ...styles.bookButtonGlow,
                            ...(hoveredButton === `book-${car.id}` ? styles.bookButtonGlowActive : {})
                          }}
                        ></div>
                        <Car size={20} />
                        Réserver Maintenant
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={styles.paginationContainer}>
                  <button
                    onClick={() => handlePagination('prev')}
                    disabled={filters.page === 1}
                    style={{
                      ...styles.paginationButton,
                      ...(filters.page === 1 ? styles.paginationButtonDisabled : {}),
                      ...(hoveredButton === 'prev' && filters.page > 1 ? styles.paginationButtonHover : {})
                    }}
                    onMouseEnter={() => filters.page > 1 && setHoveredButton('prev')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <ArrowLeft size={20} />
                    Précédent
                  </button>
                  
                  <div style={styles.pageInfo}>
                    Page {filters.page} sur {totalPages}
                  </div>
                  
                  <button
                    onClick={() => handlePagination('next')}
                    disabled={filters.page === totalPages}
                    style={{
                      ...styles.paginationButton,
                      ...(filters.page === totalPages ? styles.paginationButtonDisabled : {}),
                      ...(hoveredButton === 'next' && filters.page < totalPages ? styles.paginationButtonHover : {})
                    }}
                    onMouseEnter={() => filters.page < totalPages && setHoveredButton('next')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Suivant
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Footer décoratif */}
          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'float 8s ease-in-out infinite'
          }}>
            <Car size={48} style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: '1rem',
              animation: 'sparkle 3s ease-in-out infinite'
            }} />
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
              fontWeight: '500',
              margin: '0',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              Trouvez la voiture parfaite pour votre voyage
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cars;