import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText,
  Shield,
  Scale,
  Lock,
  Eye,
  Globe,
  Mail,
  AlertTriangle,
  Info,
  Sparkles,
  BookOpen,
  Gavel,
  Copyright
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
  introCard: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.2)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    animation: 'slideInUp 0.5s ease-out both',
  },
  introTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem',
  },
  introIcon: {
    color: '#fbbf24',
  },
  introText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    margin: '0',
  },
  brandName: {
    color: '#fbbf24',
    fontWeight: '700',
  },
  sectionsGrid: {
    display: 'grid',
    gap: '1.5rem',
  },
  sectionCard: {
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
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  sectionIcon: {
    color: '#fbbf24',
    background: 'rgba(251, 191, 36, 0.1)',
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid rgba(251, 191, 36, 0.2)',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
  },
  sectionContent: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '1rem',
    lineHeight: '1.7',
    margin: '0',
  },
  contactCard: {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '20px',
    padding: '2rem',
    textAlign: 'center',
    marginTop: '2rem',
    animation: 'slideInUp 0.5s ease-out 0.3s both',
  },
  contactTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1rem',
  },
  contactIcon: {
    color: '#10b981',
  },
  contactText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  emailLink: {
    color: '#10b981',
    textDecoration: 'underline',
    fontWeight: '600',
    transition: 'color 0.2s ease',
  },
  emailLinkHover: {
    color: '#059669',
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

export default function Terms() {
  const navigate = useNavigate();
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);

  const sections = [
    {
      id: 'acceptance',
      icon: Shield,
      title: '1. Acceptation des conditions',
      content: 'En accédant à notre site, vous acceptez d\'être lié par ces conditions d\'utilisation et toutes les lois et réglementations applicables. Si vous n\'acceptez pas ces conditions, vous ne devez pas utiliser ce site.'
    },
    {
      id: 'usage',
      icon: Eye,
      title: '2. Utilisation du site',
      content: 'Vous êtes autorisé à utiliser le site uniquement à des fins légales et conformément aux présentes conditions. Vous vous engagez à ne pas utiliser le site d\'une manière qui pourrait endommager, désactiver, surcharger ou altérer le site ou interférer avec l\'utilisation de tout autre utilisateur.'
    },
    {
      id: 'intellectual',
      icon: Copyright,
      title: '3. Propriété intellectuelle',
      content: 'Le contenu du site, y compris mais sans s\'y limiter, les textes, graphiques, logos, images et logiciels, est la propriété de ʋu ou de ses concédants de licence et est protégé par les lois sur le droit d\'auteur et les marques. Vous ne devez pas reproduire, distribuer ou créer des œuvres dérivées de tout contenu sans notre autorisation écrite préalable.'
    },
    {
      id: 'modifications',
      icon: Info,
      title: '4. Modifications des conditions',
      content: 'Nous nous réservons le droit de modifier ces conditions d\'utilisation à tout moment. Les modifications prendront effet dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement les conditions pour prendre connaissance des modifications.'
    },
    {
      id: 'liability',
      icon: AlertTriangle,
      title: '5. Limitation de responsabilité',
      content: 'ʋu ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l\'utilisation ou de l\'incapacité à utiliser le site, même si nous avons été informés de la possibilité de tels dommages.'
    },
    {
      id: 'law',
      icon: Gavel,
      title: '6. Droit applicable',
      content: 'Ces conditions d\'utilisation sont régies par les lois en vigueur dans le pays où ʋu est enregistré. Tout litige découlant de l\'utilisation du site sera soumis à la compétence exclusive des tribunaux de ce pays.'
    }
  ];

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <FileText size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Scale size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <BookOpen size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Lock size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
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
                  Conditions d'utilisation
                </h1>
                <p style={styles.pageSubtitle}>
                  <FileText size={18} />
                  Termes et conditions légales
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

          {/* Introduction */}
          <div style={styles.introCard}>
            <h2 style={styles.introTitle}>
              <Scale size={24} style={styles.introIcon} />
              Acceptation des conditions
            </h2>
            <p style={styles.introText}>
              En utilisant <span style={styles.brandName}>ʋu</span>, vous acceptez nos conditions générales d'utilisation.
              Veuillez les lire attentivement.
            </p>
          </div>

          {/* Sections des conditions */}
          <div style={styles.sectionsGrid}>
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={section.id}
                  style={{
                    ...styles.sectionCard,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={styles.sectionHeader}>
                    <IconComponent size={24} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>{section.title}</h3>
                  </div>
                  <p style={styles.sectionContent}>
                    {section.content.includes('ʋu') 
                      ? section.content.split('ʋu').map((part, i) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < section.content.split('ʋu').length - 1 && (
                              <span style={styles.brandName}>ʋu</span>
                            )}
                          </React.Fragment>
                        ))
                      : section.content
                    }
                  </p>
                </div>
              );
            })}
          </div>

          {/* Section contact */}
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>
              <Mail size={24} style={styles.contactIcon} />
              7. Contact
            </h3>
            <p style={styles.contactText}>
              Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante :
            </p>
            <p style={styles.contactText}>
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
            </p>
          </div>
        </div>
      </div>
    </>
  );
}