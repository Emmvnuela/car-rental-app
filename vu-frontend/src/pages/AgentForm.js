import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';

// 🔐 FORMULAIRE D'AJOUT D'AGENT
export const AgentForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (message.text) setMessage({ type: '', text: '' });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    console.log("Formulaire soumis:", form);
    await axios.post('/agents/create-agent', form);

    toast.success('Agent ajouté avec succès !');  // ✅ Ce toast s'affiche bien

    onSuccess && onSuccess(); // recharge la liste
    setForm({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'agent'  // ✅ NE PAS oublier de remettre role: 'agent'
    });
  } catch (error) {
    console.error("Erreur:", error);
    toast.error("Erreur lors de l'ajout de l'agent.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>Ajouter un nouvel agent</h3>

      {message.text && (
        <div style={{ ...styles.message, backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2' }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Nom complet</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder=""
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="agent@gmail.com"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="********"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+228 90 00 00 00"
            style={styles.input}
          />
        </div>

        

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Ajout en cours..." : "Ajouter Agent"}
        </button>
      </form>
    </div>
  );
};

// 🧍‍♀️ AFFICHAGE DES AGENTS EN CARTES
export const AgentCards = ({ agents, onDelete }) => {
  const handleDelete = async (agentId) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer cet agent ?");
    if (!confirm) return;

    try {
      await axios.delete(`/agents/${agentId}`);
      onDelete && onDelete();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      toast.error("Échec de la suppression de l'agent.");
    }
  };

  return (
    <div style={styles.cardGrid}>
      {agents.map(agent => (
        <div key={agent.id} style={styles.card}>
          <h4 style={styles.cardTitle}>{agent.name}</h4>
          <p>Email : {agent.email}</p>
          <p>Rôle : {agent.role}</p>
          <button
            onClick={() => handleDelete(agent.id)}
            style={styles.button}
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};



// 🎨 STYLES
const styles = {
  formContainer: {
    backgroundColor: '#1f2937',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.4)',
    maxWidth: '600px',
    margin: '0 auto',
    color: 'white'
  },
  formTitle: {
    marginBottom: '1rem',
    fontSize: '1.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  field: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '0.7rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '0.8rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#6d28d9',
    color: 'white',
    cursor: 'pointer'
  },
  message: {
    padding: '0.8rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontWeight: 'bold'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '1.2rem',
    borderRadius: '12px',
    border: '1px solid #374151',
    color: 'white'
  },
  cardTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem'
  }
};
