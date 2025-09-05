import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  User, Mail, Calendar, Clock, MapPin, Car,
  CreditCard, CheckCircle, Truck, MapPinHouse, Upload,
  AlertCircle, Sparkles, Shield, FileText
} from 'lucide-react';
import { getToken } from '../utils/auth';
import MapSelector from '../components/MapSelector';
import React, { useEffect } from "react";
import { useState } from 'react';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  formContainer: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '800px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out',
  },
  header: {
    padding: '3rem 2.5rem 1rem',
    textAlign: 'center',
    position: 'relative',
  },
  headerGlow: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150px',
    height: '150px',
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
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '0 0 0.5rem 0',
    textShadow: '0 4px 20px rgba(241, 237, 237, 0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    fontWeight: '400',
    position: 'relative',
    zIndex: 2,
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  form: {
    padding: '1rem 2.5rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  section: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginLeft: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    zIndex: 2,
    transition: 'color 0.3s ease',
  },
  inputIconFocused: {
    color: '#3b82f6',
  },
  input: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    borderRadius: '16px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    fontSize: '1rem',
    fontWeight: '500',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    outline: 'none',
  },
  inputFocused: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15)',
    // backgroundColor supprimé - garde le fond original
    transform: 'translateY(-2px)',
  },
  select: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    borderRadius: '16px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    fontSize: '1rem',
    fontWeight: '500',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    cursor: 'pointer',
  },
  selectFocused: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15)',
    // backgroundColor supprimé - garde le fond original
    transform: 'translateY(-2px)',
  },
  fileInput: {
    width: '100%',
    padding: '1rem',
    borderRadius: '16px',
    border: '2px dashed rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    fontWeight: '500',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    color: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'center',
  },
  fileInputHover: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  verifiedMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
    borderRadius: '12px',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    color: '#10b981',
    fontWeight: '600',
  },
  totalSection: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#3b82f6',
    textShadow: '0 2px 10px rgba(59, 130, 246, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  submitButton: {
    width: '100%',
    padding: '1.25rem 2rem',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '2rem',
  },
  submitButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.4)',
  },
  submitButtonGlow: {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  submitButtonGlowActive: {
    left: '100%',
  },
  notification: {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    color: 'white',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    animation: 'slideInRight 0.3s ease-out',
  },
  notificationSuccess: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  notificationError: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
  loadingSpinner: {
    textAlign: 'center',
    padding: '4rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
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
    color: 'rgba(255, 255, 255, 0.05)',
    animation: 'float 8s ease-in-out infinite',
  },
  floatingIcon1: {
    top: '10%',
    left: '5%',
    animationDelay: '0s',
  },
  floatingIcon2: {
    top: '20%',
    right: '10%',
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
  documentRow: {
  display: 'flex',
  gap: '1rem',      // espace entre les boutons
  flexWrap: 'wrap', // permet de passer à la ligne si l'écran est petit
},

documentGroup: {
  flex: '1 1 45%',       // chaque groupe prend max 45% et peut descendre à la ligne
  display: 'flex',
  flexDirection: 'column',
  minWidth: '200px',     // empêche que ça devienne trop petit
},

documentLabel: {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
  fontWeight: '500',
},

documentFileInput: {
  width: '100%',
  boxSizing: 'border-box',
  padding: '1rem',
  borderRadius: '16px',
  border: '2px dashed rgba(255, 255, 255, 0.3)',
  fontSize: '1rem',
  fontWeight: '500',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  color: 'rgba(255, 255, 255, 0.8)',
  cursor: 'pointer',
  textAlign: 'center',
}, 
documentRow: {
  display: 'flex',
  gap: '1rem',      // espace entre les boutons
  flexWrap: 'wrap', // permet de passer à la ligne si l'écran est petit
},

documentGroup: {
  flex: '1 1 45%',       // chaque groupe prend max 45% et peut descendre à la ligne
  display: 'flex',
  flexDirection: 'column',
  minWidth: '200px',     // empêche que ça devienne trop petit
},

documentLabel: {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem',
  fontWeight: '500',
},

documentFileInput: {
  width: '100%',
  boxSizing: 'border-box',
  padding: '1rem',
  borderRadius: '16px',
  border: '2px dashed rgba(255, 255, 255, 0.3)',
  fontSize: '1rem',
  fontWeight: '500',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  color: 'rgba(255, 255, 255, 0.8)',
  cursor: 'pointer',
  textAlign: 'center',
}


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
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
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

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCar = location.state?.selectedCar || null;

  const [userId, setUserId] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const [birthDate, setBirthDate] = useState('');
  const [driving_license, setDrivingLicense] = useState(null);
  const [national_id, setIdentityDoc] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    modeDelivery: 'retrait',
    address: '',
    duration: 1,
    carId: '',
    totalPrice: 0,
    deposit: 0,
    status: 'En attente',
    paymentOption: '',
  });

  // ✅ Récupère dynamiquement l'utilisateur connecté
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = getToken();
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(response.data.id);
      } catch (err) {
        console.error('Erreur récupération user connecté:', err);
        setUserId(null);
      }
    };

    fetchUserId();
  }, []);

  // ✅ Vérifie les documents après avoir obtenu userId
  useEffect(() => {
    if (!userId) return;
    const checkDocumentsStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/documents/check/${userId}`);
        setIsVerified(response.data.is_verified);
      } catch (err) {
        console.error("Erreur vérification documents:", err);
        setIsVerified(false);
      }
    };
    checkDocumentsStatus();
  }, [userId]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars/cars')
      .then(response => {
        const cars = response.data.cars;
        setCarsData(cars);
        if (selectedCar) {
          const matchedCar = cars.find(car => car.id === selectedCar.id);
          if (matchedCar) {
            setFormData(prev => ({
              ...prev,
              carId: matchedCar.id,
              totalPrice: matchedCar.price_per_day * prev.duration,
            }));
          }
        }
      })
      .catch(error => console.error("Erreur lors du chargement des voitures:", error));
  }, [selectedCar]);

  useEffect(() => {
    const car = carsData.find(c => c.id === formData.carId);
    if (car) {
      setFormData(prev => ({
        ...prev,
        totalPrice: car.price_per_day * prev.duration,
      }));
    }
  }, [formData.duration, formData.carId, carsData]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'paymentOption') {
      setFormData(prev => ({ ...prev, paymentOption: value }));
      return;
    }
    if (name === 'duration') {
      const duration = Math.max(1, parseInt(value) || 1);
      setFormData(prev => ({ ...prev, duration }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCarChange = (e) => {
    const carId = parseInt(e.target.value);
    setFormData(prev => ({ ...prev, carId }));
  };

  const checkAvailability = async (car_id, start, end) => {
    try {
      const res = await axios.get('http://localhost:5000/api/availability', {
        params: { car_id, start_date: start, end_date: end }
      });
      return res.data.available;
    } catch (err) {
      console.error("Erreur disponibilité:", err);
      return false;
    }
  };

  const uploadDocuments = async () => {
    const token = getToken();

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 21) {
      showNotification("Le conducteur doit avoir au moins 21 ans.", 'error');
      return false;
    }
    if (age > 70) {
      showNotification("Le conducteur ne doit pas avoir plus de 70 ans.", 'error');
      return false;
    }

    if (!driving_license || !national_id) {
      showNotification("Veuillez fournir tous les documents requis.", 'error');
      return false;
    }

    const formDataDocs = new FormData();
    formDataDocs.append('birth_date', birthDate);
    formDataDocs.append('driving_license', driving_license);
    formDataDocs.append('national_id', national_id);

    try {
      await axios.post('http://localhost:5000/api/documents', formDataDocs, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'upload des documents:', error);
      showNotification('Erreur lors de l\'upload des documents.', 'error');
      return false;
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // 1️⃣ Vérifier adresse si mode livraison
  if (formData.modeDelivery === 'livraison' && formData.address.trim() === '') {
    showNotification("Veuillez renseigner l'adresse de livraison.", 'error');
    return;
  }

  // 2️⃣ Vérifier heure si livraison
  if (formData.modeDelivery === 'livraison') {
    if (!formData.time) {
      showNotification("Veuillez sélectionner une heure de livraison.", 'error');
      return;
    }
    const [hourStr, minuteStr] = formData.time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (isNaN(hour) || isNaN(minute)) {
      showNotification("Heure de livraison invalide.", 'error');
      return;
    }

    const totalMinutes = hour * 60 + minute;
    const minMinutes = 8 * 60;
    const maxMinutes = 19 * 60 + 30;

    if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
      showNotification("Pour une livraison, l'heure doit être comprise entre 08:00 et 19:30.", 'error');
      return;
    }
  }

  // 3️⃣ Vérifier véhicule
  const car = carsData.find(c => c.id === formData.carId);
  if (!car) {
    showNotification('Veuillez sélectionner un véhicule valide.', 'error');
    return;
  }

  try {
    const token = getToken();
    if (!token) {
      showNotification("Vous devez être connecté pour réserver.", 'error');
      navigate('/login');
      return;
    }

    // 4️⃣ Vérifier que la date n’est pas dans le passé
    const today = new Date();
    today.setHours(0, 0, 0, 0); // on ignore l’heure
    const startDateObj = new Date(formData.date);
    if (startDateObj < today) {
      showNotification("❌ Vous ne pouvez pas réserver à une date passée.", 'error');
      return;
    }

    // 5️⃣ Calcul fin
    const endDateObj = new Date(startDateObj);
    endDateObj.setDate(endDateObj.getDate() + formData.duration);

    const start_date = startDateObj.toISOString().split('T')[0];
    const end_date = endDateObj.toISOString().split('T')[0];

    // 6️⃣ Vérifier dispo
    const available = await checkAvailability(car.id, start_date, end_date);
    if (!available) {
      showNotification("Cette voiture est déjà réservée pour cette période.", 'error');
      return;
    }

    // 7️⃣ Vérifier documents si pas validé
    if (isVerified === false) {
      const canProceed = await uploadDocuments();
      if (!canProceed) return;
    }

    // 8️⃣ Dépôt & caution
    const deposit = formData.paymentOption === 'deposit'
      ? Math.round(formData.totalPrice * 0.75)
      : 0;
    const caution = Math.round(formData.totalPrice * 0.2);

    // 9️⃣ Construire le payload COMPLET
    const reservationPayload = {
      car_id: car.id,
      start_date,
      end_date,
      total_price: formData.totalPrice,
      deposit,
      caution,
      status: 'En attente',
      mode_delivery: formData.modeDelivery,  // ✅ ajouté
      address: formData.modeDelivery === 'livraison' ? formData.address : null, // ✅ ajouté
      delivery_time: formData.modeDelivery === 'livraison' ? formData.time : null, // ✅ ajouté
    };

    const response = await axios.post(
      'http://localhost:5000/api/reservations',
      reservationPayload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    showNotification("✅ Réservation enregistrée ! Vous serez contacté pour validation.", 'success');

    // 🔄 Reset
    setFormData({
      name: '', email: '', date: '', time: '',
      modeDelivery: 'retrait', address: '', duration: 1,
      carId: '', totalPrice: 0, deposit: 0,
      status: 'En attente', paymentOption: '',
    });
    setBirthDate('');
    setDrivingLicense(null);
    setIdentityDoc(null);

    setTimeout(() => navigate('/dashboard'), 2000);

  } catch (err) {
    console.error('Erreur lors de la réservation:', err);
    showNotification('Erreur lors de la réservation.', 'error');
  }
};




  if (isVerified === null) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.loadingSpinner}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              borderTop: '3px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            Chargement...
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
          <Car size={80} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Calendar size={60} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <CreditCard size={70} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Shield size={65} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        {/* Notification */}
        {notification && (
          <div 
            style={{
              ...styles.notification,
              ...(notification.type === 'success' ? styles.notificationSuccess : styles.notificationError)
            }}
          >
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {notification.message}
          </div>
        )}

        <div style={styles.formContainer}>
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={24} style={styles.sparkleIcon} />
            <h2 style={styles.title}>
              <Car size={32} />
              Réservation de véhicule
            </h2>
            <p style={styles.subtitle}>
              Complétez les informations pour votre réservation
            </p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Section Informations personnelles */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <User size={20} />
                Informations personnelles
              </h3>
              
              <div style={styles.inputRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <User size={16} />
                    Nom complet
                  </label>
                  <div style={styles.inputWrapper}>
                    <User 
                      size={20} 
                      style={{
                        ...styles.inputIcon,
                        ...(focusedField === 'name' ? styles.inputIconFocused : {})
                      }} 
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...styles.input,
                        ...(focusedField === 'name' ? styles.inputFocused : {})
                      }}
                      required
                      placeholder="Entrez votre nom complet"
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Mail size={16} />
                    Adresse e-mail
                  </label>
                  <div style={styles.inputWrapper}>
                    <Mail 
                      size={20} 
                      style={{
                        ...styles.inputIcon,
                        ...(focusedField === 'email' ? styles.inputIconFocused : {})
                      }} 
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...styles.input,
                        ...(focusedField === 'email' ? styles.inputFocused : {})
                      }}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section Détails de réservation */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <Calendar size={20} />
                Détails de réservation
              </h3>
              
              <div style={styles.inputRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Calendar size={16} />
                    Date de réservation
                  </label>
                  <div style={styles.inputWrapper}>
                    <Calendar 
                      size={20} 
                      style={{
                        ...styles.inputIcon,
                        ...(focusedField === 'date' ? styles.inputIconFocused : {})
                      }} 
                    />
                    <input
                    type="date"
                    name="date"
                    value={formData.date}
                    min={new Date().toISOString().split("T")[0]} // ✅ bloque les dates passées
                    onChange={handleChange}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...styles.input,
                      ...(focusedField === 'date' ? styles.inputFocused : {})
                    }}
                    required
                    />

                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Clock size={16} />
                    Heure de récupération
                  </label>
                  <div style={styles.inputWrapper}>
                    <Clock 
                      size={20} 
                      style={{
                        ...styles.inputIcon,
                        ...(focusedField === 'time' ? styles.inputIconFocused : {})
                      }} 
                    />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('time')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...styles.input,
                        ...(focusedField === 'time' ? styles.inputFocused : {})
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={styles.inputRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Truck size={16} />
                    Mode de récupération
                  </label>
                  <div style={styles.inputWrapper}>
                    <Truck 
                      size={20} 
                      style={{
                        ...styles.inputIcon,
                        ...(focusedField === 'modeDelivery' ? styles.inputIconFocused : {})
                      }} 
                    />
                    <select
                      name="modeDelivery"
                      value={formData.modeDelivery}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('modeDelivery')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...styles.select,
                        ...(focusedField === 'modeDelivery' ? styles.selectFocused : {})
                      }}
                    >
                      <option value="retrait">Retrait à l'agence</option>
                      <option value="livraison">Livraison à domicile</option>
                    </select>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Calendar size={16} />
                    Durée (jours)
                  </label>
                  <div style={styles.inputWrapper}>
                    <Calendar 
                      size={20} 
                      style={{
                        ...styles.inputIcon,
                        ...(focusedField === 'duration' ? styles.inputIconFocused : {})
                      }} 
                    />
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      min="1"
                      onChange={handleChange}
                      onFocus={() => setFocusedField('duration')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...styles.input,
                        ...(focusedField === 'duration' ? styles.inputFocused : {})
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Adresse de livraison si nécessaire */}
              {formData.modeDelivery === 'livraison' && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <MapPin size={16} />
                      Adresse de livraison
                    </label>
                    <div style={styles.inputWrapper}>
                      <MapPin 
                        size={20} 
                        style={{
                          ...styles.inputIcon,
                          ...(focusedField === 'address' ? styles.inputIconFocused : {})
                        }} 
                      />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          ...styles.input,
                          ...(focusedField === 'address' ? styles.inputFocused : {})
                        }}
                        required
                        placeholder="Entrez votre adresse de livraison"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      <MapPinHouse size={16} />
                      Sélectionner sur la carte
                    </label>
                    <MapSelector
                      onLocationSelect={(data) => {
                        const { lat, lng, address } = data;
                        setFormData(prev => ({
                          ...prev,
                          address,
                          location: { lat, lng },
                        }));
                      }}
                    />
                    {formData.location && (
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Coordonnées : Latitude {formData.location.lat}, Longitude {formData.location.lng}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Section Choix du véhicule */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <Car size={20} />
                Choix du véhicule
              </h3>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Car size={16} />
                  Véhicule sélectionné
                </label>
                <div style={styles.inputWrapper}>
                  <Car 
                    size={20} 
                    style={{
                      ...styles.inputIcon,
                      ...(focusedField === 'carId' ? styles.inputIconFocused : {})
                    }} 
                  />
                  <select
                    name="carId"
                    value={formData.carId}
                    onChange={handleCarChange}
                    onFocus={() => setFocusedField('carId')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      ...styles.select,
                      ...(focusedField === 'carId' ? styles.selectFocused : {})
                    }}
                    required
                  >
                    <option value="">-- Sélectionnez un véhicule --</option>
                    {carsData.map(car => (
                      <option key={car.id} value={car.id}>
                        {car.brand} - {car.price_per_day.toLocaleString()} FCFA / jour
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section Documents - visible uniquement si non encore vérifiés */}
            {isVerified === false && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>
                  <FileText size={20} />
                  Documents requis
                </h3>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Calendar size={16} />
                    Date de naissance du conducteur
                  </label>
                  <div style={styles.inputWrapper}>
                    <Calendar 
                      size={20} 
                      style={{
                        ...styles.inputIcon,
                        ...(focusedField === 'birthDate' ? styles.inputIconFocused : {})
                      }} 
                    />
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      onFocus={() => setFocusedField('birthDate')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...styles.input,
                        ...(focusedField === 'birthDate' ? styles.inputFocused : {})
                      }}
                      required
                    />
                  </div>
                </div>

             <div style={styles.documentRow}>
  <div style={styles.documentGroup}>
    <label style={styles.documentLabel}>
      <Upload size={16} />
      Permis de conduire
    </label>
    <input
      type="file"
      accept="image/*,application/pdf"
      onChange={(e) => setDrivingLicense(e.target.files[0])}
      style={styles.documentFileInput}
      required
    />
  </div>

  <div style={styles.documentGroup}>
    <label style={styles.documentLabel}>
      <Upload size={16} />
      Pièce d'identité
    </label>
    <input
      type="file"
      accept="image/*,application/pdf"
      onChange={(e) => setIdentityDoc(e.target.files[0])}
      style={styles.documentFileInput}
      required
    />
  </div>
</div>

      </div>
    )}





            {/* Message de vérification */}
            {isVerified === true && (
              <div style={styles.verifiedMessage}>
                <CheckCircle size={20} />
                Vos documents ont été vérifiés. Vous n'avez pas besoin de les soumettre à nouveau.
              </div>
            )}

            {/* Section Prix total */}
            <div style={styles.totalSection}>
              <div style={styles.totalPrice}>
                <CreditCard size={24} />
                {formData.totalPrice.toLocaleString()} FCFA
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.5rem 0 0 0' }}>
                Montant total de la réservation
              </p>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(hoveredButton ? styles.submitButtonHover : {})
              }}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              <div 
                style={{
                  ...styles.submitButtonGlow,
                  ...(hoveredButton ? styles.submitButtonGlowActive : {})
                }}
              ></div>
              <CheckCircle size={20} />
              Confirmer la réservation
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Booking;