// src/pages/AdminDocuments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Check, X, Eye, FileText, User, Clock, Shield, Sparkles, Zap, Star } from "lucide-react";

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
    minHeight: '60vh',
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
  documentsGrid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    animation: 'slideUp 1s ease-out 0.3s both',
  },
  documentCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  documentCardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  cardGlow: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  cardGlowActive: {
    opacity: '1',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    position: 'relative',
    zIndex: '1',
  },
  userAvatar: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    color: 'white',
    fontSize: '1.5rem',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
    animation: 'pulse 3s infinite',
  },
  userName: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 0.25rem',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  userId: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1rem',
    margin: '0',
  },
  documentsSection: {
    position: 'relative',
    zIndex: '1',
  },
  sectionTitle: {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: '0 0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  documentLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  documentLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    textDecoration: 'none',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
    color: '#60a5fa',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(96, 165, 250, 0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
  },
  documentLinkHover: {
    transform: 'translateX(8px) scale(1.02)',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)',
  },
  documentMissing: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    color: 'rgba(255, 255, 255, 0.5)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    fontSize: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  actionsSection: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    position: 'relative',
    zIndex: '1',
  },
  actionButton: {
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
  },
  validateButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  validateButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(16, 185, 129, 0.6)',
  },
  rejectButton: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  rejectButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(239, 68, 68, 0.6)',
  },
  buttonGlow: {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s',
  },
  buttonGlowActive: {
    left: '100%',
  },
  sparkleContainer: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
    fontSize: '2rem',
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

  @media (max-width: 768px) {
    .documents-grid {
      grid-template-columns: 1fr !important;
    }
    
    .actions-section {
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

function AdminDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const token = localStorage.getItem('token');

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin-documents/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(res.data);
    } catch (err) {
      console.error('Erreur récupération docs:', err);
      alert("Impossible de récupérer les documents.");
    } finally {
      setLoading(false);
    }
  };

  const handleValidation = async (docId, isVerified) => {
    const reason = !isVerified ? prompt("Raison du refus ?") : null;

    try {
      await axios.post(`http://localhost:5000/api/admin-documents/validate/${docId}`, {
        is_verified: isVerified,
        rejection_reason: reason,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchDocuments();
    } catch (err) {
      console.error("Erreur validation:", err);
      alert("Erreur lors de la validation.");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          
          <div style={styles.floatingElements}>
            <FileText size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
            <Shield size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
            <User size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
            <Sparkles size={45} style={{...styles.floatingIcon, bottom: '30%', right: '10%', animationDelay: '1s'}} />
          </div>

          <div style={styles.sparkleContainer}>
            <FileText size={32} />
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
                    Récupération des documents en attente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (documents.length === 0) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          
          <div style={styles.floatingElements}>
            <FileText size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
            <Shield size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
            <User size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
            <Check size={45} style={{...styles.floatingIcon, bottom: '30%', right: '10%', animationDelay: '1s'}} />
          </div>

          <div style={styles.sparkleContainer}>
            <Sparkles size={32} />
          </div>

          <div style={styles.mainContent}>
            <div style={styles.header}>
              <div style={styles.headerGlow}></div>
              <div style={styles.headerContent} className="header-content">
                <div style={styles.headerIcon}>
                  <FileText size={40} color="white" />
                </div>
                <div style={styles.headerText}>
                  <h1 style={styles.title} className="title">Validation des documents</h1>
                  <p style={styles.subtitle}>
                    <Clock size={20} />
                    Espace d'administration pour la validation des documents conducteurs
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.emptyState}>
              <div style={styles.emptyCard}>
                <div style={styles.emptyIcon}>
                  <Check size={60} color="rgba(255, 255, 255, 0.6)" />
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '700',
                  margin: '0 0 1rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  Tous les documents sont validés ! ✨
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.2rem',
                  margin: '0',
                  lineHeight: '1.6'
                }}>
                  Aucun document n'est en attente de validation. 
                  <br />
                  Excellent travail ! 🎉
                </p>
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
          <FileText size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
          <Shield size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
          <User size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
          <Zap size={45} style={{...styles.floatingIcon, bottom: '30%', right: '10%', animationDelay: '1s'}} />
        </div>

        <div style={styles.sparkleContainer}>
          <Star size={32} />
        </div>

        <div style={styles.mainContent}>
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <div style={styles.headerContent} className="header-content">
              <div style={styles.headerIcon}>
                <FileText size={40} color="white" />
              </div>
              <div style={styles.headerText}>
                <h1 style={styles.title} className="title">Validation des documents</h1>
                <p style={styles.subtitle}>
                  <Clock size={20} />
                  {documents.length} document{documents.length > 1 ? 's' : ''} en attente de validation
                </p>
              </div>
            </div>
          </div>

          <div style={styles.documentsGrid} className="documents-grid">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                style={{
                  ...styles.documentCard,
                  ...(hoveredCard === doc.id ? styles.documentCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(doc.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  style={{
                    ...styles.cardGlow,
                    ...(hoveredCard === doc.id ? styles.cardGlowActive : {})
                  }}
                ></div>
                
                <div style={styles.userInfo}>
                  <div style={styles.userAvatar}>
                    {doc.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 style={styles.userName}>{doc.name}</h3>
                    <p style={styles.userId}>ID: {doc.id}</p>
                  </div>
                </div>

                <div style={styles.documentsSection}>
                  <h4 style={styles.sectionTitle}>
                    <FileText size={20} />
                    Documents disponibles
                  </h4>
                  
                  <div style={styles.documentLinks}>
                    {/* Permis de conduire */}
                    {doc.driving_license ? (
                      <a
                        href={`http://localhost:5000/${doc.driving_license}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          ...styles.documentLink,
                          ...(hoveredLink === `license-${doc.id}` ? styles.documentLinkHover : {})
                        }}
                        onMouseEnter={() => setHoveredLink(`license-${doc.id}`)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        <Eye size={20} />
                        Permis de conduire
                      </a>
                    ) : (
                      <div style={styles.documentMissing}>
                        <X size={20} />
                        Aucun permis disponible
                      </div>
                    )}

                    {/* Carte nationale */}
                    {doc.national_id ? (
                      <a
                        href={`http://localhost:5000/${doc.national_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          ...styles.documentLink,
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                          color: '#34d399',
                          borderColor: 'rgba(52, 211, 153, 0.3)',
                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                          ...(hoveredLink === `id-${doc.id}` ? {
                            ...styles.documentLinkHover,
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.2) 100%)',
                            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                          } : {})
                        }}
                        onMouseEnter={() => setHoveredLink(`id-${doc.id}`)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        <Eye size={20} />
                        Carte nationale d'identité
                      </a>
                    ) : (
                      <div style={styles.documentMissing}>
                        <X size={20} />
                        Aucune CNI disponible
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.actionsSection} className="actions-section">
                  <button
                    onClick={() => handleValidation(doc.id, true)}
                    style={{
                      ...styles.actionButton,
                      ...styles.validateButton,
                      ...(hoveredButton === `validate-${doc.id}` ? styles.validateButtonHover : {})
                    }}
                    onMouseEnter={() => setHoveredButton(`validate-${doc.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <div 
                      style={{
                        ...styles.buttonGlow,
                        ...(hoveredButton === `validate-${doc.id}` ? styles.buttonGlowActive : {})
                      }}
                    ></div>
                    <Check size={20} />
                    Valider
                  </button>
                  
                  <button
                    onClick={() => handleValidation(doc.id, false)}
                    style={{
                      ...styles.actionButton,
                      ...styles.rejectButton,
                      ...(hoveredButton === `reject-${doc.id}` ? styles.rejectButtonHover : {})
                    }}
                    onMouseEnter={() => setHoveredButton(`reject-${doc.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <div 
                      style={{
                        ...styles.buttonGlow,
                        ...(hoveredButton === `reject-${doc.id}` ? styles.buttonGlowActive : {})
                      }}
                    ></div>
                    <X size={20} />
                    Rejeter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDocuments;