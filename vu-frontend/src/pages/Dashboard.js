import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipboardList, User, History, Car, Trash2, Save, CreditCard, AlertTriangle, Sparkles, TrendingUp } from 'lucide-react';
import { downloadContratPdf } from '../utils/downloadContrat';
import { toast } from 'react-toastify';

const styles = {
  container: {
    padding: '0',
    margin: '0',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #02071fff 0%, #0a0331ff 25%, #1f2937 50%, #181341ff 75%, #0f2233ff 100%)',
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
    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
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
  section: {
    marginBottom: '3rem',
    padding: '2.5rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out',
  },
  sectionHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    position: 'relative',
  },
  sectionTitleIcon: {
    padding: '0.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    color: 'white',
    boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  },
  cardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
  cardLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontWeight: '600',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardValue: {
    fontSize: '1.1rem',
    color: '#1e293b',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  statusConfirmed: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
  },
  statusPending: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
  },
  statusCancelled: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
  },
  btn: {
    padding: '0.875rem 1.75rem',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    marginTop: '1rem',
    marginRight: '0.75rem',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
  },
  btnPrimaryHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 24px rgba(59, 130, 246, 0.4)',
  },
  btnSuccess: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
  },
  btnDanger: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
  },
  btnDangerHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 24px rgba(239, 68, 68, 0.4)',
  },
  form: {
    display: 'grid',
    gap: '2rem',
    maxWidth: '600px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '2px solid rgba(203, 213, 224, 0.5)',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  inputDisabled: {
    backgroundColor: 'rgba(249, 250, 251, 0.8)',
    color: '#6b7280',
    cursor: 'not-allowed',
  },
  priceHighlight: {
    fontSize: '1.4rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  soldeHighlight: {
    fontSize: '1.4rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
  emptyStateIcon: {
    fontSize: '4rem',
    marginBottom: '1.5rem',
    opacity: '0.6',
    animation: 'bounce 2s infinite',
  },
  cardAccent: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '6px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    borderRadius: '20px 20px 0 0',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  statCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  },
  statCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.75rem',
    position: 'relative',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '2px solid rgba(241, 245, 249, 0.5)',
  },
  cancelNote: {
    color: '#f59e0b',
    fontStyle: 'italic',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    fontWeight: '600',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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

// Ajout des animations CSS via une balise style
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
`;

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!token) {
      toast.info("Session expirée !");
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get('/users/me');
        const userData = res.data;
        setUser(userData);
        setFormData({ name: userData.name, email: userData.email, password: '' });

        const resReservations = await axiosInstance.get(`/reservations/user/${userData.id}`);
        setReservations(resReservations.data);

        const resPayments = await axiosInstance.get(`/payments/user/${userData.id}`);
        setPayments(resPayments.data);

      } catch (error) {
        toast.info("Accès refusé ou session expirée !");
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, token]);

  const handleCancel = async (reservationId) => {
    if (!window.confirm("Annuler cette reservation ?")) return;
    try {
      await axiosInstance.delete(`/reservations/${reservationId}`);
      setReservations(reservations.filter(r => r.id !== reservationId));
    } catch {
      toast.error("Erreur lors de l'annulation");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/users/${user.id}`, {
        name: formData.name,
        phone: user.phone || null,
      });
      setUser(res.data);
      toast.info("Profil mis à jour !");
    } catch {
      toast.error("Erreur lors de la mise à jour du profil.");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDeleteAccount = async () => {
    if (!window.confirm("Supprimer ton compte ?")) return;
    try {
      await axiosInstance.delete(`/users/${user.id}`);
      localStorage.removeItem('token');
      toast.info("Compte supprimé.");
      navigate('/login');
    } catch {
      toast.error("Erreur lors de la suppression.");
    }
  };

  const totalSpent = payments.reduce((sum, p) => sum + (p.details?.amount || 0), 0);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'confirmé':
        return { ...styles.statusBadge, ...styles.statusConfirmed };
      case 'pending':
      case 'en attente':
        return { ...styles.statusBadge, ...styles.statusPending };
      case 'cancelled':
      case 'annulé':
        return { ...styles.statusBadge, ...styles.statusCancelled };
      default:
        return styles.statusBadge;
    }
  };

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          Chargement en cours...
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        <div style={styles.contentWrapper}>
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={32} style={styles.sparkleIcon} />
            <h1 style={styles.title}>Bienvenue, {user?.name}</h1>
            <p style={styles.subtitle}>Tableau de bord utilisateur</p>
          </div>

          {/* Statistiques */}
          <div style={styles.statsContainer}>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'reservations' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('reservations')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statNumber}>{reservations.length}</div>
              <div style={styles.statLabel}>Réservations</div>
            </div>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'payments' ? styles.statCardHover : {})
              }}
              onMouseEnter={() => setHoveredCard('payments')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statNumber}>{payments.length}</div>
              <div style={styles.statLabel}>Paiements</div>
            </div>
            
          </div>

          <section 
            style={{
              ...styles.section,
              ...(hoveredSection === 'reservations' ? styles.sectionHover : {})
            }}
            onMouseEnter={() => setHoveredSection('reservations')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 style={styles.sectionTitle}>
              <div style={styles.sectionTitleIcon}>
                <ClipboardList size={20} />
              </div>
              Mes Réservations
            </h3>
            {reservations.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyStateIcon}><Car size={60} /></div>
                <p>Aucune réservation trouvée.</p>
              </div>
            ) : (
              <div style={styles.cardContainer}>
               <div style={styles.cardContainer}>
{reservations.map((r, index) => {
  const totalPrice = Number(r.total_price ?? 0);
  const caution    = Number(r.caution ?? 0);

  // ✅ Calculer le total payé pour cette réservation
  const paiementsReservation = payments.filter(p => p.reservation_id === r.id);
  const montantPaye = paiementsReservation.reduce((sum, p) => sum + Number(p.amount ?? 0), 0);

  // Montant restant
  const soldeRestant = Math.max(totalPrice + caution - montantPaye, 0);

  // Statut basé sur le paiement
  const status = soldeRestant === 0
    ? 'Soldé'
    : (montantPaye === 0 ? 'En attente' : 'Payé partiellement');

  return (
    <div 
      key={r.id} 
      style={{
        ...styles.card,
        ...(hoveredCard === `reservation-${r.id}` ? styles.cardHover : {}),
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setHoveredCard(`reservation-${r.id}`)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div style={styles.cardAccent}></div>

      <div style={styles.formGroup}>
        <span style={styles.cardLabel}>Voiture</span>
        <span style={styles.cardValue}>{r.car_brand || '---'}</span>
      </div>

      <div style={styles.formGroup}>
        <span style={styles.cardLabel}>Date</span>
        <span style={styles.cardValue}>
          {r.start_date ? new Date(r.start_date).toLocaleDateString() : '---'}
        </span>
      </div>

      <div style={styles.formGroup}>
        <span style={styles.cardLabel}>Statut</span>
        <span style={getStatusStyle(status)}>{status}</span>
      </div>

      <div style={styles.formGroup}>
        <span style={styles.cardLabel}>Prix de la location</span>
        <span style={{ ...styles.cardValue, ...styles.priceHighlight }}>
          {totalPrice.toLocaleString()} FCFA
        </span>
      </div>

      <div style={styles.formGroup}>
        <span style={styles.cardLabel}>Caution</span>
        <span style={styles.cardValue}>
          {caution.toLocaleString()} FCFA
        </span>
      </div>

      <div style={styles.formGroup}>
        <span style={styles.cardLabel}>Montant payé</span>
        <span style={styles.cardValue}>
          {montantPaye.toLocaleString()} FCFA
        </span>
      </div>

      <div style={styles.formGroup}>
        <span style={styles.cardLabel}>Solde restant</span>
        <span style={{ ...styles.cardValue, ...styles.soldeHighlight }}>
          {soldeRestant.toLocaleString()} FCFA
        </span>
      </div>

      <div style={styles.cardFooter}>
        <div>
          {soldeRestant > 0 && r.is_validated ? (
            <button
              style={{ ...styles.btn, ...styles.btnSuccess }}
              onClick={() => navigate('/paiement', { state: { reservation: r, montantRestant: soldeRestant } })}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <CreditCard size={16} />
              Payer le solde)
            </button>
          ) : (
            <p style={{ color: '#f59e0b', fontStyle: 'italic', fontWeight: '600' }}>
              {soldeRestant === 0 ? 'Solde réglé' : ''}
            </p>
          )}
        </div>

        <div>
          {montantPaye > 0 ? (
            <p style={styles.cancelNote}>Impossible d'annuler</p>
          ) : (
            <button
              style={{ ...styles.btn, ...styles.btnDanger }}
              onClick={() => handleCancel(r.id)}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Trash2 size={16} />
              Annuler
            </button>
          )}
        </div>

        <div>
          {r.is_validated && (
            <button onClick={() => downloadContratPdf(r.id)}>
              Télécharger le contrat
            </button>
          )}
        </div>
      </div>
    </div>
  );
})}



</div>

              </div>
            )}
          </section>

          <section 
            style={{
              ...styles.section,
              ...(hoveredSection === 'profile' ? styles.sectionHover : {})
            }}
            onMouseEnter={() => setHoveredSection('profile')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 style={styles.sectionTitle}>
              <div style={styles.sectionTitleIcon}>
                <User size={20} />
              </div>
              Mes Informations
            </h3>
            <form onSubmit={handleUpdate} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(203, 213, 224, 0.5)'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  style={{ ...styles.input, ...styles.inputDisabled }}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  disabled
                  placeholder="Mot de passe non modifiable ici"
                  style={{ ...styles.input, ...styles.inputDisabled }}
                />
              </div>

              <button 
                type="submit" 
                style={{ ...styles.btn, ...styles.btnPrimary }}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.btnPrimaryHover)}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Save size={16} />
                Mettre à jour
              </button>
            </form>

            <button
              style={{ ...styles.btn, ...styles.btnDanger, marginTop: '2rem' }}
              onClick={handleDeleteAccount}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.btnDangerHover)}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Trash2 size={16} />
              Supprimer mon compte
            </button>
          </section>

          <section 
            style={{
              ...styles.section,
              ...(hoveredSection === 'payments' ? styles.sectionHover : {})
            }}
            onMouseEnter={() => setHoveredSection('payments')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 style={styles.sectionTitle}>
              <div style={styles.sectionTitleIcon}>
                <History size={20} />
              </div>
              Mes Paiements
            </h3>
            {payments.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyStateIcon}>
                  <AlertTriangle size={60} />
                </div>
                <p>Aucun paiement trouvé.</p>
              </div>
            ) : (
              <div style={styles.cardContainer}>
                {Array.isArray(payments) && payments.map((p, index) => (
                  <div 
                    key={p.id} 
                    style={{
                      ...styles.card,
                      ...(hoveredCard === `payment-${p.id}` ? styles.cardHover : {}),
                      animationDelay: `${index * 0.1}s`
                    }}
                    onMouseEnter={() => setHoveredCard(`payment-${p.id}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.cardAccent}></div>

                    <div style={styles.formGroup}>
                      <span style={styles.cardLabel}>Réservation</span>
                      <span style={styles.cardValue}>#{p.reservation_id}</span>
                    </div>

                    <div style={styles.formGroup}>
                      <span style={styles.cardLabel}>Date paiement</span>
                      <span style={styles.cardValue}>
                        {new Date(p.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={styles.formGroup}>
                      <span style={styles.cardLabel}>Montant</span>
                      <span style={{ ...styles.cardValue, ...styles.priceHighlight }}>
                        {(p.details?.amount ?? 0).toLocaleString()} FCFA
                      </span>
                    </div>

                    <div style={styles.formGroup}>
                      <span style={styles.cardLabel}>Statut</span>
                      <span style={{ ...styles.statusBadge, ...styles.statusConfirmed }}>
                        Payé
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section bonus avec animation flottante */}
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
            <TrendingUp size={48} style={{ 
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
              Votre expérience premium vous attend
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;