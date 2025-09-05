import axios from 'axios';

export const downloadContratPdf = async (reservationId) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(
      `http://localhost:5000/api/contrats-location/generate-pdf/${reservationId}`,
      { 
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // Créer un lien temporaire pour le téléchargement
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contrat-location-${reservationId}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Nettoyer
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('Contrat téléchargé avec succès');
  } catch (err) {
    console.error('Erreur lors du téléchargement du contrat PDF:', err);
    
    if (err.response?.status === 404) {
      alert('Contrat non disponible. Votre réservation doit être validée par un administrateur.');
    } else if (err.response?.status === 401) {
      alert('Session expirée. Veuillez vous reconnecter.');
    } else {
      alert('Impossible de télécharger le contrat. Veuillez réessayer plus tard.');
    }
  }
};