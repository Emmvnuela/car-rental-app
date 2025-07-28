import React, { useState, useEffect } from 'react'; 
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

export function DeliveryForm({ onSuccess }) {
  const [form, setForm] = useState({
    agent_id: '',
    reservation_id: '',
    delivery_date: '',
    return_date: '',
    delivery_status: 'En attente',
    notes: ''
  });

  const [agents, setAgents] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // <-- état pour message erreur

useEffect(() => {
  axios.get('/agents', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  .then(res => {
    setAgents(res.data);
    console.log("✅ Agents chargés:", res.data);
  })
  .catch(err => console.error('Erreur chargement agents:', err));
}, []);

useEffect(() => {
  axiosInstance.get('/deliveries/disponibles')
    .then(response => {
      console.log("✅ Réservations disponibles :", response.data);
      setReservations(response.data);
    })
    .catch(error => {
      console.error("Erreur chargement réservations:", error);
    });
}, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = ['agent_id', 'reservation_id'].includes(name)
      ? (value === '' ? '' : Number(value))
      : value;
    setForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Réinitialise le message erreur avant envoi

    try {
      console.log('🔍 Données envoyées au backend :', form);
      const response = await axios.post('/deliveries', form);
      console.log("✅ Réponse backend:", response.data);
      toast.success(response.data.message || 'Livraison créée avec succès');

      setForm({
        agent_id: '',
        reservation_id: '',
        delivery_date: '',
        return_date: '',
        delivery_status: 'En attente',
        notes: ''
      });
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Erreur création livraison:', error);
      console.error('🧨 Message du backend :', error.response?.data);

      // Récupère le message d'erreur backend ou un message générique
      const backendError = error.response?.data?.error || 'Erreur lors de la création de la livraison';
      setErrorMessage(backendError);
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>Créer une nouvelle livraison</h3>

      <label style={styles.label}>Agent</label>
      <select name="agent_id" value={form.agent_id} onChange={handleChange} required style={styles.select}>
        <option value="">Sélectionner un agent</option>
        {agents.map(agent => (
          <option key={agent.id} value={agent.id}>{agent.name}</option>
        ))}
      </select>

      <label style={styles.label}>Réservation</label>
      <select
        name="reservation_id"
        value={form.reservation_id}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedReservation = reservations.find(r => r.reservation_id.toString() === selectedId);

          setForm(prev => ({
            ...prev,
            reservation_id: selectedId === '' ? '' : Number(selectedId),
            delivery_date: selectedReservation?.start_date?.slice(0, 10) || '',
            return_date: selectedReservation?.end_date?.slice(0, 10) || ''
          }));
        }}
        required
        style={styles.select}
      >
        <option value="">Sélectionner une réservation</option>
{reservations.map(reservation => (
  <option key={reservation.reservation_id} value={reservation.reservation_id}>
    {`Réservation #${reservation.reservation_id} du ${reservation.start_date?.slice(0, 10)}`}
  </option>
))}


      </select>

      <label style={styles.label}>Date Livraison</label>
      <input
        type="date"
        name="delivery_date"
        value={form.delivery_date}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label style={styles.label}>Date Retour</label>
      <input
        type="date"
        name="return_date"
        value={form.return_date}
        onChange={handleChange}
        style={styles.input}
      />

      <label style={styles.label}>Notes</label>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes facultatives"
        style={styles.textarea}
      />

      {errorMessage && (
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '0.5rem' }}>
          {errorMessage}
        </p>
      )}

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Création en cours...' : 'Créer Livraison'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: '#1f2937',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  label: {
    fontWeight: '500'
  },
  input: {
    padding: '0.7rem',
    borderRadius: '8px',
    border: '1px solid #374151',
    background: '#111827',
    color: 'white'
  },
  select: {
    padding: '0.7rem',
    borderRadius: '8px',
    border: '1px solid #374151',
    background: '#111827',
    color: 'white'
  },
  textarea: {
    padding: '0.7rem',
    minHeight: '80px',
    borderRadius: '8px',
    border: '1px solid #374151',
    background: '#111827',
    color: 'white'
  },
  button: {
    padding: '0.8rem',
    fontWeight: 'bold',
    backgroundColor: '#6d28d9',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};
