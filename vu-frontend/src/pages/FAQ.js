import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  X,
  Check,
  Sparkles,
  MessageCircle,
  Info,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const styles = {
  container: {
    padding: '0',
    margin: '0',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ea580c 0%, #ea580c 25%, #ea580c 50%, #ea580c 75%, #ea580c 100%)',
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
    background: 'radial-gradient(circle at 30% 70%, rgba(251, 146, 60, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    maxWidth: '1000px',
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
    background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)',
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
    height: '100px',
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
  faqList: {
    display: 'grid',
    gap: '1rem',
  },
  faqItem: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'slideInUp 0.5s ease-out both',
  },
  faqItemExpanded: {
    transform: 'scale(1.02)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  faqQuestion: {
    padding: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderBottom: '1px solid transparent',
  },
  faqQuestionHover: {
    background: 'rgba(255, 255, 255, 0.05)',
  },
  faqQuestionExpanded: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  questionContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  questionIcon: {
    color: '#fbbf24',
    background: 'rgba(251, 191, 36, 0.1)',
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid rgba(251, 191, 36, 0.2)',
  },
  questionText: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    margin: '0',
  },
  chevronIcon: {
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  chevronIconRotated: {
    transform: 'rotate(180deg)',
  },
  faqAnswer: {
    padding: '0 1.5rem 1.5rem 1.5rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
    lineHeight: '1.6',
    animation: 'fadeIn 0.3s ease-out',
  },
  answerText: {
    margin: '0',
    paddingLeft: '3rem',
  },
  emailLink: {
    color: '#fbbf24',
    textDecoration: 'underline',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
  emailLinkHover: {
    color: '#f59e0b',
  },
  supportCard: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.2)',
    borderRadius: '20px',
    padding: '2rem',
    textAlign: 'center',
    marginTop: '2rem',
    animation: 'slideInUp 0.5s ease-out 0.2s both',
  },
  supportTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  supportText: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  supportHighlight: {
    color: '#fbbf24',
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

// Animations CSS
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
`;

export default function FAQ() {
  const navigate = useNavigate();
  const [hoveredBack, setHoveredBack] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [hoveredItems, setHoveredItems] = useState({});
  const [hoveredEmail, setHoveredEmail] = useState(false);

  const faqData = [
    {
      id: 'booking',
      icon: Calendar,
      question: 'Comment réserver une voiture ?',
      answer: 'Il vous suffit de créer un compte, de choisir une voiture et de réserver ! Le processus est simple et rapide : parcourez notre flotte, sélectionnez vos dates, confirmez votre réservation et c\'est parti !'
    },
    {
      id: 'cancel',
      icon: X,
      question: 'Comment puis-je annuler une réservation ?',
      answer: 'Allez dans votre tableau de bord et cliquez sur "Annuler". Vous pouvez annuler votre réservation jusqu\'à 24h avant la date prévue. Des conditions d\'annulation peuvent s\'appliquer selon le délai.'
    },
    {
      id: 'payment',
      icon: CreditCard,
      question: 'Quels modes de paiement sont acceptés ?',
      answer: 'Nous acceptons les virements, Mixx by Yas et flooz. Tous les paiements sont sécurisés et traités de manière confidentielle. Vous recevrez une confirmation immédiate après le paiement.'
    },
    {
      id: 'support',
      icon: MessageCircle,
      question: 'Comment puis-je contacter le support ?',
      answer: 'Vous pouvez nous contacter par email à support@ʋu.com ou via notre formulaire de contact sur le site. Notre équipe est disponible 24h/24 pour répondre à toutes vos questions.'
    },
    {
      id: 'requirements',
      icon: Check,
      question: 'Quelles sont les conditions requises pour louer ?',
      answer: 'Il faut être âgé d\'au moins 21 ans, posséder un permis de conduire valide depuis au moins 2 ans, et fournir une pièce d\'identité en cours de validité. Un dépôt de garantie peut être demandé.'
    },
    {
      id: 'insurance',
      icon: AlertCircle,
      question: 'L\'assurance est-elle incluse ?',
      answer: 'Oui, tous nos véhicules sont couverts par une assurance complète. Cette assurance couvre les dommages au véhicule et la responsabilité civile. Des options d\'assurance supplémentaires sont disponibles.'
    }
  ];

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <HelpCircle size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <BookOpen size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Info size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <MessageCircle size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={24} style={styles.sparkleIcon} />
            
            <div style={styles.logoSection}>
              <img src={logo} alt="ʋu Logo" style={styles.logo} />
              <div style={styles.titleSection}>
                <h1 style={styles.pageTitle}>
                  FAQ - Questions fréquentes
                </h1>
                <p style={styles.pageSubtitle}>
                  <HelpCircle size={18} />
                  Trouvez rapidement vos réponses
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

          {/* Liste des FAQ */}
          <div style={styles.faqList}>
            {faqData.map((faq, index) => {
              const IconComponent = faq.icon;
              const isExpanded = expandedItems[faq.id];
              const isHovered = hoveredItems[faq.id];

              return (
                <div
                  key={faq.id}
                  style={{
                    ...styles.faqItem,
                    ...(isExpanded ? styles.faqItemExpanded : {}),
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div
                    style={{
                      ...styles.faqQuestion,
                      ...(isHovered ? styles.faqQuestionHover : {}),
                      ...(isExpanded ? styles.faqQuestionExpanded : {})
                    }}
                    onClick={() => toggleExpanded(faq.id)}
                    onMouseEnter={() => setHoveredItems({...hoveredItems, [faq.id]: true})}
                    onMouseLeave={() => setHoveredItems({...hoveredItems, [faq.id]: false})}
                  >
                    <div style={styles.questionContent}>
                      <IconComponent size={20} style={styles.questionIcon} />
                      <h3 style={styles.questionText}>{faq.question}</h3>
                    </div>
                    
                    {isExpanded ? (
                      <ChevronUp 
                        size={20} 
                        style={{
                          ...styles.chevronIcon,
                          ...styles.chevronIconRotated
                        }} 
                      />
                    ) : (
                      <ChevronDown size={20} style={styles.chevronIcon} />
                    )}
                  </div>

                  {isExpanded && (
                    <div style={styles.faqAnswer}>
                      <p style={styles.answerText}>
                        {faq.id === 'support' ? (
                          <>
                            Vous pouvez nous contacter par email à{' '}
                            <a
                              href="mailto:support@ʋu.com"
                              style={{
                                ...styles.emailLink,
                                ...(hoveredEmail ? styles.emailLinkHover : {})
                              }}
                              onMouseEnter={() => setHoveredEmail(true)}
                              onMouseLeave={() => setHoveredEmail(false)}
                            >
                              support@ʋu.com
                            </a>
                            {' '}ou via notre formulaire de contact sur le site. Notre équipe est disponible 24h/24 pour répondre à toutes vos questions.
                          </>
                        ) : (
                          faq.answer
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Section support */}
          <div style={styles.supportCard}>
            <h3 style={styles.supportTitle}>
              <Phone size={24} />
              Besoin d'aide supplémentaire ?
            </h3>
            <p style={styles.supportText}>
              Si vous ne trouvez pas la réponse à votre question, 
              <span style={styles.supportHighlight}> notre équipe de support</span> est là pour vous aider.
            </p>
            <p style={styles.supportText}>
              Contactez-nous et nous vous répondrons dans les plus brefs délais !
            </p>
          </div>
        </div>
      </div>
    </>
  );
}