import React from 'react';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { Truck, Calendar, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function DeliveryCards({ deliveries, onDelete }) {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette livraison ?')) return;
    try {
      await axios.delete(`/deliveries/${id}`);
      toast.success('Livraison supprimée');
      if (onDelete) onDelete();
    } catch (error) {
      console.error('Erreur suppression livraison:', error);
      toast.error('Échec de la suppression');
    }
  };

  return (
    <div style={styles.grid}>
      {deliveries.map((delivery) => (
        <div key={delivery.id} style={styles.card}>
          <h4 style={styles.cardTitle}>
            <Truck size={18} style={{ marginRight: 6 }} />
            Agent #{delivery.agent_id} – {delivery.agent_name || 'Nom inconnu'}
            </h4>


          <p><strong>Client :</strong> {delivery.client_name || 'Nom inconnu'}</p>
          <p><strong>Statut :</strong> {delivery.delivery_status}</p>
          <p>
            <Calendar size={14} style={{ marginRight: 4 }} />
            Livraison : {delivery.delivery_date ? delivery.delivery_date.slice(0, 10) : 'Non défini'}
          </p>
          <p>Retour : {delivery.return_date ? delivery.return_date.slice(0, 10) : 'Non défini'}</p>
          <p><em>Notes :</em> {delivery.notes || 'RAS'}</p>

          <button
  onClick={() => navigate(`/deliveries/${delivery.id}`)}
  style={{ ...styles.deleteButton, backgroundColor: '#2563eb' }}
>
  Voir
</button>


          <button
            onClick={() => handleDelete(delivery.id)}
            style={styles.deleteButton}
            aria-label={`Supprimer la livraison ${delivery.id}`}
          >
            <X size={14} /> Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}


const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
    gap: '1.5rem'
  },
  card: {
    background: '#1e293b',
    padding: '1.2rem',
    borderRadius: '12px',
    border: '1px solid #374151',
    color: 'white',
    position: 'relative'
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.6rem'
  },
  deleteButton: {
    marginTop: '1rem',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  }
};
