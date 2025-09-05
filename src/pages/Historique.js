// Historique.js
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { FileDown, CalendarDays, Filter, Banknote, Sparkles, TrendingUp, CreditCard, Archive, Search, User, Clock, DollarSign, FileText, Star, Zap } from 'lucide-react';

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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    animation: 'slideUp 1s ease-out',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
  },
  statCardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  statIcon: {
    width: '60px',
    height: '60px',
    margin: '0 auto 1.5rem',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
  },
  statIconAmount: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
  },
  statIconTransactions: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
  },
  statIconReservations: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: 'white',
    marginBottom: '0.5rem',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  statLabel: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  filtersCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    animation: 'slideUp 1s ease-out 0.2s both',
    position: 'relative',
    overflow: 'hidden',
  },
  filtersTitle: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  filtersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  inputGroup: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.6)',
    pointerEvents: 'none',
  },
  exportButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  exportButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
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
  },
  filterButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  sortButton: {
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
    boxShadow: '0 8px 20px rgba(107, 114, 128, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  pdfButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  buttonHover: {
    transform: 'translateY(-4px) scale(1.05)',
  },
  tableCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    animation: 'slideUp 1s ease-out 0.4s both',
    position: 'relative',
    overflow: 'hidden',
  },
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '700px',
  },
  th: {
    padding: '1.5rem 1rem',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    color: 'white',
    fontWeight: '700',
    textAlign: 'left',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'sticky',
    top: '0',
    zIndex: '10',
  },
  td: {
    padding: '1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
  },
  tableRow: {
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  tableRowHover: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    transform: 'translateX(4px)',
  },
  badge: {
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
  badgeFlooz: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
  },
  badgeMixx: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
  },
  badgeEcobank: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
  },
  badgeDefault: {
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
    boxShadow: '0 4px 12px rgba(107, 114, 128, 0.4)',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
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
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '40vh',
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

  .select:focus {
    outline: none !important;
    border-color: rgba(59, 130, 246, 0.6) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
  }

  .select option {
    background: #1f2937 !important;
    color: white !important;
  }

  @media (max-width: 768px) {
    .filters-grid {
      grid-template-columns: 1fr !important;
    }
    
    .export-buttons {
      flex-direction: column !important;
    }
    
    .header-content {
      flex-direction: column !important;
      text-align: center !important;
    }
    
    .title {
      font-size: 2rem !important;
    }
  }
`;

function Historique() {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [methodFilter, setMethodFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const token = localStorage.getItem('token');

    if (!currentUser || !token) {
      setLoading(false);
      return;
    }

    setUser(currentUser);

    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: { Authorization: `Bearer ${token}` }
    });

    axiosInstance.get(`/payments/user/${currentUser.id}`)
      .then((res) => {
        setPayments(res.data);
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error("❌ Erreur lors du chargement des paiements:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const applyFilters = () => {
    let data = [...payments];

    if (methodFilter) {
      data = data.filter(p => p.method === methodFilter);
    }

    setFiltered(data);
  };

  const sortByDate = () => {
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFiltered(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Historique des paiements', 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [['Date', 'Voiture', 'Méthode', 'Montant']],
      body: filtered.map(p => [
        new Date(p.created_at).toLocaleString(),
        p.car_brand || '---',
        p.method || '---',
        (p.amount ?? 0).toLocaleString() + ' FCFA',
      ]),
    });
    doc.save('historique_paiements.pdf');
  };

  const getMethodBadge = (method) => {
    const baseStyle = styles.badge;
    switch (method) {
      case 'Flooz': return { ...baseStyle, ...styles.badgeFlooz };
      case 'Mixx by Yas': return { ...baseStyle, ...styles.badgeMixx };
      case 'Ecobank': return { ...baseStyle, ...styles.badgeEcobank };
      default: return { ...baseStyle, ...styles.badgeDefault };
    }
  };

  const totalAmount = filtered.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalTransactions = filtered.length;
  const uniqueReservations = new Set(filtered.map(p => p.reservation_id));
  const reservationCount = uniqueReservations.size;

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          
          <div style={styles.floatingElements}>
            <Archive size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
            <DollarSign size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
            <TrendingUp size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
            <Sparkles size={45} style={{...styles.floatingIcon, bottom: '30%', right: '10%', animationDelay: '1s'}} />
          </div>

          <div style={styles.sparkleContainer}>
            <Archive size={32} />
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
                    Récupération de votre historique des paiements
                  </p>
                </div>
              </div>
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
        
        <div style={styles.floatingElements}>
          <Archive size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
          <DollarSign size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
          <TrendingUp size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
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
                <Archive size={40} color="white" />
              </div>
              <div style={styles.headerText}>
                <h1 style={styles.title} className="title">Historique des Paiements</h1>
                <p style={styles.subtitle}>
                  <Clock size={20} />
                  {filtered.length} paiement{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={styles.statsContainer}>
            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'amount' ? styles.statCardHover : {}),
                animationDelay: '0s'
              }}
              onMouseEnter={() => setHoveredCard('amount')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{...styles.statIcon, ...styles.statIconTransactions}}>
                <CreditCard size={24} />
              </div>
              <div style={styles.statNumber}>
                {totalTransactions}
              </div>
              <div style={styles.statLabel}>Transactions</div>
            </div>

            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'reservations' ? styles.statCardHover : {}),
                animationDelay: '0.2s'
              }}
              onMouseEnter={() => setHoveredCard('reservations')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{...styles.statIcon, ...styles.statIconReservations}}>
                <TrendingUp size={24} />
              </div>
              <div style={styles.statNumber}>
                {reservationCount}
              </div>
              <div style={styles.statLabel}>Réservations</div>
            </div>
          </div>

          {/* Filters */}
          <div style={styles.filtersCard}>
            <h3 style={styles.filtersTitle}>
              <Filter size={24} />
              Filtres et actions
            </h3>
            
            <div style={styles.filtersGrid} className="filters-grid">
              <div style={styles.inputGroup}>
                <Filter size={20} style={styles.inputIcon} />
                <select 
                  value={methodFilter} 
                  onChange={(e) => setMethodFilter(e.target.value)} 
                  style={styles.select}
                  className="select"
                >
                  <option value="">Toutes les méthodes</option>
                  <option value="Flooz">Flooz</option>
                  <option value="Mixx by Yas">Mixx by Yas</option>
                  <option value="Ecobank">Ecobank</option>
                </select>
              </div>
            </div>

            <div style={styles.exportButtons} className="export-buttons">
              <button 
                onClick={applyFilters}
                style={{
                  ...styles.exportButton,
                  ...styles.filterButton,
                  ...(hoveredButton === 'filter' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('filter')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Filter size={20} />
                Appliquer les filtres
              </button>

              <button 
                onClick={sortByDate}
                style={{
                  ...styles.exportButton,
                  ...styles.sortButton,
                  ...(hoveredButton === 'sort' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('sort')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <CalendarDays size={20} />
                Trier par date {sortOrder === 'asc' ? '↑' : '↓'}
              </button>

              <button 
                onClick={exportPDF}
                style={{
                  ...styles.exportButton,
                  ...styles.pdfButton,
                  ...(hoveredButton === 'pdf' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('pdf')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <FileDown size={20} />
                Exporter PDF
              </button>
            </div>
          </div>

          {/* Table */}
          {filtered.length > 0 ? (
            <div style={styles.tableCard}>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <Clock size={16} />
                          Date
                        </div>
                      </th>
                      <th style={styles.th}>Voiture</th>
                      <th style={styles.th}>Méthode</th>
                      <th style={styles.th}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <DollarSign size={16} />
                          Montant
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, index) => (
                      <tr 
                        key={index}
                        style={{
                          ...styles.tableRow,
                          ...(hoveredRow === index ? styles.tableRowHover : {})
                        }}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td style={styles.td}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: '500',
                          }}>
                            <Clock size={14} />
                            {new Date(p.created_at).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'inline-block',
                            fontWeight: '600',
                          }}>
                            {p.car_brand || '---'}
                          </div>
                        </td>
                        <td style={styles.td}>
                          <span style={getMethodBadge(p.method)}>
                            <div style={{
                              width: '8px',
                              height: '8px',
                              background: 'white',
                              borderRadius: '50%',
                              animation: 'pulse 2s infinite'
                            }}></div>
                            {p.method || '---'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                            color: '#34d399',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            border: '1px solid rgba(52, 211, 153, 0.3)',
                          }}>
                            {Number(p.amount || 0).toLocaleString()} FCFA
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyCard}>
                <div style={styles.emptyIcon}>
                  <Archive size={60} color="rgba(255, 255, 255, 0.6)" />
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '700',
                  margin: '0 0 1rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  Aucune transaction trouvée
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.2rem',
                  margin: '0',
                  lineHeight: '1.6'
                }}>
                  {methodFilter 
                    ? "Aucune transaction ne correspond à vos critères de recherche."
                    : "Vous n'avez encore effectué aucune transaction."
                  }
                </p>
                {methodFilter && (
                  <button
                    onClick={() => {
                      setMethodFilter('');
                      applyFilters();
                    }}
                    style={{
                      ...styles.exportButton,
                      ...styles.filterButton,
                      marginTop: '2rem',
                    }}
                  >
                    <Search size={20} />
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Footer décoratif */}
          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'float 8s ease-in-out infinite',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          }}>
            <Archive size={48} style={{ 
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
              Gardez une trace de toutes vos transactions en toute simplicité
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Historique;