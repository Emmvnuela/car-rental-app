import React, { useEffect, useState } from 'react';
import { getDamages, deleteDamage } from '../api/damagesApi';
import DamageForm from '../components/DamageForm';
import DamageList from '../components/DamageList';

function Damages() {
  const [damages, setDamages] = useState([]);

  useEffect(() => {
    fetchDamages();
  }, []);

  const fetchDamages = async () => {
    const data = await getDamages();
    setDamages(data);
  };

  const handleDamageAdded = (newDamage) => {
    setDamages(prev => [...prev, newDamage]);
  };

  const handleDelete = async (id) => {
    await deleteDamage(id);
    setDamages(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div>
      <h2>Dommages</h2>
      <DamageForm onDamageAdded={handleDamageAdded} />
      <DamageList damages={damages} onDelete={handleDelete} />
    </div>
  );
}

export default Damages;
