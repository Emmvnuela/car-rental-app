// Historique.js
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { FileDown, CalendarDays, Filter, Banknote, Sparkles, TrendingUp, CreditCard, Archive } from 'lucide-react';

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
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  statCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    padding: '2rem',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out',
  },
  statCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
  },
  statIcon: {
    width: '60px',
    height: '60px',
    margin: '0 auto 1rem',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'white',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
  statIconAmount: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  statIconTransactions: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  },
  statIconReservations: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
    lineHeight: '1',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
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
    marginBottom: '2rem',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  select: {
    padding: '1rem 1.25rem',
    borderRadius: '16px',
    border: '2px solid rgba(203, 213, 224, 0.3)',
    fontSize: '1rem',
    fontWeight: '500',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  selectFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    transform: 'translateY(-2px)',
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
  },
  btn: {
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '16px',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    minWidth: '160px',
    justifyContent: 'center',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
  },
  btnSecondary: {
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(107, 114, 128, 0.3)',
  },
  btnSuccess: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
  },
  btnHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.4)',
  },
  btnGlow: {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  btnGlowActive: {
    left: '100%',
  },
  tableSection: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out',
  },
  tableHeader: {
    padding: '2rem 2.5rem',
    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
  },
  tableTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  tableTitleIcon: {
    padding: '0.5rem',
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    borderRadius: '12px',
    color: 'white',
    boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)',
  },
  tableWrapper: {
    overflowX: 'auto',
    maxHeight: '70vh',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  },
  tableHead: {
    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.7) 100%)',
    position: 'sticky',
    top: '0',
    zIndex: '10',
    backdropFilter: 'blur(10px)',
  },
  tableHeaderCell: {
    padding: '1.5rem 2rem',
    textAlign: 'left',
    fontWeight: '700',
    color: '#374151',
    borderBottom: '2px solid rgba(226, 232, 240, 0.5)',
    borderRight: '1px solid rgba(226, 232, 240, 0.3)',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontSize: '0.875rem',
  },
  tableCell: {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid rgba(241, 245, 249, 0.8)',
    borderRight: '1px solid rgba(241, 245, 249, 0.5)',
    color: '#1e293b',
    verticalAlign: 'middle',
    transition: 'all 0.2s ease',
  },
  tableRowHover: {
    ':hover': {
      background: 'rgba(248, 250, 252, 0.8)',
      transform: 'scale(1.01)',
    }
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
    fontSize: '5rem',
    marginBottom: '2rem',
    opacity: '0.6',
    animation: 'bounce 2s infinite',
    color: '#64748b',
  },
  emptyStateTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#374151',
  },
  emptyStateText: {
    fontSize: '1.1rem',
    color: '#6b7280',
    fontWeight: '500',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  badgeFlooz: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    color: '#1e40af',
    border: '1px solid rgba(30, 64, 175, 0.2)',
  },
  badgeMixx: {
    background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
    color: '#7c3aed',
    border: '1px solid rgba(124, 58, 237, 0.2)',
  },
  badgeEcobank: {
    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    color: '#065f46',
    border: '1px solid rgba(6, 95, 70, 0.2)',
  },
  badgeDefault: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    color: '#475569',
    border: '1px solid rgba(71, 85, 105, 0.2)',
  },
  amountCell: {
    fontWeight: '700',
    fontSize: '1.1rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  dateCell: {
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: '500',
  },
  carCell: {
    fontWeight: '600',
    color: '#1e293b',
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

function Historique() {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [methodFilter, setMethodFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

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
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
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
        (p.details?.amount ?? 0).toLocaleString() + ' FCFA',
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

  const totalAmount = filtered.reduce((sum, p) => sum + (p.details?.amount || 0), 0);
  const totalTransactions = filtered.length;
  const uniqueReservations = new Set(filtered.map(p => p.reservation_id));
  const reservationCount = uniqueReservations.size;

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            Chargement de l'historique...
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
        <div style={styles.contentWrapper}>
          <div style={styles.header}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Retour :</span>
              </div>

            <div style={styles.headerGlow}></div>
            <Sparkles size={32} style={styles.sparkleIcon} />
            <h1 style={styles.title}>
              <Archive size={40} />
              Historique des Paiements
            </h1>
            <p style={styles.subtitle}>Consultez et gérez toutes vos transactions</p>

          </div>

          {/* Statistiques */}
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
              <div style={{...styles.statIcon, ...styles.statIconAmount}}>
                <Banknote size={24} />
              </div>
              <div style={styles.statNumber}>
                {totalAmount.toLocaleString()}
              </div>
              <div style={styles.statLabel}>FCFA Total</div>
            </div>

            <div 
              style={{
                ...styles.statCard,
                ...(hoveredCard === 'transactions' ? styles.statCardHover : {}),
                animationDelay: '0.1s'
              }}
              onMouseEnter={() => setHoveredCard('transactions')}
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

          {/* Filtres */}
          <div style={styles.filtersSection}>
            <h3 style={styles.filtersTitle}>
              <div style={styles.filterIcon}>
                <Filter size={20} />
              </div>
              Filtres et Actions
            </h3>
            
            <div style={styles.filtersContainer}>
              <div style={styles.filterGroup}>
                <label style={styles.label}>Méthode de paiement</label>
                <select 
                  style={styles.select} 
                  value={methodFilter} 
                  onChange={(e) => setMethodFilter(e.target.value)}
                >
                  <option value="">-- Toutes les méthodes --</option>
                  <option value="Flooz">Flooz</option>
                  <option value="Mixx by Yas">Mixx by Yas</option>
                  <option value="Ecobank">Ecobank</option>
                </select>
              </div>
            </div>

            <div style={styles.buttonsContainer}>
              <button 
                style={{
                  ...styles.btn, 
                  ...styles.btnPrimary,
                  ...(hoveredButton === 'filter' ? styles.btnHover : {})
                }} 
                onClick={applyFilters}
                onMouseEnter={() => setHoveredButton('filter')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div 
                  style={{
                    ...styles.btnGlow,
                    ...(hoveredButton === 'filter' ? styles.btnGlowActive : {})
                  }}
                ></div>
                <Filter size={16} /> 
                Appliquer les filtres
              </button>
              
              <button 
                style={{
                  ...styles.btn, 
                  ...styles.btnSecondary,
                  ...(hoveredButton === 'sort' ? styles.btnHover : {})
                }} 
                onClick={sortByDate}
                onMouseEnter={() => setHoveredButton('sort')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div 
                  style={{
                    ...styles.btnGlow,
                    ...(hoveredButton === 'sort' ? styles.btnGlowActive : {})
                  }}
                ></div>
                <CalendarDays size={16} /> 
                Trier par date {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
              
              <button 
                style={{
                  ...styles.btn, 
                  ...styles.btnSuccess,
                  ...(hoveredButton === 'export' ? styles.btnHover : {})
                }} 
                onClick={exportPDF}
                onMouseEnter={() => setHoveredButton('export')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div 
                  style={{
                    ...styles.btnGlow,
                    ...(hoveredButton === 'export' ? styles.btnGlowActive : {})
                  }}
                ></div>
                <FileDown size={16} /> 
                Exporter PDF
              </button>
            </div>
          </div>

          {/* Tableau */}
          <div style={styles.tableSection}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>
                <div style={styles.tableTitleIcon}>
                  <Banknote size={20} />
                </div>
                Détails des Transactions
              </h3>
            </div>

            {filtered.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyStateIcon}>💳</div>
                <div style={styles.emptyStateTitle}>Aucune transaction trouvée</div>
                <div style={styles.emptyStateText}>
                  Effectuez une transaction ou modifiez vos filtres pour voir vos paiements
                </div>
              </div>
            ) : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead style={styles.tableHead}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Date</th>
                      <th style={styles.tableHeaderCell}>Voiture</th>
                      <th style={styles.tableHeaderCell}>Méthode</th>
                      <th style={styles.tableHeaderCell}>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, index) => (
                      <tr key={index} style={styles.tableRowHover}>
                        <td style={{ ...styles.tableCell, ...styles.dateCell }}>
                          {new Date(p.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td style={{ ...styles.tableCell, ...styles.carCell }}>
                          {p.car_brand || '---'}
                        </td>
                        <td style={styles.tableCell}>
                          <span style={getMethodBadge(p.method)}>{p.method || '---'}</span>
                        </td>
                        <td style={{ ...styles.tableCell, ...styles.amountCell }}>
                          {Number(p.details?.amount || 0).toLocaleString()} FCFA
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

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