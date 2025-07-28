import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Settings,
  Mail,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Sparkles,
  FileText,
  Globe,
  Key,
  Share2
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
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
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
    color: '#10b981',
  },
  introText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    margin: '0',
  },
  trustBadges: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  trustBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  badgeIcon: {
    color: '#10b981',
  },
  badgeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.9rem',
    fontWeight: '500',
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
  highlightText: {
    color: '#fbbf24',
    fontWeight: '600',
  },
  securityFeatures: {
    display: 'grid',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  securityFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    color: '#10b981',
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  rightsCard: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '20px',
    padding: '2rem',
    marginTop: '2rem',
    animation: 'slideInUp 0.5s ease-out 0.3s both',
  },
  rightsTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '1.5rem',
  },
  rightsIcon: {
    color: '#3b82f6',
  },
  rightsList: {
    display: 'grid',
    gap: '1rem',
  },
  rightItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  rightIcon: {
    color: '#3b82f6',
  },
  rightText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    fontWeight: '500',
  },
  contactCard: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.2)',
    borderRadius: '20px',
    padding: '2rem',
    textAlign: 'center',
    marginTop: '2rem',
    animation: 'slideInUp 0.5s ease-out 0.4s both',
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
    color: '#fbbf24',
  },
  contactText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  emailLink: {
    color: '#fbbf24',
    textDecoration: 'underline',
    fontWeight: '600',
    transition: 'color 0.2s ease',
  },
  emailLinkHover: {
    color: '#f59e0b',
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

export default function Privacy() {
  const navigate = useNavigate();
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);

  const sections = [
    {
      id: 'collection',
      icon: Database,
      title: '1. Collecte des données',
      content: 'Nous collectons des informations personnelles lorsque vous créez un compte, effectuez une réservation ou nous contactez. Ces informations peuvent inclure votre nom, adresse e-mail, numéro de téléphone et détails de paiement.'
    },
    {
      id: 'usage',
      icon: Settings,
      title: '2. Utilisation des données',
      content: 'Vos données sont utilisées pour traiter vos réservations, vous envoyer des confirmations, améliorer nos services et vous informer des offres spéciales. Nous ne vendons ni ne louons vos informations à des tiers.'
    },
    {
      id: 'security',
      icon: Lock,
      title: '3. Sécurité des données',
      content: 'Nous prenons la sécurité de vos données très au sérieux. Nous utilisons des mesures techniques et organisationnelles pour protéger vos informations contre tout accès non autorisé, divulgation, modification ou destruction.'
    },
    {
      id: 'sharing',
      icon: Share2,
      title: '4. Partage des données',
      content: 'Nous ne partageons vos données personnelles qu\'avec des prestataires de services nécessaires à la gestion de votre réservation, comme les sociétés de paiement. Ces prestataires sont tenus de protéger vos informations et de les utiliser uniquement pour les finalités pour lesquelles elles ont été partagées.'
    }
  ];

  const trustBadges = [
    { icon: Shield, text: 'Données sécurisées' },
    { icon: Lock, text: 'Chiffrement SSL' },
    { icon: Eye, text: 'Transparence totale' },
    { icon: CheckCircle, text: 'Conformité RGPD' }
  ];

  const securityFeatures = [
    { icon: Key, text: 'Chiffrement bout en bout de vos données' },
    { icon: Shield, text: 'Serveurs sécurisés et certifiés' },
    { icon: AlertCircle, text: 'Surveillance 24/7 contre les intrusions' },
    { icon: Lock, text: 'Accès restreint aux données personnelles' }
  ];

  const userRights = [
    { icon: Eye, text: 'Droit d\'accès à vos données personnelles' },
    { icon: Settings, text: 'Droit de rectification et de mise à jour' },
    { icon: AlertCircle, text: 'Droit à l\'effacement de vos données' },
    { icon: FileText, text: 'Droit à la portabilité de vos données' },
    { icon: UserCheck, text: 'Droit d\'opposition au traitement' }
  ];

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <Shield size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Lock size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Database size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Eye size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
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
                  Politique de confidentialité
                </h1>
                <p style={styles.pageSubtitle}>
                  <Shield size={18} />
                  Vos données en sécurité
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

          {/* Introduction avec badges de confiance */}
          <div style={styles.introCard}>
            <h2 style={styles.introTitle}>
              <CheckCircle size={24} style={styles.introIcon} />
              Engagement de confidentialité
            </h2>
            <p style={styles.introText}>
              <span style={styles.highlightText}>Vos données personnelles sont en sécurité avec nous.</span> 
              Consultez notre politique de confidentialité pour en savoir plus sur la façon dont nous protégeons 
              et utilisons vos informations.
            </p>

            <div style={styles.trustBadges}>
              {trustBadges.map((badge, index) => {
                const IconComponent = badge.icon;
                return (
                  <div key={index} style={styles.trustBadge}>
                    <IconComponent size={20} style={styles.badgeIcon} />
                    <span style={styles.badgeText}>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sections principales */}
          <div style={styles.sectionsGrid}>
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={section.id}
                  style={{
                    ...styles.sectionCard,
                    animationDelay: `${(index + 1) * 0.1}s`
                  }}
                >
                  <div style={styles.sectionHeader}>
                    <IconComponent size={24} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>{section.title}</h3>
                  </div>
                  <p style={styles.sectionContent}>
                    {section.content}
                  </p>

                  {/* Fonctionnalités de sécurité spéciales pour la section sécurité */}
                  {section.id === 'security' && (
                    <div style={styles.securityFeatures}>
                      {securityFeatures.map((feature, featureIndex) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={featureIndex} style={styles.securityFeature}>
                            <FeatureIcon size={18} style={styles.featureIcon} />
                            <span style={styles.featureText}>{feature.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Section des droits des utilisateurs */}
          <div style={styles.rightsCard}>
            <h3 style={styles.rightsTitle}>
              <Users size={24} style={styles.rightsIcon} />
              Vos droits en tant qu'utilisateur
            </h3>

            <div style={styles.rightsList}>
              {userRights.map((right, index) => {
                const RightIcon = right.icon;
                return (
                  <div key={index} style={styles.rightItem}>
                    <RightIcon size={20} style={styles.rightIcon} />
                    <span style={styles.rightText}>{right.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section contact */}
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>
              <Mail size={24} style={styles.contactIcon} />
              Questions sur vos données ?
            </h3>
            <p style={styles.contactText}>
              Pour toute question concernant le traitement de vos données personnelles ou pour exercer vos droits, 
              contactez notre délégué à la protection des données :
            </p>
            <p style={styles.contactText}>
              <a
                href="mailto:privacy@ʋu.com"
                style={{
                  ...styles.emailLink,
                  ...(hoveredEmail ? styles.emailLinkHover : {})
                }}
                onMouseEnter={() => setHoveredEmail(true)}
                onMouseLeave={() => setHoveredEmail(false)}
              >
                privacy@ʋu.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}