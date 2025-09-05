import React, { useEffect, useState, useCallback } from 'react';
import axios from '../api/axiosInstance';
import { DeliveryForm } from '../components/DeliveryForm';
import { DeliveryCards } from '../components/DeliveryCards';
import { 
  Truck, 
  Package, 
  Plus, 
  List,
  Sparkles,
  Shield,
  Settings,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Filter
} from 'lucide-react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    padding: '1rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  
  // NOUVEAU: Navigation flottante
  floatingNav: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  
  navButton: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'white',
  },
  
  navButtonHover: {
    transform: 'scale(1.1)',
    boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4)',
  },
  
  header: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
  },
  
  headerGlow: {
    position: 'absolute',
    top: '-50%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
    animation: 'pulse 3s ease-in-out infinite',
  },
  
  sparkleIcon: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    position: 'relative',
    zIndex: 2,
  },
  
  logo: {
    height: '70px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
    marginBottom: '0.5rem',
  },
  
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  pageTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    margin: '0',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  
  pageSubtitle: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    fontWeight: '500',
    letterSpacing: '0.02em',
  },
  
  // NOUVEAU: Section collapsible avec header interactif
  section: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideInUp 0.6s ease-out both',
  },
  
  sectionForm: {
    animationDelay: '0.1s',
  },
  
  sectionList: {
    animationDelay: '0.2s',
  },
  
  // Section header cliquable
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '2rem 2.5rem 1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  },
  
  sectionHeaderHover: {
    background: 'rgba(255, 255, 255, 0.05)',
  },
  
  sectionContent: {
    padding: '2rem 2.5rem 2.5rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  sectionContentCollapsed: {
    maxHeight: '0',
    padding: '0 2.5rem',
    overflow: 'hidden',
  },
  
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
  },
  
  sectionSubtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0',
    fontStyle: 'italic',
    marginRight: '1rem',
  },
  
  collapseButton: {
    color: 'rgba(255, 255, 255, 0.6)',
    transition: 'all 0.3s ease',
    transform: 'rotate(0deg)',
  },
  
  collapseButtonRotated: {
    transform: 'rotate(180deg)',
  },
  
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
  },
  
  iconWrapperGreen: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
  },
  
  // NOUVEAU: Filtres pour les statistiques
  filterBar: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  
  filterButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '25px',
    padding: '0.5rem 1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  filterButtonActive: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    borderColor: '#3b82f6',
  },
  
  // Statistiques améliorées avec interactions
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  
  statItem: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  
  statItemHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  statItemGlow: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)',
    opacity: '0',
    transition: 'opacity 0.3s ease',
  },
  
  statItemGlowVisible: {
    opacity: '1',
  },
  
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#3b82f6',
    marginBottom: '0.5rem',
    position: 'relative',
    zIndex: 1,
  },
  
  statLabel: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    position: 'relative',
    zIndex: 1,
  },
  
  // Conteneurs améliorés
  formContainer: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  
  cardsContainer: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    padding: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    minHeight: '200px',
  },
  
  // NOUVEAU: États vides plus engageants
  emptyState: {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'fadeIn 0.5s ease-out',
  },
  
  emptyStateIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    color: 'rgba(255, 255, 255, 0.4)',
    animation: 'bounce 2s ease-in-out infinite',
  },
  
  emptyStateTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '0.75rem',
  },
  
  emptyStateMessage: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '1.5',
    maxWidth: '400px',
    margin: '0 auto',
  },
  
  // NOUVEAU: Indicateur de scroll
  scrollIndicator: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    height: '3px',
    background: 'linear-gradient(90deg, #3b82f6, #10b981)',
    transformOrigin: 'left',
    zIndex: 1001,
    transition: 'transform 0.1s ease-out',
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
  
  // Loading amélioré
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '3rem 2rem',
  },
  
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
    fontWeight: '500',
  },
  
  loadingDots: {
    display: 'flex',
    gap: '0.25rem',
  },
  
  loadingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#3b82f6',
    animation: 'loadingDot 1.4s ease-in-out infinite both',
  },
};

// Animations CSS étendues
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
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -15px, 0); }
    70% { transform: translate3d(0, -7px, 0); }
    90% { transform: translate3d(0, -2px, 0); }
  }
  
  @keyframes loadingDot {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  
  .loading-dot:nth-child(1) { animation-delay: -0.32s; }
  .loading-dot:nth-child(2) { animation-delay: -0.16s; }
  .loading-dot:nth-child(3) { animation-delay: 0s; }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .floating-nav {
      bottom: 1rem !important;
      right: 1rem !important;
    }
    
    .nav-button {
      width: 48px !important;
      height: 48px !important;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formCollapsed, setFormCollapsed] = useState(false);
  const [listCollapsed, setListCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredStat, setHoveredStat] = useState(null);

  // Hook pour le scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchDeliveries = useCallback(() => {
    setLoading(true);
    axios.get('/deliveries')
      .then(res => {
        setDeliveries(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement livraisons:', err);
        toast.error("Erreur lors du chargement des livraisons");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchDeliveries();

    const socket = io('http://localhost:5000');

    socket.on('deliveryUpdated', () => {
      console.log('🔄 WebSocket: Rechargement des livraisons');
      fetchDeliveries();
    });

    socket.on('deliveryExists', (data) => {
      toast.warn(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchDeliveries]);

  // Calcul des statistiques avec filtrage
  const stats = {
    total: deliveries.length,
    enAttente: deliveries.filter(d => d.delivery_status === 'En attente').length,
    enCours: deliveries.filter(d => d.delivery_status === 'En cours').length,
    livrees: deliveries.filter(d => d.delivery_status === 'Livré').length,
  };

  // Filtrer les livraisons selon le filtre actif
  const filteredDeliveries = activeFilter === 'all' 
    ? deliveries 
    : deliveries.filter(d => {
        switch(activeFilter) {
          case 'waiting': return d.delivery_status === 'En attente';
          case 'progress': return d.delivery_status === 'En cours';
          case 'delivered': return d.delivery_status === 'Livré';
          default: return true;
        }
      });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{cssAnimations}</style>
      
      {/* Indicateur de scroll */}
      <div 
        style={{
          ...styles.scrollIndicator,
          transform: `scaleX(${scrollProgress / 100})`
        }}
      />
      
      {/* Navigation flottante */}
      <div style={styles.floatingNav} className="floating-nav">
        <div 
          style={styles.navButton}
          onClick={scrollToTop}
          title="Retour en haut"
          className="nav-button"
        >
          <ChevronUp size={24} />
        </div>
        <div 
          style={styles.navButton}
          onClick={scrollToForm}
          title="Nouvelle livraison"
          className="nav-button"
        >
          <Plus size={24} />
        </div>
      </div>

      <main style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <Truck size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Package size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Settings size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Shield size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        <div style={styles.content}>
          {/* Header Principal */}
          <header style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={32} style={styles.sparkleIcon} />
            
            <div style={styles.logoSection}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <div style={styles.titleSection}>
                <h1 style={styles.pageTitle}>
                  <Truck size={36} />
                  Gestion des Livraisons
                </h1>
                <p style={styles.pageSubtitle}>
                  Créez et suivez toutes vos livraisons en temps réel
                </p>
              </div>
            </div>
          </header>

          {/* Section Nouvelle Livraison Collapsible */}
          <section style={{...styles.section, ...styles.sectionForm}} className="form-section">
            <div 
              style={{
                ...styles.sectionHeader,
                ...(hoveredStat === 'form' ? styles.sectionHeaderHover : {})
              }}
              onClick={() => setFormCollapsed(!formCollapsed)}
              onMouseEnter={() => setHoveredStat('form')}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div style={styles.iconWrapper}>
                <Plus size={24} color="#3b82f6" />
              </div>
              <h2 style={styles.sectionTitle}>
                Nouvelle Livraison
              </h2>
              <span style={styles.sectionSubtitle}>
                Créer une nouvelle livraison
              </span>
              <div style={{
                ...styles.collapseButton,
                ...(formCollapsed ? styles.collapseButtonRotated : {})
              }}>
                <ChevronDown size={20} />
              </div>
            </div>
            
            <div style={formCollapsed ? styles.sectionContentCollapsed : styles.sectionContent}>
              <div style={styles.formContainer}>
                <DeliveryForm onSuccess={fetchDeliveries} />
              </div>
            </div>
          </section>

          {/* Section Livraisons en cours Collapsible */}
          <section style={{...styles.section, ...styles.sectionList}}>
            <div 
              style={{
                ...styles.sectionHeader,
                ...(hoveredStat === 'list' ? styles.sectionHeaderHover : {})
              }}
              onClick={() => setListCollapsed(!listCollapsed)}
              onMouseEnter={() => setHoveredStat('list')}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div style={{...styles.iconWrapper, ...styles.iconWrapperGreen}}>
                <List size={24} color="#10b981" />
              </div>
              <h2 style={styles.sectionTitle}>
                Livraisons en Cours
              </h2>
              <span style={styles.sectionSubtitle}>
                {stats.total} livraison{stats.total !== 1 ? 's' : ''} au total
              </span>
              <div style={{
                ...styles.collapseButton,
                ...(listCollapsed ? styles.collapseButtonRotated : {})
              }}>
                <ChevronDown size={20} />
              </div>
            </div>

            <div style={listCollapsed ? styles.sectionContentCollapsed : styles.sectionContent}>
              {/* Barre de filtres */}
              <div style={styles.filterBar}>
                <Filter size={16} color="rgba(255, 255, 255, 0.6)" />
                {[
                  { key: 'all', label: 'Toutes', count: stats.total },
                  { key: 'waiting', label: 'En attente', count: stats.enAttente },
                  { key: 'progress', label: 'En cours', count: stats.enCours },
                  { key: 'delivered', label: 'Livrées', count: stats.livrees }
                ].map(filter => (
                  <button
                    key={filter.key}
                    style={{
                      ...styles.filterButton,
                      ...(activeFilter === filter.key ? styles.filterButtonActive : {})
                    }}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Barre de statistiques interactive */}
              <div style={styles.statsBar} className="stats-grid">
                {[
                  { key: 'total', label: 'Total', value: stats.total, color: '#3b82f6' },
                  { key: 'enAttente', label: 'En Attente', value: stats.enAttente, color: '#fbbf24' },
                  { key: 'enCours', label: 'En Cours', value: stats.enCours, color: '#3b82f6' },
                  { key: 'livrees', label: 'Livrées', value: stats.livrees, color: '#10b981' }
                ].map((stat) => (
                  <div 
                    key={stat.key}
                    style={{
                      ...styles.statItem,
                      ...(hoveredStat === stat.key ? styles.statItemHover : {})
                    }}
                    onMouseEnter={() => setHoveredStat(stat.key)}
                    onMouseLeave={() => setHoveredStat(null)}
                    onClick={() => {
                      const filterMap = {
                        'total': 'all',
                        'enAttente': 'waiting',
                        'enCours': 'progress',
                        'livrees': 'delivered'
                      };
                      setActiveFilter(filterMap[stat.key]);
                    }}
                    role="button"
                    tabIndex="0"
                    aria-label={`${stat.label}: ${stat.value} livraisons - Cliquer pour filtrer`}
                  >
                    <div 
                      style={{
                        ...styles.statItemGlow,
                        ...(hoveredStat === stat.key ? styles.statItemGlowVisible : {})
                      }}
                    />
                    <div style={{
                      ...styles.statNumber,
                      color: stat.color
                    }}>
                      {stat.value}
                    </div>
                    <div style={styles.statLabel}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={styles.cardsContainer}>
                {loading ? (
                  <div style={styles.loadingContainer}>
                    <div style={styles.loadingSpinner}></div>
                    <div style={styles.loadingText}>Chargement des livraisons</div>
                    <div style={styles.loadingDots}>
                      <div style={{...styles.loadingDot, animationDelay: '-0.32s'}} className="loading-dot"></div>
                      <div style={{...styles.loadingDot, animationDelay: '-0.16s'}} className="loading-dot"></div>
                      <div style={{...styles.loadingDot, animationDelay: '0s'}} className="loading-dot"></div>
                    </div>
                  </div>
                ) : filteredDeliveries.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyStateIcon}>
                      <Package size={40} />
                    </div>
                    <div style={styles.emptyStateTitle}>
                      {activeFilter === 'all' ? 'Aucune livraison' : 'Aucune livraison correspondante'}
                    </div>
                    <div style={styles.emptyStateMessage}>
                      {activeFilter === 'all' 
                        ? 'Commencez par créer votre première livraison ci-dessus'
                        : 'Aucune livraison ne correspond au filtre sélectionné. Essayez un autre filtre ou créez une nouvelle livraison.'
                      }
                    </div>
                  </div>
                ) : (
                  <DeliveryCards deliveries={filteredDeliveries} onDelete={fetchDeliveries} />
                )}
              </div>
            </div>
          </section>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: 'white',
          }}
        />
      </main>
    </>
  );
}

export default Deliveries;