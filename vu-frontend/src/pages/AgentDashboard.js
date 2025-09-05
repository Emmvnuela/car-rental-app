import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { 
  Truck, 
  Calendar, 
  LogOut, 
  UserPlus, 
  Package, 
  CheckCircle,
  Clock,
  MapPin,
  User,
  Eye,
  Sparkles,
  Shield,
  Car
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

  chatButton: {
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
},

chatButtonHover: {
  backgroundColor: '#0056b3'
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
    maxWidth: '1400px',
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
    height: '80px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
  },
  welcomeText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  welcomeTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: '0',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  welcomeSubtitle: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoutButton: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    position: 'relative',
    zIndex: 2,
  },
  logoutButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '1.5rem',
  },
  deliveryCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  deliveryCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
  },
  statusBadge: {
    padding: '0.375rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
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
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.95rem',
  },
  infoLabel: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    minWidth: '80px',
  },
  infoValue: {
    color: 'white',
    fontWeight: '500',
  },
  notesSection: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '1rem',
    marginTop: '0.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  notesTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  notesText: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
    lineHeight: '1.4',
  },
  actionsSection: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  actionButton: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  primaryButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
  },
  successButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  },
  successButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
  },
  viewButton: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  viewButtonHover: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  emptyStateIcon: {
    width: '100px',
    height: '100px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: '0 0 0.5rem 0',
  },
  emptyStateMessage: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0',
  },
  loadingSpinner: {
    textAlign: 'center',
    padding: '4rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
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

function AgentDashboard() {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  

  useEffect(() => {
    if (!user || user.role !== 'agent') {
      console.log("Utilisateur connecté :", user);
      toast.error("Accès refusé : réservé aux agents.");
      navigate('/login');
      return;
    }
    fetchDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await axios.get('/deliveries/mine', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDeliveries(res.data);
    } catch (error) {
      console.error('Erreur chargement livraisons:', error);
      toast.error('Erreur chargement des livraisons');
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`/deliveries/${id}`, { delivery_status: status });
      toast.success(`Livraison mise à jour: ${status}`);
      fetchDeliveries();
    } catch (error) {
      toast.error("Échec de la mise à jour du statut");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

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
        return <Clock size={16} />;
      case 'En cours':
        return <Truck size={16} />;
      case 'Livré':
        return <CheckCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
              Chargement de vos livraisons...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <Truck size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Package size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Calendar size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Shield size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Car size={28} style={styles.sparkleIcon} />
            
            <div style={styles.logoSection}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <div style={styles.welcomeText}>
                <h1 style={styles.welcomeTitle}>
                  Dashboard Agent
                </h1>
                <p style={styles.welcomeSubtitle}>
                  <User size={20} />
                  Bienvenue, {user.name}
                </p>
              </div>
            </div>

         {/*   <button
              onClick={handleLogout}
              style={{
                ...styles.logoutButton,
                ...(hoveredLogout ? styles.logoutButtonHover : {})
              }}
              onMouseEnter={() => setHoveredLogout(true)}
              onMouseLeave={() => setHoveredLogout(false)}
            >
              <LogOut size={10} />
              Déconnexion
            </button>*/}
          </div>

          {/* Contenu principal */}
          {deliveries.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>
                <Truck size={50} />
              </div>
              <h3 style={styles.emptyStateTitle}>Aucune livraison</h3>
              <p style={styles.emptyStateMessage}>
                Vous n'avez aucune livraison assignée pour le moment. Vérifiez plus tard !
              </p>
            </div>
          ) : (
            <div style={styles.grid}>
              {deliveries.map((delivery, index) => (
                <div
                  key={delivery.id}
                  style={{
                    ...styles.deliveryCard,
                    ...(hoveredCard === delivery.id ? styles.deliveryCardHover : {}),
                    animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                  onMouseEnter={() => setHoveredCard(delivery.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Header de la carte */}
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>
                      <Package size={24} />
                      Livraison #{delivery.id}
                    </h3>
                    <div style={{...styles.statusBadge, ...getStatusBadgeStyle(delivery.delivery_status)}}>
                      {getStatusIcon(delivery.delivery_status)}
                      {delivery.delivery_status}
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div style={styles.cardContent}>
                    <div style={styles.infoRow}>
                      <User size={18} />
                      <span style={styles.infoLabel}>Client :</span>
                      <span style={styles.infoValue}>{delivery.client_name}</span>
                    </div>

                    <div style={styles.infoRow}>
                      <Calendar size={18} />
                      <span style={styles.infoLabel}>Début :</span>
                      <span style={styles.infoValue}>{formatDate(delivery.delivery_date)}</span>
                    </div>

                    <div style={styles.infoRow}>
                      <Calendar size={18} />
                      <span style={styles.infoLabel}>Retour :</span>
                      <span style={styles.infoValue}>{formatDate(delivery.return_date)}</span>
                    </div>

                    {/* Section Notes */}
                    <div style={styles.notesSection}>
                      <div style={styles.notesTitle}>
                        <MapPin size={16} />
                        Notes de livraison
                      </div>
                      <p style={styles.notesText}>
                        {delivery.notes || 'Aucune note spéciale pour cette livraison'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div style={styles.actionsSection}>
                      {delivery.delivery_status === 'En attente' && (
                        <button
                          onClick={() => handleStatusUpdate(delivery.id, 'En cours')}
                          style={{
                            ...styles.actionButton,
                            ...styles.primaryButton,
                            ...(hoveredButton === `start-${delivery.id}` ? styles.primaryButtonHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`start-${delivery.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                        >
                          <Truck size={18} />
                          Démarrer
                        </button>
                      )}
                      
                      {delivery.delivery_status === 'En cours' && (
                        <button
                          onClick={() => handleStatusUpdate(delivery.id, 'Livré')}
                          style={{
                            ...styles.actionButton,
                            ...styles.successButton,
                            ...(hoveredButton === `complete-${delivery.id}` ? styles.successButtonHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`complete-${delivery.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                        >
                          <CheckCircle size={18} />
                          Terminé
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/deliveries/${delivery.id}`)}
                        style={{
                          ...styles.actionButton,
                          ...styles.viewButton,
                          ...(hoveredButton === `view-${delivery.id}` ? styles.viewButtonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`view-${delivery.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <Eye size={18} />
                        Détails
                      </button>
                      <button
  onClick={() => navigate(`/chat/reservation/${delivery.reservation_id}`)}
  style={{
    ...styles.actionButton,
    ...styles.chatButton,
    ...(hoveredButton === `chat-${delivery.id}` ? styles.chatButtonHover : {})
  }}
  onMouseEnter={() => setHoveredButton(`chat-${delivery.id}`)}
  onMouseLeave={() => setHoveredButton(null)}
>
  💬 Chat
</button>

                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AgentDashboard;