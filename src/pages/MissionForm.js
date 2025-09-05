import React, { useState } from 'react';
import axios from '../api/axiosInstance';

function MissionForm({ onSuccess }) {
  const [form, setForm] = useState({ title: '', description: '', date: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/missions', form);
      onSuccess && onSuccess();
      setForm({ title: '', description: '', date: '' });
    } catch (error) {
      alert('Erreur lors de la création de la mission.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <button type="submit">Créer</button>
    </form>
  );
}

export default MissionForm;