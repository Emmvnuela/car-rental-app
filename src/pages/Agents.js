import React, { useEffect, useState, useCallback } from 'react';
import axios from '../api/axiosInstance';
import { AgentForm, AgentCards } from '../pages/AgentForm';
import {
  Users, UserPlus, Shield, Settings, Sparkles, 
  Eye, Package, Loader, AlertTriangle
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
  pageSubtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
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
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    },
  },
  formSection: {
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
    height: 'fit-content',
  },
  agentsSection: {
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
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
  },
  badge: {
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%)',
    color: '#3b82f6',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
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
  emptyState: {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  emptyStateIcon: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: '1rem',
  },
  emptyStateTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '0.5rem',
  },
  emptyStateText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
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

function Agents() {
  const [agents, setAgents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [agentsResponse, usersResponse] = await Promise.all([
        axios.get('/agents'),
        axios.get('/users')
      ]);
      
      setAgents(agentsResponse.data);
      setUsers(usersResponse.data);
    } catch (err) {
      console.error('Erreur chargement données:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getStats = () => {
    const totalAgents = agents.length;
    const totalUsers = users.length;
    const activeAgents = agents.filter(agent => agent.status === 'active').length;
    
    return { totalAgents, totalUsers, activeAgents };
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
              Chargement des agents...
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
            <div style={styles.emptyState}>
              <AlertTriangle size={60} style={styles.emptyStateIcon} />
              <h3 style={styles.emptyStateTitle}>Erreur de chargement</h3>
              <p style={styles.emptyStateText}>{error}</p>
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
          <Users size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Shield size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Settings size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Package size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={24} style={styles.sparkleIcon} />
            
            <div style={styles.titleSection}>
              <div>
                <h1 style={styles.pageTitle}>
                  <Users size={32} />
                  Gestion des Agents
                </h1>
                <p style={styles.pageSubtitle}>
                  <Shield size={18} />
                  Administration et gestion des utilisateurs
                </p>
              </div>
            </div>

            <div style={styles.statsSection}>
              <div style={{...styles.statCard, borderColor: 'rgba(59, 130, 246, 0.3)'}}>
                <div style={styles.statNumber}>{stats.totalUsers}</div>
                <div style={styles.statLabel}>Utilisateurs</div>
              </div>
              <div style={{...styles.statCard, borderColor: 'rgba(16, 185, 129, 0.3)'}}>
                <div style={styles.statNumber}>{stats.totalAgents}</div>
                <div style={styles.statLabel}>Agents</div>
              </div>
              <div style={{...styles.statCard, borderColor: 'rgba(251, 191, 36, 0.3)'}}>
                <div style={styles.statNumber}>{stats.activeAgents}</div>
                <div style={styles.statLabel}>Actifs</div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div style={styles.mainGrid}>
            {/* Section Formulaire */}
            <div style={styles.formSection}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  <UserPlus size={28} />
                  Ajouter un Agent
                </h2>
                <div style={styles.badge}>
                  <Shield size={14} />
                  Nouveau
                </div>
              </div>
              
              {/* Wrapper pour le formulaire avec styles personnalisés */}
              <div style={{
                '& .agent-form': {
                  background: 'transparent',
                  padding: '0',
                  border: 'none',
                  borderRadius: '0',
                },
                '& .form-group': {
                  marginBottom: '1.5rem',
                },
                '& label': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'block',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                },
                '& input, & select': {
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem',
                  fontSize: '1rem',
                  color: 'white',
                  width: '100%',
                  transition: 'all 0.3s ease',
                },
                '& input:focus, & select:focus': {
                  background: 'rgba(255, 255, 255, 0.12)',
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                  outline: 'none',
                },
                '& button': {
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                },
                '& button:hover': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                }
              }}>
                <AgentForm onSuccess={fetchData} />
              </div>
            </div>

            {/* Section Liste des Agents */}
            <div style={styles.agentsSection}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  <Eye size={28} />
                  Liste des Agents
                </h2>
                <div style={styles.badge}>
                  <Users size={14} />
                  {stats.totalAgents}
                </div>
              </div>

              {agents.length === 0 ? (
                <div style={styles.emptyState}>
                  <Users size={50} style={styles.emptyStateIcon} />
                  <h3 style={styles.emptyStateTitle}>Aucun agent</h3>
                  <p style={styles.emptyStateText}>
                    Commencez par ajouter votre premier agent avec le formulaire ci-contre.
                  </p>
                </div>
              ) : (
                <div style={{
                  '& .agent-card': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '1rem',
                    transition: 'all 0.3s ease',
                  },
                  '& .agent-card:hover': {
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
                  },
                  '& .agent-name': {
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                  },
                  '& .agent-email': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                  },
                  '& .agent-role': {
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.85rem',
                  },
                  '& .agent-status': {
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  },
                  '& .status-active': {
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  },
                  '& .status-inactive': {
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  }
                }}>
                  <AgentCards agents={agents} users={users} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Agents;