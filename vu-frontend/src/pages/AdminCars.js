// AdminCars.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Car, 
  Calendar, 
  Search, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Filter, 
  ArrowLeft, 
  ArrowRight, 
  Zap, 
  Star,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  DollarSign,
  Image,
  Settings,
  Shield
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    maxWidth: '1600px',
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
  adminBadge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    animation: 'pulse 2s infinite',
  },
  actionBar: {
    marginBottom: '3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  addButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
  },
  addButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)',
  },
  statsContainer: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  statItem: {
    textAlign: 'center',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#1e293b',
    margin: '0',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
    margin: '0.25rem 0 0 0',
  },
  filtersSection: {
    marginBottom: '3rem',
    padding: '2.5rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
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
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    border: '2px solid rgba(203, 213, 224, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  inputWrapperFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    transform: 'translateY(-2px)',
  },
  inputIcon: {
    color: '#667eea',
    flexShrink: 0,
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#1e293b',
    width: '100%',
  },
  carsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  carCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
    borderRadius: '24px',
    padding: '0',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    animation: 'slideUp 0.8s ease-out',
  },
  carCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
  carImageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '24px 24px 0 0',
    height: '200px',
  },
  carImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  availableBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  unavailableBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    borderRadius: '50px',
    fontSize: '0.875rem',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  carContent: {
    padding: '2rem',
  },
  carTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  carDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  carDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontWeight: '500',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    padding: '1rem',
    background: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#059669',
  },
  priceLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
  },
  actionsContainer: {
    display: 'flex',
    gap: '0.75rem',
  },
  actionButton: {
    flex: 1,
    padding: '0.875rem 1rem',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  viewButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  editButton: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
  },
  deleteButton: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
  },
  actionButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    animation: 'fadeIn 0.3s ease-out',
  },
  modalContent: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '2.5rem',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    animation: 'slideIn 0.4s ease-out',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid rgba(203, 213, 224, 0.3)',
  },
  modalTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#1e293b',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  closeButtonHover: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  formInput: {
    padding: '1rem 1.25rem',
    border: '2px solid rgba(203, 213, 224, 0.3)',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#1e293b',
    background: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  formInputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  textArea: {
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    paddingTop: '2rem',
    borderTop: '2px solid rgba(203, 213, 224, 0.3)',
  },
  saveButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  },
  cancelButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
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
    fontSize: '4rem',
    marginBottom: '1.5rem',
    opacity: '0.6',
    animation: 'bounce 2s infinite',
    color: '#64748b',
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
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '3rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  paginationButton: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
    minWidth: '150px',
    justifyContent: 'center',
  },
  paginationButtonDisabled: {
    background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '0 4px 12px rgba(148, 163, 184, 0.2)',
  },
  pageInfo: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    padding: '1rem 2rem',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
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
    50% { opacity: 0.7; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-50px) scale(0.9); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price_per_day: '',
    image_url: '',
    available: true,
    description: ''
  });
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    available: '',
    sort: 'created_at',
    order: 'desc',
    page: 1,
    limit: 6,
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    unavailable: 0
  });

  useEffect(() => {
    fetchCars();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/cars/cars', { params: filters });
      setCars(response.data.cars);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Erreur lors du chargement des voitures:', error);
    } finally {
      setLoading(false);
    }
  };

const fetchStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/cars/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Mise à jour des stats en utilisant les vraies données de disponibilité
    setStats({
      total: response.data.total,
      available: response.data.disponibles,  // ← Assure-toi que le backend retourne bien "disponibles"
      unavailable: response.data.indisponibles // ← et "indisponibles"
    });
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error);
  }
};


  const handleAddCar = () => {
    setModalMode('add');
    setFormData({
      brand: '',
      model: '',
      year: '',
      price_per_day: '',
      image_url: '',
      available: true,
      description: ''
    });
    setShowModal(true);
  };

  const handleEditCar = (car) => {
    setModalMode('edit');
    setSelectedCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price_per_day: car.price_per_day,
      image_url: car.image_url,
      available: car.available,
      description: car.description || ''
    });
    setShowModal(true);
  };

  const handleViewCar = (car) => {
    setModalMode('view');
    setSelectedCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price_per_day: car.price_per_day,
      image_url: car.image_url,
      available: car.available,
      description: car.description || ''
    });
    setShowModal(true);
  };

  const handleDeleteCar = async (carId) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
    try {
      const token = localStorage.getItem('token'); // ← Ton token stocké après login
      await axios.delete(`http://localhost:5000/api/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchCars();
      fetchStats();
      toast.info('Voiture supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error.response?.data || error.message);
      toast.error('Erreur lors de la suppression de la voiture');
    }
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Nettoyage des données
  const payload = {
    brand: formData.brand?.trim() || '',
    model: formData.model?.trim() || '',
    year: parseInt(formData.year, 10) || null,
    price_per_day: parseFloat(formData.price_per_day) || null,
    image_url: formData.image_url?.trim() || '',
    description: formData.description?.trim() || '',
    available: formData.available === true || formData.available === 'true',
  };

  // Vérification simple
  if (!payload.brand || !payload.model || !payload.year || !payload.price_per_day) {
    toast.info('Tous les champs obligatoires doivent être remplis');
    return;
  }

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    if (modalMode === 'add') {
      await axios.post('http://localhost:5000/api/cars', payload, config);
      toast.success('Voiture ajoutée avec succès');
    } else if (modalMode === 'edit') {
      await axios.put(`http://localhost:5000/api/cars/${selectedCar.id}`, payload, config);
      toast.success('Voiture modifiée avec succès');
    }
    setShowModal(false);
    fetchCars();
    fetchStats();
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error.response?.data || error.message);
    toast.error('Erreur lors de la sauvegarde');
  }
};



  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePagination = (direction) => {
    setFilters((prev) => ({
      ...prev,
      page: direction === 'next' ? prev.page + 1 : Math.max(1, prev.page - 1),
    }));
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        <div style={styles.contentWrapper}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={32} style={styles.sparkleIcon} />
            <div style={styles.adminBadge}>
              <Shield size={16} />
              ADMIN
            </div>
            <h1 style={styles.title}>
              <Settings size={40} />
              Gestion des Voitures
            </h1>
            <p style={styles.subtitle}>Panel d'administration pour la gestion de la flotte</p>
          </div>

          {/* Action Bar avec stats */}
          <div style={styles.actionBar}>
            <div style={styles.statsContainer}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>{stats.total}</div>
                <div style={styles.statLabel}>Total</div>
              </div>
              <div style={styles.statItem}>
                <div style={{...styles.statNumber, color: '#10b981'}}>{stats.available}</div>
                <div style={styles.statLabel}>Disponibles</div>
              </div>
              <div style={styles.statItem}>
                <div style={{...styles.statNumber, color: '#ef4444'}}>{stats.unavailable}</div>
                <div style={styles.statLabel}>Indisponibles</div>
              </div>
            </div>
            
            <button
              onClick={handleAddCar}
              style={{
                ...styles.addButton,
                ...(hoveredButton === 'add' ? styles.addButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton('add')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Plus size={20} />
              Ajouter une Voiture
            </button>
          </div>

          {/* Section Filtres */}
          <div style={styles.filtersSection}>
            <h3 style={styles.filtersTitle}>
              <div style={styles.filterIcon}>
                <Filter size={20} />
              </div>
              Filtres de Recherche
            </h3>
            
            <div style={styles.filtersContainer}>
              <div 
                style={{
                  ...styles.inputWrapper,
                  ...(focusedInput === 'search' ? styles.inputWrapperFocus : {})
                }}
              >
                <Search size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  name="search"
                  placeholder="Rechercher (Toyota, BMW...)"
                  value={filters.search}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('search')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                />
              </div>

              <div 
                style={{
                  ...styles.inputWrapper,
                  ...(focusedInput === 'year' ? styles.inputWrapperFocus : {})
                }}
              >
                <Calendar size={20} style={styles.inputIcon} />
                <input
                  type="number"
                  name="year"
                  placeholder="Année (ex: 2020)"
                  value={filters.year}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('year')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                />
              </div>

              <div 
                style={{
                  ...styles.inputWrapper,
                  ...(focusedInput === 'available' ? styles.inputWrapperFocus : {})
                }}
              >
                {filters.available === 'true' ? 
                  <CheckCircle size={20} style={{...styles.inputIcon, color: '#10b981'}} /> : 
                  filters.available === 'false' ?
                  <XCircle size={20} style={{...styles.inputIcon, color: '#ef4444'}} /> :
                  <Car size={20} style={styles.inputIcon} />
                }
                <select
                  name="available"
                  value={filters.available}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('available')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                >
                  <option value="">Toutes les voitures</option>
                  <option value="true">Disponibles uniquement</option>
                  <option value="false">Indisponibles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              Chargement des véhicules...
            </div>
          ) : cars.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>
                <Car size={80} />
              </div>
              <p style={{fontSize: '1.3rem', color: '#64748b', fontWeight: '500'}}>
                Aucune voiture trouvée avec ces critères.
              </p>
            </div>
          ) : (
            <>
              <div style={styles.carsGrid}>
                {cars.map((car, index) => (
                  <div
                    key={car.id}
                    style={{
                      ...styles.carCard,
                      ...(hoveredCard === car.id ? styles.carCardHover : {}),
                      animationDelay: `${index * 0.1}s`
                    }}
                    onMouseEnter={() => setHoveredCard(car.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.carImageContainer}>
                      <img
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        style={styles.carImage}
                      />
                      
                      {/* Badge disponibilité */}
                      {car.available ? (
                        <div style={styles.availableBadge}>
                          <CheckCircle size={14} />
                          Disponible
                        </div>
                      ) : (
                        <div style={styles.unavailableBadge}>
                          <XCircle size={14} />
                          Indisponible
                        </div>
                      )}
                    </div>

                    <div style={styles.carContent}>
                      <h3 style={styles.carTitle}>
                        {car.brand} {car.model}
                      </h3>
                      
                      <div style={styles.carDetails}>
                        <div style={styles.carDetail}>
                          <Calendar size={16} />
                          <span>Année {car.year}</span>
                        </div>
                        <div style={styles.carDetail}>
                          <Zap size={16} />
                          <span>{car.available ? 'Prêt à louer' : 'Non disponible'}</span>
                        </div>
                      </div>

                      <div style={styles.priceContainer}>
                        <div>
                          <div style={styles.price}>
                            {Number(car.price_per_day).toLocaleString()} FCFA
                          </div>
                          <div style={styles.priceLabel}>par jour</div>
                        </div>
                      </div>

                      <div style={styles.actionsContainer}>
                        <button
                          onClick={() => handleViewCar(car)}
                          style={{
                            ...styles.actionButton,
                            ...styles.viewButton,
                            ...(hoveredButton === `view-${car.id}` ? styles.actionButtonHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`view-${car.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                        >
                          <Eye size={16} />
                          Voir
                        </button>
                        
                        <button
                          onClick={() => handleEditCar(car)}
                          style={{
                            ...styles.actionButton,
                            ...styles.editButton,
                            ...(hoveredButton === `edit-${car.id}` ? styles.actionButtonHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`edit-${car.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                        >
                          <Edit size={16} />
                          Modifier
                        </button>
                        
                        <button
                          onClick={() => handleDeleteCar(car.id)}
                          style={{
                            ...styles.actionButton,
                            ...styles.deleteButton,
                            ...(hoveredButton === `delete-${car.id}` ? styles.actionButtonHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`delete-${car.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                        >
                          <Trash2 size={16} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={styles.paginationContainer}>
                  <button
                    onClick={() => handlePagination('prev')}
                    disabled={filters.page === 1}
                    style={{
                      ...styles.paginationButton,
                      ...(filters.page === 1 ? styles.paginationButtonDisabled : {}),
                    }}
                  >
                    <ArrowLeft size={20} />
                    Précédent
                  </button>
                  
                  <div style={styles.pageInfo}>
                    Page {filters.page} sur {totalPages}
                  </div>
                  
                  <button
                    onClick={() => handlePagination('next')}
                    disabled={filters.page === totalPages}
                    style={{
                      ...styles.paginationButton,
                      ...(filters.page === totalPages ? styles.paginationButtonDisabled : {}),
                    }}
                  >
                    Suivant
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Modal */}
          {showModal && (
            <div style={styles.modal} onClick={(e) => e.target === e.currentTarget && closeModal()}>
              <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalTitle}>
                    {modalMode === 'add' && (
                      <>
                        <Plus size={24} style={{marginRight: '0.5rem'}} />
                        Ajouter une Voiture
                      </>
                    )}
                    {modalMode === 'edit' && (
                      <>
                        <Edit size={24} style={{marginRight: '0.5rem'}} />
                        Modifier la Voiture
                      </>
                    )}
                    {modalMode === 'view' && (
                      <>
                        <Eye size={24} style={{marginRight: '0.5rem'}} />
                        Détails de la Voiture
                      </>
                    )}
                  </h2>
                  <button
                    onClick={closeModal}
                    style={styles.closeButton}
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <Car size={16} />
                        Marque
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleFormChange}
                        disabled={modalMode === 'view'}
                        required
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === 'brand' ? styles.formInputFocus : {})
                        }}
                        onFocus={() => setFocusedInput('brand')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Ex: Toyota"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <Star size={16} />
                        Modèle
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleFormChange}
                        disabled={modalMode === 'view'}
                        required
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === 'model' ? styles.formInputFocus : {})
                        }}
                        onFocus={() => setFocusedInput('model')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Ex: Camry"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <Calendar size={16} />
                        Année
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleFormChange}
                        disabled={modalMode === 'view'}
                        required
                        min="1990"
                        max="2025"
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === 'year' ? styles.formInputFocus : {})
                        }}
                        onFocus={() => setFocusedInput('year')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Ex: 2020"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <DollarSign size={16} />
                        Prix par jour (FCFA)
                      </label>
                      <input
                        type="number"
                        name="price_per_day"
                        value={formData.price_per_day}
                        onChange={handleFormChange}
                        disabled={modalMode === 'view'}
                        required
                        min="0"
                        style={{
                          ...styles.formInput,
                          ...(focusedInput === 'price_per_day' ? styles.formInputFocus : {})
                        }}
                        onFocus={() => setFocusedInput('price_per_day')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Ex: 25000"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <Image size={16} />
                      URL de l'image
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleFormChange}
                      disabled={modalMode === 'view'}
                      required
                      style={{
                        ...styles.formInput,
                        ...(focusedInput === 'image_url' ? styles.formInputFocus : {})
                      }}
                      onFocus={() => setFocusedInput('image_url')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="https://exemple.com/image.jpg"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Description (optionnelle)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      disabled={modalMode === 'view'}
                      style={{
                        ...styles.formInput,
                        ...styles.textArea,
                        ...(focusedInput === 'description' ? styles.formInputFocus : {})
                      }}
                      onFocus={() => setFocusedInput('description')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="Description détaillée de la voiture..."
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={{...styles.label, flexDirection: 'row', alignItems: 'center'}}>
                      <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleFormChange}
                        disabled={modalMode === 'view'}
                        style={{marginRight: '0.5rem'}}
                      />
                      {formData.available ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      <span style={{marginLeft: '0.5rem'}}>Voiture disponible</span>
                    </label>
                  </div>

                  {modalMode !== 'view' && (
                    <div style={styles.modalActions}>
                      <button
                        type="button"
                        onClick={closeModal}
                        style={styles.cancelButton}
                      >
                        <X size={16} />
                        Annuler
                      </button>
                      <button
                        type="submit"
                        style={styles.saveButton}
                      >
                        <Save size={16} />
                        {modalMode === 'add' ? 'Ajouter' : 'Sauvegarder'}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminCars;