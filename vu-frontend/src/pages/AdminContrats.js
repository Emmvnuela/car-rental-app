import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, Edit, Trash2, FileText, Calendar, User, MapPin, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Sparkles, Star, Zap, Save, X } from 'lucide-react';

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
  input: {
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
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.6)',
    pointerEvents: 'none',
  },
  filterButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '700',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
  },
  filterButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.6)',
  },
  contractsGrid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    animation: 'slideUp 1s ease-out 0.4s both',
  },
  contractCard: {
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
  contractCardHover: {
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
  contractHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: '1',
  },
  contractId: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    color: '#60a5fa',
    padding: '0.75rem 1.25rem',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '1.1rem',
    border: '1px solid rgba(96, 165, 250, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
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
  statusValidated: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
  },
  statusCancelled: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
  },
  statusPending: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
  },
  contractInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
    position: 'relative',
    zIndex: '1',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
  },
  infoRowHover: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
    transform: 'translateX(4px)',
  },
  infoIcon: {
    color: 'rgba(96, 165, 250, 0.8)',
    flexShrink: 0,
  },
  infoLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
    fontWeight: '600',
    minWidth: '80px',
  },
  infoValue: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    flex: '1',
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
    padding: '1rem 1.5rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '700',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  editButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  editButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.6)',
  },
  deleteButton: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  deleteButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(239, 68, 68, 0.6)',
  },
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    animation: 'fadeIn 0.3s ease-out',
  },
  modal: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '3rem',
    width: '90%',
    maxWidth: '500px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    animation: 'scaleIn 0.3s ease-out',
    position: 'relative',
    overflow: 'hidden',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    color: '#1f2937',
    fontSize: '1.8rem',
    fontWeight: '800',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  formLabel: {
    color: '#374151',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  formInput: {
    padding: '1rem',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    fontSize: '1rem',
    background: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    color: '#1f2937',
  },
  formSelect: {
    padding: '1rem',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    fontSize: '1rem',
    background: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    color: '#1f2937',
    cursor: 'pointer',
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  saveButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  saveButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(16, 185, 129, 0.6)',
  },
  cancelButton: {
    background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.8) 0%, rgba(75, 85, 99, 0.8) 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(107, 114, 128, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  cancelButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(107, 114, 128, 0.6)',
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
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  .input:focus, .form-input:focus, .form-select:focus {
    outline: none !important;
    border-color: rgba(59, 130, 246, 0.6) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
  }

  .input::placeholder {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  .form-select option {
    background: white !important;
    color: #1f2937 !important;
  }

  @media (max-width: 768px) {
    .filters-grid {
      grid-template-columns: 1fr !important;
    }
    
    .contracts-grid {
      grid-template-columns: 1fr !important;
    }
    
    .header-content {
      flex-direction: column !important;
      text-align: center !important;
    }
    
    .title {
      font-size: 2rem !important;
    }
    
    .actions-section {
      flex-direction: column !important;
    }
    
    .modal {
      width: 95% !important;
      padding: 2rem !important;
    }
  }
`;


const AdminContrats = () => {
  const [contrats, setContrats] = useState([]);
  const [filteredContrats, setFilteredContrats] = useState([]);
  const [searchClient, setSearchClient] = useState('');
  const [searchStatut, setSearchStatut] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [editingContrat, setEditingContrat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    fetchContrats();
  }, []);
  const handleDownload = async (reservationId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/contrats-location/download/${reservationId}`);
    if (!response.ok) {
      throw new Error('PDF non trouvé');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contrat-location-${reservationId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Erreur téléchargement :', error);
    alert('Erreur lors du téléchargement du contrat.');
  }
};


  const fetchContrats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contrats-location');
      setContrats(res.data);
      setFilteredContrats(res.data);
    } catch (err) {
      console.error('Erreur récupération contrats :', err);
    }
  };

  const handleFilter = () => {
    let results = [...contrats];

    if (searchClient) {
      results = results.filter(c =>
        c.client_name?.toLowerCase().includes(searchClient.toLowerCase())
      );
    }

    if (searchStatut) {
      results = results.filter(c =>
        c.statut_contrat?.toLowerCase().includes(searchStatut.toLowerCase())
      );
    }

    if (searchDate) {
      results = results.filter(c =>
        c.date_debut?.startsWith(searchDate)
      );
    }

    setFilteredContrats(results);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/contrats-location/${id}`);
      fetchContrats();
    } catch (err) {
      console.error('Erreur suppression :', err);
    }
  };

  const openEditModal = (contrat) => {
    setEditingContrat({ ...contrat });
    setModalVisible(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingContrat(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/contrats-location/${editingContrat.id}`, editingContrat);
      setModalVisible(false);
      fetchContrats();
    } catch (err) {
      console.error('Erreur modification :', err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'validé':
        return <CheckCircle size={16} />;
      case 'annulé':
        return <XCircle size={16} />;
      case 'en attente':
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'validé':
        return styles.statusValidated;
      case 'annulé':
        return styles.statusCancelled;
      case 'en attente':
        return styles.statusPending;
      default:
        return styles.statusPending;
    }
  };

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        <div style={styles.floatingElements}>
          <FileText size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
          <Calendar size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
          <User size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
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
                <FileText size={40} color="white" />
              </div>
              <div style={styles.headerText}>
                <h1 style={styles.title} className="title">Contrats de Location</h1>
                <p style={styles.subtitle}>
                  <Clock size={20} />
                  {filteredContrats.length} contrat{filteredContrats.length > 1 ? 's' : ''} trouvé{filteredContrats.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div style={styles.filtersCard}>
            <h3 style={styles.filtersTitle}>
              <Filter size={24} />
              Filtres de recherche
            </h3>
            
            <div style={styles.filtersGrid} className="filters-grid">
              <div style={styles.inputGroup}>
                <User size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Rechercher par client..."
                  value={searchClient}
                  onChange={(e) => setSearchClient(e.target.value)}
                  style={styles.input}
                  className="input"
                />
              </div>

              <div style={styles.inputGroup}>
                <CheckCircle size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Filtrer par statut..."
                  value={searchStatut}
                  onChange={(e) => setSearchStatut(e.target.value)}
                  style={styles.input}
                  className="input"
                />
              </div>

              <div style={styles.inputGroup}>
                <Calendar size={20} style={styles.inputIcon} />
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  style={styles.input}
                  className="input"
                />
              </div>

              <button 
                onClick={handleFilter}
                style={{
                  ...styles.filterButton,
                  ...(hoveredButton === 'filter' ? styles.filterButtonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('filter')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Search size={20} />
                Filtrer
              </button>
            </div>
          </div>

          {/* Contracts Grid */}
          {filteredContrats.length > 0 ? (
            <div style={styles.contractsGrid} className="contracts-grid">
              {filteredContrats.map(contrat => (
                <div 
                  key={contrat.id}
                  style={{
                    ...styles.contractCard,
                    ...(hoveredCard === contrat.id ? styles.contractCardHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(contrat.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    style={{
                      ...styles.cardGlow,
                      ...(hoveredCard === contrat.id ? styles.cardGlowActive : {})
                    }}
                  ></div>
                  
                  <div style={styles.contractHeader}>
                    <div style={styles.contractId}>
                      <FileText size={18} />
                      Contrat #{contrat.id}
                    </div>
                    <span style={{
                      ...styles.statusBadge,
                      ...getStatusStyle(contrat.statut_contrat)
                    }}>
                      {getStatusIcon(contrat.statut_contrat)}
                      {contrat.statut_contrat}
                    </span>
                  </div>

                  <div style={styles.contractInfo}>
                    <div 
                      style={{
                        ...styles.infoRow,
                        ...(hoveredRow === `client-${contrat.id}` ? styles.infoRowHover : {})
                      }}
                      onMouseEnter={() => setHoveredRow(`client-${contrat.id}`)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <User size={18} style={styles.infoIcon} />
                      <span style={styles.infoLabel}>Client:</span>
                      <span style={styles.infoValue}>{contrat.client_name || 'N/A'}</span>
                    </div>

                    <div 
                      style={{
                        ...styles.infoRow,
                        ...(hoveredRow === `dates-${contrat.id}` ? styles.infoRowHover : {})
                      }}
                      onMouseEnter={() => setHoveredRow(`dates-${contrat.id}`)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <Calendar size={18} style={styles.infoIcon} />
                      <span style={styles.infoLabel}>Période:</span>
                      <span style={styles.infoValue}>
                        {contrat.date_debut} → {contrat.date_fin}
                      </span>
                    </div>

                    <div 
                      style={{
                        ...styles.infoRow,
                        ...(hoveredRow === `amount-${contrat.id}` ? styles.infoRowHover : {})
                      }}
                      onMouseEnter={() => setHoveredRow(`amount-${contrat.id}`)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <DollarSign size={18} style={styles.infoIcon} />
                      <span style={styles.infoLabel}>Montant:</span>
                      <span style={{
                        ...styles.infoValue,
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                        color: '#34d399',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        fontWeight: '700',
                        border: '1px solid rgba(52, 211, 153, 0.3)',
                      }}>
                        {contrat.montant_total} FCFA
                      </span>
                    </div>

                    {contrat.lieu_retrait && (
                      <div 
                        style={{
                          ...styles.infoRow,
                          ...(hoveredRow === `pickup-${contrat.id}` ? styles.infoRowHover : {})
                        }}
                        onMouseEnter={() => setHoveredRow(`pickup-${contrat.id}`)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <MapPin size={18} style={styles.infoIcon} />
                        <span style={styles.infoLabel}>Retrait:</span>
                        <span style={styles.infoValue}>{contrat.lieu_retrait}</span>
                      </div>
                    )}

                    {contrat.lieu_retour && (
                      <div 
                        style={{
                          ...styles.infoRow,
                          ...(hoveredRow === `return-${contrat.id}` ? styles.infoRowHover : {})
                        }}
                        onMouseEnter={() => setHoveredRow(`return-${contrat.id}`)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <MapPin size={18} style={styles.infoIcon} />
                        <span style={styles.infoLabel}>Retour:</span>
                        <span style={styles.infoValue}>{contrat.lieu_retour}</span>
                      </div>
                    )}
                  </div>

                  <div style={styles.actionsSection} className="actions-section">
                    <button
                      onClick={() => openEditModal(contrat)}
                      style={{
                        ...styles.actionButton,
                        ...styles.editButton,
                        ...(hoveredButton === `edit-${contrat.id}` ? styles.editButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredButton(`edit-${contrat.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <Edit size={18} />
                      Modifier
                    </button>
                    
                    <button
                      onClick={() => handleDelete(contrat.id)}
                      style={{
                        ...styles.actionButton,
                        ...styles.deleteButton,
                        ...(hoveredButton === `delete-${contrat.id}` ? styles.deleteButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredButton(`delete-${contrat.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <Trash2 size={18} />
                      Supprimer
                    </button>
                    <button
  onClick={() => handleDownload(contrat.reservation_id)}
  className="btn btn-secondary"
>
  Télécharger PDF
</button>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyCard}>
                <div style={styles.emptyIcon}>
                  <FileText size={60} color="rgba(255, 255, 255, 0.6)" />
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '700',
                  margin: '0 0 1rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  Aucun contrat trouvé 📄
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.2rem',
                  margin: '0',
                  lineHeight: '1.6'
                }}>
                  {searchClient || searchStatut || searchDate 
                    ? "Aucun contrat ne correspond à vos critères de recherche."
                    : "Aucun contrat de location n'a encore été créé."
                  }
                </p>
                {(searchClient || searchStatut || searchDate) && (
                  <button
                    onClick={() => {
                      setSearchClient('');
                      setSearchStatut('');
                      setSearchDate('');
                      setFilteredContrats(contrats);
                    }}
                    style={{
                      ...styles.actionButton,
                      ...styles.editButton,
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

          {/* Modal d'édition */}
          {modalVisible && editingContrat && (
            <div style={styles.modalOverlay} onClick={() => setModalVisible(false)}>
              <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                  <h3 style={styles.modalTitle}>
                    <Edit size={24} />
                    Modifier Contrat #{editingContrat.id}
                  </h3>
                  <button
                    onClick={() => setModalVisible(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div style={styles.modalForm}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <MapPin size={18} />
                      Lieu de retrait :
                    </label>
                    <input 
                      type="text" 
                      name="lieu_retrait" 
                      value={editingContrat.lieu_retrait || ''} 
                      onChange={handleEditChange}
                      style={styles.formInput}
                      className="form-input"
                      placeholder="Entrez le lieu de retrait..."
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <MapPin size={18} />
                      Lieu de retour :
                    </label>
                    <input 
                      type="text" 
                      name="lieu_retour" 
                      value={editingContrat.lieu_retour || ''} 
                      onChange={handleEditChange}
                      style={styles.formInput}
                      className="form-input"
                      placeholder="Entrez le lieu de retour..."
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <CheckCircle size={18} />
                      Statut du contrat :
                    </label>
                    <select 
                      name="statut_contrat" 
                      value={editingContrat.statut_contrat || ''} 
                      onChange={handleEditChange}
                      style={styles.formSelect}
                      className="form-select"
                    >
                      <option value="validé">✅ Validé</option>
                      <option value="annulé">❌ Annulé</option>
                      <option value="en attente">⏳ En attente</option>
                    </select>
                  </div>
                </div>

                <div style={styles.modalActions}>
                  <button 
                    onClick={handleSaveEdit}
                    style={{
                      ...styles.actionButton,
                      ...styles.saveButton,
                      ...(hoveredButton === 'save' ? styles.saveButtonHover : {})
                    }}
                    onMouseEnter={() => setHoveredButton('save')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <Save size={20} />
                    Enregistrer
                  </button>
                  <button 
                    onClick={() => setModalVisible(false)}
                    style={{
                      ...styles.actionButton,
                      ...styles.cancelButton,
                      ...(hoveredButton === 'cancel' ? styles.cancelButtonHover : {})
                    }}
                    onMouseEnter={() => setHoveredButton('cancel')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <X size={20} />
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminContrats;