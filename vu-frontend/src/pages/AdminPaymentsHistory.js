import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { Save, Download, Search, Filter, CreditCard, User, Clock, TrendingUp, DollarSign, FileText, Sparkles, Star, Zap } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  excelButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  pdfButton: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)',
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
    minWidth: '800px',
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
  statusPaid: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
  },
  statusPartial: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
  },
  pagination: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    animation: 'slideUp 1s ease-out 0.6s both',
  },
  paginationButton: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  paginationButtonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
  paginationInfo: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
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

  .input:focus, .select:focus {
    outline: none !important;
    border-color: rgba(59, 130, 246, 0.6) !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
  }

  .input::placeholder {
    color: rgba(255, 255, 255, 0.5) !important;
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
    
    .pagination {
      flex-direction: column !important;
      gap: 1rem !important;
    }
  }
`;

function AdminPaymentsHistory() {
  const [payments, setPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('/payments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPayments(res.data);
      } catch (err) {
        console.error('Erreur chargement paiements:', err);
        toast.error('Impossible de charger les paiements');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((p) => {
    const matchStatus = statusFilter ? p.status.toLowerCase().includes(statusFilter.toLowerCase()) : true;
    const matchName = p.user_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchName;
  });

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPayments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Paiements');
    XLSX.writeFile(wb, 'historique_paiements.xlsx');
    toast.success('Export Excel généré avec succès !');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Client', 'Email', 'Voiture', 'Montant', 'Méthode', 'Référence', 'Date', 'Statut'];
    const tableRows = filteredPayments.map((p) => [
      p.user_name,
      p.user_email,
      p.car_brand,
      `${p.amount} FCFA`,
      p.method,
      p.reference,
      p.created_at.slice(0, 10),
      p.status,
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save('historique_paiements.pdf');
    toast.success('Export PDF généré avec succès !');
  };

  if (loading) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          
          <div style={styles.floatingElements}>
            <CreditCard size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
            <DollarSign size={40} style={{...styles.floatingIcon, top: '25%', right: '15%', animationDelay: '2s'}} />
            <TrendingUp size={50} style={{...styles.floatingIcon, bottom: '20%', left: '15%', animationDelay: '4s'}} />
            <Sparkles size={45} style={{...styles.floatingIcon, bottom: '30%', right: '10%', animationDelay: '1s'}} />
          </div>

          <div style={styles.sparkleContainer}>
            <CreditCard size={32} />
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
                    Récupération de l'historique des paiements
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
          <CreditCard size={60} style={{...styles.floatingIcon, top: '15%', left: '10%', animationDelay: '0s'}} />
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
                <CreditCard size={40} color="white" />
              </div>
              <div style={styles.headerText}>
                <h1 style={styles.title} className="title">Historique des paiements</h1>
                <p style={styles.subtitle}>
                  <Clock size={20} />
                  {filteredPayments.length} paiement{filteredPayments.length > 1 ? 's' : ''} trouvé{filteredPayments.length > 1 ? 's' : ''}
                </p>
              </div>
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
                <Search size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.input}
                  className="input"
                />
              </div>

              <div style={styles.inputGroup}>
                <Filter size={20} style={styles.inputIcon} />
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)} 
                  style={styles.select}
                  className="select"
                >
                  <option value="">Tous les statuts</option>
                  <option value="Soldé">Soldé</option>
                  <option value="Payé partiellement">Payé partiellement</option>
                </select>
              </div>
            </div>

            <div style={styles.exportButtons} className="export-buttons">
              <button 
                onClick={exportToExcel} 
                style={{
                  ...styles.exportButton,
                  ...styles.excelButton,
                  ...(hoveredButton === 'excel' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('excel')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Download size={20} />
                Exporter Excel
              </button>

              <button 
                onClick={exportToPDF} 
                style={{
                  ...styles.exportButton,
                  ...styles.pdfButton,
                  ...(hoveredButton === 'pdf' ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setHoveredButton('pdf')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Save size={20} />
                Exporter PDF
              </button>
            </div>
          </div>

          {/* Table */}
          {paginatedPayments.length > 0 ? (
            <>
              <div style={styles.tableCard}>
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <User size={16} />
                            Client
                          </div>
                        </th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Voiture</th>
                        <th style={styles.th}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <DollarSign size={16} />
                            Montant
                          </div>
                        </th>
                        <th style={styles.th}>Méthode</th>
                        <th style={styles.th}>Référence</th>
                        <th style={styles.th}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                            <Clock size={16} />
                            Date
                          </div>
                        </th>
                        <th style={styles.th}>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPayments.map((p) => (
                        <tr 
                          key={p.payment_id}
                          style={{
                            ...styles.tableRow,
                            ...(hoveredRow === p.payment_id ? styles.tableRowHover : {})
                          }}
                          onMouseEnter={() => setHoveredRow(p.payment_id)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <td style={styles.td}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                              }}>
                                {p.user_name?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <span style={{fontWeight: '600'}}>{p.user_name}</span>
                            </div>
                          </td>
                          <td style={styles.td}>{p.user_email}</td>
                          <td style={styles.td}>
                            <div style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              display: 'inline-block',
                              fontWeight: '600',
                            }}>
                              {p.car_brand}
                            </div>
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
                              {p.amount} FCFA
                            </span>
                          </td>
                          <td style={styles.td}>
                            <div style={{
                              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                              color: '#60a5fa',
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              fontWeight: '600',
                              fontSize: '0.85rem',
                              border: '1px solid rgba(96, 165, 250, 0.3)',
                              display: 'inline-block',
                            }}>
                              {p.method}
                            </div>
                          </td>
                          <td style={styles.td}>
                            <code style={{
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              color: 'rgba(255, 255, 255, 0.8)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              fontFamily: 'Monaco, Consolas, monospace',
                            }}>
                              {p.reference}
                            </code>
                          </td>
                          <td style={styles.td}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontWeight: '500',
                            }}>
                              <Clock size={14} />
                              {p.created_at.slice(0, 10)}
                            </div>
                          </td>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.statusBadge,
                              ...(p.status === 'Soldé' ? styles.statusPaid : styles.statusPartial)
                            }}>
                              {p.status === 'Soldé' ? (
                                <>
                                  <div style={{
                                    width: '8px',
                                    height: '8px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    animation: 'pulse 2s infinite'
                                  }}></div>
                                  Soldé
                                </>
                              ) : (
                                <>
                                  <div style={{
                                    width: '8px',
                                    height: '8px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    animation: 'pulse 2s infinite'
                                  }}></div>
                                  Partiel
                                </>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div style={styles.pagination} className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  style={{
                    ...styles.paginationButton,
                    ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
                  }}
                >
                  ← Précédent
                </button>
                
                <div style={styles.paginationInfo}>
                  <FileText size={16} />
                  Page {currentPage} sur {totalPages}
                </div>
                
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  style={{
                    ...styles.paginationButton,
                    ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
                  }}
                >
                  Suivant →
                </button>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyCard}>
                <div style={styles.emptyIcon}>
                  <CreditCard size={60} color="rgba(255, 255, 255, 0.6)" />
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '700',
                  margin: '0 0 1rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  Aucun paiement trouvé 🔍
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.2rem',
                  margin: '0',
                  lineHeight: '1.6'
                }}>
                  {searchTerm || statusFilter 
                    ? "Aucun paiement ne correspond à vos critères de recherche."
                    : "Aucun paiement n'a encore été enregistré dans le système."
                  }
                </p>
                {(searchTerm || statusFilter) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('');
                      setCurrentPage(1);
                    }}
                    style={{
                      ...styles.exportButton,
                      ...styles.excelButton,
                      marginTop: '2rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
                    }}
                  >
                    <Search size={20} />
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPaymentsHistory;