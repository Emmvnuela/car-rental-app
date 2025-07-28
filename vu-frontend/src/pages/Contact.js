import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Sparkles,
  Users,
  Globe,
  Heart
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
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  contactCard: {
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
  socialCard: {
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
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  cardIcon: {
    color: '#fbbf24',
    background: 'rgba(251, 191, 36, 0.1)',
    padding: '0.75rem',
    borderRadius: '12px',
    border: '1px solid rgba(251, 191, 36, 0.2)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
  },
  contactInfo: {
    display: 'grid',
    gap: '1.5rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  contactItemHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  contactIcon: {
    color: '#fbbf24',
    background: 'rgba(251, 191, 36, 0.1)',
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid rgba(251, 191, 36, 0.2)',
  },
  contactText: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: '500',
  },
  contactLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
  },
  socialGrid: {
    display: 'grid',
    gap: '1rem',
  },
  socialItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    color: 'inherit',
  },
  socialItemHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  socialIcon: {
    color: '#fbbf24',
    background: 'rgba(251, 191, 36, 0.1)',
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid rgba(251, 191, 36, 0.2)',
  },
  socialText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  socialName: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
  },
  socialHandle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
  },
  messageCard: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.2)',
    borderRadius: '20px',
    padding: '2rem',
    textAlign: 'center',
    animation: 'slideInUp 0.5s ease-out 0.2s both',
    gridColumn: '1 / -1',
  },
  messageText: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  messageHighlight: {
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
`;

export default function Contact() {
  const navigate = useNavigate();
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredItems, setHoveredItems] = useState({});

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      text: 'contact@ʋu.tg',
      href: 'mailto:contact@ʋu.tg'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      text: '+228 90 00 00 00',
      href: 'tel:+22890000000'
    },
    {
      icon: Clock,
      label: 'Horaires',
      text: 'Disponible 24h/24, 7j/7'
    },
    {
      icon: MapPin,
      label: 'Zone de service',
      text: 'Lomé et environs'
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'ʋu Togo',
      href: 'https://www.facebook.com/ʋu.tg'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@ʋu.tg',
      href: 'https://www.instagram.com/ʋu.tg'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      handle: '@ʋu',
      href: 'https://twitter.com/ʋu'
    }
  ];

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <MessageCircle size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Mail size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Phone size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Users size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
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
                  Contactez-nous
                </h1>
                <p style={styles.pageSubtitle}>
                  <MessageCircle size={18} />
                  Nous sommes là pour vous aider
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
            {/* Informations de contact */}
            <div style={styles.contactCard}>
              <div style={styles.cardHeader}>
                <Phone size={28} style={styles.cardIcon} />
                <h2 style={styles.cardTitle}>Informations de Contact</h2>
              </div>

              <div style={styles.contactInfo}>
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const content = (
                    <div
                      key={index}
                      style={{
                        ...styles.contactItem,
                        ...(hoveredItems[`contact-${index}`] ? styles.contactItemHover : {})
                      }}
                      onMouseEnter={() => setHoveredItems({...hoveredItems, [`contact-${index}`]: true})}
                      onMouseLeave={() => setHoveredItems({...hoveredItems, [`contact-${index}`]: false})}
                    >
                      <IconComponent size={20} style={styles.contactIcon} />
                      <div>
                        <div style={styles.contactLabel}>{info.label}</div>
                        <div style={styles.contactText}>{info.text}</div>
                      </div>
                    </div>
                  );

                  return info.href ? (
                    <a key={index} href={info.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {content}
                    </a>
                  ) : content;
                })}
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div style={styles.socialCard}>
              <div style={styles.cardHeader}>
                <Globe size={28} style={styles.cardIcon} />
                <h2 style={styles.cardTitle}>Suivez-nous</h2>
              </div>

              <div style={styles.socialGrid}>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...styles.socialItem,
                        ...(hoveredItems[`social-${index}`] ? styles.socialItemHover : {})
                      }}
                      onMouseEnter={() => setHoveredItems({...hoveredItems, [`social-${index}`]: true})}
                      onMouseLeave={() => setHoveredItems({...hoveredItems, [`social-${index}`]: false})}
                    >
                      <IconComponent size={20} style={styles.socialIcon} />
                      <div style={styles.socialText}>
                        <span style={styles.socialName}>{social.name}</span>
                        <span style={styles.socialHandle}>{social.handle}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Message d'encouragement */}
          <div style={styles.messageCard}>
            <Heart size={32} style={{ color: '#fbbf24', marginBottom: '1rem' }} />
            <div style={styles.messageText}>
              Pour toute question ou assistance, n'hésitez pas à nous contacter. 
              <span style={styles.messageHighlight}> Notre équipe est là pour vous aider</span> et répondre à vos besoins.
            </div>
            <div style={styles.messageText}>
              Vous pouvez également nous suivre sur nos réseaux sociaux pour rester informé de nos 
              <span style={styles.messageHighlight}> dernières offres et actualités</span>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}