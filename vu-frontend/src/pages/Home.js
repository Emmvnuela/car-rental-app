import React, { useEffect, useState } from 'react';
import { Car, Sparkles, ArrowRight, Zap, Star, Shield, Clock } from 'lucide-react';
import carGif from '../assets/car.gif'; // ✅ ton GIF animé
import { useNavigate } from 'react-router-dom'; // ← ajoute ceci en haut


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
  hero: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    width: '100%',
    padding: '2rem',
    gap: '4rem',
  },
  heroText: {
    flex: '1',
    maxWidth: '600px',
    animation: 'slideInLeft 1s ease-out',
  },
  title: {
    fontSize: '4.5rem',
    fontWeight: '900',
    margin: '0 0 2rem 0',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.1',
    position: 'relative',
  },
  titleHighlight: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    display: 'inline-block',
  },
  titleGlow: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(135deg, #0d1d36ff 0%, #231642ff 50%, #23363aff 100%)',
    filter: 'blur(20px)',
    opacity: '0.3',
    zIndex: '-1',
    animation: 'pulse 3s ease-in-out infinite',
  },
  subtitle: {
    fontSize: '1.4rem',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0 0 3rem 0',
    fontWeight: '400',
    lineHeight: '1.6',
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    animation: 'slideInLeft 1s ease-out 0.2s both',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 2.5rem',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: '700',
    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideInLeft 1s ease-out 0.4s both',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  ctaButtonHover: {
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 20px 50px rgba(59, 130, 246, 0.6)',
  },
  ctaButtonGlow: {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s',
  },
  ctaButtonGlowActive: {
    left: '100%',
  },
  heroImageContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    animation: 'slideInRight 1s ease-out 0.3s both',
  },
  carGif: {
    maxWidth: '500px',
    width: '100%',
    height: 'auto',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  carGifHover: {
    transform: 'scale(1.05) rotateY(5deg)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
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
    color: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 6s ease-in-out infinite',
  },
  floatingIcon1: {
    top: '15%',
    left: '10%',
    animationDelay: '0s',
  },
  floatingIcon2: {
    top: '25%',
    right: '15%',
    animationDelay: '2s',
  },
  floatingIcon3: {
    bottom: '20%',
    left: '15%',
    animationDelay: '4s',
  },
  floatingIcon4: {
    bottom: '30%',
    right: '10%',
    animationDelay: '1s',
  },
  featuresSection: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '2rem',
    animation: 'slideUp 1s ease-out 0.6s both',
  },
  featureCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    padding: '1rem 1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  },
  featureCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
  },
  featureIcon: {
    padding: '0.5rem',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIconFast: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  featureIconSecure: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  },
  featureIconReliable: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  sparkleContainer: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
    fontSize: '2rem',
  },
  // Responsive styles
  responsiveContainer: {
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: '2rem',
      padding: '1rem',
    }
  },
  responsiveTitle: {
    '@media (max-width: 768px)': {
      fontSize: '3rem',
    }
  },
  responsiveSubtitle: {
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
    }
  },
  responsiveFeatures: {
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '1rem',
    }
  }
};

// Animations CSS
const cssAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px) translateX(-50%); }
    to { opacity: 1; transform: translateY(0) translateX(-50%); }
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
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
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

  @media (max-width: 768px) {
    .hero {
      flex-direction: column !important;
      text-align: center !important;
      gap: 2rem !important;
      padding: 1rem !important;
    }
    
    .hero-text h1 {
      font-size: 3rem !important;
    }
    
    .hero-text p {
      font-size: 1.2rem !important;
    }
    
    .features-section {
      flex-direction: column !important;
      gap: 1rem !important;
    }
  }
`;

function Home() {
  const [carKey, setCarKey] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredCar, setHoveredCar] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
    const navigate = useNavigate(); // ← hook de navigation


    const handleClick = () => {
  const role = localStorage.getItem('role');
  if (role === 'admin') {
    navigate('/admin-cars');
  } else {
    navigate('/cars');
  }
};
  useEffect(() => {
    // On fait juste relancer le GIF toutes les 5s
    const interval = setInterval(() => {
      setCarKey(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container} className="hero">
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <Car size={60} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Car size={40} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Zap size={50} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Car size={45} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        {/* Sparkle décoratif */}
        <div style={styles.sparkleContainer}>
          <Car size={32} />
        </div>

        <div style={styles.hero}>
          <div style={styles.heroText} className="hero-text">
            <h1 style={{...styles.title, ...styles.responsiveTitle}}>
              Bienvenue sur{' '}
              <span style={styles.titleHighlight}>
                <div style={styles.titleGlow}></div>
                ʋu !
              </span>
            </h1>
            <p style={{...styles.subtitle, ...styles.responsiveSubtitle}}>
              La plateforme de réservation de voitures facile, rapide et fiable. 
              Découvrez notre plateforme et réservez votre véhicule idéal en quelques clics.
            </p>
            <button 
  onClick={handleClick}
  style={{
    ...styles.ctaButton,
    ...(hoveredButton ? styles.ctaButtonHover : {})
  }}
  className="cta-button"
  onMouseEnter={() => setHoveredButton(true)}
  onMouseLeave={() => setHoveredButton(false)}
>
  <div 
    style={{
      ...styles.ctaButtonGlow,
      ...(hoveredButton ? styles.ctaButtonGlowActive : {})
    }}
  ></div>
  <Car size={24} />
  Voir les voitures
  <ArrowRight size={20} />
</button>


          </div>

          {/* 🚗 GIF animé amélioré */}
          <div style={styles.heroImageContainer}>
            <img 
              key={carKey} 
              src={carGif} 
              alt="Voiture qui roule" 
              style={{
                ...styles.carGif,
                ...(hoveredCar ? styles.carGifHover : {})
              }}
              className="fast-car"
              onMouseEnter={() => setHoveredCar(true)}
              onMouseLeave={() => setHoveredCar(false)}
            />
          </div>
        </div>

        {/* Section des fonctionnalités */}
        <div style={{...styles.featuresSection, ...styles.responsiveFeatures}} className="features-section">
          <div 
            style={{
              ...styles.featureCard,
              ...(hoveredFeature === 'fast' ? styles.featureCardHover : {})
            }}
            onMouseEnter={() => setHoveredFeature('fast')}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div style={{...styles.featureIcon, ...styles.featureIconFast}}>
              <Zap size={20} />
            </div>
            <span>Réservation Rapide</span>
          </div>
          
          <div 
            style={{
              ...styles.featureCard,
              ...(hoveredFeature === 'secure' ? styles.featureCardHover : {})
            }}
            onMouseEnter={() => setHoveredFeature('secure')}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div style={{...styles.featureIcon, ...styles.featureIconSecure}}>
              <Shield size={20} />
            </div>
            <span>Paiement Sécurisé</span>
          </div>
          
          <div 
            style={{
              ...styles.featureCard,
              ...(hoveredFeature === 'reliable' ? styles.featureCardHover : {})
            }}
            onMouseEnter={() => setHoveredFeature('reliable')}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div style={{...styles.featureIcon, ...styles.featureIconReliable}}>
              <Clock size={20} />
            </div>
            <span>Service 24/7</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;