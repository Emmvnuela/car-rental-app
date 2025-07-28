import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Calendar,
  CreditCard,
  History,
  Car,
  Paperclip,
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
  Settings,
  Eye,
  CheckCircle,
  XCircle,
  Sparkles,
  FileText
} from 'lucide-react';

import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, Legend
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
    maxWidth: '1400px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
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
  statTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  },
  statCount: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'white',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    margin: '0',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
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
  alertsList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  alertItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '1rem',
    transition: 'all 0.3s ease',
  },
  alertItemHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(4px)',
  },
  alertIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIconWarning: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
  },
  alertIconSuccess: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
  },
  alertIconDanger: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
  },
  alertText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    fontWeight: '500',
    flex: 1,
  },
  alertCount: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '600',
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
};

// Animations CSS
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
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [latePayments, setLatePayments] = useState([]);
  const [undeliveredReservations, setUndeliveredReservations] = useState([]);
  const [cars, setCars] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredAlert, setHoveredAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!currentUser || currentUser.role !== 'admin') {
      alert("Accès refusé !");
      navigate('/');
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: { Authorization: `Bearer ${token}` }
      });

      try {
        const [usersRes, reservationsRes, paymentsRes, carsRes] = await Promise.all([
          axiosInstance.get('/users'),
          axiosInstance.get('/reservations'),
          axiosInstance.get('/payments'),
          axiosInstance.get('/cars')
        ]);

        setUsers(usersRes.data);
        setReservations(reservationsRes.data);
        setUndeliveredReservations(reservationsRes.data.filter(r => !r.delivered));

        setPayments(paymentsRes.data);
        setLatePayments(paymentsRes.data.filter(p => p.status === 'late'));

        const carsData = Array.isArray(carsRes.data)
          ? carsRes.data
          : Array.isArray(carsRes.data.cars)
          ? carsRes.data.cars
          : [];

        setCars(carsData);
      } catch (err) {
        console.error('Erreur chargement données :', err);
        alert("Erreur chargement. Réessaye.");
      }
    };

    fetchData();
  }, [navigate]);

  const paymentsByMonth = payments.reduce((acc, p) => {
    const month = new Date(p.date).toLocaleString('fr-FR', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + (p.details?.amount || 0);
    return acc;
  }, {});

  const chartData = Object.entries(paymentsByMonth).map(([month, total]) => ({ month, total }));

  const deliveredStats = [
    { name: 'Livrées', value: reservations.filter(r => r.delivered).length },
    { name: 'Non livrées', value: reservations.filter(r => !r.delivered).length },
  ];

  const COLORS = ['#10b981', '#ef4444'];

  const StatCard = ({ icon, title, count, iconStyle, index }) => (
    <div
      style={{
        ...styles.statCard,
        ...(hoveredCard === index ? styles.statCardHover : {})
      }}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div style={styles.statCardGlow}></div>
      <div style={{ ...styles.statIcon, ...iconStyle }}>
        {icon}
      </div>
      <div style={styles.statTitle}>{title}</div>
      <div style={styles.statCount}>{count}</div>
    </div>
  );

  const AlertItem = ({ icon, text, count, iconStyle, index }) => (
    <li
      style={{
        ...styles.alertItem,
        ...(hoveredAlert === index ? styles.alertItemHover : {})
      }}
      onMouseEnter={() => setHoveredAlert(index)}
      onMouseLeave={() => setHoveredAlert(null)}
    >
      <div style={{ ...styles.alertIcon, ...iconStyle }}>
        {icon}
      </div>
      <span style={styles.alertText}>{text}</span>
      <span style={styles.alertCount}>{count}</span>
    </li>
  );

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
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
              Gérez votre plateforme de location en temps réel
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

          {/* Cartes Statistiques */}
          <section style={styles.statsGrid}>
            <StatCard 
              icon={<User size={32} />} 
              title="Utilisateurs" 
              count={users.length} 
              iconStyle={styles.statIconPrimary}
              index={0}
            />
            <StatCard 
              icon={<Calendar size={32} />} 
              title="Réservations" 
              count={reservations.length} 
              iconStyle={styles.statIconSuccess}
              index={1}
            />
            <StatCard 
              icon={<CreditCard size={32} />} 
              title="Paiements" 
              count={payments.length} 
              iconStyle={styles.statIconWarning}
              index={2}
            />
          </section>

          {/* Graphiques */}
          <section style={styles.chartsGrid}>
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>
                <TrendingUp size={20} />
                Évolution des paiements
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div style={styles.chartCard}>
              <h3 style={styles.chartTitle}>
                <Activity size={20} />
                Répartition des réservations
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={deliveredStats} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80} 
                    label
                  >
                    {deliveredStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

          {/* Alertes */}
          <section style={styles.alertsSection}>
            <h3 style={styles.chartTitle}>
              <AlertTriangle size={20} />
              Alertes et notifications
            </h3>
            <ul style={styles.alertsList}>
              <AlertItem
                icon={<XCircle size={20} />}
                text="Paiements en retard"
                count={latePayments.length}
                iconStyle={styles.alertIconDanger}
                index={0}
              />
              <AlertItem
                icon={<Car size={20} />}
                text="Réservations non livrées"
                count={undeliveredReservations.length}
                iconStyle={styles.alertIconWarning}
                index={1}
              />
              <AlertItem
                icon={<CheckCircle size={20} />}
                text="Véhicules disponibles"
                count={cars.filter(c => c.status === 'disponible').length}
                iconStyle={styles.alertIconSuccess}
                index={2}
              />
              <AlertItem
                icon={<Eye size={20} />}
                text="Véhicules loués"
                count={cars.filter(c => c.status === 'loué').length}
                iconStyle={styles.alertIconWarning}
                index={3}
              />
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;