// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipboardList, User, History, Car, Trash2, Save, CreditCard, AlertTriangle, Sparkles, TrendingUp, Clock, DollarSign, Star, Zap, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { downloadContratPdf } from '../utils/downloadContrat';
import { toast } from 'react-toastify';

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
  floatingElements: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    zIndex: '0',
  },
  floatingIcon: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 6s ease-in-out infinite',
  },
  mainContent: {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '3rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    animation: 'slideDown 1s ease-out',
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    filter: 'blur(20px)',
    opacity: '0.8',
    zIndex: '-1',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    position: 'relative',
    zIndex: '1',
  },
  headerIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
    animation: 'bounce 2s infinite',
  },
  headerText: {
    flex: '1',
  },
  title: {
    color: 'white',
    fontSize: '3rem',
    fontWeight: '900',
    margin: '0 0 1rem',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '500',
  },
  sparkleContainer: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
    fontSize: '2rem',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
    animation: 'slideUp 1s ease-out 0.1s both',
  },
  statCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  statCardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  statIcon: {
    width: '60px',
    height: '60px',
    margin: '0 auto 1rem',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
  },
  statIconReservations: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  },
  statIconPayments: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '0.5rem',
    lineHeight: '1',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  statLabel: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  section: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    animation: 'slideUp 1s ease-out 0.3s both',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  sectionHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  sectionTitle: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  sectionTitleIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHover: {
    transform: 'translateY(-4px) scale(1.02)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
  cardAccent: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '4px',
    background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #f59e0b 100%)',
    borderRadius: '16px 16px 0 0',
  },
  cardLabel: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardValue: {
    fontSize: '1.1rem',
    color: 'white',
    fontWeight: '700',
    marginBottom: '1rem',
    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  statusSolde: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
  },
  statusPartiel: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
  },
  statusAttente: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
  },
  btn: {
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '700',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    color: 'white',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    margin: '0.5rem 0.5rem 0 0',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  btnSuccess: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  btnDanger: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  btnHover: {
    transform: 'translateY(-2px) scale(1.05)',
  },
  priceHighlight: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.2rem',
    fontWeight: '800',
  },
  soldeHighlight: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.2rem',
    fontWeight: '800',
  },
  form: {
    display: 'grid',
    gap: '1.5rem',
    maxWidth: '600px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    padding: '1rem 1.25rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  inputDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  cancelNote: {
    color: '#fbbf24',
    fontStyle: 'italic',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30vh',
    flexDirection: 'column',
    gap: '2rem',
  },
  emptyCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '4rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    color: 'white',
    maxWidth: '500px',
    animation: 'slideUp 1s ease-out',
  },
  emptyIcon: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem',
    animation: 'float 3s ease-in-out infinite',
  },
  emptyTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    margin: '0 0 1rem',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  emptyText: {
    fontSize: '1.1rem',
    opacity: '0.8',
    margin: '0',
    lineHeight: '1.6',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    flexDirection: 'column',
    gap: '2rem',
  },
  loadingCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '3rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    color: 'white',
    animation: 'pulse 2s infinite',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  footerSection: {
    textAlign: 'center',
    marginTop: '4rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    animation: 'float 8s ease-in-out infinite'
  },
  footerIcon: {
    color: 'rgba(255, 255, 255, 0.8)', 
    marginBottom: '1rem',
    animation: 'sparkle 3s ease-in-out infinite'
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.1rem',
    fontWeight: '500',
    margin: '0',
    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
  }
};

// Animations CSS
const cssAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(5deg); }
    66% { transform: translateY(-10px) rotate(-3deg); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-10px); }
    70% { transform: translateY(-5px); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .input:focus {
    outline: none !important;
    border-color: rgba(59, 130, 246, 0.6) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
  }

  .input::placeholder {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  @media (max-width: 768px) {
    .card-container {
      grid-template-columns: 1fr !important;
    }
    
    .header-content {
      flex-direction: column !important;
      text-align: center !important;
    }
    
    .title {
      font-size: 2rem !important;
    }
    
    .card-footer {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 1rem !important;
    }
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
  const [hoveredButton, setHoveredButton] = useState(null);

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
      toast.success("Réservation annulée avec succès !");
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
      toast.success("Profil mis à jour avec succès !");
    } catch {
      toast.error("Erreur lors de la mise à jour du profil.");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDeleteAccount = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) return;
    try {
      await axiosInstance.delete(`/users/${user.id}`);
      localStorage.removeItem('token');
      toast.success("Compte supprimé avec succès.");
      navigate('/login');
    } catch {
      toast.error("Erreur lors de la suppression du compte.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'soldé':
        return { ...styles.statusBadge, ...styles.statusSolde };
      case 'payé partiellement':
        return { ...styles.statusBadge, ...styles.statusPartiel };
      case 'en attente':
        return { ...styles.statusBadge, ...styles.statusAttente };
      default:
        return { ...styles.statusBadge, ...styles.statusAttente };
    }
  };

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          
          <div style={styles.floatingElements}>
            <User size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
            <CreditCard size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
            <ClipboardList size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
            <Sparkles size={45} style={{...styles.floatingIcon, bottom: '30%', right: '10%', animationDelay: '1s'}} />
          </div>

          <div style={styles.sparkleContainer}>
            <User size={32} />
          </div>

          <div style={styles.mainContent}>
            <div style={styles.loadingContainer}>
              <div style={styles.loadingCard}>
                <div style={styles.loadingSpinner}></div>
                <div>
                  <h3 style={{color: 'white', margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: '700'}}>
                    Chargement en cours...
                  </h3>
                  <p style={{color: 'rgba(255, 255, 255, 0.7)', margin: '0', fontSize: '1rem'}}>
                    Récupération de vos données
                  </p>
                </div>
              </div>
            </div>
          </div>
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
        
        <div style={styles.floatingElements}>
          <User size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
          <CreditCard size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
          <ClipboardList size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
          <Zap size={45} style={{...styles.floatingIcon, bottom: '30%', right: '10%', animationDelay: '1s'}} />
        </div>

        <div style={styles.sparkleContainer}>
          <Star size={32} />
        </div>

        <div style={styles.mainContent}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <div style={styles.headerContent} className="header-content">
              <div style={styles.headerIcon}>
                <User size={40} color="white" />
              </div>
              <div style={styles.headerText}>
                <h1 style={styles.title} className="title">Bienvenue, {user?.name}</h1>
                <p style={styles.subtitle}>
                  <Clock size={20} />
                  Tableau de bord personnel
                </p>
              </div>
            </div>
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
              <div style={{...styles.statIcon, ...styles.statIconReservations}}>
                <ClipboardList size={24} />
              </div>
              <div style={styles.statNumber}>
                {reservations.length}
              </div>
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
              <div style={{...styles.statIcon, ...styles.statIconPayments}}>
                <CreditCard size={24} />
              </div>
              <div style={styles.statNumber}>
                {payments.length}
              </div>
              <div style={styles.statLabel}>Paiements</div>
            </div>
          </div>

          {/* Section Réservations */}
          <div 
            style={{
              ...styles.section,
              ...(hoveredSection === 'reservations' ? styles.sectionHover : {})
            }}
            onMouseEnter={() => setHoveredSection('reservations')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 style={styles.sectionTitle}>
              <div style={styles.sectionTitleIcon}>
                <ClipboardList size={20} color="white" />
              </div>
              Mes Réservations
            </h3>

            {reservations.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyCard}>
                  <div style={styles.emptyIcon}>
                    <Car size={60} color="rgba(255, 255, 255, 0.6)" />
                  </div>
                  <h3 style={styles.emptyTitle}>Aucune réservation trouvée</h3>
                  <p style={styles.emptyText}>
                    Vous n'avez pas encore effectué de réservation. Explorez notre catalogue de véhicules pour commencer !
                  </p>
                </div>
              </div>
            ) : (
              <div style={styles.cardContainer} className="card-container">
                {reservations.map((r, index) => {
                  const totalPrice = Number(r.total_price ?? 0);
                  const caution = Number(r.caution ?? 0);

                  // Calculer le total payé pour cette réservation
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
                        <span style={styles.cardLabel}>
                          <Car size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                          Voiture
                        </span>
                        <span style={styles.cardValue}>{r.car_brand || '---'}</span>
                      </div>

                      <div style={styles.formGroup}>
                        <span style={styles.cardLabel}>
                          <Calendar size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                          Date de début
                        </span>
                        <span style={styles.cardValue}>
                          {r.start_date ? new Date(r.start_date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : '---'}
                        </span>
                      </div>

                      <div style={styles.formGroup}>
                        <span style={styles.cardLabel}>Statut du paiement</span>
                        <span style={getStatusStyle(status)}>
                          {status === 'Soldé' ? (
                            <>
                              <CheckCircle size={12} />
                              Soldé
                            </>
                          ) : status === 'Payé partiellement' ? (
                            <>
                              <Clock size={12} />
                              Partiel
                            </>
                          ) : (
                            <>
                              <XCircle size={12} />
                              En attente
                            </>
                          )}
                        </span>
                      </div>

                      <div style={styles.formGroup}>
                        <span style={styles.cardLabel}>
                          <DollarSign size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                          Prix de la location
                        </span>
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

                      <div style={styles.cardFooter} className="card-footer">
                        {soldeRestant > 0 && r.is_validated ? (
                          <button
                            style={{
                              ...styles.btn,
                              ...styles.btnSuccess,
                              ...(hoveredButton === `pay-${r.id}` ? styles.btnHover : {})
                            }}
                            onClick={() => navigate('/paiement', { state: { reservation: r, montantRestant: soldeRestant } })}
                            onMouseEnter={() => setHoveredButton(`pay-${r.id}`)}
                            onMouseLeave={() => setHoveredButton(null)}
                          >
                            <CreditCard size={16} />
                            Payer le solde
                          </button>
                        ) : soldeRestant === 0 ? (
                          <div style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                            color: '#34d399',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            border: '1px solid rgba(52, 211, 153, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <CheckCircle size={16} />
                            Paiement complet
                          </div>
                        ) : null}

                        {montantPaye > 0 ? (
                          <span style={styles.cancelNote}>
                            <AlertTriangle size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                            Impossible d'annuler
                          </span>
                        ) : (
                          <button
                            style={{
                              ...styles.btn,
                              ...styles.btnDanger,
                              ...(hoveredButton === `cancel-${r.id}` ? styles.btnHover : {})
                            }}
                            onClick={() => handleCancel(r.id)}
                            onMouseEnter={() => setHoveredButton(`cancel-${r.id}`)}
                            onMouseLeave={() => setHoveredButton(null)}
                          >
                            <Trash2 size={16} />
                            Annuler
                          </button>
                        )}

                        {r.is_validated && (
                          <button
                            style={{
                              ...styles.btn,
                              ...styles.btnPrimary,
                              ...(hoveredButton === `contract-${r.id}` ? styles.btnHover : {})
                            }}
                            onClick={() => downloadContratPdf(r.id)}
                            onMouseEnter={() => setHoveredButton(`contract-${r.id}`)}
                            onMouseLeave={() => setHoveredButton(null)}
                          >
                            <Save size={16} />
                            Contrat PDF
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section Profil */}
          <div 
            style={{
              ...styles.section,
              ...(hoveredSection === 'profile' ? styles.sectionHover : {})
            }}
            onMouseEnter={() => setHoveredSection('profile')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 style={styles.sectionTitle}>
              <div style={styles.sectionTitleIcon}>
                <User size={20} color="white" />
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
                  className="input"
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
                  className="input"
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
                  className="input"
                />
              </div>

              <button 
                type="submit" 
                style={{
                  ...styles.btn,
                  ...styles.btnSuccess,
                  ...(hoveredButton === 'update' ? styles.btnHover : {})
                }}
                onMouseEnter={() => setHoveredButton('update')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Save size={16} />
                Mettre à jour le profil
              </button>
            </form>

            <button
              style={{
                ...styles.btn,
                ...styles.btnDanger,
                marginTop: '2rem',
                ...(hoveredButton === 'delete' ? styles.btnHover : {})
              }}
              onClick={handleDeleteAccount}
              onMouseEnter={() => setHoveredButton('delete')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Trash2 size={16} />
              Supprimer mon compte
            </button>
          </div>

          {/* Section Paiements */}
          <div 
            style={{
              ...styles.section,
              ...(hoveredSection === 'payments' ? styles.sectionHover : {})
            }}
            onMouseEnter={() => setHoveredSection('payments')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 style={styles.sectionTitle}>
              <div style={styles.sectionTitleIcon}>
                <History size={20} color="white" />
              </div>
              Historique des Paiements
            </h3>

            {payments.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyCard}>
                  <div style={styles.emptyIcon}>
                    <CreditCard size={60} color="rgba(255, 255, 255, 0.6)" />
                  </div>
                  <h3 style={styles.emptyTitle}>Aucun paiement trouvé</h3>
                  <p style={styles.emptyText}>
                    Vous n'avez effectué aucun paiement pour le moment. Vos transactions apparaîtront ici.
                  </p>
                </div>
              </div>
            ) : (
              <div style={styles.cardContainer} className="card-container">
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
                      <span style={styles.cardLabel}>
                        <ClipboardList size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                        Réservation
                      </span>
                      <span style={styles.cardValue}>#{p.reservation_id}</span>
                    </div>

                    <div style={styles.formGroup}>
                      <span style={styles.cardLabel}>
                        <Clock size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                        Date de paiement
                      </span>
                      <span style={styles.cardValue}>
                        {new Date(p.created_at).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div style={styles.formGroup}>
                      <span style={styles.cardLabel}>Méthode de paiement</span>
                      <span style={{
                        ...styles.cardValue,
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                        color: '#60a5fa',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        border: '1px solid rgba(96, 165, 250, 0.3)',
                        display: 'inline-block',
                      }}>
                        {p.method || 'Non spécifié'}
                      </span>
                    </div>

                    <div style={styles.formGroup}>
                      <span style={styles.cardLabel}>
                        <DollarSign size={16} style={{display: 'inline', marginRight: '0.5rem'}} />
                        Montant payé
                      </span>
                      <span style={{ ...styles.cardValue, ...styles.priceHighlight }}>
                        {Number(p.amount || 0).toLocaleString()} FCFA
                      </span>
                    </div>

                    <div style={styles.formGroup}>
                      <span style={styles.cardLabel}>Statut</span>
                      <span style={{ ...styles.statusBadge, ...styles.statusSolde }}>
                        <CheckCircle size={12} />
                        Payé
                      </span>
                    </div>

                    {p.reference && (
                      <div style={styles.formGroup}>
                        <span style={styles.cardLabel}>Référence</span>
                        <code style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          fontFamily: 'Monaco, Consolas, monospace',
                          display: 'block',
                          marginTop: '0.5rem'
                        }}>
                          {p.reference}
                        </code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section Footer */}
          <div style={styles.footerSection}>
            <TrendingUp size={48} style={styles.footerIcon} />
            <p style={styles.footerText}>
              Gérez facilement vos réservations et paiements en toute sécurité
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;