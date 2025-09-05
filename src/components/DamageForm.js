import React, { useState } from 'react';
import { createDamage } from '../api/damagesApi';

function DamageForm({ onDamageAdded }) {
  const [formData, setFormData] = useState({ reservation_id: '', description: '', cost: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDamage = await createDamage(formData);
      onDamageAdded(newDamage);
      setFormData({ reservation_id: '', description: '', cost: 0 });
    } catch (error) {
      alert("Erreur lors de l'ajout");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="reservation_id" placeholder="ID réservation" value={formData.reservation_id} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="cost" type="number" placeholder="Coût" value={formData.cost} onChange={handleChange} required />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default DamageForm;
