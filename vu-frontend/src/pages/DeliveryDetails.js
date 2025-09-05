import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  ArrowLeft, 
  Calendar, 
  Package, 
  CheckCircle,
  Clock,
  MapPin,
  User,
  Car,
  DollarSign,
  FileText,
  Sparkles,
  Shield,
  Settings,
  Eye,
  Truck
} from 'lucide-react';
import logo from '../assets/logo.png';

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
  content: {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    top: '-50%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
    animation: 'pulse 3s ease-in-out infinite',
  },
  sparkleIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    position: 'relative',
    zIndex: 2,
  },
  logo: {
    height: '60px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  pageTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    margin: '0',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  pageSubtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  backButton: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 2,
  },
  backButtonHover: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    },
  },
  deliveryCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideInUp 0.5s ease-out both',
  },
  carCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideInUp 0.5s ease-out 0.1s both',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statusBadgeWaiting: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)',
    color: '#fbbf24',
    border: '1px solid rgba(251, 191, 36, 0.3)',
  },
  statusBadgeInProgress: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%)',
    color: '#3b82f6',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  statusBadgeDelivered: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  },
  infoGrid: {
    display: 'grid',
    gap: '1.5rem',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  infoIcon: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '0.2rem',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  infoValue: {
    color: 'white',
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  carImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  carSpecs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '1rem',
  },
  specItem: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
  },
  specLabel: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
  },
  specValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
  },
  priceHighlight: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    marginTop: '1.5rem',
  },
  priceAmount: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#10b981',
    marginBottom: '0.25rem',
  },
  priceLabel: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  loadingSpinner: {
    textAlign: 'center',
    padding: '4rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
  },
  errorMessage: {
    textAlign: 'center',
    padding: '4rem',
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    fontSize: '1.1rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  notFoundMessage: {
    textAlign: 'center',
    padding: '4rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.1rem',
  },
  floatingElements: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    zIndex: '0',
  },
  floatingIcon: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.03)',
    animation: 'float 10s ease-in-out infinite',
  },
  floatingIcon1: {
    top: '10%',
    left: '5%',
    animationDelay: '0s',
  },
  floatingIcon2: {
    top: '20%',
    right: '8%',
    animationDelay: '2s',
  },
  floatingIcon3: {
    bottom: '15%',
    left: '8%',
    animationDelay: '4s',
  },
  floatingIcon4: {
    bottom: '25%',
    right: '5%',
    animationDelay: '1s',
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
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(3deg); }
    66% { transform: translateY(-10px) rotate(-2deg); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }
  
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default function DeliveryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredBack, setHoveredBack] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/deliveries/${id}`)
      .then(res => {
        setDelivery(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Erreur chargement livraison:', err);
        setError('Erreur lors du chargement de la livraison');
        toast.error('Erreur lors du chargement de la livraison');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'En attente':
        return styles.statusBadgeWaiting;
      case 'En cours':
        return styles.statusBadgeInProgress;
      case 'Livré':
        return styles.statusBadgeDelivered;
      default:
        return styles.statusBadgeWaiting;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'En attente':
        return <Clock size={18} />;
      case 'En cours':
        return <Truck size={18} />;
      case 'Livré':
        return <CheckCircle size={18} />;
      default:
        return <Clock size={18} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price).replace('XOF', 'FCFA');
  };

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          <div style={styles.content}>
            <div style={styles.loadingSpinner}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                borderTop: '4px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }}></div>
              Chargement des détails de la livraison...
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          <div style={styles.content}>
            <div style={styles.errorMessage}>
              <Package size={50} style={{ marginBottom: '1rem', opacity: 0.7 }} />
              <div>{error}</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!delivery) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          <div style={styles.content}>
            <div style={styles.notFoundMessage}>
              <Eye size={50} style={{ marginBottom: '1rem', opacity: 0.7 }} />
              <div>Aucune livraison trouvée avec cet identifiant.</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const { car } = delivery;

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <Car size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Package size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Settings size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Shield size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={24} style={styles.sparkleIcon} />
            
            <div style={styles.logoSection}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <div style={styles.titleSection}>
                <h1 style={styles.pageTitle}>
                  Détails de la Livraison
                </h1>
                <p style={styles.pageSubtitle}>
                  <Package size={18} />
                  Livraison #{delivery.id}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              style={{
                ...styles.backButton,
                ...(hoveredBack ? styles.backButtonHover : {})
              }}
              onMouseEnter={() => setHoveredBack(true)}
              onMouseLeave={() => setHoveredBack(false)}
            >
              <ArrowLeft size={20} />
              Retour
            </button>
          </div>

          {/* Contenu principal */}
          <div style={styles.mainGrid}>
            {/* Informations de livraison */}
            <div style={styles.deliveryCard}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  <Package size={28} />
                  Informations de Livraison
                </h2>
                <div style={{...styles.statusBadge, ...getStatusBadgeStyle(delivery.delivery_status)}}>
                  {getStatusIcon(delivery.delivery_status)}
                  {delivery.delivery_status}
                </div>
              </div>

              <div style={styles.infoGrid}>
                <div style={styles.infoRow}>
                  <User size={20} style={styles.infoIcon} />
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>Client</div> 
                    <div style={styles.infoValue}>{delivery.client_name || 'Non spécifié'}</div>
                  </div>
                </div>

                <div style={styles.infoRow}>
                  <Calendar size={20} style={styles.infoIcon} />
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>Date de livraison</div>
                    <div style={styles.infoValue}>{formatDate(delivery.delivery_date)}</div>
                  </div>
                </div>

                <div style={styles.infoRow}>
                  <Calendar size={20} style={styles.infoIcon} />
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>Date de retour</div>
                    <div style={styles.infoValue}>{formatDate(delivery.return_date)}</div>
                  </div>
                </div>

                <div style={styles.infoRow}>
                  <MapPin size={20} style={styles.infoIcon} />
                  <div style={styles.infoContent}>
                    <div style={styles.infoLabel}>Notes de livraison</div>
                    <div style={styles.infoValue}>
                      {delivery.notes || 'Aucune note spéciale pour cette livraison'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations sur la voiture */}
            <div style={styles.carCard}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  <Car size={28} />
                  Véhicule Assigné
                </h2>
              </div>

              {car ? (
                <>
                  <img
                    src={car.image_url}
                    alt={`${car.brand} ${car.model}`}
                    style={styles.carImage}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250/1f2937/ffffff?text=Image+non+disponible';
                    }}
                  />

                  <div style={styles.infoGrid}>
                    <div style={styles.infoRow}>
                      <Car size={20} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Véhicule</div>
                        <div style={styles.infoValue}>{car.brand} {car.model}</div>
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <Calendar size={20} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Année</div>
                        <div style={styles.infoValue}>{car.year}</div>
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <FileText size={20} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Description</div>
                        <div style={styles.infoValue}>{car.description || 'Aucune description disponible'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.priceHighlight}>
                    <div style={styles.priceAmount}>
                      {formatPrice(car.price_per_day)}
                    </div>
                    <div style={styles.priceLabel}>Par jour</div>
                  </div>
                </>
              ) : (
                <div style={styles.notFoundMessage}>
                  <Car size={40} style={{ marginBottom: '1rem', opacity: 0.7 }} />
                  <div>Informations sur la voiture non disponibles.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}