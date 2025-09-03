import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Calendar, CreditCard, History, Car, Paperclip, Shield, AlertTriangle, TrendingUp, Activity, Settings, Eye, CheckCircle, XCircle, Sparkles, FileText, DollarSign, Clock, MapPin, BarChart3, Users, Star, Zap, Target, Gauge, Award, TrendingDown, AlertCircle, CheckSquare, RefreshCw
} from 'lucide-react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, Legend, AreaChart, Area, BarChart, Bar,
  RadialBarChart, RadialBar, ComposedChart
} from 'recharts';

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
    padding: '2rem',
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
  dashboardContainer: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1600px',
    margin: '0 auto',
    animation: 'slideUp 0.8s ease-out',
  },
  header: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '2rem',
    marginBottom: '2rem',
    position: 'relative',
  },
  headerGlow: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    height: '100px',
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
  title: {
    fontSize: '2.2rem',
    fontWeight: '800',
    margin: '0 0 0.5rem 0',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0 0 1.5rem 0',
    fontWeight: '400',
    position: 'relative',
    zIndex: 2,
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    position: 'relative',
    zIndex: 2,
  },
  button: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
  },
  buttonSecondary: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '140px',
  },
  statCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
  statCardGlow: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  statIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  statIconPrimary: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
  },
  statIconSuccess: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
  },
  statIconWarning: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
  },
  statIconDanger: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
  },
  statIconPurple: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: 'white',
  },
  statIconTeal: {
    background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    color: 'white',
  },
  statIconRose: {
    background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    color: 'white',
  },
  statTitle: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  },
  statCount: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'white',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statSubtitle: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: '0.25rem',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  chartsGridLarge: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginBottom: '2rem',
  },
  chartCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '2rem',
    position: 'relative',
  },
  chartTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  alertsSection: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '2rem',
    position: 'relative',
  },
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  performanceCard: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  },
  performanceCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  performanceGauge: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'conic-gradient(from 0deg, #10b981 0%, #10b981 75%, rgba(255,255,255,0.2) 75%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  performanceGaugeInner: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  trendIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  trendUp: {
    color: '#10b981',
  },
  trendDown: {
    color: '#ef4444',
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
    animation: 'float 8s ease-in-out infinite',
  },
  floatingIcon1: {
    top: '5%',
    left: '10%',
    animationDelay: '0s',
  },
  floatingIcon2: {
    top: '15%',
    right: '15%',
    animationDelay: '2s',
  },
  floatingIcon3: {
    bottom: '10%',
    left: '5%',
    animationDelay: '4s',
  },
  floatingIcon4: {
    bottom: '20%',
    right: '10%',
    animationDelay: '1s',
  },
  loading: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
    padding: '2rem',
  },
  error: {
    textAlign: 'center',
    color: '#ef4444',
    fontSize: '1.1rem',
    padding: '2rem',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  }
};

const cssAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-30px) rotate(5deg); }
    66% { transform: translateY(-15px) rotate(-3deg); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }
`;

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    monthlyData: [],
    carTypesData: [],
    paymentMethodsData: [],
    performanceData: []
  });
  
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  
  const navigate = useNavigate();

  // Fonction pour récupérer les statistiques depuis l'API
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/stats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setStats(data.stats);
      
      // Générer les données de graphiques basées sur les vraies stats
      generateChartData(data.stats);
      
    } catch (err) {
      console.error('Erreur lors de la récupération des stats:', err);
      setError(err.message || 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer les données détaillées des graphiques
  const fetchDetailedData = async () => {
    try {
      // Récupération des données mensuelles
      const monthlyResponse = await fetch('/api/stats/monthly', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (monthlyResponse.ok) {
        const monthlyData = await monthlyResponse.json();
        setChartData(prev => ({ ...prev, monthlyData: monthlyData.data }));
      }

      // Récupération des données de véhicules par type
      const carsResponse = await fetch('/api/stats/cars-by-type', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (carsResponse.ok) {
        const carsData = await carsResponse.json();
        setChartData(prev => ({ ...prev, carTypesData: carsData.data }));
      }

      // Récupération des méthodes de paiement
      const paymentsResponse = await fetch('/api/stats/payment-methods', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        setChartData(prev => ({ ...prev, paymentMethodsData: paymentsData.data }));
      }

    } catch (err) {
      console.error('Erreur lors de la récupération des données détaillées:', err);
    }
  };

  // Générer des données de graphiques basiques si les API détaillées ne sont pas disponibles
  const generateChartData = (statsData) => {
    if (!statsData) return;

    // Données mensuelles simulées basées sur les vraies stats
    const monthlyData = Array.from({length: 12}, (_, i) => {
      const month = new Date(2024, i, 1).toLocaleDateString('fr-FR', { month: 'short' });
      const factor = (i + 1) / 12; // Facteur de croissance progressive
      return {
        month,
        revenus: Math.floor(statsData.monthlyRevenue * factor * (0.8 + Math.random() * 0.4)),
        reservations: Math.floor(statsData.totalReservations * factor * (0.08 + Math.random() * 0.04)),
        nouveauxUsers: Math.floor(statsData.totalUsers * factor * (0.08 + Math.random() * 0.04)),
      };
    });

    // Données de performance basées sur les vraies stats
    const performanceData = [
      { 
        name: 'Taux de satisfaction', 
        value: statsData.averageRating * 20, 
        color: '#10b981' 
      },
      { 
        name: 'Taux de livraison', 
        value: statsData.totalReservations > 0 ? (statsData.deliveredReservations / statsData.totalReservations) * 100 : 0, 
        color: '#3b82f6' 
      },
      { 
        name: 'Utilisation flotte', 
        value: statsData.averageUtilization, 
        color: '#f59e0b' 
      },
      { 
        name: 'Utilisateurs Premium', 
        value: statsData.totalUsers > 0 ? (statsData.premiumUsers / statsData.totalUsers) * 100 : 0, 
        color: '#8b5cf6' 
      }
    ];

    setChartData(prev => ({
      ...prev,
      monthlyData,
      performanceData,
      // Données par défaut pour les graphiques non encore implémentés
      carTypesData: [
        { name: 'Économique', value: Math.floor(statsData.totalCars * 0.4), color: '#10b981' },
        { name: 'Compacte', value: Math.floor(statsData.totalCars * 0.3), color: '#3b82f6' },
        { name: 'Berline', value: Math.floor(statsData.totalCars * 0.2), color: '#f59e0b' },
        { name: 'SUV', value: Math.floor(statsData.totalCars * 0.1), color: '#ef4444' }
      ], 
      paymentMethodsData: [
        { name: 'Carte', value: 150 },
        { name: 'Virement', value: 80 },
        { name: 'Mobile', value: 45 }
      ]
    }));
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchStats();
    fetchDetailedData();
  }, []);

  const StatCard = ({ icon, title, count, subtitle, trend, iconStyle, index, isPerformance = false }) => (
    <div
      style={{
        ...styles.statCard,
        ...(isPerformance ? styles.performanceCard : {}),
        ...(hoveredCard === index ? styles.statCardHover : {})
      }}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div style={styles.statCardGlow}></div>
      <div style={isPerformance ? styles.performanceCardContent : {}}>
        <div>
          <div style={{ ...styles.statIcon, ...iconStyle }}>
            {icon}
          </div>
          <div style={styles.statTitle}>{title}</div>
          <div style={styles.statCount}>
            {typeof count === 'number' && count > 999 ? 
              (count / 1000).toFixed(1) + 'k' : 
              count
            }
            {trend && (
              <span style={{...styles.trendIndicator, ...(trend > 0 ? styles.trendUp : styles.trendDown)}}>
                {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtitle && <div style={styles.statSubtitle}>{subtitle}</div>}
        </div>
        {isPerformance && (
          <div style={styles.performanceGauge}>
            <div style={styles.performanceGaugeInner}>{count}%</div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          <div style={styles.dashboardContainer}>
            <div style={styles.loading}>
              <RefreshCw size={32} style={{ animation: 'spin 2s linear infinite' }} />
              <p>Chargement des données...</p>
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
          <div style={styles.dashboardContainer}>
            <div style={styles.error}>
              <AlertTriangle size={32} />
              <p>Erreur: {error}</p>
              <button 
                onClick={fetchStats}
                style={{
                  ...styles.button,
                  marginTop: '1rem'
                }}
              >
                <RefreshCw size={18} />
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        <div style={styles.floatingElements}>
          <Shield size={100} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Activity size={80} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Settings size={90} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <TrendingUp size={85} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        <div style={styles.dashboardContainer}>
          {/* En-tête */}
          <header style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={24} style={styles.sparkleIcon} />
            
            <h1 style={styles.title}>
              <Shield size={32} />
              Tableau de bord Administrateur
            </h1>
            <p style={styles.subtitle}>
              Analytics en temps réel - {new Date().toLocaleDateString('fr-FR')}
            </p>

            <div style={styles.buttonsContainer}>
              <button
                onClick={() => navigate('/admin/payments')}
                style={{
                  ...styles.button,
                  ...(hoveredButton === 'payments' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('payments')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <History size={18} />
                Historique des paiements
              </button>
              
              <button
                onClick={() => navigate('/admin/deliveries')}
                style={{
                  ...styles.button,
                  ...styles.buttonSecondary,
                  ...(hoveredButton === 'deliveries' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('deliveries')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Car size={18} />
                Gérer les livraisons
              </button>
              
              <button
                onClick={() => navigate('/agents')}
                style={{
                  ...styles.button,
                  ...styles.buttonSecondary,
                  ...(hoveredButton === 'agents' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('agents')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <User size={18} />
                Voir les agents
              </button>
              
              <button
                onClick={() => navigate('/admin/documents')}
                style={{
                  ...styles.button,
                  ...styles.buttonSecondary,
                  ...(hoveredButton === 'documents' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('documents')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Paperclip size={18} />
                Valider les documents
              </button>
               <button
                onClick={() => navigate('/admin/reservations')}
                style={{
                  ...styles.button,
                  ...styles.buttonSecondary,
                  ...(hoveredButton === 'reservations' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('reservations')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Calendar size={18} />
                Gestion des réservations
              </button>
              <button
              onClick={() => navigate('/admin/contrats')}
              style={{
                ...styles.button,
                ...styles.buttonSecondary,
                ...(hoveredButton === 'contrats' ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('contrats')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <FileText size={18} />
              Contrats de location
            </button>

            </div>
          </header>

          {/* KPI Principaux */}
          <section style={styles.statsGrid}>
            <StatCard 
              icon={<Users size={24} />} 
              title="Utilisateurs Actifs" 
              count={stats.activeUsers}
              subtitle={`${stats.totalUsers} au total`}
              iconStyle={styles.statIconPrimary}
              index={0}
            />
            <StatCard 
              icon={<DollarSign size={24} />} 
              title="Revenus ce mois" 
              count={`${(stats.monthlyRevenue / 1000).toFixed(0)}k Fcfa`}
              subtitle={`${(stats.totalRevenue / 1000).toFixed(0)}k Fcfa total`}
              iconStyle={styles.statIconSuccess}
              index={1}
            />
            <StatCard 
              icon={<Calendar size={24} />} 
              title="Réservations" 
              count={stats.totalReservations}
              subtitle={`${stats.totalReservations > 0 ? ((stats.deliveredReservations / stats.totalDeliveries) * 100).toFixed(1) : 0}% livrées`}
              iconStyle={styles.statIconWarning}
              index={2}
            />
            <StatCard 
              icon={<Car size={24} />} 
              title="Véhicules Disponibles" 
              count={stats.availableCars}
              subtitle={`${stats.totalCars} dans la flotte`}
              iconStyle={styles.statIconTeal}
              index={3}
            />
            <StatCard 
              icon={<Star size={24} />} 
              title="Satisfaction Client" 
              count={stats.averageRating.toFixed(1)}
              subtitle="Note moyenne sur 5"
              iconStyle={styles.statIconRose}
              index={4}
            />
            <StatCard 
              icon={<Target size={24} />} 
              title="Utilisation Flotte" 
              count={Math.round(stats.averageUtilization)}
              subtitle="Pourcentage d'utilisation"
              iconStyle={styles.statIconPurple}
              index={5}
              isPerformance={true}
            />
            <StatCard 
              icon={<Zap size={24} />} 
              title="Utilisateurs Premium" 
              count={stats.premiumUsers}
              subtitle={`${stats.totalUsers > 0 ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1) : 0}% du total`}
              iconStyle={styles.statIconWarning}
              index={6}
            />
            <StatCard 
              icon={<AlertTriangle size={24} />} 
              title="Paiements en Échec" 
              count={stats.failedPayments}
              subtitle="À traiter"
              iconStyle={styles.statIconDanger}
              index={7}
            />
          </section>

          {/* Indicateurs de Performance */}
          <section style={styles.kpiRow}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>
                <Gauge size={20} />
                Indicateurs de Performance
              </h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                {chartData.performanceData.map((item, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      margin: '0 auto 0.5rem',
                      borderRadius: '50%',
                      background: `conic-gradient(${item.color} 0% ${item.value}%, rgba(255,255,255,0.1) ${item.value}% 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                      }}>
                        {item.value.toFixed(0)}%
                      </div>
                    </div>
                    <div style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', fontWeight: '500'}}>
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Graphiques Principaux */}
          <section style={styles.chartsGridLarge}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>
                <TrendingUp size={20} />
                Évolution Mensuelle - 2024
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={chartData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                  <YAxis yAxisId="left" stroke="rgba(255,255,255,0.7)" />
                  <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.7)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenus" fill="#3b82f6" name="Revenus (Fcfa)" />
                  <Line yAxisId="right" type="monotone" dataKey="reservations" stroke="#10b981" strokeWidth={3} name="Réservations" />
                  <Line yAxisId="right" type="monotone" dataKey="nouveauxUsers" stroke="#f59e0b" strokeWidth={2} name="Nouveaux utilisateurs" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>
                <Car size={20} />
                Répartition de la Flotte
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie 
                    data={chartData.carTypesData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80} 
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.carTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Graphiques Secondaires */}
          <section style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>
                <CreditCard size={20} />
                Méthodes de Paiement
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData.paymentMethodsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>
                <Activity size={20} />
                État des Véhicules
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={[
                  { name: 'Loués', value: stats.rentedCars, fill: '#ef4444' },
                  { name: 'Disponibles', value: stats.availableCars, fill: '#10b981' },
                  { name: 'Total', value: stats.totalCars, fill: '#3b82f6' }
                ]}>
                  <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>
                <Clock size={20} />
                Activité en Temps Réel
              </h3>
              <div style={{padding: '1rem 0'}}>
                <div style={{marginBottom: '1.5rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <span style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem'}}>Utilisateurs actifs</span>
                    <span style={{color: '#10b981', fontWeight: '600'}}>{stats.activeUsers}</span>
                  </div>
                  <div style={{width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px'}}>
                    <div style={{width: `${Math.min((stats.activeUsers / stats.totalUsers) * 100, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '4px'}}></div>
                  </div>
                </div>

                <div style={{marginBottom: '1.5rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <span style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem'}}>Réservations totales</span>
                    <span style={{color: '#3b82f6', fontWeight: '600'}}>{stats.totalReservations}</span>
                  </div>
                  <div style={{width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px'}}>
                    <div style={{width: '65%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)', borderRadius: '4px'}}></div>
                  </div>
                </div>

                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <span style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem'}}>Paiements en attente</span>
                    <span style={{color: '#f59e0b', fontWeight: '600'}}>{stats.pendingPayments}</span>
                  </div>
                  <div style={{width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px'}}>
                    <div style={{width: `${stats.pendingPayments > 0 ? Math.min((stats.pendingPayments / 100) * 100, 100) : 5}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #d97706)', borderRadius: '4px'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Alertes et Notifications Avancées */}
          <section style={styles.alertsSection}>
            <h3 style={styles.chartTitle}>
              <AlertTriangle size={20} />
              Centre d'Alertes et Monitoring
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem'}}>
              
              <div style={{
                padding: '1.5rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem'}}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <XCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{margin: '0', color: '#ef4444', fontSize: '1rem', fontWeight: '600'}}>Critique</h4>
                    <p style={{margin: '0', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem'}}>Nécessite une action immédiate</p>
                  </div>
                </div>
                <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                  <li style={{marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.failedPayments} paiements échoués
                  </li>
                  <li style={{marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.totalCars - stats.availableCars - stats.rentedCars} véhicules indisponibles
                  </li>
                  <li style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • Documents en attente de validation
                  </li>
                </ul>
              </div>

              <div style={{
                padding: '1.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '12px'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem'}}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{margin: '0', color: '#f59e0b', fontSize: '1rem', fontWeight: '600'}}>Attention</h4>
                    <p style={{margin: '0', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem'}}>À surveiller</p>
                  </div>
                </div>
                <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                  <li style={{marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.totalReservations - stats.deliveredReservations} réservations non livrées
                  </li>
                  <li style={{marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.pendingPayments} paiements en attente
                  </li>
                  <li style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • Taux d'utilisation: {stats.averageUtilization.toFixed(1)}%
                  </li>
                </ul>
              </div>

              <div style={{
                padding: '1.5rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem'}}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <CheckSquare size={20} />
                  </div>
                  <div>
                    <h4 style={{margin: '0', color: '#10b981', fontSize: '1rem', fontWeight: '600'}}>Succès</h4>
                    <p style={{margin: '0', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem'}}>Tout va bien</p>
                  </div>
                </div>
                <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                  <li style={{marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.deliveredReservations} réservations livrées
                  </li>
                  <li style={{marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.availableCars} véhicules disponibles
                  </li>
                  <li style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • Note moyenne: {stats.averageRating.toFixed(1)}/5
                  </li>
                </ul>
              </div>

              <div style={{
                padding: '1.5rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem'}}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <h4 style={{margin: '0', color: '#3b82f6', fontSize: '1rem', fontWeight: '600'}}>Activité</h4>
                    <p style={{margin: '0', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem'}}>Temps réel</p>
                  </div>
                </div>
                <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
                  <li style={{marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.totalUsers} utilisateurs inscrits
                  </li>
                  <li style={{marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.activeUsers} utilisateurs actifs
                  </li>
                  <li style={{color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem'}}>
                    • {stats.totalRevenue.toLocaleString()}Fcfa de revenus
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bouton de rafraîchissement */}
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <button
              onClick={() => {
                fetchStats();
                fetchDetailedData();
              }}
              style={{
                ...styles.button,
                ...(hoveredButton === 'refresh' ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('refresh')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <RefreshCw size={18} />
              Actualiser les données
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;