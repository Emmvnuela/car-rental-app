import React, { useEffect, useState } from 'react';
import {
  Car, MapPin, User, Calendar, ClipboardCheck, CreditCard,
  Truck, XCircle, BadgeCheck, PackageCheck, Sparkles, Shield,
  Settings, Eye, Loader, AlertTriangle, CheckCircle, Clock,
  Mail, DollarSign, Package
} from 'lucide-react';

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
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    position: 'relative',
    zIndex: 2,
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
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statsSection: {
    display: 'flex',
    gap: '1rem',
    position: 'relative',
    zIndex: 2,
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    minWidth: '80px',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
  },
  statLabel: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0',
  },
  reservationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '1.5rem',
    animation: 'slideInUp 0.5s ease-out both',
  },
  reservationCard: {
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
  reservationCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statusBadge: {
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statusValidated: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  },
  statusPending: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)',
    color: '#fbbf24',
    border: '1px solid rgba(251, 191, 36, 0.3)',
  },
  statusDelivered: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%)',
    color: '#3b82f6',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  infoGrid: {
    display: 'grid',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  infoIcon: {
    color: 'rgba(255, 255, 255, 0.7)',
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '0.2rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  infoValue: {
    color: 'white',
    fontWeight: '500',
    fontSize: '0.9rem',
    wordBreak: 'break-word',
  },
  actionButtons: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  button: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.9) 100%)',
    border: 'none',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    flex: 1,
    justifyContent: 'center',
    minWidth: '140px',
  },
  buttonValidate: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.9) 100%)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  },
  buttonDeliver: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.9) 100%)',
    boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
  },
  buttonValidateHover: {
    boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
  },
  buttonDeliverHover: {
    boxShadow: '0 6px 16px rgba(251, 191, 36, 0.4)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    maxWidth: '600px',
    margin: '2rem auto',
  },
  emptyStateIcon: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: '1rem',
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.5rem',
  },
  emptyStateText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1rem',
  },
  loadingSpinner: {
    textAlign: 'center',
    padding: '4rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem',
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

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/reservations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Erreur chargement réservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const markAsDelivered = (index) => {
    const updated = [...reservations];
    updated[index].status = 'Livré';
    setReservations(updated);
    alert(`Réservation de ${updated[index].user_name} marquée comme livrée.`);
  };

  const validerReservation = async (id, index) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${id}/validate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Échec de validation");
        return;
      }

      const updated = [...reservations];
      updated[index].is_validated = true;
      setReservations(updated);

      alert(`Réservation n°${id} validée avec succès.`);
    } catch (error) {
      console.error('Erreur validation réservation:', error);
      alert("Erreur serveur");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price).replace('XOF', 'FCFA');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStats = () => {
    const total = reservations.length;
    const validated = reservations.filter(r => r.is_validated).length;
    const delivered = reservations.filter(r => r.status === 'Livré').length;
    const pending = reservations.filter(r => !r.is_validated).length;

    return { total, validated, delivered, pending };
  };

  const stats = getStats();

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          <div style={styles.content}>
            <div style={styles.loadingSpinner}>
              <div style={styles.spinner}></div>
              Chargement des réservations...
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
          <Settings size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Shield size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Car size={24} style={styles.sparkleIcon} />
            
            <div style={styles.titleSection}>
              <h1 style={styles.pageTitle}>
                <Truck size={32} />
                Gestion des Réservations
              </h1>
            </div>

            <div style={styles.statsSection}>
              <div style={{...styles.statCard, borderColor: 'rgba(59, 130, 246, 0.3)'}}>
                <div style={styles.statNumber}>{stats.total}</div>
                <div style={styles.statLabel}>Total</div>
              </div>
              <div style={{...styles.statCard, borderColor: 'rgba(251, 191, 36, 0.3)'}}>
                <div style={styles.statNumber}>{stats.pending}</div>
                <div style={styles.statLabel}>En attente</div>
              </div>
              <div style={{...styles.statCard, borderColor: 'rgba(16, 185, 129, 0.3)'}}>
                <div style={styles.statNumber}>{stats.validated}</div>
                <div style={styles.statLabel}>Validées</div>
              </div>
              <div style={{...styles.statCard, borderColor: 'rgba(139, 92, 246, 0.3)'}}>
                <div style={styles.statNumber}>{stats.delivered}</div>
                <div style={styles.statLabel}>Livrées</div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          {reservations.length === 0 ? (
            <div style={styles.emptyState}>
              <Package size={80} style={styles.emptyStateIcon} />
              <h3 style={styles.emptyStateTitle}>Aucune réservation</h3>
              <p style={styles.emptyStateText}>
                Il n'y a actuellement aucune réservation enregistrée dans le système.
              </p>
            </div>
          ) : (
            <div style={styles.reservationGrid}>
              {reservations.map((r, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.reservationCard,
                    ...(hoveredCard === index ? styles.reservationCardHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>
                      <User size={20} />
                      {r.user_name}
                    </h3>
                    <div style={{
                      ...styles.statusBadge,
                      ...(r.is_validated ? styles.statusValidated : styles.statusPending)
                    }}>
                      {r.is_validated ? (
                        <>
                          <BadgeCheck size={14} />
                          Validée
                        </>
                      ) : (
                        <>
                          <Clock size={14} />
                          En attente
                        </>
                      )}
                    </div>
                  </div>

                  <div style={styles.infoGrid}>
                    <div style={styles.infoRow}>
                      <Mail size={16} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Email</div>
                        <div style={styles.infoValue}>{r.user_email}</div>
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <Car size={16} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Véhicule</div>
                        <div style={styles.infoValue}>{r.car_brand}</div>
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <Calendar size={16} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Période</div>
                        <div style={styles.infoValue}>
                          {formatDate(r.start_date)} - {formatDate(r.end_date)}
                        </div>
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <DollarSign size={16} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Montant total</div>
                        <div style={styles.infoValue}>{formatPrice(r.total_price)}</div>
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <CreditCard size={16} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Déjà payé</div>
                        <div style={styles.infoValue}>{formatPrice(r.deposit || 0)}</div>
                      </div>
                    </div>

                    <div style={styles.infoRow}>
                      <PackageCheck size={16} style={styles.infoIcon} />
                      <div style={styles.infoContent}>
                        <div style={styles.infoLabel}>Statut de livraison</div>
                        <div style={{
                          ...styles.infoValue,
                          ...(r.status === 'Livré' ? { color: '#10b981' } : { color: '#fbbf24' })
                        }}>
                          {r.status === 'Livré' ? '✅ Livré' : '⏳ ' + (r.status || 'En attente')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.actionButtons}>
                    {!r.is_validated && (
                      <button
                        onClick={() => validerReservation(r.reservation_id, index)}
                        style={{
                          ...styles.button,
                          ...styles.buttonValidate,
                          ...(hoveredButton === `validate-${index}` ? {
                            ...styles.buttonHover,
                            ...styles.buttonValidateHover
                          } : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`validate-${index}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <BadgeCheck size={16} />
                        Valider
                      </button>
                    )}

                    {r.status !== 'Livré' && (
                      <button
                        onClick={() => markAsDelivered(index)}
                        style={{
                          ...styles.button,
                          ...styles.buttonDeliver,
                          ...(hoveredButton === `deliver-${index}` ? {
                            ...styles.buttonHover,
                            ...styles.buttonDeliverHover
                          } : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`deliver-${index}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        <PackageCheck size={16} />
                        Marquer livrée
                      </button>
                    )}
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

export default AdminReservations;