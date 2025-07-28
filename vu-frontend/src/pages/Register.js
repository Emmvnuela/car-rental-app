import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, UserPlus, Sparkles, Shield, Eye, EyeOff, CheckCircle, AlertCircle, Car } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

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
    maxWidth: '480px',
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
  inputGroup: {
    position: 'relative',
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
    marginLeft: '0.5rem',
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)',
  },
  inputPlaceholder: {
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    }
  },
  passwordToggle: {
    position: 'absolute',
    right: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'color 0.3s ease',
    padding: '0.25rem',
    borderRadius: '6px',
  },
  passwordToggleHover: {
    color: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  strengthIndicator: {
    display: 'flex',
    gap: '0.25rem',
    marginTop: '0.5rem',
  },
  strengthBar: {
    height: '3px',
    flex: 1,
    borderRadius: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transition: 'background-color 0.3s ease',
  },
  strengthBarActive: {
    backgroundColor: '#10b981',
  },
  strengthBarMedium: {
    backgroundColor: '#f59e0b',
  },
  strengthBarWeak: {
    backgroundColor: '#ef4444',
  },
  strengthText: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '0.25rem',
    textAlign: 'center',
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
    marginTop: '1rem',
  },
  submitButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.4)',
  },
  submitButtonDisabled: {
    background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '0 4px 12px rgba(148, 163, 184, 0.2)',
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
  loginLink: {
    textAlign: 'center',
    marginTop: '1.5rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  loginLinkText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.95rem',
    margin: '0',
  },
  loginLinkButton: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.3s ease',
  },
  loginLinkButtonHover: {
    color: '#60a5fa',
    textDecoration: 'underline',
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

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredLoginLink, setHoveredLoginLink] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Calculer la force du mot de passe
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'Très faible';
      case 2: return 'Faible';
      case 3: return 'Moyen';
      case 4: return 'Fort';
      case 5: return 'Très fort';
      default: return '';
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Définir le rôle automatiquement
    const role = formData.email === 'emmaagbe0901@gmail.com' ? 'admin' : 'user';

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        showNotification(data.error || 'Erreur lors de l\'inscription', 'error');
        return;
      }

      showNotification('✅ Compte créé avec succès !', 'success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      showNotification('Erreur serveur : ' + error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <User size={80} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <Shield size={60} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <Mail size={70} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Lock size={65} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
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
            <Car size={24} style={styles.sparkleIcon} />
            <h2 style={styles.title}>
              <UserPlus size={32} />
              Inscription
            </h2>
            <p style={styles.subtitle}>
              Créez votre compte pour accéder à notre plateforme
            </p>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Nom complet */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nom complet</label>
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
                  placeholder="Entrez votre nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...styles.input,
                    ...(focusedField === 'name' ? styles.inputFocused : {})
                  }}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Adresse e-mail</label>
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
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...styles.input,
                    ...(focusedField === 'email' ? styles.inputFocused : {})
                  }}
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mot de passe</label>
              <div style={styles.inputWrapper}>
                <Lock 
                  size={20} 
                  style={{
                    ...styles.inputIcon,
                    ...(focusedField === 'password' ? styles.inputIconFocused : {})
                  }} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Créez un mot de passe sécurisé"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...styles.input,
                    ...(focusedField === 'password' ? styles.inputFocused : {}),
                    paddingRight: '3rem'
                  }}
                  required
                />
                <div
                  style={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              
              {/* Indicateur de force du mot de passe */}
              {formData.password && (
                <>
                  <div style={styles.strengthIndicator}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        style={{
                          ...styles.strengthBar,
                          ...(passwordStrength >= level ? (
                            passwordStrength <= 2 ? styles.strengthBarWeak :
                            passwordStrength <= 3 ? styles.strengthBarMedium :
                            styles.strengthBarActive
                          ) : {})
                        }}
                      />
                    ))}
                  </div>
                  <div style={styles.strengthText}>
                    Force: {getPasswordStrengthText()}
                  </div>
                </>
              )}
            </div>

            {/* Téléphone */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Téléphone (facultatif)</label>
              <div style={styles.inputWrapper}>
                <Phone 
                  size={20} 
                  style={{
                    ...styles.inputIcon,
                    ...(focusedField === 'phone' ? styles.inputIconFocused : {})
                  }} 
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="+228 XX XX XX XX"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...styles.input,
                    ...(focusedField === 'phone' ? styles.inputFocused : {})
                  }}
                />
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                ...(hoveredButton && !isSubmitting ? styles.submitButtonHover : {}),
                ...(isSubmitting ? styles.submitButtonDisabled : {})
              }}
              onMouseEnter={() => !isSubmitting && setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              <div 
                style={{
                  ...styles.submitButtonGlow,
                  ...(hoveredButton && !isSubmitting ? styles.submitButtonGlowActive : {})
                }}
              ></div>
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Création en cours...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Créer un compte
                </>
              )}
            </button>

            {/* Lien vers la connexion */}
            <div style={styles.loginLink}>
              <p style={styles.loginLinkText}>
                Vous avez déjà un compte ?{' '}
                <a 
                  href="/login" 
                  style={{
                    ...styles.loginLinkButton,
                    ...(hoveredLoginLink ? styles.loginLinkButtonHover : {})
                  }}
                  onMouseEnter={() => setHoveredLoginLink(true)}
                  onMouseLeave={() => setHoveredLoginLink(false)}
                >
                  Se connecter
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;