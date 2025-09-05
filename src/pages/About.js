import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart,
  Users,
  Star,
  Shield,
  Clock,
  Award,
  Sparkles,
  Car,
  MapPin,
  Target,
  Zap
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
  heroSection: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    marginBottom: '2rem',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideInUp 0.5s ease-out both',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '900',
    margin: '0 0 1rem 0',
    background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '2rem',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 2rem auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  statCardHover: {
    transform: 'translateY(-4px)',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#fbbf24',
    margin: '0 0 0.5rem 0',
  },
  statLabel: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
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
    padding: '0.75rem',
    borderRadius: '12px',
    border: '1px solid rgba(251, 191, 36, 0.2)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: '0',
  },
  sectionContent: {
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.6',
    fontSize: '1rem',
  },
  featuresList: {
    display: 'grid',
    gap: '1rem',
    marginTop: '1rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    color: '#fbbf24',
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  testimonialCard: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
    border: '1px solid rgba(251, 191, 36, 0.2)',
    borderRadius: '20px',
    padding: '2rem',
    textAlign: 'center',
    animation: 'slideInUp 0.5s ease-out 0.2s both',
  },
  testimonialText: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  testimonialAuthor: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fbbf24',
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

export default function About() {
  const navigate = useNavigate();
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredStats, setHoveredStats] = useState({});

  const stats = [
    { number: '5000+', label: 'Clients Satisfaits', icon: Users },
    { number: '4.9/5', label: 'Note Moyenne', icon: Star },
    { number: '24/7', label: 'Support Client', icon: Clock },
    { number: '100%', label: 'Sécurisé', icon: Shield },
  ];

  const features = [
    { text: 'Réservation simple et rapide en ligne', icon: Zap },
    { text: 'Véhicules régulièrement entretenus et vérifiés', icon: Shield },
    { text: 'Prix transparents sans frais cachés', icon: Award },
    { text: 'Service client disponible 24h/24', icon: Clock },
    { text: 'Livraison et récupération à domicile', icon: MapPin },
    { text: 'Assurance complète incluse', icon: Heart },
  ];

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <Car size={120} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Heart size={100} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Target size={110} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Award size={90} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
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
                  À propos de ʋu
                </h1>
                <p style={styles.pageSubtitle}>
                  <Heart size={18} />
                  Votre partenaire de confiance
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

          {/* Section Hero */}
          <div style={styles.heroSection}>
            <h2 style={styles.heroTitle}>ʋu</h2>
            <p style={styles.heroSubtitle}>
              Une plateforme de réservation de voitures simple, rapide et fiable. 
              Notre objectif est de faciliter vos déplacements, que ce soit pour un voyage, 
              un rendez-vous professionnel ou une sortie en famille.
            </p>

            {/* Statistiques */}
            <div style={styles.statsGrid}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    style={{
                      ...styles.statCard,
                      ...(hoveredStats[index] ? styles.statCardHover : {})
                    }}
                    onMouseEnter={() => setHoveredStats({...hoveredStats, [index]: true})}
                    onMouseLeave={() => setHoveredStats({...hoveredStats, [index]: false})}
                  >
                    <IconComponent size={24} style={{ color: '#fbbf24', marginBottom: '0.5rem' }} />
                    <div style={styles.statNumber}>{stat.number}</div>
                    <div style={styles.statLabel}>{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sections principales */}
          <div style={styles.sectionsGrid}>
            {/* Notre Mission */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <Target size={28} style={styles.sectionIcon} />
                <h3 style={styles.sectionTitle}>Notre Mission</h3>
              </div>
              <div style={styles.sectionContent}>
                <p>
                  Chez ʋu, nous croyons en la qualité de service, la ponctualité et la satisfaction client. 
                  Nous nous engageons à vous offrir une expérience de location exceptionnelle avec 
                  une variété de véhicules disponibles et un processus de réservation transparent.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>ʋu vous accompagne à chaque kilomètre.</strong>
                </p>
              </div>
            </div>

            {/* Nos Services */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <Car size={28} style={styles.sectionIcon} />
                <h3 style={styles.sectionTitle}>Nos Services</h3>
              </div>
              <div style={styles.sectionContent}>
                <div style={styles.featuresList}>
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} style={styles.featureItem}>
                        <IconComponent size={20} style={styles.featureIcon} />
                        <span style={styles.featureText}>{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Témoignage */}
          <div style={styles.testimonialCard}>
            <div style={styles.testimonialText}>
              "Depuis notre lancement, nous avons aidé des milliers de clients à trouver 
              le véhicule idéal pour leurs besoins. Merci de faire confiance à ʋu. 
              Roulez l'esprit tranquille."
            </div>
            <div style={styles.testimonialAuthor}>
              — L'équipe ʋu
            </div>
          </div>
        </div>
      </div>
    </>
  );
}