//PaymentPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import {
  ArrowLeft,
  CreditCard,
  DollarSign,
  User,
  Mail,
  Calendar,
  MapPin,
  Car,
  CheckCircle,
  Clock,
  Sparkles,
  Shield,
  Smartphone,
  Lock,
  Building,
  AlertTriangle,
  Loader
} from 'lucide-react';

import logo from '../assets/logo.png';
import floozLogo from '../assets/flooz.png';
import mixxLogo from '../assets/mixx.png';
import ecobankLogo from '../assets/ecobank.png';

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
    maxWidth: '1200px',
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
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    position: 'relative',
    zIndex: 2,
  },
  logo: {
    height: '60px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
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
  },
  pageSubtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  backButton: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 2,
  },
  backButtonHover: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
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
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '1rem',
  },
  infoIcon: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '0.2rem',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  infoValue: {
    color: 'white',
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  warningMessage: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    color: '#fbbf24',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  paymentOptions: {
    display: 'grid',
    gap: '1rem',
    marginBottom: '2rem',
  },
  paymentButton: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  paymentButtonHover: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  paymentLogo: {
    height: '40px',
    width: 'auto',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '1rem',
    fontSize: '1rem',
    color: 'white',
    transition: 'all 0.3s ease',
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  },
  inputFocus: {
    background: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.5)',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
  quickPayButtons: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  quickPayButton: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#10b981',
  },
  quickPayButtonHover: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.2) 100%)',
    transform: 'translateY(-1px)',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  submitButtonHover: {
    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
  },
  submitButtonDisabled: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
  successMessage: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.08) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '12px',
    padding: '1rem',
    color: '#10b981',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  loadingOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  loadingContent: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '3rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    color: 'white',
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
};

const cssAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
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

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const generatePaymentRef = () => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `PAY-${datePart}-${randomPart}`;
  };

  const [method, setMethod] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [reservation, setReservation] = useState(null);
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredPayment, setHoveredPayment] = useState('');
  const [hoveredQuickPay, setHoveredQuickPay] = useState('');
  const [hoveredSubmit, setHoveredSubmit] = useState(false);

  useEffect(() => {
    const stateReservation = location.state?.reservation;
    const storedReservation = JSON.parse(localStorage.getItem('currentReservation'));
    const token = localStorage.getItem('token');

    const fetchReservationFromServer = async (reservationId, extras = {}) => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:5000/api/reservations/${reservationId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fullReservation = { ...response.data, ...extras };
        setReservation(fullReservation);
        localStorage.setItem('currentReservation', JSON.stringify(fullReservation));

      } catch (error) {
        console.error(" Erreur lors du chargement de la réservation :", error);
        alert("Erreur de chargement des informations de la réservation.");
      }
    };

    if (stateReservation) {
      fetchReservationFromServer(stateReservation.id, stateReservation);
    } else if (storedReservation) {
      fetchReservationFromServer(storedReservation.id, storedReservation);
    } else {
      alert("Aucune réservation trouvée !");
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateContractPDF = (paymentData) => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;
    doc.addImage(img, 'PNG', 14, 10, 30, 15);
    doc.setFontSize(14);
    doc.text("Contrat de réservation de véhicule", 50, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Champ', 'Valeur']],
      body: [
        ['Nom', paymentData.reservation.name || '---'],
        ['Email', paymentData.reservation.email || '---'],
        ['Voiture', paymentData.reservation.car || '---'],
        ['Date de livraison', paymentData.reservation.delivery_date?.slice(0, 10) + ' à ' + (paymentData.reservation.time || '---')],
        ['Adresse de livraison', paymentData.reservation.delivery_address || '---'],
        ['Méthode de paiement', paymentData.method],
        ['Montant payé', paymentData.details.amount + ' FCFA'],
        ['Référence de paiement', paymentData.reference],
        ['Date de paiement', new Date(paymentData.date).toLocaleString()],
      ],
    });

    return doc.output('blob');
  };

  const sendEmailWithPDF = async (paymentData, pdfBlob) => {
    try {
      const file = new File([pdfBlob], 'Contrat_Reservation.pdf', { type: 'application/pdf' });

      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const uploadResponse = await axios.post(
        'https://api.pdfrest.com/upload',
        formDataUpload,
        {
          headers: {
            'Api-Key': 'ea5f4840-8cb5-4d6c-b323-4049f7d58ba8',
          },
        }
      );

      const fileId = uploadResponse.data?.files?.[0]?.id;
      const publicURL = `https://api.pdfrest.com/download/${fileId}`;

      if (!publicURL) {
        throw new Error("❌ Le lien du fichier n'a pas pu être obtenu.");
      }

      console.log('🔗 Lien PDF généré :', publicURL);

      const templateParams = {
        user_name: paymentData.reservation.name,
        payment_reference: paymentData.reference,
        reservation_date: paymentData.reservation.date,
        reservation_car: paymentData.reservation.car,
        attachment: publicURL,
        agency_name: 'ʋu vehicles',
        current_year: new Date().getFullYear(),
        email: paymentData.reservation.email,
      };

      await emailjs.send(
        'service_m0xkemr',
        'template_p981s5u',
        templateParams,
        'whI_9eAiJeu5nH2v2'
      );

      console.log('📩 Email envoyé avec succès avec le lien du PDF.');
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi :', error);
    }
  };

// handleSubmit corrigé
const handleSubmit = async (e) => { 
  e.preventDefault();
  setLoading(true);
  setStatus('');

  setTimeout(async () => {
    setLoading(false);

    const totalPrice = Number(reservation.total_price ?? 0);
    const caution = Number(reservation.caution ?? Math.round(totalPrice * 0.35));
    const alreadyPaid = Number(reservation.deposit ?? 0);

    // Montant restant à payer
    const montantRestant = Math.max(totalPrice + caution - alreadyPaid, 0);

    const selectedDeposit = Number(formData.deposit ?? 0);
    const selectedCaution = Number(formData.caution ?? caution);
    const paymentAmount = Number(formData.amount ?? montantRestant);

    if (paymentAmount <= 0) {
      alert("Cette réservation est déjà totalement payée.");
      return;
    }

    if (!window.confirm(
      `Vous êtes sur le point de payer :
      - Dépôt : ${selectedDeposit.toLocaleString()} FCFA
      - Caution : ${selectedCaution.toLocaleString()} FCFA
      Montant total : ${paymentAmount.toLocaleString()} FCFA
      Confirmez ?`
    )) return;

    const paymentRef = generatePaymentRef();
    const paymentData = {
      reference: paymentRef,
      method,
      details: formData,
      reservation,
      date: new Date().toISOString(),
      deposit: selectedDeposit,
      caution: selectedCaution
    };

    // Générer PDF + envoyer par mail
    const pdfBlob = generateContractPDF(paymentData);
    sendEmailWithPDF(paymentData, pdfBlob);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/payments',
        {
          reservationId: reservation.id,
          amount: paymentAmount,
          deposit: selectedDeposit,
          caution: selectedCaution,
          method,
          reference: paymentRef
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Paiement de ${paymentAmount.toLocaleString()} FCFA enregistré avec succès !`);
      navigate('/dashboard');
    } catch (err) {
      console.error("Erreur lors de l'enregistrement du paiement :", err);
      alert("Erreur lors de l'enregistrement du paiement.");
    }
  }, 500); // délai réduit pour meilleure réactivité
};





  const getLogo = () => {
    switch (method) {
      case 'Flooz': return <img src={floozLogo} alt="Flooz" style={styles.paymentLogo} />;
      case 'Mixx by Yas': return <img src={mixxLogo} alt="Mixx by Yas" style={styles.paymentLogo} />;
      case 'Ecobank': return <img src={ecobankLogo} alt="Ecobank" style={styles.paymentLogo} />;
      default: return null;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price).replace('XOF', 'FCFA');
  };

  const renderForm = () => {
    if (!method || !reservation) return null;
    
     // Nouveau calcul qui prend en compte location + caution
  const totalDue = (reservation.total_price || 0) + (reservation.caution || 0);
  const montantRestant = totalDue - (reservation.deposit || 0);
  const isFullyPaid = montantRestant <= 0;
  const hasPaidBefore = reservation.deposit && reservation.deposit > 0;

     // Calcul du dépôt et de la caution pour affichage (premier paiement)
  const deposit = Math.round(reservation.total_price * 0.75);
  const caution = Math.round(reservation.total_price * 0.35);
  const totalToPay = deposit + caution;

    return (
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>
            {getLogo()}
            Paiement via {method}
          </h3>
        </div>

        {/* Encadré informatif sur les montants 
       {!hasPaidBefore && !isFullyPaid && (
  <div style={{
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: 'white',
  }}>
    <h4 style={{ 
      margin: '0 0 1rem 0', 
      fontSize: '1.1rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    }}>
      <Shield size={20} />
      Informations sur votre paiement
    </h4>
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>
          Dépôt (75%)
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#60a5fa' }}>
          {formatPrice(deposit)}
        </div>
      </div>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>
          Caution (35%)
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fbbf24' }}>
          {formatPrice(caution)}
        </div>
      </div>
    </div>
    <div style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      paddingTop: '1rem',
      fontSize: '1rem',
      fontWeight: '600'
    }}>
      <span style={{ opacity: 0.9 }}>Total à payer: </span>
      <span style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: '700' }}>
        {formatPrice(totalToPay)}
      </span>
    </div>
    <p style={{ 
      margin: '1rem 0 0 0', 
      fontSize: '0.875rem', 
      opacity: 0.8,
      lineHeight: '1.4'
    }}>
      La caution vous sera restituée à la fin de la location si le véhicule est rendu en bon état.
    </p>
  </div>
)} */}


 <div style={styles.formGroup}>
  <label style={styles.label}>Montant à payer (FCFA)</label>

  {/* Boutons de paiement rapide */}
  {!hasPaidBefore && !isFullyPaid && (
  <div style={styles.quickPayButtons}>
    <button
      type="button"
      style={{
        ...styles.quickPayButton,
        ...(hoveredQuickPay === '75' ? styles.quickPayButtonHover : {})
      }}
      onMouseEnter={() => setHoveredQuickPay('75')}
      onMouseLeave={() => setHoveredQuickPay('')}
      onClick={() => {
        const total = Number(reservation.total_price) || 0;
        const deposit = Math.round(total * 0.75);
        const caution = Math.round(total * 0.35);
        setFormData({
          ...formData,
          selectedPercentage: 75,
          deposit,
          caution,
          amount: deposit + caution
        });
      }}
    >
      Payer 75% + caution
    </button>

    <button
      type="button"
      style={{
        ...styles.quickPayButton,
        ...(hoveredQuickPay === '100' ? styles.quickPayButtonHover : {})
      }}
      onMouseEnter={() => setHoveredQuickPay('100')}
      onMouseLeave={() => setHoveredQuickPay('')}
      onClick={() => {
        const total = Number(reservation.total_price) || 0;
        const deposit = Math.round(total); // 100%
        const caution = Math.round(total * 0.35);
        setFormData({
          ...formData,
          selectedPercentage: 100,
          deposit,
          caution,
          amount: deposit + caution
        });
      }}
    >
      Payer 100% + caution
    </button>
  </div>
)}


  {/* Affichage du résumé du paiement uniquement après le choix */}
  {!hasPaidBefore && !isFullyPaid && formData.selectedPercentage && (
    <div style={{
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '2rem',
      textAlign: 'center',
      color: 'white',
    }}>
      <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>
        <Shield size={20} /> Informations sur votre paiement
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>
            Dépôt ({formData.selectedPercentage}%)
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#60a5fa' }}>
            {formatPrice(Math.round(reservation.total_price * formData.selectedPercentage / 100))}
          </div>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>
            Caution (35%)
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fbbf24' }}>
            {formatPrice(Math.round(reservation.total_price * 0.35))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '1rem', fontSize: '1rem', fontWeight: '600' }}>
        <span style={{ opacity: 0.9 }}>Total à payer: </span>
        <span style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: '700' }}>
          {formatPrice(formData.amount)}
        </span>
      </div>

      <p style={{ margin: '1rem 0 0 0', fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.4' }}>
        La caution vous sera restituée à la fin de la location si le véhicule est rendu en bon état.
      </p>
    </div>
  )}

  {/* Paiement si déjà partiellement payé */}
{hasPaidBefore && !isFullyPaid && (
  <div style={styles.quickPayButtons}>
    <button
      type="button"
      style={{
        ...styles.quickPayButton,
        ...(hoveredQuickPay === 'solde' ? styles.quickPayButtonHover : {})
      }}
      onMouseEnter={() => setHoveredQuickPay('solde')}
      onMouseLeave={() => setHoveredQuickPay('')}
      onClick={() => {
        const totalPrice = Number(reservation.total_price ?? 0);
        const caution = Number(reservation.caution ?? Math.round(totalPrice * 0.35));
        const alreadyPaid = Number(reservation.deposit ?? 0);

        const montantRestant = Math.max(totalPrice + caution - alreadyPaid, 0);

        setFormData({
          ...formData,
          amount: montantRestant,
          deposit: Math.max(totalPrice - alreadyPaid, 0),
          caution
        });
      }}
    >
      Payer le solde ({formatPrice(Math.max(Number(reservation.total_price ?? 0) + Number(reservation.caution ?? Math.round((reservation.total_price ?? 0) * 0.35)) - Number(reservation.deposit ?? 0), 0))})
    </button>
  </div>
)}



  {/* Déjà payé */}
  {isFullyPaid && (
    <div style={styles.successMessage}>
      <CheckCircle size={20} />
      Cette réservation est déjà totalement payée.
    </div>
  )}

  {/* Saisie manuelle */}
  {!isFullyPaid && (
    <input
      type="number"
      name="amount"
      min="1"
      max={totalDue} // ✅ on limite à location + caution
      required
      value={formData.amount || ''}
      onChange={handleInput}
      style={styles.input}
      placeholder="Entrez le montant"
    />
  )}
</div>




        {method === 'Flooz' && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Smartphone size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Numéro de téléphone
              </label>
              <input 
                type="tel" 
                name="phone" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="Ex: +228 XX XX XX XX"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Code PIN
              </label>
              <input 
                type="password" 
                name="pin" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="Votre code PIN Flooz"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Building size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Marchand
              </label>
              <input 
                type="text" 
                name="merchant" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="Code marchand"
              />
            </div>
          </>
        )}

        {method === 'Mixx by Yas' && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Email / ID utilisateur
              </label>
              <input 
                type="email" 
                name="username" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="votre@email.com"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Code de validation
              </label>
              <input 
                type="password" 
                name="code" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="Code de validation Mixx"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Building size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Marchand
              </label>
              <input 
                type="text" 
                name="merchant" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="Code marchand"
              />
            </div>
          </>
        )}

        {method === 'Ecobank' && (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Nom du titulaire
              </label>
              <input 
                type="text" 
                name="owner" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="Nom complet du titulaire"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <CreditCard size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Numéro de compte
              </label>
              <input 
                type="text" 
                name="account" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="Numéro de compte Ecobank"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Code secret
              </label>
              <input 
                type="password" 
                name="pin" 
                required 
                onChange={handleInput}
                style={styles.input}
                placeholder="Code secret"
              />
            </div>
          </>
        )}

        {!isFullyPaid && (
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              ...(hoveredSubmit ? styles.submitButtonHover : {}),
              ...(loading ? styles.submitButtonDisabled : {})
            }}
            onMouseEnter={() => setHoveredSubmit(true)}
            onMouseLeave={() => setHoveredSubmit(false)}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Traitement...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Payer avec {method}
              </>
            )}
          </button>
        )}
      </form>
    );
  };

  if (reservation && reservation.is_validated !== true) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          <div style={styles.content}>
            <div style={styles.header}>
              <div style={styles.headerGlow}></div>
              <Sparkles size={24} style={styles.sparkleIcon} />
              
              <div style={styles.logoSection}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <div style={styles.titleSection}>
                  <h1 style={styles.pageTitle}>Paiement</h1>
                  <p style={styles.pageSubtitle}>
                    <CreditCard size={18} />
                    Réservation en attente de validation
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(-1)}
                style={{
                  ...styles.backButton,
                  ...(hoveredBack ? styles.backButtonHover : {})
                }}
                onMouseEnter={() => setHoveredBack(true)}
                onMouseLeave={() => setHoveredBack(false)}
              >
                <ArrowLeft size={20} />
                Retour
              </button>
            </div>

            <div style={styles.warningMessage}>
              <AlertTriangle size={48} />
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>Réservation en attente</h3>
                <p style={{ margin: '0', opacity: 0.9 }}>
                  Votre réservation n'a pas encore été validée par notre équipe. 
                  Veuillez attendre la confirmation par email avant de procéder au paiement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  console.log("Données de reservation:", reservation);

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingContent}>
              <div style={styles.spinner}></div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                Traitement du paiement
              </h3>
              <p style={{ margin: '0', opacity: 0.8 }}>
                Veuillez patienter pendant que nous traitons votre paiement...
              </p>
            </div>
          </div>
        )}

        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={24} style={styles.sparkleIcon} />
            
            <div style={styles.logoSection}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <div style={styles.titleSection}>
                <h1 style={styles.pageTitle}>Paiement</h1>
                <p style={styles.pageSubtitle}>
                  <CreditCard size={18} />
                  Finaliser votre réservation
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              style={{
                ...styles.backButton,
                ...(hoveredBack ? styles.backButtonHover : {})
              }}
              onMouseEnter={() => setHoveredBack(true)}
              onMouseLeave={() => setHoveredBack(false)}
            >
              <ArrowLeft size={20} />
              Retour
            </button>
          </div>

          {/* Contenu principal */}
          <div style={styles.mainGrid}>
            {/* Formulaire de paiement */}
            <div style={styles.card}>
              {!method && (
                <>
                  <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>
                      <CreditCard size={28} />
                      Choisir une méthode de paiement
                    </h2>
                  </div>

                  <div style={styles.paymentOptions}>
                    <button 
                      style={{
                        ...styles.paymentButton,
                        ...(hoveredPayment === 'Flooz' ? styles.paymentButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredPayment('Flooz')}
                      onMouseLeave={() => setHoveredPayment('')}
                      onClick={() => setMethod('Flooz')}
                    >
                      <img src={floozLogo} alt="Flooz" style={styles.paymentLogo} />
                      Flooz
                    </button>
                    <button 
                      style={{
                        ...styles.paymentButton,
                        ...(hoveredPayment === 'Mixx by Yas' ? styles.paymentButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredPayment('Mixx by Yas')}
                      onMouseLeave={() => setHoveredPayment('')}
                      onClick={() => setMethod('Mixx by Yas')}
                    >
                      <img src={mixxLogo} alt="Mixx by Yas" style={styles.paymentLogo} />
                      Mixx by Yas
                    </button>
                    <button 
                      style={{
                        ...styles.paymentButton,
                        ...(hoveredPayment === 'Ecobank' ? styles.paymentButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredPayment('Ecobank')}
                      onMouseLeave={() => setHoveredPayment('')}
                      onClick={() => setMethod('Ecobank')}
                    >
                      <img src={ecobankLogo} alt="Ecobank" style={styles.paymentLogo} />
                      Ecobank
                    </button>
                  </div>
                </>
              )}

              {method && renderForm()}
            </div>

            {/* Résumé de la réservation */}
      {reservation && (
  <div style={styles.card}>
    <div style={styles.cardHeader}>
      <h2 style={styles.cardTitle}>
        <DollarSign size={28} />
        Résumé de la réservation
      </h2>
    </div>

    <div style={styles.infoRow}>
      <User size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Nom</div>
        <div style={styles.infoValue}>{reservation.client_name || '---'}</div>
      </div>
    </div>

    <div style={styles.infoRow}>
      <Mail size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Email</div>
        <div style={styles.infoValue}>{reservation.email || '---'}</div>
      </div>
    </div>

    <div style={styles.infoRow}>
      <Calendar size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Date de livraison</div>
        <div style={styles.infoValue}>{reservation.delivery_date || '---'}</div>
      </div>
    </div>

    <div style={styles.infoRow}>
      <Clock size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Heure de livraison</div>
        <div style={styles.infoValue}>{reservation.created_at || '---'}</div>
      </div>
    </div>

    <div style={styles.infoRow}>
      <MapPin size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Adresse de livraison</div>
        <div style={styles.infoValue}>{reservation.delivery_address || '---'}</div>
      </div>
    </div>

    <div style={styles.infoRow}>
      <Car size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Voiture</div>
        <div style={styles.infoValue}>{reservation.car || '---'}</div>
      </div>
    </div>

    <div style={styles.infoRow}>
      <DollarSign size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Montant total</div>
        <div style={styles.infoValue}>
          {reservation.total_price !== undefined ? formatPrice(Number(reservation.total_price)) : '---'}
        </div>
      </div>
    </div>

    <div style={styles.infoRow}>
      <DollarSign size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Caution</div>
        <div style={styles.infoValue}>
          {reservation.caution !== undefined ? formatPrice(Number(reservation.caution)) : '---'}
        </div>
      </div>
    </div>

    <div style={styles.infoRow}>
      <CheckCircle size={20} style={styles.infoIcon} />
      <div style={styles.infoContent}>
        <div style={styles.infoLabel}>Montant déjà payé</div>
        <div style={styles.infoValue}>
          {reservation.deposit !== undefined ? formatPrice(Number(reservation.deposit)) : '---'}
        </div>
      </div>
    </div>

    <div style={{
      ...styles.infoRow,
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
      border: '1px solid rgba(16, 185, 129, 0.2)'
    }}>
      <DollarSign size={20} style={{ ...styles.infoIcon, color: '#10b981' }} />
      <div style={styles.infoContent}>
        <div style={{ ...styles.infoLabel, color: '#10b981' }}>Solde restant</div>
        <div style={{ ...styles.infoValue, color: '#10b981', fontWeight: '700', fontSize: '1.2rem' }}>
          {reservation.total_price !== undefined && reservation.deposit !== undefined
            ? formatPrice(
                Number(reservation.total_price) + Number(reservation.caution || 0) - Number(reservation.deposit)
              )
            : '---'}
        </div>
      </div>
    </div>
  </div>
)}


          </div>

          {status && (
            <div style={{
              ...styles.card,
              marginTop: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ color: 'white', fontSize: '1.1rem', margin: 0 }}>{status}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

}

export default Payment;