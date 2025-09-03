import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Car, Calendar, Search, CheckCircle, XCircle, Sparkles, Filter, ArrowLeft, ArrowRight, Zap, Star, Bell } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
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
    background: `
      radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 90%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  particleField: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/svg%3E")',
    animation: 'float 20s ease-in-out infinite',
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
    padding: '4rem 2rem',
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
      linear-gradient(45deg, transparent 30%, rgba(120, 119, 198, 0.1) 50%, transparent 70%)
    `,
    backdropFilter: 'blur(25px)',
    borderRadius: '32px',
    color: 'white',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(120, 119, 198, 0.1)
    `,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'float 6s ease-in-out infinite',
  },
  headerGlow: {
    position: 'absolute',
    top: '-100%',
    left: '-100%',
    width: '300%',
    height: '300%',
    background: 'conic-gradient(from 0deg, transparent, rgba(120, 119, 198, 0.1), transparent, rgba(255, 255, 255, 0.05), transparent)',
    animation: 'rotate 30s linear infinite',
  },
  title: {
    fontSize: '4rem',
    fontWeight: '900',
    margin: '0',
    textShadow: '0 0 30px rgba(255,255,255,0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, rgba(120, 119, 198, 0.8) 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.4rem',
    opacity: '0.9',
    margin: '1.5rem 0 0 0',
    fontWeight: '300',
    position: 'relative',
    zIndex: 2,
    textShadow: '0 0 20px rgba(255,255,255,0.2)',
    letterSpacing: '0.05em',
  },
  sparkleIcon: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  filtersSection: {
    marginBottom: '4rem',
    padding: '3rem',
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%),
      linear-gradient(45deg, rgba(120, 119, 198, 0.05) 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%)
    `,
    backdropFilter: 'blur(25px)',
    borderRadius: '28px',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.05)
    `,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideUp 0.8s ease-out',
  },
  filtersGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%)',
    animation: 'rotate 25s linear infinite',
    pointerEvents: 'none',
  },
  filtersTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    position: 'relative',
    zIndex: 2,
    textShadow: '0 0 20px rgba(255,255,255,0.3)',
  },
  filterIcon: {
    padding: '0.75rem',
    background: 'linear-gradient(135deg, rgba(120, 119, 198, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)',
    borderRadius: '16px',
    color: 'white',
    boxShadow: `
      0 8px 32px rgba(120, 119, 198, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  filtersContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    position: 'relative',
    zIndex: 2,
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 1.5rem',
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%),
      linear-gradient(45deg, rgba(120, 119, 198, 0.03) 0%, transparent 100%)
    `,
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  inputWrapperFocus: {
    borderColor: 'rgba(120, 119, 198, 0.5)',
    boxShadow: `
      0 0 0 2px rgba(120, 119, 198, 0.2),
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    transform: 'translateY(-2px)',
  },
  inputIcon: {
    color: 'rgba(120, 119, 198, 0.8)',
    flexShrink: 0,
    filter: 'drop-shadow(0 0 8px rgba(120, 119, 198, 0.3))',
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: 'white',
    width: '100%',
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  },
  carsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '2.5rem',
    marginBottom: '4rem',
    position: 'relative',
  },
  carCard: {
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%),
      linear-gradient(45deg, rgba(120, 119, 198, 0.05) 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%)
    `,
    borderRadius: '32px',
    padding: '0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: `
      0 20px 60px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
    animation: 'slideUp 0.8s ease-out',
  },
  carCardHover: {
    transform: 'translateY(-20px) scale(1.03)',
    boxShadow: `
      0 40px 80px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(120, 119, 198, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
  },
  carCardGlow: {
    position: 'absolute',
    top: '-100%',
    left: '-100%',
    width: '300%',
    height: '300%',
    background: 'conic-gradient(from 0deg, transparent, rgba(120, 119, 198, 0.1), transparent)',
    animation: 'rotate 20s linear infinite',
    opacity: '0',
    transition: 'opacity 0.5s ease',
  },
  carCardGlowActive: {
    opacity: '1',
  },
  carImageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '32px 32px 0 0',
    height: '240px',
  },
  carImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: 'brightness(1.1) contrast(1.1)',
  },
  carImageHover: {
    transform: 'scale(1.15)',
    filter: 'brightness(1.2) contrast(1.2)',
  },
  carImageOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: `
      linear-gradient(135deg, rgba(120, 119, 198, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%),
      radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.3) 100%)
    `,
    opacity: '0',
    transition: 'opacity 0.4s ease',
  },
  carImageOverlayHover: {
    opacity: '1',
  },
  availableBadge: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    padding: '0.75rem 1.25rem',
    background: `
      linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%),
      linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)
    `,
    color: 'white',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: '700',
    boxShadow: `
      0 8px 32px rgba(16, 185, 129, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  premiumBadge: {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
    padding: '0.75rem 1.25rem',
    background: `
      linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 0.9) 100%),
      linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)
    `,
    color: 'white',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: '700',
    boxShadow: `
      0 8px 32px rgba(245, 158, 11, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  carContent: {
    padding: '2.5rem',
    position: 'relative',
  },
  carTitle: {
    fontSize: '1.75rem',
    fontWeight: '900',
    color: 'white',
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, #ffffff 0%, rgba(120, 119, 198, 0.8) 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 20px rgba(255,255,255,0.3)',
    letterSpacing: '-0.01em',
  },
  carDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  carDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    fontSize: '1rem',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    padding: '1.5rem',
    background: `
      linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%),
      linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)
    `,
    borderRadius: '20px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  price: {
    fontSize: '2rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
  },
  priceLabel: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  bookButton: {
    width: '100%',
    padding: '1.25rem 2.5rem',
    background: `
      linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.8) 100%),
      linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)
    `,
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    boxShadow: `
      0 12px 40px rgba(59, 130, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  bookButtonHover: {
    transform: 'translateY(-4px)',
    boxShadow: `
      0 20px 60px rgba(59, 130, 246, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3)
    `,
  },
  bookButtonGlow: {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s',
  },
  bookButtonGlowActive: {
    left: '100%',
  },
  emptyState: {
    textAlign: 'center',
    padding: '5rem 3rem',
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%),
      linear-gradient(45deg, rgba(120, 119, 198, 0.05) 0%, transparent 100%)
    `,
    backdropFilter: 'blur(25px)',
    borderRadius: '32px',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  emptyStateIcon: {
    fontSize: '5rem',
    marginBottom: '2rem',
    opacity: '0.6',
    animation: 'bounce 2s infinite',
    color: 'rgba(255, 255, 255, 0.6)',
    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))',
  },
  emptyStateText: {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    textShadow: '0 0 15px rgba(255,255,255,0.2)',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    marginTop: '4rem',
    padding: '2.5rem',
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%),
      linear-gradient(45deg, rgba(120, 119, 198, 0.05) 0%, transparent 100%)
    `,
    backdropFilter: 'blur(25px)',
    borderRadius: '28px',
    boxShadow: `
      0 20px 50px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  paginationButton: {
    padding: '1.25rem 2.5rem',
    background: `
      linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.8) 100%),
      linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)
    `,
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '1.1rem',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: `
      0 12px 40px rgba(59, 130, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    minWidth: '180px',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  paginationButtonHover: {
    transform: 'translateY(-4px)',
    boxShadow: `
      0 20px 60px rgba(59, 130, 246, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3)
    `,
  },
  paginationButtonDisabled: {
    background: `
      linear-gradient(135deg, rgba(148, 163, 184, 0.3) 0%, rgba(100, 116, 139, 0.3) 100%),
      linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)
    `,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '0 8px 20px rgba(148, 163, 184, 0.2)',
    opacity: '0.5',
  },
  pageInfo: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'white',
    padding: '1.25rem 2rem',
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%),
      linear-gradient(45deg, rgba(120, 119, 198, 0.1) 0%, transparent 100%)
    `,
    borderRadius: '20px',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textShadow: '0 0 15px rgba(255,255,255,0.3)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    color: 'white',
    fontSize: '1.8rem',
    fontWeight: '700',
    textShadow: '0 0 20px rgba(255,255,255,0.3)',
  },
  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '4px solid rgba(255, 255, 255, 0.2)',
    borderTop: '4px solid rgba(120, 119, 198, 0.8)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '2rem',
    filter: 'drop-shadow(0 0 20px rgba(120, 119, 198, 0.5))',
  },
  unavailableBadge: {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  padding: '0.75rem 1.25rem',
  background: `
    linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%),
    linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)
  `,
  color: 'white',
  borderRadius: '50px',
  fontSize: '0.9rem',
  fontWeight: '700',
  boxShadow: `
    0 8px 32px rgba(239, 68, 68, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
},

};

// Animations CSS améliorées
const cssAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-15px) rotate(1deg); }
    66% { transform: translateY(-8px) rotate(-1deg); }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
    25% { opacity: 1; transform: scale(1.2) rotate(90deg); }
    50% { opacity: 0.8; transform: scale(1.1) rotate(180deg); }
    75% { opacity: 1; transform: scale(1.3) rotate(270deg); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(50px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0) scale(1); }
    40%, 43% { transform: translateY(-30px) scale(1.05); }
    70% { transform: translateY(-15px) scale(1.02); }
    90% { transform: translateY(-4px) scale(1.01); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.02); }
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.5) !important;
  }
  
  select option {
    background: #1e293b !important;
    color: white !important;
  }
`;

function Cars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    available: '',
    sort: 'created_at',
    order: 'desc',
    page: 1,
    limit: 6,
  });
  // 2. Ajoutez ces states dans le composant
const [notificationRequests, setNotificationRequests] = useState(new Set());
const [loadingNotifications, setLoadingNotifications] = useState(new Set());

// 3. Ajoutez cette fonction pour gérer les demandes de notification
const handleNotificationRequest = async (car) => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  
  if (!user) {
    toast.info('Veuillez vous connecter pour recevoir des notifications');
    navigate('/login');
    return;
  }

  setLoadingNotifications(prev => new Set([...prev, car.id]));

  try {
    await axiosInstance.post('/notifications/request', {
      userId: user.id,
      carId: car.id,
      carName: `${car.brand} ${car.model}`,
      message: `Demande de notification pour la disponibilité de ${car.brand} ${car.model}`
    });

    setNotificationRequests(prev => new Set([...prev, car.id]));
    toast.info('Demande enregistrée ! Vous serez notifié dès que ce véhicule sera disponible.');
  } catch (error) {
    console.error('Erreur lors de la demande de notification:', error);
    toast.error('Une erreur s\'est produite. Veuillez réessayer.');
  } finally {
    setLoadingNotifications(prev => {
      const newSet = new Set(prev);
      newSet.delete(car.id);
      return newSet;
    });
  }
};

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/cars/cars', { params: filters })
      .then((res) => {
        setCars(res.data.cars);
        setTotal(res.data.total);
      })
      .catch((err) => console.error('Erreur chargement voitures:', err))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleBooking = (car) => {
    navigate('/booking', { state: { selectedCar: car } });
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handlePagination = (direction) => {
    setFilters((prev) => ({
      ...prev,
      page: direction === 'next' ? prev.page + 1 : Math.max(1, prev.page - 1),
    }));
  };

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        <div style={styles.particleField}></div>
        <div style={styles.contentWrapper}>
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={40} style={styles.sparkleIcon} />
            <h1 style={styles.title}>
              <Car size={50} />
              Nos Voitures Disponibles
            </h1>
            <p style={styles.subtitle}>Découvrez notre flotte premium de véhicules futuristes</p>
          </div>

          {/* Section Filtres */}
          <div style={styles.filtersSection}>
            <div style={styles.filtersGlow}></div>
            <h3 style={styles.filtersTitle}>
              <div style={styles.filterIcon}>
                <Filter size={24} />
              </div>
              Filtres de Recherche Avancée
            </h3>
            
            <div style={styles.filtersContainer}>
              <div 
                style={{
                  ...styles.inputWrapper,
                  ...(focusedInput === 'search' ? styles.inputWrapperFocus : {})
                }}
              >
                <Search size={24} style={styles.inputIcon} />
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
                <Calendar size={24} style={styles.inputIcon} />
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
                  <CheckCircle size={24} style={{...styles.inputIcon, color: '#10b981'}} /> : 
                  filters.available === 'false' ?
                  <XCircle size={24} style={{...styles.inputIcon, color: '#ef4444'}} /> :
                  <Car size={24} style={styles.inputIcon} />
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
              Chargement des véhicules futuristes...
            </div>
          ) : cars.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>
                <Car size={100} />
              </div>
              <p style={styles.emptyStateText}>
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
                      animationDelay: `${index * 0.15}s`
                    }}
                    onMouseEnter={() => setHoveredCard(car.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div 
                      style={{
                        ...styles.carCardGlow,
                        ...(hoveredCard === car.id ? styles.carCardGlowActive : {})
                      }}
                    ></div>
                    
                    <div style={styles.carImageContainer}>
                      <img
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        style={{
                          ...styles.carImage,
                          ...(hoveredCard === car.id ? styles.carImageHover : {})
                        }}
                      />
                      {car.available ? (
  <div style={styles.availableBadge}>
    <CheckCircle size={16} /> Disponible
  </div>
) : (
  <div style={styles.unavailableBadge}>
    <XCircle size={16} /> Indisponible
  </div>
)}

                      <div 
                        style={{
                          ...styles.carImageOverlay,
                          ...(hoveredCard === car.id ? styles.carImageOverlayHover : {})
                        }}
                      ></div>
                      
                      {/* Badge disponibilité */}
                      {car.available ? (
  <div style={styles.availableBadge}>
    <CheckCircle size={16} />
    Disponible
  </div>
) : 


(
  <div style={styles.unavailableBadge}>
    <XCircle size={16} />
    Indisponible
  </div>
)}

                      
                      {/* Badge premium pour les voitures récentes */}
                      {car.year >= 2020 && (
                        <div style={styles.premiumBadge}>
                          <Star size={16} />
                          Premium
                        </div>
                      )}
                    </div>

                    <div style={styles.carContent}>
                      <h3 style={styles.carTitle}>
                        {car.brand} {car.model}
                      </h3>
                      
                      <div style={styles.carDetails}>
                        <div style={styles.carDetail}>
                          <Calendar size={18} />
                          <span>Année {car.year}</span>
                        </div>
                        <div style={styles.carDetail}>
                          <Zap size={18} />
                          <span>Technologie avancée</span>
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

                      {car.available ? (
  <button
    onClick={() => handleBooking(car)}
    style={{
      ...styles.bookButton,
      ...(hoveredButton === `book-${car.id}` ? styles.bookButtonHover : {})
    }}
    onMouseEnter={() => setHoveredButton(`book-${car.id}`)}
    onMouseLeave={() => setHoveredButton(null)}
  >
    <div 
      style={{
        ...styles.bookButtonGlow,
        ...(hoveredButton === `book-${car.id}` ? styles.bookButtonGlowActive : {})
      }}
    ></div>
    <Zap size={22} />
    Réserver Maintenant
  </button>
) : (
  <button
    onClick={() => handleNotificationRequest(car)}
    disabled={loadingNotifications.has(car.id) || notificationRequests.has(car.id)}
    style={{
      ...styles.bookButton,
      ...(notificationRequests.has(car.id) ? styles.notificationRequestedButton : styles.notificationButton),
      ...(hoveredButton === `notify-${car.id}` && !notificationRequests.has(car.id) && !loadingNotifications.has(car.id) ? styles.notificationButtonHover : {}),
      ...(loadingNotifications.has(car.id) ? { opacity: 0.7, cursor: 'wait' } : {})
    }}
    onMouseEnter={() => !notificationRequests.has(car.id) && !loadingNotifications.has(car.id) && setHoveredButton(`notify-${car.id}`)}
    onMouseLeave={() => setHoveredButton(null)}
  >
    <div 
      style={{
        ...styles.bookButtonGlow,
        ...(hoveredButton === `notify-${car.id}` && !notificationRequests.has(car.id) ? styles.bookButtonGlowActive : {})
      }}
    ></div>
    {loadingNotifications.has(car.id) ? (
      <>
        <div style={styles.loadingSpinner}></div>
        Traitement...
      </>
    ) : notificationRequests.has(car.id) ? (
      <>
        <CheckCircle size={22} />
        Notification demandée
      </>
    ) : (
      <>
        <Bell size={22} />
        Me notifier si disponible
      </>
    )}
  </button>
)}
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
                      ...(hoveredButton === 'prev' && filters.page > 1 ? styles.paginationButtonHover : {})
                    }}
                    onMouseEnter={() => filters.page > 1 && setHoveredButton('prev')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <ArrowLeft size={22} />
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
                      ...(hoveredButton === 'next' && filters.page < totalPages ? styles.paginationButtonHover : {})
                    }}
                    onMouseEnter={() => filters.page < totalPages && setHoveredButton('next')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Suivant
                    <ArrowRight size={22} />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Footer décoratif futuriste */}
          <div style={{
            textAlign: 'center',
            marginTop: '5rem',
            padding: '3rem',
            background: `
              linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%),
              linear-gradient(45deg, rgba(120, 119, 198, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%)
            `,
            backdropFilter: 'blur(25px)',
            borderRadius: '32px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'float 10s ease-in-out infinite',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'conic-gradient(from 0deg, transparent, rgba(120, 119, 198, 0.1), transparent)',
              animation: 'rotate 30s linear infinite',
            }}></div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <Car size={60} style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                marginBottom: '1.5rem',
                animation: 'sparkle 4s ease-in-out infinite',
                filter: 'drop-shadow(0 0 30px rgba(120, 119, 198, 0.5))'
              }} />
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.3rem',
                fontWeight: '700',
                margin: '0',
                textShadow: '0 0 25px rgba(255,255,255,0.3)',
                letterSpacing: '0.02em'
              }}>
                Explorez l'avenir de la mobilité avec notre flotte premium
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cars;